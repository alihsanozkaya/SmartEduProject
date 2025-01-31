const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    await Category.create(req.body);
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({slug: req.params.slug});
    category.name = req.body.name;
    category.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
    console.log(error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);     
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};