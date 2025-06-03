<template>
    <div class="register-page">
      <div class="account-illustration">
        <img src="../assets/logo-ced.png" alt="Logo CeD+" />
        <p>Crescimento e Desenvolvimento</p>
      </div>
  
      <div class="form-container">
        <h1>Cadastro</h1>
        <p class="subtitle">Insira seus dados pessoais para efetuar o seu cadastro na CeD+!</p>
  
        <!-- Seu formulário começa aqui -->
        <label for="cpf">CPF do responsável</label>
        <input id="cpf" placeholder="Digite aqui" />
  
        <label for="nome">Nome Completo</label>
        <input id="nome" placeholder="Digite aqui" />
  
        <div class="row">
          <div class="col">
            <label for="email">E-mail</label>
            <input id="email" placeholder="exemplo@email.com" />
          </div>
          <div class="col">
            <label for="telefone">Telefone</label>
            <input id="telefone" placeholder="DDD + Número" />
          </div>
        </div>
  
        <div class="row">
          <div class="col">
            <label for="uf">UF</label>
            <select id="uf">
              <option disabled selected>Selecione</option>
              <option>SP</option>
              <option>RJ</option>
            </select>
          </div>
          <div class="col">
            <label for="cidade">Cidade</label>
            <select id="cidade">
              <option disabled selected>Selecione</option>
              <option>São Paulo</option>
            </select>
          </div>
        </div>
  
        <label for="setor">Setor</label>
        <select id="setor">
          <option disabled selected>Selecione</option>
          <option>Clínico</option>
        </select>
  
        <label for="senha">Senha</label>
        <input type="password" id="senha" placeholder="Digite a sua senha" />
  
        <h2>Dados profissionais</h2>
        <p>Atendimento por teleconsulta?</p>
        <div class="checkbox-group">
          <label><input type="radio" name="teleconsulta" /> Sim</label>
          <label><input type="radio" name="teleconsulta" /> Não</label>
        </div>
  
        <p class="termos">
          Clicando abaixo, você concorda com os
          <a href="#">Termos de Uso</a> e
          <a href="#">Política de Privacidade</a>.
        </p>
  
        <button class="submit-btn">Continuar</button>
  
        <p class="login-link">Já possui conta? <a href="/login">Entrar</a></p>
      </div>
    </div>
  </template>
  
  <style scoped>
  .register-page {
    display: flex;
    height: 100vh;
    font-family: 'Segoe UI', sans-serif;
  }
  
  /* Lado esquerdo */
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
  justify-content: flex-start;
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
  
  h2 {
    margin-top: 30px;
    color: #04303D;
    font-size: 18px;
  }
  
  label {
    font-weight: 600;
    margin: 10px 0 5px;
    display: block;
    color: #04303D;
  }
  
  input,
  select {
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    margin-bottom: 15px;
    font-size: 15px;
  }
  
  .row {
    display: flex;
    gap: 50px;
  }
  
  .col {
    flex: 1;
  }
  
  .checkbox-group {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .termos {
    font-size: 14px;
    color: #4c4c4c;
    margin-bottom: 20px;
  }
  
  .termos a {
    color: #1C8C82;
    font-weight: 600;
    text-decoration: none;
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
  