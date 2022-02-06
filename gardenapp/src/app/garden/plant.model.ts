
import { CommentJson,Comment } from "./comment.model";

interface PlantJson {
    plantId : number;
    name:string;
    dateAdded: string;
    datePlanted : string;
    border : string;
    bloomFrom : string;
    bloomTill : string;
    winterGreen : boolean;
    colorFlower : string;
    colorLeaves : string;
    maxHeight : number;
    maxWidth : number;
    comments : CommentJson[];

}

export class Plant{   

    private _id: number;   
    
           
    public _datePlanted : Date
  
    private _border : string
    private _bloomFrom : string
    private _bloomTill : string

    private _winterGreen : boolean
    private _colorFlower : string
    private _colorLeaves : string
    private _maxHeight : number
    private _maxWidth: number

    

    
    constructor(
        private _name : string,   
        private _dateAdded = new Date(),
        private _comments = new Array<Comment>()
    ){}

    public get name(): string{
        return this._name;
    }

    public get dateAdded(): Date {
        return this._dateAdded;
    }

    public get comments(): Comment[]{
        return this._comments;
    }


    public get id(): number {
        return this._id;
    }

    public get datePlanted(): Date {
        return this._datePlanted;
    }

    public get border(): string {
        return this._border;
    }

    public get bloomFrom(): string {
        return this._bloomFrom;
    }

    
    public get bloomTill(): string {
        return this._bloomTill;
    }

    public get winterGreen(): boolean {
        return this._winterGreen;
    }

 
    public get colorFlower(): string {
        return this._colorFlower;
    }

    public get maxHeight(): number {
        return this._maxHeight;
    }

    public get colorLeaves(): string {
        return this._colorLeaves;
    }

    
    public get maxWidth(): number {
        return this._maxWidth;
    }

    public set addComment(comment : string){
        this.comments.push(new Comment(comment));
    }

    public set border(border: string){
        this._border = border;
    }

    public set bloomFrom(bloomFrom: string) {
        this._bloomFrom = bloomFrom;
    }


    public set bloomTill(bloomTill: string) {
        this._bloomTill = bloomTill;
    }




    public set colorFlower(colorFlower: string) {
        this._colorFlower = colorFlower;
    }

  

    public set colorLeaves(colorLeaves: string) {
        this._colorLeaves = colorLeaves;
    } 

    public set maxHeight(maxHeight: number) {
        this._maxHeight = maxHeight;
    }

    public set maxWidth(maxWidth: number) {
        this._maxWidth = maxWidth;
    }

    public set datePlanted(datePlanted: Date){
        this._datePlanted = datePlanted;
    }
    
    public set winterGreen(winterGreen: boolean) {
        this._winterGreen = winterGreen;
    }

 



    static fromJSON(json: PlantJson): Plant {
        const rec = new Plant(json.name, new Date(json.dateAdded));
        rec._id = json.plantId;
        rec._border = json.border;
        rec._bloomFrom = json.bloomFrom;
        rec._bloomTill = json.bloomTill;
        rec._colorFlower = json.colorFlower;
        rec._datePlanted = new Date(json.datePlanted);
        rec._colorLeaves = json.colorLeaves;
        rec._maxHeight = json.maxHeight;
        rec._maxWidth = json.maxWidth;
        rec._winterGreen = json.winterGreen;
        rec._comments = json.comments.map(Comment.fromJSON);
        return rec;
    }

    toJSON(): PlantJson {
        return <PlantJson>{
            name: this.name,            
            datePlanted: this.datePlanted.toString(),
            border : this.border,
            bloomFrom: this.bloomFrom,
            bloomTill: this.bloomTill,
            colorFlower: this.colorFlower,
            colorLeaves: this.colorLeaves,
            maxWidth: this.maxWidth,
            maxHeight: this.maxHeight,
            winterGreen: this.winterGreen,            
        }
    }

    toUpdateJSON(): PlantJson {
        return <PlantJson>{
            plantId : this.id,
            name: this.name,            
            datePlanted: this.datePlanted.toString(),
            border : this.border,
            bloomFrom: this.bloomFrom,
            bloomTill: this.bloomTill,
            colorFlower: this.colorFlower,
            colorLeaves: this.colorLeaves,
            maxWidth: this.maxWidth,
            maxHeight: this.maxHeight,
            winterGreen: this.winterGreen,
            comments: this.comments.map( comment => comment.toJSON())
        }
    }


}