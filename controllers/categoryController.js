const { Category} = require("../models/Job/JobCategory");
const {validateCategory} = require('../validation')

// @@ GET api/categories
// @@ desc GET all Categories
// @@ access Public
exports.getAllCategories = async(req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
};

// @@ POST api/categories
// @@ desc POST Category
// @@ access Private
exports.postCategory = async(req, res) => {

  const {error} = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    name: req.body.name
  });

  const savedCategory = await category.save();
  return res.status(200).json(savedCategory);

};

// @@ GET api/categories/:id
// @@ desc Get a Category
// @@ access Public
exports.getCategory = async(req, res)=>{
  const category = await Category.findById(req.params.id);
  if(!category) return res.status(404).json('No such category found');

  res.status(200).json(category);
}

// @@ PUT api/categories/:id
// @@ desc Update a Category
// @@ access Prive -TODO
exports.updateCategory = async(req, res)=>{
  //const updatedCategory = await Category.findOneAndUpdate({_id: req.params.id}, {$set:{name: req.body.name}},{new: true});

  const category = await Category.findById(req.params.id);

  if(!category) return res.status(404).json("No such category found!")

  category.name = req.body.name;
  await category.save();

  res.status(200).json(category);
}

// @@ DELETE api/categories/:id
// @@ desc Get a Category
// @@ access Private - TODO
exports.deleteCategory= async(req, res)=>{
    const deletedCategory = await Category.findOneAndDelete({_id: req.params.id});

    if(!deletedCategory) return res.status(404).json("No such category found!")
    
    res.status(200).json(deletedCategory);
}