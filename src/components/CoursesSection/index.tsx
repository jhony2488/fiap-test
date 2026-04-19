import React, { useState, useMemo, useEffect, useRef } from "react";
import { cursos } from "@/utils/consts";
import "./coursesSection.scss";
import Script from "next/script";
import Image from "next/image";
import useIsDesktop from "@/hooks/useIsDesktop";
import { PropsCoursesSection } from "./courseSection.types";

export function CoursesSection({ activeCategory = null, toggleCategory }: PropsCoursesSection) {
  const defaultCategory = cursos?.[0]?.category ?? "";
  const displayCategory = activeCategory ?? defaultCategory;
  const group = useMemo(() => cursos.find((c) => c.category === displayCategory) ?? cursos[0], [displayCategory]);

  const [openSet, setOpenSet] = useState<Set<string>>(new Set());
  const isDesktop = useIsDesktop();

  // ANIMAÇÃO: manter um "currentGroup" local para permitir animar saída -> troca -> entrada
  const [currentGroup, setCurrentGroup] = useState(group);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    // inicializa currentGroup ao montar
    setCurrentGroup(group);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // quando a categoria atual (group) muda, animar saída -> trocar -> entrar
    if (!currentGroup || group.category === currentGroup.category) {
      return;
    }
    // caso raro: já diferente
    // clean previous timers
    timeouts.current.forEach((t) => clearTimeout(t));
    timeouts.current = [];

    // start leaving
    setIsAnimating(true); // indicates we are in a transition (leaving -> entering)
    // leaving duration (match SCSS $course-animation-duration-out = 180ms)
    const leaveTimeout = window.setTimeout(() => {
      // update group (swap content while invisible)
      setCurrentGroup(group);
      // mark entering: small tick before finishing
      setIsEntering(true);
      // entering duration (match SCSS $course-animation-duration-in = 220ms)
      const enterTimeout = window.setTimeout(() => {
        // finish animation
        setIsAnimating(false);
        setIsEntering(false);
      }, 220);
      timeouts.current.push(enterTimeout);
    }, 180);
    timeouts.current.push(leaveTimeout);

    return () => {
      timeouts.current.forEach((t) => clearTimeout(t));
      timeouts.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);

  useEffect(() => {
    if (isDesktop && activeCategory === null) {
      toggleCategory?.(cursos[0].category);
    }
  }, [activeCategory, isDesktop, toggleCategory]);

  function handleMobileToggle(cat: string) {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
    if (typeof toggleCategory === "function") {
      toggleCategory(cat);
    }
  }

  const coursesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cursos de Curta Duração – FIAP",
    description: "Cursos e imersões em tecnologia, inovação e negócios oferecidos pela FIAP.",
    url: "https://www.fiap.com.br/#cursos",
    numberOfItems: cursos.reduce((acc, c) => acc + c.items.length, 0),
    itemListElement: cursos.flatMap((categoria, catIdx) =>
      categoria.items.map((curso, itemIdx) => ({
        "@type": "ListItem",
        position:
          cursos
            .slice(0, catIdx)
            .reduce((acc, c) => acc + c.items.length, 0) + itemIdx + 1,
        item: {
          "@type": "Course",
          name: curso.title,
          description: curso.meta,
          provider: {
            "@type": "Organization",
            name: "FIAP",
            sameAs: "https://www.fiap.com.br",
          },
        },
      }))
    ),
  };

  return (
    <section id="cursos" className="section-cursos" aria-labelledby="cursos-heading">
      <Script id="courses-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesSchema) }} />

      <div className="cursos-head">
        <div>
          <h2 id="cursos-heading" className="cursos-title">Cursos</h2>
          <div className="cursos-subtitle">Cursos de Curta Duração</div>
        </div>
        <nav className="cat-controls desktop" aria-label="Filtrar por categoria de curso">
          {cursos.map((c) => {
            const isActiveDesktop = activeCategory === c.category;
            return (
              <button
                key={c.category}
                type="button"
                className={`cat-pill ${isActiveDesktop ? "on" : ""}`}
                onClick={() => toggleCategory?.(c.category)}
                aria-pressed={isActiveDesktop}
                aria-label={`Mostrar ${c.category}`}
              >
                <span className="pill-underline" aria-hidden />
                <span className="pill-label">{c.category}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="courses-grid">
        <div className="left-col desktop-left-col" aria-hidden={false}>
          {/* Categoria heading com classes de animação */}
          <h3
            className={`category-heading ${isAnimating ? "leaving" : isEntering ? "entering entered" : ""}`}
            aria-live="polite"
            aria-atomic="true"
          >
            {currentGroup.category}
          </h3>

          {/* Lista com classes que controlam a animação */}
          <ul
            className={`course-list ${isAnimating ? "leaving" : isEntering ? "entering entered" : ""}`}
            role="list"
          >
            {currentGroup.items.map((it, idx) => (
              <li className="course-item" key={idx}>
                <div className="course-meta-title">
                  <h4 className="course-title">{it.title}</h4>
                  <p className="course-meta">{it.meta}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="right-col mobile" aria-label="Categorias (mobile)">
          {cursos.map((c) => {
            const isOpen = openSet.has(c.category);
            const collapseId = `mobile-collapse-${c.category.replace(/\s+/g, '-').toLowerCase()}`;

            return (
              <div className="mobile-category-block" key={c.category}>
                <div className="cat-row-mobile">
                  <div className="cat-name-mobile">{c.category}</div>
                  <button
                    type="button"
                    className={`cat-toggle ${isOpen ? "open" : ""}`}
                    onClick={() => handleMobileToggle(c.category)}
                    aria-pressed={isOpen}
                    aria-controls={collapseId}
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? "Fechar" : "Abrir"} ${c.category}`}
                  >
                    <Image
                      src={isOpen ? "/svgs/iconButtonNegativeSinal.svg" : "/svgs/iconButtonPositiveSinal.svg"}
                      alt={`${isOpen ? "Fechar" : "Abrir"} ${c.category}`}
                      width={60}
                      height={60}
                      loading="lazy"
                    />
                  </button>
                </div>

                <div id={collapseId} className={`mobile-collapse ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
                  <ul className="course-list mobile-list" role="list">
                    {c.items.map((it, idx) => (
                      <li className="course-item" key={idx}>
                        <div className="course-meta-title">
                          <h4 className="course-title">{it.title}</h4>
                          <p className="course-meta">{it.meta}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </aside>
      </div>
    </section>
  );
}