import { Facebook, Instagram } from 'lucide-react';
import "./footer.scss";
export function Footer() {
    return (
        <footer className="site-footer" role="contentinfo">
            <div className="site-footer_wrapper">
                <div>
                    <h3 className="site-footer_wrapper-title">FIAP</h3>
                    <p className="site-footer_wrapper-subtitle">Cursos em tecnologia, inovação e negócios.</p>
                </div>
                <div>
                    <h3 className="site-footer_wrapper-title">Localização</h3>
                    <p className="site-footer_wrapper-subtitle">Exemplo - endereço fictício</p>
                </div>
                <div>
                    <h3 className="site-footer_wrapper-title">Atendimento</h3>
                    <p className="site-footer_wrapper-subtitle">Remoto / On-site</p>
                </div>
                <nav aria-label="Redes sociais da FIAP">
                    <h3 className="site-footer_wrapper-title">Redes</h3>
                    <div className="site-footer_wrapper-container-social-midia">
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

            <p className="copyright">&copy; {new Date().getFullYear()} FIAP - Todos os direitos reservados.</p>
        </footer>

    );
}