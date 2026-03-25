import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <p className="text-5xl font-bold text-gray-200 mb-4">404</p>
      <h1 className="text-xl font-semibold text-gray-900 mb-2">페이지를 찾을 수 없어요</h1>
      <p className="text-gray-500 mb-8">주소를 다시 확인해 주세요.</p>
      <Link to="/" className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
        홈으로 돌아가기
      </Link>
    </div>
  )
}
