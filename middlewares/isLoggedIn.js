const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function(req, res, next){
    if(!req.cookies.token){
        req.flash("error", "you need to login first");
        return res.redirect("/");
}

try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = userModel.findOne({email: decoded.email}).select("-password");
    req.user = user;  // request mai user naam ki field create kri or usme user ka data send kr diya.
    next();
} catch (error) {
    req.flash("error", "Something went wrong");
        return res.redirect("/");
}
};