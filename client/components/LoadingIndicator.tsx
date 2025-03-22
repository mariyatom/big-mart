export default function LoadingIndicator() {
  return (
    <div aria-label="Loading..." className="loading-indicator">
      <img
        src="client\assets\loading-gif.gif" // Adjusted for public folder
        alt="Loading..."
        className="loading-gif"
      />
    </div>
  )
}
