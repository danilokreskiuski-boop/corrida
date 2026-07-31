const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");

let playerX = 125;
let obstacleY = -100;
let obstacleX = 125;
let speed = 5;
let score = 0;
let isGameOver = false;

// Controle do carro usando as setas do teclado
document.addEventListener("keydown", (event) => {
  if (isGameOver) return;

  if (event.key === "ArrowLeft" && playerX > 10) {
    playerX -= 25;
  } else if (event.key === "ArrowRight" && playerX < 240) {
    playerX += 25;
  }
  player.style.left = playerX + "px";
});

// Loop principal do jogo
function gameLoop() {
  if (isGameOver) return;

  // Movimenta o obstáculo para baixo
  obstacleY += speed;
  if (obstacleY > 500) {
    obstacleY = -100;
    // Posição horizontal aleatória para o próximo obstáculo
    obstacleX = Math.floor(Math.random() * 240);
    score += 10;
    speed += 0.5; // Aumenta a velocidade gradualmente
    scoreDisplay.innerText = "Pontos: " + score;
  }
  obstacle.style.top = obstacleY + "px";
  obstacle.style.left = obstacleX + "px";

  // Verificação de Colisão
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    playerRect.left < obstacleRect.right &&
    playerRect.right > obstacleRect.left &&
    playerRect.top < obstacleRect.bottom &&
    playerRect.bottom > obstacleRect.top
  ) {
    endGame();
  }

  requestAnimationFrame(gameLoop);
}

// Finaliza o jogo
function endGame() {
  isGameOver = true;
  gameOverScreen.style.display = "flex";
}

// Reinicia o jogo
function restartGame() {
  isGameOver = false;
  score = 0;
  speed = 5;
  playerX = 125;
  obstacleY = -100;
  player.style.left = playerX + "px";
  scoreDisplay.innerText = "Pontos: " + score;
  gameOverScreen.style.display = "none";
  requestAnimationFrame(gameLoop);
}

// Inicia o jogo
requestAnimationFrame(gameLoop);