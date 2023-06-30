import { getSurgeriesCount } from "../controllers/Surgeries/surgeryControllers.js";

const surgeryRoutes = (app) => {
    app.route('/surgeries/count')
        .get(getSurgeriesCount);
}

export default surgeryRoutes;