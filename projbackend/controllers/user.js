const User =require("../models/user");
const Order=require("../models/order");

exports.getUserById =(req,res,next,id)=>{
    User.findById(id).exec((err, user) =>{
        if(err || !user){

            return res.status(400).json({
                error:"no user was found in DB"
            })
        }
            req.profile =user;
            next();

        
    })
}

exports.getUser =(req,res)=>{

    req.profile.salt= undefined;
    req.profile.encry_password= undefined;

    return res.json(req.profile);
};

exports.updateUser= (req,res)=>
{
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {
        $set:req.body
        },
        {new: true ,useFindAndModify: false},
        
    
    (err,user) => {
     if(err){
         return res.status(400).json({
             error:"You are not authorized to update this user"
         })
     }       

     user.salt= undefined;
     user.encry_password= undefined;
     res.json(user)
    }
    )
};
exports.userPurchaseList=(res,req)=>{

    Order.find({user: req.profile._id})

    //popluate see docs
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){

            return res.status(400).json({
                error:"no order in this account"
            })
        }
        return res.json(order);
    })
};

exports.pushOrderInPurchaseList = (req,res,next) =>{

    let puchases=[] //we are having an empty array
    req.body.order.products.forEach(product=>{

        purchases.push({
            _id:product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount:req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
   
       }) ;
        
    //store this in DB(storing the above information into the mongo_database)

    User.findOneAndUpdate(
        {_id: req.profile._id,},
        {$push:{purchases:purchases}},
        (err,purchases) => {
            if(err){
                return res.status(400).json({
                    error:"Unable to save purchase list"
                })
            }
            next();
        }
    )

    
};