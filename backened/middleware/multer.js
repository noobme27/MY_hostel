import multer from "multer"; // Use `import` instead of `require`
import fs from "fs"; // Use `import` for fs module
import path from "path"; // Use `import` for path module

const uploadDirectory = "uploads/avatars";

// Create directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Use the variable here
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.replace(/[^a-zA-Z0-9.-_]/g, "_");
    cb(null, `${Date.now()}_${filename}`);
  },
});

const upload = multer({ storage });

export default upload; // Use `export default` to export
