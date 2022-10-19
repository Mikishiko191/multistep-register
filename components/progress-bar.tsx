import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Hooks
import { useLocalStorage } from '../hooks/useLocalStorage'

interface ProgressBarTypes {
  percent?: number
}

export const ProgressBar = ({ percent = 25 }: ProgressBarTypes) => {
  const router = useRouter()
  const formStep = router.query.step ?? 0
  const [_formStepValue, setFormStepValue] = useLocalStorage<typeof formStep>('form-step', 0)

  useEffect(() => {
    setFormStepValue(formStep)
  }, [setFormStepValue, percent, formStep])

  return (
    <div>
      <h4 className="sr-only">Progress bar</h4>
      <div className="mt-6" aria-hidden="true">
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div className="h-1 rounded-full bg-indigo-600" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  )
}
