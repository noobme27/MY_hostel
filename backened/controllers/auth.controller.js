import bcrypt from "bcrypt";
import prisma from "./../lib/prisma.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    //CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);

    res.status(201).json({ message: "User created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "falied to create a user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate token and send it as a cookie
    const age = 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin, // Assuming you have an isAdmin field in your user schema
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age } // Match cookie maxAge with JWT expiry
    );

    // Exclude password from the user info
    const { password: userPassword, ...userInfo } = user;

    // Set the cookie with the token
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age, // Cookie expires in 7 days
        // secure: true, // Uncomment this in production (when using HTTPS)
      })
      .status(200)
      .json(userInfo); // Send user info back without password
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "logout successful" }); // removes the token from the backened
};
export const makeAdmin = async (req, res) => {
  const { userId } = req.body; // Get the user ID from the request body

  // Verify that the requester is an admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    // Update the user's isAdmin field
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isAdmin: true },
    });

    res
      .status(200)
      .json({ message: "User has been made an admin", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update user role" });
  }
};
