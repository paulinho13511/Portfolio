/**
 * GET /api/projects          → lista todos os projetos
 * GET /api/projects?id=<id>  → retorna um projeto específico
 */
const GITHUB = 'https://github.com/paulinho13511';

export const projects = [
  {
    id: 'financias',
    name: 'Financias',
    category: 'Gestão financeira',
    tagline: 'Controle financeiro pessoal com dados consistentes de ponta a ponta.',
    description:
      'Sistema de gestão e controle financeiro pessoal. O núcleo é um banco de dados relacional modelado para manter a integridade das transações: cada lançamento pertence a uma conta e a uma categoria válidas, e os saldos são derivados dos próprios registros. Na interface, dashboards em React transformam esses dados em uma visão clara de receitas, despesas e evolução do saldo.',
    highlights: [
      'Modelagem relacional em SQL com chaves primárias, estrangeiras e constraints protegendo a integridade das transações.',
      'Consultas agregadas para totais por período e por categoria, servidas pela API.',
      'Dashboards em React com resumo de receitas, despesas e saldo.',
    ],
    stack: {
      frontend: ['React', 'JavaScript', 'HTML/CSS'],
      backend: ['Node.js', 'API REST'],
      database: ['SQL', 'Modelagem relacional'],
    },
    architecture: [
      { layer: 'client', label: 'React Client', detail: 'Dashboards e formulários de lançamento' },
      { layer: 'api', label: 'Node.js API', detail: 'Validação e regras de negócio' },
      { layer: 'database', label: 'SQL Database', detail: 'Contas, categorias e transações relacionadas' },
    ],
    links: { repository: GITHUB },
  },
  {
    id: 'studyxp',
    name: 'StudyXp',
    category: 'Educação · Gamificação',
    tagline: 'Organização de estudos movida a XP, metas e progresso.',
    description:
      'Plataforma gamificada para organização de estudos. Cada sessão concluída gera experiência (XP): a lógica de back-end em Node.js calcula pontos, controla a evolução de nível e acompanha o cumprimento de metas. Todo o progresso é persistido, para que o histórico de estudo do usuário se mantenha entre as sessões.',
    highlights: [
      'Regras de cálculo de XP e progressão de nível centralizadas no back-end em Node.js.',
      'Metas de estudo com acompanhamento de progresso.',
      'Persistência de dados para manter histórico e conquistas do usuário.',
    ],
    stack: {
      frontend: ['React', 'JavaScript', 'HTML/CSS'],
      backend: ['Node.js', 'API REST'],
      database: ['SQL', 'Persistência de dados'],
    },
    architecture: [
      { layer: 'client', label: 'React Client', detail: 'Sessões de estudo, metas e progresso' },
      { layer: 'api', label: 'Node.js API', detail: 'Cálculo de XP, níveis e metas' },
      { layer: 'database', label: 'SQL Database', detail: 'Usuários, sessões e histórico' },
    ],
    links: { repository: GITHUB },
  },
];

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ status: 'error', code: 405, message: 'Method Not Allowed' });
  }

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  const id = req.query?.id;
  if (id) {
    const project = projects.find((p) => p.id === id);
    if (!project) {
      return res.status(404).json({ status: 'error', code: 404, message: `Projeto "${id}" não encontrado` });
    }
    return res.status(200).json({ status: 'ok', data: project });
  }

  return res.status(200).json({ status: 'ok', count: projects.length, data: projects });
}
