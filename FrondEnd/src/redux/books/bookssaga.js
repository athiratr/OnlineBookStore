
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  GET_BOOKS_REQUEST,
  getBooksSuccess,
  getBooksFailure,
  SEARCH_BOOKS_REQUEST,
   searchBooksSuccess,
    searchBooksFailure
} from "./booksaction";


function* getBooks() {

  try {
    console.log("GET BOOKS SAGA RUNNING")
    const response = yield call(
      axios.get,
      "http://localhost:4000/books/getallbooks",
      {
        withCredentials:true
      }
    );

    yield put(getBooksSuccess(response.data));

  } catch (error) {

    yield put(
      getBooksFailure(error.message)
    );

  }
}
function* searchBooks(action) { 
    try { 
        const search = action.payload; 
        const response = yield call( axios.get, `http://localhost:4000/books/searchanybooks?search=${encodeURIComponent(search)}`,
        {
          withCredentials:true
        } ); 
        yield put( searchBooksSuccess(response.data) ); 
    } 
    catch (error) 
    { 
        yield put( searchBooksFailure("No Books Found!") );
     } 
}


function* bookSaga() {

  yield takeLatest(GET_BOOKS_REQUEST, getBooks);
  yield takeLatest(SEARCH_BOOKS_REQUEST,searchBooks);


}


export default bookSaga;







