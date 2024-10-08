const generateRoomLayout = () => {
  return [
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    ["H", 0, "H", 0, "H", 0, "H", 0, "H", 0, "H", 0, "H", 0, "H"],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  ];
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
