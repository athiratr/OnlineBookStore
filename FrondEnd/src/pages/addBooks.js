
import { Card, Input, Button, Row, Col,Space ,message} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/users/usersaction";
import { useState } from "react";
import axios from "axios";
import AdminTopBar from "../components/admintopbar";

function AddBooks() {
 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });
  const handleBack = () => {
    navigate("/admin");
  };

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setBook({
      ...book,
      image: "/images/" + e.target.files[0].name,
    });
  };

  const AddBooks = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/books/addbooks",
        book,
        {
          withCredentials:true
        }
        
      );

      alert(response.data);

      navigate("/admin");

    } catch (err) {
      console.log(err);
      message.error( err.response?.data || "Unable to add book" );
    }
  };

  return (
    <>
      <AdminTopBar />
      {/* ADD BOOK PAGE */}
      <div className="addbookpage">

        <Card title="Add New Book" className="addbookcard">

  <Row gutter={[0, 15]}>

    <Col span={24}>
      <Input
        placeholder="Title"
        name="title"
        value={book.title}
        onChange={handleChange}
      />
    </Col>

    <Col span={24}>
      <Input
        placeholder="Author"
        name="author"
        value={book.author}
        onChange={handleChange}
      />
    </Col>

    <Col span={24}>
      <Input
        placeholder="Price"
        name="price"
        value={book.price}
        onChange={handleChange}
      />
    </Col>

    <Col span={24}>
      <Input
        placeholder="Category"
        name="category"
        value={book.category}
        onChange={handleChange}
      />
    </Col>

    <Col span={24}>
      <Input
        placeholder="Stock"
        name="stock"
        value={book.stock}
        onChange={handleChange}
      />
    </Col>

    <Col span={24}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />
    </Col>

    <Col span={24}>
      <Space size={300}>
         <Button type="primary" onClick={()=>navigate('/admin')}>
        Back
      </Button>
      <Button type="primary" onClick={AddBooks}>
        Add Book
      </Button>
      </Space>
     
    </Col>

  </Row>

</Card>
      </div>
    </>
  );
}

export default AddBooks;
