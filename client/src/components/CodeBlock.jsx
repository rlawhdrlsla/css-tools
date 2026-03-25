import { useState } from 'react'

export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative rounded-lg bg-gray-900 text-gray-100 text-sm font-mono">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-3 py-1 rounded text-xs bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="p-4 pr-20 overflow-x-auto whitespace-pre-wrap">{code}</pre>
    </div>
  )
}
