<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <!-- DataTable -->
        <DataTable :value="products" v-model:expandedRows="expandedRows" dataKey="id" tableStyle="min-width: 60rem">
          <template #header>
            <div>
              <button @click="toggleForm" class="styled-button">{{ showForm ? 'Masquer' : 'Ajouter' }}</button>
            </div>
          </template>
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="id_employe" header="ID" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.id_employe }}
            </template>
          </Column>
          <Column field="id_user_createure" header="ID Créateur" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.id_user_createure }}
            </template>
          </Column>
          <Column field="id_user_updateure" header="ID Updateur" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.id_user_updateure}}
            </template>
          </Column>
          <Column field="nom_employe" header="Nom" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.nom_employe }}
            </template>
          </Column>
          <Column field="prenom_employe" header="Prenom" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.prenom_employe }}
            </template>
          </Column>
          <Column field="created_at" header="Date Création" :sortable="true">
            <template #body="slotProps">
              {{formatDate( slotProps.data.created_at) }}
            </template>
          </Column>
          <Column field="updated_at" header="Date Modification" :sortable="true">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.updated_at) }}
            </template>
          </Column>
          <Column field="inventoryStatus" header="Action" :sortable="true">
            <template #body="{ data }">
              <div class="action-buttons">
                <button @click="editProduct(data)" class="action-button edit-button" title="Modifier">
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button @click="deleteProduct(data)" class="action-button delete-button" title="Suprimer">
  <i class="fas fa-trash-alt"></i> 
</button> 

              </div>
            </template>
          </Column>
        </DataTable>
        

        <div class="modal" :class="{ 'is-active': showModal2 }">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-content">
    <div class="modal-header">
      
    </div>
    <div class="modal-body">
      <button class="modal-close is-large" aria-label="close" @click="showModal2 = false"></button>
  <textarea v-model="pop" class="custom-textarea" ></textarea>
    </div>
  </div>
</div>

        <div class="modal" :class="{ 'is-active': showModal }">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-content">
    <div class="modal-header">
      
    </div>
    <div class="modal-body">
      <button class="modal-close is-large" aria-label="close" @click="showModal = false"></button>
      <form @submit.prevent="updateProduct">
        <h2>Modifier employe</h2>
        <div class="form-group">
          <label for="productName">Nom de l'employe</label>
          <input type="text"  id="productName" v-model="nom_employe":placeholder="`${data.nom_employe}`" class="form-control">
        </div>
        <div class="form-group">
          <label for="productName">Prenom de l'employe</label>
          <input type="text"  id="productName" v-model="prenom_employe":placeholder="`${data.prenom_employe}`" class="form-control">
        </div>
        <div class="form-group submit-btn">
                <input type="submit"  class="styled-button submit-button" @click="enregistrer(data)"   value="Enregistrer">
              </div>
      </form>
    </div>
  </div>
</div>


        <!-- Modal Form -->
        <div class="modal" :class="{ 'is-active': showForm }">
          <div class="modal-background" @click="showForm = false"></div>
          <div class="modal-content">
            <button class="modal-close is-large" aria-label="close" @click="showForm = false"></button>
            <form @submit.prevent="submitForm">
              <h2>Nouvelle employé</h2>
              <div class="form-group">
                <label for="nom">Nom</label>
                <input type="text" id="nom" v-model="employe_nom">
              </div>
              <div class="form-group">
                <label for="prenom">Prénom</label>
                <input type="text" id="prenom" v-model="employe_prenom">
              </div>
              <div class="form-group submit-btn">
                <input type="submit" @click="valider"   value="Valider">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, inject } from 'vue';
import { format } from 'date-fns';
import axios from 'axios';
const showModal = ref(false);
const $cookies = inject('$cookies');
const products = ref([]);
const showForm = ref(false);
const employe_nom = ref('');
const employe_prenom = ref('');
const prenom_employe = ref('');
const nom_employe = ref('');
const expandedRows = ref(null);
let data = ref({});
const showModal2 = ref(false);
const pop = ref('');
const formatDate= (date) =>  {
  return format(new Date(date), 'yyyy/MM/dd');
};
const userPermissions = $cookies?.get('user').permissions;
onMounted(() => {
  fetcheemploye();
});

const fetcheemploye = () => {
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/employe/liste_employe',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
   
    products.value = response.data;
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des produits :', error);
  });
};


const toggleForm = () => {
  if(userPermissions && userPermissions.includes('ajouter employe')){
       showForm.value = !showForm.value;
    }else{
      pop.value='Vous n\'avez pas le droit d\'ajouter un employe ',
      showModal2.value = true;
    }
 
};

const submitForm = () => {
  // Logique pour soumettre le formulaire
};



const deleteProduct = (data) => {
  if(userPermissions && userPermissions.includes('supprimer employe')){
      axios({
method: 'delete',
url: `http://127.0.0.1:8000/api/employe/suprimer_employe/${data.id_employe}`,
headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${$cookies?.get('token')}`
}
})
.then(response => {
  pop.value=response.data.message;
     if(pop.value!=null){
      showModal2.value = true;
     }
fetcheemploye();
})
.catch(error => {
console.error('Erreur lors de la mise à jour du produit:', error);
});
    }else{
      pop.value='Vous n\'avez pas le droit de supprimer l\'employe ',
      showModal2.value = true;
    }

};


const valider = () => {
  console.log("nknnoono");
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/employe/ajouter_employe',
    data: {
      nom_employe: employe_nom.value,
      prenom_employe: employe_prenom.value
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    
    // Fermer le modal ou effectuer d'autres actions nécessaires
   showForm.value = false; 
    // Recharger les zone après l'ajout
    fetcheemploye();
  })
  .catch(error => {
    console.error('Erreur lors de l\'ajout du comptage:', error);
    // Afficher un message d'erreur à l'utilisateur ou effectuer une autre action nécessaire
  });
}


const editProduct = (product) => {
  if(userPermissions && userPermissions.includes('modifier employe')){
       showModal.value = true;
  data = { ...product };
    }else{
      pop.value='Vous n\'avez pas le droit de modifier \'employe ',
      showModal2.value = true;
    }
 
}

const enregistrer = () => {
  
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/employe/modifier_employe/'+data.id_employe,
    data: {
      ...(nom_employe.value && { 'nom_employe': nom_employe.value }),
      ...(prenom_employe.value && { 'prenom_employe': prenom_employe.value }),
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    console.log('Produit modifié avec succès:', response.data);
    showModal.value = false; // Fermer le modal après la modification
    fetcheemploye();
  })
  .catch(error => {
    console.error('Erreur lors de la modification du produit:', error);
  });
};
</script>



<style scoped>
/* Styles CSS spécifiques au composant */
.custom-textarea {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: none;
  outline: none; /* Supprime le contour de sélection */
  resize: none; /* Empêche le redimensionnement du textarea par l'utilisateur */
  text-align: center; /* Centre le texte à l'intérieur du textarea */
}



.action-buttons {
  display: flex;
}

.action-button {
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 12px;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.edit-button {
  background-color: #007bff;
}

.delete-button {
  background-color: #dc3545;
}

.action-button:hover {
  opacity: 0.8;
}

.action-button:active {
  transform: scale(0.95);
}

.styled-button {
  padding: 10px 20px;
  margin-right: 10px;
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
  background-color: #3e8e41;
  transform: scale(0.95);
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

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
  input.error,
  select.error {
    border-color: #f91919;
    background: #f9f0f1;
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



  .action-buttons {
  display: flex;
}
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal.is-active {
  display: flex;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  position: relative;
}

.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
}

.modal-close:before {
  content: '\00d7';
  font-size: 28px;
  color: #333;
}

</style>








<!--

<script setup>

</script>



<template>
    <div class="grid">
      
        <form action="thank-you.html">
      <h2>Nouveau membre</h2>

      <div class="form-group email">
        <label for="email">Nom </label>
        <input type="text" id="email">
      </div>

      <div class="form-group email">
        <label for="email">Prenom </label>
        <input type="text" id="email">
      </div>
      
      <div class="form-group submit-btn">
        <input type="submit" value="Valider">
      </div>
    </form>



        <div class="col-12">
            <div class="card">
                
                <DataTable :value="products" v-model:expandedRows="expandedRows" dataKey="id" tableStyle="min-width: 60rem">
                    <template #header>
                        <div>
                          <button class="styled-button">Ajouter</button>
                        </div>
                    
                    </template>
                    <Column :expander="true" headerStyle="width: 3rem" />
                    <Column field="ID" header="ID" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>

                    <Column field="Nom" header="Nom" :sortable="true">  
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>

                    <Column field="Prenom" header="Prenom" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>

                    <Column field="Action" header="Action" :sortable="true">
                        <template #body="slotProps">
                            <Tag :severity="getBadgeSeverity(slotProps.data.inventoryStatus)">{{ slotProps.data.inventoryStatus }}</Tag>
                        </template>
                    </Column>

                </DataTable>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}


</style>

<style scoped lang="scss">

.styled-button {
  padding: 10px 20px;
  margin-right: 10px;
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  min-height: 100vh;
  background: #1BB295;
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
form .form-group {
  margin-bottom: 15px;
  position: relative;
}
form label {
  display: block;
  font-size: 15px;
  margin-bottom: 7px;
}
form input,
form select {
  height: 45px;
  padding: 10px;
  width: 100%;
  font-size: 15px;
  outline: none;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #bfbfbf;
}
form input:focus,
form select:focus {
  border-color: #9a9a9a;
}
form input.error,
form select.error {
  border-color: #f91919;
  background: #f9f0f1;
}
form small {
  font-size: 14px;
  margin-top: 5px;
  display: block;
  color: #f91919;
}
form .password i {
  position: absolute;
  right: 0px;
  height: 45px;
  top: 28px;
  font-size: 13px;
  line-height: 45px;
  width: 45px;
  cursor: pointer;
  color: #939393;
  text-align: center;
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
-->