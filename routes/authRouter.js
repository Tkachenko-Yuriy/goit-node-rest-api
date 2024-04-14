import express from "express";
import { signup, signin, getCurrent, logout } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userSigninSchema, userSignupSchema } from "../schemas/userSchema.js";
import authenticate from "../middlewares/authenticate.js"

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSignupSchema), signup);

authRouter.post("/login", validateBody(userSigninSchema), signin);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout)

export default authRouter;
