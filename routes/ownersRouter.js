const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-models");

router.get("/", function(req, res){
    res.send("hey it's working");
});

// if(process.env === "development"){
//     console.log("hey");
// }

if(process.env.NODE_ENV === "development"){   // before this step open console and run this command $env:NODE_ENV="development" to set node environment as developemnt.
    router.post("/create", async function(req, res){
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res.
            status(503).
            send("You dont have permission to create a new owner.");
        };

        let {fullname, email, password} = req.body;

        let createdwner = await ownerModel.create({
            fullname,
            email,
            password,
            
        });
        res.status(201).send(createdwner);
       
    });
}

router.get("/admin", function(req, res){
    let success = req.flash("success");
    res.render("createproducts", {success});
});


module.exports = router;