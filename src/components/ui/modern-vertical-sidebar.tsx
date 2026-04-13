"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Home, Briefcase, Calendar, Shield, Settings } from 'lucide-react';

type IconComponentType = React.ElementType<{ className?: string }>;
export interface InteractiveMenuItem {
  label: string;
  icon: IconComponentType;
}

export interface InteractiveMenuProps {
  items?: InteractiveMenuItem[];
  accentColor?: string;
}

const defaultItems: InteractiveMenuItem[] = [
    { label: 'Home', icon: Home },
    { label: 'Strategy', icon: Briefcase },
    { label: 'Calendar', icon: Calendar },
    { label: 'Security', icon: Shield },
    { label: 'Settings', icon: Settings },
];

const defaultAccentColor = 'var(--accent-foreground)';

const ModernVerticalSidebar: React.FC<InteractiveMenuProps> = ({ items, accentColor }) => {

  const finalItems = useMemo(() => {
     const isValid = items && Array.isArray(items) && items.length >= 2 && items.length <= 5;
     if (!isValid) {
        return defaultItems;
     }
     return items;
  }, [items]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
      if (activeIndex >= finalItems.length) {
          setActiveIndex(0);
      }
  }, [finalItems, activeIndex]);

  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  const navStyle = useMemo(() => {
      const activeColor = accentColor || defaultAccentColor;
      return { '--component-active-color': activeColor } as React.CSSProperties;
  }, [accentColor]); 

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 sm:w-24 md:w-28 flex flex-col items-center py-6 z-[60] border-r border-white/10 bg-black/80 backdrop-blur-xl">
      
      <nav
        className="vertical-sidebar-menu flex flex-col gap-6 w-full px-3 mt-[80px]"
        role="navigation"
        style={navStyle}
      >
        {finalItems.map((item, index) => {
          const isActive = index === activeIndex;
          const IconComponent = item.icon;

          return (
            <button
              key={item.label}
              className={`vertical-menu__item group relative flex flex-col items-center justify-center w-full min-h-[64px] sm:min-h-[80px] rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'active bg-white/5 shadow-inner' : 'hover:bg-white/5'}`}
              onClick={() => handleItemClick(index)}
              ref={(el) => { itemRefs.current[index] = el; }}
            >
              <div className={`vertical-menu__icon relative z-10 flex items-center justify-center transition-transform duration-500 ${isActive ? 'animate-iconBounce' : ''}`}>
                <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`} />
              </div>
              
              <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'max-h-8 opacity-100 mt-1.5' : 'max-h-0 opacity-0 mt-0'}`}>
                <strong
                  className={`vertical-menu__text text-[10px] sm:text-xs font-semibold tracking-wider text-white whitespace-nowrap drop-shadow-md`}
                  ref={(el) => { textRefs.current[index] = el; }}
                >
                  {item.label}
                </strong>
              </div>
              
              {isActive && (
                <div className="absolute left-[-12px] w-1 h-10 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] rounded-r-lg" />
              )}
            </button>
          );
        })}
      </nav>
      
      <div className="mt-auto flex flex-col gap-4 w-full px-3 pb-6">
        <button className="flex items-center justify-center w-full h-16 rounded-2xl hover:bg-white/5 transition-colors group">
           <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 group-hover:border-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all grayscale group-hover:grayscale-0" alt="User Preset" />
        </button>
      </div>
    </aside>
  );
};

export { ModernVerticalSidebar }
