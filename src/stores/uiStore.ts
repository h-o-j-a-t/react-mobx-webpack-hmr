import { observable, action, computed } from "mobx";

class UiStore {
    @observable private _isLoggedIn : boolean;
    @computed public get isLoggedIn() : boolean {
        return this._isLoggedIn;
    }
    public set isLoggedIn(v : boolean) {
        this._isLoggedIn = v;
    }
    
    @observable private _firstName : string;
    @computed public get firstName() : string {
        return this._firstName;
    }
    public set firstName(v : string) {
        this._firstName = v;
    }
    
    @observable private _lastName : string;
    @computed public get lastName() : string {
        return this._lastName;
    }
    public set lastName(v : string) {
        this._lastName = v;
    }
    
    @computed public get fullName() : string {
        return this._firstName + ' ' + this._lastName;
    }

    constructor() {
        this._firstName = 'hojat';
        this._lastName = 'jafari';
    }
}

let uiStore = new UiStore();

export default uiStore;