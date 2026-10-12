import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button } from "antd";
import axios from "axios";
import AdminTopBar from "../components/admintopbar";

function PurchaseDetails() {

    const { order_id,user_id } = useParams();
    const navigate = useNavigate();

    const [purchase, setPurchase] = useState([]);

    useEffect(() => {

        axios.get(
            `http://localhost:4000/cart/getPurchase/${user_id}/${order_id}`,
            { withCredentials: true }
        )
        .then((response) => {
            setPurchase(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    }, [order_id]);

    const totalAmount = purchase.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    return (
        <>
            <AdminTopBar />

            <div className="purchase-content">

                <h2>Purchase Details</h2>

                {purchase.length > 0 && (

                    <Card
                        title={`Order ID: ${order_id}`}
                        style={{ maxWidth: "600px" }}
                    >

                        <p>
                            <b>Customer:</b> {purchase[0].full_name}
                        </p>

                        <p>
                            <b>Date:</b> {purchase[0].date}
                        </p>

                        <hr />

                        {purchase.map((item) => (

                            <div key={item.book_id}>

                                <p>
                                    <b>Book ID:</b> {item.book_id}
                                </p>

                                <p>
                                    <b>Book:</b> {item.title}
                                </p>

                                <p>
                                    <b>Price:</b> ₹{item.price}
                                </p>

                                <p>
                                    <b>Quantity:</b> {item.quantity}
                                </p>

                                <p>
                                    <b>Total:</b> ₹
                                    {item.price * item.quantity}
                                </p>

                                <hr />

                            </div>

                        ))}

                        <h3>
                            Total Amount: ₹{totalAmount}
                        </h3>

                    </Card>

                )}

                <br />

                <Button
                    type="primary"
                    onClick={() => navigate("/admin/purchases")}
                >
                    Back
                </Button>

            </div>
        </>
    );
}

export default PurchaseDetails;