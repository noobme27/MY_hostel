import jwt from "jsonwebtoken";
import prisma from "./../lib/prisma.js"; // Adjust the import according to your file structure

export const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.token; // Assuming the token is stored in cookies

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }

    try {
      // Fetch user from the database to check if they are an admin
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Access denied, admin only." });
      }

      // Attach user information to the request object
      req.user = user; // You can attach the entire user object if needed
      next(); // Proceed to the next middleware or route handler
    } catch (dbError) {
      return res
        .status(500)
        .json({ message: "Database error.", error: dbError });
    }
  });
};
