import { useState, useRef, useEffect } from 'react'
import CodeBlock from '../components/CodeBlock'

const CANVAS_W = 1024
const CANVAS_H = 768

function genId() {
  return Math.random().toString(36).slice(2, 9)
}

const PALETTE = [
  { type: 'box',      label: 'Box',       icon: '⬜', defaults: { w: 160, h: 120, bg: '#e0e7ff', br: 8,  opacity: 1, color: '#4338ca', text: '',           shadow: false } },
  { type: 'text',     label: 'Text',      icon: 'T',  defaults: { w: 180, h: 40,  bg: 'transparent', br: 0,  opacity: 1, color: '#111827', text: '텍스트',    shadow: false, fontSize: 16, fontWeight: 400 } },
  { type: 'heading',  label: 'Heading',   icon: 'H1', defaults: { w: 260, h: 56,  bg: 'transparent', br: 0,  opacity: 1, color: '#111827', text: '제목',      shadow: false, fontSize: 32, fontWeight: 700 } },
  { type: 'button',   label: 'Button',    icon: '▢',  defaults: { w: 120, h: 44,  bg: '#6366f1',     br: 8,  opacity: 1, color: '#ffffff', text: '버튼',      shadow: false, fontSize: 14, fontWeight: 600 } },
  { type: 'card',     label: 'Card',      icon: '🃏', defaults: { w: 220, h: 160, bg: '#ffffff',     br: 12, opacity: 1, color: '#374151', text: '',           shadow: true  } },
  { type: 'image',    label: 'Image',     icon: '🖼', defaults: { w: 200, h: 140, bg: '#e5e7eb',     br: 0,  opacity: 1, color: '#9ca3af', text: 'Image',     shadow: false } },
  { type: 'circle',   label: 'Circle',    icon: '⬤',  defaults: { w: 80,  h: 80,  bg: '#fbbf24',     br: 50, opacity: 1, color: '#78350f', text: '',           shadow: false } },
  { type: 'divider',  label: 'Divider',   icon: '—',  defaults: { w: 400, h: 2,   bg: '#e5e7eb',     br: 0,  opacity: 1, color: '',         text: '',           shadow: false } },
  { type: 'navbar',   label: 'Navbar',    icon: '☰',  defaults: { w: CANVAS_W, h: 60,  bg: '#1e293b', br: 0,  opacity: 1, color: '#f8fafc', text: 'Logo',     shadow: false } },
  { type: 'sidebar',  label: 'Sidebar',   icon: '▌',  defaults: { w: 220, h: CANVAS_H, bg: '#f8fafc', br: 0, opacity: 1, color: '#374151', text: '',          shadow: false } },
  { type: 'badge',    label: 'Badge',     icon: '◉',  defaults: { w: 80,  h: 28,  bg: '#dcfce7',     br: 20, opacity: 1, color: '#166534', text: 'Badge',     shadow: false, fontSize: 12, fontWeight: 600 } },
  { type: 'input',    label: 'Input',     icon: '▬',  defaults: { w: 240, h: 44,  bg: '#ffffff',     br: 6,  opacity: 1, color: '#9ca3af', text: '입력창...',  shadow: false, border: true } },
]

const HANDLE_DIRS = ['nw','n','ne','e','se','s','sw','w']

function handleCursorClass(h) {
  return { nw:'cursor-nw-resize', n:'cursor-n-resize', ne:'cursor-ne-resize', e:'cursor-e-resize', se:'cursor-se-resize', s:'cursor-s-resize', sw:'cursor-sw-resize', w:'cursor-w-resize' }[h]
}
function handlePos(h) {
  return {
    nw: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    n:  'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
    ne: 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    e:  'top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
    se: 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
    s:  'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
    sw: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    w:  'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
  }[h]
}

function PropRow({ label, children }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 mb-1">{label}</p>
      {children}
    </div>
  )
}

function NumberInput({ value, onChange, min, max }) {
  return (
    <input type="number" value={value} min={min} max={max}
      onChange={e => onChange(+e.target.value)}
      className="w-full border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400" />
  )
}

export default function LayoutBuilder() {
  const canvasRef = useRef(null)
  const [elements, setElements] = useState([])
  const [selected, setSelected] = useState(null)
  const [showCode, setShowCode] = useState(false)
  const [zoom, setZoom] = useState(1)
  const dragMove = useRef(null)
  const dragResize = useRef(null)

  const selectedEl = elements.find(el => el.id === selected)

  // Drop from palette
  function onCanvasDrop(e) {
    e.preventDefault()
    const type = e.dataTransfer.getData('palette-type')
    if (!type) return
    const item = PALETTE.find(p => p.type === type)
    if (!item) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = Math.round((e.clientX - rect.left) / zoom - item.defaults.w / 2)
    const y = Math.round((e.clientY - rect.top) / zoom - item.defaults.h / 2)
    const el = { id: genId(), type, x: Math.max(0, x), y: Math.max(0, y), ...item.defaults }
    setElements(prev => [...prev, el])
    setSelected(el.id)
  }

  // Start moving element
  function onElMouseDown(e, id) {
    if (e.target.dataset.resizeHandle) return
    e.preventDefault()
    e.stopPropagation()
    setSelected(id)
    const el = elements.find(el => el.id === id)
    dragMove.current = { id, startX: e.clientX, startY: e.clientY, origX: el.x, origY: el.y }
  }

  // Start resizing
  function onHandleMouseDown(e, id, handle) {
    e.preventDefault()
    e.stopPropagation()
    const el = elements.find(el => el.id === id)
    dragResize.current = { id, handle, startX: e.clientX, startY: e.clientY, origX: el.x, origY: el.y, origW: el.w, origH: el.h }
  }

  useEffect(() => {
    function onMouseMove(e) {
      if (dragMove.current) {
        const { id, startX, startY, origX, origY } = dragMove.current
        const dx = (e.clientX - startX) / zoom
        const dy = (e.clientY - startY) / zoom
        setElements(prev => prev.map(el => el.id !== id ? el : {
          ...el, x: Math.max(0, Math.round(origX + dx)), y: Math.max(0, Math.round(origY + dy))
        }))
      }
      if (dragResize.current) {
        const { id, handle, startX, startY, origX, origY, origW, origH } = dragResize.current
        const dx = (e.clientX - startX) / zoom
        const dy = (e.clientY - startY) / zoom
        let x = origX, y = origY, w = origW, h = origH
        if (handle.includes('e')) w = Math.max(20, origW + dx)
        if (handle.includes('s')) h = Math.max(4, origH + dy)
        if (handle.includes('w')) { w = Math.max(20, origW - dx); x = origX + origW - w }
        if (handle.includes('n')) { h = Math.max(4, origH - dy); y = origY + origH - h }
        setElements(prev => prev.map(el => el.id !== id ? el : {
          ...el, x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h)
        }))
      }
    }
    function onMouseUp() {
      dragMove.current = null
      dragResize.current = null
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp) }
  }, [zoom])

  // Keyboard delete
  useEffect(() => {
    function onKey(e) {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selected) {
        if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return
        deleteSelected()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'd' && selected) {
        e.preventDefault()
        duplicateSelected()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, elements])

  function update(key, value) {
    setElements(prev => prev.map(el => el.id === selected ? { ...el, [key]: value } : el))
  }

  function deleteSelected() {
    setElements(prev => prev.filter(el => el.id !== selected))
    setSelected(null)
  }

  function duplicateSelected() {
    const el = elements.find(el => el.id === selected)
    if (!el) return
    const copy = { ...el, id: genId(), x: el.x + 20, y: el.y + 20 }
    setElements(prev => [...prev, copy])
    setSelected(copy.id)
  }

  function bringToFront() {
    setElements(prev => { const el = prev.find(e => e.id === selected); return [...prev.filter(e => e.id !== selected), el] })
  }
  function sendToBack() {
    setElements(prev => { const el = prev.find(e => e.id === selected); return [el, ...prev.filter(e => e.id !== selected)] })
  }

  function generateCSS() {
    if (elements.length === 0) return '/* 캔버스에 요소를 추가하세요 */'
    const lines = ['.canvas {\n  position: relative;\n  width: 1024px;\n  height: 768px;\n}\n']
    elements.forEach((el, i) => {
      const cls = `.${el.type}-${i + 1}`
      const props = [
        'position: absolute;',
        `left: ${el.x}px;`,
        `top: ${el.y}px;`,
        `width: ${el.w}px;`,
        `height: ${el.h}px;`,
      ]
      if (el.bg && el.bg !== 'transparent') props.push(`background-color: ${el.bg};`)
      if (el.br) props.push(`border-radius: ${el.br}px;`)
      if (el.color) props.push(`color: ${el.color};`)
      if (el.opacity !== 1) props.push(`opacity: ${el.opacity};`)
      if (el.shadow) props.push(`box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);`)
      if (el.fontSize) props.push(`font-size: ${el.fontSize}px;`)
      if (el.fontWeight && el.fontWeight !== 400) props.push(`font-weight: ${el.fontWeight};`)
      if (el.border) props.push(`border: 1px solid #e5e7eb;`)
      lines.push(`${cls} {\n  ${props.join('\n  ')}\n}`)
    })
    return lines.join('\n')
  }

  function renderElement(el) {
    const isSelected = el.id === selected
    const style = {
      position: 'absolute', left: el.x, top: el.y, width: el.w, height: el.h,
      backgroundColor: el.bg !== 'transparent' ? el.bg : undefined,
      borderRadius: el.br, color: el.color, opacity: el.opacity,
      boxShadow: el.shadow ? '0 4px 16px rgba(0,0,0,0.08)' : undefined,
      fontSize: el.fontSize, fontWeight: el.fontWeight,
      border: el.border ? '1px solid #e5e7eb' : isSelected ? '2px solid #6366f1' : undefined,
      outline: isSelected && !el.border ? '2px solid #6366f1' : undefined,
      outlineOffset: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: dragMove.current ? 'grabbing' : 'grab',
      userSelect: 'none', boxSizing: 'border-box', overflow: 'hidden',
    }
    return (
      <div key={el.id} style={style}
        onMouseDown={e => onElMouseDown(e, el.id)}
        onClick={e => { e.stopPropagation(); setSelected(el.id) }}
      >
        {el.type === 'image' ? (
          <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" opacity="0.4" style={{ pointerEvents: 'none' }}>
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5"/>
            <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5"/>
            <path d="M21 15l-5-5L5 21" strokeWidth="1.5"/>
          </svg>
        ) : el.text ? (
          <span style={{ pointerEvents: 'none', padding: '0 10px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {el.text}
          </span>
        ) : null}

        {isSelected && HANDLE_DIRS.map(h => (
          <div key={h} data-resize-handle={h}
            className={`absolute w-2.5 h-2.5 bg-white border-2 border-indigo-500 rounded-sm z-20 ${handlePos(h)} ${handleCursorClass(h)}`}
            onMouseDown={e => onHandleMouseDown(e, el.id, h)}
          />
        ))}
      </div>
    )
  }

  return (
    <div style={{ height: 'calc(100vh - 56px)' }} className="flex overflow-hidden bg-gray-50">

      {/* ── Left Palette ── */}
      <div className="w-40 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="px-3 py-2.5 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Elements</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {PALETTE.map(item => (
            <div key={item.type} draggable
              onDragStart={e => e.dataTransfer.setData('palette-type', item.type)}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-grab active:cursor-grabbing hover:bg-indigo-50 hover:text-indigo-700 text-gray-700 transition-colors select-none group"
            >
              <span className="text-sm w-5 text-center font-mono">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Canvas Area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="h-10 bg-white border-b border-gray-200 flex items-center px-3 gap-2 shrink-0">
          <span className="text-xs text-gray-400 mr-1">{elements.length}개 요소</span>
          <div className="w-px h-4 bg-gray-200" />
          {selectedEl && (
            <>
              <button onClick={sendToBack}    className="text-xs px-2 py-1 rounded hover:bg-gray-100 text-gray-500">뒤로</button>
              <button onClick={bringToFront}  className="text-xs px-2 py-1 rounded hover:bg-gray-100 text-gray-500">앞으로</button>
              <button onClick={duplicateSelected} className="text-xs px-2 py-1 rounded hover:bg-gray-100 text-gray-500">복제 ⌘D</button>
              <button onClick={deleteSelected} className="text-xs px-2 py-1 rounded hover:bg-red-50 text-red-400">삭제 Del</button>
              <div className="w-px h-4 bg-gray-200" />
            </>
          )}
          <div className="flex items-center gap-1 ml-auto">
            <button onClick={() => setZoom(z => Math.max(0.25, +(z - 0.25).toFixed(2)))} className="text-xs w-7 h-7 rounded hover:bg-gray-100 text-gray-500 flex items-center justify-center">−</button>
            <span className="text-xs text-gray-500 w-12 text-center font-mono">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(2, +(z + 0.25).toFixed(2)))} className="text-xs w-7 h-7 rounded hover:bg-gray-100 text-gray-500 flex items-center justify-center">+</button>
            <div className="w-px h-4 bg-gray-200 mx-1" />
            <button onClick={() => setShowCode(!showCode)}
              className={`text-xs px-3 py-1 rounded font-medium transition-colors ${showCode ? 'bg-gray-800 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
              {showCode ? '← 캔버스' : 'CSS 코드'}
            </button>
            <button onClick={() => { setElements([]); setSelected(null) }} className="text-xs px-2 py-1 rounded hover:bg-gray-100 text-gray-400">초기화</button>
          </div>
        </div>

        {showCode ? (
          <div className="flex-1 overflow-auto p-6">
            <CodeBlock code={generateCSS()} />
          </div>
        ) : (
          <div className="flex-1 overflow-auto p-8 flex items-start justify-center">
            <div
              ref={canvasRef}
              className="relative bg-white shadow-lg"
              style={{
                width: CANVAS_W * zoom,
                height: CANVAS_H * zoom,
                minWidth: CANVAS_W * zoom,
              }}
              onDragOver={e => e.preventDefault()}
              onDrop={onCanvasDrop}
              onClick={() => setSelected(null)}
            >
              {/* Dot grid */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
                backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
                opacity: 0.6,
              }} />

              {/* Canvas size ruler label */}
              <div className="absolute bottom-2 right-3 text-xs text-gray-300 pointer-events-none select-none font-mono">
                {CANVAS_W} × {CANVAS_H}
              </div>

              {/* Elements (scale transform) */}
              <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', width: CANVAS_W, height: CANVAS_H, position: 'absolute', top: 0, left: 0 }}>
                {elements.map(renderElement)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Right Panel ── */}
      {selectedEl && !showCode && (
        <div className="w-52 bg-white border-l border-gray-200 flex flex-col shrink-0 overflow-y-auto">
          <div className="px-3 py-2.5 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{selectedEl.type}</span>
            <span className="text-xs text-gray-300 font-mono">{selectedEl.w}×{selectedEl.h}</span>
          </div>
          <div className="p-3 space-y-4">

            {/* Position & Size */}
            <PropRow label="위치 / 크기">
              <div className="grid grid-cols-2 gap-1.5">
                {[['X', 'x'], ['Y', 'y'], ['W', 'w'], ['H', 'h']].map(([l, k]) => (
                  <div key={k}>
                    <label className="text-xs text-gray-400">{l}</label>
                    <NumberInput value={selectedEl[k]} onChange={v => update(k, v)} min={0} />
                  </div>
                ))}
              </div>
            </PropRow>

            {/* Background */}
            <PropRow label="배경색">
              <div className="flex gap-2 items-center">
                <input type="color"
                  value={selectedEl.bg === 'transparent' ? '#ffffff' : selectedEl.bg}
                  onChange={e => update('bg', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-200" />
                <input type="text" value={selectedEl.bg} onChange={e => update('bg', e.target.value)}
                  className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-400" />
              </div>
            </PropRow>

            {/* Text color */}
            <PropRow label="텍스트 색">
              <div className="flex gap-2 items-center">
                <input type="color" value={selectedEl.color || '#000000'}
                  onChange={e => update('color', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-200" />
                <input type="text" value={selectedEl.color} onChange={e => update('color', e.target.value)}
                  className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-400" />
              </div>
            </PropRow>

            {/* Border Radius */}
            <PropRow label={`Border Radius — ${selectedEl.br}px`}>
              <input type="range" min={0} max={200} value={selectedEl.br}
                onChange={e => update('br', +e.target.value)} className="w-full accent-indigo-500" />
            </PropRow>

            {/* Opacity */}
            <PropRow label={`Opacity — ${Math.round(selectedEl.opacity * 100)}%`}>
              <input type="range" min={0} max={1} step={0.01} value={selectedEl.opacity}
                onChange={e => update('opacity', +e.target.value)} className="w-full accent-indigo-500" />
            </PropRow>

            {/* Text content */}
            {selectedEl.text !== undefined && (
              <PropRow label="텍스트">
                <input type="text" value={selectedEl.text} onChange={e => update('text', e.target.value)}
                  placeholder="없음"
                  className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400" />
              </PropRow>
            )}

            {/* Font Size */}
            {selectedEl.fontSize !== undefined && (
              <PropRow label={`Font Size — ${selectedEl.fontSize}px`}>
                <input type="range" min={8} max={72} value={selectedEl.fontSize}
                  onChange={e => update('fontSize', +e.target.value)} className="w-full accent-indigo-500" />
              </PropRow>
            )}

            {/* Font Weight */}
            {selectedEl.fontWeight !== undefined && (
              <PropRow label="Font Weight">
                <div className="flex flex-wrap gap-1">
                  {[300, 400, 500, 600, 700, 900].map(w => (
                    <button key={w} onClick={() => update('fontWeight', w)}
                      className={`px-2 py-0.5 rounded text-xs border transition-colors ${selectedEl.fontWeight === w ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                      {w}
                    </button>
                  ))}
                </div>
              </PropRow>
            )}

            {/* Shadow */}
            {selectedEl.shadow !== undefined && (
              <label className="flex items-center gap-2 text-xs font-medium text-gray-500 cursor-pointer">
                <input type="checkbox" checked={!!selectedEl.shadow}
                  onChange={e => update('shadow', e.target.checked)}
                  className="accent-indigo-500" />
                Box Shadow
              </label>
            )}

          </div>
        </div>
      )}
    </div>
  )
}
