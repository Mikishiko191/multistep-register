import { useState, useId } from 'react'
import { useRouter } from 'next/router'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

// Icons
import { ArrowRightIcon } from '@heroicons/react/20/solid'

const mailingLists = [
  { id: 1, title: 'Hyundai', description: 'South Korean car manufacturer' },
  { id: 2, title: 'Kia', description: 'Sister company Hyunda' },
  { id: 3, title: 'BYD', description: 'Build Your Dreams (BYD) Auto is an electric vehicle' },
  { id: 4, title: 'Nissan', description: 'Japanese car maker' },
  { id: 5, title: 'BMW', description: 'BMW has been a key pioneer of electric cars' },
  { id: 6, title: 'Mercedes-Benz', description: 'Rapidly expanding its pure-electric ‘EQ’ line-up' },
  { id: 7, title: 'Rivian', description: 'American startup Rivian is vying with Tesla' },
  { id: 8, title: 'Volkswagen', description: 'Stuttgart automaker Volkswagen Group' },
  { id: 9, title: 'Geely', description: 'Chinese conglomerate Geely Auto' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export interface CarModelProps {}

export const CarModel = (props: CarModelProps) => {
  const {} = props
  const [selectedMailingLists, setSelectedMailingLists] = useState([])
  const router = useRouter()

  const goToStep = (step: number, asPath: string) => {
    router.push(`/?step=${step}`, asPath)
  }
  return (
    <>
      <h2 className="font-semibold leading-6 text-indigo-600">4. Select car model</h2>

      <RadioGroup value={selectedMailingLists} onChange={setSelectedMailingLists}>
        <RadioGroup.Label className="text-base font-medium text-gray-900">Select your car model</RadioGroup.Label>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
          {mailingLists.map((mailingList) => (
            <RadioGroup.Option
              key={mailingList.id}
              value={mailingList}
              className={({ checked, active }) =>
                classNames(
                  checked ? 'border-transparent' : 'border-gray-300',
                  active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                  'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                        {mailingList.title}
                      </RadioGroup.Label>
                      <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                        {mailingList.description}
                      </RadioGroup.Description>
                    </span>
                  </span>
                  <CheckCircleIcon
                    className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                    aria-hidden="true"
                  />
                  <span
                    className={classNames(
                      active ? 'border' : 'border-2',
                      checked ? 'border-indigo-500' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-lg'
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <div className="mt-10 mb-10">
        <label htmlFor="your-car-model" className="block text-sm font-medium text-gray-700">
          {"Can't find your car model? Write yours = )"}
        </label>
        <input
          type="text"
          name="your-car-model"
          id="your-car-model"
          autoComplete="off"
          placeholder="Your car model"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

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