import { useState, useEffect, RefObject } from 'react'
import { useRouter } from 'next/router'

// Icons
import { RadioGroup } from '@headlessui/react'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

// Context
import { useStore } from '../../context/form'

// Utils
import { classNames } from '../../utils/classNames'
import { options } from '../../utils/scroll-view-options'
import { wait } from '../../utils/wait'

// Server
import { CarListData } from '../../pages/api/car-list'

export interface CarModelProps {
  nextRef: RefObject<HTMLDivElement> | null
  prevRef: RefObject<HTMLDivElement> | null
  carList: CarListData[]
}

export const CarModel = (props: CarModelProps) => {
  const { nextRef, prevRef, carList } = props
  const { setStore, storageValues } = useStore()
  const [selectedCarModel, setSelectedCarModel] = useState<CarListData | null>()
  const [typeOwnCarModel, setTypeOwnCarModel] = useState('')
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const router = useRouter()

  useEffect(() => {
    const setTimeOut = setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
    return () => clearTimeout(setTimeOut)
  }, [errorMessage])

  useEffect(() => {
    setTypeOwnCarModel(storageValues.carModel)
  }, [])

  const onHandleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (selectedCarModel?.id || !!typeOwnCarModel.length) {
      if (selectedCarModel?.id) {
        setStore({ carModel: selectedCarModel.title })
        router.push(`/?step=4`)
        if (nextRef?.current) {
          await wait(500)
          nextRef?.current.scrollIntoView(options)
        }
      } else {
        setStore({ carModel: typeOwnCarModel })
        router.push(`/?step=4`)
        if (nextRef?.current) {
          await wait(500)
          nextRef?.current.scrollIntoView(options)
        }
      }
    } else {
      setErrorMessage('Required. Select card model or type your own model and hit continue')
    }
  }

  const onHandleChangeRoute = async () => {
    router.push(`/?step=2`)

    if (prevRef?.current) {
      await wait(500)
      prevRef?.current.scrollIntoView(options)
    }
  }

  const onHandleSelectCarModel = (selectedModel: CarListData) => {
    setTypeOwnCarModel('')
    setSelectedCarModel((prevSelectedModel) => {
      if (prevSelectedModel?.id === selectedModel.id) {
        return null
      } else {
        return selectedModel
      }
    })
  }

  const onHandleTypeOwnModel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCarModel(null)
    setTypeOwnCarModel(event.target.value)
  }

  return (
    <>
      <h2 className="font-semibold leading-6 text-indigo-600">4. Select car model</h2>
      <form onSubmit={onHandleSubmit}>
        <RadioGroup value={selectedCarModel}>
          <RadioGroup.Label className="text-base font-medium text-gray-900">Select your car model</RadioGroup.Label>

          <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4">
            {carList.map((car) => (
              <RadioGroup.Option
                key={car.id}
                value={car}
                onClick={() => onHandleSelectCarModel(car)}
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
                          {car.title}
                        </RadioGroup.Label>
                        <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                          {car.description}
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
            placeholder="Car model"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={onHandleTypeOwnModel}
            onClick={() => setSelectedCarModel(null)}
            value={typeOwnCarModel || ''}
          />
        </div>
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

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
