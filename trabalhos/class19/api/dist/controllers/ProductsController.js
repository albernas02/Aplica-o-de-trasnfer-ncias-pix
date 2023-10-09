"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const Product_1 = require("../models/Product");
class ProductsController {
    async list(req, res) {
        let products = await Product_1.Product.find();
        return res.status(200).json(products);
    }
    async find(req, res) {
        let id = Number(req.params.id);
        let product = await Product_1.Product.findOneBy({ id: id });
        if (!product) {
            return res.status(422).json({ error: "product not found" });
        }
        return res.status(200).json(product);
    }
    async create(req, res) {
        let payload = req.body;
        let product = await Product_1.Product.create({
            name: payload.name,
            description: payload.description,
            price: payload.price,
            type: payload.type,
        }).save();
        return res.status(200).json(product);
    }
    async edit(req, res) {
        let payload = req.body;
        let id = Number(req.params.id);
        let product = await Product_1.Product.findOneBy({ id });
        if (!product) {
            return res.status(422).json({ error: 'Usuário não encontrado' });
        }
        product.name = payload.name;
        product.description = payload.description;
        product.price = payload.price;
        product.type = payload.type;
        return res.status(200).json(product);
    }
    async delete(req, res) {
        let id = Number(req.params.id);
        let product = await Product_1.Product.findOneBy({ id });
        if (!product) {
            return res.status(422).json({ error: 'Usuário não encontrado' });
        }
        product.remove();
        return res.status(200).json();
    }
}
exports.ProductsController = ProductsController;
