<template>
  <div class="dashboard">
    <div class="container">
      <!-- Form di Inserimento Ordine -->
      <div class="order-form">
        <h2>Inserisci Nuovo Ordine</h2>

        <!-- Riga 1: Cliente e Materiale -->
        <div class="form-row">
          <div class="form-item">
            <label for="cliente">Cliente</label>
            <input id="cliente" v-model="cliente" type="text" placeholder="Es. Mario Rossi" />
          </div>
          <div class="form-item">
            <label for="materiale">Materiale</label>
            <input id="materiale" v-model="materiale" type="text" placeholder="Es. Acciaio 2mm" />
          </div>
        </div>

        <!-- Riga 2: Lavorazione e Data -->
        <div class="form-row">
          <div class="form-item">
            <label for="lavorazione">Lavorazione</label>
            <select id="lavorazione" v-model="lavorazione">
              <option value="" disabled>Seleziona la lavorazione</option>
              <option value="Taglio">Taglio</option>
              <option value="Piegatura">Piegatura</option>
              <option value="Taglio + Piegatura">Taglio + Piegatura</option>
              <option value="Satinatura">Satinatura</option>
            </select>
          </div>
          <div class="form-item">
            <label for="data">Data</label>
            <input id="data" v-model="data" type="date" />
          </div>
        </div>

        <!-- Riga 3: Numero Job e Numero Ordine -->
        <div class="form-row">
          <div class="form-item">
            <label for="jobId">Numero Job</label>
            <input id="jobId" v-model="jobId" type="number" placeholder="Es. 1234" />
          </div>
          <div class="form-item">
            <label for="numeroOrdine">Numero Ordine</label>
            <input id="numeroOrdine" v-model="numeroOrdine" type="number" placeholder="Es. 5678" />
          </div>
        </div>

        <!-- Riga 4: Stato e Turno -->
        <div class="form-row">
          <div class="form-item">
            <label for="stato">Stato</label>
            <select id="stato" v-model="stato">
              <option value="In attesa">In attesa</option>
              <option value="In lavorazione">In lavorazione</option>
              <option value="Lavorato">Lavorato</option>
            </select>
          </div>
          <div class="form-item">
            <label for="turno">Turno</label>
            <select id="turno" v-model="turno">
              <option value="Mattina">Mattina</option>
              <option value="Pomeriggio">Pomeriggio</option>
              <option value="Notte">Notte</option>
            </select>
          </div>
        </div>

        <button @click="aggiungiOrdine">➕ Aggiungi Ordine</button>
      </div>

      <!-- Sezione Gestione Ordini e Filtri -->
      <div class="order-section">
        <h2>Gestione Ordini</h2>
        <div class="filters">
          <div class="filter-item">
            <label for="filtro-data">Data</label>
            <input id="filtro-data" v-model="filtroData" type="date" />
          </div>
          <div class="filter-item">
            <label for="filtro-job">Job ID</label>
            <input id="filtro-job" v-model="filtroJob" type="number" placeholder="Inserisci Job ID" />
          </div>
          <div class="filter-item">
            <label for="filtro-lavorazione">Lavorazione</label>
            <select id="filtro-lavorazione" v-model="filtroLavorazione">
              <option value="">Tutte</option>
              <option value="Taglio">Taglio</option>
              <option value="Piegatura">Piegatura</option>
              <option value="Taglio + Piegatura">Taglio + Piegatura</option>
              <option value="Satinatura">Satinatura</option>
            </select>
          </div>
          <div class="filter-item">
            <label for="filtro-turno">Turno</label>
            <select id="filtro-turno" v-model="filtroTurno">
              <option value="">Tutti i turni</option>
              <option value="Mattina">Mattina</option>
              <option value="Pomeriggio">Pomeriggio</option>
              <option value="Notte">Notte</option>
            </select>
          </div>
          <div class="filter-item">
            <label for="searchQuery">Ricerca</label>
            <input id="searchQuery" v-model="searchQuery" type="text" placeholder="Cerca Cliente, Materiale o Ordine" />
          </div>
          <div class="filter-item">
            <label for="sortField">Ordina per</label>
            <select id="sortField" v-model="sortField">
              <option value="">Nessun ordinamento</option>
              <option value="data">Data</option>
              <option value="jobId">Job ID</option>
              <option value="numeroOrdine">Numero Ordine</option>
            </select>
          </div>
          <div class="filter-item">
            <label for="sortOrder">Ordine</label>
            <select id="sortOrder" v-model="sortOrder">
              <option value="asc">Ascendente</option>
              <option value="desc">Discendente</option>
            </select>
          </div>
        </div>

        <div class="order-list">
          <div v-for="order in ordiniFiltrati" :key="order.id" class="order-card">
            <p><strong>Cliente:</strong> {{ order.cliente }}</p>
            <p><strong>Materiale:</strong> {{ order.materiale }}</p>
            <p><strong>Lavorazione:</strong> {{ order.lavorazione }}</p>
            <p><strong>Data:</strong> {{ formattaData(order.data) }}</p>
            <p><strong>Job ID:</strong> {{ order.jobId }}</p>
            <p><strong>Numero Ordine:</strong> {{ order.numeroOrdine }}</p>
            <p>
              <strong>Stato:</strong>
              <span :class="getStatoClass(order.stato)" class="status-dot"></span>
              <select v-model="order.stato" @change="aggiornaOrdine(order)">
                <option value="In attesa">In attesa</option>
                <option value="In lavorazione">In lavorazione</option>
                <option value="Lavorato">Lavorato</option>
              </select>
              <!-- Pulsante Modifica -->
              <button @click="openEditModal(order)" class="edit-btn">Modifica</button>
              <!-- Pulsante Archivia se Lavorato -->
              <button v-if="order.stato === 'Lavorato'" @click="archiviaOrdine(order)" class="archivia-btn">
                Archivia
              </button>
              <!-- Pulsante Elimina -->
              <button @click="eliminaOrdine(order)" class="delete-btn">Elimina</button>
            </p>
            <p><strong>Turno:</strong> {{ order.turno }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal di Modifica Ordine -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Modifica Ordine</h3>
        <div class="modal-form">
          <label>Cliente</label>
          <input v-model="editingOrder.cliente" type="text" />
          <label>Materiale</label>
          <input v-model="editingOrder.materiale" type="text" />
          <label>Lavorazione</label>
          <select v-model="editingOrder.lavorazione">
            <option value="Taglio">Taglio</option>
            <option value="Piegatura">Piegatura</option>
            <option value="Taglio + Piegatura">Taglio + Piegatura</option>
            <option value="Satinatura">Satinatura</option>
          </select>
          <label>Data</label>
          <input v-model="editingOrder.data" type="date" />
          <label>Numero Job</label>
          <input v-model="editingOrder.jobId" type="number" />
          <label>Numero Ordine</label>
          <input v-model="editingOrder.numeroOrdine" type="number" />
          <label>Stato</label>
          <select v-model="editingOrder.stato">
            <option value="In attesa">In attesa</option>
            <option value="In lavorazione">In lavorazione</option>
            <option value="Lavorato">Lavorato</option>
          </select>
          <label>Turno</label>
          <select v-model="editingOrder.turno">
            <option value="Mattina">Mattina</option>
            <option value="Pomeriggio">Pomeriggio</option>
            <option value="Notte">Notte</option>
          </select>
        </div>
        <div class="modal-buttons">
          <button @click="saveOrderEdit">Salva</button>
          <button @click="closeModal">Annulla</button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast">{{ toastMessage }}</div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default {
  setup() {
    // Ordini e filtri base
    const ordini = ref([]);
    const filtroData = ref("");
    const filtroJob = ref("");
    const filtroLavorazione = ref("");
    const filtroTurno = ref("");

    // Nuovi campi per ricerca e ordinamento
    const searchQuery = ref("");
    const sortField = ref("");
    const sortOrder = ref("asc");

    // Campi del form di inserimento
    const cliente = ref("");
    const materiale = ref("");
    const lavorazione = ref("");
    const data = ref("");
    const jobId = ref("");
    const numeroOrdine = ref("");
    const stato = ref("In attesa");
    const turno = ref("Mattina");

    // Variabili per il modal di modifica
    const showModal = ref(false);
    const editingOrder = ref({});

    // Variabili per Toast Notification
    const showToast = ref(false);
    const toastMessage = ref("");

    // Recupera gli ordini da Firestore
    onSnapshot(collection(db, "orders"), (snapshot) => {
      ordini.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });

    // Computed: filtra, cerca e ordina gli ordini
    const ordiniFiltrati = computed(() => {
      let filtrati = ordini.value.filter((order) => {
        return (
          order.archiviato !== true &&
          (!filtroData.value || order.data === filtroData.value) &&
          (!filtroJob.value || order.jobId?.toString().includes(filtroJob.value)) &&
          (!filtroLavorazione.value || order.lavorazione === filtroLavorazione.value) &&
          (!filtroTurno.value || order.turno === filtroTurno.value)
        );
      });

      // Filtro ricerca testuale
      if (searchQuery.value.trim() !== "") {
        const query = searchQuery.value.toLowerCase();
        filtrati = filtrati.filter((order) => {
          const clienteMatch = order.cliente?.toLowerCase().includes(query);
          const materialeMatch = order.materiale?.toLowerCase().includes(query);
          const numeroOrdineMatch = order.numeroOrdine?.toString().includes(query);
          return clienteMatch || materialeMatch || numeroOrdineMatch;
        });
      }

      // Ordinamento
      if (sortField.value) {
        filtrati.sort((a, b) => {
          let valA = a[sortField.value];
          let valB = b[sortField.value];
          if (sortField.value === "data") {
            valA = new Date(valA);
            valB = new Date(valB);
          } else if (typeof valA === "string") {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
          }
          if (valA < valB) return sortOrder.value === "asc" ? -1 : 1;
          if (valA > valB) return sortOrder.value === "asc" ? 1 : -1;
          return 0;
        });
      }

      return filtrati;
    });

    // Aggiunge un nuovo ordine
    const aggiungiOrdine = async () => {
      await addDoc(collection(db, "orders"), {
        cliente: cliente.value,
        materiale: materiale.value,
        lavorazione: lavorazione.value,
        data: data.value,
        jobId: jobId.value,
        numeroOrdine: numeroOrdine.value,
        stato: stato.value,
        turno: turno.value,
        archiviato: false,
      });
      // Reset campi
      cliente.value = "";
      materiale.value = "";
      lavorazione.value = "";
      data.value = "";
      jobId.value = "";
      numeroOrdine.value = "";
      stato.value = "In attesa";
      turno.value = "Mattina";
      showToastMessage("Ordine aggiunto con successo");
    };

    // Aggiorna lo stato di un ordine
    const aggiornaOrdine = async (order) => {
      const ordineRef = doc(db, "orders", order.id);
      await updateDoc(ordineRef, { stato: order.stato });
      showToastMessage("Ordine aggiornato");
    };

    // Archivia un ordine
    const archiviaOrdine = async (order) => {
      const ordineRef = doc(db, "orders", order.id);
      await updateDoc(ordineRef, { archiviato: true });
      showToastMessage("Ordine archiviato");
    };

    // Elimina un ordine
    const eliminaOrdine = async (order) => {
      const ordineRef = doc(db, "orders", order.id);
      await deleteDoc(ordineRef);
      showToastMessage("Ordine eliminato");
    };

    // Formatta data (YYYY-MM-DD -> DD/MM/YYYY)
    const formattaData = (dataStr) => {
      if (!dataStr) return "";
      const parti = dataStr.split("-");
      return `${parti[2]}/${parti[1]}/${parti[0]}`;
    };

    // Restituisce la classe per il pallino in base allo stato
    const getStatoClass = (stato) => {
      switch (stato) {
        case "In attesa":
          return "status-red";
        case "In lavorazione":
          return "status-yellow";
        case "Lavorato":
          return "status-green";
        default:
          return "";
      }
    };

    // Funzioni per il modal di modifica
    const openEditModal = (order) => {
      editingOrder.value = { ...order };
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      editingOrder.value = {};
    };

    const saveOrderEdit = async () => {
      const ordineRef = doc(db, "orders", editingOrder.value.id);
      await updateDoc(ordineRef, {
        cliente: editingOrder.value.cliente,
        materiale: editingOrder.value.materiale,
        lavorazione: editingOrder.value.lavorazione,
        data: editingOrder.value.data,
        jobId: editingOrder.value.jobId,
        numeroOrdine: editingOrder.value.numeroOrdine,
        stato: editingOrder.value.stato,
        turno: editingOrder.value.turno,
      });
      showToastMessage("Ordine modificato con successo");
      closeModal();
    };

    // Funzione per mostrare una notifica (toast)
    const showToastMessage = (message) => {
      toastMessage.value = message;
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    };

    return {
      // Ordini e filtri
      ordini,
      filtroData,
      filtroJob,
      filtroLavorazione,
      filtroTurno,
      searchQuery,
      sortField,
      sortOrder,
      ordiniFiltrati,
      // Campi form
      cliente,
      materiale,
      lavorazione,
      data,
      jobId,
      numeroOrdine,
      stato,
      turno,
      // Metodi
      aggiungiOrdine,
      aggiornaOrdine,
      archiviaOrdine,
      eliminaOrdine,
      openEditModal,
      closeModal,
      saveOrderEdit,
      // Utility
      formattaData,
      getStatoClass,
      // Modal e Toast
      showModal,
      editingOrder,
      showToast,
      toastMessage,
    };
  },
};
</script>

<style>
/* Layout Generale */
.dashboard {
  background: #222;
  color: #fff;
  min-height: 100vh;
  padding: 20px;
}

/* Contenitore Globale */
.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Form di Inserimento Ordini */
.order-form {
  background: #333;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
}

.order-form h2 {
  text-align: center;
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

.form-item {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-item label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #fff;
}

.form-row input,
.form-row select {
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
}

.order-form button {
  display: block;
  margin: 0 auto;
  padding: 10px;
  font-size: 18px;
  background: #28a745;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

/* Sezione Gestione Ordini */
.order-section {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.order-section h2 {
  margin-bottom: 15px;
}

/* Filtri */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.filter-item {
  display: flex;
  flex-direction: column;
  min-width: 180px;
}

.filter-item label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #fff;
}

.filter-item input,
.filter-item select {
  padding: 8px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
}

/* Lista Ordini */
.order-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.order-card {
  background: #444;
  padding: 15px;
  border-radius: 10px;
  width: 280px;
  text-align: left;
  color: #fff;
}

.order-card p {
  margin: 5px 0;
  font-size: 16px;
}

/* Stato: Pallini */
.status-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.status-red {
  background: red;
}
.status-yellow {
  background: orange;
}
.status-green {
  background: green;
}

/* Bottone Archivia */
.archivia-btn {
  margin-top: 5px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.archivia-btn:hover {
  background-color: #c82333;
}

/* Bottone Modifica */
.edit-btn {
  margin-top: 5px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin-right: 5px;
}

.edit-btn:hover {
  background-color: #0069d9;
}

/* Bottone Elimina */
.delete-btn {
  margin-top: 5px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #6c757d;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin-left: 5px;
}

.delete-btn:hover {
  background-color: #5a6268;
}

/* Modal di Modifica */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #333;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
}

.modal-content h3 {
  text-align: center;
  margin-bottom: 15px;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-form label {
  font-weight: 600;
  color: #fff;
}

.modal-form input,
.modal-form select {
  padding: 8px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}

.modal-buttons button {
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-buttons button:first-child {
  background: #28a745;
  color: #fff;
}

.modal-buttons button:last-child {
  background: #dc3545;
  color: #fff;
}

/* Toast Notification */
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #28a745;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1001;
}

/* Responsive */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  .filters {
    flex-direction: column;
    align-items: center;
  }
  .filter-item {
    width: 100%;
    max-width: 300px;
  }
}
</style>
