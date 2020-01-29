import {
    Sequelize,
    DataTypes
} from 'sequelize';

export interface FollowingAttributes {
    userId ? : number;
    following ? : number;

}

export interface FollowingInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    userId: number;
    following: number;

}

export = (sequelize: Sequelize, DataTypes: DataTypes) => {
    var Following = sequelize.define('Following', {
        userId: DataTypes.INTEGER,
        following: DataTypes.INTEGER
    });

    Following.associate = function(models) {
        Following.belongsTo(models.User, { 
            foreignKey: 'userId', 
            onDelete: 'CASCADE'
         });
        Following.belongsTo(models.User, {
             foreignKey: 'following', 
             onDelete: 'CASCADE',
             as: 'followingDetails', 
        });
    };
    return Following;
};
