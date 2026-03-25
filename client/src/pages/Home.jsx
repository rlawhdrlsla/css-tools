import { Link } from 'react-router-dom'

const tools = [
  {
    path: '/text-styler',
    title: 'Text Styler',
    desc: '폰트 크기, 자간, 행간, 색상을 조절하고 CSS 코드를 바로 복사',
    icon: 'T',
    color: 'bg-violet-50 text-violet-600 border-violet-100',
  },
  {
    path: '/box-shadow',
    title: 'Box Shadow Generator',
    desc: '그림자 방향, 흐림도, 색상을 실시간으로 조절',
    icon: '◻',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    path: '/border-radius',
    title: 'Border Radius Generator',
    desc: '모서리 둥글기를 각 꼭짓점별로 개별 조절',
    icon: '◉',
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
  },
  {
    path: '/flexbox',
    title: 'Flexbox Builder',
    desc: '아이템 배치를 클릭으로 설정하고 CSS 코드 확인',
    icon: '⊞',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    path: '/button',
    title: 'Button Generator',
    desc: '배경, 테두리, 그림자를 조절해서 버튼 스타일 완성',
    icon: '▢',
    color: 'bg-orange-50 text-orange-600 border-orange-100',
  },
  {
    path: '/box-model',
    title: 'Box Model Visualizer',
    desc: 'margin, border, padding이 어떻게 쌓이는지 시각적으로 확인',
    icon: '⊡',
    color: 'bg-pink-50 text-pink-600 border-pink-100',
  },
]

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">CSS Generator Tools</h1>
        <p className="text-gray-500 text-lg">슬라이더로 조절하면 CSS 코드가 자동으로 만들어집니다.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-gray-300 transition-all"
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border text-lg font-bold mb-4 ${tool.color}`}>
              {tool.icon}
            </div>
            <h2 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
              {tool.title}
            </h2>
            <p className="text-sm text-gray-500">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
