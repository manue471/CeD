<template>
    <div class="register-container">
        <div class="account-illustration">
        <img src="../assets/logo-ced.png" alt="">
        <P>Crescimento e Desenvolvimento</P>
      </div>
  
      <div class="register-form">
        <h1>Criar Conta</h1>
        <p class="subtitle">Insira seus dados pessoais para efetuar o seu cadastro na CeD+!</p>
  
        <label for="role">Eu sou</label>
        <select id="role" v-model="role">
          <option disabled value="">Selecione</option>
          <option>Profissional da saúde</option>
        </select>
  
        <h2>Dados profissionais</h2>
  
        <label for="registryType">Tipo de registro</label>
        <select id="registryType" v-model="registryType">
          <option disabled value="">Selecione</option>
          <option>CRM</option>
          <option>COREN</option>
          <option>Outros</option>
        </select>
  
        <div class="row">
          <div class="col">
            <label for="registryNumber">Número de registro</label>
            <input id="registryNumber" v-model="registryNumber" placeholder="Digite aqui" />
          </div>
          <div class="col">
            <label for="uf">UF de emissão</label>
            <input id="uf" v-model="uf" placeholder="Digite aqui" />
          </div>
        </div>
  
        <label for="specialty">Especialidade</label>
        <select id="specialty" v-model="specialty">
          <option disabled value="">Selecione</option>
          <option>Cardiologia</option>
          <option>Clínico Geral</option>
          <option>Pediatria</option>
          <option>Outro</option>
        </select>
  
        <button class="submit-btn" @click="submitForm">Cadastrar</button>
  
        <p class="login-link">
          Já possui conta? <a href="/login">Entrar</a>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const role = ref('')
  const registryType = ref('')
  const registryNumber = ref('')
  const uf = ref('')
  const specialty = ref('')
  
  const submitForm = () => {
    if (!role.value || !registryType.value || !registryNumber.value || !uf.value || !specialty.value) {
      alert('Preencha todos os campos obrigatórios.')
      return
    }
    console.log('Dados enviados:', { role, registryType, registryNumber, uf, specialty })
  }
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100%;
    font-family: 'Segoe UI', sans-serif;
    background-color: #ffffff;
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
  
  .register-form {
    flex: 1;
    padding: 50px 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .register-form h1 {
    font-size: 32px;
    color: #04303D;
    margin-bottom: 10px;
  }
  
  .subtitle {
    color: #8982BD;
    margin-bottom: 30px;
  }
  
  h2 {
    font-size: 18px;
    color: #04303D;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  
  label {
    margin: 15px 0 5px;
    font-weight: 600;
    color: #04303D;
  }
  
  select,
  input {
    padding: 12px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-bottom: 10px;
    width: 100%;
  }
  
  .row {
    display: flex;
    gap: 50px;
    margin-top: 10px;
  }
  
  .col {
    flex: 1;
  }
  
  .submit-btn {
    background-color: #1C8C82;
    color: #ffffff;
    padding: 14px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s;
  }
  
  .submit-btn:hover {
    background-color: #176f6a;
  }
  
  .login-link {
    font-size: 14px;
    margin-top: 15px;
    color: #04303D;
  }
  
  .login-link a {
    color: #1C8C82;
    font-weight: bold;
    text-decoration: none;
  }
  </style>
  