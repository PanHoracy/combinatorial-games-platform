


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

        var correctplaces = [];
       
        for (var y = 0; y < 19; y++) {

            for (var x = 0; x < 11; x++) {

                if (dotsInRow[y][x] == 1) {
                    correctplaces.push([x, y]);
                    const isRemoved = state.removed.some(([removedX, removedY]) => x === removedX && y === removedY);
                    board += '<div data-x="' +
                        x +
                        '" data-y="' +
                        y +
                        '" data-available="' +
                        (isRemoved ? "false" : "true") +
                        '"class="dot"></div>';
                      
                    
                   
                    

                }
                if (dotsInRow[y][x] == 0) {
                    board += '<div class="blankdot"></div>';

                }
                
                if (state.player1[0] === x && state.player1[1] === y) {
                    board += '<div id="orange-ring"></div>';
                }
                if (state.player2[0] === x && state.player2[1] === y) {
                    board += '<div id="blue-ring"></div>';
                }
                
            }
           
            
        }
        
        
        container.innerHTML = board;



        
        cb();
    },
    
    handleHumanTurn(state, player, cb) {




        const pawn = $("#" + (player === "player1" ? "orange" : "blue") + "-ring");
        const pawnX = state[player][0];
        const pawnY = state[player][1];
        const moves = logicOfGame.generateMoves(state, player);
        
        let fieldsList = "";
        for (let i = 0; i < moves.length; ++i) {
            const field = $(".dot[data-x=" + moves[i][0] + "][data-y=" + moves[i][1] + "]");
            
            if (field.length > 0 && field.attr("data-available") === "true" && field.is(":empty")) {
                fieldsList +=
                    (fieldsList.length > 0 ? ", " : "") + ".dot[data-x=" + moves[i][0] +"][data-y=" +moves[i][1] +"]";
            }
            
        }
        const fields = $(fieldsList);
        
        pawn.draggable({
            scope: "fields",
            revert: "invalid",
            
            start() {
                fields.addClass("highlighted");
            },
            stop() {
                fields.removeClass("highlighted");
                fields.removeClass("highlighted2");
            },
        });
        fields.droppable({
            accept: "#orange-ring, #blue-ring",
            scope: "fields",
            drop(event, ui) {
                ui.draggable.parent().attr("data-available", "false");
                console.log(this);
                ui.draggable.draggable("destroy");
                ui.draggable.appendTo(this);
                ui.draggable.css("top", 0);
                ui.draggable.css("left", 0);
                cb([parseInt(ui.draggable.parent().attr("data-x")), parseInt(ui.draggable.parent().attr("data-y"))]);
            },
            over() {
                $(this).addClass("highlighted2");
            },
            out() {
                $(this).removeClass("highlighted2");
            },
        });
    },
    getTruePlayerName(player) {
        if (player === "player1") return "Pomarańczowy";
        if (player === "player2") return "Niebieski";
    },
    getReadableMoveDescription(state, player, move) {
        return (player === "player1" ? "N" : "P") + " (" + move[0] + "," + move[1]+")";
    },
    getReadableWinnerName(state, player) {
        return player === "player1" ? "Pomarańczowy" : "Niebieski   ";
    },
    
}
