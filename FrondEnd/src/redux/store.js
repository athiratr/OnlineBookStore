
import { createStore, applyMiddleware ,combineReducers} from "redux";
import createSagaMiddleware from "redux-saga";
import userSaga from "./users/userSaga";
import userReducer from "./users/userreducer";
import bookReducer from "./books/booksreducer"; 
import bookSaga from "./books/bookssaga"; 
const rootReducer = combineReducers(
    { user: userReducer, 
     books: bookReducer });
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(userSaga);
sagaMiddleware.run(bookSaga);


export default store;