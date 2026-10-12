
export const GET_BOOKS_REQUEST = "GET_BOOKS_REQUEST";
export const GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS";
export const GET_BOOKS_FAILURE = "GET_BOOKS_FAILURE";
export const SEARCH_BOOKS_REQUEST = "SEARCH_BOOKS_REQUEST"; 
export const SEARCH_BOOKS_SUCCESS = "SEARCH_BOOKS_SUCCESS"; 
export const SEARCH_BOOKS_FAILURE = "SEARCH_BOOKS_FAILURE";

export const getBooksRequest = () => {
  return {
    type: GET_BOOKS_REQUEST
  };
};


export const getBooksSuccess = (books) => {
  return {
    type: GET_BOOKS_SUCCESS,
    payload: books
  };
};


export const getBooksFailure = (error) => {
  return {
    type: GET_BOOKS_FAILURE,
    payload: error
  };
};

export const searchBooksRequest = (search) => { 
    return { 
        type: SEARCH_BOOKS_REQUEST, 
        payload: search 
    }; 
}; 
export const searchBooksSuccess = (books) => { 
    return { 
        type: SEARCH_BOOKS_SUCCESS, 
        payload: books 
    }; 
}; 
export const searchBooksFailure = (error) => { 
    return { 
        type: SEARCH_BOOKS_FAILURE, 
        payload: error 
    }; 
};

