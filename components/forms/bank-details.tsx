import { useEffect, RefObject } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import valid from 'card-validator'

// Icons
import { ArrowRightIcon } from '@heroicons/react/20/solid'

// Context
import { useStore } from '../../context/form'
import { options } from '../../utils/scroll-view-options'
import { wait } from '../../utils/wait'

export interface BankDetailsProps {
  nextRef: RefObject<HTMLDivElement> | null
  prevRef: RefObject<HTMLDivElement> | null
}

interface BankDetailsFormProps {
  firstName: string
  lastName: string
  cardNumber: string
  expirationDate: string
  cvc: string
}

const formSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  cardNumber: Yup.string()
    .required('Credit card number field required')
    .test(
      'test-number', // this is used internally by yup
      'Credit Card number is invalid', //validation message
      (value) => valid.number(value).isValid
    ),
  expirationDate: Yup.string()
    .required('Expiration date field required')
    .test(
      'test-credit-card-expiration-date',
      `Invalid Expiration Date: Please make sure you add "/" sign after month and valid year`,
      (expirationDate) => {
        if (!expirationDate) {
          return false
        }

        if (!expirationDate.includes('/')) {
          return false
        }

        const today = new Date()
        const monthToday = today.getMonth() + 1
        const yearToday = today.getFullYear().toString().substr(-2)

        const [expMonth, expYear] = expirationDate.split('/')

        if (Number(expYear) < Number(yearToday)) {
          return false
        } else if (Number(expMonth) < monthToday && Number(expYear) <= Number(yearToday)) {
          return false
        }

        return true
      }
    ),
  cvc: Yup.string()
    .required('CVC field required')
    .test('test-number', 'Credit Card Verification number is invalid', (value) => valid.cvv(value).isValid),
})

export const BankDetails = (props: BankDetailsProps) => {
  const { nextRef, prevRef } = props
  const router = useRouter()
  const { setStore, storageValues } = useStore()

  const validationOpt = { resolver: yupResolver(formSchema) }

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<BankDetailsFormProps>(validationOpt)

  useEffect(() => {
    setValue('firstName', storageValues.firstName)
    setValue('lastName', storageValues.lastName)
    setValue('cardNumber', storageValues.cardNumber)
    setValue('expirationDate', storageValues.expirationDate)
    setValue('cvc', storageValues.cvc)
  }, [])

  // Do some request
  const onSubmit: SubmitHandler<BankDetailsFormProps> = async (data, e) => {
    e?.preventDefault()
    setStore(data)
    router.push(`/?step=3`)

    if (nextRef?.current) {
      await wait(500)
      nextRef?.current.scrollIntoView(options)
    }
  }

  const onHandleChangeRoute = async () => {
    router.push(`/?step=1`)

    if (prevRef?.current) {
      await wait(500)
      prevRef?.current.scrollIntoView(options)
    }
  }

  return (
    <>
      <h2 className="font-semibold leading-6 text-indigo-600">3. Bank details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="first-name" className="sr-only block text-sm font-medium text-gray-700">
              First name *
            </label>
            <input
              type="text"
              id="first-name"
              autoComplete="given-name"
              placeholder="First name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register('firstName', {
                required: true,
              })}
            />
            {errors.firstName && (
              <p className="text-sm text-red-600 mt-2" id="password-error">
                Required field
              </p>
            )}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="last-name" className="sr-only block text-sm font-medium text-gray-700">
              Last name ( optional )
            </label>
            <input
              type="text"
              id="last-name"
              autoComplete="family-name"
              placeholder="Last name ( optional )"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register('lastName')}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-6 mt-5">
          <div className="col-span-6">
            <label htmlFor="card-number" className="sr-only block text-sm font-medium text-gray-700">
              Card number
            </label>
            <input
              type="text"
              id="card-number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Card number"
              autoComplete="off"
              {...register('cardNumber', {
                required: true,
              })}
            />
            {errors.cardNumber && (
              <p className="text-sm text-red-600 mt-2" id="password-error">
                {errors.cardNumber.message}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="card-expiration-date" className="sr-only block text-sm font-medium text-gray-700">
              Expiration date
            </label>
            <input
              type="text"
              id="card-expiration-date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="MM / YY"
              maxLength={5}
              {...register('expirationDate', {
                required: true,
              })}
            />
            {errors.expirationDate && (
              <p className="text-sm text-red-600 mt-2" id="password-error">
                {errors.expirationDate.message}
              </p>
            )}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="card-cvc" className="sr-only block text-sm font-medium text-gray-700">
              CVC
            </label>
            <input
              type="text"
              id="card-cvc"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="CVC"
              {...register('cvc', {
                required: true,
              })}
            />
            {errors.cvc && (
              <p className="text-sm text-red-600 mt-2" id="password-error">
                {errors.cvc.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={onHandleChangeRoute}
          >
            Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Continue
            <ArrowRightIcon className="h-5 w-5 text-white ml-2" aria-hidden="true" />
          </button>
        </div>
      </form>
    </>
  )
}
