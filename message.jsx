export default function Message({ message }) {
  if (!message) return null;

  return (
    <div className={`message ${message.type}`}>
      <div dangerouslySetInnerHTML={{ __html: message.text }} />
    </div>
  );
}
