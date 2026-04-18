/**
 * Configurações da aplicação
 */

export const config = {
  app: {
    name: 'FIAP Landing Page',
    description: 'Landing Page Institucional',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  },
} as const;
