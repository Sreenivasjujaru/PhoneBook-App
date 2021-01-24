const User= require("../models/user")
const {check, validationResult}=require("express-validator")


//get contactID
exports.getContactById = (req, res, next, id) => {
      User.findById(id).exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "No contact was found in DB"
          });
        }
        req.profile = user;
        next();
      })
    
   }
  //getContactByName
 exports.getContactByName=(req, res, next, contactname)=>{
  User.find({"name":contactname},(err,user)=>{
    if(err||!user){
      return res.status(400).json({
        error: "No name was found in DB"
      });
    } 
    else{
      req.profile=user;
      next();
    }
  })
 }



exports.getContact=(req,res)=>{
    return res.json(req.profile);
}

// ADD CONTACT
exports.addcontact=(req,res)=>{           
    //validators
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            error:errors.array()[0].msg
        });
    }
    
    const user=new User(req.body)           // creating object from User model
    user.save((err,user)=>{                  // saving in database
      if(err){
          return res.status(400).json({
              err:"Contact not saved..please enter valid credentials"
          })
      }
      res.json({
          name: user.name,                           // to store only required in Data base
          phonenumber:user.phonenumber,
          email: user.email,
          id:user._id
      });
    })
}


// UPDATE CONTACT
exports.updateContact=(req,res)=>{
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
          if (err) {
            return res.status(400).json({
              error: "Not able to update"
            });
          }
          
          res.json(user);
        }
      );
}
// DELETE CONTACT
exports.deleteContact = (req, res) => {
  let contact = req.profile;
  contact.remove((err, deletedcontact) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product"
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedcontact
    });
  });
};
//GET ALL CONTACTS 10 PER PAGE
exports.getAllContacts=(req,res)=>{
 
    User.find()
    .limit(10)   // TAKES  10 CONTACT PER PAGE  
    .exec((err,users) => {
        if(err || !users){
            return res.status(400).json({
                error:"NO contacts found"
            });
        }
        res.json(users);
    });
};
//search by Name
exports.getByName=(req,res)=>{
  return res.json(req.profile);
}