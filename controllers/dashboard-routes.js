const router = require("express").Router();
const sequelize = require("../config/connection");
const { Category, Material, Student } = require("../models");

router.get("/", (req, res) => {
  Material.findAll({
    where: {
      student_id: req.session.student_id,
    },
    include: {
      model: Category,
      attributes: ["id", "category_name"],
    },
  })
    .then((dbMaterialData) => {
      const materials = dbMaterialData.map((chkmaterial) =>
        chkmaterial.get({ plain: true })
      );

      res.render("dash", { materials, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
