import { Preference } from "mercadopago";
import client from "../config/preference.js";

const createPayment = async (title, quantity, unit_price) => {
  const preference = new Preference(client);
  const body = {
    items: [
      {
        title,
        quantity: Number(quantity),
        unit_price: Number(unit_price),
        currency_id: "CLP",
      },
    ],
    back_urls: {
      success: "https://www.reddit.com/",
      failure: "https://www.youtube.com/",
      pending: "https://github.com/jcorp11",
    },
    auto_return: "approved",
  };
  try {
    const result = await preference.create({
      body,
    });

    console.log(result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error creating payment:", error);
    return { success: false, error };
  }
};

export const paymentModel = {
  createPayment,
};
