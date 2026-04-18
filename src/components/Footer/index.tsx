import { Facebook, Instagram } from 'lucide-react';
import "./footer.scss";
export function Footer() {
    return (
        <footer className="site-footer">
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
                <div>
                    <h3 style={{ color: 'var(--accent)', fontWeight: 700 }}>Redes</h3>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <a href="#" aria-label="Instagram"><Instagram size={20} color="#FF2C7F" /></a>
                        <a href="#" aria-label="Facebook"><Facebook size={20} color="#FF2C7F" /></a>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 28, color: 'var(--muted)' }}>&copy; {new Date().getFullYear()} FIAP - Todos os direitos reservados.</div>
        </footer>

    );
}