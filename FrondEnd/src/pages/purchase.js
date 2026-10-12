import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table,Button } from "antd";
import axios from "axios";
import AdminTopBar from "../components/admintopbar";

function Purchases() {

    const [users, setUsers] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        axios.get(
            "http://localhost:4000/cart/getPurchases",
            { withCredentials: true }
        )
        .then((response) => {
            setUsers(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const columns = [
       
        {
            title: "Order Date",
            dataIndex: "date"
        },
        {
            title: "Full Name",
            dataIndex: "full_name"
        },
         {
                    title: "",
                    key: "action",
                    render: (_, record) => (
                        <Button
                            type="link"
                            onClick={() =>
                                navigate(`/admin/purchase/${record.user_id}/${record.order_id}`)
                            }
                        >
                            View
                        </Button>
                    )
                }
       
        
    ];

    const data = [];
    

    users.forEach((user) => {
    user.order_history.forEach((order) => {
        data.push({
            key: user.id + "-" + order.order_id,
            user_id: user.id,
            order_id: order.order_id,
            date: order.date,
            full_name: user.full_name
        });
    });
});

    

           

    return (
        <div>

            <AdminTopBar />
            <div className="purchase-content">

                 <Table 
                columns={columns}
                dataSource={data}
                pagination={{pageSize:10}}
            />
            </div>

           <div className="purchase-back">
             <Button
            type="primary"
            onClick={() => navigate("/admin")}>
            Back</Button>
           </div>
           

        </div>
    );
}

export default Purchases;