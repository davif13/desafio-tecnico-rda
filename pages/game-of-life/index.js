// Variáveis globais
let gameInterval;
let isGameRunning = false;
const cells = [];

// Função para criar as células no grid
function createCells() {
  const gridContainer = document.querySelector(".grid-container");

  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", toggleCellState);
    gridContainer.appendChild(cell);
    cells.push(cell);
  }
}

// Função para alternar o estado da célula ao ser clicada
function toggleCellState() {
  this.classList.toggle("alive");
}

// Função para atualizar o estado do jogo
function updateGameOfLife() {
  const cellStates = cells.map((cell) => {
    return cell.classList.contains("alive") ? 1 : 0;
  });

  const newCellStates = cellStates.map((state, index) => {
    const neighbors = getNeighborStates(index, cellStates);
    const aliveNeighbors = neighbors.filter(
      (neighbor) => neighbor === 1
    ).length;

    if (state === 1 && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
      return 0; // A célula morre por solidão ou superpopulação
    } else if (state === 0 && aliveNeighbors === 3) {
      return 1; // Uma nova célula nasce
    } else {
      return state; // O estado da célula permanece o mesmo
    }
  });

  newCellStates.forEach((state, index) => {
    const cell = cells[index];
    cell.classList.toggle("alive", state === 1);
  });
}

// Função para obter os estados dos vizinhos de uma célula
function getNeighborStates(cellIndex, cellStates) {
  const row = Math.floor(cellIndex / 10);
  const col = cellIndex % 10;

  const neighbors = [];

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i < 10 && j >= 0 && j < 10 && !(i === row && j === col)) {
        const neighborIndex = i * 10 + j;
        neighbors.push(cellStates[neighborIndex]);
      }
    }
  }

  return neighbors;
}

// Evento de clique no botão de iniciar o jogo
document.getElementById("startButton").addEventListener("click", () => {
  if (!isGameRunning) {
    // Iniciar o jogo
    gameInterval = setInterval(updateGameOfLife, 1000);
    isGameRunning = true;
    document.getElementById("startButton").innerText = "Parar Jogo";
  } else {
    // Parar o jogo
    clearInterval(gameInterval);
    isGameRunning = false;
    document.getElementById("startButton").innerText = "Iniciar Jogo";
  }
});

// Criar as células no grid ao carregar a página
createCells();

// Função do botão Voltar
const onReturn = () => {
  window.open("../../index.html", "_self");
};
