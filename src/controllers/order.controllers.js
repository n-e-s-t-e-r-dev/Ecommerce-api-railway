const CartServices = require("../services/cart.services");
const OrderServices = require("../services/order.services");
const ProductsServices = require("../services/products.services");
const transporter = require("../utils/mailer")

const createOrder = async (req, res, next) => {

    const { id, email, username } = req.user;
    const { user } = req.params;

    if (id != user) {
        return next({
            status: 401,
            message: "user not logged in",
            errorName: "Unauthorized",
        });
    }

    try {
        const result = await CartServices.getCartByUser(user)

        let products = result?.product_in_carts;
        let totalTemp = 0
        let toFilter = []

        products?.forEach(async ({ product_id, quantity, sub_total }) => {
            const { stock, price, id } = await ProductsServices.getOne(product_id)

            if (stock < quantity) {
                const newProduct = {
                    product_id,
                    quantity: stock,
                    sub_total: stock * price
                }
                toFilter.push(newProduct)
                totalTemp = totalTemp + (stock * price)
                await ProductsServices.update({ stock: 0 }, id)
            } else {
                toFilter.push({
                    product_id,
                    quantity,
                    sub_total
                });
                totalTemp += sub_total;
                await ProductsServices.update({ stock: stock - quantity }, id)
            }
        });

        let productsToOrder = []
        setTimeout(async () => {
            productsToOrder = toFilter.filter(item => item.quantity > 0)
            const order = await OrderServices.create({
                total: totalTemp.toFixed(2),
                user_id: user
            })
            productsToOrder?.forEach(async ({ product_id, sub_total, quantity }) => {
                const newProduct = {
                    product_id,
                    order_id: order.id,
                    quantity,
                    sub_total
                }
                await OrderServices.addProduct(newProduct)
            })

            await CartServices.deleteCart(user)
            res.status(201).json({
                success: true,
            });

            await transporter.sendMail({
                from: process.env.MAILER_CONFIG_USER,
                to: email,
                subject: "Confirmacion de Orden en MarketPlace.com",
                html: `
                    <p>Hola ${username} ha registrado una compra.</p>
                    <p>Cantidad de Artículos: ${productsToOrder.length}</p>,
                    <p>Monto: ${totalTemp.toFixed(2)}</p>
                    <a href="paypal.com">Proceder con el pago</a>
                    `
            });


        }, 500)


    } catch (error) {
        next(error)
    }
}

const getOrder = async (req, res, next) => {
    const { id: user_id } = req.user;
    try {
        const result = await OrderServices.getOrderByUser(user_id)
        res.json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createOrder,
    getOrder,
}