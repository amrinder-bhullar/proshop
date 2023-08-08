import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

//@desc Auth user/set token
//@route POST /api/users/auth
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

//@desc Register new user/set token
//@route POST /api/users/
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(401);
    throw new Error(`User already exists`);
  }

  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

//@desc logout user/destroy token
//@route POST /api/users/logout
//@access Private JWT
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

//@desc sends the user profile data
//@route GET /api/users/profile
//@access Private JWT
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

//@desc updates user info and password
//@route GET /api/users/profile
//@access Private JWT
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

//@desc Get user by Id
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User does not exist" });
  }
});

//@desc update user
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.Admin = Boolean(req.body.isAdmin) || user.isAdmin;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc delete user
//@route delete /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  // const userDeleted = await User.findByIdAndDelete(userId);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete an Admin user");
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User Deleted successfully" });
  } else {
    res.status(404).json({ message: "User does not exist" });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
