import db from "../models/index.js";
const User = db.User;
const Role = db.Role;
import bcrypt from "bcryptjs";// เข้ารหัสผ่าน
import jwt from "jsonwebtoken";// สร้าง token
//import { Op } from "sequelize"; // สำหรับการค้นหาข้อมูลในฐานข้อมูลที่มีเงื่อนไขหลายอย่าง
import { Op } from "sequelize";

const authController = {};

authController.signup = async (req, res) => {
    const { username, name, email, password } = req.body;
    // & คือ And  // || คือ Or
    if (!username || !name || !email || !password) {
        res.status(400).json({
            message: "Please provide all required fields: username, name, email, and password"
        });
        return;

    }

    // SELECT * FROM Users WHERE username = username
    await User.findOne({ where: { username } }).select(-password).then((user) => {
        if (user) {
            res.status(400).json({ message: "Username is already exists" });
            return;
        }

        const newUser = {
            username,
            name,
            email,
            password,
        };

        User.create(newUser)
            .then((user) => {
                if (req.body.roles) {
                    //SELECT * FROM Roles WHERE name = role1 OR name=role2
                    Role.findAll({
                        where: {
                            name: { [Op.or]: req.body.roles }
                        }
                    }).then((roles) => {
                        user.setRoles(roles).then(() => {
                            res.send({ message: "User registered successfully!" });
                        });
                    });
                } else {
                    // ถ้าไม่มี role ให้กำหนดเป็น user
                    user.setRoles([1]).then(() => {
                        res.send({ message: "User registered successfully!" });
                    });
                }

            }).catch((error) => {
                res.status(500).json({ message: error.message || "Something went wrong while creating the user" });
            });
    });

};

export default authController;

