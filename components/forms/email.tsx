import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

// Icons
import { ArrowRightIcon, EnvelopeIcon } from '@heroicons/react/20/solid'

// Context
import { useStore } from '../../context/form'

export interface EmailProps {}

interface EmailFormProps {
  email: string
}

export const Email = (props: EmailProps) => {
  const {} = props
  const { setStore, storageValues } = useStore()
  const router = useRouter()

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<EmailFormProps>()

  useEffect(() => {
    setValue('email', storageValues.email)
  }, [])

  // Do some request
  const onSubmit: SubmitHandler<EmailFormProps> = (data, e) => {
    e?.preventDefault()
    router.push(`/?step=1`)
    setStore(data)
  }

  return (
    <>
      <h2 className="font-semibold leading-6 text-indigo-600">1. Email</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">
          Email
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="email"
            id="email"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="you@example.com"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
          />
        </div>
        {!!errors.email?.message?.length && (
          <p className="text-sm text-red-600 mt-2" id="email-error">
            {errors.email?.message}
          </p>
        )}
        <div className="flex gap-2 mt-5">
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
