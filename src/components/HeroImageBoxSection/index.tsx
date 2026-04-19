'use client';

import { useEffect, useRef, useState } from "react";
import "./heroImageBoxSection.scss";
import ImageNext from 'next/image';
import { PropsHeroImageBoxSection } from "./courseSection.types";
export function HeroImageBoxSection({ width78Porcent }:  PropsHeroImageBoxSection) {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [visibleImageApresentation, setVisibleImageApresentation] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === 'undefined') {
            setVisibleImageApresentation(true);
            return;
        }

        const el = containerRef.current;
        if (!el) return;

        if (!('IntersectionObserver' in window)) {
            setVisibleImageApresentation(true);
            return;
        }

        const io = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleImageApresentation(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px 0px -12% 0px',
                threshold: 0.05,
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
                <div className={`reveal-mask ${visibleImageApresentation ? 'visible' : ''}`}>
                    <ImageNext 
                    src="/imgs/intro.webp"   
                    alt="Estudantes da FIAP em ambiente de aprendizado em tecnologia" 
                    width={width78Porcent} height={width78Porcent * 0.54} 
                    loading="lazy" 
                    />
                </div>
            </div>
            <div className='hero-image-box_text-animation-2' aria-hidden >
                <div className="marquee-wrapper marquee-wrapper--left">
                    <div className="marquee-content">
                        <p>
                            <span>SKILLS</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                            <span>CONHECIMENTO</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                        </p>
                        <p>
                            <span>SKILLS</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                            <span>CONHECIMENTO</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                        </p>

                        <p>
                            <span>SKILLS</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                            <span>CONHECIMENTO</span>
                            <ImageNext src="/svgs/ellipse.svg" alt="dot" width={38} height={38} />
                        </p>
                    </div>
                </div>

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