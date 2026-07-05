 const btnAutocompletar = document.querySelector('.btn-autocompletar');
        const inputEmail = document.querySelector('#email');
        const inputPassword = document.querySelector('#password');

        btnAutocompletar?.addEventListener('click', e => {
            e.preventDefault();
            inputEmail.value = 'admin@gmail.com';
            inputPassword.value = 'Pass.123';
        });