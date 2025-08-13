import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./db.js";
import UserModel from "./user.model.js";
import RoleModel from "./role.model.js";
import RestaurantModel from "./restaurant.model.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load all models
db.User = UserModel(sequelize, DataTypes);
db.Role = RoleModel(sequelize, DataTypes);
db.Restaurant = RestaurantModel(sequelize, DataTypes);

// กำหนดความสัมพันธ์
db.User.belongsToMany(db.Role, {
    through: "user_roles",
    foreignKey: "username",
    otherKey: "roleId"
});
db.Role.belongsToMany(db.User, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "username"
});

// เรียกใช้ sync() ที่นี่เพื่อสร้างตารางทั้งหมด
db.sequelize.sync({ force: true }).then(() => {
    console.log("Database & tables synced!");

    // สร้าง roles เริ่มต้นถ้ายังไม่มี
    db.Role.findOrCreate({ where: { name: "user" }, defaults: { name: "user" } });
    db.Role.findOrCreate({ where: { name: "moderator" }, defaults: { name: "moderator" } });
    db.Role.findOrCreate({ where: { name: "admin" }, defaults: { name: "admin" } });
    console.log("Initial roles created or found.");
}).catch(err => {
    console.error("Failed to sync database:", err);
});

export default db;