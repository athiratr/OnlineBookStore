
import {
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE,
  SEARCH_BOOKS_SUCCESS,
  SEARCH_BOOKS_FAILURE
} from "./booksaction";

const initialState = {
  books: [],
  error: ""
};

function bookReducer(state = initialState, action) {

  switch (action.type) {

    case GET_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
        error: ""
      };

    case GET_BOOKS_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case SEARCH_BOOKS_SUCCESS: 
    return { 
        ...state, 
        books: action.payload, 
        error: "" 
    }; 
    case SEARCH_BOOKS_FAILURE: 
    return { 
        ...state, 
        error: action.payload 
    };

    default:
      return state;
  }
}

export default bookReducer;

