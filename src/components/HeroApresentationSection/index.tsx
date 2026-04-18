import "./heroApresentationSection.scss";
export function HeroApresentationSection() {
    return (
        <section id="home" className="hero-wrap" aria-labelledby="hero-heading">
            <div className="hero-inner">
                <div className="hero-content">
                    <h1 id="hero-heading" className="hero-title">
                        <span>A melhor faculdade</span>
                        <br aria-hidden />
                        <span>de tecnologia</span></h1>
                </div>
            </div>
        </section>
    );
}