import { useState } from 'react';
import { ShoppingCart, Volume2, Heart, Plus, Minus } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Product {
  id: string;
  name: string;
  nameHindi: string;
  nameTamil: string;
  price: number;
  previousPrice: number;
  unit: string;
  rating: number;
  inStock: boolean;
  category: 'vegetables' | 'fruits' | 'grains' | 'spices';
  emoji: string;
  color: string;
}

interface VisualProductGridProps {
  language: string;
  onAddToCart: (product: Product, quantity: number) => void;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Onions',
    nameHindi: 'ताज़ा प्याज',
    nameTamil: 'வெங்காயம்',
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
    nameTamil: 'தக்காளி',
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
    nameTamil: 'பாஸ்மதி அரிசி',
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
    nameTamil: 'உருளைக்கிழங்கு',
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
    nameTamil: 'பச்சை ஆப்பிள்',
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
    nameTamil: 'வாழைப்பழம்',
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

export default function VisualProductGrid({ language, onAddToCart }: VisualProductGridProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const getProductName = (product: Product) => {
    if (language === 'hi') return product.nameHindi;
    if (language === 'ta') return product.nameTamil;
    return product.name;
  };

  const updateQuantity = (productId: string, change: number) => {
    const currentQty = quantities[productId] || 0;
    const newQty = Math.max(0, currentQty + change);
    setQuantities({ ...quantities, [productId]: newQty });
  };

  const addToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    onAddToCart(product, quantity);
    setQuantities({ ...quantities, [product.id]: 0 });
  };

  const playProductName = async (product: Product) => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(null);
      return;
    }

    try {
      setIsPlaying(product.id);
      const utterance = new SpeechSynthesisUtterance(getProductName(product));
      
      // Set language based on current language
      switch (language) {
        case 'hi':
          utterance.lang = 'hi-IN';
          break;
        case 'ta':
          utterance.lang = 'ta-IN';
          break;
        default:
          utterance.lang = 'en-IN';
      }
      
      // Configure speech settings
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Handle speech end
      utterance.onend = () => setIsPlaying(null);
      utterance.onerror = () => setIsPlaying(null);
      
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsPlaying(null);
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'vegetables': return '🥬';
      case 'fruits': return '🍎';
      case 'grains': return '🌾';
      case 'spices': return '🌶️';
      default: return '🛒';
    }
  };

  const categoryLabels = {
    vegetables: { en: 'Vegetables', hi: 'सब्जियां', ta: 'காய்கறிகள்' },
    fruits: { en: 'Fruits', hi: 'फल', ta: 'பழங்கள்' },
    grains: { en: 'Grains', hi: 'अनाज', ta: 'தானியங்கள்' },
    spices: { en: 'Spices', hi: 'मसाले', ta: 'மசால்' }
  };

  const getCategoryLabel = (category: string) => {
    return categoryLabels[category as keyof typeof categoryLabels]?.[language as keyof typeof categoryLabels.vegetables] || category;
  };

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="space-y-8">
      {/* Header with Visual Navigation */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
          <span className="text-4xl">🛒</span>
          {language === 'hi' ? 'विज़ुअल शॉपिंग' : language === 'ta' ? 'காட்சி கடை' : 'Visual Shopping'}
        </h2>
        <p className="text-muted-foreground flex items-center justify-center gap-2">
          <Volume2 className="h-4 w-4" />
          {language === 'hi' 
            ? 'छवियों और आवाज़ के साथ आसान खरीदारी'
            : language === 'ta'
            ? 'படங்கள் மற்றும் ஒலியுடன் எளிய கொள்முதல்'
            : 'Easy shopping with images and voice'
          }
        </p>
      </div>

      {/* Category-wise Product Display */}
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <div key={category} className="space-y-4">
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">{getCategoryEmoji(category)}</div>
            <div>
              <h3 className="text-2xl font-bold">{getCategoryLabel(category)}</h3>
              <Badge variant="outline" className="mt-1">
                {categoryProducts.length} {language === 'hi' ? 'आइटम' : language === 'ta' ? 'உருப்படிகள்' : 'items'}
              </Badge>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categoryProducts.map((product) => {
              const quantity = quantities[product.id] || 0;
              
              return (
                <Card key={product.id} className={`group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${product.color}`}>
                  <CardContent className="p-4 text-center space-y-3">
                    {/* Product Emoji Only */}
                    <div className="relative">
                      <div className="text-8xl mb-4">{product.emoji}</div>
                      
                      {/* Out of Stock Overlay */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                          <Badge variant="secondary" className="text-white bg-black/50">
                            {language === 'hi' ? '❌ स्टॉक में नहीं' : language === 'ta' ? '❌ கிடைக்கவில்லை' : '❌ Out of Stock'}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Product Name with Audio */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant={isPlaying === product.id ? "default" : "ghost"}
                          size="icon"
                          onClick={() => playProductName(product)}
                          className="h-8 w-8"
                        >
                          <Volume2 className={`h-4 w-4 ${isPlaying === product.id ? 'animate-pulse' : ''}`} />
                        </Button>
                        <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500 cursor-pointer transition-colors" />
                      </div>
                      
                      <h3 className="font-semibold text-sm leading-tight">
                        {getProductName(product)}
                      </h3>
                    </div>

                    {/* Price Display */}
                    <div className="space-y-1">
                      <div className="text-xl font-bold text-primary">₹{product.price}</div>
                      <div className="text-xs text-muted-foreground">{product.unit}</div>
                      {product.previousPrice !== product.price && (
                        <div className="text-xs text-muted-foreground line-through">
                          ₹{product.previousPrice}
                        </div>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    {product.inStock && (
                      <div className="space-y-2">
                        {quantity === 0 ? (
                          <Button
                            onClick={() => updateQuantity(product.id, 1)}
                            size="sm"
                            className="w-full gap-1 text-xs"
                          >
                            <Plus className="h-3 w-3" />
                            {language === 'hi' ? 'जोड़ें' : language === 'ta' ? 'சேர்' : 'Add'}
                          </Button>
                        ) : (
                          <>
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(product.id, -1)}
                                className="h-6 w-6"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(product.id, 1)}
                                className="h-6 w-6"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              onClick={() => addToCart(product)}
                              size="sm"
                              className="w-full gap-1 text-xs"
                            >
                              <ShoppingCart className="h-3 w-3" />
                              {language === 'hi' ? 'कार्ट में' : language === 'ta' ? 'கூடையில்' : 'To Cart'}
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Voice Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-4">🎙️</div>
          <h3 className="font-semibold text-blue-800 mb-2">
            {language === 'hi' ? 'आवाज़ से भी ऑर्डर करें!' : language === 'ta' ? 'குரல் மூலமும் ஆர்டர் செய்யுங்கள்!' : 'Order with Voice Too!'}
          </h3>
          <p className="text-blue-700 text-sm">
            {language === 'hi' 
              ? 'माइक बटन दबाएं और कहें: "मुझे 2 किलो प्याज चाहिए"'
              : language === 'ta'
              ? 'மைக் பொத்தானை அழுத்தி சொல்லுங்கள்: "எனக்கு 2 கிலோ வெங்காயம் வேண்டும்"'
              : 'Press mic button and say: "I need 2 kg onions"'
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
