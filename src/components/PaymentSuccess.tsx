import { CheckCircle, Package, Clock, MapPin, Phone, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

interface PaymentSuccessProps {
  cart: CartItem[];
  language: string;
  totalPrice: number;
  onClose: () => void;
}

export default function PaymentSuccess({ cart, language, totalPrice, onClose }: PaymentSuccessProps) {
  const deliveryFee = totalPrice > 500 ? 0 : 40;
  const finalTotal = totalPrice + deliveryFee;
  const orderId = 'VC' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date();
  estimatedDelivery.setHours(estimatedDelivery.getHours() + 24);

  const downloadInvoice = () => {
    // Simulate downloading invoice
    alert(language === 'hi' ? 'चालान डाउनलोड हो रहा है...' : 'Downloading invoice...');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Success Header */}
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">
            {language === 'hi' ? 'भुगतान सफल!' : 'Payment Successful!'}
          </CardTitle>
          <p className="text-muted-foreground">
            {language === 'hi' ? 'आपका ऑर्डर सफलतापूर्वक प्राप्त हुआ है' : 'Your order has been successfully placed'}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Order Details */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-green-800">
                  {language === 'hi' ? 'ऑर्डर आईडी' : 'Order ID'}
                </p>
                <p className="text-green-700 font-mono">{orderId}</p>
              </div>
              <div>
                <p className="font-medium text-green-800">
                  {language === 'hi' ? 'कुल राशि' : 'Total Amount'}
                </p>
                <p className="text-green-700 font-bold">₹{finalTotal.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-medium text-green-800">
                  {language === 'hi' ? 'भुगतान की स्थिति' : 'Payment Status'}
                </p>
                <Badge className="bg-green-500 hover:bg-green-600">
                  {language === 'hi' ? 'पूर्ण' : 'Completed'}
                </Badge>
              </div>
              <div>
                <p className="font-medium text-green-800">
                  {language === 'hi' ? 'अनुमानित डिलीवरी' : 'Estimated Delivery'}
                </p>
                <p className="text-green-700">
                  {estimatedDelivery.toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              {language === 'hi' ? 'ऑर्डर किए गए आइटम' : 'Ordered Items'}
            </h3>
            <div className="space-y-3">
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
                      {item.quantity} × ₹{item.price} {item.unit}
                    </p>
                  </div>
                  <div className="font-semibold text-sm">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Delivery Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm">
                  {language === 'hi' ? 'पैकिंग' : 'Packing'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {language === 'hi' ? '2-4 घंटे में' : 'Within 2-4 hours'}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-4">
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm">
                  {language === 'hi' ? 'तैयार' : 'Ready'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {language === 'hi' ? '4-6 घंटे में' : 'Within 4-6 hours'}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-4">
                <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm">
                  {language === 'hi' ? 'डिलीवरी' : 'Delivered'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {language === 'hi' ? '24 घंटे में' : 'Within 24 hours'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium text-blue-800">
                {language === 'hi' ? 'सहायता की आवश्यकता है?' : 'Need Help?'}
              </h4>
            </div>
            <p className="text-blue-700 text-sm mb-2">
              {language === 'hi'
                ? 'किसी भी सहायता के लिए हमसे संपर्क करें:'
                : 'Contact us for any assistance:'
              }
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium text-blue-800">
                  {language === 'hi' ? 'फ़ोन:' : 'Phone:'}
                </span>
                <span className="text-blue-700"> +91 98765 43210</span>
              </div>
              <div>
                <span className="font-medium text-blue-800">
                  {language === 'hi' ? 'ईमेल:' : 'Email:'}
                </span>
                <span className="text-blue-700"> support@vendorconnect.com</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={downloadInvoice}
              variant="outline"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {language === 'hi' ? 'चालान डाउनलोड करें' : 'Download Invoice'}
            </Button>
            <Button
              onClick={onClose}
              className="gap-2"
            >
              {language === 'hi' ? 'होमपेज पर वापस जाएं' : 'Continue Shopping'}
            </Button>
          </div>

          {/* Thank You Message */}
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              {language === 'hi'
                ? 'VendorConnect चुनने के लिए धन्यवाद! जल्द ही आपसे मिलते हैं।'
                : 'Thank you for choosing VendorConnect! See you again soon.'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
