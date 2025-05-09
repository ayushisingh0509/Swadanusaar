
import { Button } from "@/components/ui/button";
import IngredientList from "@/components/IngredientList";

interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  unit: string;
  category: string;
  inCart?: boolean;
}

interface PantryTabContentProps {
  ingredients: Ingredient[];
}

const PantryTabContent = ({ ingredients }: PantryTabContentProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Ingredients In Your Pantry</h3>
        <p className="text-sm text-gray-500">{ingredients.length} items available</p>
      </div>

      <IngredientList
        ingredients={ingredients}
        showAddToCart={false}
      />
      
      <div className="border-t pt-4 mt-6 text-center">
        <p className="text-sm text-gray-500 mb-4">
          Need more ingredients? Add them to your shopping list.
        </p>
        <Button asChild variant="outline">
          <a href="/pantry">Update Pantry</a>
        </Button>
      </div>
    </div>
  );
};

export default PantryTabContent;
