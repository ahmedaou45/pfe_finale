<template>
    <form @submit.prevent="handleSubmit">
      <h2>Nouvel utilisateur</h2>
  
      <div class="form-group">
        <label for="userName">Nom d'utilisateur</label>
        <input v-model="formData.userName" type="text" id="userName">
      </div>
  
      <div class="form-group">
        <label for="mail">Email</label>
        <input v-model="formData.mail" type="text" id="mail">
      </div>
  
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input v-model="formData.password" type="password" id="password">
      </div>
  
      <div class="form-group">
        <label for="dt_Db_ses">Date début session</label>
        <input v-model="formData.dt_Db_ses" type="date" id="dt_Db_ses">
      </div>
  
      <div class="form-group">
        <label for="dt_Fn_ses">Date fin session</label>
        <input v-model="formData.dt_fn_ses" type="date" id="dt_fn_ses">
      </div>
  
      <div class="form-group">
        <label for="empl">Employés</label>
        <select v-model="formData.empl" id="empl">
          <option value="" selected disabled>Sélectionnez l'employé</option>
          <option value="employé 1">employé 1</option>
          <option value="employé 2">employé 2</option>
          <option value="employé 3">employé 3</option>
        </select>
      </div>
  
      <div class="form-group">
        <label for="role">Rôle</label>
        <select v-model="formData.role" id="role">
          <option value="" selected disabled>Sélectionnez le rôle</option>
          <option value="role 1">rôle 1</option>
          <option value="role 2">rôle 2</option>
          <option value="role 3">rôle 3</option>
        </select>
      </div>
    
      <div class="form-group submit-btn">
        <input type="submit" value="Valider">
      </div>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          userName: '',
          mail: '',
          password: '',
          dt_Db_ses: '',
          dt_fn_ses: '',
          empl: '',
          role: ''
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
          userName: '',
          mail: '',
          password: '',
          dt_Db_ses: '',
          dt_fn_ses: '',
          empl: '',
          role: ''
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
  
  