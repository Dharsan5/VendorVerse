import { X, Plus, Minus, ShoppingBag, CreditCard, Truck, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

interface CartProps {
  cart: CartItem[];
  language: string;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  totalPrice: number;
  onProceedToPayment: () => void;
}

export default function Cart({ cart, language, onClose, onUpdateQuantity, totalPrice, onProceedToPayment }: CartProps) {
  const getProductName = (product: CartItem) => {
    return language === 'hi' ? product.nameHindi : product.name;
  };

  const deliveryFee = totalPrice > 500 ? 0 : 40;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">
                {language === 'hi' ? 'आपका कार्ट' : 'Your Cart'}
              </CardTitle>
              <Badge variant="secondary" className="mt-1">
                {cart.length} {language === 'hi' ? 'आइटम' : 'items'}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        {/* Cart Items */}
        <CardContent className="space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                {language === 'hi' ? 'आपका कार्ट खाली है' : 'Your cart is empty'}
              </p>
            </div>
          ) : (
            <>
              <div className="max-h-64 overflow-y-auto space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">
                        {getProductName(item)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ₹{item.price} {item.unit}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-semibold min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <div className="font-bold text-primary">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>{language === 'hi' ? 'उप-योग' : 'Subtotal'}</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    {language === 'hi' ? 'डिलीवरी शुल्क' : 'Delivery Fee'}
                    {totalPrice > 500 && (
                      <Badge variant="secondary" className="text-xs">
                        {language === 'hi' ? 'मुफ्त' : 'Free'}
                      </Badge>
                    )}
                  </span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>{language === 'hi' ? 'कुल योग' : 'Total'}</span>
                  <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Free Delivery Message */}
              {totalPrice < 500 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-yellow-600" />
                    <p className="text-yellow-800 text-sm">
                      {language === 'hi'
                        ? `₹${(500 - totalPrice).toFixed(2)} और खरीदें और मुफ्त डिलीवरी पाएं!`
                        : `Add ₹${(500 - totalPrice).toFixed(2)} more for free delivery!`
                      }
                    </p>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <Button className="w-full gap-2" size="lg" onClick={onProceedToPayment}>
                <CreditCard className="h-5 w-5" />
                {language === 'hi' ? 'चेकआउट करें' : 'Proceed to Checkout'}
              </Button>

              {/* Security Message */}
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>{language === 'hi' ? 'सुरक्षित भुगतान' : 'Secure Payment'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="h-4 w-4" />
                  <span>{language === 'hi' ? 'तेज़ डिलीवरी' : 'Fast Delivery'}</span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}