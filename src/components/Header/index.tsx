'use client';

import ImageNext from 'next/image';
import "./header.scss";
import { useIsDesktop } from '@/hooks/useIsDesktop';
import Link from 'next/link';
export function Header({ progress }: { progress: number }) {
    const isDesktop = useIsDesktop();
    const isLongDesktop = useIsDesktop(1900);
    return (
        <header className={progress > 0 ? 'header header--scrolled' : 'header'} role="banner">
            <div className="header-inner">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Link href="/" aria-label="FIAP – página inicial">
                        <ImageNext
                            src="/svgs/logo-fiap.svg"
                            alt="FIAP"
                            width={isLongDesktop ? 400 : isDesktop ? 160 : 84}
                            height={isLongDesktop ? 70 : isDesktop ? 36 : 23}
                            priority
                        />
                    </Link>
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