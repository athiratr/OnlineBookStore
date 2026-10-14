
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/users/usersaction";
import { getBooksRequest } from "../redux/books/booksaction";

import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  Button,
  Row,
  Col,
  Typography,
  Space,
  message,
  Popconfirm
} from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";

import AdminTopBar from "./admintopbar";
import SearchBooks from "../pages/SearchBooks";


function Admin() {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Get books from Redux
  const books = useSelector((state) => state.books.books);

  // Get book error from Redux
  const error = useSelector((state) => state.books.error);


  // To know whether we are showing search results
  const [isSearching, setIsSearching] = useState(false);


  // Show warning when search/API fails
  useEffect(() => {

    if (error) {
      message.warning(error);
    }

  }, [error]);


  // Get all books when Admin page opens
  useEffect(() => {
     console.log("ADMIN PAGE LOADED");

    dispatch(getBooksRequest());

  }, [dispatch]);


  // Logout
  const handleLogout = () => {

    dispatch(logout());

    navigate("/login");

  };


  // Delete book
  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:4000/books/deletebooks/${id}`,{
          withCredentials:true
        }

      )
      

      message.success("Book deleted successfully");

      // Get updated books
      dispatch(getBooksRequest());

    } catch (error) {
      console.error("Error deleting book:", error);
      message.warning("Unable to delete book");

    }
  };


  return (

    <div className="admin-page">
      <AdminTopBar />
      <Card variant="borderless" className="adminpage">
      <div className="adminactions">
      {isSearching ? (
              <Button
              type="primary"
              icon={<ArrowLeftOutlined />}
              onClick={() => {
                  dispatch(getBooksRequest());
                  setIsSearching(false);
                }}
            >Back
            </Button>) : 
            (
            <>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/admin/addBooks")}
            >
              Add New Book
            </Button>
             <Button
              type="primary"
              onClick={() => navigate("/admin/purchases")}
            >
              Purchases
            </Button></>

          )}


          <SearchBooks
            onSearch={() => setIsSearching(true)}
          />

          </div>

        <Typography.Title level={3}>

          Available Books

        </Typography.Title>


        <Row gutter={[20, 20]}>


          {/* No search results */}

          {books.length === 0 && isSearching ? (

            <Col span={24}>

              <Typography.Text type="warning">

                No books available

              </Typography.Text>

            </Col>

          ) : (


            /* Display books */

            books.map((book) => (

              <Col
                xs={24}
                sm={12}
                md={8}
                lg={6}
                key={book.id}
              >

                <Card

                  className={book.stock < 5 ? "low-stock" : "book-card"}

                  hoverable

                  cover={

                    <div className="book-image-container">

                      <img
                        className="book-image"
                        src={`http://localhost:4000${book.image}`}
                        alt={book.title}
                      />

                    </div>

                  }

                >


                  <Typography.Title
                    level={4}
                    className="book-title"
                  >
                    {book.title}
                  </Typography.Title>


                  <Typography.Text type="secondary">

                    By {book.author}

                  </Typography.Text>


                  <div className="price">

                    ₹{book.price}

                  </div>


                  <span className="category">

                    {book.category}

                  </span>


                  <div className="stock">

                     {book.stock>0?(<>Stock:{book.stock}</>): (
                    <span style={{ color: "red", fontWeight: "bold" ,fontSize:"20px"}}>
                   Out of Stock
                    </span>)}

                  </div>


                  <Space className="actions">


                    {/* Edit */}

                    <Button
                      type="primary"
                      icon={<EditOutlined />}

                      onClick={() => {

                        navigate(
                          `/admin/EditBooks/${book.id}`
                        );

                      }}
                    >
                      Edit
                    </Button>


                    {/* Delete */}

                    <Popconfirm

                      title="Delete this book?"

                      description="Are you sure you want to delete this book?"

                      onConfirm={() =>
                        handleDelete(book.id)
                      }

                      okText="Yes"

                      cancelText="No"

                    >

                      <Button
                        danger
                        icon={<DeleteOutlined />}
                      >
                        Delete
                      </Button>

                    </Popconfirm>


                  </Space>


                </Card>

              </Col>

            ))

          )}

        </Row>


      </Card>

    </div>

  );
}


export default Admin;

