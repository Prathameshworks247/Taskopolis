import  { useState } from 'react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const [isLifetime, setIsLifetime] = useState(true);

  const features = [
    'Unlimited task creation & streak tracking',
    'Daily streak calendar with heatmap view',
    { text: 'Build your dream city from completed tasks', hasButton: true },
    'Cityscape placement with monthly view',
    'Level up with XP and earn rare buildings',
    'Unlock daily quests and time-based challenges',
    'Compete on global and friends leaderboards'
  ];
  

  return (
    <div className=" bg-background flex flex-col items-center justify-center px-4">
        {/* Headline */}
        <h1 className="text-4xl dark:text-mikado_yellow-400 md:text-4xl font-bold leading-tight">
        Unlock the full city-building experience and turn your goals into{' '}
          <span className="text-success">greatness</span>{' '}
        </h1>

      <div className="max-w-lg w-full text-center text-white  bg-oxford_blue-400 py-9 px-16 mt-6 rounded-2xl">
        
        {/* Pricing */}
        <div className="space-y-6">
            {
                isLifetime && <div className="text-6xl font-bold text-price-text">$47</div>
            }
            {
                !isLifetime && <div className="text-6xl font-bold text-price-text">$7</div>
            }
          
          
          {/* Lifetime Toggle */}
          <div className="flex items-center justify-center gap-3">
            <Switch 
              checked={isLifetime}
              onCheckedChange={setIsLifetime}
              className=" data-[state=checked]:bg-mikado_yellow-200 bg-gray-500"
            />
            <span className="text-feature-text">
              Lifetime deal (yours forever)
            </span>
          </div>

          {/* CTA Button */}
          <div className="space-y-2">
            <Button variant="cta" className="w-full text-lg dark:bg-mikado_yellow-200">
              START 7-DAY FREE TRIAL
            </Button>
            <p className="text-sm text-feature-text">
              No credit card required
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-4 text-left">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-success flex-shrink-0" />
              <div className="flex items-center gap-2 flex-1">
                <span className="text-feature-text">
                  {typeof feature === 'string' ? feature : feature.text}
                </span>
                {typeof feature === 'object' && feature.hasButton && (
                  <Button variant="small" className='dark:bg-mikado_yellow-200' >
                    TRY IT
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;