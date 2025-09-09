'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '@/services/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'mentor' | 'mentee' | 'alumni' | 'intern' | 'freelancer';
  field: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: User['role'],
    field: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
          role: 'mentee', // TODO: fetch real role from backend if needed
          field: '',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

    const login = async (email: string, password: string) => {
    // Sign in with Firebase
    const cred = await signInWithEmailAndPassword(auth, email, password);

    // Fetch the user from your backend (Postgres)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${cred.user.uid}`);
    if (!res.ok) throw new Error('Failed to fetch user from backend');
    const backendUser = await res.json();

    // Update context with backend info
    setUser({
        id: cred.user.uid,
        name: cred.user.displayName || backendUser.name,
        email: cred.user.email || backendUser.email,
        role: backendUser.role,
        field: backendUser.field,
    });
    };


  const signup = async (
    name: string,
    email: string,
    password: string,
    role: User['role'],
    field: string
  ) => {
    // Create in Firebase
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    // console.log(cred);

    // Create in Postgres backend
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cred.user.uid, name, email, role, field }),
      });

      if (!response.ok) {
        console.error('Failed to create user in backend:', await response.text());
      }
    } catch (err) {
      console.error('Backend error:', err);
    }

    // Update context
    setUser({
      id: cred.user.uid,
      name,
      email,
      role,
      field,
    });

    return cred;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
