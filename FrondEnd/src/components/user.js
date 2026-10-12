import React, { Component } from "react";
import { Card, Row, Col, Button,Drawer, message, Space,Badge,Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import axios from "axios";
import SearchBooks from "../pages/SearchBooks";
import { getBooksRequest } from "../redux/books/booksaction";
import UserTopBar from "./usertopbar";
import { useNavigate } from "react-router-dom";

class User extends Component {
    state={
        cart:[],
        cartOpen:false,
        isSearching: false
    }

    componentDidMount() {

        this.props.getBooksRequest();
        this.viewCart(false)

    }
    addToCart = async (bookId) => {

        try {

            const response = await axios.post(
                "http://localhost:4000/cart/add",
                {
                    book_id: bookId
                },
                {
                    withCredentials: true
                }
            );
            await this.viewCart(false);


            console.log(response.data);

        } catch (error) {

            console.log(error);

        }

    };
    viewCart = async (open=true) => {
    try {

        const response = await axios.get(
            "http://localhost:4000/cart",
            {
                withCredentials: true
            }
        );

        this.setState({
            cart: response.data,
            cartOpen: open
        });

    } catch (error) {
        console.log(error);
    }
};
    checkout = async () => {
    try {

        const response = await axios.post(
            "http://localhost:4000/cart/checkOut",
            {},
            {
                withCredentials: true
            }
        );

        console.log(response.data);

        this.setState({
            cart: [],
            cartOpen: false
        });
         this.props.getBooksRequest();

        message.success("Books Purchased Successfully")

    } catch (error) {

        console.log(error.response);

    }
};

handleDelete = async (book_id) => {
    try {
        console.log("Deleting book:", book_id);

        await axios.delete(
            `http://localhost:4000/cart/${book_id}`,
            {
                withCredentials: true
            }
        );

        await this.viewCart();

    } catch (error) {
        console.log("Delete error:", error.response);
    }
};

    render() {

        const { books } = this.props;

        return (
            <div className="user-page">

                <UserTopBar />
            <div className="user-actions">
            {this.state.isSearching && (
                <Button
                type="primary"
                onClick={() => {
                this.props.getBooksRequest();
                this.setState({ isSearching: false });
            }}
        >
            Back
        </Button>
    )}

    <SearchBooks onSearch={() => this.setState({ isSearching: true })} />
    <Space>
        <Button
        type="primary"
        onClick={() => this.props.navigate('/user/order')}
    >
        My Orders
    </Button>

    <Badge
    count={this.state.cart.reduce(
        (total, item) => total + item.quantity,
        0
    )}
    showZero
>
    <Button
        type="primary"
        icon={<ShoppingCartOutlined style={{ fontSize: "28px" }} />}
        onClick={() => this.viewCart(true)}
    />
    </Badge>
    </Space>
    

</div>
 <div className="user-content">

    <h1>Available Books</h1>
        <Row gutter={[20, 20]}>
            {books.length === 0 && this.state.isSearching ? (
                <Col span={24}>
                    <Typography.Text type="warning">
                        <p>No books available</p>
                    </Typography.Text>
                 </Col>) :(
                            books.map((book) => (
                            <Col
                                xs={24}
                                sm={12}
                                md={8}
                                lg={6}
                                key={book.id}
                            >
                            <Card
                                    hoverable
                                    cover={
                                        <img
                                            src={`http://localhost:4000${book.image}`}
                                            alt={book.title}
                                            style={{
                                                height: "220px",
                                                objectFit: "cover"
                                            }}
                                        />
                                    }
                                >
                                <h3>{book.title}</h3>

                                    <p>
                                        Author: {book.author}
                                    </p>

                                    <p>
                                        Category: {book.category}
                                    </p>

                                    <p>
                                        Price: ₹{book.price}
                                    </p>

                                    <p>
                                        Stock: {book.stock}
                                    </p>

                                    <Button type="primary"
                                             onClick={() => this.addToCart(book.id)}>
                                        Add to Cart
                                    </Button>

                                </Card>

                            </Col>

                        ))
                    )}
                    </Row>

                </div>
        <Drawer
        title="My Cart"
        placement="right"
        onClose={() => this.setState({ cartOpen: false })}
        open={this.state.cartOpen}>
            {this.state.cart.map((item) => (
            <Card key={item.id} style={{ marginBottom: "15px" }}>
                <h3>{item.title}</h3>
                <p>Author: {item.author}</p>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ₹{item.price * item.quantity}</p>
                <Button type="primary" onClick={()=>this.handleDelete(item.book_id)}>❌</Button>
                <hr />
            </Card>))}
    <h2> Total Amount: ₹
        {this.state.cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,0)}
    </h2>
    <Button
        type="primary"
        block
        onClick={this.checkout}
    >
        Checkout
    </Button>
    </Drawer>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        books: state.books.books
    };
};

const ConnectedUser = connect(
    mapStateToProps,
    { getBooksRequest }
)(User);

function UserWithNavigation() {
    const navigate = useNavigate();
    return <ConnectedUser navigate={navigate} />;
}

export default UserWithNavigation;