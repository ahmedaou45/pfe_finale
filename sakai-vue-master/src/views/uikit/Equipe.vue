<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <DataTable :value="products" v-model:expandedRows="expandedRows" dataKey="id" tableStyle="min-width: 60rem">
          <template #header>
            <button @click="vv" class="styled-button">
              {{ showForm ? 'Masquer le Formulaire' : 'Ajouter' }}
            </button>
          </template>
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="id_equipe" header="ID" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.id_equipe }}
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
          <Column field="id_comptage" header="ID comptage" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.id_comptage }}
            </template>
          </Column>
          <Column field="nom_equipe" header="Nom équipe" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.nom_equipe }}
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
                <button @click="assignProduct(data)" class="action-button assign-button" title="Attribuer">
                  <i class="fas fa-user-plus"></i> 
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



<div class="modal" :class="{ 'is-active': showModal3 }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h2>Affecter des users à l'équipe</h2>
      </div>
      <div class="modal-body">
        <button class="modal-close is-large" aria-label="close" @click="showModal3 = false"></button>
        <form @submit.prevent="updateProduct">
          <!-- Liste des utilisateurs avec des checkboxes -->
          <div class="form-group">
            <div v-for="user in users" :key="user.value" class="checkbox">
              <label>
                <input type="checkbox" :value="user.value" v-model="selectedUsers">
                {{ user.label}}
              </label>
            </div>
          </div>
          
          <!-- Ajoutez d'autres champs ici si nécessaire -->
          <div class="form-group submit-btn">
            <input type="submit" @click="affecter(data)" value="Enregistrer">
          </div>
        </form>
      </div>
    </div>
  </div>



        <div class="modal" :class="{ 'is-active': showModal }">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h2>Modifier equipe</h2>
    </div>
    <div class="modal-body">
      <button class="modal-close is-large" aria-label="close" @click="showModal = false"></button>
      <form @submit.prevent="updateProduct">
        <div class="form-group">
          <label for="productName">Nom de l'equipe</label>
          <input type="text"  id="productName" v-model="nom_equipe":placeholder="`${data.nom_equipe}`" class="form-control">
        </div>

        <div class="form-group">
          <label for="productName" class="centered-label">En cochant la case de l'utilisateur vous le supprimerez de l'équipe</label><br>
            <div v-for="user in userss" :key="user.value" class="checkbox">
              <label>
                <input type="checkbox" :value="user.value" v-model="selectedUsers">
                {{ user.label}}
              </label>
            </div>
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

            <form @submit.prevent="submitForm">
              <h2>Nouvelle équipe</h2>
              <div class="form-group email">
                <label for="email">Nom équipe</label>
                <input type="text" id="email" v-model="teamName">
              </div>
              <div class="form-group gender">
                <label for="inventory">Nom inventaire</label>
                <select id="inventory" v-model="inventoryName">
                  <option value="" selected disabled>Sélectionnez l'inventaire</option>
                  <option v-for="inventaire in inventaires" :key="inventaire.value" :value="inventaire.value">{{ inventaire.label }}</option>
                </select>
              </div>
              <div class="form-group gender">
                <label for="counting">Nom comptage</label>
                <select id="counting" v-model="comptagename">
                  <option value="" selected disabled>Sélectionnez le comptage</option>
                  <option v-for="comptage in comptages" :key="comptage.value" :value="comptage.value">{{ comptage.label }}</option>
                </select>
              </div>
              <div class="form-group submit-btn">
                <input type="submit" @click="valider" value="Valider">
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
const inventaires = ref([]);
const comptages = ref([]);
const selectedUsers= ref([]);
const products = ref([]);
const nom_equipe = ref('');
const showModal3 = ref(false);
const showModal2 = ref(false);
const pop = ref('');
const showForm = ref(false);
const expandedRows = ref(null);
const inventoryName = ref(null); // Ajoutez la référence pour inventoryName
const comptagename = ref(null);
const teamName = ref(null);
let data = ref({});
const users=ref(null);
const userss=ref(null);
const userPermissions = $cookies?.get('user').permissions;
const formatDate= (date) =>  {
  return format(new Date(date), 'yyyy/MM/dd');
};
const vv= () =>  {
  if(userPermissions && userPermissions.includes('ajouter equipe')){
      showForm.value=true;
    }else{
      pop.value='Vous n\'avez pas le droit d\'ajouter une equipe ',
      showModal2.value = true;
    }
 
 
};
const fetchequipe = () => {
  if(userPermissions && userPermissions.includes('afficher tous equipe')){
    axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/equipe/liste_equipe',
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
    }
    else{
      axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/equipe/afiicher_equipe_par_user/'+$cookies?.get('user').id_user,
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
    }
     
    
};

const fetchinventaire = () => {
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/inventaire/liste_inventaire',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    const newinv = response.data.map(inventaire => ({
      label: inventaire.nom_inventaire,
      value: inventaire.id_inventaire,
    }));
    inventaires.value = newinv;
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des inventaires :', error);
  });
};

const fetchComptages = () => {
  if (inventoryName.value) { // Vérifiez que inventoryName a une valeur
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/comptage/afiicher_comptage_par_inventaire/${inventoryName.value}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${$cookies?.get('token')}`
      }
    })
    .then(response => {
      const newcomptages = response.data.map(cmt => ({
        label: cmt.nom_comptage,
        value: cmt.id_comptage,
      }));
      comptages.value = newcomptages;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des départements :', error);
    });
  }
};

watch(showForm, (newValue, oldValue) => {
  if (newValue) {
    fetchinventaire();
  }
});

watch(inventoryName, (newValue, oldValue) => {
  fetchComptages();
});

onMounted(() => {
  fetchequipe();
});



const valider = () => {
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/equipe/ajouter_equipe',
    data: {
      id_comptage: comptagename.value,
      nom_equipe: teamName.value, 
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    console.log('equipe ajouté avec succès:', response.data);
    // Fermer le modal ou effectuer d'autres actions nécessaires
    showForm.value = false; 
    // Recharger les comptages après l'ajout
    fetchequipe();
  })
  .catch(error => {
    console.error('Erreur lors de l\'ajout du comptage:', error);
    // Afficher un message d'erreur à l'utilisateur ou effectuer une autre action nécessaire
  });
}
const deleteProduct= (data) => {
  if(userPermissions && userPermissions.includes('supprimer equipe')){
      axios({
  method: 'delete',
  url: `http://127.0.0.1:8000/api/equipe/suprimer_equipe/${data.id_equipe}`,
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
  fetchequipe();
})
.catch(error => {
  console.error('Erreur lors de la mise à jour du produit:', error);
});
    }else{
      pop.value='Vous n\'avez pas le droit de supprimer l\'equipe',
      showModal2.value = true;
    }

}

const editProduct = (product) => {
  if(userPermissions && userPermissions.includes('modifier equipe')){
      showModal.value = true;
  data = { ...product };
  fetchuseraff(data);
    }else{
      pop.value='Vous n\'avez pas le droit de modifier l\'equipe ',
      showModal2.value = true;
    }
  
}
const assignProduct = (product) => {
  if(userPermissions && userPermissions.includes('attribuer equipe')){
       showModal3.value = true;
  data = { ...product };
  fetchuser(data);
    }else{
      pop.value='Vous n\'avez pas le droit d\'attribuer des utilisateur à l\'equipe ',
      showModal2.value = true;
    }
 
}
const fetchuseraff = (data) => {
  // Vérifiez que inventoryName a une valeur
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/equipe-user/afiicher_list_user/' + data.id_equipe,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    const a = response.data;
    const tempUsers = [];
    
    const fetchUsersPromises = a.map(user => {
      return fetchnameuser(user.id_user)
        .then(userResponse => {
          tempUsers.push({
            label: userResponse.name,
            value: userResponse.id_user,
          });
        });
    });

    Promise.all(fetchUsersPromises)
      .then(() => {
        userss.value = tempUsers;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des utilisateurs de l\'équipe:', error);
  });
};

const fetchnameuser = (id_user) => {
  return axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/user/afiicher_user/' + id_user,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
    throw error; // Rejeter la promesse pour que l'erreur soit propagée
  });
};

const fetchuser = (data) => {
  // Vérifiez que inventoryName a une valeur
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/equipe-user/afiicher_list_non_user/'+data.id_equipe,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${$cookies?.get('token')}`
      }
    })
    .then(response => {
      const newcomptages = response.data.map(cmt => ({
        label: cmt.name,
        value: cmt.id_user,
      }));
      
    users.value = newcomptages;
    
    })
    .catch(error => {
      
      console.error('Erreur lors de la récupération des départements :', error);
    });
  
};


const enregistrer = () => {

  // Vérifier si le nom de l'équipe est défini
  if (nom_equipe.value) {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/equipe/modifier_equipe/' + data.id_equipe,
      data: {
        nom_equipe: nom_equipe.value,
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${$cookies?.get('token')}`
      }
    })
    .then(response => {
      // Suppression des utilisateurs sélectionnés
      supprimerUtilisateurs();
      showModal.value = false; // Fermer le modal après la modification
      fetchequipe();
       // Recharger les produits après la modification
       fetchuseraff(data);
       fetchuser(data);
    })
    .catch(error => {
      console.error('Erreur lors de la modification de l\'équipe:', error);
    });
  } else if (selectedUsers.value.length > 0) {
    // Suppression des utilisateurs sélectionnés sans modification de l'équipe
    supprimerUtilisateurs();
    showModal.value = false; // Fermer le modal après la modification
    fetchequipe();
     // Recharger les produits après la modification
     fetchuseraff(data);
     fetchuser(data);
  } else {
    showModal.value = false; // Fermer le modal après la modification
    fetchequipe();
    fetchuseraff(data);
    fetchuser(data);
  }
};

const supprimerUtilisateurs = () => {
  for (let i = 0; i < selectedUsers.value.length; i++) {
    axios({
      method: 'delete',
      url: 'http://127.0.0.1:8000/api/equipe-user/suprimer_equipe_user/' + data.id_equipe + '/' + selectedUsers.value[i],
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${$cookies?.get('token')}`
      }
    })
    .then(response => {
      console.log('Utilisateur supprimé:', selectedUsers.value[i]);
      ///////////showModal3.value = false;
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    });
  }
};

const affecter= (data) => {
  for (let i = 0; i < selectedUsers.value.length; i++) {
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/equipe-user/ajouter_equipe_user',
    data: {
      id_user:selectedUsers.value[i],
      id_equipe:data.id_equipe,
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    showModal3.value=false
    fetchuser(data);
    fetchuseraff(data);
  })
  .catch(error => {
    console.error('Erreur lors de la modification du produit:', error);
  });
}
}


</script>


<style scoped lang="scss">

.checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Espace entre les lignes */
  font-size: 14px; /* Taille de la police plus petite */
}

.checkbox label {
  display: flex;
  align-items: center;
  gap: 5px; /* Espacement entre le checkbox et le label */
}

.checkbox input[type="checkbox"] {
  width: 16px; /* Taille du checkbox */
  height: 16px; /* Taille du checkbox */
}

.checkbox input[type="checkbox"]:checked {
  background-color: #1BB295; /* Couleur de fond lorsque coché */
  border-color: #1BB295; /* Couleur de bordure lorsque coché */
}

.checkbox input[type="checkbox"]:focus {
  outline: none; /* Supprimer le contour de focus */
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2); /* Ombre autour du checkbox lorsqu'il est focus */
}



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
  max-height: 80vh; /* Set max-height for the modal content */
  overflow-y: auto; /* Enable vertical scroll */
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

.assign-button {
  background-color: #28a745;
}

.action-button:hover {
  opacity: 0.8;
}

.action-button:active {
  transform: scale(0.95);
}

.form-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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

.action-icon {
  font-size: 1.2rem;
  margin-right: 0.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.3s;
}

.action-icon:hover {
  color: #333;
}

.edit-icon {
  color: #007bff;
}

.edit-icon:hover {
  color: #0056b3;
}

.delete-icon {
  color: #dc3545;
}

.delete-icon:hover {
  color: #a71d2a;
}

:deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
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
.submit-btn {
  display: flex;
  justify-content: center;
  width: 100%;
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

.centered-label {
      text-align: center;
      display: block; /* Pour s'assurer que le label prend toute la largeur disponible */
      margin: 0 auto; /* Centrer le label lui-même s'il est de type inline-block */
    }
</style>
