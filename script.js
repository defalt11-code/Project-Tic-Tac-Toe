/* 	Experience teaches you how things are done.
		Passion dares to ask if they could be done 
		better.  */

/* THIS IS MY FIRST TIME CREATING API */

// Seperate the logic of the creation of board and return only what's needed
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
	};
	initBoard();

	const resetBoard = () => initBoard();
	const getBoard = () => board;
	const setMove = (r, c, mark) => board[r][c] = mark;

	return { getBoard, setMove, resetBoard };
};

const board = gameBoard();

// Handles the creation of the player and automatically assign the mark 
const createPlayer = (function () {
	const playerOne = (name) => ({ name: name, mark: "x" })
	const playerTwo = (name) => ({ name: name, mark: "o" })
	return { playerOne, playerTwo }
})();

/* const p1 = createPlayer.playerOne("john");
const p2 = createPlayer.playerTwo("Josh"); */

// This control the whole flow of the game logic
const gameController = function () {
	const { getBoard, setMove, resetBoard } = board;
	let players = [];
	let activePlayer;

	// Set the players position once game starts
	const setPlayers = (p1, p2) => {
		players = [p1, p2];
		activePlayer = players[0];
	};

	// Handles of switching of players everytime we play a round
	const switchActive = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
		displayController.showPlayerUI(activePlayer.name);
	};

	const getActivePlayer = () => activePlayer;

	// Check the board Status if all cells ar taken then reset the board 
	const checkBoard = () => {
		const boardStatus = getBoard().reduce((cells, rows) => cells.concat(rows), []);
		if (boardStatus.every(cell => cell != "")) {
			displayController.renderOverLayUI("after");
			// afterOverlay.classList.toggle("active");
			displayController.messageUI();
			return true;
		}
	};

	// Handles each round this is where we call all helper function to check each round
	const playRound = (r, c, cell) => {
		if (getBoard()[r][c] === "x" || getBoard()[r][c] === "o") {
			alert("cell are already taken!");
			return;
		} else {
			displayController.renderMoveUI(cell, activePlayer.mark)
			setMove(r, c, activePlayer.mark);
		}
		if (checkWinner()) return;
		if (checkBoard()) return;
		switchActive();
		return getBoard();
	};

	// Check if theres already winner using the pattern that we map if its mactches the pattern
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
		// Map the patterns and store it the marks variable and check if marks has all the same mark
		for (const patterns of winningPatterns) {
			const marks = patterns.map((position) => {
				const r = position[0];
				const c = position[1];
				return getBoard()[r][c];
			});
			if (marks.every(mark => mark != "" && mark === marks[0])) {
				displayController.renderOverLayUI("after");
				// afterOverlay.classList.toggle("active");
				displayController.messageUI(activePlayer.name);
				return true;
			}
		}
	};

	return { setPlayers, getActivePlayer, playRound, switchActive, resetBoard };
}();

//handles all display related 
const displayController = (function () {
	// DOM referrence
	const showPlayer = document.querySelector(".player");
	const message = document.querySelector(".message");
	const cellsHTML = Array.from(document.querySelectorAll(".cells"));
	const startOverlay = document.querySelector(".start__overlay");
	const afterOverlay = document.querySelector(".after__overlay");
	// DOM referrence

	//This determine which mark image were gonna use
	function renderMoveUI(cell, mark) {
		const img = document.createElement("img");
		img.classList.add("marks");
		setTimeout(() => {
			img.classList.add("pop");
		}, 1);
		img.src = mark === "x" ? "marks/X.png" : "marks/O.png";
		img.classList.ad
		cell.replaceChildren(img);
	};
	//shows UI whose player turn
	function showPlayerUI(currentPlayer) {
		showPlayer.textContent = `${currentPlayer}'s turn`;
	}
	//clears the board in UI not in the game logic!
	function clearBoardUI() {
		cellsHTML.forEach(cells => cells.textContent = "");
	};
	// if there's a winner show's the winner! if there's not shows draw!
	function messageUI(player) {
		message.textContent = player === undefined ? "Draw!" : `${player} wins!`
	}
	//initiate which overlay are needed if start/after overlay
	function renderOverLayUI(screen) {
		if (screen === "start") {
			startOverlay.classList.toggle("disable");
		} else if (screen === "after") {
			afterOverlay.classList.toggle("active")
		}
	}

	const getCell = () => cellsHTML;

	return { renderMoveUI, clearBoardUI, showPlayerUI, messageUI, getCell, renderOverLayUI };
})();

// handles all all event related 
const eventController = (function () {
	const cell = displayController.getCell();

	// DOM referrence
	const pOneInput = document.querySelector(".player__one");
	const pTwoInput = document.querySelector(".player__two");
	const enterNameBtn = document.querySelector(".enter__btn");
	const playAgainBtn = document.querySelector(".play__again__btn");
	// DOM referrence

	function handleClick(event) {
		const target = event.target;
		switch (target.className) {
			case "cells":
				const cells = target;
				const row = target.dataset.row;
				const col = target.dataset.col;
				gameController.playRound(row, col, cells);
				break;
			case "play__again__btn":
				gameController.resetBoard();
				displayController.clearBoardUI();
				// afterOverlay.classList.toggle("active");
				displayController.renderOverLayUI("after");
				break;
			case "enter__btn":
				const p1 = createPlayer.playerOne(pOneInput.value);
				const p2 = createPlayer.playerTwo(pTwoInput.value);
				// startOverlay.classList.toggle("disable");
				displayController.renderOverLayUI("start");
				displayController.showPlayerUI(p1.name);
				gameController.setPlayers(p1, p2);
				break;
		}
	}

	enterNameBtn.addEventListener("click", handleClick);
	playAgainBtn.addEventListener("click", handleClick);
	cell.forEach(c => c.addEventListener("click", handleClick));
})();


// gameController.setPlayers(p1, p2);

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

/* console.log(gameController.playRound(1, 0));
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
console.log(gameController.playRound(0, 2)); */

/* DEAR FUTURE SELF I HOPE YOU MAKE IT */