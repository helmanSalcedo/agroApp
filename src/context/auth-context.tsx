import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

type AuthUser = {
  id: string;
  name: string;
  phone: string;
  email?: string;
};

type SignInInput = {
  phone: string;
  password: string;
};

type SignUpInput = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

type AuthContextValue = {
  isReady: boolean;
  isAuthenticated: boolean;
  onboardingCompleted: boolean;
  user: AuthUser | null;
  completeOnboarding: () => Promise<void>;
  signIn: (payload: SignInInput) => Promise<void>;
  signUp: (payload: SignUpInput) => Promise<void>;
  signOut: () => Promise<void>;
};

const AUTH_USER_KEY = '@agrosaas/auth-user';
const ONBOARDING_KEY = '@agrosaas/onboarding-completed';

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        const [savedUser, savedOnboarding] = await Promise.all([
          AsyncStorage.getItem(AUTH_USER_KEY),
          AsyncStorage.getItem(ONBOARDING_KEY),
        ]);

        if (!isMounted) return;

        if (savedUser) {
          setUser(JSON.parse(savedUser) as AuthUser);
        }

        if (savedOnboarding === 'true') {
          setOnboardingCompleted(true);
        }
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  const completeOnboarding = async () => {
    setOnboardingCompleted(true);
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
  };

  const signIn = async ({ phone }: SignInInput) => {
    const nextUser: AuthUser = {
      id: 'user_' + Date.now(),
      name: 'Usuario AgroSaaS',
      phone,
    };

    setUser(nextUser);
    await Promise.all([
      AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser)),
      AsyncStorage.setItem(ONBOARDING_KEY, 'true'),
    ]);
    setOnboardingCompleted(true);
  };

  const signUp = async ({ name, phone, email }: SignUpInput) => {
    const nextUser: AuthUser = {
      id: 'user_' + Date.now(),
      name,
      phone,
      email,
    };

    setUser(nextUser);
    await Promise.all([
      AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser)),
      AsyncStorage.setItem(ONBOARDING_KEY, 'true'),
    ]);
    setOnboardingCompleted(true);
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      isReady,
      isAuthenticated: !!user,
      onboardingCompleted,
      user,
      completeOnboarding,
      signIn,
      signUp,
      signOut,
    }),
    [isReady, onboardingCompleted, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
