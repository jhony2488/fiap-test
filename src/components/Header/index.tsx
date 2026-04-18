import ImageNext from 'next/image';
import "./header.scss";
export function Header({ progress }: { progress: number }) {
    return (
        <header className="header" role="banner">
            <div className="header-inner">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <ImageNext src="/svgs/logo-fiap.svg" alt="FIAP" width={160} height={36} />
                </div>
            </div>
            <div className="header-progress-bar">
                <div className="header-progress-fill" style={{ width: `${progress}%` }} />
            </div>
        </header>

    );
}