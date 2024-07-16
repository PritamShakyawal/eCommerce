const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function(req, res){
    let error = req.flash("error");
    res.render("index", {error, isLoggedIn: false});
    // res.render("index");
});

router.get("/shop", isLoggedIn, async function(req, res){
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", {products, success});
});

router.get("/cart", isLoggedIn, async function(req, res){
   
    let user = await userModel.findOne({ user: req.user.email}).populate("cart");
    // console.log(user);
    // console.log(user.cart);
    // res.render("cart", {user});
    const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount)
    // const bill = 20;
    res.render("cart", {user, bill});
    // res.render("cart", {user});
    // console.log(user.cart);

    // if (!user || !user.cart || user.cart.length === 0) {
    //     return res.render("cart", { user, bill: 0 }); // Handle the case where cart is empty or null
    // }
    // // const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
    // res.render("cart", { user, bill });
});

// router.get("/cart", isLoggedIn, async function(req, res) {
//     try {
//         let user = await userModel.findOne({ email: req.user.email }).populate("cart");
//         // let bill = 0;
//         const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
//         console.log("product ", cart);
//         if (user && user.cart && user.cart.length > 0) {
//             bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
//         }
//         res.render("cart", { user, bill });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//     }
// });



router.get("/addtocart/:productid", isLoggedIn, async function(req, res){
    let user = await userModel.findOne({ user: req.user.email});
    // console.log(user);
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
});

router.get("/logout", isLoggedIn, function(req, res){
    // res.render("shop");
    res.redirect("/");
});

module.exports = router;