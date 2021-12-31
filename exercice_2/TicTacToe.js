class TicTacToe extends Observable{

    _currentPlayer;
    _grid;
    _finish;
    _winner;
    _event;

    constructor() {
        super();
        this._currentPlayer = 0;
        this._grid = [[undefined, undefined, undefined],
                     [undefined, undefined, undefined],
                     [undefined, undefined, undefined]];
        this._finish = false;
        this._winner = undefined;
        this._event = new Observable();
    }

    play(x, y){
        this._grid[x][y] = this._currentPlayer;
        this._currentPlayer = this._currentPlayer === 0 ? 1 : 0;
        this.hasWinner();
    }

    reset(){
        for (let i = 0; i < this._grid.length; i++) {
            for (let q = 0; q < this._grid.length; q++) {
                this._grid[i][q] = undefined;
            }
        }
        this._currentPlayer = 0;
        this._finish = false;
    }

    getCurrentPlayer(){
        return this._currentPlayer;
    }

    getCaseState(x, y){
        return this._grid[x][y];
    }

    isFinished(){
        return this._finish;
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
            if ((this._grid[test[i][0][0]][test[i][0][1]] === this._grid[test[i][1][0]][test[i][1][1]]) && (this._grid[test[i][1][0]][test[i][1][1]] === this._grid[test[i][2][0]][test[i][2][1]]) && (this._grid[test[i][0][0]][test[i][0][1]] !== undefined)){
                this._winner = this._grid[test[i][0][0]][test[i][0][1]];
                this._finish = true;
                retour = true;
            }
        }

        if (!retour){ // S'il n'y a pas de victoire, on test l'égalité !
            let isMate = true;
            for (let i = 0; i < this._grid.length; i++) {
                for (let q = 0; q < this._grid.length; q++) {
                    if (this._grid[i][q] === undefined){
                        isMate = false;
                    }
                }
            }

            if (isMate){
                this._winner = undefined;
                this._finish = true;
                retour = false;
            }
        }

        return retour;
    }

    getWinner(){
        return this._winner;
    }

}