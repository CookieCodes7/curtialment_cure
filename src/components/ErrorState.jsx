export default function ErrorState({ message = 'Unable to load this data. Try again.', onRetry }) {
  return (
    <div className="rounded-xl border border-clay-200 bg-clay-50 px-5 py-4 text-sm text-clay-600">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-2 text-xs font-medium underline">
          Try again
        </button>
      )}
    </div>
  )
}
