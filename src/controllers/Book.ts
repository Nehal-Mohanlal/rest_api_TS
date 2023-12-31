import { NextFunction, Request, Response, request, response } from "express"; 
import mongoose, { mongo } from "mongoose";

import Book from "../models/Book"; 

const createBook = (req: Request, res: Response, next: NextFunction)=> {
    const {title} = req.body; 
    const {author} = req.body;
    const book = new Book({
        _id: new mongoose.Types.ObjectId(), 
        title,
        author
    }) 

    return book.save()
    .then(book => res.status(201).json({author}))
    .catch((error)=> res.status(500).json({error}))

} 
const readBook = (req: Request, res: Response, next: NextFunction)=> {
    const bookId = req.params.authorId; 

    return Book.findById(bookId)
    .then(book => book ? res.status(200).json({book}):res.status(404).json({message: "not found"}))
    .catch((error)=> res.status(500).json({error}))
} 
const readAllBook = (req: Request, res: Response, next: NextFunction)=> {
    return Book.find()
    .then((books) => res.status(200).json({books})) 
    .catch((error)=> res.status(500).json({error}))
} 
const updateBook = (req: Request, res: Response, next: NextFunction)=> {
    const bookId = req.params.bookId; 
    
    return Book.findById(bookId)
    .then(book => {
        if (book){
            book.set(req.body)

            return book.save()
                    .then(book => res.status(201).json({book}))
                    .catch((error)=> res.status(500).json({error}))

        }else{
            res.status(404).json({message: "not found"})
        }
    })
    .catch((error)=> res.status(500).json({error}))
} 
const deleteBook = (req: Request, res: Response, next: NextFunction)=> {
    const bookId = req.params.bookId; 
    return Book.findByIdAndRemove(bookId)
    .then((book)=> (book ? res.status(200).json({
    message: "Deleted"}) : res.status(404).json({message: "Not found"})))
    .catch((error)=> res.status(500).json({error}))


} 

export default {createBook, readBook, readAllBook, updateBook, deleteBook}