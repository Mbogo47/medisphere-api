import { getAppointments, getAppointmentsCount } from "../controllers/Doctor/appointmentController.js";
import { getDoctors, getMedicalHistory } from "../controllers/Doctor/historyControllers.js";
import { getDepartments, getPatients } from "../controllers/Patient/patientController.js";

const doctorRoutes = (app) => {
    app.route('/patients')
        .get(getPatients);
    app.route('/departments')
        .get(getDepartments);

    // DOCTOR
    // Medical History
    app.route('/history')
        .get(getMedicalHistory);

    app.route('/doctors')
        .get(getDoctors);

    // Appointments
    app.route('/appointments')
        .get(getAppointments)
    app.route('/appointments/count')
        .get(getAppointmentsCount);
};

export default doctorRoutes;