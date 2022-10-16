import { useRouter } from 'next/router'

// Icons
import { ArrowRightIcon, EnvelopeIcon } from '@heroicons/react/20/solid'

export interface BankDetailsProps {}

export const BankDetails = (props: BankDetailsProps) => {
  const {} = props
  const router = useRouter()

  const goToStep = (step: number, asPath: string) => {
    router.push(`/?step=${step}`, asPath)
  }

  return (
    <>
      <h2 className="font-semibold leading-6 text-indigo-600">3. Bank details</h2>

      <form action="#" method="POST">
        <p>Card details</p>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label htmlFor="card-number" className="sr-only block text-sm font-medium text-gray-700">
              Card number
            </label>
            <input
              type="text"
              name="card-number"
              id="card-number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Card number"
              autoComplete="off"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="card-expiration-date" className="sr-only block text-sm font-medium text-gray-700">
              Expiration date
            </label>
            <input
              type="text"
              name="card-expiration-date"
              id="card-expiration-date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="MM / YY"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="card-cvc" className="sr-only block text-sm font-medium text-gray-700">
              CVC
            </label>
            <input
              type="text"
              name="card-cvc"
              id="card-cvc"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="CVC"
            />
          </div>
        </div>

        <p>Billing address</p>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              autoComplete="family-name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              id="country"
              name="country"
              autoComplete="country-name"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option>Germany</option>
              <option>United States</option>
              <option>Canada</option>
              <option>France</option>
              <option>Georgia</option>
            </select>
          </div>

          <div className="col-span-6">
            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
              Street address
            </label>
            <input
              type="text"
              name="street-address"
              id="street-address"
              autoComplete="street-address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              autoComplete="address-level2"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
              State / Province
            </label>
            <input
              type="text"
              name="region"
              id="region"
              autoComplete="address-level1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
              ZIP / Postal code
            </label>
            <input
              type="text"
              name="postal-code"
              id="postal-code"
              autoComplete="postal-code"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </form>

      <div className="flex gap-2 mt-5">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => goToStep(0, '/email')}
        >
          Back
        </button>
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
