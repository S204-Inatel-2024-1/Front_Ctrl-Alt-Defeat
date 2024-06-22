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
        window.location.reload();
    };

    const goBack = () => {
        if (historyRef.current.length > 1) {
            const previousPath = historyRef.current.pop();
            const nextPath = historyRef.current[historyRef.current.length - 1];

            // const navigationRegex = /\/Register(Aluno|Orientador|Adm)$/
            const profileRegex = /\/Profile(Aluno|Orientador|Adm)\/.*/;
            const loginRegex = /\/(?:Login|login)(Aluno|Orientador|Adm)$/;

            if (profileRegex.test(previousPath) && loginRegex.test(nextPath)) {
                handleLogout();
            } else {
                const previousPath = historyRef.current.pop();
                navigate(previousPath);
            }
        } else {
            handleLogout();
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