import jwt from "jsonwebtoken";
// function which takes res and userID as params
const generateToken = (res, userId) => {
  // we are using userId as payload and secret is saved in .env file jwt signs it
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // we take res object which was passed and go to cookie property and set a custom cookie named jwt and the token value which was generated as value and max age of 30d
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
