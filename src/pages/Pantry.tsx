
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Carrot, ShoppingBag, CalendarDays, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface PantryItem {
  id: number;
  name: string;
  category: string;
  quantity: string;
  unit: string;
  expiryDate: string;
  daysUntilExpiry: number;
}

interface ShoppingItem {
  id: number;
  name: string;
  category: string;
  quantity: string;
  unit: string;
  purchased: boolean;
}

const pantryItems: PantryItem[] = [
  { id: 1, name: "Basmati Rice", category: "Grains", quantity: "5", unit: "kg", expiryDate: "2025-12-10", daysUntilExpiry: 240 },
  { id: 2, name: "Toor Dal", category: "Lentils", quantity: "1", unit: "kg", expiryDate: "2025-11-11", daysUntilExpiry: 210 },
  { id: 3, name: "Mustard Oil", category: "Oils", quantity: "1", unit: "liter", expiryDate: "2025-08-12", daysUntilExpiry: 120 },
  { id: 4, name: "Wheat Flour (Atta)", category: "Grains", quantity: "5", unit: "kg", expiryDate: "2025-10-31", daysUntilExpiry: 180 },
  { id: 5, name: "Spinach", category: "Vegetables", quantity: "500", unit: "g", expiryDate: "2025-05-09", daysUntilExpiry: 1 },
  { id: 6, name: "Paneer", category: "Dairy", quantity: "200", unit: "g", expiryDate: "2025-05-12", daysUntilExpiry: 4 },
  { id: 7, name: "Ginger", category: "Vegetables", quantity: "100", unit: "g", expiryDate: "2025-05-20", daysUntilExpiry: 12 },
  { id: 8, name: "Red Chilli Powder", category: "Spices", quantity: "100", unit: "g", expiryDate: "2025-12-01", daysUntilExpiry: 210 },
];

const shoppingItems: ShoppingItem[] = [
  { id: 1, name: "Coriander Leaves", category: "Herbs", quantity: "1", unit: "bunch", purchased: false },
  { id: 2, name: "Ghee", category: "Dairy", quantity: "500", unit: "g", purchased: false },
  { id: 3, name: "Cumin Seeds", category: "Spices", quantity: "100", unit: "g", purchased: false },
  { id: 4, name: "Chole (Chickpeas)", category: "Lentils", quantity: "500", unit: "g", purchased: true },
  { id: 5, name: "Turmeric Powder", category: "Spices", quantity: "100", unit: "g", purchased: false },
];

const categories = [
  "Vegetables", 
  "Fruits", 
  "Lentils", 
  "Dairy", 
  "Bakery", 
  "Grains", 
  "Canned Goods", 
  "Frozen Foods", 
  "Snacks", 
  "Beverages",
  "Oils",
  "Spices",
  "Herbs",
  "Condiments",
];

const Pantry = () => {
  const [pantrySearch, setPantrySearch] = useState("");
  const [shoppingSearch, setShoppingSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [itemType, setItemType] = useState<"pantry" | "shopping">("pantry");
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    expiryDate: "",
  });
  
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState("expiry");

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !newItem.quantity) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Item added",
      description: `${newItem.name} has been added to your ${itemType}.`,
    });

    setDialogOpen(false);
    setNewItem({
      name: "",
      category: "",
      quantity: "",
      unit: "",
      expiryDate: "",
    });
  };

  const filteredPantryItems = pantryItems
    .filter(item => 
      item.name.toLowerCase().includes(pantrySearch.toLowerCase()) || 
      item.category.toLowerCase().includes(pantrySearch.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "expiry") {
        return a.daysUntilExpiry - b.daysUntilExpiry;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else { // category
        return a.category.localeCompare(b.category);
      }
    });
  
  const filteredShoppingItems = shoppingItems.filter(item => 
    item.name.toLowerCase().includes(shoppingSearch.toLowerCase()) || 
    item.category.toLowerCase().includes(shoppingSearch.toLowerCase())
  );

  const togglePurchased = (id: number) => {
    // In a real app, this would update state
    console.log(`Toggling purchased state for item ${id}`);
    toast({
      title: "Item updated",
      description: "Shopping item status has been updated.",
    });
  };

  const getExpiryBadge = (days: number) => {
    if (days <= 2) {
      return <Badge variant="destructive">Expires in {days} days</Badge>;
    } else if (days <= 5) {
      return <Badge variant="outline" className="border-cuisine-orange text-cuisine-orange">Expires in {days} days</Badge>;
    } else {
      return <Badge variant="outline" className="text-gray-500">Expires in {days} days</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-display font-semibold text-gray-900">Pantry Management</h1>
              <p className="text-gray-600">Track your ingredients and shopping list in one place.</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-cuisine-green hover:bg-cuisine-green/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Item</DialogTitle>
                    <DialogDescription>
                      Add an item to your pantry or shopping list.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant={itemType === "pantry" ? "default" : "outline"}
                        onClick={() => setItemType("pantry")}
                        className={itemType === "pantry" ? "bg-cuisine-green hover:bg-cuisine-green/90" : ""}
                      >
                        <Carrot className="h-4 w-4 mr-2" />
                        Pantry
                      </Button>
                      <Button
                        variant={itemType === "shopping" ? "default" : "outline"}
                        onClick={() => setItemType("shopping")}
                        className={itemType === "shopping" ? "bg-cuisine-green hover:bg-cuisine-green/90" : ""}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Shopping List
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Item Name*</label>
                      <Input 
                        id="name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                        placeholder="Enter item name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category*</label>
                        <Select
                          value={newItem.category}
                          onValueChange={(value) => setNewItem({...newItem, category: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Quantity*</label>
                        <div className="flex space-x-2">
                          <Input 
                            value={newItem.quantity}
                            onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                            placeholder="Amount"
                            type="number"
                          />
                          <Select
                            value={newItem.unit}
                            onValueChange={(value) => setNewItem({...newItem, unit: value})}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="g">g</SelectItem>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="ml">ml</SelectItem>
                              <SelectItem value="l">l</SelectItem>
                              <SelectItem value="pcs">pcs</SelectItem>
                              <SelectItem value="bunch">bunch</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    {itemType === "pantry" && (
                      <div className="space-y-2">
                        <label htmlFor="expiry" className="text-sm font-medium">
                          Expiry Date
                          <span className="text-gray-500 text-xs ml-2">(optional)</span>
                        </label>
                        <div className="flex items-center space-x-2">
                          <CalendarDays className="h-4 w-4 text-gray-400" />
                          <Input 
                            id="expiry"
                            type="date"
                            value={newItem.expiryDate}
                            onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddItem} className="bg-cuisine-green hover:bg-cuisine-green/90">Add Item</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <Tabs defaultValue="pantry">
              <div className="px-6 pt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pantry">
                    <Carrot className="h-4 w-4 mr-2" />
                    My Pantry
                  </TabsTrigger>
                  <TabsTrigger value="shopping">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Shopping List
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="pantry" className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 mb-6">
                  <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search pantry items..."
                      value={pantrySearch}
                      onChange={(e) => setPantrySearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expiry">Sort by Expiry</SelectItem>
                        <SelectItem value="name">Sort by Name</SelectItem>
                        <SelectItem value="category">Sort by Category</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {filteredPantryItems.length > 0 ? (
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Expiry</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPantryItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>
                              {item.quantity} {item.unit}
                            </TableCell>
                            <TableCell>
                              {getExpiryBadge(item.daysUntilExpiry)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Carrot className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-800">No pantry items found</h3>
                    <p className="text-gray-500 mb-4">
                      {pantrySearch ? "Try a different search term." : "Add items to your pantry to get started."}
                    </p>
                    {pantrySearch && (
                      <Button 
                        variant="outline" 
                        onClick={() => setPantrySearch("")}
                        className="inline-flex items-center"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Clear search
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="shopping" className="p-6">
                <div className="relative max-w-md mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search shopping list..."
                    value={shoppingSearch}
                    onChange={(e) => setShoppingSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {filteredShoppingItems.length > 0 ? (
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredShoppingItems.map((item) => (
                          <TableRow key={item.id} className={item.purchased ? "bg-gray-50" : ""}>
                            <TableCell className={`font-medium ${item.purchased ? 'line-through text-gray-500' : ''}`}>
                              {item.name}
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>
                              {item.quantity} {item.unit}
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant={item.purchased ? "outline" : "default"} 
                                size="sm"
                                onClick={() => togglePurchased(item.id)}
                                className={item.purchased ? "" : "bg-cuisine-green hover:bg-cuisine-green/90"}
                              >
                                {item.purchased ? "Purchased" : "Mark as Purchased"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-800">No shopping items found</h3>
                    <p className="text-gray-500 mb-4">
                      {shoppingSearch ? "Try a different search term." : "Add items to your shopping list to get started."}
                    </p>
                    {shoppingSearch && (
                      <Button 
                        variant="outline" 
                        onClick={() => setShoppingSearch("")}
                        className="inline-flex items-center"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Clear search
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Pantry;
