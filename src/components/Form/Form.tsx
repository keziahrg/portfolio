import { FormEvent, useState } from 'react'
import { Button } from '../Button'
import styles from './Form.module.css'

export const Form = () => {
    const [formState, setFormState] = useState<'ready' | 'success' | 'error'>(
        'ready'
    )

    const handleFormSubmission = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form: HTMLFormElement = e.currentTarget
        const formData = new FormData(form)
        const formValues = Array.from(formData, ([key, value]) => [
            key,
            typeof value === 'string' ? value : value.name,
        ])

        fetch('/', {
            method: 'POST',
            body: new URLSearchParams(formValues).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    setFormState('success')
                    form.reset()
                } else {
                    setFormState('error')
                    console.log('error')
                }
            })
            .catch((err) => {
                setFormState('error')
                console.log(err)
            })
    }

    return (
        <form
            method="POST"
            name="contact"
            data-netlify="true"
            onSubmit={handleFormSubmission}
            className={styles.form}
        >
            {formState === 'error' && (
                <div className={styles.form__error}>
                    <p>
                        Woops! There was an error with the form submission.
                        Please try again later.
                    </p>
                </div>
            )}
            {formState === 'success' && (
                <div className={styles.form__success}>
                    <p>
                        Woot! Your message was successfully submitted. You can
                        expect to hear back from me within 2 business days.
                    </p>
                </div>
            )}
            <div className={styles.form__body}>
                <input type="hidden" name="form-name" value="contact" />
                <div className={styles.form__inputs}>
                    <div className={styles.form__input}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            required
                        />
                    </div>
                    <div className={styles.form__input}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email address"
                            required
                        />
                    </div>
                </div>
                <div className={styles.form__textarea}>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={10}
                        placeholder="Your message"
                        required
                    />
                </div>
                <Button type="submit" label="Send message" />
            </div>
        </form>
    )
}
