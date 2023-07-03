import { changePassword, getUser, loginDoctor, loginUser, registerDoctor, registerUser } from "../controllers/Auth/authControllers.js"

const authRouters = (app) => {
    app.route('/auth/login')
        .post(loginUser)
    app.route('/auth/register')
        .post(registerUser)
    app.route('/changePassword')
        .post(changePassword)
    app.route('/auth/registerDoctor')
        .post(registerDoctor)
    app.route('/auth/loginDoctor')
        .post(loginDoctor)

    app.route('/getUser/:email')
        .get(getUser)
}

export default authRouters