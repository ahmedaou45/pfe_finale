<template>
    <form @submit.prevent="handleSubmit">
      <h2>Nouveau Rôle</h2>
  
      <div class="form-group">
        <label for="roleName">Nom rôle</label>
        <input v-model="formData.comptageName" type="text" id="roleName">
      </div>
  
      <div class="form-group">
        <label for="route">Liste des permissions</label>
        <select v-model="formData.zone" id="route">
          <option value="" selected disabled>Selectionnez les permissions</option>
          <option value="Route 1">Route 1</option>
          <option value="Route 2">Route 2</option>
          <option value="Route 3">Route 3</option>
          <option value="Route 4">Route 4</option>
        </select>
      </div>
  
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          comptageName: '',
          zone: '',
          departement: '',
          observation: ''
        }
      };
    },
    methods: {
      handleSubmit() {
        this.$emit('form-submitted', this.formData); // Émet un événement avec les données
        this.resetForm();
      },
      resetForm() {
        this.formData = {
          comptageName: '',
          zone: '',
          departement: '',
          observation: ''
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-size: 15px;
    margin-bottom: 7px;
  }
  
  input,
  select {
    height: 45px;
    padding: 10px;
    width: 100%;
    font-size: 15px;
    outline: none;
    background: #fff;
    border-radius: 3px;
    border: 1px solid #bfbfbf;
  }
  
  input:focus,
  select:focus {
    border-color: #9a9a9a;
  }
  
  .submit-btn {
    margin-top: 30px;
  }
  
  .submit-btn input {
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
    transition: 0.2s ease;
  }
  
  .submit-btn input:hover {
    background: #179b81;
  }
  </style>
  