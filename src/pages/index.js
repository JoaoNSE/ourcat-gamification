import { useState, useEffect } from "react";
import Layout from "../components/Layout/layout";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home({ ...props }) {
    const [users, setUsers] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        console.log("session", session);
        async function getUsers() {
            const result = await fetch("/api/v1/users");
            const responseBody = await result.json();
            setUsers(responseBody.users);
        }

        getUsers();
    }, [session]);

    return (
        <Layout>
            <h1>Hello Warld</h1>
            {session ? (
                <>
                    Signed in as {session.user.name} <br />
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            ) : (
                <>
                    Not signed in <br />
                    <button onClick={() => signIn()}>Sign in</button>
                </>
            )}
        </Layout>
    );
}
