import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import jsonwebtoken from 'jsonwebtoken';
import config from "./model/config.js";
import authRouters from "./routes/authRouters.js";
import doctorRoutes from "./routes/doctorRouters.js";
import patientRoutes from "./routes/patientRouter.js";
import pharmacyRoutes from "./routes/pharmacyRouters.js";
import surgeryRoutes from "./routes/surgeryRouters.js";

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting up cors
app.use(cors({
    credentials: true,
    origin: "https://witty-mushroom-00bffa30f.3.azurestaticapps.net"
}));

// jwt setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        console.log(req.user);
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], `${process.env.JWT_SECRET}`, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

// Routes
doctorRoutes(app);
pharmacyRoutes(app);
// labRoutes(app);
patientRoutes(app);
surgeryRoutes(app);
authRouters(app);

app.get("/", (req, res) => {
    res.send("Welcome to medisphere");
});

app.listen(config.port, () => {
    console.log(`Server running at ${config.url}`);
});
