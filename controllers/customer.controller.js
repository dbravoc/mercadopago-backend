import { createCustomer } from '../models/customer.model.js';

export const registerCustomer = async (req, res) => {
    try {
        const data = await createCustomer(req.body);

        // Enviar una respuesta exitosa
        res.status(201).json({ message: 'Cliente registrado con éxito', data });
    } catch (error) {
        console.error('Error al registrar el cliente:', error);
        res.status(500).json({ message: 'Error al registrar el cliente', error: error.message });
    }
};