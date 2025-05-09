
import { ChefHat, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import IngredientList from "@/components/IngredientList";

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

interface RecipeDetailsProps {
  selectedDish: Dish | null;
}

const RecipeDetails = ({ selectedDish }: RecipeDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-medium mb-4">Recipe Details</h3>
      
      {selectedDish ? (
        <div className="space-y-4">
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <img 
              src={selectedDish.image} 
              alt={selectedDish.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h3 className="text-xl font-medium">{selectedDish.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{selectedDish.description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-gray-500">Prep time:</span> {selectedDish.prepTime}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Difficulty:</span> {selectedDish.difficulty}
            </div>
          </div>
          
          <div className="border-t pt-4 mt-2">
            <h4 className="font-medium mb-3">Ingredients</h4>
            <IngredientList 
              ingredients={selectedDish.ingredients}
              showAddToCart={false}
            />
          </div>
          
          {selectedDish.videoId && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3 flex items-center">
                <Youtube className="h-4 w-4 mr-2 text-red-600" />
                Video Tutorial
              </h4>
              <div className="aspect-video rounded-md overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedDish.videoId}`}
                  title={`${selectedDish.name} video tutorial`}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Cooking Instructions</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Prepare all ingredients as specified in the ingredient list.</li>
              <li>Follow the cooking steps provided in the detailed recipe.</li>
              <li>Cook according to the recommended time and temperature.</li>
              <li>Serve and enjoy your meal!</li>
            </ol>
          </div>
          
          <div className="pt-4">
            <Button className="w-full bg-cuisine-green hover:bg-cuisine-green/90">
              Add to Meal Plan
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <ChefHat className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-500">Select a recipe to view details</p>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
