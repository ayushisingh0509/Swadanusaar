
import { Lightbulb, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import RecipeGrid from "./RecipeGrid";

interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  unit: string;
  category: string;
  expiryDate?: string;
  daysUntilExpiry?: number;
}

interface Dish {
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

interface AiSuggestionsTabContentProps {
  dishes: Dish[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedDishId: number | null;
  onSelectDish: (dish: Dish) => void;
}

const AiSuggestionsTabContent = ({
  dishes,
  searchQuery,
  onSearchChange,
  selectedDishId,
  onSelectDish,
}: AiSuggestionsTabContentProps) => {
  return (
    <>
      <div className="mb-6">
        <div className="flex items-center p-4 bg-blue-50 rounded-lg mb-4 text-blue-800 text-sm">
          <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
          <p>AI-powered suggestions based on ingredients that will expire soon!</p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search suggestions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <RecipeGrid 
        dishes={dishes} 
        selectedDishId={selectedDishId} 
        onSelectDish={onSelectDish}
        isAiSuggestion={true} 
      />
    </>
  );
};

export default AiSuggestionsTabContent;
