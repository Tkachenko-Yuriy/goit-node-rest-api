import express from "express";
import { signup, signin, getCurrent, logout, updateAvatar, verify, resendVerify } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import {userEmailSchema, userSigninSchema, userSignupSchema } from "../schemas/userSchema.js";
import authenticate from "../middlewares/authenticate.js"
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSignupSchema), signup);

authRouter.post("/login", validateBody(userSigninSchema), signin);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout)

authRouter.patch("/avatars", upload.single("avatar"), authenticate, updateAvatar)

authRouter.get("/verify/:verificationToken", verify);

authRouter.post("/verify", validateBody(userEmailSchema), resendVerify)

export default authRouter;
