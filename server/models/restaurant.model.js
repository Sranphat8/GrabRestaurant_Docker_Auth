import { DataTypes } from "sequelize";
// Export เป็นฟังก์ชันที่รับ sequelize และ DataTypes 
export default (sequelize, DataTypes) => {
    const Restaurant = sequelize.define("restaurant", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Restaurant;
};