
import { Dish } from "../data/recipesData";

export const filterDishes = (
  dishes: Dish[],
  searchQuery: string,
  difficultyFilter: string,
  moodFilter: string
) => {
  return dishes.filter((dish) => {
    const matchesSearch = 
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDifficulty = 
      difficultyFilter === "all" || 
      dish.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
      
    let matchesMood = true;
    
    if (moodFilter !== "all") {
      // Simple mood-based filtering logic
      if (moodFilter === "healthy" && !dish.description.toLowerCase().includes("healthy")) {
        matchesMood = false;
      } else if (moodFilter === "quick" && parseInt(dish.prepTime) > 30) {
        matchesMood = false;
      } else if (moodFilter === "comfort" && !dish.description.toLowerCase().includes("rich")) {
        matchesMood = false;
      } else if (moodFilter === "spicy" && !dish.ingredients.some(ing => 
        ing.name.toLowerCase().includes("chilli") || 
        ing.name.toLowerCase().includes("spic")
      )) {
        matchesMood = false;
      }
    }
    
    return matchesSearch && matchesDifficulty && matchesMood;
  });
};
