"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Compass, Home, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedProfileCard, ProfileCardContent } from './animated-profile-card';
import CircularGallery from './CircularGallery';

type IconComponentType = React.ElementType<{ className?: string }>;
export interface InteractiveMenuItem {
  label: string;
  icon: IconComponentType;
  href?: string;
}

export interface InteractiveMenuProps {
  items?: InteractiveMenuItem[];
  accentColor?: string;
}

const defaultItems: InteractiveMenuItem[] = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Explore', icon: Compass },
    
];

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" {...props}><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
);

const profileCardData = {
  avatarSrc: 'https://avatars.githubusercontent.com/u/128236054?v=4',
  avatarFallback: 'ME',
  name: 'LAVJEET KUMAR RAI',
  location: 'Vns',
  bio: 'Laziness is the key...',
  socials: [
    { id: 'github', url: 'https://github.com/lavjeetrai', label: 'GitHub', icon: <GithubIcon className="h-5 w-5" /> },
    { id: 'twitter', label: 'Twitter', url: 'https://x.com/lavjeetkumarrai', icon: <TwitterIcon className="h-4 w-4" /> },
  ],
};

const defaultAccentColor = 'var(--accent-foreground)';

const ModernVerticalSidebar: React.FC<InteractiveMenuProps> = ({ items, accentColor }) => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

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

  const handleItemClick = (index: number, item: InteractiveMenuItem) => {
    setActiveIndex(index);
    if (item.label === 'Explore') {
      setIsExploreOpen(true);
    } else if (item.href) {
      router.push(item.href);
    }
  };

  const navStyle = useMemo(() => {
      const activeColor = accentColor || defaultAccentColor;
      return { '--component-active-color': activeColor } as React.CSSProperties;
  }, [accentColor]); 

  return (
    <>
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
              onClick={() => handleItemClick(index, item)}
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
      
      <div 
        className="mt-auto flex flex-col gap-4 w-full px-3 pb-6 relative"
        onMouseEnter={() => setIsProfileOpen(true)}
        onMouseLeave={() => setIsProfileOpen(false)}
      >
        <button 
          onClick={() => setIsProfileOpen((prev) => !prev)} 
          className="flex items-center justify-center w-full h-16 rounded-2xl hover:bg-white/5 transition-colors group"
        >
           <img src="https://avatars.githubusercontent.com/u/128236054?v=4" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 group-hover:border-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all grayscale group-hover:grayscale-0 cursor-pointer object-cover" alt="User Avatar" />
        </button>

        <AnimatePresence>
          {isProfileOpen && (
            <motion.div 
              initial={{ scale: 0.95, x: -10, opacity: 0 }}
              animate={{ scale: 1, x: 0, opacity: 1 }}
              exit={{ scale: 0.95, x: -10, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute left-full bottom-4 ml-4 z-[100]"
            >
              <AnimatedProfileCard
                accentColor="var(--primary)"
                onAccentForegroundColor="#141313ff"
                onAccentMutedForegroundColor="rgba(156, 39, 39, 0.8)"
                baseCard={
                  <ProfileCardContent {...profileCardData} variant="default" showAvatar={false} />
                }
                overlayCard={
                  <ProfileCardContent
                    {...profileCardData}
                    variant="on-accent"
                    showAvatar={true}
                    cardStyle={{ backgroundColor: 'grey' }}
                  />
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>

    <AnimatePresence>
      {isExploreOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black"
        >
          <button 
            onClick={() => setIsExploreOpen(false)}
            className="absolute top-8 right-8 z-[210] p-4 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <X className="w-8 h-8" />
          </button>
          <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
            <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export { ModernVerticalSidebar }
