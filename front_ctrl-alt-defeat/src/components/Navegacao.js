import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout, reset } from '../slices/authSlice';
import { useDispatch } from 'react-redux';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const historyRef = useRef([]);
    const dispatch = useDispatch();

    useEffect(() => {
        historyRef.current.push(location.pathname);
    }, [location]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    const goBack = () => {
        if (historyRef.current.length > 1) {
            const previousPath = historyRef.current.pop();
            const nextPath = historyRef.current[historyRef.current.length - 1];

            // Regex for profile pages
            const profileRegex = /\/Profile(Aluno|Orientador|Adm)\/.*/;
            // Regex for login pages
            const loginRegex = /\/(?:Login|login)(Aluno|Orientador|Adm)$/;

            if (profileRegex.test(previousPath) && loginRegex.test(nextPath)) {
                // console.log("AAAAAAAAAAAAAAAAAA", previousPath)
                handleLogout();
            } else {
                const previousPath = historyRef.current.pop();
                // console.log("BBBBBBBBBBBBBBBBBB", previousPath)
                navigate(previousPath);
            }
        } else {
            // console.log("CCCCCCCCCCCCCCCCCCCCCCCC")
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
