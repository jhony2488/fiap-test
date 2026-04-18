import type { Metadata } from "next";
import "./globals.scss";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "FIAP — Cursos e Imersões em Tecnologia",
    template: "%s | FIAP",
  },
  description:
    "Cursos de curta duração e imersões em tecnologia, inovação e negócios. Aprenda com a melhor faculdade de tecnologia do Brasil e acelere sua carreira.",
  keywords: [
    "FIAP",
    "cursos de tecnologia",
    "cursos de curta duração",
    "imersões",
    "inovação",
    "negócios",
    "faculdade de tecnologia",
    "cursos online",
    "desenvolvimento profissional",
    "upskilling",
    "reskilling",
    "carreira em tecnologia",
  ],
  authors: [{ name: "FIAP", url: "https://www.fiap.com.br" }],
  creator: "FIAP",
  publisher: "FIAP",
  applicationName: "FIAP",
  formatDetection: {
    telephone: false,
  },

  // Icons / PWA
  icons: {
    icon: [{ url: "/svgs/logo-fiap.svg", type: "image/svg+xml" }],
    shortcut: "/svgs/logo-fiap.svg",
    apple: "/svgs/logo-fiap.svg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "FIAP",
    statusBarStyle: "black-translucent",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",  // permite preview grande de imagens no Google
      "max-snippet": -1,             // sem limite de caracteres no snippet
      "max-video-preview": -1,
    },
  },

  // Open Graph
  openGraph: {
    title: "FIAP — Cursos e Imersões em Tecnologia",
    description:
      "Cursos de curta duração e imersões em tecnologia, inovação e negócios. Aprenda com a melhor faculdade de tecnologia do Brasil.",
    url: "https://www.fiap.com.br",
    siteName: "FIAP",
    images: [
      {
        url: "/imgs/fiap-og.png",
        width: 1200,
        height: 630,
        alt: "FIAP — Cursos e Imersões em Tecnologia",
        type: "image/png",
      },
    ],
    locale: "pt_BR",   // Open Graph usa underline, não hífen
    type: "website",
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "FIAP — Cursos e Imersões em Tecnologia",
    description:
      "Cursos de curta duração e imersões em tecnologia, inovação e negócios. Aprenda com a melhor faculdade de tecnologia do Brasil.",
    site: "@FIAP",
    creator: "@FIAP",
    images: ["/svgs/logo-fiap.svg"],
  },

  // Canonical
  alternates: {
    canonical: "https://www.fiap.com.br",
    languages: {
      "pt-BR": "https://www.fiap.com.br",
    },
  },
};

export const viewport = {
    themeColor: '#000',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className="antialiased">
                <Suspense fallback={<div>Carregando...</div>}>
                    {children}
                </Suspense>
            </body>
        </html>
    );
}
