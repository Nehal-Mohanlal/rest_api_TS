import  express  from "express"; 
import controller from "../controllers/Book" 
import router from "./author";


const bookrouter = express.Router()

bookrouter.post('/create', controller.createBook)
bookrouter.get('/get/:bookId', controller.readBook)
bookrouter.get('/get', controller.readAllBook)
bookrouter.patch('/update/:bookId', controller.updateBook)
bookrouter.delete('/delete/:bookId', controller.deleteBook) 

export = bookrouter

