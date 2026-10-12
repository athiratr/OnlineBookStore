
import { Input,message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { searchBooksRequest } from "../redux/books/booksaction";

function SearchBooks({ onSearch }) {

  const dispatch = useDispatch();
   const error = useSelector((state) => state.books.error);
  useEffect(() => {
  if (error) {
    message.warning(error);
  }
}, [error]);

  const handleSearch = (search) => {

    if (!search.trim()) {
      return;
    }
     if (onSearch) {
            onSearch();
      }
  

    dispatch(searchBooksRequest(search));
  };


  return (
    <Input.Search
      className="book-search"
      placeholder="Search by title, author or category"
      allowClear
      style={{ width: 350 }}
      enterButton={<SearchOutlined />}
      onSearch={handleSearch}
    />
  );
}

export default SearchBooks;

