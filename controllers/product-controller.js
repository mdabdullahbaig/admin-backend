const Product = require("../models/product");
const HttpError = require("../util/HttpError");
const { productSchema } = require("../util/joiSchema");

const createProduct = async (req, res, next) => {
  try {
    const validateSchema = await productSchema.validateAsync(req.body);
  } catch (err) {
    const error = new HttpError(err.message, 422);
    return next(error);
  }

  const { name, description, sellPrice, buyPrice, maxRetailPrice } = req.body;

  let existingProduct;

  try {
    existingProduct = await Product.findOne({ name });
  } catch (err) {
    const error = new HttpError(
      "Product creation failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingProduct) {
    const error = new HttpError(
      "Product exists already with this name, please login instead.",
      422
    );
    return next(error);
  }

  const createdProduct = new Product({
    name,
    description,
    sellPrice,
    buyPrice,
    maxRetailPrice,
    updatedBy: req.userData.userId,
    createdBy: req.userData.userId,
  });

  try {
    await createdProduct.save();
  } catch (err) {
    const error = new HttpError(
      "Product creation failed, please try again later.",
      500
    );
    return next(error);
  }

  return res
    .status(201)
    .json({ newProduct: createdProduct.toObject({ getters: true }) });
};

const getProducts = async (req, res, next) => {};

const getProductById = async (req, res, next) => {};

const updateProductById = async (req, res, next) => {};

const deleteProductById = async (req, res, next) => {};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.updateProductById = updateProductById;
exports.deleteProductById = deleteProductById;
