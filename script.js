const questions = [
  {
    question: "O que significa HTML?",
    options: [
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "HighText Machine Language"
    ],
    answer: 0,
    explanation: "HTML significa HyperText Markup Language, usado para estruturar páginas web."
  },
  {
    question: "Qual é o resultado de '2' + 2 em JavaScript?",
    options: ["4", "22", "NaN", "undefined"],
    answer: 1,
    explanation: "'2' é uma string, então o operador '+' concatena, resultando em '22'."
  },
  {
    question: "Qual linguagem é usada para estilizar páginas web?",
    options: ["HTML", "CSS", "Python", "Java"],
    answer: 1,
    explanation: "CSS (Cascading Style Sheets) é usada para estilizar páginas web."
  },
  {
    question: "O que faz o comando `console.log()`?",
    options: [
      "Mostra uma mensagem na tela",
      "Executa código",
      "Mostra uma mensagem no console",
      "Cria uma variável"
    ],
    answer: 2,
    explanation: "O comando `console.log()` imprime informações no console do navegador."
  },
  {
    question: "Qual símbolo é usado para comentários em JavaScript?",
    options: ["<!-- -->", "//", "#", "/* */"],
    answer: 1,
    explanation: "Comentários de linha única usam `//` em JavaScript."
  },
  {
    question: "Qual dessas é uma linguagem de programação?",
    options: ["HTML", "CSS", "Python", "SQL"],
    answer: 2,
    explanation: "Python é uma linguagem de programação, HTML e CSS são linguagens de marcação e estilo."
  },
  {
    question: "Como se declara uma função em JavaScript?",
    options: ["function minhaFuncao()", "def minhaFuncao()", "fun minhaFuncao()", "void minhaFuncao()"],
    answer: 0,
    explanation: "A declaração correta em JavaScript é: function minhaFuncao()"
  },
  {
    question: "O que é um loop 'for' usado para fazer?",
    options: [
      "Executar código uma vez",
      "Executar código enquanto uma condição for verdadeira",
      "Iterar sobre um bloco de código várias vezes",
      "Parar a execução do código"
    ],
    answer: 2,
    explanation: "Loops 'for' repetem um bloco de código um número determinado de vezes."
  },
  {
    question: "Qual destes tipos de dados existe em JavaScript?",
    options: ["number", "float", "character", "byte"],
    answer: 0,
    explanation: "'number' representa números inteiros ou decimais em JavaScript."
  },
  {
    question: "Como declarar uma variável em JavaScript moderno?",
    options: ["var", "let", "const", "Todas as anteriores"],
    answer: 3,
    explanation: "Em JavaScript moderno, podemos usar var, let ou const para declarar variáveis."
  }
];

let current = 0;
let correct = 0;
let wrongList = [];
let userName = "";

function startQuiz() {
  const nameInput = document.getElementById("username");
  userName = nameInput.value.trim();
  if (!userName) {
    alert("Digite seu nome para continuar.");
    return;
  }

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  document.getElementById("greeting").innerText = `Boa sorte, ${userName}! 🚀`;
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  document.getElementById("question-title").innerText = `Pergunta ${current + 1} de ${questions.length}`;
  document.getElementById("question-text").innerText = q.question;
  document.getElementById("feedback").innerText = "";
  const container = document.getElementById("options-container");
  container.innerHTML = "";

  q.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-light mb-2 w-100";
    btn.innerText = option;
    btn.onclick = () => checkAnswer(i);
    container.appendChild(btn);
  });

  const progress = ((current) / questions.length) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;
}

function checkAnswer(choice) {
  const q = questions[current];
  const buttons = document.querySelectorAll("#options-container button");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
    else if (i === choice) btn.classList.add("incorrect");
  });

  const feedback = document.getElementById("feedback");

  if (choice === q.answer) {
    correct++;
    feedback.innerText = "✅ Boa! Resposta correta.";
  } else {
    wrongList.push({ question: q.question, explanation: q.explanation });
    feedback.innerText = "❌ Opa! Resposta incorreta.";
  }

  setTimeout(() => {
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      finishQuiz();
    }
  }, 2000);
}

function finishQuiz() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  const msg = document.getElementById("final-message");
  if (correct <= 6) {
    msg.innerText = `${userName}, você está precisando estudar mais. 📚`;
  } else if (correct <= 9) {
    msg.innerText = `${userName}, bom! Você está indo bem. 👏`;
  } else {
    msg.innerText = `${userName}, parabéns! Você está dominando muito bem o conteúdo. 🧠🔥`;
  }

  document.getElementById("score-summary").innerText = `Acertos: ${correct} | Erros: ${questions.length - correct}`;
  const exp = document.getElementById("explanations");
  exp.innerHTML = "<h3>📘 Explicações das questões erradas:</h3>";

  wrongList.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `<p><strong>${item.question}</strong><br>${item.explanation}</p>`;
    exp.appendChild(div);
  });
}
