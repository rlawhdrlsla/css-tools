import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

export default function BoxModel() {
  const [marginTop, setMarginTop] = useState(20)
  const [marginRight, setMarginRight] = useState(20)
  const [marginBottom, setMarginBottom] = useState(20)
  const [marginLeft, setMarginLeft] = useState(20)
  const [paddingTop, setPaddingTop] = useState(16)
  const [paddingRight, setPaddingRight] = useState(16)
  const [paddingBottom, setPaddingBottom] = useState(16)
  const [paddingLeft, setPaddingLeft] = useState(16)
  const [borderWidth, setBorderWidth] = useState(2)
  const [borderStyle, setBorderStyle] = useState('solid')
  const [borderColor, setBorderColor] = useState('#6366f1')
  const [width, setWidth] = useState(120)
  const [height, setHeight] = useState(60)
  const [boxSizing, setBoxSizing] = useState('content-box')

  const BORDER_STYLES = ['solid', 'dashed', 'dotted', 'double', 'groove']

  const css = `box-sizing: ${boxSizing};
width: ${width}px;
height: ${height}px;
margin: ${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px;
padding: ${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px;
border: ${borderWidth}px ${borderStyle} ${borderColor};`

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Box Model Visualizer</h1>
      <p className="text-gray-500 mb-8">margin, padding, border가 어떻게 쌓이는지 시각적으로 확인하세요.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5">
          {/* box-sizing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">box-sizing</label>
            <div className="flex gap-2">
              {['content-box', 'border-box'].map(v => (
                <button key={v} onClick={() => setBoxSizing(v)}
                  className={`flex-1 py-1.5 rounded-lg text-sm border transition-colors ${boxSizing === v ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-gray-600">Width</label>
                <span className="text-xs text-indigo-600 font-mono">{width}px</span>
              </div>
              <input type="range" min={40} max={300} value={width} onChange={e => setWidth(+e.target.value)}
                className="w-full accent-indigo-500" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-gray-600">Height</label>
                <span className="text-xs text-indigo-600 font-mono">{height}px</span>
              </div>
              <input type="range" min={20} max={200} value={height} onChange={e => setHeight(+e.target.value)}
                className="w-full accent-indigo-500" />
            </div>
          </div>

          {/* Margin */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Margin <span className="text-xs text-gray-400 font-normal">(주황색)</span></p>
            <div className="grid grid-cols-2 gap-2">
              {[['Top', marginTop, setMarginTop], ['Right', marginRight, setMarginRight], ['Bottom', marginBottom, setMarginBottom], ['Left', marginLeft, setMarginLeft]].map(([label, val, setter]) => (
                <div key={label}>
                  <div className="flex justify-between mb-0.5">
                    <label className="text-xs text-gray-500">{label}</label>
                    <span className="text-xs text-orange-500 font-mono">{val}px</span>
                  </div>
                  <input type="range" min={0} max={80} value={val} onChange={e => setter(+e.target.value)}
                    className="w-full accent-orange-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Padding */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Padding <span className="text-xs text-gray-400 font-normal">(초록색)</span></p>
            <div className="grid grid-cols-2 gap-2">
              {[['Top', paddingTop, setPaddingTop], ['Right', paddingRight, setPaddingRight], ['Bottom', paddingBottom, setPaddingBottom], ['Left', paddingLeft, setPaddingLeft]].map(([label, val, setter]) => (
                <div key={label}>
                  <div className="flex justify-between mb-0.5">
                    <label className="text-xs text-gray-500">{label}</label>
                    <span className="text-xs text-green-600 font-mono">{val}px</span>
                  </div>
                  <input type="range" min={0} max={60} value={val} onChange={e => setter(+e.target.value)}
                    className="w-full accent-green-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Border */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Border</p>
            <div className="flex items-center gap-3 mb-2">
              <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border border-gray-300" />
              <div className="flex-1">
                <div className="flex justify-between mb-0.5">
                  <label className="text-xs text-gray-500">Width</label>
                  <span className="text-xs text-indigo-600 font-mono">{borderWidth}px</span>
                </div>
                <input type="range" min={0} max={20} value={borderWidth} onChange={e => setBorderWidth(+e.target.value)}
                  className="w-full accent-indigo-500" />
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {BORDER_STYLES.map(s => (
                <button key={s} onClick={() => setBorderStyle(s)}
                  className={`px-2.5 py-1 rounded text-xs border transition-colors ${borderStyle === s ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview + Code */}
        <div className="space-y-5">
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Preview</p>
            {/* Box Model Diagram */}
            <div className="bg-gray-50 rounded-xl flex items-center justify-center p-6" style={{ minHeight: 260 }}>
              {/* Margin (orange) */}
              <div
                style={{
                  backgroundColor: '#fed7aa',
                  padding: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
                  borderRadius: 4,
                  position: 'relative',
                }}
              >
                <span className="absolute top-0.5 left-1 text-xs text-orange-600 font-medium">margin</span>
                {/* Border */}
                <div
                  style={{
                    border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                    borderRadius: 2,
                    backgroundColor: '#c7d2fe',
                    position: 'relative',
                  }}
                >
                  <span className="absolute top-0.5 left-1 text-xs text-indigo-600 font-medium">border</span>
                  {/* Padding (green) */}
                  <div
                    style={{
                      backgroundColor: '#bbf7d0',
                      padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
                      position: 'relative',
                    }}
                  >
                    <span className="absolute top-0.5 left-1 text-xs text-green-700 font-medium">padding</span>
                    {/* Content */}
                    <div
                      style={{
                        width,
                        height,
                        backgroundColor: '#6366f1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 600,
                        borderRadius: 2,
                      }}
                    >
                      content
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
