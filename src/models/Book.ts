import mongoose, {Document, Schema} from "mongoose";  

export interface Ibook {
    title: string;
    author: string 
}

export interface IBookModel extends Ibook , Document {} 

const BookSchema: Schema = new Schema(
    {
        title: {type: String, required: true}, 
        author: {type: Schema.Types.ObjectId, required: true} 
    }, 
    {
        timestamps:true,
        versionKey: false
    },

    
    
)

export default mongoose.model<IBookModel>('Book', BookSchema)