# FIAP Landing Page

Uma aplicação Next.js moderna com TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **Next.js 15** - Framework React para produção
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React 19** - Biblioteca UI

## 📦 Estrutura do Projeto

```
├── src/
│   ├── app/              # Rotas e páginas (App Router)
│   │   ├── (public)/     # Rotas públicas
│   │   ├── (private)/    # Rotas autenticadas
│   │   └── api/          # API Routes
│   ├── components/       # Componentes reutilizáveis
│   ├── lib/             # Bibliotecas e configurações
│   ├── utils/           # Funções utilitárias
│   └── types/           # Tipos TypeScript
├── public/              # Arquivos estáticos
└── docs/                # Documentação
```

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env.local

# Executar em desenvolvimento
npm run dev
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm start` - Inicia servidor de produção
- `npm run lint` - Executa o linter

## 🌐 Acessar

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📚 Documentação

Consulte a pasta `docs/` para documentação detalhada do projeto.
