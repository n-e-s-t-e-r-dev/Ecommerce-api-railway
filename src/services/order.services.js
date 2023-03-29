const Order = require("../models/order.models");
const ProductInOrder = require("../models/productInOrder.models");

class OrderServices {
    static async create(data) {
        try {
            return await Order.create(data)
        } catch (error) {
            throw error;
        }
    }

    static async addProduct(data) {
        try {
            return await ProductInOrder.create(data)
        } catch (error) {
            throw error;
        }
    }

    static async getOrderByUser(user_id) {
        try {
            return await Order.findAll({
                where: { user_id },
                attributes: {
                    exclude: ["user_id"]
                },
                include: {
                    model: ProductInOrder,
                    attributes: {
                        exclude: ["order_id"]
                    }
                }
            })
        } catch (error) {
            throw error;
        }
    }

}
module.exports = OrderServices;