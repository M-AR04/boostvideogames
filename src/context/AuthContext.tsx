'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'customer' | 'technician' | 'inventory_manager' | 'admin';

export interface User {
  id: string;
  name: string;
  nameAr: string;
  role: UserRole;
  email: string;
}

interface AuthContextType {
  user: User | null;
  activeRole: UserRole;
  switchRole: (role: UserRole) => void;
  logout: () => void;
  loginAs: (role: UserRole) => void;
}

const roleUsers: Record<UserRole, User> = {
  customer: {
    id: 'user_cust',
    name: 'Faisal Al-Otaibi',
    nameAr: 'فيصل العتيبي',
    role: 'customer',
    email: 'faisal@example.com',
  },
  technician: {
    id: 'user_tech',
    name: 'Mohammad Sweidan',
    nameAr: 'محمد سويدان',
    role: 'technician',
    email: 'mohammad.tech@boost.jo',
  },
  inventory_manager: {
    id: 'user_inv',
    name: 'Khalid Masri',
    nameAr: 'خالد المصري',
    role: 'inventory_manager',
    email: 'khalid.inv@boost.jo',
  },
  admin: {
    id: 'user_admin',
    name: 'Raed Sweis',
    nameAr: 'رائد سويس',
    role: 'admin',
    email: 'raed.admin@boost.jo',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeRole, setActiveRole] = useState<UserRole>('customer');

  useEffect(() => {
    // Default to admin for easier initial demo visibility, or customer
    const savedRole = localStorage.getItem('boost_active_role') as UserRole;
    if (savedRole && roleUsers[savedRole]) {
      setUser(roleUsers[savedRole]);
      setActiveRole(savedRole);
    } else {
      // Default to admin so they can see all system modules right away!
      setUser(roleUsers['admin']);
      setActiveRole('admin');
      localStorage.setItem('boost_active_role', 'admin');
    }
  }, []);

  const switchRole = (role: UserRole) => {
    if (roleUsers[role]) {
      setUser(roleUsers[role]);
      setActiveRole(role);
      localStorage.setItem('boost_active_role', role);
    }
  };

  const loginAs = (role: UserRole) => {
    switchRole(role);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        activeRole,
        switchRole,
        logout,
        loginAs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
