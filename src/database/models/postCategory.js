const { DataTypes} = require('sequelize');
const atributtes = {
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    foreingKey: true,
    references: {
      model: 'Category',
      key: 'id',
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    foreingKey: true,
    references: {
      model: 'BlogPosts',
      key: 'id',
    },
  },
};

module.exports = (sequelize) => {
  const model = sequelize.define('PostCategory',  atributtes, {
    tableName: 'PostCategories',
    timestamps: false
  });
  model.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: model,
      foreingKey: 'categoryId',
      otherKey: 'postId',
      as: 'blogPosts',
    })
    models.BlogPost.belongsToMany(models.Category, {
      through: model,
      foreingKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
    })
}
  return model;
};