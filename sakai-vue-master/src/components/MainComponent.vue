<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <h2>Nouveau inventaire</h2>

      <div class="form-group">
        <label for="inventory-name">Nom inventaire</label>
        <input type="text" id="inventory-name" v-model="form.name" placeholder="Entrez le nom de l'inventaire">
      </div>

      <div class="form-group">
        <label for="observation">Observation</label>
        <input type="text" id="observation" v-model="form.observation" placeholder="Entrez l'observation">
      </div>

      <div class="form-group submit-btn">
        <input type="submit" value="Valider">
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        observation: ''
      }
    };
  },
  methods: {
    submitForm() {
      console.log(this.form);
      // Logique de soumission du formulaire ici
    }
  }
};
</script>

<style scoped>
.form-container {
  position: relative;
  max-width: 400px;
  margin: auto;
  padding: 30px 40px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrer les éléments horizontalement */
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555555;
}

input[type="text"] {
  width: 100%;
  padding: 12px 15px;
  font-size: 14px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus {
  border-color: #007BFF;
  outline: none;
}

.submit-btn {
  text-align: center;
  width: 100%;
}

.submit-btn input[type="submit"] {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: #ffffff;
  background: linear-gradient(90deg, #1BB295 0%, #179b81 100%);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

.submit-btn input[type="submit"]:hover {
  background: linear-gradient(90deg, #179b81 0%, #1BB295 100%);
  transform: scale(1.05);
}
</style>
