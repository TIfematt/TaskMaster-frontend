"use client";

import LoginForm from "@/app/components/Auth/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return <LoginForm />;
}