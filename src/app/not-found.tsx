import Link from 'next/link';
import './not-found.scss'; // arquivo SCSS global
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="nf-page">
      <main className="nf-wrapper" role="main">
        <header className="nf-header">
          <Link href="/" aria-label="FIAP – Página inicial" className="nf-logoLink">
            <Image
              src="/svgs/logo-fiap.svg"
              alt="FIAP"
              width={160}
              height={23}
              priority
            />
          </Link>
        </header>

        <section className="nf-card" aria-labelledby="notfound-title">
          <div className="nf-grid">
            <div className="nf-code">404</div>

            <div className="nf-content">
              <h1 id="notfound-title" className="nf-title">Página não encontrada</h1>
              <p className="nf-description">
                A página que você está procurando não existe, pode ter sido removida ou o link está incorreto.
                Verifique o endereço ou volte para a página inicial.
              </p>

              <div className="nf-actions">
                <Link href="/" className="nf-btnPrimary" aria-label="Voltar para Início">Voltar para Início</Link>
              </div>

              <p className="nf-small">Se o problema persistir, por favor entre em contato com a nossa equipe.</p>
            </div>
          </div>
        </section>

        <footer className="nf-footer">
          <small>© {new Date().getFullYear()} FIAP — Todos os direitos reservados.</small>
        </footer>
      </main>
    </div>
  );
}