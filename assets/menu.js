// Structure:
// title 
// description 
// image? 
// category (individual piece, hand roll, 6 piece, 8 piece, etc)
// raw / cooked?

export default function Menu() { 
  return ([ 
    { title: "Tuna",
      description: "This is Tuna Nigiri",
      category: "Nigiri (1 pc)"
    },
    { title: "Spicy Crab",
      description: "This is a Spicy Crab hand roll",
      category: "Hand Roll (1 pc)"
    },
    { title: "California Roll",
      description: "This is a California Roll",
      category: "Makimono (6 pcs)",
    },
    { title: "Philadelphia Roll",
      description: "This is a Philadelphia Roll",
      category: "Makimono (6 pcs)",
    },
    { title: "Salmon",
      description: "This is Salmon sashimi",
      category: "Sashimi",
    },
    { title: "Red Sox Maki",
      description: "Cooked salmon, avocado, cream cheese topped with spicy crab salad, tobiko, and eel sauce",
      category: "House Specials (8 pc)"
    },
  ])
}

// export default function Menu() { 
//   return ([
//     { category: "Nigiri (1 pc)",
//       items: [
//         { title: "Tuna",
//           description: "This is Tuna Nigiri",
//         },
//       ]  
//     },
//     { category: "Hand Roll (1 pc)",
//       items: [ 
//         { title: "Spicy Crab",
//           description: "This is a Spicy Crab hand roll",
//         },
//       ]
//     },
//     { category: "Makimono (6 pcs)",
//       items: [ 
//         { title: "California Roll",
//           description: "This is a California Roll",
//         },
//         { title: "Philadelphia Roll",
//           description: "This is a Philadelphia Roll",
//         },
//       ]
//     },
//     { category: "Sashimi (1 pc)",
//       items: [ 
//         { title: "Salmon",
//           description: "This is Salmon sashimi",
//         },
//       ]
//     },
//     { category: "House Specials (8 pcs)",
//       items: [ 
//         { title: "Red Sox Maki",
//           description: "Cooked salmon, avocado, cream cheese topped with spicy crab salad, tobiko, and eel sauce",
//         },
//       ]
//     },
//   ])
// }