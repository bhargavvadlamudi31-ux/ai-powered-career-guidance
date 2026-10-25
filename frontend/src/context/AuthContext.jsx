import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('careercompass_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('careercompass_token') || null);
  const [profile, setProfile] = useState(null);
  const [systemStatus, setSystemStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch system status once on launch
  useEffect(() => {
    api.getSystemStatus()
      .then(res => setSystemStatus(res))
      .catch(err => console.warn('Could not fetch system status:', err.message));
  }, []);

  // Fetch student profile if authenticated
  const fetchProfile = useCallback(async () => {
    if (!token) {
      setProfile(null);
      setLoading(false);
      return;
    }
    try {
      const res = await api.getProfile();
      setProfile(res.profile);
    } catch (err) {
      console.warn('Failed to fetch profile:', err.message);
      if (err.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('careercompass_token', res.token);
    localStorage.setItem('careercompass_user', JSON.stringify(res.user));
    await fetchProfile();
    return res;
  };

  const register = async (name, email, password) => {
    const res = await api.register(name, email, password);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('careercompass_token', res.token);
    localStorage.setItem('careercompass_user', JSON.stringify(res.user));
    await fetchProfile();
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setProfile(null);
    localStorage.removeItem('careercompass_token');
    localStorage.removeItem('careercompass_user');
  };

  const updateProfile = async (profileData) => {
    const res = await api.updateProfile(profileData);
    setProfile(res.profile);
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        profile,
        systemStatus,
        loading,
        isAuthenticated: Boolean(user && token),
        login,
        register,
        logout,
        fetchProfile,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
