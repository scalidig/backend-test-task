module.exports = (sequelize, DataTypes) => {

    const Book = sequelize.define("book", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: true,
        paranoid: true
    })

    return Book
}