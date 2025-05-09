import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DishCard from "@/components/DishCard";
import IngredientList from "@/components/IngredientList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ChefHat, Calendar, ShoppingCart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NotificationBar from "@/components/NotificationBar";
import { useToast } from "@/hooks/use-toast";

const dishes = [
  {
    id: 1,
    name: "Vegetable Curry",
    description: "A delicious blend of fresh vegetables in a savory curry sauce.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: "30 mins",
    difficulty: "Medium",
    calories: 450,
    ingredients: [
      { id: 1, name: "Potatoes", quantity: "2", unit: "medium", category: "Vegetables", inCart: false },
      { id: 2, name: "Carrots", quantity: "3", unit: "medium", category: "Vegetables", inCart: false },
      { id: 3, name: "Peas", quantity: "1", unit: "cup", category: "Vegetables", inCart: false },
      { id: 4, name: "Onion", quantity: "1", unit: "large", category: "Vegetables", inCart: false },
      { id: 5, name: "Curry Powder", quantity: "2", unit: "tbsp", category: "Spices", inCart: false },
      { id: 6, name: "Coconut Milk", quantity: "1", unit: "can", category: "Dairy", inCart: false },
    ],
  },
  {
    id: 2,
    name: "Grilled Chicken Salad",
    description: "Fresh mixed greens topped with grilled chicken and a light vinaigrette.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: "25 mins",
    difficulty: "Easy",
    calories: 320,
    ingredients: [
      { id: 7, name: "Chicken Breast", quantity: "2", unit: "pieces", category: "Meat", inCart: false },
      { id: 8, name: "Mixed Greens", quantity: "4", unit: "cups", category: "Vegetables", inCart: false },
      { id: 9, name: "Cherry Tomatoes", quantity: "1", unit: "cup", category: "Vegetables", inCart: false },
      { id: 10, name: "Cucumber", quantity: "1", unit: "medium", category: "Vegetables", inCart: false },
      { id: 11, name: "Balsamic Vinegar", quantity: "2", unit: "tbsp", category: "Condiments", inCart: false },
      { id: 12, name: "Olive Oil", quantity: "2", unit: "tbsp", category: "Oils", inCart: false },
    ],
  },
  {
    id: 3,
    name: "Pasta Primavera",
    description: "A light pasta dish filled with spring vegetables in a garlic olive oil sauce.",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: "35 mins",
    difficulty: "Medium",
    calories: 480,
    ingredients: [
      { id: 13, name: "Pasta", quantity: "250", unit: "g", category: "Grains", inCart: false },
      { id: 14, name: "Bell Peppers", quantity: "2", unit: "medium", category: "Vegetables", inCart: false },
      { id: 15, name: "Broccoli", quantity: "1", unit: "cup", category: "Vegetables", inCart: false },
      { id: 16, name: "Zucchini", quantity: "1", unit: "medium", category: "Vegetables", inCart: false },
      { id: 17, name: "Garlic", quantity: "3", unit: "cloves", category: "Vegetables", inCart: false },
      { id: 18, name: "Parmesan Cheese", quantity: "1/4", unit: "cup", category: "Dairy", inCart: false },
    ],
  },
  {
    id: 4,
    name: "Mushroom Risotto",
    description: "Creamy arborio rice slowly cooked with mushrooms and parmesan cheese.",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    prepTime: "45 mins",
    difficulty: "Hard",
    calories: 520,
    ingredients: [
      { id: 19, name: "Arborio Rice", quantity: "1.5", unit: "cups", category: "Grains", inCart: false },
      { id: 20, name: "Mushrooms", quantity: "250", unit: "g", category: "Vegetables", inCart: false },
      { id: 21, name: "Vegetable Broth", quantity: "4", unit: "cups", category: "Condiments", inCart: false },
      { id: 22, name: "White Wine", quantity: "1/2", unit: "cup", category: "Alcohol", inCart: false },
      { id: 23, name: "Parmesan Cheese", quantity: "1/2", unit: "cup", category: "Dairy", inCart: false },
      { id: 24, name: "Shallot", quantity: "1", unit: "medium", category: "Vegetables", inCart: false },
    ],
  },
];

const SelectDish = () => {
  const [selectedDishIds, setSelectedDishIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showNotification, setShowNotification] = useState(false);
  const { toast } = useToast();

  const handleDishSelect = (dishId: number) => {
    setSelectedDishIds((prev) => {
      if (prev.includes(dishId)) {
        return prev.filter((id) => id !== dishId);
      } else {
        return [...prev, dishId];
      }
    });
  };

  const handleUpdateIngredient = (ingredientId: number, inCart: boolean) => {
    // This would update the ingredient state in a real app
    console.log(`Ingredient ${ingredientId} is now ${inCart ? 'in cart' : 'not in cart'}`);
  };

  const handleAddToMealPlan = () => {
    if (selectedDishIds.length === 0) {
      setShowNotification(true);
      return;
    }

    toast({
      title: "Dishes added to meal plan",
      description: `${selectedDishIds.length} dishes have been added to your meal plan.`,
    });
  };

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           (selectedCategory === "easy" && dish.difficulty === "Easy") ||
                           (selectedCategory === "medium" && dish.difficulty === "Medium") ||
                           (selectedCategory === "hard" && dish.difficulty === "Hard");
    
    return matchesSearch && matchesCategory;
  });

  const selectedDishes = dishes.filter(dish => selectedDishIds.includes(dish.id));

  const allIngredients = selectedDishes.flatMap(dish => dish.ingredients);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-display font-semibold text-gray-900">Select Dishes</h1>
              <p className="text-gray-600">Choose dishes for your meal plan and get shopping lists automatically.</p>
            </div>
          </div>

          {showNotification && (
            <div className="mb-6">
              <NotificationBar
                message="Please select at least one dish to add to your meal plan."
                type="warning"
                onClose={() => setShowNotification(false)}
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Dishes */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <Tabs defaultValue="browse" className="mb-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="browse">
                      <Search className="h-4 w-4 mr-2" />
                      Browse Dishes
                    </TabsTrigger>
                    <TabsTrigger value="selected">
                      <Calendar className="h-4 w-4 mr-2" />
                      Selected ({selectedDishIds.length})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="browse" className="space-y-6">
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                      <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search dishes..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Dishes</SelectItem>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {filteredDishes.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredDishes.map((dish) => (
                          <DishCard
                            key={dish.id}
                            {...dish}
                            onClick={() => handleDishSelect(dish.id)}
                            selected={selectedDishIds.includes(dish.id)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <ChefHat className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-800">No dishes found</h3>
                        <p className="text-gray-500">Try changing your search or filter.</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="selected">
                    {selectedDishIds.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedDishes.map((dish) => (
                          <DishCard
                            key={dish.id}
                            {...dish}
                            onClick={() => handleDishSelect(dish.id)}
                            selected={true}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-800">No dishes selected</h3>
                        <p className="text-gray-500">Browse and select dishes to add them to your plan.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
                
                <div className="border-t pt-6 mt-6">
                  <Button 
                    className="bg-cuisine-green hover:bg-cuisine-green/90"
                    onClick={handleAddToMealPlan}
                  >
                    Add to Meal Plan
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar - Shopping List */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-medium mb-4">Shopping List</h3>
                
                {selectedDishIds.length > 0 ? (
                  <IngredientList 
                    ingredients={allIngredients}
                    onUpdateIngredient={handleUpdateIngredient}
                  />
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCart className="mx-auto h-10 w-10 text-gray-300 mb-3" />
                    <p className="text-gray-500">Select dishes to see ingredients</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SelectDish;
