import { SessionProvider } from "next-auth/react";
import { UserProvider } from "../hooks/useUser";
import "../styles/global.css";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <SessionProvider session={session}>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </SessionProvider>
    );
}
