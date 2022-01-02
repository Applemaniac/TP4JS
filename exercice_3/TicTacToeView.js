class TicTacToeView{

    _game;
    _nom;

    constructor(game, nom) {
        this._game = game;
        this._nom = nom;

        this.render();
        game._event.on("click", (e) => this.click(e));
        document.querySelectorAll("td").forEach(e => e.addEventListener("click", () => game._event.trigger("click", e)));

    }

    click(elem){
        let x = Math.floor((elem.getAttribute("data") - 1) / 3);
        let y = Math.floor((elem.getAttribute("data") - 1) % 3);
        if (this._game.getCaseState(x, y) === undefined && !this._game.isFinished()){
            this._game.play(x, y);
            console.log("x : " + x + ", y : " + y);
            this.render();
        }else{
            if (this._game.isFinished()){
                this._game.reset();
                this.render();
            }
        }
    }

    render(){
        if (this._game.isFinished()){
            if (this._game.getWinner() === undefined){
                document.getElementById("player_number").textContent = this._nom + " - Égalité !"
                console.log("Égalité !");
            }else{
                document.getElementById("player_number").textContent = this._nom + " - Victoire du joueur " + this._game.getWinner();
                console.log("Victoire de " + this._game.getWinner());
            }
        }else {
            console.log("Au tour de " + this._game.getCurrentPlayer());
            document.getElementById("player_number").textContent = this._nom + " - C'est au tour du joueur : " + this._game.getCurrentPlayer();
        }
        for (let x = 0; x < 3; x++){
            for (let y = 0; y < 3; y++){
                let value = x * 3 + y + 1;
                let elem;
                document.querySelectorAll("td").forEach(e => e.getAttribute("data") === value.toString() ? elem = e : '');
                if (this._game.getCaseState(x, y) !== undefined){
                    if (this._game.getCaseState(x, y) == 0){
                        elem.textContent = "X";
                    }else{
                        elem.textContent = "O";
                    }
                }else{
                    elem.textContent = "";

                }
            }
        }
    }
}