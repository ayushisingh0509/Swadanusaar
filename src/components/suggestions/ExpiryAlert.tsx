
import { CalendarClock, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Ingredient {
  id: number;
  name: string;
  daysUntilExpiry?: number;
}

interface ExpiryAlertProps {
  expiringIngredients: Ingredient[];
  showExpiryAlert: boolean;
  onDismiss: () => void;
  onShowAiSuggestions: () => void;
}

const ExpiryAlert = ({
  expiringIngredients,
  showExpiryAlert,
  onDismiss,
  onShowAiSuggestions,
}: ExpiryAlertProps) => {
  if (expiringIngredients.length === 0 || !showExpiryAlert) {
    return null;
  }

  return (
    <Card className="mb-6 border-yellow-300 bg-yellow-50">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center">
            <CalendarClock className="h-5 w-5 text-yellow-600 mr-2" />
            <CardTitle className="text-yellow-800">Ingredients Expiring Soon</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDismiss}
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Close</span>
            <span aria-hidden>×</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {expiringIngredients.map((ingredient) => (
            <Badge key={ingredient.id} variant="outline" className="bg-white border-yellow-200">
              {ingredient.name}: {ingredient.daysUntilExpiry === 0 ? "Today" : `${ingredient.daysUntilExpiry} days`}
            </Badge>
          ))}
        </div>
        <div className="mt-3 text-sm text-yellow-700">
          Try our AI-suggested recipes using these ingredients before they expire!
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-yellow-700 border-yellow-300 hover:bg-yellow-100"
          onClick={onShowAiSuggestions}
        >
          <Lightbulb className="h-4 w-4 mr-2" />
          See AI Suggestions
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExpiryAlert;
