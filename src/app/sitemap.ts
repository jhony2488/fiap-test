import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Página principal ──
    {
      url: 'https://www.fiap.com.br',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://www.fiap.com.br/#home',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.fiap.com.br/#cursos',
      lastModified: new Date(),
      changeFrequency: 'weekly',  
      priority: 0.9,
    },
    {
      url: 'https://www.fiap.com.br/#faq',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://www.fiap.com.br/#contato',
      lastModified: new Date(),
      changeFrequency: 'yearly', 
      priority: 0.5,
    },
  ]
}