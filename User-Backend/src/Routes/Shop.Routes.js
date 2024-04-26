import {Router } from 'express'
import {authorizeRoles, isLoggedIn} from '../Middlewares/auth.Middlewares.js'
import {upload} from '../Middlewares/Multer.Middlewares.js';
import { addProductToShopById, addShop, commentProduct, deleteProductByShopId, getAllShop, getAllShopByAdminId, getProductsByShopId, removeShop, replyComment, updateShop } from '../Controllers/Shop.Controllers.js';
const router = Router ();

 
router.route ('/')
.get (getAllShop)
.post (
  isLoggedIn,
  authorizeRoles("ADMIN"),
  upload.fields ([{name: 'thumbnail', maxCount: 1}]),
  addShop
);

router
.route ('/:id')
.get (isLoggedIn,getProductsByShopId )
.post (isLoggedIn,  authorizeRoles("ADMIN"), upload.fields ([{name: 'thumbnails', maxCount: 5}]), addProductToShopById)
.put (isLoggedIn, authorizeRoles('ADMIN'), updateShop)
.delete (isLoggedIn,  authorizeRoles('ADMIN') ,removeShop);

router.route('/:shopId/:productId')
.post(isLoggedIn,commentProduct)
.delete(isLoggedIn,authorizeRoles("ADMIN"),deleteProductByShopId)


router.route('/:shopId/:productId/:commentId')
.post(isLoggedIn,replyComment)


router.route('/admin/:createdBy')
.get(isLoggedIn,authorizeRoles("ADMIN"),getAllShopByAdminId)



  export default router