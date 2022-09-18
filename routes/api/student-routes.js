const router = require("express").Router();
const { Student, Material } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const dbStudentData = await Student.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(dbStudentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dbStudentData = await Student.findOne({
      where: {
        id: req.params.id,
      },
    include: [
      {
        model: Material,
        attributes: ["id", "material_name"] 
      }
    ]
    });
    if (!dbStudentData) {
      res.status(404).json({ message: "No student found with this ID!" });
      return;
    }
    res.json(dbStudentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const dbStudentData = await Student.create({
      student_name: req.body.student_name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json(dbStudentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const dbStudentData = await Student.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbStudentData) {
      res
        .status(400)
        .json({
          message:
            "This email is not registed with any student in our database! Please sign up.",
        });
      return;
    }

    const validPassword = dbStudentData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    res.json({ student: dbStudentData, message: "You are now logged in!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const dbStudentData = await Student.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    });
    if (!dbStudentData[0]) {
      res.status(404).json({ message: "No student found with this ID" });
      return;
    }
    res.json(dbStudentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const dbStudentData = await Student.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!dbStudentData) {
      res.status(404).json({ message: "No student found with this ID" });
      return;
    }
    res.json(dbStudentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
