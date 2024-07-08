
<template>
    <div class="grid">
      <div class="col-12">
        <div class="card">
          <DataTable :value="comptages" v-model:expandedRows="expandedRows" dataKey="id" tableStyle="min-width: 60rem">
            <template #header>
              <div class="ahmed">
                <div class="inventory-container">
                  <label for="inventory">Liste des equipes</label>
                  <Dropdown v-model="selectedInventory" :options="inventories" optionLabel="label" placeholder="Sélectionnez l'inventaire" class="w-full md:w-14rem" />
  
                </div>
              </div>
            </template>
  
            <Column :expander="true" headerStyle="width: 3rem" />
            <Column field="id_bien" header="ID bien" :sortable="true">
              <template #body="{ data }">
                {{ data.id_bien}}
              </template>
            </Column>
            <Column field="id_user_updateure" header="ID Updateur" :sortable="true">
              <template #body="{ data }">
                {{ data.id_user_updateure}}
              </template>
            </Column>
            <Column field="nom_bien" header="Nom bien" :sortable="true">
              <template #body="{ data }">
                {{ data.nom_bien }}
              </template>
            </Column>
            <Column field="barcode" header="barcode" :sortable="true">
              <template #body="{ data }">
                {{ data.barcode}}
              </template>
            </Column>
            <Column field="etas" header="État du bien" :sortable="true">
              <template #body="{ data }">
                {{ data.etas }}
              </template>
            </Column>
            <Column field="etas_comptage" header="État comptage" :sortable="true">
  <template #body="{ data }">
    <span :class="{
      'text-green': data.etas_comptage === 'inventorie',
      'text-red': data.etas_comptage === 'non trouve'
    }">
      {{ data.etas_comptage }}
    </span>
  </template>
</Column>

            <Column field="created_at" header="Date Création" :sortable="true">
              <template #body="{ data }">
                {{ formatDate(data.created_at)}}
              </template>
            </Column>
            <Column field="updated_at" header="Date Modification" :sortable="true">
              <template #body="{ data }">
                {{ formatDate(data.updated_at )}}
              </template>
            </Column>
            <Column field="inventoryStatus" header="Action" :sortable="true">
              <template #body="{ data }">
                <div class="action-buttons">
    <button @click="editProduct(data)" class="action-button edit-button" title="Modifier etat">
        <i class="fas fa-pencil-alt"></i> 
    </button>
    <button @click="launchProduct(data)" class="action-button launch-button" title="Trouvé">
        <i class="fas fa-check"></i>
    </button>
    <button @click="closeProduct(data)" class="action-button close-button" title="Pas trouvé">
        <i class="fas fa-times"></i> 
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
        <h2>Modifier l'etat'</h2>
      </div>
      <div class="modal-body">
        <button class="modal-close is-large" aria-label="close" @click="showModal = false"></button>
        <form @submit.prevent="updateProduct">
          <div class="form-group">
            <label for="productName">Etat du bien</label>
            <input type="textarea" id="productName" v-model="editedProduct.etas" class="form-control">

          </div>
          <!-- Ajoutez d'autres champs ici si nécessaire -->
          <div class="form-group submit-btn">
                  <input type="submit" @click="enregistrer(data)"   value="Enregistrer">
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
              <form @submit.prevent="handleSubmit">
                <h2>Nouveau comptage</h2>
  
                <div class="form-group">
                  <label for="comptageName">Nom comptage</label>
                  <input v-model="formData.comptageName" type="text" id="comptageName">
                </div>
  
                <div class="form-group">
            <label for="zone">Zone</label>
            <select v-model="formData.zone" id="zone">
              <option value="" selected disabled>Sélectionnez la zone</option>
              <option v-for="zone in zones" :key="zone.value" :value="zone.value">{{ zone.label }}</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="department">Département</label>
            <select v-model="formData.departement" id="department">
              <option value="" selected disabled>Sélectionnez le département</option>
              <option v-for="departement in departements" :key="departement.value" :value="departement.value">{{ departement.label }}</option>
            </select>
          </div>
                <div class="form-group">
                  <label for="observation">Observation</label>
                  <input v-model="formData.observation" type="text" id="observation">
                </div>
  
                <div class="form-group submit-btn">
                  <input type="submit" @click="valider()" value="Valider">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, inject, watch,getCurrentInstance } from 'vue';
  import { format } from 'date-fns';
  import axios from 'axios';
  const $cookies = inject('$cookies');
  const instance = getCurrentInstance();
  // Références réactives
  const showModal2 = ref(false);
  const pop = ref('');
  const showModal = ref(false);
  const expandedRows = ref([]);
  const showForm = ref(false);
  const selectedInventory = ref(null);
  let editedProduct = ref({});
  const formData = ref({
    comptageName: '',
    zone: '',
    departement: '',
    observation: ''
  });
  const inventories = ref([]);
  let comptages = ref([]);
  const zones = ref([]); 
  const departements = ref([]); 
  
  
  const formatDate= (date) =>  {
  return format(new Date(date), 'yyyy/MM/dd');
};
     
  
  // Hook de cycle de vie
  onMounted(() => {
    fetchequipe($cookies?.get('user').id_user);
  });
  
  watch(showForm, (newValue, oldValue) => {
    if (newValue) {
      // Vérifie si selectedInventory et selectedInventory.value existent, et si selectedInventory.value.value est nul ou non défini
      if (selectedInventory?.value?.value == null) {
        pop.value = "Veuillez sélectionner un inventaire dans la barre de recherche à droite.";
        showModal2.value = true;
        showForm.value = false;
      } else {
        fetchZones();
      }
    }
  });
  
  
  
  
  // Watcher pour détecter les changements dans selectedInventory//selectedInventory.value.value
  watch(selectedInventory, (newValue, oldValue) => {
   
    if (newValue !== null) {
      fetchbien(newValue); // Appeler fetchComptages lorsque selectedInventory change
    }
  });
  
  watch(() => formData.value.zone, (newValue, oldValue) => {
    if (newValue) {
      
      fetchDepartments();
    }
  });
  
  // Méthodes
  const toggleForm = () => {
    showForm.value = !showForm.value;
  };
  
  const handleSubmit = () => {
    instance.emit('form-submitted', formData.value);
    resetForm();
  };
  
  const resetForm = () => {
    formData.value = {
      comptageName: '',
      zone: '',
      departement: '',
      observation: ''
    };
  };
  
  
  
  const fetchequipe = ($id_user) => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/equipe/afiicher_equipe_par_user/'+$id_user,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': `Bearer ${$cookies?.get('token')}`
      }
    })
    .then(response => {
      const newInventories = response.data.map(item => ({
        label: item.nom_equipe,
        value: item.id_comptage,
  
      }));
      inventories.value = newInventories;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des inventaires :', error);
    });
  };
  
  
  const fetchbien = (inventoryId) => {
    
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/comptage-bien/afiicher_comptage_bien_par_comptage/'+inventoryId.value,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${$cookies?.get('token')}`
      }
    })
    .then(response => {
      comptages.value=response.data;
      
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des comptages :', error);
    });
  };
  
  
  
  
  
  const fetchDepartmentName = (id_comptage, departmentId) => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/departement/afiicher_departement/'+departmentId,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${$cookies?.get('token')}`
      }
    })
    .then(response => {
      // Récupérer le nom du département depuis la réponse
      const departmentName = response.data.nom_departement;
     
      // Modifier le nom de l'inventaire correspondant dans la liste de comptages
      const comptageToUpdate = comptages.value.find(c => c.id_comptage === id_comptage);
      if (comptageToUpdate) {
        comptageToUpdate.departement = departmentName;
      } else {
        console.error(`Comptage avec ID ${id_comptage} non trouvé.`);
      }
    })
    .catch(error => {
      console.error(`Erreur lors de la récupération du nom du département avec ID ${departmentId}:`, error);
    });
  };
  
  
  const fetchZones = () => {
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
  
  
  
  
  const fetchDepartments = () => {
    
    
      
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/departement/afiicher_departement_par_zone/'+formData.value.zone,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${$cookies?.get('token')}`
        }
      })
      .then(response => {
         
        const newdepartments = response.data.map(dep => ({
          label: dep.nom_departement,
          value: dep.id_departement,
        }));
       
        departements.value = newdepartments;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des départements :', error);
      });
    
  };
  
  
  const valider = () => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/comptage/ajouter_comptage',
      data: {
        nom_comptage: formData.value.comptageName,
        id_departement:  formData.value.departement,
        id_inventaire:  selectedInventory.value.value,
        ...(formData.value.observation && { 'observation': formData.value.observation }),
      
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${$cookies?.get('token')}`
      }
    })
    .then(response => {
      console.log('Comptage ajouté avec succès:', response.data);
      // Fermer le modal ou effectuer d'autres actions nécessaires
      showForm.value = false; 
      // Recharger les comptages après l'ajout
      fetchComptages(selectedInventory.value);
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout du comptage:', error);
      // Afficher un message d'erreur à l'utilisateur ou effectuer une autre action nécessaire
    });
  }
  
  
  
  const launchProduct = (product) => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/comptage-bien/modifier_comptage_bien/'+selectedInventory.value.value+'/'+product.id_bien,
      data: {
        etas: 'inventorie'
      },
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
      fetchbien(selectedInventory.value);// Recharger les produits après la mise à jour
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour du produit:', error);
    });
  }
  
  
  
  
  const closeProduct = (product) => {
  
  console.log('Produit lancé :', product);
  axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/comptage-bien/modifier_comptage_bien/'+selectedInventory.value.value+'/'+product.id_bien,
      data: {
        etas: 'non trouve'
      },
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
      fetchbien(selectedInventory.value);// Recharger les produits après la mise à jour
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour du produit:', error);
    });
  }
  
  
  
  const cancelProduct = (product) => {
  
  console.log('Produit lancé :', product);
  axios({
    method: 'post',
    url: `http://127.0.0.1:8000/api/comptage/modifier_comptage/${product.id_comptage}`,
    data: {
      etas: 'annule'
    },
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
    fetchComptages(selectedInventory.value);// Recharger les produits après la mise à jour
  })
  .catch(error => {
    console.error('Erreur lors de la mise à jour du produit:', error);
  });
  }
  
  
  
  const deleteProduct = (product) => {
  
  console.log('Produit lancé :', product);
  axios({
    method: 'delete',
    url: `http://127.0.0.1:8000/api/comptage/suprimer_comptage/${product.id_comptage}`,
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
    fetchComptages(selectedInventory.value);// Recharger les produits après la mise à jour
  })
  .catch(error => {
    console.error('Erreur lors de la mise à jour du produit:', error);
  });
  }
  
  
  const editProduct = (product) => {
    
    showModal.value = true;
    editedProduct.value = { ...product };
  }
  
  
  
  //showModal.value = true;
  const enregistrer = () => {
   axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/bien/modifier_bien/'+editedProduct.value.id_bien,
      data: {
       
        etas:editedProduct.value.etas,
      
        
        // Autres champs si nécessaires
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
      fetchbien(selectedInventory.value);// Recharger les produits après la modification
    })
    .catch(error => {
      console.error('Erreur lors de la modification du produit:', error);
    });
  };
  </script>
  
  
  
  <style scoped lang="scss">
  
  
  .custom-textarea {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: none;
    outline: none; /* Supprime le contour de sélection */
    resize: none; /* Empêche le redimensionnement du textarea par l'utilisateur */
    text-align: center; /* Centre le texte à l'intérieur du textarea */
  }
  
  .ahmed {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  
  .styled-button {
    padding: 10px 20px;
    margin-right: 10px;
    font-size: 12px;
    color: white;
    background-color: #1bb295;
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
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .edit-button {
    background-color: #007bff;
  }
  
  .delete-button {
    background-color: #dc3545;
  }
  
  .launch-button {
    background-color: #28a745;
  }
  
  .cancel-button {
    background-color: #dc3545;
  }
  
  .close-button {
    background-color: #ffc107;
  }
  
  .action-button:hover {
    opacity: 0.8;
  }
  
  .action-button:active {
    transform: scale(0.95);
  }
  
  .header-container {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
  
  .card {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .form-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px 0;
    border-radius: 8px;
  }
  
  .form-group {
    padding: 10px 20px;
    flex: 1 1 30%;
    min-width: 250px;
    display: flex;
    flex-direction: column;
  }
  
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
    align-items: center;
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
    max-height: 80vh;
    overflow-y: auto;
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
    font-size: 24px;
    color: #333;
  }
  
  .modal-close:before {
    content: '\00d7';
  }
  
  
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

  .text-green {
  color: #0eeb41;
}
.text-red {
  color: #ffbf00;
}
  </style>
  