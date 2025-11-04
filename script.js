function gameBoard() {
    const board = [];
    const row = 3;
    const column = 3;

    for(let i = 0; i < row; i++) {
        board[i] = []; 
        for(let j = 0; j < column; j++) {
            board[i][j] = "";
        }
    }

    return board
}

console.log(gameBoard())