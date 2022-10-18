import { useRouter } from 'next/router'

const steps = [
  { name: 'Email', step: 0 },
  { name: 'Password', step: 1 },
  { name: 'Bank Details', step: 2 },
  { name: 'Car model', step: 3 },
  { name: 'Car registration', step: 4 },
]

export const Steps = () => {
  const router = useRouter()
  const formStep = router.query.step ?? 0

  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step) => (
          <li key={step.name} className="md:flex-1">
            {formStep > step.step - 1 ? (
              <button
                onClick={() => router.push(`/?step=${step.step}`)}
                className="flex w-full flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                aria-current="step"
              >
                {/* <span className="text-sm font-medium text-indigo-600">{index + 1}</span> */}
                <span className="text-sm font-medium">{step.name}</span>
              </button>
            ) : (
              <button
                // onClick={() => goToStep(step.step, step.href)}
                className="group w-full flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
              >
                {/* <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{index + 1}</span> */}
                <span className="text-sm font-medium">{step.name}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
