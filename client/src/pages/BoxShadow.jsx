import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

function ShadowLayer({ layer, onChange, onRemove }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-medium text-gray-600">Offset X</label>
            <span className="text-xs text-indigo-600 font-mono">{layer.x}px</span>
          </div>
          <input type="range" min={-50} max={50} value={layer.x}
            onChange={e => onChange({ ...layer, x: +e.target.value })}
            className="w-full accent-indigo-500" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-medium text-gray-600">Offset Y</label>
            <span className="text-xs text-indigo-600 font-mono">{layer.y}px</span>
          </div>
          <input type="range" min={-50} max={50} value={layer.y}
            onChange={e => onChange({ ...layer, y: +e.target.value })}
            className="w-full accent-indigo-500" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-medium text-gray-600">Blur</label>
            <span className="text-xs text-indigo-600 font-mono">{layer.blur}px</span>
          </div>
          <input type="range" min={0} max={100} value={layer.blur}
            onChange={e => onChange({ ...layer, blur: +e.target.value })}
            className="w-full accent-indigo-500" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-medium text-gray-600">Spread</label>
            <span className="text-xs text-indigo-600 font-mono">{layer.spread}px</span>
          </div>
          <input type="range" min={-30} max={50} value={layer.spread}
            onChange={e => onChange({ ...layer, spread: +e.target.value })}
            className="w-full accent-indigo-500" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex gap-2 items-center flex-1">
          <input type="color" value={layer.color} onChange={e => onChange({ ...layer, color: e.target.value })}
            className="w-9 h-9 rounded cursor-pointer border border-gray-300" />
          <input type="text" value={layer.color} onChange={e => onChange({ ...layer, color: e.target.value })}
            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
          <input type="checkbox" checked={layer.inset} onChange={e => onChange({ ...layer, inset: e.target.checked })}
            className="accent-indigo-500" />
          inset
        </label>
        <button onClick={onRemove} className="text-red-400 hover:text-red-600 text-sm px-2">✕</button>
      </div>
    </div>
  )
}

export default function BoxShadow() {
  const [layers, setLayers] = useState([
    { id: 1, x: 0, y: 4, blur: 16, spread: 0, color: '#00000026', inset: false },
  ])
  const [bgColor, setBgColor] = useState('#ffffff')
  const [boxColor, setBoxColor] = useState('#6366f1')

  function addLayer() {
    setLayers([...layers, { id: Date.now(), x: 0, y: 4, blur: 16, spread: 0, color: '#00000026', inset: false }])
  }

  function updateLayer(id, newLayer) {
    setLayers(layers.map(l => l.id === id ? newLayer : l))
  }

  function removeLayer(id) {
    setLayers(layers.filter(l => l.id !== id))
  }

  const shadowValue = layers.length === 0
    ? 'none'
    : layers.map(l => `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}`).join(',\n  ')

  const css = `box-shadow: ${shadowValue};`

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Box Shadow Generator</h1>
      <p className="text-gray-500 mb-8">그림자 레이어를 추가하고 실시간으로 조절하세요.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          {layers.map(layer => (
            <ShadowLayer
              key={layer.id}
              layer={layer}
              onChange={updated => updateLayer(layer.id, updated)}
              onRemove={() => removeLayer(layer.id)}
            />
          ))}
          <button onClick={addLayer}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
            + 레이어 추가
          </button>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-700 mb-3">배경 / 박스 색상</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-300" />
                <span className="text-xs text-gray-500">배경</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="color" value={boxColor} onChange={e => setBoxColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-300" />
                <span className="text-xs text-gray-500">박스</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview + Code */}
        <div className="space-y-5">
          <div
            className="rounded-xl flex items-center justify-center"
            style={{ backgroundColor: bgColor, minHeight: 240, padding: 40 }}
          >
            <div
              className="w-32 h-32 rounded-xl"
              style={{ backgroundColor: boxColor, boxShadow: shadowValue === 'none' ? 'none' : layers.map(l => `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}`).join(', ') }}
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
