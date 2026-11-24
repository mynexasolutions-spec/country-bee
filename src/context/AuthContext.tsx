'use client';

/**
 * Customer accounts.
 *
 * NOTE: This is a browser-only implementation so the login / register / account
 * pages work without a backend. Accounts live in this browser's localStorage
 * (passwords are stored only as SHA-256 hashes). Before going live, replace the
 * bodies of `register`, `login`, `logout` and `updateProfile` with calls to a
 * real auth provider (e.g. NextAuth, Supabase Auth, Firebase Auth). The context
 * shape can stay the same so the pages do not need to change.
 */
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ShippingAddress } from '@/lib/orders';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  marketingOptIn: boolean;
  address?: ShippingAddress;
}

interface StoredUser extends UserProfile {
  passwordHash: string;
}

type AuthResult = { ok: true } | { ok: false; error: string };

interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  marketingOptIn: boolean;
}

interface AuthContextValue {
  user: UserProfile | null;
  /** False until the saved session has been read on the client. */
  isReady: boolean;
  register: (input: RegisterInput) => Promise<AuthResult>;
  login: (email: string, password: string, remember: boolean) => Promise<AuthResult>;
  logout: () => void;
  updateProfile: (patch: Partial<Pick<UserProfile, 'name' | 'phone' | 'address' | 'marketingOptIn'>>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USERS_KEY = 'country_bee_users_v1';
const SESSION_KEY = 'country_bee_session_v1';

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? (JSON.parse(raw) as StoredUser[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSessionUserId(): string | null {
  return sessionStorage.getItem(SESSION_KEY) ?? localStorage.getItem(SESSION_KEY);
}

function writeSession(userId: string, remember: boolean) {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, userId);
}

function toProfile(stored: StoredUser): UserProfile {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...profile } = stored;
  return profile;
}

async function hashPassword(email: string, password: string): Promise<string> {
  if (typeof crypto === 'undefined' || !crypto.subtle) {
    throw new Error('Secure sign-in needs HTTPS. Please open the site over a secure connection.');
  }
  const data = new TextEncoder().encode(`${email.trim().toLowerCase()}::${password}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Restore the saved session on the client
  useEffect(() => {
    try {
      const userId = readSessionUserId();
      const stored = userId ? readUsers().find((u) => u.id === userId) : undefined;
      if (stored) setUser(toProfile(stored));
    } catch {
      // Storage unavailable — stay signed out
    } finally {
      setIsReady(true);
    }
  }, []);

  const register = useCallback(async (input: RegisterInput): Promise<AuthResult> => {
    try {
      const email = input.email.trim().toLowerCase();
      const users = readUsers();
      if (users.some((u) => u.email === email)) {
        return { ok: false, error: 'An account with this email already exists. Please log in instead.' };
      }
      const stored: StoredUser = {
        id: `usr_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
        name: input.name.trim(),
        email,
        phone: input.phone,
        createdAt: new Date().toISOString(),
        marketingOptIn: input.marketingOptIn,
        passwordHash: await hashPassword(email, input.password),
      };
      writeUsers([...users, stored]);
      writeSession(stored.id, true);
      setUser(toProfile(stored));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Something went wrong. Please try again.' };
    }
  }, []);

  const login = useCallback(
    async (emailInput: string, password: string, remember: boolean): Promise<AuthResult> => {
      try {
        const email = emailInput.trim().toLowerCase();
        const stored = readUsers().find((u) => u.email === email);
        const hash = await hashPassword(email, password);
        if (!stored || stored.passwordHash !== hash) {
          return { ok: false, error: 'Incorrect email or password. Please try again.' };
        }
        writeSession(stored.id, remember);
        setUser(toProfile(stored));
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : 'Something went wrong. Please try again.' };
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const updateProfile = useCallback<AuthContextValue['updateProfile']>(
    (patch) => {
      if (!user) return;
      const users = readUsers();
      const index = users.findIndex((u) => u.id === user.id);
      if (index === -1) return;
      users[index] = { ...users[index], ...patch };
      writeUsers(users);
      setUser(toProfile(users[index]));
    },
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, isReady, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

/** Only allow same-site relative redirects (prevents open redirects via ?next=). */
export function getSafeRedirect(next: string | null | undefined, fallback = '/account'): string {
  if (!next || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) return fallback;
  return next;
}
