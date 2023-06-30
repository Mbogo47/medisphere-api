import { getPatientsCount } from "../controllers/Patient/patientController.js";

const patientRoutes = (app) => {
    app.route('/patients/count')
        .get(getPatientsCount);
}

export default patientRoutes;