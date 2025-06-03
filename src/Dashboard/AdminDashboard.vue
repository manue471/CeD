<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <img
        src="../assets/ced-logo-cor.png"
        width="180px"
        height="100px"
        alt="Logo CeD+"
      />
      <nav class="nav-menu">
        <a
          href="#"
          class="nav-item"
          :class="{ active: activeView === 'overview' }"
          @click.prevent="activeView = 'overview'"
        >
          <span class="icon">🏠</span>
          <span class="label">Visão Geral</span>
        </a>
        <a
          href="#"
          class="nav-item"
          :class="{ active: activeView === 'pacientes' }"
          @click.prevent="activeView = 'pacientes'"
        >
          <span class="icon">❤️</span>
          <span class="label">Pacientes</span>
        </a>
        <a
          href="#"
          class="nav-item"
          :class="{ active: activeView === 'consultas' }"
          @click.prevent="activeView = 'consultas'"
        >
          <span class="icon">📅</span>
          <span class="label">Consultas</span>
        </a>
        <a href="#" class="nav-item">
          <span class="icon">⚙️</span>
          <span class="label">Relatórios</span>
        </a>
      </nav>

      <div class="bottom-exit">
        <a href="#" class="nav-item">
          <span class="icon">👤</span>
          <span class="label">Sair</span>
        </a>
      </div>
    </aside>

    <!-- Main Content Render -->
    <main class="main-content">
      <template v-if="activeView === 'overview'">
        <header class="header">
          <h1>Visão Geral</h1>
          <input type="text" class="search" placeholder="Pesquisar" />
        </header>

        <section class="welcome-card">
          <h2>Olá Dr. Daniel</h2>
          <p>Cheque os seus pacientes e as suas consultas do dia!</p>
        </section>

        <section class="kpis">
          <KpiCard icon="💚" label="Pacientes" value="152" />
          <KpiCard icon="📅" label="Consultas" value="152" />
          <KpiCard icon="⚙️" label="Relatórios" value="268" />
        </section>

        <section class="chart-section">
          <h3>Frequência de Pacientes</h3>
          <PatientChart />
        </section>

        <section class="bottom-section">
          <div class="next-appointments">
            <h3>Próximas Consultas</h3>
            <AppointmentItem name="Samuel" specialty="Cardiologia" />
            <AppointmentItem name="Lucas" specialty="Cardiologia" />
          </div>
          <div class="actions">
            <button class="btn" @click="openModal('paciente')">
              + Novo Paciente
            </button>
            <button class="btn" @click="openModal('consulta')">
              + Registrar Consulta
            </button>
          </div>
        </section>
      </template>

      <template v-else-if="activeView === 'pacientes'">
        <section class="pacientes-view">
          <div class="header">
            <button class="btn" @click="openModal('paciente')">
              + Novo Paciente
            </button>
            <input type="text" class="search" placeholder="Pesquisar" />
          </div>
          <section class="chart-section">
            <h3>Frequência de Pacientes</h3>
            <PatientChart />
          </section>
          <table class="pacientes-table">
            <thead>
              <tr>
                <th>Cód.</th>
                <th>Nome completo</th>
                <th>Data de nasc.</th>
                <th>Sexo</th>
                <th>Urgência</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in pacientes" :key="p.codigo">
                <td>{{ p.codigo }}</td>
                <td>{{ p.nome }}</td>
                <td>{{ p.nascimento }}</td>
                <td>{{ p.sexo }}</td>
                <td>{{ p.urgencia ? "Sim" : "Não" }}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </template>
    </main>

    <!-- Modal de paciente -->
    <div v-if="activeModal === 'paciente'" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">×</button>
        <h2>Cadastrar paciente</h2>
        <p class="subtext">
          Insira os dados do seu paciente para localizarmos no Banco de Dados.
        </p>
        <label>Nome completo</label>
        <input type="text" placeholder="Digite aqui" class="input" />
        <label>Data de nascimento</label>
        <input type="date" class="input" />
        <div class="form-row">
          <div class="form-column">
            <label>Sexo</label>
            <select class="input">
              <option>Selecione</option>
              <option>Masculino</option>
              <option>Feminino</option>
            </select>
          </div>
          <div class="form-column">
            <label>Urgência</label>
            <select class="input">
              <option>Selecione</option>
              <option>Alta</option>
              <option>Média</option>
              <option>Baixa</option>
            </select>
          </div>
        </div>
        <button class="submit-button">Cadastrar</button>
      </div>
    </div>
    <div v-if="activeModal === 'consulta'" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">×</button>

        <h2>Cadastrar consulta</h2>
        <p class="subtext">Insira os dados breves da consulta.</p>

        <label>Cód. do Paciente</label>
        <input type="text" placeholder="Digite aqui" class="input" />

        <label>Descrição breve de sintomas</label>
        <textarea
          placeholder="Digite aqui"
          class="input"
          style="height: 100px"
        ></textarea>

        <div class="form-row">
          <div class="form-column">
            <label>Data</label>
            <input type="date" class="input" />
          </div>
          <div class="form-column">
            <label>Horário</label>
            <input type="time" class="input" />
          </div>
        </div>

        <label>Anexos</label>
        <input
          type="text"
          placeholder="Arquivos de exames enviados, receitas (PDF ou imagens)"
          class="input"
        />

        <button class="submit-button">Cadastrar</button>
      </div>
    </div>

    <!-- Modal de consulta -->
    <template v-else-if="activeView === 'consultas'">
      <section
        class="consultas-view"
        style="
          display: flex;
          justify-content: center;
          padding: 2rem;
          margin-right: 100px;
        "
      >
        <div style="width: 100%; max-width: 960px">
          <header
            class="header"
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 2rem;
            "
          >
            <h2 style="font-size: 1.5rem">Consultas</h2>
            <div style="display: flex; gap: 1rem">
              <button @click="openModal('consulta')" class="btn">
                + Nova Consulta
              </button>
              <input type="text" class="search" placeholder="Pesquisar" />
            </div>
          </header>

          <section class="chart-section" style="margin-bottom: 2rem">
            <h3 style="margin-bottom: 1rem">Sintomas</h3>
            <PatientChart />
          </section>

          <table
            class="consultas-table"
            style="width: 100%; border-collapse: collapse"
          >
            <thead>
              <tr style="text-align: left; border-bottom: 2px solid #ccc">
                <th style="padding: 0.75rem">Cód.</th>
                <th style="padding: 0.75rem">Descrição de Sintomas</th>
                <th style="padding: 0.75rem">Data</th>
                <th style="padding: 0.75rem">Horário</th>
                <th style="padding: 0.75rem">Anexos</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 6" :key="i" style="border-bottom: 1px solid #eee">
                <td style="padding: 0.75rem">001</td>
                <td style="padding: 0.75rem">Dor forte no peito</td>
                <td style="padding: 0.75rem">21/05/2025</td>
                <td style="padding: 0.75rem">14:00</td>
                <td style="padding: 0.75rem">
                  <button class="btn">Abrir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>

    <!-- Right Sidebar -->
    <aside class="right-sidebar">
      <div class="profile">
        <div class="avatar">👨‍⚕️</div>
        <div>
          <p class="name">Daniel Souza</p>
          <p class="specialty">Cardiologista</p>
          <p class="location">João Pessoa, PB</p>
        </div>
      </div>

      <div class="calendar">
        <h3>Outubro</h3>
        <div class="calendar-grid">
          <span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span
          ><span>S</span><span>D</span> <span>19</span><span>20</span
          ><span class="active">21</span><span>22</span> <span>23</span
          ><span>24</span><span>25</span>
        </div>
      </div>

      <div class="right-appointments">
        <h3>Próximas Consultas</h3>
        <AppointmentItem
          name="Samuel"
          specialty="Cardiologia"
          time="09:20 - 11:30"
        />
        <AppointmentItem
          name="Lucas"
          specialty="Cardiologia"
          time="11:30 - 12:30"
        />
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PatientChart from "./PatientChart.vue";

const activeView = ref("overview"); // 'overview' ou 'pacientes'
const activeModal = ref(null);

function openModal(type) {
  activeModal.value = type;
}

function closeModal() {
  activeModal.value = null;
}
function showConsultas() {
  activeView.value = "consultas";
}
const pacientes = [
  {
    codigo: "001",
    nome: "Samuel Souza de Lins",
    nascimento: "26/02/1988",
    sexo: "Masculino",
    urgencia: true,
  },
  {
    codigo: "002",
    nome: "Lucas Emanuel da Silva",
    nascimento: "12/08/2002",
    sexo: "Masculino",
    urgencia: false,
  },
  {
    codigo: "003",
    nome: "Lucas Emanuel da Silva",
    nascimento: "12/08/2002",
    sexo: "Masculino",
    urgencia: false,
  },
  {
    codigo: "004",
    nome: "Lucas Emanuel da Silva",
    nascimento: "12/08/2002",
    sexo: "Masculino",
    urgencia: false,
  },
  {
    codigo: "005",
    nome: "Lucas Emanuel da Silva",
    nascimento: "12/08/2002",
    sexo: "Masculino",
    urgencia: false,
  },
];
</script>
<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  background: #f7fbfd;
}

.sidebar {
  width: 220px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  border-right: 1px solid #e0e0e0;
  height: 100vh;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.logo-img {
  height: 40px;
}

.nav-menu {
  flex-grow: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  color: #666;
  text-decoration: none;
  transition: background-color 0.3s;
}

.nav-item .icon {
  margin-right: 1rem;
  font-size: 1.2rem;
}

.nav-item.active,
.nav-item:hover {
  background-color: #e8f4f8;
  color: #007b9e;
  font-weight: 600;
  border-left: 3px solid #007b9e;
}

.bottom-exit {
  margin-top: auto;
  padding: 1rem 0;
}
.main-content {
  flex: 1;
  padding: 20px;
  background: #f7fbfd;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.main-content::-webkit-scrollbar-thumb {
  background-color: #9ba59c;
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background-color: #388e3c;
}
.right-sidebar {
  max-width: 300px;
  width: 100%;
  background: white;
  border-left: 1px solid #e5e7eb;
  padding: 20px;
}

.logo {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 40px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  color: #374151;
}

.menu-item:hover {
  background: #f3f4f6;
}

.menu-item.active {
  background: #e0f2fe;
  color: #0284c7;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-size: 24px;
  font-weight: 600;
}

.search {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.welcome-card {
  background: #bae6fd;
  padding: 20px;
  border-radius: 16px;
  margin: 20px 0;
}

.welcome-card h2 {
  margin: 0;
  font-size: 20px;
}

.welcome-card p {
  margin: 4px 0 0;
  font-size: 14px;
}

.kpis {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.kpi-card {
  background: white;
  padding: 16px;
  border-radius: 16px;
  display: flex;
  gap: 10px;
  align-items: center;
  flex: 1;
}

.kpi-card .icon {
  font-size: 28px;
}

.kpi-card .value {
  font-size: 20px;
  font-weight: 600;
}

.kpi-card .label {
  font-size: 14px;
  color: gray;
}

.chart-section {
  background: white;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 20px;
}

.bottom-section {
  display: flex;
  gap: 20px;
}

.next-appointments {
  background: white;
  padding: 20px;
  border-radius: 16px;
  flex: 1;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.btn {
  background: #0284c7;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
}

.btn:hover {
  background: #0369a1;
}

.profile {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 30px;
}

.profile .avatar {
  width: 50px;
  height: 50px;
  background: #e0f2fe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile .name {
  font-weight: 600;
}

.profile .specialty {
  font-size: 13px;
  color: #6b7280;
}

.profile .location {
  font-size: 12px;
  color: #9ca3af;
}

/* Calendar */
.calendar h3 {
  margin-bottom: 8px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  text-align: center;
  font-size: 13px;
}

.calendar-grid span {
  padding: 4px;
}

.calendar-grid .active {
  background: #0284c7;
  color: white;
  border-radius: 8px;
}

/* Appointments */
.appointment {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}

.appointment .avatar {
  width: 36px;
  height: 36px;
  background: #e0f2fe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.appointment .name {
  margin: 0;
  font-weight: 500;
}

.appointment .specialty {
  font-size: 12px;
  color: #6b7280;
}

.appointment .time {
  font-size: 11px;
  color: #9ca3af;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 500px;
  max-width: 95%;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
}

.subtext {
  color: #999;
  margin-bottom: 1.5rem;
}

.input {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.form-row {
  display: flex;
  gap: 2rem;
}

.form-column {
  flex: 1;
}

.submit-button {
  background-color: #156c78;
  color: white;
  width: 100%;
  padding: 0.9rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
