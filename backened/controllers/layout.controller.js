// Mock user data (replace with actual data from your DB)
const users = [
  {
    room: 1101,
    name: "John Doe",
    instituteId: "12345",
    hobbies: "Reading, Music",
    profilePic: "/images/johndoe.jpg",
    whatsapp: "https://wa.me/123456789",
    instagram: "https://instagram.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  {
    room: 2102,
    name: "Jane Smith",
    instituteId: "54321",
    hobbies: "Sports, Coding",
    profilePic: "/images/janesmith.jpg",
    whatsapp: "https://wa.me/987654321",
    instagram: "https://instagram.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
  },
  {
    room: 2103,
    name: "Alice Johnson",
    instituteId: "23456",
    hobbies: "Photography, Traveling",
    profilePic: "/images/alicejohnson.jpg",
    whatsapp: "https://wa.me/123456780",
    instagram: "https://instagram.com/alicejohnson",
    linkedin: "https://linkedin.com/in/alicejohnson",
  },
  {
    room: 2104,
    name: "Bob Brown",
    instituteId: "65432",
    hobbies: "Gaming, Music",
    profilePic: "/images/bobbrown.jpg",
    whatsapp: "https://wa.me/987654320",
    instagram: "https://instagram.com/bobbrown",
    linkedin: "https://linkedin.com/in/bobbrown",
  },
  {
    room: 2105,
    name: "Charlie Davis",
    instituteId: "34567",
    hobbies: "Cooking, Hiking",
    profilePic: "/images/charliedavis.jpg",
    whatsapp: "https://wa.me/123456781",
    instagram: "https://instagram.com/charliedavis",
    linkedin: "https://linkedin.com/in/charliedavis",
  },
  {
    room: 2106,
    name: "Diana Green",
    instituteId: "76543",
    hobbies: "Reading, Yoga",
    profilePic: "/images/dianagreen.jpg",
    whatsapp: "https://wa.me/987654322",
    instagram: "https://instagram.com/dianagreen",
    linkedin: "https://linkedin.com/in/dianagreen",
  },
  {
    room: 2107,
    name: "Ethan White",
    instituteId: "45678",
    hobbies: "Fitness, Traveling",
    profilePic: "/images/ethanwhite.jpg",
    whatsapp: "https://wa.me/123456782",
    instagram: "https://instagram.com/ethanwhite",
    linkedin: "https://linkedin.com/in/ethanwhite",
  },
  {
    room: 2108,
    name: "Fiona Black",
    instituteId: "87654",
    hobbies: "Gardening, Painting",
    profilePic: "/images/fionablack.jpg",
    whatsapp: "https://wa.me/987654323",
    instagram: "https://instagram.com/fionablack",
    linkedin: "https://linkedin.com/in/fionablack",
  },
  {
    room: 2109,
    name: "George Hill",
    instituteId: "56789",
    hobbies: "Coding, Reading",
    profilePic: "/images/georgehill.jpg",
    whatsapp: "https://wa.me/123456783",
    instagram: "https://instagram.com/georgehill",
    linkedin: "https://linkedin.com/in/georgehill",
  },
  {
    room: 2110,
    name: "Hannah Adams",
    instituteId: "98765",
    hobbies: "Traveling, Drawing",
    profilePic: "/images/hannahadams.jpg",
    whatsapp: "https://wa.me/987654324",
    instagram: "https://instagram.com/hannahadams",
    linkedin: "https://linkedin.com/in/hannahadams",
  },
];

// Function to generate room layout
const generateRoomLayout = () => {
  const rows = 27; // Number of rows
  const cols = 36; // Number of columns
  const layout = Array.from({ length: rows }, () => Array(cols).fill(0)); // Create an empty matrix filled with 0

  // room = 1, hall = "H";
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // top - top
      if (row === 1 && col > 5 && col < 13) {
        layout[row][col] = 2113 + (col - 5) * 2; // 2115 - 2127
      } else if (row === 1 && col > 18 && col < 26) {
        layout[row][col] = 2125 + (col - 17) * 2; // 2129 - 2141
      } else if (row === 1 && col > 25 && col < 28) {
        layout[row][col] = 2124 + (col - 17) * 2; // 2144 - 2142
      } else if (row === 1 && col > 6 && col < 19) {
        layout[row][col] = "T";
      } else if (row === 1 && col > 3 && col < 6) {
        layout[row][col] = "S";
      } else if (row === 2 && col > 1 && col < 34) {
        layout[row][col] = "H";
      }
      // top-bottom
      else if (row === 3 && col > 6 && col < 13) {
        layout[row][col] = 2114 + (col - 6) * 2; // 2116 - 2126
      } else if (row === 3 && col > 19 && col < 26) {
        layout[row][col] = 2128 + (col - 19) * 2; // 2130 - 2140
      }

      // left - left
      else if (col === 1 && row > 3 && row < 9) {
        layout[row][col] = 2116 - row; // 2108-2112
      } else if (col === 1 && row > 9 && row < 17) {
        layout[row][col] = 2117 - row; // 2107-2101
      } else if (col === 2 && row > 1 && row < 21) {
        layout[row][col] = "H";
      }
      // left-right
      else if (col === 3 && row > 3 && row < 9) {
        layout[row][col] = 1192 - row; // 1188-1184
      } else if (col === 3 && row > 9 && row < 15) {
        layout[row][col] = 1193 - row; // 1183-1179
      }
      // bottom -left - top
      else if (row === 17 && col > 1 && col < 33) {
        layout[row][col] = "H";
      } else if (row === 18 && col > 3 && col < 9) {
        layout[row][col] = 1182 - col;
      } else if (row === 18 && col > 9 && col < 16) {
        layout[row][col] = 1183 - col;
      }
      // bottom -left - bottom
      else if (row === 20 && col > 1 && col < 33) {
        layout[row][col] = "H";
      } else if (row === 19 && col > 3 && col < 9) {
        layout[row][col] = 1101 + col - 4;
      } else if (row === 19 && col > 9 && col < 16) {
        layout[row][col] = 1100 + col - 4;
      } else if (row === 19 && col > 15 && col < 19) {
        layout[row][col] = "EN";
      }
      // middle - left
      else if (col === 15 && row > 2 && row < 18) {
        layout[row][col] = "H";
      } else if (col === 16 && row > 3 && row < 10) {
        layout[row][col] = 1156 + row - 4;
      } else if (col === 16 && row > 10 && row < 18) {
        layout[row][col] = 1156 + row - 4;
      }
      // middle - right
      else if (col === 18 && row > 2 && row < 18) {
        layout[row][col] = "H";
      } else if (col === 17 && row > 3 && row < 10) {
        layout[row][col] = 1159 - row;
      } else if (col === 17 && row > 10 && row < 18) {
        layout[row][col] = 1160 - row;
      }
      // bottom -left - bottom
      else if (row === 19 && col > 19 && col < 26) {
        layout[row][col] = 1101 + col - 9;
      } else if (row === 19 && col > 26 && col < 32) {
        layout[row][col] = 1100 + col - 9;
      }
      // bottom -left - top
      else if (row === 18 && col > 19 && col < 26) {
        layout[row][col] = 1163 - col;
      } else if (row === 18 && col > 26 && col < 32) {
        layout[row][col] = 1164 - col;
      }
      // right -left
      else if (col === 33 && row > 2 && row < 21) {
        layout[row][col] = "H";
      } else if (col === 32 && row > 3 && row < 9) {
        layout[row][col] = 1123 + row - 4;
      } else if (col === 32 && row > 9 && row < 15) {
        layout[row][col] = 1122 + row - 4;
      }
      // right -right
      else if (col === 34 && row > 3 && row < 9) {
        layout[row][col] = 2141 + row;
      } else if (col === 34 && row > 9 && row < 15) {
        layout[row][col] = 2140 + row;
      }
      // empty for the rest
      else {
        layout[row][col] = "E";
      }
    }
  }

  // manual entry for rooms
  layout[1][13] = 2128;
  layout[1][2] = 2123;
  layout[1][3] = 2114;
  // manual entry for ammeneties
  layout[9][1] = "W";
  layout[15][3] = "S";
  layout[9][3] = "T";
  layout[10][16] = "T";
  layout[1][28] = "S";
  layout[19][9] = "T";
  layout[18][9] = "W";
  layout[18][9] = "W";
  layout[10][17] = "W";
  layout[18][26] = "W";
  layout[19][26] = "T";
  layout[9][34] = "W";
  layout[9][32] = "T";
  layout[18][16] = "CR";

  return layout;
};

// Function to get room layout and associated users
export const getRoomLayout = (req, res) => {
  try {
    const layout = generateRoomLayout(); // Generate the layout

    // Include user data and associate users with their rooms in the layout
    const response = {
      layout, // Room layout matrix
      users, // User data (you can replace this with DB data fetching)
    };

    res.status(200).json(response); // Send layout and users data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate room layout" });
  }
};
