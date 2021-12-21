class Observable {

    _event_list;

    constructor(){
        this._event_list = new Map();
    }

    on(eventName, callback){
        this._event_list.set(eventName, callback);
    }

    off(eventName, callback){
        this._event_list.delete(eventName);
    }

    trigger(eventName, ...args){
        if (this._event_list.get(eventName)){
            this._event_list.get(eventName)(...args);
        }
    }
}
