import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import propertyRoute from "./routes/property.router.js";
import availabilityRoute from "./routes/availability.router.js";
import reservationRoute from "./routes/reservation.router.js";
import orderRoute from "./routes/order.router.js";
import paymentRoute from "./routes/payment.router.js";
import customerRoute from "./routes/customer.router.js"; // Nueva ruta

dotenv.config();

const PORT = process.env.PORT || 3500;
const app = express();



// Configurar CORS con las URLs permitidas desde las variables de entorno
const corsUrls = process.env.CORS_URL ? process.env.CORS_URL.split(',') : [];
const corsOptions = {
    origin: corsUrls, // Orígenes permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Permitir cookies
    optionsSuccessStatus: 200, // Código de estado para las respuestas de opciones exitosas
};
app.use(cors(corsOptions)); // Usar CORS con las opciones definidas

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());

app.use("/properties", propertyRoute);
app.use("/availability", availabilityRoute);
app.use("/reservations", reservationRoute);
app.use("/orders", orderRoute);
app.use("/payment", paymentRoute);
app.use("/customer", customerRoute); // Nueva ruta


// console.log(process.env.ANON_KEY);
app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}`);
});

//vercel