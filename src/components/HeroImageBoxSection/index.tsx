'use client';

import { useEffect, useRef, useState } from "react";
import "./heroImageBoxSection.scss";
import ImageNext from 'next/image';
export function HeroImageBoxSection({ width78Porcent }: { width78Porcent: number }) {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        // SSR guard
        if (typeof window === 'undefined') {
            setVisible(true);
            return;
        }

        const el = containerRef.current;
        if (!el) return;

        // Se IntersectionObserver não existir, mostra imediatamente
        if (!('IntersectionObserver' in window)) {
            setVisible(true);
            return;
        }

        const io = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px 0px -12% 0px',
                threshold: 0.05, // pequeno valor para iniciar quando 5% visível
            }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);
    return (
        <section className="hero-image-box"  aria-label="Apresentação visual e animações da FIAP">
            <div className='hero-image-box_text-animation-1' aria-hidden >
                <div className="marquee-wrapper marquee-wrapper--ltr">
                    <div className="marquee-content">
                        <p>CURSOS E IMERSÕES. UMA NOVA CULTURA DE MERCADO.</p>
                        <p>CURSOS E IMERSÕES. UMA NOVA CULTURA DE MERCADO.</p>
                        <p>CURSOS E IMERSÕES. UMA NOVA CULTURA DE MERCADO.</p>
                        <p>CURSOS E IMERSÕES. UMA NOVA CULTURA DE MERCADO.</p>
                    </div>
                </div>
                <div className="marquee-wrapper marquee-wrapper--rtl">
                    <div className="marquee-content">
                        <p>TECNOLOGIA, INOVAÇÃO E NEGÓCIOS. PRESENTE E FUTURO.</p>
                        <p>TECNOLOGIA, INOVAÇÃO E NEGÓCIOS. PRESENTE E FUTURO.</p>
                        <p>TECNOLOGIA, INOVAÇÃO E NEGÓCIOS. PRESENTE E FUTURO.</p>
                        <p>TECNOLOGIA, INOVAÇÃO E NEGÓCIOS. PRESENTE E FUTURO.</p>
                    </div>
                </div>
            </div>

            <div ref={containerRef} className='hero-image-box_image' aria-hidden={false}>
                <div className={`reveal-mask ${visible ? 'visible' : ''}`}>
                    <ImageNext 
                    src="/imgs/intro.png"   
                    alt="Estudantes da FIAP em ambiente de aprendizado em tecnologia" 
                    width={width78Porcent} height={width78Porcent * 0.54} 
                    loading="lazy" 
                    />
                </div>
            </div>
            <div className='hero-image-box_text-animation-2' aria-hidden >
                {/* Linha 1: SKILLS / CONHECIMENTO */}
                <div className="marquee-wrapper marquee-wrapper--left">
                    <div className="marquee-content">
                        <p>
                            <span>SKILLS</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                            <span>CONHECIMENTO</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                        </p>
                        {/* Cópia 2 */}
                        <p>
                            <span>SKILLS</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                            <span>CONHECIMENTO</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                        </p>
                        {/* Cópia 3 */}
                        <p>
                            <span>SKILLS</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                            <span>CONHECIMENTO</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                        </p>
                    </div>
                </div>

                {/* Linha 2: MUITO ALÉM DOS TUTORIAIS */}
                <div className="marquee-wrapper marquee-wrapper--right">
                    <div className="marquee-content">
                        <p>
                            <span>MUITO ALÉM DOS TUTORIAIS</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                        </p>
                        <p>
                            <span>MUITO ALÉM DOS TUTORIAIS</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                        </p>
                        <p>
                            <span>MUITO ALÉM DOS TUTORIAIS</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}