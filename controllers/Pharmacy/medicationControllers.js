import sql from 'mssql';
import config from '../../model/config.js';

// MEDICATIONS
// get all medications
export const getMedications = async (req, res) => {
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection.request().query('SELECT * FROM Department.Medications');
        res.send(result);
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

// UPDATE MEDICATIONS
export const updateMedications = async (req, res) => {
    let connection;
    try {
        const { medicationName, dosage, usageInstructions } = req.body;
        const { id } = req.params;
        connection = await sql.connect(config.sql);
        const result = await connection.request()
            .input('medicationName', sql.VarChar, medicationName)
            .input('dosage', sql.VarChar, dosage)
            .input('usageInstructions', sql.VarChar, usageInstructions)
            .input('id', sql.Int, id)
            .query(`
                UPDATE Department.Medications 
                SET medicationName = @medicationName, dosage = @dosage, usageInstructions = @usageInstructions  
                WHERE medicationId = @id
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

// CREATE NEW MEDICATION
export const createMedication = async (req, res) => {
    let connection;
    try {
        const { medicationName, dosage, usageInstructions } = req.body;
        connection = await sql.connect(config.sql);
        const result = await connection.request()
            .input('medicationName', sql.VarChar, medicationName)
            .input('dosage', sql.VarChar, dosage)
            .input('usageInstructions', sql.VarChar, usageInstructions)
            .query(`
                INSERT INTO Department.Medications (medicationName, dosage, usageInstructions)
                VALUES (@medicationName, @dosage, @usageInstructions)
            `);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        if (connection) {
            connection.close();
        }
    }
}


// Delete Medication
export const deleteMedication = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await sql.connect(config.sql);
        const result = await connection.request()
            .input('id', sql.Int, id)
            .query(`
                DELETE FROM Department.Medications 
                WHERE medicationId = @id
            `);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        if (connection) {
            connection.close();
        }
    }
}

