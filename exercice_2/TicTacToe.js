class TicTacToe extends Observable{

    currentPlayer;
    grid;
    finish;
    winner;

    constructor() {
        super();
        this.currentPlayer = 0;
        this.grid = [[undefined, undefined, undefined],
                     [undefined, undefined, undefined],
                     [undefined, undefined, undefined]];
        this.finish = false;
        this.winner = undefined;
    }

    play(x, y){
        this.grid[x][y] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
        this.hasWinner();
    }

    reset(){
        for (let i = 0; i < this.grid.length; i++) {
            for (let q = 0; q < this.grid.length; q++) {
                this.grid[i][q] = undefined;
            }
        }
        this.currentPlayer = 0;
        this.finish = false;
    }

    getCurrentPlayer(){
        return this.currentPlayer;
    }

    getCaseState(x, y){
        return this.grid[x][y];
    }

    isFinished(){
        return this.finish;
    }

    hasWinner(){
        let retour = false;
        // Liste de toutes les conditions de victoire !
        let test = [[[0,0], [0,1], [0,2]],
                    [[1,0], [1,1], [1,2]],
                    [[2,0], [2,1], [2,2]],
                    [[0,0], [1,0], [2,0]],
                    [[0,1], [1,1], [2,1]],
                    [[0,2], [1,2], [2,2]],
                    [[0,0], [1,1], [2,2]],
                    [[0,2], [1,1], [2,0]]];

        for (let i = 0; i < test.length; i++){
            // Ok, cette ligne condition est horrible mais elle donne les diffrentes configurations contenues dans test.
            if ((this.grid[test[i][0][0]][test[i][0][1]] === this.grid[test[i][1][0]][test[i][1][1]]) && (this.grid[test[i][1][0]][test[i][1][1]] === this.grid[test[i][2][0]][test[i][2][1]]) && (this.grid[test[i][0][0]][test[i][0][1]] !== undefined)){
                this.winner = this.grid[test[i][0][0]][test[i][0][1]];
                this.finish = true;
                retour = true;
            }
        }

        if (!retour){ // S'il n'y a pas de victoire, on test l'égalité !
            let isMate = true;
            for (let i = 0; i < this.grid.length; i++) {
                for (let q = 0; q < this.grid.length; q++) {
                    if (this.grid[i][q] === undefined){
                        isMate = false;
                    }
                }
            }

            if (isMate){
                this.winner = undefined;
                this.finish = true;
                retour = false;
            }
        }

        return retour;
    }

    getWinner(){
        return this.winner;
    }



}