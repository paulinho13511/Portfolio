// Edite aqui seus dados pessoais: todo o site lê deste arquivo.
export const profile = {
  name: 'paulinho13511', // troque pelo seu nome
  role: 'Desenvolvedor Full-Stack Júnior',
  education: 'Graduando em Análise e Desenvolvimento de Sistemas (ADS)',
  github: 'https://github.com/paulinho13511',
  githubHandle: 'paulinho13511',
  headline: 'Construo software de ponta a ponta: do schema SQL à interface.',
  intro:
    'Modelo bancos de dados relacionais, escrevo APIs em Node.js e entrego interfaces em React. Meu foco é construir soluções completas, em que cada camada é pensada para conversar bem com a outra, com dados consistentes, regras claras e uma interface direta ao ponto.',
  principles: [
    {
      title: 'Fundamentos primeiro',
      text: 'Estruturas de dados, SQL e HTTP bem entendidos sustentam qualquer framework que venha depois.',
    },
    {
      title: 'Rigor técnico',
      text: 'Integridade de dados, validação nas bordas e código legível são requisito, não detalhe.',
    },
    {
      title: 'Aprendizado contínuo',
      text: 'A graduação em ADS e os projetos próprios andam juntos: cada conceito estudado vira código em produção.',
    },
  ],
};

export const stackLayers = [
  {
    id: 'frontend',
    index: 'L1',
    title: 'Frontend',
    summary: 'Interfaces responsivas, componentizadas e acessíveis.',
    items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    index: 'L2',
    title: 'Backend',
    summary: 'APIs que concentram regra de negócio e validação.',
    items: ['Node.js', 'APIs REST', 'JSON', 'Serverless Functions'],
  },
  {
    id: 'database',
    index: 'L3',
    title: 'Banco de Dados',
    summary: 'Modelagem relacional pensada para integridade.',
    items: ['SQL', 'Modelagem relacional', 'Normalização', 'JOINs e agregações', 'Constraints'],
  },
];
