<template>
    <div class="form-container">
      <form>
        <h2>Nouvelle zone</h2>
  
        <div class="form-group">
          <label for="zoneName">Nom zone</label>
          <input type="text" id="zoneName">
        </div>
  
        <div class="form-group submit-btn">
          <button class="styled-button" type="submit">Valider</button>
          
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      hideForm() {
        this.$emit('close'); // Émet un événement pour masquer le formulaire
      }
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  form {
    padding: 25px;
    background: #fff;
    max-width: 500px;
    width: 100%;
    border-radius: 7px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
  }
  
  form h2 {
    font-size: 27px;
    text-align: center;
    margin: 0px 0 30px;
  }
  
  .form-group {
    margin-bottom: 15px;
    position: relative;
  }
  
  form label {
    display: block;
    font-size: 15px;
    margin-bottom: 7px;
  }
  
  form input {
    height: 45px;
    padding: 10px;
    width: 100%;
    font-size: 15px;
    outline: none;
    background: #fff;
    border-radius: 3px;
    border: 1px solid #bfbfbf;
  }
  
  .submit-btn {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
  
  .styled-button {
    padding: 10px 20px;
    font-size: 12px;
    color: white;
    background-color: #1BB295;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .styled-button:hover {
    background-color: #179b81;
  }
  
  .styled-button:active {
    background-color: #3e8e41; /* Vert encore plus foncé */
    transform: scale(0.95);
  }
  </style>
  