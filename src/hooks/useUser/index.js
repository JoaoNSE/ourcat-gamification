import { useContext, useEffect, useState, createContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) {
            setUser(null);
            return;
        }

        (async () => {
            const response = await fetch("/api/me");
            const responseBody = await response.json();

            if (response.status !== 401 && response.status !== 403) {
                setUser(responseBody);
            }
        })();
    }, [session]);

    const userContextValue = {
        user,
    };

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
