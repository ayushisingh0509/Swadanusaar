
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoLibrary from "@/components/VideoLibrary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ChefHat, Apple, Youtube, Lightbulb } from "lucide-react";
import RecipeDetails from "@/components/suggestions/RecipeDetails";
import ExpiryAlert from "@/components/suggestions/ExpiryAlert";
import RecipeFilters from "@/components/suggestions/RecipeFilters";
import RecipeGrid from "@/components/suggestions/RecipeGrid";
import PantryTabContent from "@/components/suggestions/PantryTabContent";
import AiSuggestionsTabContent from "@/components/suggestions/AiSuggestionsTabContent";
import { filterDishes } from "@/utils/recipeFilters";
import { 
  pantryIngredients, 
  suggestedDishes, 
  aiSuggestions,
  Dish
} from "@/data/recipesData";

const Suggestions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [moodFilter, setMoodFilter] = useState("all");
  const [showExpiryAlert, setShowExpiryAlert] = useState(true);
  const [activeTab, setActiveTab] = useState("suggestions");
  const { toast } = useToast();

  useEffect(() => {
    // Show expiry alerts when component mounts
    const expiringIngredients = pantryIngredients.filter(
      ingredient => ingredient.daysUntilExpiry !== undefined && ingredient.daysUntilExpiry <= 3
    );
    
    if (expiringIngredients.length > 0 && showExpiryAlert) {
      toast({
        title: "Ingredients Expiring Soon!",
        description: `You have ${expiringIngredients.length} ingredients that will expire within 3 days.`,
        duration: 5000,
      });
    }
  }, [toast, showExpiryAlert]);

  const handleSelectDish = (dish: Dish) => {
    setSelectedDish(dish);
    toast({
      title: "Recipe selected",
      description: `You've selected ${dish.name}. View ingredients and cooking instructions.`,
    });
  };

  // Get expiring ingredients (within 3 days)
  const expiringIngredients = pantryIngredients.filter(
    ingredient => ingredient.daysUntilExpiry !== undefined && ingredient.daysUntilExpiry <= 3
  );

  // Filter dishes based on search, difficulty, and mood
  const filteredDishes = filterDishes(suggestedDishes, searchQuery, difficultyFilter, moodFilter);
  const filteredAiSuggestions = filterDishes(aiSuggestions, searchQuery, difficultyFilter, moodFilter);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-display font-semibold text-gray-900">Recipe Suggestions</h1>
              <p className="text-gray-600">Discover recipe ideas based on ingredients you already have.</p>
            </div>
          </div>

          {/* Expiry Alert Component */}
          <ExpiryAlert 
            expiringIngredients={expiringIngredients}
            showExpiryAlert={showExpiryAlert}
            onDismiss={() => setShowExpiryAlert(false)}
            onShowAiSuggestions={() => setActiveTab("ai-suggestions")}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <Tabs defaultValue="suggestions" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="suggestions">
                      <ChefHat className="h-4 w-4 mr-2" />
                      Recipes
                    </TabsTrigger>
                    <TabsTrigger value="ai-suggestions">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      AI Suggestions
                    </TabsTrigger>
                    <TabsTrigger value="pantry">
                      <Apple className="h-4 w-4 mr-2" />
                      My Ingredients
                    </TabsTrigger>
                  </TabsList>
                
                  <TabsContent value="suggestions">
                    <RecipeFilters 
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      difficultyFilter={difficultyFilter}
                      onDifficultyChange={setDifficultyFilter}
                      moodFilter={moodFilter}
                      onMoodChange={setMoodFilter}
                    />

                    <RecipeGrid
                      dishes={filteredDishes}
                      selectedDishId={selectedDish?.id || null}
                      onSelectDish={handleSelectDish}
                    />
                  </TabsContent>
                  
                  <TabsContent value="ai-suggestions">
                    <AiSuggestionsTabContent 
                      dishes={filteredAiSuggestions}
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      selectedDishId={selectedDish?.id || null}
                      onSelectDish={handleSelectDish}
                    />
                  </TabsContent>
                  
                  <TabsContent value="pantry">
                    <PantryTabContent ingredients={pantryIngredients} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Sidebar - Recipe Details */}
            <div>
              <RecipeDetails selectedDish={selectedDish} />
              
              {/* Video Library Section */}
              <VideoLibrary className="mt-6" />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Suggestions;
