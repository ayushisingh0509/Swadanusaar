
import { ChefHat } from "lucide-react";
import DishCard from "@/components/DishCard";

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

interface RecipeGridProps {
  dishes: Dish[];
  selectedDishId: number | null;
  onSelectDish: (dish: Dish) => void;
  isAiSuggestion?: boolean;
}

const RecipeGrid = ({ 
  dishes, 
  selectedDishId, 
  onSelectDish,
  isAiSuggestion = false 
}: RecipeGridProps) => {
  if (dishes.length === 0) {
    return (
      <div className="text-center py-12">
        <ChefHat className="mx-auto h-12 w-12 text-gray-300 mb-3" />
        <h3 className="text-lg font-medium text-gray-800">No recipes found</h3>
        <p className="text-gray-500">Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {dishes.map((dish) => (
        <div key={dish.id} className="relative">
          <div className={`absolute top-2 right-2 ${isAiSuggestion ? 'bg-blue-600' : 'bg-cuisine-green'} text-white text-xs font-semibold rounded-full px-2 py-1 z-10`}>
            {dish.matchPercentage}% match
          </div>
          
          {isAiSuggestion && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold rounded-full px-2 py-1 z-10">
              AI Suggested
            </div>
          )}
          
          <DishCard
            {...dish}
            onClick={() => onSelectDish(dish)}
            selected={selectedDishId === dish.id}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipeGrid;
