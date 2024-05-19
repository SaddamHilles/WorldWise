import styles from './Button.module.css';

interface Props {
    children: React.ReactNode;
    onClick: () => void;
    type: string;
}
function Button({ children, type, ...rest }: Partial<Props>) {
    return (
        <button className={`${styles.btn} ${type && styles[type]}`} {...rest}>
            {children}
        </button>
    );
}

export default Button;
