const db= require("../connections/db1");
//const bcrypt=require('bcrypt')
async function login(req,res) {
    try{
        const {username,password}=req.body
        console.log(username)
        console.log(password)
        if(!username){
            return res.status(400).send("Username Required")

        }
        if(!password){
        return res.status(400).send("Password Reaquired")
        }
        let login=await db.oneOrNone('select username,category,full_name,id from lbuser where username=$1 and password=$2',[username,password])
        console.log("Login result:", login);
        if(!login){
            return res.status(400).send("Invalid credentials")
        }
        else{
            //console.log("Login result:", login);
            req.session.username = login.username;
            req.session.category = login.category;
            req.session.full_name=login.full_name;
            req.session.userId=login.id
            console.log("Session:", req.session);
            return res.status(200).send({username: login.username,
            category: login.category,full_name:login.full_name,id:login.id})
        }
    }
    catch(error){
        res.status(500).send("Internal Server error")
        console.log(error)
    }
    
}
async function addusers(req, res) {

    const {
        full_name,
        username,
        password,
        phone,
        gender,
        email
    } = req.body;

    try {
        if (!full_name || !/^[A-Za-z ]{3,50}$/.test(full_name.trim()))
            return res.status(400).send("Invalid full name");

        if (!username || !/^[A-Za-z0-9_]{3,20}$/.test(username.trim()))
            return res.status(400).send("Invalid username:Atleast three Characters!");

        if (!password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,50}$/.test(password))
            return res.status(400).send("Invalid password:Must contain a Capital letter,Special Character and Number");

        if (!phone || !/^[0-9]{10}$/.test(phone.trim()))
            return res.status(400).send("Invalid phone number:Maximum 10 digits");

        if (!gender || !/^(male|female|other)$/i.test(gender.trim()))
            return res.status(400).send("Invalid gender");

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
            return res.status(400).send("Invalid email");

        const result = await db.query(
            `INSERT INTO lbuser
            (full_name, username, password, phone, gender, email, category)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, full_name, username, phone, gender, email, category`,
            [
                full_name,
                username,
                password,
                phone,
                gender,
                email,
                "user"
            ]
        );

        res.status(201).send(result);

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Unable to create user");
    }
}
async function checkSession(req, res) {

    if (!req.session.username) {
        return res.status(401).send("Not logged in");
    }

    return res.status(200).send({
        username: req.session.username,
        category: req.session.category,
        full_name:req.session.full_name,
        id:req.session.id
    });
}

module.exports={login,addusers,checkSession}