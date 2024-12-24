class LuckyDraw {
    constructor(config) {
        this.config = config;
        this.gridElement = document.getElementById('grid');
        console.log('Grid Element:', this.gridElement);
        this.restartBtn = document.getElementById('restartBtn');
        console.log('Config:', config);
        this.squares = [];
        
        this.init();
    }

    init() {
        this.setupGrid();
        this.setupEventListeners();
        this.initializeGame();
    }

    setupGrid() {
        this.gridElement.style.gridTemplateColumns = 
            `repeat(${this.config.gridSize}, 1fr)`;
    }

    setupEventListeners() {
        this.restartBtn.addEventListener('click', () => this.initializeGame());
    }

    initializeGame() {
        console.log('Initializing game...');
        // 清空網格
        this.gridElement.innerHTML = '';
        this.squares = [];

        const totalSquares = this.config.gridSize * this.config.gridSize;
        const allItems = [
            ...this.config.prizes.map(prize => ({ type: 'prize', ...prize })),
            ...this.config.punishments.map(punishment => ({ type: 'punishment', ...punishment }))
        ];

        // 建立所有方塊的數據
        let squaresData = Array(totalSquares).fill().map(() => ({
            type: 'empty',
            name: '',
            content: '',
            flipped: false
        }));

        // 隨機分配獎項和懲罰
        allItems.forEach(item => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * totalSquares);
            } while (squaresData[randomIndex].type !== 'empty');
            squaresData[randomIndex] = { ...item, flipped: false };
        });

        // 建立方塊元素
        squaresData.forEach((data, index) => {
            const square = this.createSquare(data, index);
            this.squares.push(square);
            this.gridElement.appendChild(square);
        });
    }

    createSquare(data, index) {
        const square = document.createElement('div');
        square.className = 'square';
        square.innerHTML = `
            <div class="square-inner">
                <div class="square-front"></div>
                <div class="square-back">
                    ${this.getSquareContent(data)}
                </div>
            </div>
        `;

        square.addEventListener('click', () => this.handleSquareClick(square, data));
        return square;
    }

    getSquareContent(data) {
        if (data.type === 'empty') {
            return '<div>沒中</div>';
        }
        return `
            <div class="${data.type}">
                <h3>${data.name}</h3>
                <p>${data.content}</p>
            </div>
        `;
    }

    handleSquareClick(square, data) {
        if (data.flipped) return;
        
        data.flipped = true;
        square.classList.add('flipped');
    }
}

// 初始化遊戲
document.addEventListener('DOMContentLoaded', () => {
    new LuckyDraw(gameConfig);
}); 