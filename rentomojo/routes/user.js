const express = require("express");
const router = express.Router();
const {check, validationResult}=require("express-validator");

const {                                              //getting from controllers
    addcontact,
    getContactById,
     getContact,
     updateContact,
     getAllContacts,
     deleteContact,
     getContactByName,
     getByName
       } = require("../controllers/user");



//PARAMETER
router.param("contactId",getContactById);
router.param("contactName",getContactByName);

//add contact
router.post("/addcontact",[
    check("name").isLength({min:3}).withMessage("please enter morethan 3 characters"),
    check("phonenumber").isLength({min:10}).withMessage("please enter valid phonenumber"),
    check("email").isEmail().withMessage("please enter valid email")
],  addcontact)

//get Contact
router.get("/getcontact/:contactId",getContact)

//update contact
router.put("/update/:contactId",updateContact)

//getAllContatcs
router.get("/allContacts",getAllContacts);

//DeleteContact
router.delete("/deleteContact/:contactId",deleteContact)

//searchContact
router.get("/search/:contactName",getByName)
module.exports=router;