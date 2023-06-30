import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sql from 'mssql';
import config from '../../model/config.js';

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

export const registerUser = async (req, res) => {
    const { fullName, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection
            .request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Patients.Patients WHERE email = @email');
        const existingUser = result.recordset[0]
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        } else {
            await connection.request()
                .input('fullName', sql.NVarChar, fullName)
                .input('password', sql.NVarChar, hashedPassword)
                .input('email', sql.NVarChar, email)
                .query(
                    `INSERT INTO Patients.Patients (fullName, password, email, dateofBirth )
         VALUES (@fullName, @password, @email, @dateOfBirth)`
                );
        }
        res.send("user created successfully");
    } catch (error) {
        res.status(500).json({ error });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

export const registerDoctor = async (req, res) => {
    const { firstName, lastName, email, password, contactNumber, specialization } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection
            .request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Employees.Doctors WHERE email = @email');
        const existingUser = result.recordset[0]
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        } else {
            await connection.request()
                .input('firstName', sql.NVarChar, firstName)
                .input('lastName', sql.NVarChar, lastName)
                .input('email', sql.NVarChar, email)
                .input('password', sql.NVarChar, hashedPassword)
                .input('contactNumber', sql.NVarChar, contactNumber)
                .input('specialization', sql.NVarChar, specialization)
                .query(`INSERT INTO Employees.Doctors (firstName, lastName, email, password, contactNumber, specialization)
            VALUES (@firstName, @lastName, @email,
            @password, @contactNumber, @specialization);`);
        }
        res.send("user created successfully");
    } catch (error) {
        res.status(500).json({ error });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

export const changePassword = async (req, res) => {
    const { email, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    let connection;
    try {
        connection = await sql.connect(config.sql);
        await connection
            .request()
            .input('email', sql.NVarChar, email)
            .query(`UPDATE Employees.Doctors SET password = @hashedPassword WHERE email = @email`);
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection
            .request()
            .query(`SELECT * FROM Employees.Doctors WHERE email = '${email}'`);
        const user = result.recordset[0];
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Invalid credentials" });
            } else {
                const token = `JWT ${jwt.sign(
                    { username: user.fullName, email: user.email },
                    config.jwt_secret
                )}`;
                res.status(200).json({
                    email: user.email,
                    username: user.fullName,
                    id: user.id,
                    token: token,
                });
            }
        }
        console.log(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

export const loginDoctor = async (req, res) => {
    const { email, password } = req.body;
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection
            .request()
            .query(`SELECT * FROM Employees.Doctors WHERE email = '${email}'`);
        const user = result.recordset[0];
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Invalid credentials" });
            } else {
                const token = `JWT ${jwt.sign(
                    { username: user.fullName, email: user.email },
                    config.jwt_secret
                )}`;
                res.status(200).json({
                    email: user.email,
                    username: user.fullName,
                    id: user.id,
                    token: token,
                });
            }
        }
        console.log(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

export const getUser = async (req, res) => {
    const { email } = req.params;
    let connection;

    try {
        connection = await sql.connect(config.sql);
        const result = await connection
            .request()
            .input('email', sql.NVarChar, email)
            .query(`SELECT firstName, lastName, specialization, password, email FROM Employees.Doctors WHERE email = @email`);

        const user = result.recordset[0];
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(user);
        }
        console.log(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

