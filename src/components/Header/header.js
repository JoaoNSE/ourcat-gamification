import styles from "./header.module.css";
import { useUser } from "../../hooks/useUser";
import { useSession, signIn, signOut } from "next-auth/react";
import { DropdownUserMenu } from "./components/DropdownUserMenu/DropdownUserMenu";

export default function Header({ children }) {
    const { user } = useUser();

    return (
        <div className={styles.header}>
            <div>
                <img
                    className={styles.header__logo}
                    src="/img/logo.png"
                    alt="logo"
                />
            </div>

            {user && (
                <div className={styles.header__user}>
                    <DropdownUserMenu />
                </div>
            )}
            {!user && (
                <button
                    className={styles["header__login-button"]}
                    onClick={signIn}
                >
                    Entrar
                </button>
            )}
        </div>
    );
}
