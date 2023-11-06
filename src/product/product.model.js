const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Title is required."],
	},
	description: {
		type: String,
		required: [true, "Description is required."],
	},
	price: {
		type: Number,
		required: [true, "Price is required."],
	},
	product_img: {
		type: String,
		required: [true, "Product Image is required."],
	},
	category: {
		type: String,
		enum: ['smartwatch','laptop','mobile','footwear','cloth','bottle'],
		required: [true, "Category is required."],
	},
}, { timestamps: true });

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;