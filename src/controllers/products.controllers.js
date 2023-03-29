const ProductsServices = require("../services/products.services");


const getAllProducts = async (req, res, next) => {

    const url = "localhost:8000/api/v1/products";

    try {
        const { offset, limit } = req.query;
        const posts = await ProductsServices.getAll(offset, limit);
        const { count, rows } = posts;


        const newOffset = (isNext) => {
            if (isNext) return Number(offset) + Number(limit);
            return Number(offset) - Number(limit);
        };

        const nextPage = newOffset(true) >= count ? null : `${url}?offset=${newOffset(true)}&limit=${limit}`;

        const previousPage = Number(offset) > 0 ? `${url}?offset=${newOffset(false)}&limit=${limit}` : null;

        const response = {
            count,
            next: nextPage,
            previous: previousPage,
            posts: rows,
        };

        res.json(!limit && !offset ? response.posts : response);

    } catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { name, description, price, stock, user_id } = req.body
        if (id != user_id) {
            return next({
                status: 401,
                message: "Unauthorized",
                errorName: "user not logged in",
            });
        }
        const newData = {
            name,
            description,
            price: +price,
            stock: +stock,
            user_id: +user_id,
            product_image: req.file?.path
        }
        // await ProductsServices.create(newData);
        res.status(201).json({
            success: true
        });

    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { id_product } = req.params;
        const { user_id } = await ProductsServices.getOne(id_product)

        if (user_id != req.user.id) {
            return next({
                status: 401,
                message: "User not logged in. Process with login",
                errorName: "Unauthorized",
            });
        }

        await ProductsServices.update(req.body, id_product);
        res.status(204).send({
            success: true
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
};