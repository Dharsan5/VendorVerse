import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ShoppingCart, Package, Users, Truck, Plus, Minus } from 'lucide-react';
import BulkPooling from './BulkPooling';

interface Product {
  id: string;
  name: string;
  nameHindi: string;
  price: number;
  previousPrice: number;
  unit: string;
  rating: number;
  inStock: boolean;
  category?: string;
  minQuantity?: number;
  bulkPrice?: number;
  savings?: number;
}

interface BulkOrderingProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const BulkOrdering: React.FC<BulkOrderingProps> = ({ onAddToCart }) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sample bulk products for individual ordering
  const bulkProducts: Product[] = [
    {
      id: '1',
      name: 'Rice (Basmati)',
      nameHindi: 'बासमती चावल',
      price: 150,
      previousPrice: 180,
      unit: 'kg',
      rating: 4.5,
      inStock: true,
      category: 'grains',
      minQuantity: 25,
      bulkPrice: 120,
      savings: 20
    },
    {
      id: '2',
      name: 'Wheat Flour',
      nameHindi: 'गेहूं का आटा',
      price: 40,
      previousPrice: 45,
      unit: 'kg',
      rating: 4.3,
      inStock: true,
      category: 'grains',
      minQuantity: 50,
      bulkPrice: 35,
      savings: 12.5
    },
    {
      id: '3',
      name: 'Sugar',
      nameHindi: 'चीनी',
      price: 45,
      previousPrice: 50,
      unit: 'kg',
      rating: 4.2,
      inStock: true,
      category: 'sweeteners',
      minQuantity: 30,
      bulkPrice: 42,
      savings: 6.7
    },
    {
      id: '4',
      name: 'Cooking Oil',
      nameHindi: 'खाना पकाने का तेल',
      price: 180,
      previousPrice: 200,
      unit: 'liter',
      rating: 4.4,
      inStock: true,
      category: 'oils',
      minQuantity: 20,
      bulkPrice: 165,
      savings: 8.3
    },
    {
      id: '5',
      name: 'Dal (Toor)',
      nameHindi: 'तूर दाल',
      price: 120,
      previousPrice: 140,
      unit: 'kg',
      rating: 4.6,
      inStock: true,
      category: 'pulses',
      minQuantity: 25,
      bulkPrice: 105,
      savings: 12.5
    },
    {
      id: '6',
      name: 'Onions',
      nameHindi: 'प्याज',
      price: 25,
      previousPrice: 30,
      unit: 'kg',
      rating: 4.1,
      inStock: true,
      category: 'vegetables',
      minQuantity: 50,
      bulkPrice: 20,
      savings: 20
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📦' },
    { id: 'grains', name: 'Grains & Cereals', icon: '🌾' },
    { id: 'pulses', name: 'Pulses & Lentils', icon: '🟡' },
    { id: 'oils', name: 'Oils & Ghee', icon: '🫒' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥕' },
    { id: 'sweeteners', name: 'Sugar & Sweeteners', icon: '🍯' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? bulkProducts 
    : bulkProducts.filter(product => product.category === selectedCategory);

  const updateQuantity = (productId: string, change: number) => {
    setQuantities(prev => {
      const product = bulkProducts.find(p => p.id === productId);
      if (!product || !product.minQuantity) return prev;
      
      const currentQuantity = prev[productId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      
      // Ensure minimum quantity for bulk discount
      if (newQuantity > 0 && newQuantity < product.minQuantity) {
        return { ...prev, [productId]: product.minQuantity };
      }
      
      return { ...prev, [productId]: newQuantity };
    });
  };

  const setQuantity = (productId: string, quantity: number) => {
    const product = bulkProducts.find(p => p.id === productId);
    if (!product || !product.minQuantity) return;
    
    if (quantity > 0 && quantity < product.minQuantity) {
      quantity = product.minQuantity;
    }
    
    setQuantities(prev => ({ ...prev, [productId]: quantity }));
  };

  const getEffectivePrice = (product: Product) => {
    const quantity = quantities[product.id] || 0;
    return (quantity >= (product.minQuantity || 0) && product.bulkPrice) ? product.bulkPrice : product.price;
  };

  const getSavings = (product: Product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity >= (product.minQuantity || 0) && product.bulkPrice) {
      return (product.price - product.bulkPrice) * quantity;
    }
    return 0;
  };

  const addToCart = (product: Product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      onAddToCart(product, quantity);
      setQuantities(prev => ({ ...prev, [product.id]: 0 }));
    }
  };

  const totalSavings = filteredProducts.reduce((total, product) => {
    return total + getSavings(product);
  }, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Bulk Ordering System
          </CardTitle>
          <CardDescription>
            Order in bulk quantities for better prices and wholesale rates
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="individual" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Individual Bulk Orders
          </TabsTrigger>
          <TabsTrigger value="pooling" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Group Pooling
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-4">
          {/* Category Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-1"
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Savings Summary */}
          {totalSavings > 0 && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Total Savings: ₹{totalSavings.toFixed(2)}
                    </Badge>
                  </div>
                  <div className="text-sm text-green-700">
                    You're saving money with bulk orders! 💰
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(product => {
              const quantity = quantities[product.id] || 0;
              const effectivePrice = getEffectivePrice(product);
              const savings = getSavings(product);
              const isEligibleForDiscount = quantity >= (product.minQuantity || 0) && product.bulkPrice;

              return (
                <Card key={product.id} className={isEligibleForDiscount ? "border-green-200" : ""}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">📦</div>
                        <div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <CardDescription className="capitalize">
                            {product.category?.replace('_', ' ') || 'General'}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Price Information */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Regular Price:</span>
                        <span className={isEligibleForDiscount ? "line-through text-gray-400" : "font-semibold"}>
                          ₹{product.price}/{product.unit}
                        </span>
                      </div>
                      
                      {isEligibleForDiscount && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-green-600">Bulk Price:</span>
                          <span className="font-semibold text-green-600">
                            ₹{product.bulkPrice}/{product.unit}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Min. Quantity:</span>
                        <Badge variant="outline">{product.minQuantity || 1} {product.unit}</Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Quantity Control */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(product.id, -1)}
                            disabled={quantity === 0}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            value={quantity}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(product.id, parseInt(e.target.value) || 0)}
                            className="w-20 text-center"
                            min="0"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(product.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {quantity > 0 && product.minQuantity && quantity < product.minQuantity && (
                        <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                          Add {product.minQuantity - quantity} more {product.unit} for bulk discount
                        </div>
                      )}

                      {quantity > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Total:</span>
                            <span className="font-semibold">
                              ₹{(effectivePrice * quantity).toFixed(2)}
                            </span>
                          </div>
                          {savings > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                              <span>You Save:</span>
                              <span className="font-semibold">₹{savings.toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => addToCart(product)}
                      disabled={quantity === 0}
                      className="w-full"
                      variant={isEligibleForDiscount ? "default" : "outline"}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bulk Ordering Benefits */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Bulk Ordering Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid gap-2 text-sm text-blue-700">
                <div className="flex items-center gap-2">
                  <span>💰</span> Better wholesale prices for large quantities
                </div>
                <div className="flex items-center gap-2">
                  <span>🚚</span> Free delivery for orders above ₹2000
                </div>
                <div className="flex items-center gap-2">
                  <span>📅</span> Scheduled weekly/monthly deliveries available
                </div>
                <div className="flex items-center gap-2">
                  <span>🤝</span> Direct vendor relationships for better deals
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pooling">
          <BulkPooling language="en" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BulkOrdering;
