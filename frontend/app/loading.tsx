export default function Loading() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin"
          aria-label="Loading"
        />
        <span className="label-section">Loading</span>
      </div>
    </div>
  )
}
