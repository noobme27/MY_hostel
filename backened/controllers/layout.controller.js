const generateRoomLayout = () => {
  const rows = 50; // Number of rows
  const cols = 50; // Number of columns
  const layout = Array.from({ length: rows }, () => Array(cols).fill(0)); // Create an empty matrix filled with 0

  // room = 1, hall = "H";

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Assign hallways for entire rows
      if (row === 0 || row === 3) {
        layout[row][col] = "H"; // Row 0 and Row 3 are hallways
      } else if (row === 1 || row === 2) {
        layout[row][col] = 1; // Rows 1 and 2 are rooms
      }
      if (col === 0) {
        layout[row][col] = 1;
      }
    }
  }

  return layout;
};

export const getRoomLayout = (req, res) => {
  try {
    const layout = generateRoomLayout();
    res.status(200).json(layout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate room layout" });
  }
};
