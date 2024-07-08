<template>
  <form @submit.prevent="handleSubmit">
    <h2>Nouveau comptage</h2>

    <div class="form-group">
      <label for="comptageName">Nom comptage</label>
      <input v-model="formData.comptageName" type="text" id="comptageName">
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

    <div class="form-group">
      <label for="department">Département</label>
      <select v-model="formData.departement" id="department">
        <option value="" selected disabled>Selectionnez le departement</option>
        <option value="Departement 1">Departement 1</option>
        <option value="Departement 2">Departement 2</option>
        <option value="Departement 3">Departement 3</option>
      </select>
    </div>

    <div class="form-group">
      <label for="observation">Observation</label>
      <input v-model="formData.observation" type="text" id="observation">
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
