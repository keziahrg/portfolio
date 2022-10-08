import styles from './Button.module.css'

interface Props {
    label: string
    onClick?: () => void
    type?: 'button' | 'submit'
    href?: string
    openInNewWindow?: boolean
    disabled?: boolean
}

export const Button = ({
    onClick,
    href,
    type = 'button',
    openInNewWindow,
    label,
    disabled,
}: Props) => {
    return (
        <>
            {href ? (
                <a
                    className={styles.button}
                    title={label}
                    href={href}
                    target={openInNewWindow ? '__blank' : undefined}
                    rel="noopener noreferrer"
                >
                    {label}
                </a>
            ) : (
                <button
                    className={styles.button}
                    aria-label={label}
                    onClick={onClick}
                    type={type}
                    disabled={disabled}
                >
                    {label}
                </button>
            )}
        </>
    )
}
