import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

export default function BorderRadius() {
  const [tl, setTl] = useState(8)
  const [tr, setTr] = useState(8)
  const [br, setBr] = useState(8)
  const [bl, setBl] = useState(8)
  const [linked, setLinked] = useState(true)
  const [bgColor, setBgColor] = useState('#6366f1')

  function setAll(val) {
    setTl(val); setTr(val); setBr(val); setBl(val)
  }

  function handleChange(setter, val) {
    if (linked) setAll(val)
    else setter(val)
  }

  const borderRadius = tl === tr && tr === br && br === bl
    ? `${tl}px`
    : `${tl}px ${tr}px ${br}px ${bl}px`

  const css = `border-radius: ${borderRadius};`

  const SliderRow = ({ label, value, setter }) => (
    <div>
      <div className="flex justify-between mb-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm text-indigo-600 font-mono">{value}px</span>
      </div>
      <input type="range" min={0} max={200} value={value}
        onChange={e => handleChange(setter, +e.target.value)}
        className="w-full accent-indigo-500" />
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Border Radius Generator</h1>
      <p className="text-gray-500 mb-8">각 모서리의 둥글기를 개별적으로 조절하세요.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5">
          {/* Link toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">개별 조절</span>
            <button
              onClick={() => setLinked(!linked)}
              className={`relative w-12 h-6 rounded-full transition-colors ${linked ? 'bg-gray-300' : 'bg-indigo-500'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${linked ? 'left-1' : 'left-7'}`} />
            </button>
          </div>

          <SliderRow label="Top Left" value={tl} setter={setTl} />
          <SliderRow label="Top Right" value={tr} setter={setTr} />
          <SliderRow label="Bottom Right" value={br} setter={setBr} />
          <SliderRow label="Bottom Left" value={bl} setter={setBl} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">색상</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-gray-300" />
              <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
          </div>
        </div>

        {/* Preview + Code */}
        <div className="space-y-5">
          <div className="bg-gray-100 rounded-xl flex items-center justify-center" style={{ minHeight: 240 }}>
            <div
              className="w-40 h-40"
              style={{ backgroundColor: bgColor, borderRadius }}
            />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">CSS Code</p>
            <CodeBlock code={css} />
          </div>
        </div>
      </div>
    </div>
  )
}
