import { paymentModel } from "../models/payment.model.js";

const createPayment = async (req, res) => {
  const { title, quantity, unit_price } = req.body;
  try {
    const payment = await paymentModel.createPayment(
      title,
      quantity,
      unit_price
    );
    return res.status(200).json(payment);
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const paymentController = {
  createPayment,
};
