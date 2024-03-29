import React from "react";
import axios from "axios";

export const register = newUser => {

    return axios
        .post('/signup', {
            email: newUser.email,
            username: newUser.username,
            password: newUser.password


        })
        .then(res => {
            console.log("Registere Successfully")
        })
}

export const login = user => {

    return axios
        .post('https://cyduck.cyclic.app/signin', {
            email: user.email,
            password: user.password

        })
        .then(res => {
            console.log(res)
            if (res.data !== false) {
                localStorage.setItem('usertoken', res.data)
                return res.data
            }
            else {
                return false
            }

        })
        .catch(err => {
            console.log(err)
        })


}

export default login