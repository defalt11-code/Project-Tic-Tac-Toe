/* 	Experience teaches you how things are done.
		Passion dares to ask if they could be done 
		better.  */


//Seperate the logic of the creation of board and return only what's needed
function gameBoard() {
	const board = [];
	const row = 3;
	const column = 3;

	const initBoard = () => {
		for (let i = 0; i < row; i++) {
			board[i] = [];
			for (let j = 0; j < column; j++) {
				board[i][j] = "";
			}
		}
	}

	initBoard();

	const resetBoard = () => initBoard();
	const getBoard = () => board;
	const setMove = (r, c, mark) => board[r][c] = mark;

	return { getBoard, setMove, resetBoard };
}

const board = gameBoard();

//Handles the creation of the player and automatically assign the mark 
const createPlayer = function () {
	const playerOne = (name) => ({ name: name, mark: "x" })
	const playerTwo = (name) => ({ name: name, mark: "o" })
	return { playerOne, playerTwo }
}()

const p1 = createPlayer.playerOne("john");
const p2 = createPlayer.playerTwo("Josh");

// This control the whole flow of the game
const gameController = function () {
	const { getBoard, setMove, resetBoard } = board;
	let players = [];
	let activePlayer;

	//Set the players position once game starts
	const setPlayers = (p1, p2) => {
		players = [p1, p2];
		activePlayer = players[0];
	}

	//Handles of switching of players everytime we play a round
	const switchActive = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;

	//Check the board Status if all cells ar taken then reset the board 
	const checkBoard = () => {
		const boardStatus = getBoard().reduce((cells, rows) => cells.concat(rows), []);
		if (boardStatus.every(cell => cell != "")) {
			resetBoard();
			console.log("All cells now are taken!");
		}
	}

	//Handles each round this is where we call all helper function to check each round
	const playRound = (r, c) => {
		if (getBoard()[r][c] === "x" || getBoard()[r][c] === "o") {
			alert("cell are already taken!");
			return;
		} else {
			setMove(r, c, activePlayer.mark);
		}
		checkWinner();
		checkBoard();
		switchActive();
		return getBoard();
	}

	//Check if theres already winner using the pattern that we map if its mactches the pattern
	const checkWinner = () => {
		const winningPatterns = [
			[[0, 0], [0, 1], [0, 2]],
			[[1, 0], [1, 1], [1, 2]],
			[[2, 0], [2, 1], [2, 2]],
			[[0, 0], [1, 0], [2, 0]],
			[[0, 1], [1, 1], [2, 1]],
			[[0, 2], [1, 2], [2, 2]],
			[[0, 0], [1, 1], [2, 2]],
			[[0, 2], [1, 1], [2, 0]],
		];

		//map the patterns and store it the marks variable and check if marks has all the same mark
		for (const patterns of winningPatterns) {
			const marks = patterns.map((position) => {
				const r = position[0];
				const c = position[1];
				return getBoard()[r][c];
			});
			if (marks.every(mark => mark != "" && mark === marks[0])) {
				console.log(`${activePlayer.name} wins!`);
			}
		}
	}

	return { setPlayers, playRound, getActivePlayer, };
}()

gameController.setPlayers(p1, p2);

/* console.log(gameController.getActivePlayer());
console.log(gameController.playRound(0, 0));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(1, 1));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(2, 0));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(2, 1));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(1, 0)); */
console.log(gameController.playRound(1, 0));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(2, 0));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(0, 0));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(2, 1));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(2, 2));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(1, 1));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(1, 2));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(0, 1));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(0, 2));

