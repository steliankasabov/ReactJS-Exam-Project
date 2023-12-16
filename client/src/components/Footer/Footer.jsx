import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p><strong>Sofia Park Theatre</strong> - broadcast stage plays on cinema screens located in the green spaces of Bulgaria's capital  © {new Date().getFullYear()}</p>
        </footer>
    );
}