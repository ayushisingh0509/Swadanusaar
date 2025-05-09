
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, ChefHat, ShoppingCart, Carrot, Bell } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Dinner Planning", message: "Please select dinner for tomorrow", time: "2 hours ago", read: false },
    { id: 2, title: "Grocery Alert", message: "Vegetables expiring in 2 days", time: "5 hours ago", read: true },
    { id: 3, title: "New Recipe Added", message: "Try our new seasonal recipe!", time: "1 day ago", read: true },
  ]);

  const upcomingMeals = [
    { id: 1, name: "Vegetable Curry", time: "Today, Dinner", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Grilled Chicken Salad", time: "Tomorrow, Lunch", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Pasta Primavera", time: "Tomorrow, Dinner", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  ];

  const expiringItems = [
    { id: 1, name: "Tomatoes", expiry: "2 days", quantity: "4" },
    { id: 2, name: "Spinach", expiry: "1 day", quantity: "1 bunch" },
    { id: 3, name: "Chicken Breast", expiry: "3 days", quantity: "500g" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-4 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col mb-6">
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-display font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm md:text-base text-gray-600">Welcome back! Here's your meal planning overview.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link to="/select-dish">Select Dishes</Link>
              </Button>
              <Button asChild className="w-full sm:w-auto bg-cuisine-green hover:bg-cuisine-green/90">
                <Link to="/suggestions">Get Suggestions</Link>
              </Button>
            </div>
          </div>

          {/* Quick Actions - Visible at the top on mobile */}
          {isMobile && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button asChild variant="outline" className="flex flex-col h-20 md:h-24 justify-center p-2">
                    <Link to="/select-dish" className="space-y-1 md:space-y-2 text-center">
                      <Calendar className="h-4 w-4 md:h-5 md:w-5 mx-auto text-cuisine-green" />
                      <span className="text-xs md:text-sm">Plan Meals</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex flex-col h-20 md:h-24 justify-center p-2">
                    <Link to="/pantry" className="space-y-1 md:space-y-2 text-center">
                      <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mx-auto text-cuisine-green" />
                      <span className="text-xs md:text-sm">Shopping List</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex flex-col h-20 md:h-24 justify-center p-2">
                    <Link to="/suggestions" className="space-y-1 md:space-y-2 text-center">
                      <ChefHat className="h-4 w-4 md:h-5 md:w-5 mx-auto text-cuisine-green" />
                      <span className="text-xs md:text-sm">Recipe Ideas</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex flex-col h-20 md:h-24 justify-center p-2">
                    <Link to="#" className="space-y-1 md:space-y-2 text-center">
                      <Bell className="h-4 w-4 md:h-5 md:w-5 mx-auto text-cuisine-green" />
                      <span className="text-xs md:text-sm">Notifications</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4 md:space-y-8">
              {/* Upcoming Meals */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 md:pb-6">
                  <CardTitle className="text-lg md:text-xl">Upcoming Meals</CardTitle>
                  <Link to="/select-dish" className="text-xs md:text-sm font-medium text-cuisine-green hover:underline">
                    Edit Plan
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 md:space-y-4">
                    {upcomingMeals.map((meal) => (
                      <div key={meal.id} className="flex items-center space-x-3 md:space-x-4 p-2 md:p-3 rounded-lg hover:bg-gray-50">
                        <div className="h-12 w-12 md:h-16 md:w-16 rounded-md overflow-hidden">
                          <img src={meal.image} alt={meal.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm md:text-base truncate">{meal.name}</h4>
                          <p className="text-xs md:text-sm text-gray-500">{meal.time}</p>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto md:px-3 md:py-1 md:h-9">View</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Expiring Soon */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 md:pb-6">
                  <CardTitle className="text-lg md:text-xl">Ingredients Expiring Soon</CardTitle>
                  <Link to="/pantry" className="text-xs md:text-sm font-medium text-cuisine-green hover:underline">
                    View All
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 md:space-y-4">
                    {expiringItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 md:space-x-4 p-2 md:p-3 rounded-lg hover:bg-gray-50">
                        <div className="h-8 w-8 md:h-10 md:w-10 bg-cuisine-light-orange/20 rounded-full flex items-center justify-center">
                          <Carrot className="h-4 w-4 md:h-5 md:w-5 text-cuisine-orange" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm md:text-base truncate">{item.name}</h4>
                          <p className="text-xs md:text-sm text-gray-500 truncate">Expires in {item.expiry} • {item.quantity}</p>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto md:px-3 md:py-1 md:h-9">Use Now</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Only show on desktop */}
            <div className="space-y-4 md:space-y-8 hidden lg:block">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button asChild variant="outline" className="flex flex-col h-24 justify-center p-2">
                      <Link to="/select-dish" className="space-y-2 text-center">
                        <Calendar className="h-5 w-5 mx-auto text-cuisine-green" />
                        <span className="text-sm">Plan Meals</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex flex-col h-24 justify-center p-2">
                      <Link to="/pantry" className="space-y-2 text-center">
                        <ShoppingCart className="h-5 w-5 mx-auto text-cuisine-green" />
                        <span className="text-sm">Shopping List</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex flex-col h-24 justify-center p-2">
                      <Link to="/suggestions" className="space-y-2 text-center">
                        <ChefHat className="h-5 w-5 mx-auto text-cuisine-green" />
                        <span className="text-sm">Recipe Ideas</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex flex-col h-24 justify-center p-2">
                      <Link to="#" className="space-y-2 text-center">
                        <Bell className="h-5 w-5 mx-auto text-cuisine-green" />
                        <span className="text-sm">Notifications</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Notifications</CardTitle>
                  <Link to="#" className="text-sm font-medium text-cuisine-green hover:underline">
                    View All
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-3 rounded-lg ${notification.read ? 'bg-white' : 'bg-cuisine-beige/50'}`}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`font-medium ${notification.read ? '' : 'text-cuisine-orange'}`}>
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Notifications for mobile - at the bottom */}
          {isMobile && (
            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg md:text-xl">Notifications</CardTitle>
                <Link to="#" className="text-xs md:text-sm font-medium text-cuisine-green hover:underline">
                  View All
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 md:space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-3 rounded-lg ${notification.read ? 'bg-white' : 'bg-cuisine-beige/50'}`}>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`font-medium text-sm md:text-base ${notification.read ? '' : 'text-cuisine-orange'}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
