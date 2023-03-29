const CartServices = require("../services/cart.services");
const ProductsServices = require("../services/products.services");



const addToCart = async (req, res, next) => {
    try {
        const { id: user_id } = req.user
        const { product_id, quantity } = req.body;
        const { stock, price } = await ProductsServices.getOne(product_id);
        const sub_total = price * quantity;

        const data = {
            user_id,
            total: sub_total
        }

        const addNewProduct = async (id) => {
            await CartServices.addProduct({
                cart_id: id,
                product_id,
                quantity,
                sub_total
            })
        }
     
        const cart = await CartServices.getByUser(user_id)

        if (!cart) {
            //se comprueba stock
            const quantityToAdd = quantity
            if (stock < quantityToAdd) {
 
                return next({
                    status: 406,
                    message: "Not acceptable",
                    errorName: "stock no disponible",
                });
            }

            const newCart = await CartServices.add(data)

        
            const { id } = newCart

            addNewProduct(id)

        
            return res.status(201).json({
                success: true
            });
        }

        const { id: cart_id, total } = cart;
 
        const findProduct = await CartServices.getProductInCart(cart_id, product_id)

        if (!findProduct) {
            const quantityToAdd = quantity
            if (stock < quantityToAdd) {
                return next({
                    status: 406,
                    message: "Not acceptable",
                    errorName: "stock no disponible",
                });
            }

            await CartServices.updateCart(cart_id, { total: total + sub_total })

            //agrega el producto
            addNewProduct(cart_id)
            return res.status(201).json({
                success: true
            });
        }


        const { quantity: addQuantity, sub_total: addSubTotal, id: idProductExist } = findProduct;


        const quantityToAdd = quantity + addQuantity
        if (stock < quantityToAdd) {
            return next({
                status: 406,
                message: "Not acceptable",
                errorName: "stock no disponible",
            });
        }

        await CartServices.updateCart(cart_id, { total: total + sub_total })

        await CartServices.updateProductInCart(idProductExist, {
            quantity: addQuantity + quantity,
            sub_total: addSubTotal + sub_total,
        })

        res.status(201).json({
            success: true
        });
    } catch (error) {
        next(error)
    }
}

const getCart = async (req, res, next) => {
    const { id: user_id } = req.user;
    try {
        const result = await CartServices.getCartByUser(user_id)
        res.json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addToCart,
    getCart
}