const category = require('../model/category.model');
const {MONGO_CONFIG} = require('../config/config');


async function createCategory(props, callback) {
  const model = new category({
    categoryName: props.categoryName,
    categoryDescription: props.categoryDescription,
    categoryImage: props.categoryImage,
  });
  model.save().then((response) => {
    return callback(null, response);
  }).catch((err) => {
    return callback(err);
  });
}

async function getCategories(props, callback) {
  const pageSize = Math.abs(props.pageSize) || MONGO_CONFIG.pageSize;
  const pageNumber = Math.abs(props.pageNumber) || 1;
  category.find({}).limit(pageSize).skip(pageSize * (pageNumber - 1)).then((response) => {
    return callback(null, response);
  }).catch((err) => {
    return callback(err);
  });
}

async function getCategoryById(props, callback) {
  category.findById(props.categoryId).then((response) => {
    return callback(null, response);
  }).catch((err) => {
    return callback(err);
  });
}


async function getCategoryByName(props, callback) {
  const condition = {
    categoryName: {
      $eq: props.categoryName,
    },
  };
  category.findOne(condition).then((response) => {
    return callback(null, response);
  }).catch((err) => {
    return callback(err);
  });
}


async function updateCategoryByName(props, callback) {
  const condition = {
    categoryName: {
      $eq: props.categoryName,
    },
  };
  const updateDoc = {
    $set: {
      categoryDescription: props.categoryDescription,
      categoryImage: props.categoryImage,
    },
  };
  const options = {
    upsert: false,
  };
  category.updateOne(condition, updateDoc, options).then((response) => {
    return callback(null, response);
  }).catch((err) => {
    return callback(err);
  });
}


async function deleteCategoryById(props, callback) {
  const condition = {
    _id: {
      $eq: props.categoryId,
    },
  };
  category.deleteOne(condition).then((response) => {
    return callback(null, response);
  }).catch((err) => {
    return callback(err);
  });
}


async function deleteCategoryByName(props, callback) {
  const condition = {
    categoryId: {
      $eq: props.categoryName,
    },
  };
  category.deleteOne(condition).then((response) => {
    return callback(null, response);
  }).catch((err) => {
    return callback(err);
  });
}

module.exports = {
  createCategory,
  getCategoryById,
  getCategoryByName,
  getCategories,
  updateCategoryByName,
  deleteCategoryById,
  deleteCategoryByName,
};
