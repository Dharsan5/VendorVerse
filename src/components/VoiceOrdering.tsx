import React, { useState } from 'react';
import { Mic, MicOff, Volume2, MessageSquare, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface VoiceOrderingProps {
  language: string;
}

export default function VoiceOrdering({ language }: VoiceOrderingProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const startListening = () => {
    setIsListening(true);
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTranscript('मुझे 10 किलो प्याज और 5 किलो टमाटर चाहिए');
          setIsListening(false);
          setIsProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const stopListening = () => {
    setIsListening(false);
    setIsProcessing(false);
    setProgress(0);
  };

  const playResponse = () => {
    // Simulate audio playback
    alert('Playing response in ' + language);
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-white text-xl">
                    {language === 'hi' ? 'आवाज़ सहायक' : 'Voice Assistant'}
                  </CardTitle>
                  <p className="text-white/80 text-sm">
                    {language === 'hi' ? 'अपनी भाषा में ऑर्डर करें' : 'Order in your language'}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {language === 'hi' ? 'हिंदी' : language === 'ta' ? 'தமிழ்' : 'English'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  size="icon"
                  className={`w-20 h-20 rounded-full transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="h-8 w-8" />
                  ) : (
                    <Mic className="h-8 w-8" />
                  )}
                </Button>
                
                {isListening && (
                  <>
                    <div className="absolute -inset-4 border-4 border-white/50 rounded-full animate-ping"></div>
                    <div className="absolute -inset-8 border-2 border-white/30 rounded-full animate-ping animation-delay-200"></div>
                  </>
                )}
              </div>

              <div className="text-center">
                <p className="text-white/90 font-medium">
                  {isListening 
                    ? (language === 'hi' ? 'सुन रहा हूँ... बोलें' : 'Listening... Speak now')
                    : (language === 'hi' ? 'बोलने के लिए टैप करें' : 'Tap to speak your order')
                  }
                </p>
                <p className="text-white/70 text-sm mt-1">
                  {language === 'hi' ? 'अपनी भाषा में ऑर्डर दें' : 'Order in your preferred language'}
                </p>
              </div>

              {isProcessing && (
                <div className="w-full max-w-sm space-y-3">
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">
                      {language === 'hi' ? 'आपकी आवाज़ को समझ रहा हूँ...' : 'Processing your voice...'}
                    </span>
                  </div>
                  <Progress value={progress} className="bg-white/20" />
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>

      {transcript && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {language === 'hi' ? 'आपका ऑर्डर' : 'Your Order'}
              </CardTitle>
              <Button
                onClick={playResponse}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Volume2 className="h-4 w-4" />
                {language === 'hi' ? 'सुनें' : 'Play'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <p className="font-medium text-foreground mb-2">
                {language === 'hi' ? 'आपने कहा:' : 'You said:'}
              </p>
              <p className="text-lg">{transcript}</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="font-medium text-green-800 mb-2">
                {language === 'hi' ? 'अनुवाद:' : 'Translation:'}
              </p>
              <p className="text-green-700">
                "I need 10 kg onions and 5 kg tomatoes"
              </p>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                {language === 'hi' ? 'कार्ट में जोड़ें' : 'Add to Cart'}
              </Button>
              <Button variant="outline" className="flex-1">
                {language === 'hi' ? 'फिर से बोलें' : 'Speak Again'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold mb-2">
              {language === 'hi' ? 'बहुभाषी समर्थन' : 'Multi-language'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {language === 'hi' ? '6+ भाषाओं में ऑर्डर करें' : 'Order in 6+ languages'}
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold mb-2">
              {language === 'hi' ? 'स्मार्ट पहचान' : 'Smart Recognition'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {language === 'hi' ? 'उच्च सटीकता के साथ' : 'High accuracy voice detection'}
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Volume2 className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold mb-2">
              {language === 'hi' ? 'तुरंत प्रतिक्रिया' : 'Instant Response'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {language === 'hi' ? 'तत्काल ऑर्डर पुष्टि' : 'Immediate order confirmation'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}