import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// Icons
import { ArrowRightIcon, LockClosedIcon } from '@heroicons/react/20/solid'

// Context
import { useStore } from '../../context/form'

export interface PasswordProps {}

interface PasswordsFormProps {
  password: string
  passwordConfirm: string
}

const formSchema = Yup.object().shape({
  password: Yup.string().required('Password is required').min(4, 'Password length should be at least 4 characters'),
  passwordConfirm: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must and should match'),
})

export const Password = (props: PasswordProps) => {
  const {} = props
  const { setStore } = useStore()
  const router = useRouter()

  const validationOpt = { resolver: yupResolver(formSchema) }

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<PasswordsFormProps>(validationOpt)

  // Do some request
  const onSubmit: SubmitHandler<PasswordsFormProps> = (data) => {
    setStore(data)
    router.push(`/?step=2`)
  }

  return (
    <>
      <h2 className="font-semibold leading-6 text-indigo-600">2. Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 sr-only">
            password
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="password"
              id="password"
              className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              {...register('password', {
                required: true,
              })}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-600 mt-2" id="password-error">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mt-5">
          <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700 sr-only">
            password
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="password"
              id="password-confirm"
              className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Confirm password"
              {...register('passwordConfirm', {
                required: true,
              })}
            />
          </div>
          {errors.passwordConfirm && (
            <p className="text-sm text-red-600 mt-2" id="password-error">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>

        <div className="flex gap-2 mt-5">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => router.push(`/?step=0`)}
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
