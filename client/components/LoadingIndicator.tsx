export default function LoadingIndicator() {
  return (
    <div
      data-testid="loading-indicator"
      aria-label="Loading..."
      className="loading-indicator"
    >
      <img
        src="client\assets\loading-gif.gif" // Adjusted for public folder
        alt="Loading..."
        className="loading-gif"
      />
    </div>
  )
}
