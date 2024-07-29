document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const obstaclesContainer = document.getElementById('obstacles');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const scoreBoard = document.getElementById('score');
    const highScoreBoard = document.getElementById('high-score');
    const finalScore = document.getElementById('final-score');
    const finalHighScore = document.getElementById('final-high-score');
    const gameOverMessage = document.getElementById('game-over');
    const jumpSound = new Audio('public/src/sounds/jump.mp3');
    const gameOverSound = new Audio('public/src/sounds/game-over.mp3');
    let score = 0;
    let highScore = localStorage.getItem('highScore') || 0;
    let gameInterval;
    let isJumping = false;
    let obstacleSpeed = 4; // Start speed

    highScoreBoard.textContent = highScore;

    function startGame() {
        score = 0;
        obstacleSpeed = 2; // Reset speed
        scoreBoard.textContent = score;
        obstaclesContainer.innerHTML = '';
        startBtn.style.display = 'none';
        restartBtn.style.display = 'none';
        gameOverMessage.style.display = 'none';
        player.classList.add('player-run');
        gameInterval = setInterval(() => {
            score++;
            scoreBoard.textContent = score;
            if (score % 100 === 0) {
                obstacleSpeed -= 0.2;
            }
            if (Math.random() < 0.02) {
                createObstacle();
            }
            document.querySelectorAll('.obstacle').forEach(obstacle => {
                if (checkCollision(player, obstacle)) {
                    endGame();
                }
            });
        }, 100);

        obstacleInterval = setInterval(() => {
            if (Math.random() < 0.15) {
                createObstacle();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(gameInterval);
        document.querySelectorAll('.obstacle').forEach(obstacle => {
            obstacle.style.animation = 'none';
        });
        player.classList.remove('player-run');
        gameOverSound.play();
        restartBtn.style.display = 'block';
        finalScore.textContent = score;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
        finalHighScore.textContent = highScore;
        gameOverMessage.style.display = 'block';

        updateRecord(score);
    }

    function createObstacle() {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstaclesContainer.appendChild(obstacle);
        obstacle.style.animation = `obstacle-animation ${obstacleSpeed}s linear infinite`;
        setTimeout(() => {
            if (obstacle.parentElement) {
                obstacle.parentElement.removeChild(obstacle);
            }
        }, obstacleSpeed * 1000);
    }

    function jump() {
        if (isJumping) return;
        isJumping = true;
        jumpSound.play();
        let jumpHeight = 150;
        let jumpDuration = 350;
        player.style.transition = `bottom ${jumpDuration / 700}s`;
        player.style.bottom = `${jumpHeight}px`;
        setTimeout(() => {
            player.style.bottom = '0';
            setTimeout(() => {
                isJumping = false;
            }, jumpDuration);
        }, jumpDuration);
    }

    function checkCollision(player, obstacle) {
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();
        return !(
            playerRect.top > obstacleRect.bottom ||
            playerRect.bottom < obstacleRect.top ||
            playerRect.right < obstacleRect.left ||
            playerRect.left > obstacleRect.right
        );
    }

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            jump();
        }
    });
    document.addEventListener('touchstart', jump);
});
