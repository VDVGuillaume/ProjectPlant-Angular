export interface CommentJson{
    commentText : string;
    dateAdded? : string
}


export class Comment {    
    

    constructor(
    private _commentText : string,   
    private _dateAdded = new Date() 
    ){}
    

    public get commentText(): string {
        return this._commentText;
    }

    public get dateAdded(): Date {
        return this._dateAdded;
    }

    public set commentText(commentText : string){
        this._commentText = commentText;
    }


    toJSON(): CommentJson {
        return { commentText : this.commentText};
    }

    static fromJSON(json : CommentJson) : Comment {
        const rec = new Comment(json.commentText)        
        rec._dateAdded = new Date(json.dateAdded);
        return rec;
    }


        
}