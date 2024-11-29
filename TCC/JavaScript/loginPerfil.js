// LOGIN
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('con').addEventListener('click', function(event) {
        // Prevenir o envio do formulário
        event.preventDefault();

        // Obter valores dos campos
        const email = document.getElementById('email').value.trim();
        const cpf = document.getElementById('cpf').value.trim();
        const nome = document.getElementById('nome').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const confirmSenha = document.getElementById('confirmSenha').value.trim();

        // Obter elementos de erro
        const emailError = document.getElementById('emailError');
        const cpfError = document.getElementById('cpfError');
        const nomeError = document.getElementById('nomeError');
        const senhaError = document.getElementById('senhaError');
        const confirmSenhaError = document.getElementById('confirmSenhaError');

        // Limpar mensagens de erro
        emailError.textContent = '';
        cpfError.textContent = '';
        nomeError.textContent = '';
        senhaError.textContent = '';
        confirmSenhaError.textContent = '';

        // Validar campos
        const emailValidationResult = validateEmail(email);
        const cpfValidationResult = validateCPF(cpf);
        const nomeValidationResult = validateNome(nome);
        const senhaValidationResult = validatePassword(senha);
        const confirmSenhaValidationResult = validateConfirmSenha(senha, confirmSenha);

        // Exibir mensagens de erro
        emailError.textContent = emailValidationResult.error;
        cpfError.textContent = cpfValidationResult.error;
        nomeError.textContent = nomeValidationResult.error;
        senhaError.textContent = senhaValidationResult.error;
        confirmSenhaError.textContent = confirmSenhaValidationResult.error;

        // Verificar se tudo está válido
        const isValid = !emailValidationResult.error && !cpfValidationResult.error &&
                         !nomeValidationResult.error && !senhaValidationResult.error &&
                         !confirmSenhaValidationResult.error;

        // Se válido, redirecionar
        if (isValid) {
            window.location.href = 'paginaInicial.html';
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            valid: re.test(email),
            error: re.test(email) ? '' : 'E-mail inválido.'
        };
    }

    function validatePassword(password) {
        // Regras de validação: pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um dígito e um caractere especial
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return {
            valid: re.test(password),
            error: re.test(password) ? '' : 'A senha deve ter pelo menos 8 caracteres, incluir letras maiúsculas e minúsculas, um dígito e um caractere especial.'
        };
    }

    function validateCPF(cpf) {
        cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return { valid: false, error: 'CPF inválido.' };

        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
        }

        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.charAt(9))) return { valid: false, error: 'CPF inválido.' };

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
        }

        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.charAt(10))) return { valid: false, error: 'CPF inválido.' };

        return { valid: true, error: '' };
    }

    function validateNome(nome) {
        return {
            valid: nome !== '',
            error: nome !== '' ? '' : 'O nome é obrigatório.'
        };
    }

    function validateConfirmSenha(senha, confirmSenha) {
        return {
            valid: senha === confirmSenha,
            error: senha === confirmSenha ? '' : 'Senhas não conferem.'
        };
    }
});
