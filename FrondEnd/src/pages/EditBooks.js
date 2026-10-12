
import { Card, Input, Button, Row, Col ,Space} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
import { logout } from "../redux/users/usersaction";
import { useState,useEffect } from "react";
import axios from "axios";
import AdminTopBar from "../components/admintopbar";

function EditBooks() {
  const username = useSelector((state) => state.username);

  const dispatch = useDispatch();
  const navigate = useNavigate();
   const { id } = useParams();
  useEffect(() => {
  fetchBook();
}, [username]);

  console.log("ID :"+ id)
  const [book, setBook] = useState({
    id:id,
    title: "",
    author: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });
const fetchBook = async () => {
  try {
    const response = await axios.get(
      `http://localhost:4000/books/searchbooks/${id}`,
      {
        withCredentials:true
      }
    );

    setBook(response.data);

  } catch (error) {
    console.log(error);
    alert("Unable to fetch book");
  }
};
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

  const EditBooks = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/books/updatebooks/${id}`,book,
       {
          withCredentials:true
        })
       

      alert(response.data);

      navigate("/admin");

    } catch (err) {
      console.log(err);
       console.log("UPDATE ERROR:", err);
   
      alert("Unable to update book");
    }
  };

  return (
    <>
  <AdminTopBar/>
     
  <div className="Editbookpage">

  <Card title="Edit The Book Here" className="editbookcard">

  <Row gutter={[0, 15]}>

    <Col span={24}>
    <label>Title</label>
      <Input
        placeholder="Title"
        name="title"
        value={book.title}
        onChange={handleChange}
      />
    </Col>

    <Col span={24}>
      <label>Author</label>
      <Input
        placeholder="Author"
        name="author"
        value={book.author}
        onChange={handleChange}
      />
    </Col>

    <Col span={24}>
      <label>Price</label>
      <Input
        placeholder="Price"
        name="price"
        value={book.price}
        onChange={handleChange}
      />
    </Col>

    <Col span={24}>
      <label>Category</label>
      <Input
        placeholder="Category"
        name="category"
        value={book.category}
        onChange={handleChange}
      />
    </Col>

    <Col span={24}>
      <label>Stock</label>
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
         
       <Button type="primary" onClick={()=>navigate("/admin")}>
      Back
      </Button>
      <Button type="primary" onClick={EditBooks}>
        Edit Book
      </Button>
      </Space>
     
    </Col>

  </Row>

</Card>
      </div>
    </>
  );
}

export default EditBooks;
