# Portfólio Full-Stack

Portfólio com conceito **Blueprint de Engenharia**: React (Vite), Tailwind CSS e Lucide no front-end, e Vercel Serverless Functions em Node.js no back-end.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`. As rotas `/api/*` funcionam no `npm run dev` graças a um middleware no `vite.config.js` que executa as funções da pasta `api/` com a mesma assinatura `(req, res)` da Vercel.

## Endpoints

| Método | Rota                     | Descrição                                     |
| ------ | ------------------------ | --------------------------------------------- |
| GET    | `/api/health`            | Status `200 OK`, timestamp, uptime e versão   |
| GET    | `/api/projects`          | Lista estruturada dos projetos                |
| GET    | `/api/projects?id=<id>`  | Um projeto específico (`financias`, `studyxp`) |

## Estrutura

```
├── api/
│   ├── health.js           # GET /api/health
│   └── projects.js         # GET /api/projects (dados dos projetos)
├── public/favicon.svg
├── src/
│   ├── components/
│   │   ├── StatusBar.jsx            # barra ONLINE + latência + GitHub (consome /api/health)
│   │   ├── Hero.jsx                 # apresentação em bento grid
│   │   ├── Projects.jsx             # bento grid de projetos (consome /api/projects)
│   │   ├── ProjectDrawer.jsx        # drawer com detalhes do projeto
│   │   ├── ArchitectureDiagram.jsx  # React Client -> Node.js API -> SQL Database
│   │   ├── StackLayers.jsx          # Frontend / Backend / Banco de Dados
│   │   ├── ApiPlayground.jsx        # testa os endpoints e mostra o JSON
│   │   ├── SectionHeader.jsx
│   │   └── Footer.jsx
│   ├── data/profile.js     # textos pessoais e camadas de stack: edite aqui
│   ├── hooks/useApi.js
│   ├── lib/request.js      # fetch com medição de latência e timeout
│   ├── App.jsx
│   ├── index.css           # tema blueprint + grid de fundo
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── vercel.json
```

## Personalizando

- **Nome, textos e links:** `src/data/profile.js`
- **Projetos:** array `projects` em `api/projects.js`
- **Cores do tema:** `tailwind.config.js` (`ink`, `panel`, `line`, `accent`...)

## Deploy na Vercel

1. Envie o repositório para o GitHub.
2. Na Vercel: **Add New → Project** e importe o repositório.
3. O preset **Vite** é detectado automaticamente (`npm run build`, saída em `dist`). A pasta `api/` vira Serverless Functions sem configuração extra.
