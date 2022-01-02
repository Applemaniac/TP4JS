// CIR2 - 2022 - Cyril Cuvelier
// TODO apprendre à reflechir en orienté object ET MVC en même temps :=)
class TicTacToeView{

    _game;
    _nom;

    constructor(game, nom) { // Le constructeur
        this._game = game;
        this._nom = nom;

        this.render(); // on fait le rendu !
        game._event.on("click", (e) => this.click(e)); // On crée un event click
        // Que l'on trigger quand l'on clique sur un td !
        document.querySelectorAll("td").forEach(e => e.addEventListener("click", () => game._event.trigger("click", e)));

    }

    click(elem){
        // On récupère la valeur de data (entre 1 et 9), on lui enlève 1
        // x correspond à data - 1 / 3
        // et y à (data - 1) % 3
        // On arrondit les valeurs sinon ça ne marche pas...
        let x = Math.floor((elem.getAttribute("data") - 1) / 3);
        let y = Math.floor((elem.getAttribute("data") - 1) % 3);
        // Si on clique est que la case est vide ET que le jeu n'est pas fini, on joue et on fait le rendu
        if (this._game.getCaseState(x, y) === undefined && !this._game.isFinished()){
            this._game.play(x, y);
            console.log("x : " + x + ", y : " + y);
            this.render();
        }else{ // Sinon on regarde si le jeu est fini
            if (this._game.isFinished()){ // Si oui, on reset le jeu et on fait le rendu
                this._game.reset();
                this.render();
            }
            // Sinon on ne fait rien (cas où le joueur clique sur une case déjà remplie)
        }
    }

    render(){
        if (this._game.isFinished()){ // Si le jeu est fini, On change le titre
            if (this._game.getWinner() === undefined){  // C'est l'égalité
                document.getElementById("player_number").textContent = this._nom + " - Égalité !"
                console.log("Égalité !");
            }else{ // Quelqu'un a gagné
                let nom = this._game.getWinner() === 0 ? "X" : "O"; // On transforme le nombre du player en X ou O
                document.getElementById("player_number").textContent = this._nom + " - Victoire du joueur " + nom;
                console.log("Victoire de " + this._game.getWinner());
            }
        }else{ // Si le jeu continu, on annonce à qui est le tour !
            console.log("Au tour de " + this._game.getCurrentPlayer());
            let nom = this._game.getCurrentPlayer() === 0 ? "X" : "O"; // On transforme le nombre du player en X ou O
            document.getElementById("player_number").textContent = this._nom + " - C'est au tour du joueur : " + nom;
        }
        // On affiche ensuite les valeurs dans chaque case !
        for (let x = 0; x < 3; x++){
            for (let y = 0; y < 3; y++){
                let value = x * 3 + y + 1; // On transforme les (x,y) en leur équivalence data !
                let elem;
                // On récupère le bon td !
                document.querySelectorAll("td").forEach(e => e.getAttribute("data") === value.toString() ? elem = e : '');
                if (this._game.getCaseState(x, y) !== undefined){ // On affiche X ou O en fonction du nombre
                    if (this._game.getCaseState(x, y) === 0){
                        elem.innerHTML = "<div>X</div>";
                    }else{
                        elem.innerHTML = "<div>O</div>";
                    }
                }else{ // Sinon on affiche rien, la case est vide !
                    elem.innerHTML = "";

                }
            }
        }
    }
}