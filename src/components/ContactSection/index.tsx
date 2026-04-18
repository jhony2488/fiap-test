import "./contactSession.scss";
import { Link } from 'react-scroll';
export function ContactSection() {
    return (
        <section id="contato" style={{ padding: '6rem 20px', paddingBottom: '10rem' }} className="contact-section fade-up-delayed">
            <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: 34, color: 'var(--fg)' }}>Pronto para começar?</h2>
                <p className="link-see-courses-description">Conheça nossos cursos e imersões.</p>
                <Link to="cursos" className="link-see-courses" smooth offset={-80} duration={600}>
                    VER CURSOS
                </Link>
            </div>
        </section>

    );
}