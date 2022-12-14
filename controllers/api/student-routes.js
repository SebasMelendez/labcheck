const router = require("express").Router();
const withAuth = require("../../utils/auth");
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
      attributes: { exclude: ["password"] },
      where: {
        id: req.session.id,
      },
      include: [
        {
          model: Material,
          attributes: ["id", "material_name"],
        },
      ],
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
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.student_id = dbStudentData.id;
      req.session.student_name = dbStudentData.student_name;
      req.session.loggedIn = true;
      res.json(dbStudentData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", (req, res) => {
  Student.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbStudentData) => {
    if (!dbStudentData) {
      res.status(400).json({ message: "No student with that email address!" });
      return;
    }

    const validPassword = dbStudentData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.student_id = dbStudentData.id;
      req.session.student_name = dbStudentData.student_name;
      req.session.loggedIn = true;

      res.json({ student: dbStudentData, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
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

router.delete("/:id", withAuth, async (req, res) => {
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
