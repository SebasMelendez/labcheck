const router = require('express').Router();
const sequelize = require('../config/connection')
const { Category, Material } = require('../models')

router.get("/", (req, res) => {
  Material.findAll({
    attributes: ["id", "material_name", "available", "student_id"],
    include: [
      {
        model: Category,
        attributes: ["category_name", "id"],
      },
    ],
  })
    .then((dbMaterialData) => {
      const materials = dbMaterialData.map(material => material.get({ plain: true }))
      console.log(materials)
      res.render('homepage',{ materials })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/register', (req, res) => {
    res.render('register');
  });

router.get('/login', (req, res) => {
    res.render('login');
  });

router.get('/product', (req, res) => {
    res.render('product');
  });


module.exports = router;