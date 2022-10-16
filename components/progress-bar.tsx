interface ProgressBarTypes {
  percent?: number
}

export const ProgressBar = ({ percent = 25 }: ProgressBarTypes) => {
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
