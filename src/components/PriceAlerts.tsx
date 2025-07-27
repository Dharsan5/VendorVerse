import { useState } from 'react';
import { Bell, MessageSquare, Smartphone, Settings, Plus, X, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PriceAlert {
  id: string;
  productName: string;
  productNameHindi: string;
  currentPrice: number;
  targetPrice: number;
  alertType: 'above' | 'below';
  method: 'whatsapp' | 'sms' | 'both';
  isActive: boolean;
}

interface PriceAlertsProps {
  language: string;
}

export default function PriceAlerts({ language }: PriceAlertsProps) {
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: '1',
      productName: 'Onions',
      productNameHindi: 'प्याज',
      currentPrice: 25,
      targetPrice: 20,
      alertType: 'below',
      method: 'whatsapp',
      isActive: true
    },
    {
      id: '2',
      productName: 'Tomatoes',
      productNameHindi: 'टमाटर',
      currentPrice: 40,
      targetPrice: 50,
      alertType: 'above',
      method: 'both',
      isActive: true
    }
  ]);

  const [showAddAlert, setShowAddAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    productName: '',
    targetPrice: '',
    alertType: 'below' as 'above' | 'below',
    method: 'whatsapp' as 'whatsapp' | 'sms' | 'both'
  });

  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [notificationSettings, setNotificationSettings] = useState({
    dailyUpdates: true,
    priceDrops: true,
    newDeals: true,
    weeklyReport: false
  });

  const addAlert = () => {
    if (newAlert.productName && newAlert.targetPrice) {
      const alert: PriceAlert = {
        id: Date.now().toString(),
        productName: newAlert.productName,
        productNameHindi: newAlert.productName, // In real app, this would be translated
        currentPrice: Math.floor(Math.random() * 50) + 10, // Mock current price
        targetPrice: parseFloat(newAlert.targetPrice),
        alertType: newAlert.alertType,
        method: newAlert.method,
        isActive: true
      };
      
      setAlerts([...alerts, alert]);
      setNewAlert({
        productName: '',
        targetPrice: '',
        alertType: 'below',
        method: 'whatsapp'
      });
      setShowAddAlert(false);
    }
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getProductName = (alert: PriceAlert) => {
    return language === 'hi' ? alert.productNameHindi : alert.productName;
  };

  const sendTestAlert = () => {
    alert(language === 'hi' 
      ? 'टेस्ट अलर्ट भेजा गया! आपको जल्द ही सूचना मिलेगी।'
      : 'Test alert sent! You will receive notification shortly.'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Bell className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-white text-2xl">
                  {language === 'hi' ? 'प्राइस अलर्ट' : 'Price Alerts'}
                </CardTitle>
                <p className="text-white/80">
                  {language === 'hi' 
                    ? 'दैनिक मूल्य अपडेट WhatsApp या SMS पर पाएं'
                    : 'Get daily price updates via WhatsApp or SMS'
                  }
                </p>
              </div>
            </div>
          </CardHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{alerts.filter(a => a.isActive).length}</div>
              <div className="text-sm opacity-90">
                {language === 'hi' ? 'सक्रिय अलर्ट' : 'Active Alerts'}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">₹18</div>
              <div className="text-sm opacity-90">
                {language === 'hi' ? 'आज की बचत' : 'Today\'s Savings'}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm opacity-90">
                {language === 'hi' ? 'मिले अलर्ट' : 'Alerts Received'}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Phone Number Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            {language === 'hi' ? 'सूचना सेटिंग्स' : 'Notification Settings'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === 'hi' ? 'WhatsApp नंबर' : 'WhatsApp Number'}
              </label>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={sendTestAlert} variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                {language === 'hi' ? 'टेस्ट अलर्ट भेजें' : 'Send Test Alert'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notificationSettings.dailyUpdates}
                onChange={(e) => setNotificationSettings({
                  ...notificationSettings,
                  dailyUpdates: e.target.checked
                })}
                className="rounded"
              />
              <span className="text-sm">
                {language === 'hi' ? 'दैनिक मूल्य अपडेट' : 'Daily Price Updates'}
              </span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notificationSettings.priceDrops}
                onChange={(e) => setNotificationSettings({
                  ...notificationSettings,
                  priceDrops: e.target.checked
                })}
                className="rounded"
              />
              <span className="text-sm">
                {language === 'hi' ? 'मूल्य गिरावट' : 'Price Drops'}
              </span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notificationSettings.newDeals}
                onChange={(e) => setNotificationSettings({
                  ...notificationSettings,
                  newDeals: e.target.checked
                })}
                className="rounded"
              />
              <span className="text-sm">
                {language === 'hi' ? 'नए ऑफर' : 'New Deals'}
              </span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notificationSettings.weeklyReport}
                onChange={(e) => setNotificationSettings({
                  ...notificationSettings,
                  weeklyReport: e.target.checked
                })}
                className="rounded"
              />
              <span className="text-sm">
                {language === 'hi' ? 'साप्ताहिक रिपोर्ट' : 'Weekly Report'}
              </span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              {language === 'hi' ? 'आपके अलर्ट' : 'Your Alerts'}
            </CardTitle>
            <Button
              onClick={() => setShowAddAlert(true)}
              size="sm"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              {language === 'hi' ? 'नया अलर्ट' : 'Add Alert'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold">{getProductName(alert)}</h4>
                  <Badge variant={alert.isActive ? "default" : "secondary"}>
                    {alert.isActive 
                      ? (language === 'hi' ? 'सक्रिय' : 'Active')
                      : (language === 'hi' ? 'निष्क्रिय' : 'Inactive')
                    }
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    {alert.alertType === 'below' ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                    {alert.alertType === 'below' 
                      ? (language === 'hi' ? 'नीचे' : 'Below')
                      : (language === 'hi' ? 'ऊपर' : 'Above')
                    } ₹{alert.targetPrice}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {language === 'hi' ? 'वर्तमान मूल्य:' : 'Current Price:'} ₹{alert.currentPrice} | 
                  {language === 'hi' ? ' सूचना:' : ' Notify via:'} {alert.method === 'both' ? 'WhatsApp + SMS' : alert.method}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleAlert(alert.id)}
                >
                  {alert.isActive 
                    ? (language === 'hi' ? 'रोकें' : 'Pause')
                    : (language === 'hi' ? 'शुरू करें' : 'Start')
                  }
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAlert(alert.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add New Alert Modal */}
      {showAddAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {language === 'hi' ? 'नया प्राइस अलर्ट' : 'New Price Alert'}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddAlert(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === 'hi' ? 'उत्पाद का नाम' : 'Product Name'}
                </label>
                <Input
                  type="text"
                  value={newAlert.productName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewAlert({...newAlert, productName: e.target.value})}
                  placeholder={language === 'hi' ? 'जैसे: प्याज, टमाटर' : 'e.g., Onions, Tomatoes'}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === 'hi' ? 'लक्ष्य मूल्य (₹)' : 'Target Price (₹)'}
                </label>
                <Input
                  type="number"
                  value={newAlert.targetPrice}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewAlert({...newAlert, targetPrice: e.target.value})}
                  placeholder="25"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === 'hi' ? 'अलर्ट का प्रकार' : 'Alert Type'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={newAlert.alertType === 'below' ? 'default' : 'outline'}
                    onClick={() => setNewAlert({...newAlert, alertType: 'below'})}
                    className="gap-2"
                  >
                    <TrendingDown className="h-4 w-4" />
                    {language === 'hi' ? 'नीचे जाने पर' : 'Price Drops'}
                  </Button>
                  <Button
                    variant={newAlert.alertType === 'above' ? 'default' : 'outline'}
                    onClick={() => setNewAlert({...newAlert, alertType: 'above'})}
                    className="gap-2"
                  >
                    <TrendingUp className="h-4 w-4" />
                    {language === 'hi' ? 'ऊपर जाने पर' : 'Price Rises'}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === 'hi' ? 'सूचना का तरीका' : 'Notification Method'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={newAlert.method === 'whatsapp' ? 'default' : 'outline'}
                    onClick={() => setNewAlert({...newAlert, method: 'whatsapp'})}
                    size="sm"
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant={newAlert.method === 'sms' ? 'default' : 'outline'}
                    onClick={() => setNewAlert({...newAlert, method: 'sms'})}
                    size="sm"
                  >
                    SMS
                  </Button>
                  <Button
                    variant={newAlert.method === 'both' ? 'default' : 'outline'}
                    onClick={() => setNewAlert({...newAlert, method: 'both'})}
                    size="sm"
                  >
                    {language === 'hi' ? 'दोनों' : 'Both'}
                  </Button>
                </div>
              </div>

              <Button onClick={addAlert} className="w-full">
                {language === 'hi' ? 'अलर्ट बनाएं' : 'Create Alert'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sample Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {language === 'hi' ? 'नमूना संदेश' : 'Sample Messages'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-medium text-green-800 mb-2">
              {language === 'hi' ? 'दैनिक मूल्य अपडेट:' : 'Daily Price Update:'}
            </p>
            <p className="text-green-700 text-sm">
              {language === 'hi' 
                ? "🌅 शुभ प्रभात! आज के भाव:\n🧅 प्याज: ₹22 (-₹3)\n🍅 टमाटर: ₹38 (+₹2)\n🥔 आलू: ₹18 (-₹2)\n\n💰 आज बचत के अवसर देखें!"
                : "🌅 Good Morning! Today's Prices:\n🧅 Onions: ₹22 (-₹3)\n🍅 Tomatoes: ₹38 (+₹2)\n🥔 Potatoes: ₹18 (-₹2)\n\n💰 See today's savings opportunities!"
              }
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm font-medium text-orange-800 mb-2">
              {language === 'hi' ? 'प्राइस अलर्ट:' : 'Price Alert:'}
            </p>
            <p className="text-orange-700 text-sm">
              {language === 'hi'
                ? "🚨 अलर्ट: प्याज का भाव ₹20 तक गिर गया है!\n\nअभी ऑर्डर करें और बचत करें। VendorConnect पर देखें।"
                : "🚨 Alert: Onion prices have dropped to ₹20!\n\nOrder now and save money. Check VendorConnect app."
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
