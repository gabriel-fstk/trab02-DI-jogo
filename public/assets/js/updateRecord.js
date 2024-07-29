// Função para atualizar o recorde
function updateRecord(newScore) {
    // Obter o recorde atual do localStorage
    let highScore = parseInt(localStorage.getItem('highScore')) || 0;

    // Atualizar o recorde se o novo score for maior
    if (newScore > highScore) {
        highScore = newScore;
        localStorage.setItem('highScore', highScore);
    }

    // Atualizar a pontuação final e o recorde na tela
    document.getElementById('final-score').textContent = newScore;
    document.getElementById('final-high-score').textContent = highScore;
    document.getElementById('high-score').textContent = highScore;
}

// Exemplo de como usar a função quando o jogo termina
function endGame() {
    clearInterval(gameInterval);
    document.querySelectorAll('.obstacle').forEach(obstacle => {
        obstacle.style.animation = 'none';
    });
    player.classList.remove('player-run');
    gameOverSound.play();
    restartBtn.style.display = 'block';
    gameOverMessage.style.display = 'block';

    // Atualizar o recorde
    updateRecord(score);
}
