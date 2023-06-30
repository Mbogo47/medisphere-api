import sql from 'mssql';
import config from '../../model/config.js';

// PRESCRIPTIONS
// get all prescriptions
export const getPrescriptions = async (req, res) => {
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection
            .request()
            .query(`
       SELECT
  fullName AS patientName,
  FORMAT(a.appointmentDate, 'yyyy-MM-dd') AS appointmentDate,
  d.doctorId,
  CONCAT(d.firstName, ' ', d.lastName) AS doctorName,
  m.medicationName,
  pr.dosage,
  m.usageInstructions,
  pr.prescriptionId
FROM
  Patients.Prescriptions AS pr
  JOIN Patients.Appointments AS a ON pr.appointmentId = a.appointmentId
  JOIN Patients.Patients AS p ON pr.patientId = p.patientId
  JOIN Department.Medications AS m ON pr.medicationId = m.medicationId
  JOIN Employees.Doctors AS d ON a.doctorId = d.doctorId;

      `);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

// add prescription
export const createPrescriptions = async (req, res) => {
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection.request()
            .input('appointmentId', sql.Int, req.body.appointmentId)
            .input('medicationId', sql.Int, req.body.medicationId)
            .query(`INSERT INTO Patients.Prescriptions (appointmentId, medicationId)
VALUES (@appointmentId, @medicationId);`);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// delete prescription
export const deletePrescriptions = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await sql.connect(config.sql);
        const result = await connection.request()
            .input('id', sql.Int, id)
            .query(`DELETE FROM Patients.Prescriptions WHERE prescriptionId = @id;`);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

// update prescription
export const updatePrescriptions = async (req, res) => {
    let connection;
    try {
        const { appointmentId, medicationId } = req.body;
        const { id } = req.params;
        connection = await sql.connect(config.sql);
        const result = await connection.request()
            .input('appointmentId', sql.Int, appointmentId)
            .input('medicationId', sql.Int, medicationId)
            .input('id', sql.Int, id)
            .query(`UPDATE Patients.Prescriptions
SET appointmentId = @appointmentId, medicationId = @medicationId
WHERE prescriptionId = @id;`);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

// Get a specific prescription
export const getPrescription = async (req, res) => {
    let connection;
    try{
        const { id } = req.params;
        connection = await sql.connect(config.sql);
        const result = await connection.request()
            .input('id', sql.Int, id)
            .query(`SELECT * FROM Patients.Prescriptions WHERE prescriptionId = @id;`);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error });

    } finally {
        if (connection) {
            connection.close();
        }
    }
};