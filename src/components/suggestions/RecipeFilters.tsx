
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MoodSelector from "@/components/MoodSelector";

interface RecipeFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  difficultyFilter: string;
  onDifficultyChange: (value: string) => void;
  moodFilter: string;
  onMoodChange: (value: string) => void;
}

const RecipeFilters = ({
  searchQuery,
  onSearchChange,
  difficultyFilter,
  onDifficultyChange,
  moodFilter,
  onMoodChange,
}: RecipeFiltersProps) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={difficultyFilter}
          onValueChange={onDifficultyChange}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <MoodSelector 
        value={moodFilter} 
        onValueChange={onMoodChange} 
      />
    </div>
  );
};

export default RecipeFilters;
