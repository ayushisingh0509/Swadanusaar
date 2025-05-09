
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Utensils } from "lucide-react";

interface DishCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  prepTime: string;
  difficulty: string;
  onClick?: () => void;
  selected?: boolean;
}

const DishCard = ({
  id,
  name,
  description,
  image,
  prepTime,
  difficulty,
  onClick,
  selected = false,
}: DishCardProps) => {
  return (
    <Card 
      className={`overflow-hidden transition-all hover:shadow-md ${
        selected ? 'ring-2 ring-cuisine-green' : ''
      }`}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{prepTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Utensils className="h-4 w-4" />
            <span>{difficulty}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={onClick} 
          variant={selected ? "default" : "outline"} 
          className={selected ? "bg-cuisine-green hover:bg-cuisine-green/90 w-full" : "w-full"}
        >
          {selected ? "Selected" : "Select Dish"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DishCard;
