import { orderModel } from "../models/order.model.js";

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();
    if (!orders.success) {
      return res.status(500).json({ message: "Error fetching orders", orders });
    }

    if (orders.data.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getOneOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.getOneOrder(id);
    if (!order.success) {
      return res.status(500).json({ message: "Error fetching order" });
    }
    if (order.data.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.deleteOrder(id);
    if (!order.success) {
      return res.status(404).json({ message: "Order not found" });
    }
    const msg = "Order deleted successfully";
    return res.status(200).json({ message: msg, order });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ message: error.message });
  }
};

const createOrderWithReserveId = async (req, res) => {
  try {
    const { reserveId } = req.body;
    const order = await orderModel.createOrderWithReserveId(reserveId);
    if (!order.success) {
      return res.status(404).json({ message: "Error in creating order" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const result = await orderModel.updateOrderStatus(id, estado);

    if (!result.success) {
      return res
        .status(500)
        .json({ message: result.error.message || "Error updating order" });
    }

    if (result.data.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const msg = "Order updated successfully";
    return res.status(200).json({ message: msg, order: result.data });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const orderController = {
  getAllOrders,
  getOneOrder,
  deleteOrder,
  createOrderWithReserveId,
  updateOrderStatus,
};
