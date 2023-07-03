import { getPatients, getPatientsCount } from "../controllers/Patient/patientController.js";

const patientRoutes = (app) => {
    app.route('/patients/count')
        .get(getPatientsCount);

    app.route('/patients')
        .get(getPatients)
}

export default patientRoutes;