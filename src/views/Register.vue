<template>
    <div class="account-container">
      <div class="account-illustration">
        <img src="../assets/logo-ced.png" alt="">
        <P>Crescimento e Desenvolvimento</P>
      </div>
      <div class="account-form">
        <h1>Criar Conta</h1>
  
        <label for="role">Eu sou</label>
        <select id="role" v-model="selectedRole">
          <option disabled value="">Selecione</option>
          <option>Administrador</option>
          <option>Paciente</option>
        </select>
  
        <div class="terms">
          Clicando abaixo, você concorda com os
          <a href="#">Termos de Uso</a> e
          <a href="#">Política de Privacidade</a>.
        </div>
  
        <button class="submit-btn" @click="register">Cadastrar</button>
  
        <p class="account-link">
          Já possui conta? <a href="login">Entrar</a>
        </p>
      </div>

    </div>
</template>
  
<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router' 
  
  const selectedRole = ref('')
  const router = useRouter()
  
  const register = () => {
    if (!selectedRole.value) {
      alert('Selecione um tipo de usuário.')
      return
    }
  
    if (selectedRole.value === 'Administrador') {
        router.push('/adminRegister') 
    } else if (selectedRole.value === 'Paciente') {
        router.push('/patientRegister') 
    } else {
        console.log(`Registrando como: ${selectedRole.value}`)
    }
  }
</script>

<style scoped>
  .account-container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100%;
    font-family: 'Segoe UI', sans-serif;
    background-color: #ffffff;
  }
  
  .account-form {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px;
    background-color: #f9f9f9;
  }
  
  .account-form h1 {
    font-size: 32px;
    margin-bottom: 5px;
    color: #04303D;
  }
  
  .account-form p {
    margin-bottom: 20px;
    color: #04303D;
  }
  
  label {
    margin: 10px 0 5px;
    font-weight: 500;
    color: #04303D;
  }
  
  select {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 100%;
  }
  
  .terms {
    font-size: 14px;
    color: #04303D;
    margin-bottom: 20px;
  }
  
  .terms a {
    color: #1C8C82;
    font-weight: 600;
    text-decoration: none;
  }
  
  .submit-btn {
    background-color: #1C8C82;
    color: #fff;
    padding: 12px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 15px;
    transition: background-color 0.3s;
  }
  
  .submit-btn:hover {
    background-color: #176f6a;
  }
  
  .account-link {
    font-size: 14px;
    color: #04303D;
  }
  
  .account-link a {
    color: #1C8C82;
    font-weight: bold;
    text-decoration: none;
  }
  
  .account-illustration {
    flex: 1;
    background-color: #1C6C82;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    flex-direction: column;
  }
  </style>
  