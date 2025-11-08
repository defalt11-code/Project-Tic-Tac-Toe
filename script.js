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

const createPlayer = function () {
	const playerOne = (name) => ({ name: name, mark: "x" })
	const playerTwo = (name) => ({ name: name, mark: "o" })
	return { playerOne, playerTwo }
}()

const p1 = createPlayer.playerOne("john");
const p2 = createPlayer.playerTwo("Josh");

const gameController = function () {
	const { getBoard, setMove } = board;
	let players = [];
	let activePlayer;

	const setPlayers = (p1, p2) => {
		players = [p1, p2];
		activePlayer = players[0];
	}

	const switchActive = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;

	const checkBoard = () => {
		const boardStatus = ()
	}

	const playRound = (r, c) => {
		if (getBoard()[r][c] === "x" || getBoard()[r][c] === "o") {
			alert("cell are already taken!");
			return;
		} else {
			setMove(r, c, activePlayer.mark);
		}
		checkWinner();
		switchActive();
		return getBoard();
	}

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
		]

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

console.log(gameController.getActivePlayer());
console.log(gameController.playRound(0, 0));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(1, 1));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(2, 0));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(2, 1));
console.log(gameController.getActivePlayer());
console.log(gameController.playRound(1, 0));

