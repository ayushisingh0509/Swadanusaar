
export interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  unit: string;
  category: string;
  inCart?: boolean;
  expiryDate?: string;
  daysUntilExpiry?: number;
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  image: string;
  prepTime: string;
  difficulty: string;
  matchPercentage: number;
  ingredients: Ingredient[];
  videoId?: string;
}

// Mock pantry ingredients with expiry dates
export const pantryIngredients = [
  { id: 1, name: "Basmati Rice", quantity: "2", unit: "kg", category: "Grains", inCart: false },
  { id: 2, name: "Onions", quantity: "1", unit: "kg", category: "Vegetables", inCart: false },
  { id: 3, name: "Tomatoes", quantity: "500", unit: "g", category: "Vegetables", inCart: false, expiryDate: "2025-05-09", daysUntilExpiry: 1 },
  { id: 4, name: "Paneer", quantity: "200", unit: "g", category: "Dairy", inCart: false, expiryDate: "2025-05-10", daysUntilExpiry: 2 },
  { id: 5, name: "Wheat Flour (Atta)", quantity: "1", unit: "kg", category: "Grains", inCart: false },
  { id: 6, name: "Masoor Dal", quantity: "500", unit: "g", category: "Lentils", inCart: false },
  { id: 7, name: "Green Chillies", quantity: "10", unit: "pieces", category: "Spices", inCart: false },
  { id: 8, name: "Coriander Leaves", quantity: "1", unit: "bunch", category: "Herbs", inCart: false, expiryDate: "2025-05-08", daysUntilExpiry: 0 },
  { id: 9, name: "Potatoes", quantity: "1", unit: "kg", category: "Vegetables", inCart: false },
  { id: 10, name: "Garam Masala", quantity: "100", unit: "g", category: "Spices", inCart: false },
  { id: 11, name: "Mango", quantity: "3", unit: "pieces", category: "Fruits", inCart: false, expiryDate: "2025-05-11", daysUntilExpiry: 3 },
  { id: 12, name: "Spinach", quantity: "300", unit: "g", category: "Vegetables", inCart: false, expiryDate: "2025-05-09", daysUntilExpiry: 1 },
  { id: 13, name: "Lemon Pickle", quantity: "200", unit: "g", category: "Pickles", inCart: false, expiryDate: "2025-11-30", daysUntilExpiry: 207 },
  { id: 14, name: "Almonds", quantity: "100", unit: "g", category: "Dry Fruits", inCart: false, expiryDate: "2025-07-15", daysUntilExpiry: 60 },
];

// Mock suggested dishes with YouTube video IDs
export const suggestedDishes: Dish[] = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    description: "A rich and creamy North Indian curry made with paneer cubes in a tomato-based sauce.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: "30 mins",
    difficulty: "Medium",
    matchPercentage: 100,
    videoId: "a7O7pvo6xOk",
    ingredients: [
      { id: 1, name: "Paneer", quantity: "250", unit: "g", category: "Dairy" },
      { id: 2, name: "Onions", quantity: "2", unit: "medium", category: "Vegetables" },
      { id: 3, name: "Tomatoes", quantity: "3", unit: "medium", category: "Vegetables" },
      { id: 4, name: "Ginger-Garlic Paste", quantity: "2", unit: "tsp", category: "Spices" },
      { id: 5, name: "Butter", quantity: "3", unit: "tbsp", category: "Dairy" },
      { id: 6, name: "Garam Masala", quantity: "1", unit: "tsp", category: "Spices" },
      { id: 7, name: "Red Chilli Powder", quantity: "1", unit: "tsp", category: "Spices" },
    ],
  },
  {
    id: 2,
    name: "Masoor Dal Tadka",
    description: "A nutritious and protein-rich lentil dish tempered with cumin, garlic, and spices.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: "45 mins",
    difficulty: "Easy",
    matchPercentage: 90,
    videoId: "cMIjzNzh7Rs",
    ingredients: [
      { id: 8, name: "Masoor Dal", quantity: "1", unit: "cup", category: "Lentils" },
      { id: 9, name: "Onions", quantity: "1", unit: "medium", category: "Vegetables" },
      { id: 10, name: "Tomatoes", quantity: "1", unit: "medium", category: "Vegetables" },
      { id: 11, name: "Cumin Seeds", quantity: "1", unit: "tsp", category: "Spices" },
      { id: 12, name: "Turmeric Powder", quantity: "1/2", unit: "tsp", category: "Spices" },
      { id: 13, name: "Green Chillies", quantity: "2", unit: "pieces", category: "Spices" },
      { id: 14, name: "Coriander Leaves", quantity: "2", unit: "tbsp", category: "Herbs" },
    ],
  },
  {
    id: 3,
    name: "Aloo Paratha",
    description: "Whole wheat flatbread stuffed with spiced mashed potatoes, often served with yogurt or pickle.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: "40 mins",
    difficulty: "Medium",
    matchPercentage: 85,
    videoId: "Pfr8c-VF2_Y",
    ingredients: [
      { id: 15, name: "Wheat Flour (Atta)", quantity: "2", unit: "cups", category: "Grains" },
      { id: 16, name: "Potatoes", quantity: "3", unit: "medium", category: "Vegetables" },
      { id: 17, name: "Green Chillies", quantity: "2", unit: "pieces", category: "Spices" },
      { id: 18, name: "Cumin Seeds", quantity: "1", unit: "tsp", category: "Spices" },
      { id: 19, name: "Garam Masala", quantity: "1/2", unit: "tsp", category: "Spices" },
      { id: 20, name: "Coriander Leaves", quantity: "2", unit: "tbsp", category: "Herbs" },
      { id: 21, name: "Ghee", quantity: "3", unit: "tbsp", category: "Dairy" },
    ],
  },
  {
    id: 4,
    name: "Jeera Rice",
    description: "Fragrant basmati rice cooked with cumin seeds, perfect side dish for any curry.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: "25 mins",
    difficulty: "Easy",
    matchPercentage: 80,
    videoId: "STzxH8G0LcA",
    ingredients: [
      { id: 22, name: "Basmati Rice", quantity: "1", unit: "cup", category: "Grains" },
      { id: 23, name: "Cumin Seeds", quantity: "1", unit: "tsp", category: "Spices" },
      { id: 24, name: "Ghee", quantity: "1", unit: "tbsp", category: "Dairy" },
      { id: 25, name: "Bay Leaf", quantity: "1", unit: "piece", category: "Spices" },
      { id: 26, name: "Green Chillies", quantity: "1", unit: "piece", category: "Spices" },
      { id: 27, name: "Coriander Leaves", quantity: "1", unit: "tbsp", category: "Herbs" },
    ],
  },
  {
    id: 5,
    name: "Palak Paneer",
    description: "A healthy and popular North Indian dish made with pureed spinach and soft paneer cubes.",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: "35 mins",
    difficulty: "Medium",
    matchPercentage: 95,
    videoId: "b5bDtzGqpjQ",
    ingredients: [
      { id: 28, name: "Spinach", quantity: "500", unit: "g", category: "Vegetables" },
      { id: 29, name: "Paneer", quantity: "200", unit: "g", category: "Dairy" },
      { id: 30, name: "Onions", quantity: "1", unit: "medium", category: "Vegetables" },
      { id: 31, name: "Ginger-Garlic Paste", quantity: "1", unit: "tbsp", category: "Spices" },
      { id: 32, name: "Green Chillies", quantity: "2", unit: "pieces", category: "Spices" },
      { id: 33, name: "Garam Masala", quantity: "1/2", unit: "tsp", category: "Spices" },
    ],
  },
];

// AI-generated recipe suggestions for expiring ingredients
export const aiSuggestions = [
  {
    id: 101,
    name: "Tomato-Coriander Soup",
    description: "A quick and healthy soup that uses expiring tomatoes and coriander leaves.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: "20 mins",
    difficulty: "Easy",
    matchPercentage: 100,
    ingredients: [
      { id: 3, name: "Tomatoes", quantity: "4", unit: "medium", category: "Vegetables" },
      { id: 8, name: "Coriander Leaves", quantity: "1", unit: "bunch", category: "Herbs" },
      { id: 2, name: "Onions", quantity: "1", unit: "medium", category: "Vegetables" },
      { id: 7, name: "Green Chillies", quantity: "1", unit: "piece", category: "Spices" },
    ],
  },
  {
    id: 102,
    name: "Mango Paneer Salad",
    description: "A refreshing salad combining expiring mangoes and paneer with a tangy dressing.",
    image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: "15 mins",
    difficulty: "Easy",
    matchPercentage: 100,
    ingredients: [
      { id: 11, name: "Mango", quantity: "2", unit: "medium", category: "Fruits" },
      { id: 4, name: "Paneer", quantity: "100", unit: "g", category: "Dairy" },
      { id: 8, name: "Coriander Leaves", quantity: "2", unit: "tbsp", category: "Herbs" },
      { id: 34, name: "Lemon Juice", quantity: "1", unit: "tbsp", category: "Condiments" },
    ],
  },
  {
    id: 103,
    name: "Spinach Paratha",
    description: "Healthy whole wheat flatbread stuffed with seasoned spinach mixture.",
    image: "https://images.unsplash.com/photo-1604771230675-f0d49f9ae83d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: "30 mins",
    difficulty: "Medium",
    matchPercentage: 95,
    ingredients: [
      { id: 12, name: "Spinach", quantity: "300", unit: "g", category: "Vegetables" },
      { id: 5, name: "Wheat Flour (Atta)", quantity: "2", unit: "cups", category: "Grains" },
      { id: 7, name: "Green Chillies", quantity: "2", unit: "pieces", category: "Spices" },
      { id: 10, name: "Garam Masala", quantity: "1/4", unit: "tsp", category: "Spices" },
    ],
  }
];
