const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        maxlength: 20,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        maxlength: 20,
        required: true,
        trim: true,

    },
    phone:{
        type: String,
        required: true,
        maxlength: 15,
        trim: true,
    },

});
userSchema.statics.findAndValidate = async function (username,password) {
        const foundUser = await this.findOne({ username });
        if (!foundUser){
            return false;
        }
        const isValid = await bcrypt.compare(password, foundUser.password);
        return isValid ? foundUser : false;
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    next();
})
module.exports = mongoose.model("User", userSchema);