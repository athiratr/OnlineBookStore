import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table ,Button, Pagination} from "antd";
import axios from "axios";
import UserTopBar from "../components/usertopbar";

function MyOrders() {

    const [orders, setOrders] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {

        axios.get(
            "http://localhost:4000/cart/getMyOrders",
            { withCredentials: true }
        )
        .then((response) => {
            setOrders(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    }, []);

    const columns = [
       
        {
            title: "Order Id",
            dataIndex: "order_id",
            key: "title"
        },
       
        {
            title: "Date",
            dataIndex: "date",
            key: "date"
        },
         {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button
                    type="link"
                    onClick={() =>
                        navigate(`/user/order/${record.order_id}`)
                    }
                >
                    View
                </Button>
            )
        }
    ];

    return (
        <>
            <UserTopBar/>
            <div className="order-content">
            <h2>My Orders</h2>

            <Table
                columns={columns}
                dataSource={orders}
                rowKey={(record) =>
                    record.order_id + "-" + record.title}
                Pagination={{pageSize:10}}
                
            />
            <div className="purchase-back">
                 <Button type="primary"
                onClick={()=>navigate("/user")}>
                Back</Button>
            </div>
           
        </div>
        </>
    );
}

export default MyOrders;