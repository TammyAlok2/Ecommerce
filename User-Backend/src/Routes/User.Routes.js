
import express, { Router } from 'express'
import {  signIn, signUp, userInfo,logout, forgotPassward, resetPassward, updatePassward, updateUser } from '../Controllers/User.Contorllers.js'
import { isLoggedIn } from '../Middlewares/auth.Middlewares.js'
import { upload } from '../Middlewares/Multer.Middlewares.js'

const router = Router()

router.route('/signUp').post(
    upload.fields(
        [{name:"avatar",maxCount:1}])
    ,signUp)

router.route('/signIn').post(signIn)

router.route('/user').get(isLoggedIn,userInfo)

router.route('/logout').get(isLoggedIn,logout);

router.route('/reset').post(forgotPassward)

router.route('/reset/:resetToken').post(resetPassward)

router.route('/update-passward').post( isLoggedIn,updatePassward)

router.route('/update').put(isLoggedIn , upload.fields([{name:"avatar",maxCount:1}]) ,updateUser)

export default router 