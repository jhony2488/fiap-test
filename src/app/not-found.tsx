import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center px-6">
        <h1 className="text-9xl font-bold text-green-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-4">Página não encontrada</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          Voltar para Início
        </Link>
      </div>
    </div>
  )
}
