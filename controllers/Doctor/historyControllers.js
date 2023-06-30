import sql from 'mssql';
import config from '../../model/config.js';

// get all medical history of all patients
export const getMedicalHistory = async (req, res) => {
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection.request().query(`SELECT
	mr.recordId,
	p.patientId,
    fullName AS patientName,
    mr.diagnosis,
    d.doctorId,
    CONCAT(d.firstName, ' ', d.lastName) AS doctorName
FROM
    Patients.Patients p
    JOIN Patients.MedicalRecords mr ON p.patientId = mr.patientId
    JOIN Employees.Doctors d ON mr.doctorId = d.doctorId;

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

export const getDoctors = async (req, res) => {
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection.request().query(`SELECT * FROM Employees.Doctors`);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        if (connection) {
            connection.close();
        }
    }
}