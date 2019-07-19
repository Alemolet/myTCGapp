export class User{

    private static counter: number = 0;
    private _id: number = 0;
    private _email: string = '';
    private _password: string = '';

    constructor(email: string, password: string){
        this._email = email;
        this._password = password;
        this._id = User.counter;
        User.counter++;
    }

    get id(): number{
        return this._id;
    }

    get email(): string{
        return this._email;
    }

    get password(): string{
        return this._password;
    }
}