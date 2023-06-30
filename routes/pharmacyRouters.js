import { createMedication, deleteMedication, getMedications, updateMedications } from "../controllers/Pharmacy/medicationControllers.js";
import { createPrescriptions, deletePrescriptions, getPrescription, getPrescriptions, updatePrescriptions } from "../controllers/Pharmacy/presControllers.js";
import { loginRequired } from "../controllers/Auth/authControllers.js";
const pharmacyRoutes = (app) => {
    // PHARMACY
    // Prescription
    app.route('/pres')
        .post(createPrescriptions)
        .get(getPrescriptions)
    app.route('/pres/:id')
        .put(updatePrescriptions)
        .delete(deletePrescriptions)
        .get(getPrescription)
        .put(getPrescription);

    // Medication
    app.route('/medications')
        .post(createMedication)
        .get(getMedications)
    app.route('/medications/:id')
        .put(updateMedications)
        .delete(deleteMedication);
};

export default pharmacyRoutes;