class TicTacToe extends Observable{

    _currentPlayer; // Player qui va jouer
    _grid; // Tableau avec les états de chaque case
    _finish; // Boolean
    _winner; // Le joueur qui a gagné
    _event; // Une liste d'events venant de la classe Observable

    constructor() { // Le constructeur
        super();
        this._currentPlayer = 0;
        this._grid = [[undefined, undefined, undefined],
                     [undefined, undefined, undefined],
                     [undefined, undefined, undefined]];
        this._finish = false;
        this._winner = undefined;
        this._event = new Observable();
    }

    play(x, y){ // On fait jouer le player actuel
        this._grid[x][y] = this._currentPlayer;
        this._currentPlayer = this._currentPlayer === 0 ? 1 : 0;
        this.hasWinner(); // On vérifie s'il y a gagnant
    }

    reset(){ // On réinitialise le jeu
        for (let i = 0; i < this._grid.length; i++) { // D'abord le tableau
            for (let q = 0; q < this._grid.length; q++) {
                this._grid[i][q] = undefined;
            }
        }
        this._currentPlayer = 0; // Puis le joueur
        this._finish = false; // Et enfin le boolean
    }

    getCurrentPlayer(){ // On récupère le joueur actuel
        return this._currentPlayer;
    }

    getCaseState(x, y){ // On récupère l'état de la case
        return this._grid[x][y];
    }

    isFinished(){ // On retourne l'état de la partie
        return this._finish;
    }

    hasWinner(){
        let retour = false;
        // Liste de toutes les conditions de victoire !
        // C'était d'abord plein de if else if mais on a compacté ça !
        let test = [[[0,0], [0,1], [0,2]],
                    [[1,0], [1,1], [1,2]],
                    [[2,0], [2,1], [2,2]],
                    [[0,0], [1,0], [2,0]],
                    [[0,1], [1,1], [2,1]],
                    [[0,2], [1,2], [2,2]],
                    [[0,0], [1,1], [2,2]],
                    [[0,2], [1,1], [2,0]]];

        for (let i = 0; i < test.length; i++){
            // Ok, cette ligne condition est horrible, mais elle donne les différents configurations contenues dans test.
            if ((this._grid[test[i][0][0]][test[i][0][1]] === this._grid[test[i][1][0]][test[i][1][1]]) && (this._grid[test[i][1][0]][test[i][1][1]] === this._grid[test[i][2][0]][test[i][2][1]]) && (this._grid[test[i][0][0]][test[i][0][1]] !== undefined)){
                this._winner = this._grid[test[i][0][0]][test[i][0][1]];
                this._finish = true;
                retour = true;
            }
        }

        if (!retour){ // S'il n'y a pas de victoire, on teste l'égalité !
            let isMate = true;
            // On regarde si tout le tableau est rempli !
            for (let i = 0; i < this._grid.length; i++) {
                for (let q = 0; q < this._grid.length; q++) {
                    if (this._grid[i][q] === undefined){
                        isMate = false;
                    }
                }
            }

            if (isMate){ // Si c'est égalité
                this._winner = undefined; // on met winner à undefined
                this._finish = true; // finish à true
                retour = false; // Et on return false car la fonction s'appelle hasWinner !
            }
        }

        return retour;
    }

    getWinner(){ // On return le winner
        return this._winner;
    }

}