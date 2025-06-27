export type Challenge = {
  id: number;
  word: string;
  tip: string;
};

export const WORDS: Challenge[] = [
  // --- Frontend ---
  { id: 1, word: "HTML", tip: "Linguagem de marcação" },
  { id: 2, word: "CSS", tip: "Linguagem de estilos" },
  { id: 3, word: "REACT", tip: "Biblioteca para criar interfaces Web" },
  { id: 4, word: "NEXT", tip: "Framework React fullstack" },
  { id: 5, word: "TAILWIND", tip: "Framework de utilitários CSS" },
  { id: 6, word: "VITE", tip: "Build tool veloz como um foguete" },
  { id: 7, word: "SHADCN", tip: "Biblioteca de UI estilosa para React" },

  // --- Backend ---
  { id: 8, word: "NODE", tip: "Permite rodar JS no backend" },
  { id: 9, word: "EXPRESS", tip: "Framework minimalista para Node" },
  { id: 10, word: "PYTHON", tip: "Linguagem com uma cobra no nome" },
  { id: 11, word: "API", tip: "Interface para integração de sistemas" },
  { id: 12, word: "DATABASE", tip: "Lugar onde os dados fazem morada" },
  { id: 13, word: "SQL", tip: "Linguagem para bancos relacionais" },

  // --- Ferramentas ---
  { id: 14, word: "GIT", tip: "Ferramenta de controle de versão" },
  { id: 15, word: "GITHUB", tip: "Hospedagem de repositórios Git" },
  { id: 16, word: "TERMINAL", tip: "Onde o dev conversa com o PC digitando" },
  { id: 17, word: "DEBUG", tip: "A arte de caçar erros" },
  { id: 18, word: "NPM", tip: "Gerenciador de pacotes para o Node" },
  { id: 19, word: "POSTMAN", tip: "Ferramenta para testar APIs" },
  { id: 20, word: "FIGMA", tip: "Ferramenta de design colaborativo" },

  // --- Memes / Cultura Dev ---
  {
    id: 21,
    word: "STACKOVERFLOW",
    tip: "Fonte sagrada de soluções e gambiarras",
  },
  { id: 22, word: "BUG", tip: "Quando o código decide ser rebelde" },
  { id: 23, word: "COFFE", tip: "Combustível oficial dos programadores" },
  { id: 24, word: "DEPLOY", tip: "O momento de fé" },
  { id: 25, word: "404", tip: "Erro que todo mundo já viu na vida" },
  { id: 26, word: "SCRUM", tip: "A daily que podia ter sido um e-mail" },
  {
    id: 27,
    word: "LOOP",
    tip: "Quando você faz o mesmo pra sempre... sem querer",
  },
  {
    id: 28,
    word: "STACK",
    tip: "Conjunto de tecnologias que você usa (ou só finge que sabe)",
  },
];
