
import { Input, Button, Card, Row, Col, Select,message} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import "../App.css"
import axios from "axios";

function Signup() {

  const navigate = useNavigate();

  const [signup, setSignup] = useState({
    full_name: "",
    username: "",
    password: "",
    phone: "",
    gender: "",
    email: ""
  });

  function handleChange(e) {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value
    });
  }

  function handleGenderChange(value) {
    setSignup({
      ...signup,
      gender: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try { 
      const response = await axios.post( "http://localhost:4000/users/addusers", signup ); 
      console.log(response.data); 
      message.success("Account created successfully"); 
      navigate("/"); 
    } 
      catch (error) { 
        console.log(error); 
        message.error( error.response?.data || "Unable to create account" ); 
      }
  }

  return (
    <div className="signup">

      

      <Card
        title="Create Account"
        className="signup-card"
      >

        <form onSubmit={handleSubmit}>

          <Row gutter={[0, 14]}>

            <Col span={24}>
              <Input
                name="full_name"
                placeholder="Full Name"
                size="large"
                value={signup.full_name}
                onChange={handleChange}
              />
            </Col>

            <Col span={24}>
              <Input
                name="username"
                placeholder="Username"
                size="large"
                value={signup.username}
                onChange={handleChange}
              />
            </Col>

            <Col span={24}>
              <Input.Password
                name="password"
                placeholder="Password"
                size="large"
                value={signup.password}
                onChange={handleChange}
              />
            </Col>

            <Col span={24}>
              <Input
                name="phone"
                placeholder="Phone Number"
                size="large"
                value={signup.phone}
                onChange={handleChange}
              />
            </Col>

            <Col span={24}>
              <Select
                placeholder="Select Gender"
                size="large"
                style={{ width: "100%" }}
                value={signup.gender || undefined}
                onChange={handleGenderChange}
                options={[
                  {
                    value: "Male",
                    label: "Male"
                  },
                  {
                    value: "Female",
                    label: "Female"
                  },
                  {
                    value: "Other",
                    label: "Other"
                  }
                ]}
              />
            </Col>

            <Col span={24}>
              <Input
                name="email"
                placeholder="Email"
                size="large"
                value={signup.email}
                onChange={handleChange}
              />
            </Col>

            <Col span={24}>
              <Button
                type="primary"
                block
                size="large"
                htmlType="submit"
              >
                Sign Up
              </Button>
            </Col>

          </Row>

        </form>

        <p>
          Already have an account?

          <Link to="/">
            <Button type="link">
              Login Here
            </Button>
          </Link>
        </p>

      </Card>

    </div>
  );
}

export default Signup;

