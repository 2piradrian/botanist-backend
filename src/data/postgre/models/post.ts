import { DataTypes, Model } from "sequelize";
import { PostgreDatabase } from "../database";

const database = new PostgreDatabase();
const sequelize = database.getSequelize();

export class PostModel extends Model {}

PostModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    likedBy: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
    },
    authorId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorUsername: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
});