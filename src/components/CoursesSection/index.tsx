import React from "react";
import { cursos } from "@/utils/consts";
import "./coursesSection.scss";
import Script from "next/script";

type Props = {
  activeCategory: string;
  toggleCategory: (cat: string) => void;
};

export function CoursesSection({ activeCategory, toggleCategory }: Props) {
  const defaultCategory = cursos?.[0]?.category ?? "";
  const active = activeCategory || defaultCategory;
  const group = cursos.find((c) => c.category === active) ?? cursos[0];

  // Dentro do CoursesSection, antes do return:

  const coursesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Cursos de Curta Duração – FIAP",
    "description": "Cursos e imersões em tecnologia, inovação e negócios oferecidos pela FIAP.",
    "url": "https://www.fiap.com.br/#cursos",
    "numberOfItems": cursos.reduce((acc, c) => acc + c.items.length, 0),
    "itemListElement": cursos.flatMap((categoria, catIdx) =>
      categoria.items.map((curso, itemIdx) => ({
        "@type": "ListItem",
        "position": cursos
          .slice(0, catIdx)
          .reduce((acc, c) => acc + c.items.length, 0) + itemIdx + 1,
        "item": {
          "@type": "Course",
          "name": curso.title,
          "description": curso.meta,
          "provider": {
            "@type": "Organization",
            "name": "FIAP",
            "sameAs": "https://www.fiap.com.br"
          },
          "educationalLevel": "Professional",
          "inLanguage": "pt-BR",
          "courseMode": "onsite",
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "onsite",
            "inLanguage": "pt-BR"
          }
        }
      }))
    )
  };


  return (
    <section id="cursos" className="section-cursos" aria-labelledby="cursos-heading">
      <Script
        id="courses-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesSchema) }}
      />
      <div className="cursos-head">
        <div>
          <h2 id="cursos-heading" className="cursos-title">Cursos</h2>
          <div className="cursos-subtitle">Cursos de Curta Duração</div>
        </div>

        {/* Desktop category nav */}
        <nav className="cat-controls desktop" aria-label="Filtrar por categoria de curso">
          {cursos.map((c) => {
            const isActive = c.category === active;
            return (
              <button
                key={c.category}
                className={`cat-pill ${isActive ? "on" : ""}`}
                onClick={() => toggleCategory(c.category)}
                aria-pressed={isActive}
              >
                <span className="pill-underline" aria-hidden />
                <span className="pill-label">{c.category}</span>

              </button>
            );
          })}
        </nav>
      </div>

      <div className="courses-grid">
        {/* Left column: list / heading */}
        <div className="left-col">
          <h3
            className="category-heading"
            aria-live="polite"
            aria-atomic="true"
          >{group.category}</h3>

          <ul className="course-list" role="list">
            {group.items.map((it, idx) => (
              <li className="course-item" key={idx}>
                <div className="course-meta-title">
                  <h4 className="course-title">{it.title}</h4>
                  <p className="course-meta">{it.meta}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column: mobile vertical category toggles (visible on small screens) */}
        <aside className="right-col mobile" aria-hidden>
          {cursos.map((c) => {
            const isActive = c.category === active;
            return (
              <div key={c.category} className="cat-row-mobile">
                <div className="cat-name-mobile">{c.category}</div>
                <button
                  className={`cat-toggle ${isActive ? "open" : ""}`}
                  onClick={() => toggleCategory(c.category)}
                  aria-pressed={isActive}
                  aria-label={`${isActive ? "Fechar" : "Abrir"} ${c.category}`}
                >
                  {isActive ? "−" : "+"}
                </button>
              </div>
            );
          })}
        </aside>
      </div>
    </section>
  );
}