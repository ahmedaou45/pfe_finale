<template>
    <div class="form-container">
      <form  @submit.prevent="submitForm">
        <h2>Nouveau Bien</h2>
  
        <div class="form-group">
          <label for="name">Libellé</label>
          <input type="text" id="name" v-model="bien.name" required>
        </div>
  
        <div class="form-group">
          <label for="price">Prix d'achat</label>
          <input type="number" id="price" v-model.number="bien.price" required>
        </div>
  
        <div class="form-group">
          <label for="category">Date d'achat</label>
          <input type="Date" id="category" v-model="bien.category" required>
        </div>
  
        <div class="form-group">
          <label for="rating">Code</label>
          <input type="number" id="rating" v-model.number="bien.rating" min="1" max="5" required>
        </div>

        <div class="form-group">
          <label for="rating">Durée de vie</label>
          <input type="number" id="rating" v-model.number="bien.rating" min="1" max="5" required>
        </div>

        <div class="form-group">
          <label for="rating">Fournisseur</label>
          <input type="number" id="rating" v-model.number="bien.rating" min="1" max="5" required>
        </div>

        <div class="form-group">
          <label for="rating">Num série</label>
          <input type="number" id="rating" v-model.number="bien.rating" min="1" max="5" required>
        </div>
  
        <div class="form-group submit-btn">
          <button type="submit">Valider</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const bien = ref({
    name: '',
    price: null,
    category: '',
    rating: null
  });
  
  const submitForm = () => {
    // Ici, vous pouvez ajouter la logique pour soumettre le formulaire
    // Par exemple, émettre un événement ou appeler une méthode du parent pour traiter les données
    emit('submit-form', bien.value); // Émet un événement avec les données du bien
  };
  </script>
  
  <style scoped>
  .form-container {
    padding: 25px;
    background: #fff;
    max-width: 500px;
    width: 100%;
    border-radius: 7px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 27px;
    text-align: center;
    margin: 0 0 30px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-size: 15px;
    margin-bottom: 7px;
  }
  
  input[type="text"],
  input[type="number"] {
    height: 45px;
    padding: 10px;
    width: 100%;
    font-size: 15px;
    outline: none;
    background: #fff;
    border-radius: 3px;
    border: 1px solid #bfbfbf;
  }
  
  input[type="text"]:focus,
  input[type="number"]:focus {
    border-color: #9a9a9a;
  }
  
  .submit-btn button {
    color: white;
    border: none;
    height: auto;
    font-size: 16px;
    padding: 13px 0;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    text-align: center;
    background: #1BB295;
    width: 100%;
    transition: 0.2s ease;
  }
  
  .submit-btn button:hover {
    background: #179b81;
  }
  </style>
  