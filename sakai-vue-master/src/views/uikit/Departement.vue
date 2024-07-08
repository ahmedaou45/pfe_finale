<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <!-- DataTable avec une classe de conteneur pour le défilement -->
        <div class="table-container">
          <DataTable :value="products" v-model:expandedRows="expandedRows" dataKey="id" tableStyle="min-width: 60rem">
            <!-- Template de l'en-tête avec le bouton d'ajout/formulaire -->
            <template #header>
              <button class="styled-button" @click="vv">
                {{ showForm ? 'Masquer le formulaire' : 'Ajouter' }}
              </button>
            </template>

            <!-- Colonnes de données -->
            <Column :expander="true" headerStyle="width: 3rem" />
            <Column field="id_departement" header="ID" :sortable="true">
              <template #body="slotProps">
                {{ slotProps.data.id_departement }}
              </template>
            </Column>
            <Column field="id_user_createure" header="ID Créateur" :sortable="true">
              <template #body="slotProps">
                {{ slotProps.data.id_user_createure }}
              </template>
            </Column>
            <Column field="id_user_updateure" header="ID Updateur" :sortable="true">
              <template #body="slotProps">
                {{ slotProps.data.id_user_updateure }}
              </template>
            </Column>
            <Column field="nom_department" header="Nom departement " :sortable="true">
              <template #body="slotProps">
                {{ slotProps.data.nom_departement }}
              </template>
            </Column>
            <Column field="nom_zone" header="Nom zone" :sortable="true">
              <template #body="slotProps">
                {{ slotProps.data.nom_zone }}
              </template>
            </Column>
            <Column field="created_at" header="Date Création" :sortable="true">
              <template #body="slotProps">
                {{ formatDate(slotProps.data.created_at) }}
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
        </div>


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
        <h2>Modifier le departement</h2>
        <div class="form-group">
          <label for="productName">Nom du departement</label>
          <input type="text"  id="productName" v-model="nom_departement":placeholder="`${data.nom_departement}`" class="form-control">
        </div>
        <!-- Ajoutez d'autres champs ici si nécessaire -->
        <div class="form-group submit-btn">
                <input type="submit"  class="styled-button submit-button" @click="enregistrer(data)"   value="Enregistrer">
              </div>
      </form>
    </div>
  </div>
</div>




        <!-- Modal Form pour l'ajout de département -->
        <div class="modal" :class="{ 'is-active': showForm }">
          <div class="modal-background" @click="showForm = false"></div>
          <div class="modal-content">
            <button class="modal-close is-large" aria-label="close" @click="showForm = false"></button>
            <form @submit.prevent="addDepartment">
              <h2>Ajouter un département</h2>
              <div class="form-group">
                <label for="departmentName">Nom du département</label>
                <input type="text" id="departmentName" v-model="departement">
              </div>
              <div class="form-group">
                <label for="zoneId">Nom de la zone</label>
                <select id="zoneId" v-model="zoneselsct">
                  <option value="" selected disabled>Sélectionnez la zone</option>
                  <option v-for="zone in zones" :key="zone.value" :value="zone.value">
                    {{ zone.label }}
                  </option>
                </select>
              </div>
              <div class="submit-btn">
                <button type="submit" @click="valider" class="styled-button same-width">Valider</button>
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
const nom_departement = ref('');
const departement = ref('');
const zoneselsct = ref('');
const userPermissions = $cookies?.get('user').permissions;
const expandedRows = ref(null);
let data = ref({});
const formatDate= (date) =>  {
  return format(new Date(date), 'yyyy/MM/dd');
};
const showModal2 = ref(false);
const pop = ref('');
const newDepartment = ref({
  name: '',
  zoneId: ''
});
const zones = ref([]);


onMounted(() => {
  fetchedepartement();
  
});
const vv= () =>  {
  if(userPermissions && userPermissions.includes('ajouter departement')){
      showForm.value=true;
    }else{
      pop.value='Vous n\'avez pas le droit d\'ajouter un departement ',
      showModal2.value = true;
    }
 
 
};
watch(showForm, (newValue, oldValue) => {
  if (newValue) {
    fetchezone();
  }
});
const fetchedepartement = () => {
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/departement/liste_departement',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    const departementData = response.data;
    
    // Créer une copie locale pour les mises à jour
    const updatedDepartments = [...departementData];
    
    const fetchDepartmentPromises = updatedDepartments.map(departement => {
      return fetchzoneName(departement);
    });

    // Attendre que toutes les promesses se terminent
    return Promise.all(fetchDepartmentPromises).then(() => {
      // Une fois toutes les promesses résolues, mettre à jour la variable réactive
      products.value = updatedDepartments;
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des départements :', error);
  });
};

const fetchzoneName = (departement) => {
  return axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/zone/afiicher_zone/' + departement.id_zone,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    // Mettre à jour le nom de la zone pour le département spécifique
    departement.nom_zone = response.data.nom_zone;
  })
  .catch(error => {
    console.error('Erreur lors de la récupération de la zone :', error);
  });
};
// Assurez-vous que products est initialisé comme un tableau vide



// Assurez-vous que zones est initialisé comme un tableau vide




const fetchezone = () => {
  
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/zone/liste_zone',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    
    const newZones = response.data.map(zone => ({
      
      label: zone.nom_zone,
      value: zone.id_zone,
    }));
    
    zones.value = newZones;
   
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des zones :', error);
  });
};

const editProduct = (product) => {
  if(userPermissions && userPermissions.includes('modifier departement')){
       showModal.value = true;
  data = { ...product };
    }else{
      pop.value='Vous n\'avez pas le droit de modifier le departement ',
      showModal2.value = true;
    }
 
};

const deleteProduct = (data) => {
  if(userPermissions && userPermissions.includes('supprimer departement')){
      axios({
method: 'delete',
url: `http://127.0.0.1:8000/api/departement/suprimer_departement/${data.id_departement}`,
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

fetchedepartement();
})
.catch(error => {
console.error('Erreur lors de la mise à jour du produit:', error);
});
    }else{
      pop.value='Vous n\'avez pas le droit de supprimer le departement ',
      showModal2.value = true;
    }

};


const valider = () => {
  console.log()
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/departement/ajouter_departement',
    data: {
      nom_departement: departement.value,
      id_zone:zoneselsct.value,
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
    fetchedepartement();
  })
  .catch(error => {
    console.error('Erreur lors de l\'ajout du departement:', error);
    // Afficher un message d'erreur à l'utilisateur ou effectuer une autre action nécessaire
  });
}


const enregistrer = () => {
  
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/departement/modifier_departement/'+data.id_departement,
    data: {
      nom_departement:nom_departement.value,
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
    fetchedepartement();// Recharger les produits après la modification
  })
  .catch(error => {
    console.error('Erreur lors de la modification du produit:', error);
  });
};

</script>

<style scoped>

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

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 20px;
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

.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.col-12 {
  grid-column: span 1;
}

/* Style pour la table fixe avec défilement */
.table-container {
  max-height: 400px; /* Ajustez la hauteur maximale selon vos besoins */
  overflow-y: auto; /* Ajoutez une barre de défilement vertical si nécessaire */
}

form {
  padding: 25px;
  background: #fff;
  max-width: 500px;
  width: 100%;
  border-radius: 7px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
}

form h2 {
  font-size: 27px;
  text-align: center;
  margin: 0 0 30px;
}

form .form-group {
  width: 100%;
  margin-bottom: 15px;
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
  right: 0;
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
  display: flex;
  justify-content: center;
  width: 100%;
}

.submit-btn button {
  width: 100%;
  padding: 10px 20px;
  font-size: 15px;
  color: white;
  background-color: #1BB295;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.submit-btn button:hover {
  background-color: #179b81;
}

.submit-btn button:active {
  background-color: #3e8e41;
  transform: scale(0.95);
}
.table-container {
  max-height: 400px; /* Ajustez la hauteur maximale selon vos besoins */
  overflow-y: auto; /* Ajoutez une barre de défilement vertical si nécessaire */
}

</style>
