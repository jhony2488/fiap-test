import "./contactSession.scss";
import { Link } from 'react-scroll';
export function ContactSection() {
    return (
        <section id="contato" className="contact-section fade-up-delayed" aria-labelledby="contact-section-heading">
            <div className="contact-section-wrapper">
                <h2 id="contact-section-heading">Pronto para começar?</h2>
                <p className="link-see-courses-description">Conheça nossos cursos e imersões.</p>
                <Link to="cursos" className="link-see-courses" smooth offset={-80} duration={600} aria-label="Ver cursos — ir para a seção de cursos" role="link">
                    VER CURSOS
                </Link>
            </div>
        </section>

    );
}