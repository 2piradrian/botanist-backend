import { DataTypes } from "sequelize";
import { PostgreDatabase } from "../database";

const database = new PostgreDatabase();
const sequelize = database.getSequelize();

export const PostModel = sequelize.define('Post', {
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
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    likedBy: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    }
},
{
    tableName: 'posts',
});
