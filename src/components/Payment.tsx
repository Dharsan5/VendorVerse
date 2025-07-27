import { useState } from 'react';
import { X, CreditCard, Smartphone, Wallet, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CartItem {
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
  quantity: number;
}

interface PaymentProps {
  cart: CartItem[];
  language: string;
  onClose: () => void;
  totalPrice: number;
  onPaymentSuccess: () => void;
}

export default function Payment({ cart, language, onClose, totalPrice, onPaymentSuccess }: PaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [upiId, setUpiId] = useState('');

  const deliveryFee = totalPrice > 500 ? 0 : 40;
  const finalTotal = totalPrice + deliveryFee;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setExpiryDate(formatted);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate payment success
    setIsProcessing(false);
    onPaymentSuccess();
  };

  const isFormValid = () => {
    if (paymentMethod === 'card') {
      return cardNumber.length >= 19 && expiryDate.length === 5 && cvv.length >= 3 && cardName.trim() !== '';
    } else if (paymentMethod === 'upi') {
      return upiId.includes('@') && upiId.length > 5;
    }
    return true; // For cash on delivery
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">
                {language === 'hi' ? 'सुरक्षित भुगतान' : 'Secure Payment'}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {language === 'hi' ? 'आपकी जानकारी सुरक्षित है' : 'Your information is secure'}
              </p>
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

        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              {language === 'hi' ? 'ऑर्डर सारांश' : 'Order Summary'}
            </h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {language === 'hi' ? item.nameHindi : item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <div className="font-semibold text-sm">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{language === 'hi' ? 'उप-योग' : 'Subtotal'}</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{language === 'hi' ? 'डिलीवरी शुल्क' : 'Delivery Fee'}</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>{language === 'hi' ? 'कुल योग' : 'Total'}</span>
                <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              {language === 'hi' ? 'भुगतान विधि' : 'Payment Method'}
            </h3>

            <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="card" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  {language === 'hi' ? 'कार्ड' : 'Card'}
                </TabsTrigger>
                <TabsTrigger value="upi" className="gap-2">
                  <Smartphone className="h-4 w-4" />
                  UPI
                </TabsTrigger>
                <TabsTrigger value="cod" className="gap-2">
                  <Wallet className="h-4 w-4" />
                  {language === 'hi' ? 'COD' : 'COD'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === 'hi' ? 'कार्ड नंबर' : 'Card Number'}
                    </label>
                    <Input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {language === 'hi' ? 'समाप्ति तिथि' : 'Expiry Date'}
                      </label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={handleExpiryChange}
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">CVV</label>
                      <Input
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === 'hi' ? 'कार्ड धारक का नाम' : 'Cardholder Name'}
                    </label>
                    <Input
                      type="text"
                      placeholder={language === 'hi' ? 'आपका नाम' : 'Your Name'}
                      value={cardName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardName(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="upi" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === 'hi' ? 'UPI ID' : 'UPI ID'}
                    </label>
                    <Input
                      type="text"
                      placeholder="yourname@paytm"
                      value={upiId}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpiId(e.target.value)}
                    />
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-blue-600" />
                      <p className="text-blue-800 text-sm">
                        {language === 'hi'
                          ? 'आप अपने UPI ऐप से भुगतान की पुष्टि कर सकेंगे'
                          : 'You will be able to confirm payment from your UPI app'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cod" className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">
                        {language === 'hi' ? 'डिलीवरी पर भुगतान' : 'Cash on Delivery'}
                      </p>
                      <p className="text-yellow-700 text-sm mt-1">
                        {language === 'hi'
                          ? 'डिलीवरी के समय नकद भुगतान करें। ₹20 अतिरिक्त शुल्क लागू।'
                          : 'Pay with cash when your order is delivered. ₹20 additional charge applies.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
              <Lock className="h-4 w-4" />
              <span>{language === 'hi' ? '256-बिट SSL एन्क्रिप्शन द्वारा सुरक्षित' : 'Secured by 256-bit SSL encryption'}</span>
            </div>

            {/* Pay Button */}
            <Button
              onClick={handlePayment}
              disabled={!isFormValid() || isProcessing}
              className="w-full gap-2"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {language === 'hi' ? 'प्रसंस्करण...' : 'Processing...'}
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  {language === 'hi' ? `₹${finalTotal.toFixed(2)} का भुगतान करें` : `Pay ₹${finalTotal.toFixed(2)}`}
                </>
              )}
            </Button>

            {/* Payment Methods Accepted */}
            <div className="text-center text-xs text-muted-foreground">
              {language === 'hi' ? 'स्वीकृत भुगतान विधियां:' : 'Accepted payment methods:'} Visa, Mastercard, RuPay, UPI, Paytm, PhonePe
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
