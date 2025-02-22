<template>
  <div class="archivio">
    <h1>Archivio Ordini</h1>
    <div class="archivio-list">
      <div v-for="order in ordiniArchiviati" :key="order.id" class="order-card">
        <p><strong>Cliente:</strong> {{ order.cliente }}</p>
        <p><strong>Materiale:</strong> {{ order.materiale }}</p>
        <p><strong>Lavorazione:</strong> {{ order.lavorazione }}</p>
        <p><strong>Data:</strong> {{ formattaData(order.data) }}</p>
        <p><strong>Job ID:</strong> {{ order.jobId }}</p>
        <p><strong>Numero Ordine:</strong> {{ order.numeroOrdine }}</p>
        <p><strong>Stato:</strong> {{ order.stato }}</p>
        <p><strong>Turno:</strong> {{ order.turno }}</p>
        <button @click="eliminaOrdine(order)" class="delete-btn">Elimina</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { db } from "@/firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default {
  setup() {
    const ordini = ref([]);
    onSnapshot(collection(db, "orders"), (snapshot) => {
      ordini.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });

    const ordiniArchiviati = computed(() => {
      return ordini.value.filter((order) => order.archiviato === true);
    });

    const formattaData = (dataStr) => {
      if (!dataStr) return "";
      const parti = dataStr.split("-");
      return `${parti[2]}/${parti[1]}/${parti[0]}`;
    };

    const eliminaOrdine = async (order) => {
      const ordineRef = doc(db, "orders", order.id);
      await deleteDoc(ordineRef);
    };

    return { ordiniArchiviati, formattaData, eliminaOrdine };
  },
};
</script>

<style scoped>
.archivio {
  padding: 20px;
  text-align: center;
  color: #fff;
  background: #222;
  min-height: 100vh;
}

.archivio-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
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

.delete-btn {
  padding: 5px 10px;
  background-color: #6c757d;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin-top: 10px;
}

.delete-btn:hover {
  background-color: #5a6268;
}
</style>
