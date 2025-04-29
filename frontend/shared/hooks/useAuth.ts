import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth({ required = true, redirectTo = '/login' } = {}) {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const isAuthenticated = !!session?.user;
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        if (required && !isAuthenticated) {
            router.push(redirectTo);
        }
    }, [loading, required, isAuthenticated, router, redirectTo]);

    return {
        session,
        loading,
        isAuthenticated,
        user: session?.user,
        token: session?.user?.token,
    };
}

export default useAuth;