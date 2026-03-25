import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

export default function ButtonGenerator() {
  const [label, setLabel] = useState('Click me')
  const [bgColor, setBgColor] = useState('#6366f1')
  const [textColor, setTextColor] = useState('#ffffff')
  const [paddingX, setPaddingX] = useState(24)
  const [paddingY, setPaddingY] = useState(12)
  const [fontSize, setFontSize] = useState(16)
  const [fontWeight, setFontWeight] = useState(600)
  const [radius, setRadius] = useState(8)
  const [borderWidth, setBorderWidth] = useState(0)
  const [borderColor, setBorderColor] = useState('#6366f1')
  const [shadowX, setShadowX] = useState(0)
  const [shadowY, setShadowY] = useState(4)
  const [shadowBlur, setShadowBlur] = useState(12)
  const [shadowColor, setShadowColor] = useState('#6366f140')
  const [enableShadow, setEnableShadow] = useState(true)

  const shadow = enableShadow ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}` : 'none'

  const buttonStyle = {
    backgroundColor: bgColor,
    color: textColor,
    padding: `${paddingY}px ${paddingX}px`,
    fontSize: `${fontSize}px`,
    fontWeight,
    borderRadius: `${radius}px`,
    border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none',
    boxShadow: shadow,
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'inline-block',
  }

  const css = `background-color: ${bgColor};
color: ${textColor};
padding: ${paddingY}px ${paddingX}px;
font-size: ${fontSize}px;
font-weight: ${fontWeight};
border-radius: ${radius}px;${borderWidth > 0 ? `\nborder: ${borderWidth}px solid ${borderColor};` : '\nborder: none;'}
box-shadow: ${shadow};
cursor: pointer;
transition: all 0.2s;`

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Button Generator</h1>
      <p className="text-gray-500 mb-8">버튼 스타일을 조절하고 CSS 코드를 복사하세요.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          {/* Label */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">버튼 텍스트</label>
            <input type="text" value={label} onChange={e => setLabel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">배경색</label>
              <div className="flex gap-2 items-center">
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border border-gray-300" />
                <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">텍스트 색</label>
              <div className="flex gap-2 items-center">
                <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border border-gray-300" />
                <input type="text" value={textColor} onChange={e => setTextColor(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-400" />
              </div>
            </div>
          </div>

          {/* Padding */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-gray-600">Padding X</label>
                <span className="text-xs text-indigo-600 font-mono">{paddingX}px</span>
              </div>
              <input type="range" min={4} max={80} value={paddingX} onChange={e => setPaddingX(+e.target.value)}
                className="w-full accent-indigo-500" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-gray-600">Padding Y</label>
                <span className="text-xs text-indigo-600 font-mono">{paddingY}px</span>
              </div>
              <input type="range" min={4} max={40} value={paddingY} onChange={e => setPaddingY(+e.target.value)}
                className="w-full accent-indigo-500" />
            </div>
          </div>

          {/* Font */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-gray-600">Font Size</label>
                <span className="text-xs text-indigo-600 font-mono">{fontSize}px</span>
              </div>
              <input type="range" min={10} max={32} value={fontSize} onChange={e => setFontSize(+e.target.value)}
                className="w-full accent-indigo-500" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-gray-600">Font Weight</label>
                <span className="text-xs text-indigo-600 font-mono">{fontWeight}</span>
              </div>
              <input type="range" min={100} max={900} step={100} value={fontWeight} onChange={e => setFontWeight(+e.target.value)}
                className="w-full accent-indigo-500" />
            </div>
          </div>

          {/* Border Radius */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">Border Radius</label>
              <span className="text-sm text-indigo-600 font-mono">{radius}px</span>
            </div>
            <input type="range" min={0} max={60} value={radius} onChange={e => setRadius(+e.target.value)}
              className="w-full accent-indigo-500" />
          </div>

          {/* Border */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">Border Width</label>
              <span className="text-sm text-indigo-600 font-mono">{borderWidth}px</span>
            </div>
            <input type="range" min={0} max={8} value={borderWidth} onChange={e => setBorderWidth(+e.target.value)}
              className="w-full accent-indigo-500" />
            {borderWidth > 0 && (
              <div className="flex gap-2 items-center mt-2">
                <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-300" />
                <input type="text" value={borderColor} onChange={e => setBorderColor(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-400" />
              </div>
            )}
          </div>

          {/* Shadow */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 cursor-pointer">
              <input type="checkbox" checked={enableShadow} onChange={e => setEnableShadow(e.target.checked)}
                className="accent-indigo-500" />
              Box Shadow
            </label>
            {enableShadow && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-medium text-gray-600">Y offset</label>
                    <span className="text-xs text-indigo-600 font-mono">{shadowY}px</span>
                  </div>
                  <input type="range" min={-20} max={40} value={shadowY} onChange={e => setShadowY(+e.target.value)}
                    className="w-full accent-indigo-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-medium text-gray-600">Blur</label>
                    <span className="text-xs text-indigo-600 font-mono">{shadowBlur}px</span>
                  </div>
                  <input type="range" min={0} max={60} value={shadowBlur} onChange={e => setShadowBlur(+e.target.value)}
                    className="w-full accent-indigo-500" />
                </div>
                <div className="col-span-2 flex gap-2 items-center">
                  <input type="color" value={shadowColor.slice(0, 7)} onChange={e => setShadowColor(e.target.value + '40')}
                    className="w-8 h-8 rounded cursor-pointer border border-gray-300" />
                  <input type="text" value={shadowColor} onChange={e => setShadowColor(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-400" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview + Code */}
        <div className="space-y-5">
          <div className="bg-gray-100 rounded-xl flex items-center justify-center" style={{ minHeight: 180 }}>
            <button style={buttonStyle}>{label || 'Button'}</button>
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
