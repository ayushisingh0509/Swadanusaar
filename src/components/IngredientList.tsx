
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  unit: string;
  category: string;
  inCart?: boolean;
}

interface IngredientListProps {
  ingredients: Ingredient[];
  onUpdateIngredient?: (id: number, inCart: boolean) => void;
  showAddToCart?: boolean;
}

const IngredientList = ({
  ingredients,
  onUpdateIngredient,
  showAddToCart = true,
}: IngredientListProps) => {
  const [localIngredients, setLocalIngredients] = useState<Ingredient[]>(ingredients);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setLocalIngredients(
      localIngredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, inCart: checked } : ingredient
      )
    );
    
    if (onUpdateIngredient) {
      onUpdateIngredient(id, checked);
    }
  };

  // Group ingredients by category
  const groupedIngredients = localIngredients.reduce<Record<string, Ingredient[]>>(
    (acc, ingredient) => {
      if (!acc[ingredient.category]) {
        acc[ingredient.category] = [];
      }
      acc[ingredient.category].push(ingredient);
      return acc;
    },
    {}
  );

  const handleAddAllToCart = () => {
    const updatedIngredients = localIngredients.map((ingredient) => ({
      ...ingredient,
      inCart: true,
    }));
    setLocalIngredients(updatedIngredients);
    
    // Update all ingredients if callback provided
    if (onUpdateIngredient) {
      updatedIngredients.forEach((ingredient) => {
        onUpdateIngredient(ingredient.id, true);
      });
    }
  };

  return (
    <div className="space-y-4">
      {showAddToCart && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Ingredients</h3>
          <Button
            variant="outline"
            size="sm"
            className="text-cuisine-green"
            onClick={handleAddAllToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add all to cart
          </Button>
        </div>
      )}

      {Object.entries(groupedIngredients).map(([category, items]) => (
        <div key={category} className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500 uppercase">{category}</h4>
          <div className="space-y-1.5">
            {items.map((ingredient) => (
              <div
                key={ingredient.id}
                className={cn(
                  "flex items-center justify-between py-2 px-3 rounded-md",
                  ingredient.inCart && "bg-gray-50"
                )}
              >
                <div className="flex items-start space-x-3">
                  {showAddToCart && (
                    <Checkbox
                      id={`ingredient-${ingredient.id}`}
                      checked={ingredient.inCart}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(ingredient.id, checked === true)
                      }
                      className="mt-1"
                    />
                  )}
                  <div>
                    <label
                      htmlFor={`ingredient-${ingredient.id}`}
                      className={cn(
                        "text-sm font-medium",
                        ingredient.inCart && "line-through text-gray-500"
                      )}
                    >
                      {ingredient.name}
                    </label>
                    <p className="text-xs text-gray-500">
                      {ingredient.quantity} {ingredient.unit}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IngredientList;
