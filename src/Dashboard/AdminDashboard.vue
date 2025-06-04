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
          <span @click="router.push('/login')" class="label">Sair</span>
        </a>
      </div>
    </aside>

    <!-- Main Content -->
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
          <PatientChart/>
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
          <table class="consultas-table">
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

      <template v-else-if="activeView === 'consultas'">
        <section class="consultas-view">
          <div class="consultas-container">
            <header class="consultas-header">
              <h2>Consultas</h2>
              <div class="header-actions">
                <button @click="openModal('consulta')" class="btn">
                  + Nova Consulta
                </button>
                <input
                  type="text"
                  v-model="searchQuery"
                  class="search"
                  placeholder="Pesquisar"
                />
              </div>
            </header>

            <section class="chart-section">
              <h3>Sintomas</h3>
              <PatientChart />
            </section>

            <div class="table-container">
              <table class="consultas-table">
                <thead>
                  <tr>
                    <th>Cód.</th>
                    <th>Descrição de Sintomas</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Anexos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="consulta in filteredConsultas"
                    :key="consulta.codigoPaciente"
                  >
                    <td>{{ consulta.codigoPaciente }}</td>
                    <td>{{ consulta.descricao }}</td>
                    <td>{{ formatDate(consulta.data) }}</td>
                    <td>{{ consulta.horario }}</td>
                    <td>
                      <button class="btn-small">Abrir</button>
                    </td>
                  </tr>
                  <tr v-if="filteredConsultas.length === 0">
                    <td colspan="5" class="no-results">
                      Nenhuma consulta encontrada.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </template>
    </main>

    <!-- Modais (mantidos iguais) -->
    <div v-if="activeModal === 'paciente'" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">×</button>
        <h2>Cadastrar paciente</h2>
        <p class="subtext">
          Insira os dados do seu paciente para localizarmos no Banco de Dados.
        </p>

        <label>Nome completo</label>
        <input
          v-model="paciente.nome"
          type="text"
          placeholder="Digite aqui"
          class="input"
        />

        <label>Data de nascimento</label>
        <input v-model="paciente.dataNasc" type="date" class="input" />

        <div class="form-row">
          <div class="form-column">
            <label>Sexo</label>
            <select v-model="paciente.sexo" class="input">
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
          <div class="form-column">
            <label>Urgência</label>
            <select v-model="paciente.urgencia" class="input">
              <option value="false">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
        </div>

        <button class="submit-button" @click="addPaciente">Cadastrar</button>
      </div>
    </div>
    <div v-if="activeModal === 'consulta'" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">×</button>

        <h2>Cadastrar consulta</h2>
        <p class="subtext">Insira os dados breves da consulta.</p>

        <label for="codigoPaciente">Cód. do Paciente</label>
        <input
          id="codigoPaciente"
          type="text"
          v-model="consulta.codigoPaciente"
          placeholder="Digite aqui"
          class="input"
        />

        <label for="descricaoSintomas">Descrição breve de sintomas</label>
        <textarea
          id="descricaoSintomas"
          v-model="consulta.descricao"
          placeholder="Digite aqui"
          class="input"
          style="height: 100px"
        ></textarea>

        <div class="form-row">
          <div class="form-column">
            <label for="dataConsulta">Data</label>
            <input
              id="dataConsulta"
              type="date"
              v-model="consulta.data"
              class="input"
            />
          </div>
          <div class="form-column">
            <label for="horarioConsulta">Horário</label>
            <input
              id="horarioConsulta"
              type="time"
              v-model="consulta.horario"
              class="input"
            />
          </div>
        </div>

        <label for="anexosConsulta">Anexos</label>
        <input
          id="anexosConsulta"
          type="text"
          v-model="consulta.anexos"
          placeholder="Arquivos de exames enviados, receitas (PDF ou imagens)"
          class="input"
        />

        <button class="submit-button" @click="addConsulta">Cadastrar</button>
      </div>
    </div>

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
import { ref, computed } from "vue";
import PatientChart from "./PatientChart.vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const activeView = ref("overview");
const activeModal = ref(null);

const router = useRouter()

const pacientes = ref([
  {
    codigo: "001",
    nome: "Samuel Souza de Lins",
    nascimento: "26/02/2022",
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
]);

const consultas = ref([]);
const searchQuery = ref("");

const paciente = ref({
  nome: "",
  dataNasc: "",
  sexo: "",
  urgencia: false,
});

const consulta = ref({
  codigoPaciente: "",
  descricao: "",
  data: "",
  horario: "",
  anexos: "",
});

function openModal(type) {
  activeModal.value = type;
}

function closeModal() {
  activeModal.value = null;
  resetPacienteForm();
  resetConsultaForm();
}

function addPaciente() {
  if (
    !paciente.value.nome ||
    !paciente.value.dataNasc ||
    !paciente.value.sexo
  ) {
    toast("Por favor preencha todos os campos obrigatórios", {
      type: "warning",
    });
    return;
  }

  const novoPaciente = {
    codigo: String(pacientes.value.length + 1).padStart(3, "0"),
    nome: paciente.value.nome,
    nascimento: paciente.value.dataNasc,
    sexo: paciente.value.sexo,
    urgencia: paciente.value.urgencia === "Alta",
  };

  pacientes.value.push(novoPaciente);
  toast("Paciente cadastrado com sucesso", { type: "success" });
  closeModal();
}

function addConsulta() {
  if (
    !consulta.value.codigoPaciente ||
    !consulta.value.descricao ||
    !consulta.value.data ||
    !consulta.value.horario
  ) {
    toast("Por favor preencha todos os campos obrigatórios", {
      type: "warning",
    });
    return;
  }

  const novaConsulta = { ...consulta.value };
  consultas.value.push(novaConsulta);

  toast("Consulta cadastrada com sucesso", { type: "success" });
  closeModal();
}

function resetPacienteForm() {
  paciente.value = {
    nome: "",
    dataNasc: "",
    sexo: "",
    urgencia: false,
  };
}

function resetConsultaForm() {
  consulta.value = {
    codigoPaciente: "",
    descricao: "",
    data: "",
    horario: "",
    anexos: "",
  };
}

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

const filteredConsultas = computed(() =>
  consultas.value.filter((c) =>
    Object.values(c).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )
);
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
  min-height: 0;
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

/* Estilos para a view de consultas */
.consultas-view {
  width: 100%;
  padding: 1rem;
  flex: 1;
}

.consultas-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.consultas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.header {
  display: flex;
  justify-content: space-between;
  max-height: 3rem;
  margin: 1rem 0;
}

h1 {
  font-size: 2rem;
}

.actions {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}

.table-container {
  flex: 1;
  overflow-y: auto;
}

.consultas-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
}

.consultas-table th,
.consultas-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}



.consultas-table th {
  border-bottom: 2px solid #ccc;
  font-weight: 600;
  background-color: #f8f9fa;
}

.no-results {
  text-align: center;
  padding: 1.5rem;
  color: #666;
}

.btn {
  background: #0284c7;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
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

.btn-small {
  background: #0284c7;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
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

.btn-small:hover {
  background: #0369a1;
}

.search {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;
}

.chart-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

.welcome-card {
  background: #bae6fd;
  padding: 20px;
  border-radius: 16px;
  margin: 20px 0;
}

.kpis {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
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
  color: black;
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
