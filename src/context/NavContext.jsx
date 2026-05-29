import { createContext, useContext, useState, useEffect } from 'react';
import { useCmsConfig } from '@/hooks/useCmsConfig';

// Default navbar structure (the one from second screenshot)
const DEFAULT_NAV_LINKS = [
  { name: "Home", href: "/" },
  { 
    name: "About", 
    href: "/about", 
    dropdown: [
      { name: "About MIPL", href: "/about" },
      { name: "Our Achievements", href: "/achievements" },
      { name: "Our Social Contribution", href: "/social-activities" },
      { name: "Gallery", href: "/gallery" },
    ]
  },
  { name: "Services", href: "/services" },
  { name: "Our Clients", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [navLinks, setNavLinks] = useState(DEFAULT_NAV_LINKS);
  const [isReady, setIsReady] = useState(true);

  return (
    <NavContext.Provider value={{ navLinks, loading: !isReady }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavLinks = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error('useNavLinks must be used within NavProvider');
  }
  return context;
};
