import { useRouter } from 'next/router'

// Icons
import { ArrowRightIcon, EnvelopeIcon } from '@heroicons/react/20/solid'

export interface EmailProps {}

export const Email = (props: EmailProps) => {
  const {} = props
  const router = useRouter()

  const goToStep = (step: number, asPath: string) => {
    router.push(`/?step=${step}`, asPath)
  }

  return (
    <>
      <h2 className="font-semibold leading-6 text-indigo-600">1. Email</h2>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">
          Email
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="you@example.com"
          />
        </div>
        <p className="text-sm text-red-600 mt-2" id="email-error">
          Your email invalid.
        </p>
      </div>
      <div className="flex gap-2 mt-5">
        {/* <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => goToStep(0, '/email')}
        >
          Back
        </button> */}
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => goToStep(1, '/password')}
        >
          Continue
          <ArrowRightIcon className="h-5 w-5 text-white ml-2" aria-hidden="true" />
        </button>
      </div>
    </>
  )
}
