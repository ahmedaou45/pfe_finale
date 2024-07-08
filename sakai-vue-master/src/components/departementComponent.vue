<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <h2>Nouveau département</h2>

      <div class="form-group">
        <label for="name">Nom département</label>
        <input type="text" v-model="departmentName" id="name" required>
      </div>

      <div class="form-group">
        <label for="zone">Zone</label>
        <select v-model="formData.zone" id="zone">
          <option value="" selected disabled>Selectionnez la zone</option>
          <option value="Zone 1">Zone 1</option>
          <option value="Zone 2">Zone 2</option>
          <option value="Zone 3">Zone 3</option>
        </select>
      </div>

      <div class="form-group submit-btn">
        <input type="submit" value="Valider">
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const departmentId = ref('');
const departmentName = ref('');
const formData = {
  zone: ''
};

const handleSubmit = () => {
  console.log('ID:', departmentId.value);
  console.log('Nom département:', departmentName.value);
  console.log('Zone sélectionnée:', formData.zone);
  // Vous pouvez ajouter la logique de soumission ici
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh; /* Ajustement pour réduire la hauteur */
  padding: 15px;
}

form {
  background: #fff;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border-radius: 7px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
}

form h2 {
  font-size: 24px;
  text-align: center;
  margin: 0 0 20px;
}

.form-group {
  margin-bottom: 10px;
}

form label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

form input, form select {
  height: 35px;
  padding: 8px;
  width: 100%;
  font-size: 14px;
  outline: none;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #bfbfbf;
}

form input:focus, form select:focus {
  border-color: #9a9a9a;
}

form input.error {
  border-color: #f91919;
  background: #f9f0f1;
}

form small {
  font-size: 13px;
  margin-top: 5px;
  display: block;
  color: #f91919;
}

.submit-btn {
  margin-top: 20px;
}

.submit-btn input {
  color: white;
  border: none;
  height: auto;
  font-size: 14px;
  padding: 10px 0;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  background: #1BB295;
  transition: 0.2s ease;
}

.submit-btn input:hover {
  background: #179b81;
}
</style>
