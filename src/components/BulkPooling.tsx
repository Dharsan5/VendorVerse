import { useState } from 'react';
import { Users, MapPin, Target, Clock, UserPlus, Package, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface BulkPool {
  id: string;
  productName: string;
  productNameHindi: string;
  targetQuantity: number;
  currentQuantity: number;
  targetPrice: number;
  currentPrice: number;
  savings: number;
  endTime: Date;
  location: string;
  participants: number;
  maxParticipants: number;
  myContribution: number;
  isJoined: boolean;
}

interface BulkPoolingProps {
  language: string;
}

export default function BulkPooling({ language }: BulkPoolingProps) {
  const [pools, setPools] = useState<BulkPool[]>([
    {
      id: '1',
      productName: 'Premium Onions',
      productNameHindi: 'प्रीमियम प्याज',
      targetQuantity: 100,
      currentQuantity: 75,
      targetPrice: 22,
      currentPrice: 25,
      savings: 300,
      endTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      location: 'Sector 21, Gurgaon',
      participants: 8,
      maxParticipants: 12,
      myContribution: 10,
      isJoined: true
    },
    {
      id: '2',
      productName: 'Fresh Tomatoes',
      productNameHindi: 'ताज़े टमाटर',
      targetQuantity: 80,
      currentQuantity: 45,
      targetPrice: 35,
      currentPrice: 40,
      savings: 400,
      endTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      location: 'Market Area, Delhi',
      participants: 6,
      maxParticipants: 10,
      myContribution: 0,
      isJoined: false
    },
    {
      id: '3',
      productName: 'Basmati Rice',
      productNameHindi: 'बासमती चावल',
      targetQuantity: 200,
      currentQuantity: 180,
      targetPrice: 55,
      currentPrice: 60,
      savings: 1000,
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      location: 'Karol Bagh, Delhi',
      participants: 15,
      maxParticipants: 20,
      myContribution: 0,
      isJoined: false
    }
  ]);

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedPool, setSelectedPool] = useState<BulkPool | null>(null);
  const [contribution, setContribution] = useState('');

  const getProductName = (pool: BulkPool) => {
    return language === 'hi' ? pool.productNameHindi : pool.productName;
  };

  const getProgress = (pool: BulkPool) => {
    return (pool.currentQuantity / pool.targetQuantity) * 100;
  };

  const getTimeRemaining = (endTime: Date) => {
    const now = new Date();
    const diffMs = endTime.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return language === 'hi' ? `${diffHours} घंटे ${diffMinutes} मिनट` : `${diffHours}h ${diffMinutes}m`;
    }
    return language === 'hi' ? `${diffMinutes} मिनट` : `${diffMinutes}m`;
  };

  const joinPool = () => {
    if (selectedPool && contribution) {
      const contributionNum = parseInt(contribution);
      const updatedPools = pools.map(pool => {
        if (pool.id === selectedPool.id) {
          return {
            ...pool,
            currentQuantity: pool.currentQuantity + contributionNum,
            participants: pool.participants + 1,
            myContribution: contributionNum,
            isJoined: true
          };
        }
        return pool;
      });
      
      setPools(updatedPools);
      setShowJoinModal(false);
      setSelectedPool(null);
      setContribution('');
    }
  };

  const leavePool = (poolId: string) => {
    const updatedPools = pools.map(pool => {
      if (pool.id === poolId) {
        return {
          ...pool,
          currentQuantity: pool.currentQuantity - pool.myContribution,
          participants: pool.participants - 1,
          myContribution: 0,
          isJoined: false
        };
      }
      return pool;
    });
    setPools(updatedPools);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 p-6 text-white">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-white text-2xl">
                  {language === 'hi' ? 'ग्रुप खरीदारी' : 'Group Buying'}
                </CardTitle>
                <p className="text-white/80">
                  {language === 'hi' 
                    ? 'अन्य विक्रेताओं के साथ मिलकर बेहतर दाम पाएं'
                    : 'Join with other vendors for better prices'
                  }
                </p>
              </div>
            </div>
          </CardHeader>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{pools.filter(p => p.isJoined).length}</div>
              <div className="text-sm opacity-90">
                {language === 'hi' ? 'शामिल ग्रुप' : 'Joined Groups'}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">₹{pools.filter(p => p.isJoined).reduce((sum, p) => sum + p.savings, 0)}</div>
              <div className="text-sm opacity-90">
                {language === 'hi' ? 'संभावित बचत' : 'Potential Savings'}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{pools.length}</div>
              <div className="text-sm opacity-90">
                {language === 'hi' ? 'उपलब्ध ग्रुप' : 'Available Groups'}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">2.5km</div>
              <div className="text-sm opacity-90">
                {language === 'hi' ? 'औसत दूरी' : 'Avg Distance'}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Active Pools */}
      <div className="space-y-4">
        {pools.map((pool) => {
          const progress = getProgress(pool);
          const isCompleted = progress >= 100;
          const timeRemaining = getTimeRemaining(pool.endTime);
          
          return (
            <Card key={pool.id} className={`overflow-hidden ${pool.isJoined ? 'ring-2 ring-green-500' : ''}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{getProductName(pool)}</CardTitle>
                      {pool.isJoined && (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          {language === 'hi' ? '✓ शामिल' : '✓ Joined'}
                        </Badge>
                      )}
                      {isCompleted && (
                        <Badge className="bg-blue-500 hover:bg-blue-600">
                          {language === 'hi' ? '🎯 पूर्ण' : '🎯 Complete'}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {pool.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {timeRemaining} {language === 'hi' ? 'बचा है' : 'left'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">₹{pool.targetPrice}</div>
                    <div className="text-sm text-muted-foreground line-through">₹{pool.currentPrice}</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      {language === 'hi' ? 'प्रगति:' : 'Progress:'} {pool.currentQuantity}kg / {pool.targetQuantity}kg
                    </span>
                    <span className="font-semibold">{progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {pool.participants}/{pool.maxParticipants} {language === 'hi' ? 'सदस्य' : 'members'}
                    </span>
                    <span>
                      {language === 'hi' ? 'बचत:' : 'Savings:'} ₹{pool.savings}
                    </span>
                  </div>
                </div>

                {/* Savings Breakdown */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">
                      {language === 'hi' ? 'बचत का विवरण' : 'Savings Breakdown'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-yellow-700">
                        {language === 'hi' ? 'व्यक्तिगत मूल्य:' : 'Individual Price:'}
                      </span>
                      <div className="font-semibold">₹{pool.currentPrice}/kg</div>
                    </div>
                    <div>
                      <span className="text-yellow-700">
                        {language === 'hi' ? 'ग्रुप मूल्य:' : 'Group Price:'}
                      </span>
                      <div className="font-semibold text-green-600">₹{pool.targetPrice}/kg</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {pool.isJoined ? (
                    <>
                      <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                        <div className="text-green-800 font-medium">
                          {language === 'hi' ? 'आपका योगदान:' : 'Your Contribution:'}
                        </div>
                        <div className="text-green-700 text-lg font-bold">{pool.myContribution}kg</div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => leavePool(pool.id)}
                        className="flex-1"
                      >
                        {language === 'hi' ? 'छोड़ें' : 'Leave Pool'}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        setSelectedPool(pool);
                        setShowJoinModal(true);
                      }}
                      disabled={isCompleted || pool.participants >= pool.maxParticipants}
                      className="flex-1 gap-2"
                    >
                      <UserPlus className="h-4 w-4" />
                      {language === 'hi' ? 'ग्रुप में शामिल हों' : 'Join Pool'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Join Pool Modal */}
      {showJoinModal && selectedPool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>
                {language === 'hi' ? 'ग्रुप में शामिल हों' : 'Join Pool'}
              </CardTitle>
              <p className="text-muted-foreground">
                {getProductName(selectedPool)} - {selectedPool.location}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">
                      {language === 'hi' ? 'लक्ष्य मूल्य:' : 'Target Price:'}
                    </span>
                    <div className="font-bold text-blue-800">₹{selectedPool.targetPrice}/kg</div>
                  </div>
                  <div>
                    <span className="text-blue-700">
                      {language === 'hi' ? 'वर्तमान मूल्य:' : 'Current Price:'}
                    </span>
                    <div className="font-bold text-blue-800 line-through">₹{selectedPool.currentPrice}/kg</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === 'hi' ? 'आप कितना योगदान देना चाहते हैं? (kg)' : 'How much do you want to contribute? (kg)'}
                </label>
                <input
                  type="number"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                  placeholder="10"
                  className="w-full p-2 border rounded-lg"
                  min="1"
                  max={selectedPool.targetQuantity - selectedPool.currentQuantity}
                />
                <p className="text-xs text-muted-foreground">
                  {language === 'hi' ? 'बचा हुआ:' : 'Remaining:'} {selectedPool.targetQuantity - selectedPool.currentQuantity}kg
                </p>
              </div>

              {contribution && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-green-800 font-medium mb-1">
                    {language === 'hi' ? 'आपकी बचत:' : 'Your Savings:'}
                  </div>
                  <div className="text-green-700">
                    ₹{((selectedPool.currentPrice - selectedPool.targetPrice) * parseInt(contribution || '0')).toFixed(2)}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </Button>
                <Button
                  onClick={joinPool}
                  disabled={!contribution || parseInt(contribution) < 1}
                  className="flex-1"
                >
                  {language === 'hi' ? 'शामिल हों' : 'Join Pool'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {language === 'hi' ? 'यह कैसे काम करता है?' : 'How It Works?'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">
                {language === 'hi' ? '1. ग्रुप में शामिल हों' : '1. Join a Pool'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'hi'
                  ? 'अपने क्षेत्र के पास का ग्रुप चुनें और अपना योगदान दें'
                  : 'Choose a pool near your area and add your contribution'
                }
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">
                {language === 'hi' ? '2. लक्ष्य पूरा करें' : '2. Reach Target'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'hi'
                  ? 'जब ग्रुप का लक्ष्य पूरा हो जाए, ऑर्डर अपने आप हो जाएगा'
                  : 'When the pool reaches its target, order is automatically placed'
                }
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">
                {language === 'hi' ? '3. डिलीवरी पाएं' : '3. Get Delivery'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'hi'
                  ? 'बेहतर दाम पर अपना सामान सीधे घर पर पाएं'
                  : 'Receive your goods at better prices directly at your location'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
