import sql from 'mssql';
import config from '../../model/config.js';

// get surgeries count
export const getSurgeriesCount = async (req, res) => {
    
        let connection;
    
        try {
            connection = await sql.connect(config.sql);
            const result = await connection.request().query(`
                    SELECT COUNT(*) AS surgeriesCount FROM Department.Surgeries;  `);
            res.send(result);
        } catch (error) {
            res.status(500).json({ error });
        } finally {
            if (connection) {
                connection.close();
            }
        }
    }