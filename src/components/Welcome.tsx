import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Mail, Lock, Star } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { createUser, verifyUser } from '@/lib/db';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (activeTab === "signup") {
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match",
            variant: "destructive",
          });
          return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast({
            title: "Error",
            description: "Please enter a valid email address",
            variant: "destructive",
          });
          return;
        }

        // Validate password strength
        if (formData.password.length < 6) {
          toast({
            title: "Error",
            description: "Password must be at least 6 characters long",
            variant: "destructive",
          });
          return;
        }
        
        await createUser(formData.email, formData.fullName, formData.password);
        toast({
          title: "Success",
          description: "Account created successfully! Please log in.",
        });
        // Clear the form
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          fullName: "",
        });
        setActiveTab("login");
      } else if (activeTab === "login") {
        const user = await verifyUser(formData.email, formData.password);
        toast({
          title: "Success",
          description: `Welcome back, ${user.name}!`,
        });
        // Navigate to dashboard on successful login
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const features = [
    {
      title: "Pantry Management",
      description: "Track your ingredients and get expiry notifications"
    },
    {
      title: "Recipe Suggestion",
      description: "Get personalized recipes based on your pantry"
    },
    {
      title: "Smart Shopping List",
      description: "Auto-generate shopping lists from recipes"
    }
  ];

  const reviews = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "SwaadhAnusaar has transformed how I manage my kitchen. No more wasted groceries!"
    },
    {
      name: "Raj Patel",
      location: "Delhi",
      rating: 5,
      text: "The pantry management feature is a game changer for busy professionals like me."
    },
    {
      name: "Ananya Desai",
      location: "Bangalore",
      rating: 4,
      text: "I love how the app suggests recipes based on what I already have. So convenient!"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-cuisine-beige p-4 md:p-8 overflow-hidden">
      {/* Desktop Layout - using flex-row */}
      <div className="hidden md:flex md:flex-row md:w-full md:items-center md:justify-between">
        {/* Left Side - Tagline and Features */}
        <div className="w-1/3 flex flex-col space-y-6 px-4">
          {/* Tagline */}
          <p className="font-medium text-lg md:text-xl lg:text-2xl text-cuisine-green italic animate-floating">
            "Bridging the gap between cooks and customers for healthier meals, less food waste, pantry management and make a kitchen that thinks with you."
          </p>
          
          {/* Features List */}
          <div className="space-y-4 mt-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-4 shadow-md border-l-4 border-cuisine-green transition-transform hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-medium text-cuisine-green text-lg">{feature.title}</h3>
                  <Badge variant="outline" className="bg-cuisine-light-orange text-cuisine-green border-none">
                    New
                  </Badge>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Center Auth Content */}
        <div className="w-1/3 max-w-md z-10">
          {/* Logo */}
          <div className="flex flex-col items-center space-y-2 mb-6">
            <img 
              src="/lovable-uploads/447299ec-50cb-470a-8c8a-628faebd13e5.png" 
              alt="SwaadhAnusaar Logo" 
              className="w-72 h-auto"
            />
          </div>

          {/* Auth Card */}
          <Card className="border-cuisine-light-green shadow-md">
            <Tabs 
              defaultValue="login" 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle className="text-cuisine-green text-center">Welcome Back</CardTitle>
                    <CardDescription className="text-center">
                      Enter your credentials to access your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          placeholder="you@example.com"
                          type="email"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Password</Label>
                        <button 
                          type="button" 
                          onClick={() => setActiveTab("reset")}
                          className="text-xs text-cuisine-green hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-2.5 text-gray-400"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-cuisine-green hover:bg-cuisine-green/90"
                    >
                      Sign In
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle className="text-cuisine-green text-center">Create Account</CardTitle>
                    <CardDescription className="text-center">
                      Join SwaadhAnusaar and start your culinary journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-fullname">Full Name</Label>
                      <div className="relative">
                        <Input
                          id="signup-fullname"
                          name="fullName"
                          placeholder="John Doe"
                          type="text"
                          className="pl-10"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="signup-email"
                          name="email"
                          placeholder="you@example.com"
                          type="email"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="signup-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-2.5 text-gray-400"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirm-password"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          className="pl-10"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-cuisine-green hover:bg-cuisine-green/90"
                    >
                      Create Account
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>

              <TabsContent value="reset">
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle className="text-cuisine-green text-center">Reset Password</CardTitle>
                    <CardDescription className="text-center">
                      Enter your email to receive a password reset link
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="reset-email"
                          name="email"
                          placeholder="you@example.com"
                          type="email"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-cuisine-green hover:bg-cuisine-green/90"
                    >
                      Send Reset Link
                    </Button>
                    <Button 
                      type="button" 
                      variant="link" 
                      className="text-cuisine-green"
                      onClick={() => setActiveTab("login")}
                    >
                      Back to Login
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Reviews - Right Side */}
        <div className="w-1/3 px-4 animate-floating-delayed">
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white/80 p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-cuisine-orange fill-cuisine-orange" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-2">"{review.text}"</p>
                <div className="text-sm text-cuisine-green font-medium">
                  {review.name}, {review.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout - using flex-col */}
      <div className="flex flex-col w-full items-center md:hidden">
        {/* Top: Logo & Auth Section */}
        <div className="w-full flex flex-col items-center mb-8">
          {/* Logo */}
          <div className="flex flex-col items-center space-y-2 mb-6">
            <img 
              src="/lovable-uploads/447299ec-50cb-470a-8c8a-628faebd13e5.png" 
              alt="SwaadhAnusaar Logo" 
              className="w-72 h-auto"
            />
          </div>

          {/* Auth Card */}
          <Card className="border-cuisine-light-green shadow-md w-full">
            <Tabs 
              defaultValue="login" 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle className="text-cuisine-green text-center">Welcome Back</CardTitle>
                    <CardDescription className="text-center">
                      Enter your credentials to access your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          placeholder="you@example.com"
                          type="email"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Password</Label>
                        <button 
                          type="button" 
                          onClick={() => setActiveTab("reset")}
                          className="text-xs text-cuisine-green hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-2.5 text-gray-400"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-cuisine-green hover:bg-cuisine-green/90"
                    >
                      Sign In
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle className="text-cuisine-green text-center">Create Account</CardTitle>
                    <CardDescription className="text-center">
                      Join SwaadhAnusaar and start your culinary journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-fullname">Full Name</Label>
                      <div className="relative">
                        <Input
                          id="signup-fullname"
                          name="fullName"
                          placeholder="John Doe"
                          type="text"
                          className="pl-10"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="signup-email"
                          name="email"
                          placeholder="you@example.com"
                          type="email"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="signup-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-2.5 text-gray-400"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirm-password"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          className="pl-10"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-cuisine-green hover:bg-cuisine-green/90"
                    >
                      Create Account
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>

              <TabsContent value="reset">
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle className="text-cuisine-green text-center">Reset Password</CardTitle>
                    <CardDescription className="text-center">
                      Enter your email to receive a password reset link
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="reset-email"
                          name="email"
                          placeholder="you@example.com"
                          type="email"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-cuisine-green hover:bg-cuisine-green/90"
                    >
                      Send Reset Link
                    </Button>
                    <Button 
                      type="button" 
                      variant="link" 
                      className="text-cuisine-green"
                      onClick={() => setActiveTab("login")}
                    >
                      Back to Login
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Middle: Features Section */}
        <div className="w-full mb-8">
          {/* Tagline */}
          <p className="font-medium text-lg text-cuisine-green italic animate-floating mb-6">
            "Bridging the gap between cooks and customers for healthier meals, less food waste, pantry management and make a kitchen that thinks with you."
          </p>
          
          {/* Features List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-4 shadow-md border-l-4 border-cuisine-green"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-medium text-cuisine-green text-lg">{feature.title}</h3>
                  <Badge variant="outline" className="bg-cuisine-light-orange text-cuisine-green border-none">
                    New
                  </Badge>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Reviews Section */}
        <div className="w-full animate-floating-delayed">
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white/80 p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-cuisine-orange fill-cuisine-orange" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-2">"{review.text}"</p>
                <div className="text-sm text-cuisine-green font-medium">
                  {review.name}, {review.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
