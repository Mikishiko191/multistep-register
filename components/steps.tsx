import { useRouter } from 'next/router'

const steps = [
  // { name: 'Email', href: '/email', step: 0, status: 'complete' },
  // { name: 'Password', href: '/password', step: 1, status: 'current' },
  { name: 'Email', href: '/email', step: 0, status: 'current' },
  { name: 'Password', href: '/password', step: 1, status: 'upcoming' },
  { name: 'Bank Details', href: '/bank-details', step: 2, status: 'upcoming' },
  { name: 'Car model', href: '/choose-car-model', step: 3, status: 'upcoming' },
  { name: 'Car registration', href: '/upload-car-registration', step: 4, status: 'upcoming' },
]

export const Steps = () => {
  const router = useRouter()

  const goToStep = (step: number, asPath: string) => {
    router.push(`/?step=${step}`, asPath)
  }

  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step, index) => (
          <li key={step.name} className="md:flex-1">
            {step.status === 'complete' ? (
              <button
                onClick={() => goToStep(step.step, step.href)}
                className="group w-full flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
              >
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">{index + 1}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </button>
            ) : step.status === 'current' ? (
              <button
                onClick={() => goToStep(step.step, step.href)}
                className="flex w-full flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                aria-current="step"
              >
                <span className="text-sm font-medium text-indigo-600">{index + 1}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </button>
            ) : (
              <button
                onClick={() => goToStep(step.step, step.href)}
                className="group w-full flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
              >
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{index + 1}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
