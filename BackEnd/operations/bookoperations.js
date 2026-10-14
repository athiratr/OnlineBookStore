const pool = require("../connections/db");
const db= require("../connections/db1");

async function getallbooks(req,res){
    try{
       // const {id,name,category,quantity,available}=req.body
        //const name=req.params.name
        //console.log(name)
        const result=await pool.query("select * from bookdetails order by stock")
        console.log(result.rows)
        if(result.rows.length>0){
          res.status(200).json(result.rows)
        }
        else{
            res.status(404).send("Book not found!")
        }
    }
    catch(error){
        console.error("GET ALL BOOKS ERROR:", error);
        res.status(500).send("Internal Server Error")
    }
}


async function addbooks(req,res){
    try{
       const { title,author,price,category,stock,image}=req.body
       console.log(req.body)
        let result= await pool.query('select * from bookdetails where title=$1 ',[title])
        if(result.rows.length>0){
            return res.status(400).send("Book is already available")
        }
        result= await pool.query('insert into bookdetails(title,author,price,category,stock,image) values($1,$2,$3,$4,$5,$6)',[title,author,price,category,stock,image])
        return res.status(201).send("New book added")
        
    }  
    catch(error){
        console.log(error) 
        res.status(500).send("Internal Server Error")
    }
}


async function deletebooks(req,res){

    try{
        const id=req.params.id
         console.log("DELETE ID:", id);

        const result = await pool.query("delete from bookdetails where id = $1", [id] )
        console.log(result)
         if (result.rowCount<1) {
            return res.status(404).send("Book not found");
        }
        return res.status(200).send("Book deleted successfully");
        
    }
    catch(error){
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
        
}
async function getbooks(req,res){
    try{
        const aid=req.params.authorid
        const result=await db.any('select title from books where authorid=$1',[aid])
        if(result.length===0){
            return res.status(404).send("Author not found")
        }
        console.log(result)
        return res.status(200).json(result)
        
    }
    catch(error){
        res.status(500).send("Internal Server Error")
        console.log(error)
    }
}


async function updatebooks(req, res){
    try {
        const { id } = req.params;
        const {title,author,price,category,stock,image} = req.body;
    const result = await db.query( 'UPDATE bookdetails SET title = $1,author = $2,price = $3,category = $4,stock = $5,image = $6 WHERE id = $7 returning *',
        [title,author,price,category,stock,image,id]);
        console.log("RESULT:", result);


        if (result.rowCount === 0) {
            return res.status(404).send("Book not found");
        }

        res.status(200).send("Book Updated Successfully");
    
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to update book");
    }

}
async function searchanybooks(req,res) {
     try {
        const { search } = req.query;
        console.log(search)
        const books = await db.any(`SELECT * FROM bookdetails WHERE 
            title ILIKE $1 OR author ILIKE $1 OR
            category ILIKE $1`,[`%${search}%`]);
            res.json(books);
            if(!books){
            return res.status(404).send("Book Not Found")
             }
    } 
    catch (error) {
        console.log(error);
        res.status(500).send("Unable to search books");
    }
}

async function searchbooks(req,res){
    try{
       // const {id,name,category,quantity,available}=req.body
        const id=req.params.id
    
        //const result=books.filter(book=>book.name==name)
        const result=await pool.query("select * from bookdetails where id=$1",[id])
       console.log(result)
        if(result.rows.length>0){
          res.status(200).json(result.rows[0])
        }
        else{
            res.status(404).send("Book not found!")
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}
// async function borrowbooks(req,res){
//     try{
//         //const name=req.body
//         const id=req.params.id
//         const result = await pool.query("SELECT * FROM books WHERE id = $1", [id] )
//          if (result.rows.length === 0) {
//             return res.status(404).send("Book not found");
//         }

//         if (result.rows[0].available === false) {
//             return res.status(409).send("Book is already borrowed");
//         }

//         await pool.query("UPDATE books SET available = false WHERE id = $1", [id] );

//         res.status(200).send("Book borrowed successfully");
      
//     }    
//     catch(err)
//     {
//         console.log(err)
//         res.status(500).send("Internal Server Error")
//     }
// }

module.exports={getallbooks,addbooks,deletebooks,getbooks,updatebooks,searchanybooks,searchbooks}