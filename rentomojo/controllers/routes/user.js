const express = require("express");
const {check, validationResult}=require("express-validator");

const { 
    addcontact,
    getContactById,
     getContact,
     updateContact,
     getAllContacts,
     deleteContact,
      getContactByEmail,
       getContactemail } = require("../controllers/user");

const router = express.Router();

router.param("contactId",getContactById);
router.param("contactEmail",getContactByEmail);

//add contact
router.post("/addcontact",[
    check("name").isLength({min:3}).withMessage("please enter morethan 3 characters"),
    check("phonenumber").isLength({min:10}).withMessage("please enter valid phonenumber"),
    check("email").isEmail().withMessage("please enter valid email")
],  addcontact)

//get Contact
router.get("/:contactId",getContact)

//update contact
router.put("/:contactId",updateContact)

//getAllContatcs
router.get("/allContacts",getAllContacts);

//DeleteContact
router.delete("/:contactId/deleteContact",deleteContact)

//searchContact
router.get("/:contactEmail/search",getContactemail)
module.exports=router;