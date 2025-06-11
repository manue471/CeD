<template>
  <div class="login-page">
    <div class="account-illustration">
      <img src="../assets/logo-ced.png" alt="Logo CeD+" />
      <p>Crescimento e Desenvolvimento</p>
    </div>

    <div class="form-container">
      <h1>Entrar</h1>
      <p class="subtitle">Insira seus dados para acessar sua conta no CeD+</p>

      <label for="cpf">CPF</label>
      <input id="cpf" type="text" placeholder="Digite seu CPF" v-model="cpf" />

      <label for="senha">Senha</label>
      <input id="senha" type="password" placeholder="Digite sua senha" v-model="senha" />

      <div class="password-options">
        <a href="#">Esqueceu a senha?</a>
      </div>

      <button class="submit-btn" @click="handleLogin">Entrar</button>

      <p class="login-link">
        Ainda não é nosso parceiro?
        <a href="/">Cadastre-se</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useAuthService } from '../services/auth.service';

const { login } = useAuthService();

const router = useRouter();
const cpf = ref('');
const senha = ref('');

const handleLogin = async () => {
  if (cpf.value && senha.value) {
    await login(cpf.value, senha.value)
      .then((res) => {
        if (res.statusCode === 401) {
          toast('Erro ao realizar login. Verifique suas credenciais.', { type: 'error' });
          return;
        }
        localStorage.setItem('cpf', res.user.cpf);
        router.push('/adminDashboard');
      })
      .catch((error) => {
        console.error(error);
        toast('Erro ao realizar login. Verifique suas credenciais.', { type: 'error' });
      });
  } else {
    toast('Preencha todos os campos obrigatórios', { type: 'warning' } )
  }
};
</script>
  
<style scoped>
  .login-page {
    display: flex;
    height: 100vh;
    font-family: 'Segoe UI', sans-serif;
  }
  
  .account-illustration {
    flex: 1;
    background-color: #1C6C82;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
  
  .account-illustration img {
    width: 120px;
    margin-bottom: 20px;
  }
  
  .form-container {
    flex: 1;
    padding: 60px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
  }
  
  h1 {
    font-size: 32px;
    color: #04303D;
    margin-bottom: 10px;
  }
  
  .subtitle {
    color: #8982BD;
    margin-bottom: 30px;
  }
  
  label {
    font-weight: 600;
    margin: 10px 0 5px;
    display: block;
    color: #04303D;
  }
  
  input {
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    margin-bottom: 15px;
    font-size: 15px;
  }
  
  .password-options {
    text-align: right;
    margin-bottom: 20px;
  }
  
  .password-options a {
    color: #1C8C82;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
  }
  
  .submit-btn {
    width: 100%;
    padding: 14px;
    font-size: 16px;
    background-color: #1C8C82;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #176f6a;
  }
  
  .login-link {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
  }
  
  .login-link a {
    color: #1C8C82;
    text-decoration: none;
    font-weight: 600;
  }
</style>
  