/* Contact Page */
"use client";
import React, { useRef, useState } from 'react';
import styles from './contact.module.css';
import emailjs from 'emailjs-com';

const Connect = () => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await emailjs.sendForm(
                'service_htkbt3k',
                'template_o976b9i',
                formRef.current,
                'N3IzJZ-BFr70k7ALa'
            );
            alert('Email sent successfully!');
        } catch (error) {
            alert('Error sending email');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.connectSection}>
                <div className={styles.contactInfo}>
                    <h2>Contact</h2>
                    <p><strong>What do You Think</strong></p>
                    <p>Feel free to get in touch with us. We always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
                    <p><strong>Phone</strong><br />+201027746531</p>
                    <p><strong>Email</strong><br />ramzyar010277@gmail.com</p>
                </div>
                <div className={styles.contactForm}>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <div className={styles.inputField}>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="firstName" name="firstName" onChange={handleChange} />
                            </div>
                            <div className={styles.inputField}>
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="email">Email *</label>
                            <input type="email" id="email" name="email" required onChange={handleChange} />
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" onChange={handleChange} />
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" className={styles.textarea} onChange={handleChange}></textarea>
                        </div>
                        <button type="submit" className={styles.submitButton}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Connect;
