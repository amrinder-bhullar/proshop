import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  //Read jwt from cookie because we have cookie-parser middleware
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("not authorized, no token");
  }
});

//Admin middleware

const checkAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new Error("not authorized, needs to be admin");
  }
};

export { protect, checkAdmin };
