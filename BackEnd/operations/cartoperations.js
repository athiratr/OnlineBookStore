const db = require("../connections/db1");

async function addToCart(req, res) {

    try {

        const { book_id } = req.body;

        console.log("Book ID:", book_id);
        console.log("User ID:", req.session.userId);
        console.log("Session:", req.session);

        const result = await db.any(
            "SELECT * FROM cart WHERE user_id = $1 AND book_id = $2",
            [req.session.userId, book_id]
        );
        const book = await db.one(
            `SELECT title, stock FROM bookdetails WHERE id = $1`,[book_id]);
        const currentQuantity =
            result.length > 0 ? Number(result[0].quantity) : 0;

        // Prevent quantity from exceeding stock
        if (currentQuantity >= Number(book.stock)) {
            return res.status(400).json({
                message: `Maximum limit reached! Only ${book.stock} copies of "${book.title}" are available.`
            });
        }
        


        if (result.length > 0) {


            await db.query(
                "UPDATE cart SET quantity = quantity + 1 WHERE user_id = $1 AND book_id = $2",
                [req.session.userId, book_id]
            );

            res.status(200).json({
                message: "Book quantity increased"
            });

        } else {

            await db.query(
                "INSERT INTO cart (user_id, book_id, quantity) VALUES ($1, $2, $3)",
                [req.session.userId, book_id, 1]
            );

            res.status(200).json({
                message: "Book added to cart"
            });
        }

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Unable to add book to cart"
        });
    }
}

async function getCart(req, res) {
    try {
        const userId = req.session.userId;

        const cart = await db.any(
            `SELECT 
                cart.id,
                cart.book_id,
                cart.quantity,
                bookdetails.title,
                bookdetails.stock,
                bookdetails.author,
                bookdetails.price,
                bookdetails.image
             FROM cart
             JOIN bookdetails
             ON cart.book_id = bookdetails.id
             WHERE cart.user_id = $1`,
            [userId]
        );

        res.status(200).json(cart);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Unable to get cart"
        });
    }
}
async function deleteCart(req, res) {
    try {
        const book_id = req.params.id;
        const user_id = req.session.userId;

        console.log("Book ID:", book_id);
        console.log("User ID:", user_id);

        const result = await db.any(
            "SELECT * FROM cart WHERE user_id = $1 AND book_id = $2",
            [user_id, book_id]
        );

        if (result.length > 0) {

            if (result[0].quantity > 1) {

                await db.query(
                    "UPDATE cart SET quantity = quantity - 1 WHERE user_id = $1 AND book_id = $2",
                    [user_id, book_id]
                );

                return res.status(200).json({
                    message: "Book quantity decreased"
                });

            } else {

                await db.query(
                    "DELETE FROM cart WHERE user_id = $1 AND book_id = $2",
                    [user_id, book_id]
                );

                return res.status(200).json({
                    message: "Book removed from cart"
                });
            }

        } else {
            return res.status(404).json({
                message: "Book not found in cart"
            });
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function checkOut(req,res){
    try{
        const userId=req.session.userId
        const cartItems = await db.any(
            `SELECT c.book_id,c.quantity,b.title,b.price, b.stock
             FROM cart c JOIN bookdetails b ON c.book_id = b.id
             WHERE c.user_id = $1`,[userId]);
        if(cartItems.length===0){
            return res.status(400).json({
                message:"Cart is Empty"
            })
        }
        for (const item of cartItems) {
            if (item.quantity > item.stock) {
                return res.status(400).json({
                    message: `${item.title} has only ${item.stock} copies available`
                });
            }
        }
        const total = cartItems.reduce(
            (sum, item) => sum + Number(item.price) * item.quantity,
            0
        );
        const user = await db.one(`SELECT order_history FROM lbuser WHERE id = $1`,[userId] );
        const order_history=user.order_history||[]
        const order = {
            order_id: order_history.length+1,
            date: new Date().toLocaleString("en-GB"),
            items: cartItems.map(item => ({
                book_id: item.book_id,
                title:item.title,
                quantity: item.quantity,
                price: item.price
            })),
            total: total
        };
        order_history.push(order);

         for (const item of cartItems) {
                await db.none(
                    `UPDATE bookdetails
                     SET stock = stock - $1
                     WHERE id = $2`,
                    [item.quantity, item.book_id]
                );
            }
            await db.none(
                `UPDATE lbuser
                 SET order_history = $1
                 WHERE id = $2`,
                [JSON.stringify(order_history), userId]
            );
            await db.none(`DELETE FROM cart WHERE user_id = $1`,[userId]);
            res.status(200).json({
            message: "Checkout successful",
            order: order
        });
    }
    catch(error){
        console.log(error.res)
        res.status(500).json({
            message:"Server Error:Failed to CheckOut"
        })
    }
}
async function getPurchases(req, res) {
    try {

        const users = await db.any(
            `SELECT id, full_name, order_history
             FROM lbuser
             WHERE order_history IS NOT NULL`
        );

        res.status(200).json(users);

    } catch (error) {

        console.log(error);

        res.status(500).send("Unable to get purchases");
    }
}
async function getMyOrders(req, res) {
    try {

        const userId = req.session.userId;

        const user = await db.one(
            `SELECT order_history
             FROM lbuser
             WHERE id = $1`,
            [userId]
        );

        const orderHistory = user.order_history || [];

        const orders = [];
         for (const order of orderHistory) {
            orders.push({
                order_id: order.order_id,
                date: order.date,
                total: order.total
            });
        }

        res.status(200).json(orders);

    } catch (error) {

        console.log(error);

        res.status(500).send("Unable to get orders");
    }

}
async function getPurchase(req, res) {

    try {

        const order_id = Number(req.params.order_id);
        const user_id = Number(req.params.user_id);

        const user = await db.oneOrNone(
            `SELECT full_name, order_history
             FROM lbuser
             WHERE id = $1`,
            [user_id]
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        const order = user.order_history.find(
            (order) => Number(order.order_id) === order_id
        );

        if (!order) {
            return res.status(404).send("Purchase not found");
        }

        const purchase = order.items.map((item) => ({
            order_id: order.order_id,
            date: order.date,
            full_name: user.full_name,
            book_id: item.book_id,
            title: item.title,
            price: item.price,
            quantity: item.quantity
        }));

        res.status(200).json(purchase);

    } catch (error) {

        console.log(error);

        res.status(500).send("Internal Server Error");
    }
}
async function getMyOrder(req, res) {
    try {

        const userId = req.session.userId;
        const orderId = Number(req.params.order_id);

        const user = await db.oneOrNone(
            `SELECT order_history
             FROM lbuser
             WHERE id = $1`,
            [userId]
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        const order = user.order_history.find(
            (order) => Number(order.order_id) === orderId
        );

        if (!order) {
            return res.status(404).send("Order not found");
        }

        res.status(200).json(order);

    } catch (error) {

        console.log(error);

        res.status(500).send("Unable to get order");
    }
}

module.exports = { addToCart,getCart,deleteCart,checkOut,getPurchases,getMyOrders,getPurchase,getMyOrder}
