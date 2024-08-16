// SDK de Mercado Pago
import { MercadoPagoConfig } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();
// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_DAVID_ACCESS_TOKEN,
});

export default client;
