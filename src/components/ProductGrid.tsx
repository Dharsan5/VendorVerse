import { ShoppingCart, Star, TrendingUp, TrendingDown, Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Product {
  id: string;
  name: string;
  nameHindi: string;
  price: number;
  previousPrice: number;
  unit: string;
  rating: number;
  inStock: boolean;
  category: 'vegetables' | 'fruits' | 'grains' | 'spices';
  emoji: string;
  color: string;
}

interface ProductGridProps {
  language: string;
  onAddToCart: (product: Product) => void;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Onions',
    nameHindi: 'ताज़ा प्याज',
    price: 25,
    previousPrice: 30,
    unit: 'per kg',
    rating: 4.5,
    inStock: true,
    category: 'vegetables',
    emoji: '🧅',
    color: 'bg-purple-100'
  },
  {
    id: '2',
    name: 'Ripe Tomatoes',
    nameHindi: 'पके टमाटर',
    price: 40,
    previousPrice: 35,
    unit: 'per kg',
    rating: 4.2,
    inStock: true,
    category: 'vegetables',
    emoji: '🍅',
    color: 'bg-red-100'
  },
  {
    id: '3',
    name: 'Basmati Rice',
    nameHindi: 'बासमती चावल',
    price: 60,
    previousPrice: 60,
    unit: 'per kg',
    rating: 4.8,
    inStock: true,
    category: 'grains',
    emoji: '🍚',
    color: 'bg-yellow-100'
  },
  {
    id: '4',
    name: 'Farm Potatoes',
    nameHindi: 'खेत के आलू',
    price: 20,
    previousPrice: 22,
    unit: 'per kg',
    rating: 4.3,
    inStock: true,
    category: 'vegetables',
    emoji: '🥔',
    color: 'bg-amber-100'
  },
  {
    id: '5',
    name: 'Green Apples',
    nameHindi: 'हरे सेब',
    price: 120,
    previousPrice: 110,
    unit: 'per kg',
    rating: 4.6,
    inStock: true,
    category: 'fruits',
    emoji: '🍏',
    color: 'bg-green-100'
  },
  {
    id: '6',
    name: 'Fresh Bananas',
    nameHindi: 'ताज़े केले',
    price: 50,
    previousPrice: 55,
    unit: 'per dozen',
    rating: 4.4,
    inStock: false,
    category: 'fruits',
    emoji: '🍌',
    color: 'bg-yellow-100'
  }
];

export default function ProductGrid({ language, onAddToCart }: ProductGridProps) {
  const getProductName = (product: Product) => {
    return language === 'hi' ? product.nameHindi : product.name;
  };

  const getPriceChange = (current: number, previous: number) => {
    if (current > previous) {
      return { type: 'increase', percentage: ((current - previous) / previous * 100).toFixed(1) };
    } else if (current < previous) {
      return { type: 'decrease', percentage: ((previous - current) / previous * 100).toFixed(1) };
    }
    return { type: 'same', percentage: '0' };
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const priceChange = getPriceChange(product.price, product.previousPrice);
        
        return (
          <Card key={product.id} className={`group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${product.color}`}>
            <div className="relative overflow-hidden p-6">
              {/* Large Emoji Display */}
              <div className="text-center">
                <div className="text-8xl mb-4">{product.emoji}</div>
              </div>
              
              {/* Price Change Badge */}
              <div className="absolute top-3 left-3">
                {priceChange.type === 'increase' && (
                  <Badge variant="destructive" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +{priceChange.percentage}%
                  </Badge>
                )}
                {priceChange.type === 'decrease' && (
                  <Badge className="bg-green-500 hover:bg-green-600 gap-1">
                    <TrendingDown className="h-3 w-3" />
                    -{priceChange.percentage}%
                  </Badge>
                )}
              </div>

              {/* Wishlist Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className="h-4 w-4" />
              </Button>

              {/* Out of Stock Overlay */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                  <Badge variant="secondary" className="text-white bg-black/50">
                    {language === 'hi' ? 'स्टॉक में नहीं' : 'Out of Stock'}
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg text-foreground line-clamp-1">
                  {getProductName(product)}
                </h3>
                <div className="flex items-center gap-1 ml-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-muted-foreground">{product.rating}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                  <span className="text-sm text-muted-foreground">{product.unit}</span>
                </div>
                {product.previousPrice !== product.price && (
                  <div className="text-sm text-muted-foreground line-through">
                    ₹{product.previousPrice}
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                onClick={() => onAddToCart(product)}
                disabled={!product.inStock}
                className="w-full gap-2"
                variant={product.inStock ? "default" : "secondary"}
              >
                <ShoppingCart className="h-4 w-4" />
                {language === 'hi' ? 'कार्ट में डालें' : 'Add to Cart'}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}