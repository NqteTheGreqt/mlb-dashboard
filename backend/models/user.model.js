const mongoose = require('mongoose')

const Schema = mongoose.Schema

const hittersSchema = new Schema({ id: String, name: String})
const pitchersSchema = new Schema({ id: String, name: String })

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }, hitters: Array,
    pitchers: Array
}, {
    timestamps: true, 
})

const User = mongoose.model('User', userSchema)

module.exports = User