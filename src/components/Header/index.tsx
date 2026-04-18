import ImageNext from 'next/image';
import "./header.scss";
export function Header({ progress }: { progress: number }) {
    return (
        <header className="header" role="banner">
            <div className="header-inner">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <a href="/" aria-label="FIAP – página inicial">
                        <ImageNext
                            src="/svgs/logo-fiap.svg"
                            alt="FIAP"
                            width={160}
                            height={36}
                            priority  // logo é LCP, não deve ter lazy
                        />
                    </a>
                </div>
            </div>
            <div
                className="header-progress-bar"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                aria-label="Progresso de leitura da página"
            >
                <div className="header-progress-fill" style={{ width: `${progress}%` }} />
            </div>
        </header>

    );
}