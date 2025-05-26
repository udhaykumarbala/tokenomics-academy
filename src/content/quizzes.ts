// Define quiz questions for each lesson

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type LessonQuiz = {
  questions: QuizQuestion[];
};

type LessonQuizMap = {
  [key: string]: LessonQuiz;
};

export const quizzes: LessonQuizMap = {
  "introduction": {
    questions: [
      {
        question: "What is the primary goal of tokenomics design?",
        options: [
          "To create as many tokens as possible",
          "To maximize token price in the short term",
          "To align incentives among ecosystem participants",
          "To eliminate the need for regulations"
        ],
        correctAnswer: "To align incentives among ecosystem participants"
      },
      {
        question: "Which of the following is NOT a typical function of a token?",
        options: [
          "Medium of exchange",
          "Store of value",
          "Unit of account",
          "Legal tender in all countries"
        ],
        correctAnswer: "Legal tender in all countries"
      },
      {
        question: "What is token velocity?",
        options: [
          "How quickly a token increases in price",
          "The speed at which tokens change hands",
          "The maximum supply of a token",
          "The rate at which new tokens are created"
        ],
        correctAnswer: "The speed at which tokens change hands"
      }
    ]
  },
  "supply-dynamics": {
    questions: [
      {
        question: "Which model typically has a capped total supply?",
        options: [
          "Deflationary model",
          "Inflationary model",
          "Elastic supply model",
          "Rebasing model"
        ],
        correctAnswer: "Deflationary model"
      },
      {
        question: "What is the purpose of token burning?",
        options: [
          "To create new tokens",
          "To reduce circulating supply",
          "To increase token velocity",
          "To increase total supply"
        ],
        correctAnswer: "To reduce circulating supply"
      },
      {
        question: "In an inflationary token model, what typically happens to token value over time without adequate demand?",
        options: [
          "It tends to increase",
          "It tends to decrease",
          "It remains perfectly stable",
          "It follows a predictable cycle"
        ],
        correctAnswer: "It tends to decrease"
      }
    ]
  },
  "staking-mechanisms": {
    questions: [
      {
        question: "What is a primary purpose of staking in token economies?",
        options: [
          "To increase token price artificially",
          "To provide economic security to the network",
          "To prevent tokens from being traded",
          "To centralize control of the protocol"
        ],
        correctAnswer: "To provide economic security to the network"
      },
      {
        question: "What is 'slashing' in the context of staking?",
        options: [
          "Cutting the total token supply",
          "Penalizing validators for malicious behavior or mistakes",
          "Reducing staking rewards over time",
          "Forcibly selling tokens to maintain price"
        ],
        correctAnswer: "Penalizing validators for malicious behavior or mistakes"
      },
      {
        question: "What is liquid staking?",
        options: [
          "Staking tokens for less than one day",
          "Receiving a tradable token while your original tokens remain staked",
          "Staking tokens across multiple protocols simultaneously",
          "Converting staked tokens to a different cryptocurrency"
        ],
        correctAnswer: "Receiving a tradable token while your original tokens remain staked"
      }
    ]
  },
  "governance": {
    questions: [
      {
        question: "What is a quorum in token governance?",
        options: [
          "The minimum number of tokens that must vote for a proposal to pass",
          "The minimum participation required for a vote to be valid",
          "The maximum number of tokens a single entity can hold",
          "The time period during which votes can be cast"
        ],
        correctAnswer: "The minimum participation required for a vote to be valid"
      },
      {
        question: "What is quadratic voting designed to address?",
        options: [
          "Voter apathy",
          "Lack of technical understanding",
          "Wealth concentration and voter power imbalance",
          "Slow decision-making processes"
        ],
        correctAnswer: "Wealth concentration and voter power imbalance"
      },
      {
        question: "Which governance system increases voting power the longer tokens are locked in support of a proposal?",
        options: [
          "Quadratic voting",
          "Conviction voting",
          "Delegated voting",
          "Futarchy"
        ],
        correctAnswer: "Conviction voting"
      }
    ]
  },
  "tokenomic-patterns": {
    questions: [
      {
        question: "What is the primary characteristic of a 'Work Token' model?",
        options: [
          "Tokens are earned through completing tasks",
          "Tokens are staked to earn the right to perform work for the network",
          "Tokens are burned when work is completed",
          "Tokens represent hours worked in a system"
        ],
        correctAnswer: "Tokens are staked to earn the right to perform work for the network"
      },
      {
        question: "In a dual-token system, what is typically the role of the governance token?",
        options: [
          "To pay for transactions on the network",
          "To provide stability in the token price",
          "To control decision-making in the protocol",
          "To reward users for network participation"
        ],
        correctAnswer: "To control decision-making in the protocol"
      },
      {
        question: "What is a token sink?",
        options: [
          "A mechanism that permanently removes tokens from circulation",
          "A place where tokens are temporarily held",
          "A way to convert one token to another",
          "A method for distributing new tokens"
        ],
        correctAnswer: "A mechanism that permanently removes tokens from circulation"
      }
    ]
  }
};

// Function to get a random question from a specific lesson
export function getRandomQuestion(lessonId: string): QuizQuestion | null {
  const lessonQuiz = quizzes[lessonId];
  if (!lessonQuiz || lessonQuiz.questions.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * lessonQuiz.questions.length);
  return lessonQuiz.questions[randomIndex];
}

// Extract lesson ID from path
export function getLessonIdFromPath(path: string): string {
  // Extract the lesson ID from paths like "/lessons/introduction", etc.
  const matches = path.match(/\/lessons\/([^/]+)/);
  if (matches && matches[1]) {
    return matches[1];
  }
  return "";
}