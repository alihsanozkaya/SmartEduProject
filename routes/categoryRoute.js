const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.route("/").post(categoryController.createCategory);
router.route("/:slug").put(categoryController.updateCategory);
router.route("/:id").delete(categoryController.deleteCategory);

module.exports = router;
