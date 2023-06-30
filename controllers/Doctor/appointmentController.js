import sql from 'mssql';
import config from '../../model/config.js';

// get all appointments 

export const getAppointments = async (req, res) => {

    let connection;

    try {
        connection = await sql.connect(config.sql);
        const result = await connection.request().query(`
               SELECT
               A.appointmentId,
   fullName AS patientName,
  FORMAT(A.appointmentDate, 'yyyy-MM-dd') AS appointmentDate,
  A.appointmentTime,
  
  A.status,
 D.doctorId,
 CONCAT(D.firstName, ' ', D.lastName) AS doctorName
FROM
  Patients.Appointments A
  JOIN Patients.Patients P ON A.patientId = P.patientId
  JOIN Employees.Doctors D ON A.doctorId = D.doctorId;  `);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

// get count of appointments 
export const getAppointmentsCount = async (req, res) => {

    let connection;

    try {
        connection = await sql.connect(config.sql);
        const result = await connection.request().query(`
            SELECT COUNT(*) AS appointmentsCount FROM Patients.Appointments;  `);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        if (connection) {
            connection.close();
        }
    }
}

// create a new appointment
export const createAppointment = async (req, res) => {
        let connection;
    
        try {
            connection = await sql.connect(config.sql);
            const result = await connection.request()
                .input('patientId', sql.Int, req.body.patientId)
                .input('doctorId', sql.Int, req.body.doctorId)
                .input('appointmentDate', sql.Date, req.body.appointmentDate)
                .input('appointmentTime', sql.VarChar, req.body.appointmentTime)
                .input('status', sql.VarChar, req.body.status)
                .query(`
                INSERT INTO Patients.Appointments (patientId, doctorId, appointmentDate, appointmentTime, status)
                VALUES (@patientId, @doctorId, @appointmentDate, @appointmentTime, @status);  `);
            res.send(result);
        } catch (error) {
            res.status(500).json({ error });
        } finally {
            if (connection) {
                connection.close();
            }
        }
    
    }
