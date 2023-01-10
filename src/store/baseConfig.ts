const emailForm = 'dmitri1988@mail.ru';

const baseConfig = () => ({
    SITE_EMAIL_FORM: emailForm,
    SITE_URL: 'http://localhost:4003/',
    SITE_CALCULATOR: {
        individual: {
            deposit: 25000,
            after: 15000
        },
        entity: {}
    }
});

export { baseConfig };
