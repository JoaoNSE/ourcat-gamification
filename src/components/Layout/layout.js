import styles from "./layout.module.css";
import Header from "../Header/header";

export default function Layout({ children }) {
    return (
        <>
            <Header></Header>
            <div className={styles.container}>{children}</div>
        </>
    );
}
