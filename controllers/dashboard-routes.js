const router = require("express").Router();
const sequelize = require("../config/connection");
const { Category, Material, Student } = require("../models");