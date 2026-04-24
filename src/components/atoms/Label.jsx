export default function Label({ htmlFor, children, hint, tag, className = '' }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-xs font-medium text-gray-500 mb-1 ${className}`}
    >
      {children}
      {hint && (
        <span className="ml-1.5 text-xs text-indigo-500 font-normal">{hint}</span>
      )}
      {tag && (
        <span className="ml-1.5 text-xs text-green-600 font-medium">{tag}</span>
      )}
    </label>
  );
}
