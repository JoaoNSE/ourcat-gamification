import styles from "./DropdownUserMenu.module.css";
import { signOut } from "next-auth/react";
import { useUser } from "../../../../hooks/useUser";

export function DropdownUserMenu() {
    const { user } = useUser();

    return (
        <div className={styles["dropdown-user-menu"]}>
            <div className={styles["dropdown-user-menu__chevron"]}>
                <div>Olá, {user.name} </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                </svg>
            </div>

            <div className={styles["dropdown-user-menu__options"]}>
                <div>Meu Perfil</div>
                {user.role === "CREATOR" && <div>Menu de Criação</div>}
                <div onClick={signOut}>Sair</div>
            </div>
        </div>
    );
}
