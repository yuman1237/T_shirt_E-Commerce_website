
const express= require("express");
const router = express.Router();
const{isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const{getProductById,createProduct,getProduct, photo,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories} = require("../controllers/product")
const {getUserById, getUser} = require("../controllers/user")


router.param("userId",getUserById);

router.param("productId",getProductById)

//create routes
//all of actual routes
 router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)

 //read routes
 router.get("/product/:productId",getProduct)   
 router.get("/product/photo/:productId",photo);
 
 //delete routes
 router.delete("product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)



//updateRoute
router.put("product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)


//listing route
router.get("/products",getAllProducts)
router.get("/products/categories",getAllUniqueCategories)


module.exports =router;