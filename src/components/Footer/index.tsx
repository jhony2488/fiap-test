import { Facebook, Instagram } from 'lucide-react';
import "./footer.scss";
export function Footer() {
    return (
        <footer className="site-footer" role="contentinfo">
            <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 28 }}>
                <div>
                    <h3 style={{ color: 'var(--accent)', fontWeight: 700 }}>FIAP</h3>
                    <p style={{ color: 'var(--muted)' }}>Cursos em tecnologia, inovação e negócios.</p>
                </div>
                <div>
                    <h3 style={{ color: 'var(--accent)', fontWeight: 700 }}>Localização</h3>
                    <p style={{ color: 'var(--muted)' }}>Exemplo - endereço fictício</p>
                </div>
                <div>
                    <h3 style={{ color: 'var(--accent)', fontWeight: 700 }}>Atendimento</h3>
                    <p style={{ color: 'var(--muted)' }}>Remoto / On-site</p>
                </div>
                <nav aria-label="Redes sociais da FIAP">
                    <h3 style={{ color: 'var(--accent)', fontWeight: 700 }}>Redes</h3>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <a
                            href="https://facebook.com/fiap"
                            aria-label="Instagram da FIAP"
                            target="_blank"
                            rel="noopener noreferrer"
                        ><Instagram size={20} color="#FF2C7F" aria-hidden /></a>
                        <a
                            href="https://facebook.com/fiap"
                            aria-label="Facebook da FIAP"
                            target="_blank"
                            rel="noopener noreferrer"
                        ><Facebook size={20} color="#FF2C7F" aria-hidden /></a>
                    </div>
                </nav>
            </div>

            <div style={{ textAlign: 'center', marginTop: 28, color: 'var(--muted)' }}>&copy; {new Date().getFullYear()} FIAP - Todos os direitos reservados.</div>
        </footer>

    );
}