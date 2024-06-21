import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const historyRef = useRef([]);

  useEffect(() => {
    historyRef.current.push(location.pathname);
  }, [location]);

  const goBack = () => {
    if (historyRef.current.length > 1) {
      historyRef.current.pop();
      const previousPath = historyRef.current.pop();
      navigate(previousPath);
    } else {
      navigate('/');
    }
  };

  return (
    <NavigationContext.Provider value={{ goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  return useContext(NavigationContext);
};
