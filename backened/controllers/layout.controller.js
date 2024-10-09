// Mock user data (replace with actual data from your DB)
const users = [
  {
    room: 101,
    name: "John Doe",
    instituteId: "12345",
    hobbies: "Reading, Music",
    profilePic: "/images/johndoe.jpg",
    whatsapp: "https://wa.me/123456789",
    instagram: "https://instagram.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  {
    room: 102,
    name: "Jane Smith",
    instituteId: "54321",
    hobbies: "Sports, Coding",
    profilePic: "/images/janesmith.jpg",
    whatsapp: "https://wa.me/987654321",
    instagram: "https://instagram.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
  },
  {
    room: 103,
    name: "Alice Johnson",
    instituteId: "23456",
    hobbies: "Photography, Traveling",
    profilePic: "/images/alicejohnson.jpg",
    whatsapp: "https://wa.me/123456780",
    instagram: "https://instagram.com/alicejohnson",
    linkedin: "https://linkedin.com/in/alicejohnson",
  },
  {
    room: 104,
    name: "Bob Brown",
    instituteId: "65432",
    hobbies: "Gaming, Music",
    profilePic: "/images/bobbrown.jpg",
    whatsapp: "https://wa.me/987654320",
    instagram: "https://instagram.com/bobbrown",
    linkedin: "https://linkedin.com/in/bobbrown",
  },
  {
    room: 105,
    name: "Charlie Davis",
    instituteId: "34567",
    hobbies: "Cooking, Hiking",
    profilePic: "/images/charliedavis.jpg",
    whatsapp: "https://wa.me/123456781",
    instagram: "https://instagram.com/charliedavis",
    linkedin: "https://linkedin.com/in/charliedavis",
  },
  {
    room: 106,
    name: "Diana Green",
    instituteId: "76543",
    hobbies: "Reading, Yoga",
    profilePic: "/images/dianagreen.jpg",
    whatsapp: "https://wa.me/987654322",
    instagram: "https://instagram.com/dianagreen",
    linkedin: "https://linkedin.com/in/dianagreen",
  },
  {
    room: 107,
    name: "Ethan White",
    instituteId: "45678",
    hobbies: "Fitness, Traveling",
    profilePic: "/images/ethanwhite.jpg",
    whatsapp: "https://wa.me/123456782",
    instagram: "https://instagram.com/ethanwhite",
    linkedin: "https://linkedin.com/in/ethanwhite",
  },
  {
    room: 108,
    name: "Fiona Black",
    instituteId: "87654",
    hobbies: "Gardening, Painting",
    profilePic: "/images/fionablack.jpg",
    whatsapp: "https://wa.me/987654323",
    instagram: "https://instagram.com/fionablack",
    linkedin: "https://linkedin.com/in/fionablack",
  },
  {
    room: 109,
    name: "George Hill",
    instituteId: "56789",
    hobbies: "Coding, Reading",
    profilePic: "/images/georgehill.jpg",
    whatsapp: "https://wa.me/123456783",
    instagram: "https://instagram.com/georgehill",
    linkedin: "https://linkedin.com/in/georgehill",
  },
  {
    room: 110,
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
  const rows = 10; // Number of rows
  const cols = 10; // Number of columns
  const layout = Array.from({ length: rows }, () => Array(cols).fill(0)); // Create an empty matrix filled with 0

  // room = 1, hall = "H";
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (row === 0 || row === 3) {
        layout[row][col] = "H";
      } else {
        // Rooms numbered from 101 to 110
        layout[row][col] = 101 + (row - 1) * cols + col; // Room numbers
      }
    }
  }

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
