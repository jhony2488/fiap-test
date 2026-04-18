'use client';

import React, { useEffect, useState } from "react";
import { faqItems } from "@/utils/consts";
import "./faqSection.scss";
import Script from "next/script";

type Props = {
  openFaqIndex: number | null;
  setOpenFaqIndex: (index: number | null) => void;
};

export function FaqSection({ openFaqIndex, setOpenFaqIndex }: Props) {
  // track if we are in mobile width so we can manage aria-hidden reliably
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== "undefined" ? window.innerWidth <= 900 : false);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };


  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 900);
    }
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section id="faq" className="faq fade-up-delayed">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="faq-box-title">
        <h2 className='faq_title'>FAQ</h2>
        <p className='faq_subtitle'>Dúvidas Frequentes</p>
      </div>

      <div className="faq-grid" aria-live="polite">
        {faqItems.map((f, idx) => {
          const isOpen = openFaqIndex === idx;
          return (
            <article
              key={idx}
              className={`faq-card ${isOpen ? "open" : ""}`}
              aria-expanded={isOpen}
            >
              <button
                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                aria-controls={`faq-answer-${idx}`}
                aria-expanded={isOpen}
                style={{ width: "100%", textAlign: "left", padding: 0, cursor: "pointer" }}
              // no inline !important; button is styled in SCSS
              >
                <div className={`${isOpen ? "faq-open-question" : "faq-question-style"}`}>{f.question}</div>
              </button>
              <div style={{ opacity: isOpen ? 1 : 0, transition: "opacity 0.3s ease" }}>
                <p
                  id={`faq-answer-${idx}`}
                  className={"faq-answer-style"}
                  aria-hidden={isMobile ? (!isOpen) : false}
                >
                  {f.answer}
                </p>
              </div>

            </article>
          );
        })}
      </div>
    </section>
  );
}