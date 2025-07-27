import { useState, useEffect } from 'react';
import Header from './components/Header';
import VoiceOrdering from './components/VoiceOrdering';
import ProductGrid from './components/ProductGrid';
import VisualProductGrid from './components/VisualProductGrid';
import BulkOrdering from './components/BulkOrdering';
import PriceAlerts from './components/PriceAlerts';
import Cart from './components/Cart';
import Payment from './components/Payment';
import PaymentSuccess from './components/PaymentSuccess';
import { ShoppingCart, Package, Mic, Grid3X3, Bell, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  nameHindi: string;
  image: string;
  price: number;
  previousPrice: number;
  unit: string;
  rating: number;
  inStock: boolean;
  category: 'vegetables' | 'fruits' | 'grains' | 'spices';
}

interface CartItem extends Product {
  quantity: number;
}

function App() {
  const [language, setLanguage] = useState('en');
  const [isOnline, setIsOnline] = useState(true);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  // Simulate online/offline status
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% chance of being online
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleProceedToPayment = () => {
    setShowCart(false);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setShowPaymentSuccess(true);
    setCart([]); // Clear cart after successful payment
  };

  const handleClosePaymentSuccess = () => {
    setShowPaymentSuccess(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        language={language}
        setLanguage={setLanguage}
        isOnline={isOnline}
        hasNotifications={hasNotifications}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {language === 'hi' ? 'स्वागत है VendorConnect में' : 'Welcome to VendorConnect'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'hi' 
              ? 'ताज़ा और गुणवत्तापूर्ण उत्पाद, आपकी भाषा में'
              : 'Fresh & quality products, in your language'
            }
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="products" className="gap-2">
              <Grid3X3 className="h-4 w-4" />
              {language === 'hi' ? 'उत्पाद' : 'Products'}
            </TabsTrigger>
            <TabsTrigger value="visual" className="gap-2">
              <Eye className="h-4 w-4" />
              {language === 'hi' ? 'विज़ुअल' : 'Visual'}
            </TabsTrigger>
            <TabsTrigger value="voice" className="gap-2">
              <Mic className="h-4 w-4" />
              {language === 'hi' ? 'आवाज़' : 'Voice'}
            </TabsTrigger>
            <TabsTrigger value="bulk" className="gap-2">
              <Package className="h-4 w-4" />
              {language === 'hi' ? 'थोक' : 'Bulk'}
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2">
              <Bell className="h-4 w-4" />
              {language === 'hi' ? 'अलर्ट' : 'Alerts'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">
                  {language === 'hi' ? 'सभी उत्पाद' : 'All Products'}
                </h2>
                <p className="text-muted-foreground">
                  {language === 'hi' ? 'ताज़ा और गुणवत्तापूर्ण उत्पाद' : 'Fresh & quality products'}
                </p>
              </div>
            </div>
            <ProductGrid language={language} onAddToCart={addToCart} />
          </TabsContent>

          <TabsContent value="visual">
            <VisualProductGrid 
              language={language} 
              onAddToCart={(product, quantity) => {
                for (let i = 0; i < quantity; i++) {
                  addToCart(product);
                }
              }} 
            />
          </TabsContent>

          <TabsContent value="voice">
            <VoiceOrdering language={language} />
          </TabsContent>

          <TabsContent value="bulk">
            <BulkOrdering onAddToCart={(product, quantity) => {
              for (let i = 0; i < quantity; i++) {
                addToCart(product);
              }
            }} />
          </TabsContent>

          <TabsContent value="alerts">
            <PriceAlerts language={language} />
          </TabsContent>
        </Tabs>

        {/* Floating Cart Button */}
        {getTotalItems() > 0 && (
          <Button
            onClick={() => setShowCart(true)}
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40"
            size="icon"
          >
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {getTotalItems()}
              </Badge>
            </div>
          </Button>
        )}

        {/* Cart Modal */}
        {showCart && (
          <Cart
            cart={cart}
            language={language}
            onClose={() => setShowCart(false)}
            onUpdateQuantity={updateCartQuantity}
            totalPrice={getTotalPrice()}
            onProceedToPayment={handleProceedToPayment}
          />
        )}

        {/* Payment Modal */}
        {showPayment && (
          <Payment
            cart={cart}
            language={language}
            onClose={() => setShowPayment(false)}
            totalPrice={getTotalPrice()}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {/* Payment Success Modal */}
        {showPaymentSuccess && (
          <PaymentSuccess
            cart={cart}
            language={language}
            totalPrice={getTotalPrice()}
            onClose={handleClosePaymentSuccess}
          />
        )}
      </main>
    </div>
  );
}

export default App;