class Observable {

    _event_list; // Map avec "nom event" : callback

    constructor(){
        this._event_list = new Map();
    }

    // On ajoute un couple dans la liste
    on(eventName, callback){
        this._event_list.set(eventName, callback);
    }

    // On supprime le couple (true si ça a réussi, false sinon)
    off(eventName){
        return this._event_list.delete(eventName);
    }

    // On appelle le callback avec les args !
    trigger(eventName, ...args){
        if (this._event_list.get(eventName)){
            this._event_list.get(eventName)(...args);
        }
    }
}
