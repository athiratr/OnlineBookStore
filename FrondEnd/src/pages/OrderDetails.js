import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button } from "antd";
import axios from "axios";
import UserTopBar from "../components/usertopbar";

function MyOrderDetails() {

    const { order_id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    useEffect(() => {

        axios.get(
            `http://localhost:4000/cart/getMyOrder/${order_id}`,
            { withCredentials: true }
        )
        .then((response) => {
            setOrder(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    }, [order_id]);

    return (
        <>
            <UserTopBar />

            <div className="order-content">

                <h2>Order Details</h2>

                {order && (
                <Card
                    title={`Order ID: ${order.order_id}`}
                    style={{ maxWidth: "600px" }}
                >
                   <p> <b>Date:</b> {order.date} </p> 
                   <hr />
                    {order.items.map((item) => ( 
                        <div key={item.book_id}> 
                        <h3>{item.title}</h3> 
                        <p> <b>Price:</b> 
                        ₹{item.price} </p> 
                        <p> <b>Quantity:</b> {item.quantity} </p>
                         <p> <b>Total:</b> ₹ {Number(item.price) * item.quantity} </p> 
                         <hr/> </div> 
                        ))} 
                        <h3> Total Amount: ₹{order.total} </h3>
                </Card>
                )}

                <br />

                <Button
                    type="primary"
                    onClick={() => navigate("/user/order")}
                >
                    Back
                </Button>

            </div>
        </>
    );
}

export default MyOrderDetails;