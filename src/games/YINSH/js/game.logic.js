const boardWidth = 11;
const boardHeight = 19;

const gameId = "YINSH";

const logicOfGame = {
    generateInitialState() {
        return {
            player1: [0, 18],
            player2: [0, 0],
            removed: [],
        };
    },
    evaluateState(state, player) {
        let totalMoves = {
            player1: 0,
            player2: 0
        };
        for (let playerX of ["player1", "player2"]) {
            const moves = this.generateMoves(state, playerX);
            for (let move of moves) {
                let afterState = this.generateStateAfterMove(state, playerX, move);
                const afterMoves = this.generateMoves(afterState, playerX);
                totalMoves[playerX] += 1 + afterMoves.length;
            }
        }
        const moves = {
            player1: this.generateMoves(state, "player1"),
            player2: this.generateMoves(state, "player2")
        };
        const opponent = player === "player1" ? "player2" : "player1";
        const score = totalMoves[player] - totalMoves[opponent];
        return score;
    },
    generateMoves(state, player) {
        const positions = [
            [4, 0], [6, 0], [3, 1], [5, 1], [7, 1],
            [2, 2], [4, 2], [6, 2], [8, 2], [1, 3],
            [3, 3], [5, 3], [7, 3], [9, 3], [2, 4],
            [4, 4], [6, 4], [8, 4], [1, 5], [3, 5],
            [5, 5], [7, 5], [9, 5], [0, 6], [2, 6],
            [4, 6], [6, 6], [8, 6], [10, 6], [1, 7],
            [3, 7], [5, 7], [7, 7], [9, 7], [0, 8],
            [2, 8], [4, 8], [6, 8], [8, 8], [10, 8],
            [1, 9], [3, 9], [5, 9], [7, 9], [9, 9],
            [0, 10], [2, 10], [4, 10], [6, 10], [8, 10],
            [10, 10], [1, 11], [3, 11], [5, 11], [7, 11],
            [9, 11], [0, 12], [2, 12], [4, 12], [6, 12],
            [8, 12], [10, 12], [1, 13], [3, 13], [5, 13],
            [7, 13], [9, 13], [2, 14], [4, 14], [6, 14],
            [8, 14], [1, 15], [3, 15], [5, 15], [7, 15],
            [9, 15], [2, 16], [4, 16], [6, 16], [8, 16],
            [3, 17], [5, 17], [7, 17], [4, 18], [6, 18]
        ];
        const moves = [];
        for (let i = 0; i < positions.length; ++i) {
            const x = positions[i][0];
            const y = positions[i][1];
            if (x >= 0 && x < boardWidth && y >= 0 && y < boardHeight) {
                const invalidPositions = [state.player1, state.player2, ...state.removed];
                if (invalidPositions.some(([invalidX, invalidY]) => x === invalidX && y === invalidY) === false) {
                    moves.push([x, y]);
                }
            }
        }
        return moves;
    },
    generateStateAfterMove(previousState, player, move) {
        const state = {
            player1: [...previousState.player1],
            player2: [...previousState.player2],
            removed: [...previousState.removed],
        };
        state.removed.push(state[player]);
        state[player] = move;
        return state;
    },
    isStateTerminal(state, player) {
        const availableMoves = this.generateMoves(state, player);
        return availableMoves.length === 0;
    },
    generateUniqueKey: undefined,
};

const players = [
    { type: PlayerTypes.ALPHABETA, label: "AlphaBeta (łatwy)", maxDepth: 3 }
];