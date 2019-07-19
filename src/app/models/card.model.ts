import { Type } from './Type.enum';

export class Card{

    private _id: number;
    private _name: string = '';
    private _description: string = '';
    private _type: Type;
    private _imgPath: string = '';


    constructor(id: number, name: string, desc: string, type: Type, img: string){
        this._id = id;
        this._name = name;
        this._description = desc;
        this._type = type;
        this._imgPath = img;
    }

    get name(): string{
        return this._name;
    }

    get description(): string{
        return this._description;
    }

    get type(): Type{
        return this._type;
    }

    get imgPath(): string{
        return this._imgPath;
    }

    get id(): number{
        return this._id;
    }

    set name(newName: string){
        this._name = newName;
    }

    set description(newDesc: string){
        this._description = newDesc;
    }

    set type(newType: Type){
        this._type = newType;
    }

    set imgPath(newImgPath: string){
        this._imgPath = newImgPath;
    }
}