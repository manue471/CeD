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

        <label for="cpf">CPF:</label>
        <input id="cpf" v-model="cpf" placeholder="Digite seu CPF" type="text" />

        <label for="password">Senha:</label>
        <input id="password" v-model="password" placeholder="Digite sua senha" type="password" />
      
  
        <button class="submit-btn" @click="submitForm">Cadastrar</button>
  
        <p class="login-link">
          Já possui conta? <a href="/login">Entrar</a>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuthService } from '../services/auth.service'
  import { toast } from 'vue3-toastify'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  
  const role = ref('')
  const registryType = ref('')
  const registryNumber = ref('')
  const uf = ref('')
  const specialty = ref('')
  const cpf = ref('')
  const password = ref('')

  const { register } = useAuthService()
  
  const submitForm = async () => {
    if (!role.value || !registryType.value || !registryNumber.value || !uf.value || !specialty.value, !cpf.value || !password.value) {
      toast('Preencha todos os campos obrigatórios.', { type: 'warning' })
      return
    }
    console.log({
      role: role.value,
      registryType: registryType.value,
      registryNumber: registryNumber.value,
      uf: uf.value,
      specialty: specialty.value,
      cpf: cpf.value,
      password: password.value
    });
    
    const res = await register({
      role: role.value,
      registryType: registryType.value,
      registryNumber: registryNumber.value,
      uf: uf.value,
      specialty: specialty.value,
      cpf: cpf.value,
      password: password.value
    })

    if (res.id) {
      toast('Cadastro realizado com sucesso!', { type: 'success' })
      route.push('/login')
    } else {
      toast(res.message || 'Erro ao cadastrar. Tente novamente.', { type: 'error' })
    }

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
  