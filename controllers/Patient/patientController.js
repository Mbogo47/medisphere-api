import sql from 'mssql';
import config from '../../model/config.js';

// get all patients
export const getPatients = async (req, res) => {
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection.request().query('SELECT * FROM Patients.Patients');
        res.send(result);
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

// get all departments
export const getDepartments = async (req, res) => {
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection.request().query('SELECT *  FROM Department.Departments');
        res.send(result);
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        if (connection) {
            connection.close();
        }
    }
}


// Get count of patients
export const getPatientsCount = async (req, res) => {

    let connection;

    try {
        connection = await sql.connect(config.sql);
        const result = await connection.request().query(`
                SELECT COUNT(*) AS patientsCount FROM Patients.Patients;  `);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        if (connection) {
            connection.close();
        }
    }
}


