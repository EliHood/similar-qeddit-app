import {
    DataTypes,
    Sequelize
} from 'sequelize';

export interface CommentAttributes {
    comment_body ? : string;
    postId?: number;
    userId?: number;
}

export interface CommentInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    comment_body: string;
    postId: number;
    userId: number;
}

export = (sequelize: Sequelize, DataTypes: DataTypes) => {
    let Comment = sequelize.define('Comments', {
        comment_body: {
            allowNull: true,
            type:DataTypes.STRING
        },
        gifUrl:{
            allowNull: true,
            type: Sequelize.STRING
        },
        userId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER
    });

    Comment.associate = function(models) {
        Comment.belongsTo(models.User, {
            as: "author",
            foreignKey: "userId",
            onDelete: "CASCADE"
          });
        Comment.belongsTo(models.Post, {
            foreignKey: "postId",
            timestamps: false,
            onDelete: "CASCADE",
            targetKey: "id"
        });   
    };

    return Comment;
};
