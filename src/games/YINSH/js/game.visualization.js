const visualizationOfGame = {
    drawState(state, player, move, container, cb) {
        let body = '<div class="body">';
        let board = '<div class="board">';
        body += '<div class="board"></div>';

        const dotsInRow = [
            [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0]
                
    
        ]

        
        for (var i = 0; i < 19; i++) {

            for (var j = 0; j < 11; j++) {
                
                if (dotsInRow[i][j] == 1) {
                    board += '<div class="dot"></div>';
                    
                }
                if (dotsInRow[i][j] == 0) {
                    board += '<div class="blankdot"></div>';
                    
                }
                
            }
            
        }
        
                   
        container.innerHTML = board;
        cb();
    },
    handleHumanTurn(state, player, cb) { },
    /**
     * Funkcja zwraca nazwę gracza zgodną z zasadami.
     */
    getTruePlayerName(player) { },
    /**
     * Funkcja zwraca czytelny dla człowieka opis ruchu.
     */
    getReadableMoveDescription(state, player, move) { },
    /**
     * Funkcja zwraca czytelny dla człowieka opis wygranego gracza.
     */
    getReadableWinnerName(state, player) { },
};
