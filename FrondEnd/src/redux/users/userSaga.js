import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { LOGIN_REQUEST,SESSION_REQUEST,sessionSuccess, loginSuccess,loginFailure } from "./usersaction";


function* loginUser(action) {

    try {

        const response = yield call(
            axios.post,
            "http://localhost:4000/users/login",
            action.payload,
            {
                withCredentials:true
            }
        );

        yield put(
            loginSuccess(
                response.data.username,
                response.data.category,
                response.data.full_name
            )
        );

    } catch (error) {

        //console.log(error)
         yield put(
        loginFailure(error.response?.data || "Login failed")
        )

    }
}




function* checkSession() {

    try {


    console.log("CHECK SESSION SAGA RUNNING");
        const response = yield call(
            axios.get,
            "http://localhost:4000/users/session",
            {
                withCredentials: true
            }
        );

        yield put(
            sessionSuccess(
                response.data.username,
                response.data.category,
                response.data.full_name
            )
        );

    } catch (error) {

        console.log("No active session");

    }
}
function* userSaga() {

    yield takeLatest(
        LOGIN_REQUEST,
        loginUser
    );
     yield takeLatest(
        SESSION_REQUEST,
        checkSession
    );

}


export default userSaga;