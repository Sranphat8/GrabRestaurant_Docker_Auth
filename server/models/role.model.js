import { DataTypes } from "sequelize";

// Export เป็นฟังก์ชันที่รับ sequelize และ DataTypes
export default (sequelize, DataTypes) => {
  const Role = sequelize.define("role", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Role;
};


// Role.sync({ force: true })
//   .then(() => {
//     Role.create({ id: 1, name: "user" });
//     Role.create({ id: 2, name: "moderator" });
//     Role.create({ id: 3, name: "admin" });
//   })
//   .catch((error) => {
//     console.log("Error creating role", error);
//   });

