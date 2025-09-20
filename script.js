"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Clock, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function IndiaTrafficModeler() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routeData, setRouteData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock route data for demonstration
  const mockRouteData = {
    distance: "450 km",
    duration: "8 hours 15 mins",
    waypoints: [
      { name: "Mumbai", lat: 19.076, lng: 72.8777 },
      { name: "Pune", lat: 18.5204, lng: 73.8567 },
      { name: "Nashik", lat: 20.0113, lng: 73.7924 },
      { name: "Aurangabad", lat: 19.8762, lng: 75.3433 },
      { name: "Hyderabad", lat: 17.385, lng: 78.4867 }
    ]
  };

  const handleGetRoute = () => {
    if (!origin.trim() || !destination.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setRouteData(mockRouteData);
      setIsLoading(false);
    }, 1500);
  };

  // Initialize map placeholder
  useEffect(() => {
    if (mapRef.current && routeData) {
      // In a real implementation, this would initialize the map
      // For now, we'll just show a placeholder
    }
  }, [routeData]);

  // Features data
  const features = [
    {
      icon: <Navigation className="h-8 w-8 text-indigo-600" />,
      title: "Route Optimization",
      description: "Find the most efficient paths between cities"
    },
    {
      icon: <Clock className="h-8 w-8 text-indigo-600" />,
      title: "Real-time Traffic",
      description: "Up-to-date traffic conditions and delays"
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "Multi-user Planning",
      description: "Coordinate routes for teams and fleets"
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Safety Analysis",
      description: "Identify high-risk zones and safer routes"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                India's Smart <span className="text-indigo-600">Traffic</span> Solution
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl">
                Plan, visualize, and optimize routes across India with real-time traffic data and predictive analytics.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8 py-6 text-lg">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                  View Demo
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-500 rounded-full opacity-20"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="font-medium">Mumbai</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Delhi</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="relative h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl overflow-hidden">
                    {/* Mock map visualization */}
                    <div className="absolute inset-0">
                      {/* India outline */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4/5 h-4/5 bg-indigo-200 rounded-full opacity-30"></div>
                      </div>
                      
                      {/* Route line */}
                      <svg className="absolute inset-0 w-full h-full">
                        <path
                          d="M 80 200 Q 150 150, 250 180 T 400 100"
                          stroke="#4f46e5"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray="10,5"
                        />
                      </svg>
                      
                      {/* Waypoints */}
                      <div className="absolute w-6 h-6 bg-indigo-600 rounded-full border-4 border-white shadow-lg" style={{ left: '15%', top: '65%' }}></div>
                      <div className="absolute w-6 h-6 bg-indigo-600 rounded-full border-4 border-white shadow-lg" style={{ left: '75%', top: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="bg-indigo-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-indigo-700">450 km</div>
                      <div className="text-sm text-gray-600">Distance</div>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-indigo-700">8h 15m</div>
                      <div className="text-sm text-gray-600">Duration</div>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-indigo-700">3</div>
                      <div className="text-sm text-gray-600">Tolls</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Powerful Traffic Solutions</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to plan, analyze, and optimize traffic routes across India
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-6 border border-gray-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="w-14 h-14 rounded-lg bg-indigo-100 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Route Planner Section */}
      <div className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Plan Your Route</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Enter your origin and destination to visualize the optimal route
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-indigo-600" />
                  Route Planner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="origin"
                        placeholder="Enter starting city"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="destination"
                        placeholder="Enter destination city"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleGetRoute} 
                  disabled={isLoading || !origin.trim() || !destination.trim()}
                  className="w-full py-6 text-lg"
                >
                  {isLoading ? "Calculating Route..." : "Get Route"}
                </Button>

                {routeData && (
                  <motion.div 
                    className="mt-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="font-semibold text-indigo-800 text-lg mb-3">Route Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-indigo-700">{routeData.distance}</div>
                        <div className="text-gray-600">Distance</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-indigo-700">{routeData.duration}</div>
                        <div className="text-gray-600">Estimated Time</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-indigo-700">{routeData.waypoints.length}</div>
                        <div className="text-gray-600">Major Cities</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-600">500+</div>
              <div className="mt-2 text-gray-600">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-600">10M+</div>
              <div className="mt-2 text-gray-600">Routes Planned</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-600">98%</div>
              <div className="mt-2 text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-600">24/7</div>
              <div className="mt-2 text-gray-600">Real-time Updates</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold">India Traffic Modeler</h3>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Empowering smarter transportation decisions across India with advanced traffic modeling and analytics.
            </p>
            <div className="mt-8 border-t border-gray-800 pt-8">
              <p className="text-gray-400">© 2023 India Traffic Modeler. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
