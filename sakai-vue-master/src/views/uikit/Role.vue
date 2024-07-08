<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <DataTable :value="products" v-model:expandedRows="expandedRows" dataKey="id" tableStyle="min-width: 60rem">
          <template #header>
            <button class="styled-button" @click="vv">
              {{ showForm ? 'Masquer le formulaire' : 'Ajouter' }}
            </button>
          </template>



          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="id_role" header="ID" :sortable="true">
            <template #body="{ data }">
              {{ data.id_role }}
            </template>
          </Column>
          <Column field="id_user_createure" header="ID Créateur" :sortable="true">
            <template #body="{ data }">
              {{ data.id_user_createure }}
            </template>
          </Column>
          <Column field="id_user_updateure" header="ID Updateur" :sortable="true">
            <template #body="{ data }">
              {{ data.id_user_updateure }}
            </template>
          </Column>
          <Column field="nom_role" header="Nom Rôle" :sortable="true">
            <template #body="{ data }">
              {{ data.nom_role }}
            </template>
          </Column>
          <Column field="etas" header="Etat" :sortable="true">
            <template #body="{ data }">
              {{ data.etas }}
            </template>
          </Column>
          <Column field="created_at" header="Date Création" :sortable="true">
            <template #body="{ data }">
              {{ formatDate(data.created_at) }}
            </template>
          </Column>
          <Column field="updated_at" header="Date Modification" :sortable="true">
            <template #body="{ data }">
              {{formatDate( data.updated_at) }}
            </template>
          </Column>
          <Column field="inventoryStatus" header="Action" :sortable="true">
            <template #body="{ data }">
              <div class="action-buttons">
                <button @click="editProduct(data)" class="action-button edit-button" title="Modifier">
          <i class="fas fa-pencil-alt"></i> 
        </button>
        <button @click="deleteProduct(data)" class="action-button delete-button" title="Bloquer">
          <i class="fas fa-ban"></i> 
        </button>
                <button @click="openPermissionsModal(data)" class="action-button permission-button" title="Permissions">
                  <i class="fas fa-lock"></i> 
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
        <h2>Modifier rôle </h2>
        <div class="form-group">
          <label for="productName">Nom du rôle</label>
          <input type="text"  id="productName" v-model="nom_role":placeholder="`${data.nom_role}`" class="form-control">
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
                <input type="submit"  class="styled-button submit-button" @click="enregistrer(data)"   value="Enregistrer">
              </div>
      </form>
    </div>
  </div>
</div>




<div class="modal" :class="{ 'is-active': showModal3 }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h2>Affecter des permission au role</h2>
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


        <!-- Modal Form -->
        <div class="modal" :class="{ 'is-active': showForm }">
          <div class="modal-background" @click="showForm = false"></div>
          <div class="modal-content">
            <button class="modal-close is-large" aria-label="close" @click="showForm = false"></button>

            <form @submit.prevent="submitForm">
              <h2>Nouveau rôle</h2>

              <div class="form-group">
                <label for="roleName">Nom du rôle</label>
                <input v-model="nom_role" type="text" id="roleName">
              </div>

              <!-- <div class="form-group">
  <label>Liste des permissions</label>
  <div class="permission-list">
    <div v-for="(permission, index) in permissions" :key="index" class="permission-item">
      <input type="checkbox" :id="'permission_' + index" v-model="selectedPermissions" :value="permission">
      <label :for="'permission_' + index">{{ permission }}</label>
    </div>
  </div>
</div> -->

              <div class="form-group submit-btn">
                <input type="submit"  @click="valider"  value="Valider">
              </div>
            </form>
          </div>
        </div>
        <!-- End Modal Form -->

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, inject } from 'vue';
import { format } from 'date-fns';
import axios from 'axios';
const showModal = ref(false);
const showModal3 = ref(false);
const selectedUsers= ref([]);
const $cookies = inject('$cookies');
const products = ref([]);
const showForm = ref(false);
const showModal2 = ref(false);
const pop = ref('');
const users=ref(null);
const userss=ref(null);
const nom_role = ref('');
const expandedRows = ref(null);
let data = ref({});
const userPermissions = $cookies?.get('user').permissions;
const selectedPermissions = ref([]);

const formData = ref({
  roleName: '',
});
const formatDate= (date) =>  {
  return format(new Date(date), 'yyyy/MM/dd');
};
const vv= () =>  {
  if(userPermissions && userPermissions.includes('ajouter role')){
      showForm.value=true;
    }else{
      pop.value='Vous n\'avez pas le droit d\'ajouter un role ',
      showModal2.value = true;
    }
 
 
};

/*const handleSubmit = () => {
  // Handle form submission logic here
  console.log('Form submitted with permissions:', selectedPermissions.value);
  // Reset form after submission
  resetForm();
};*/

const resetForm = () => {
  formData.value.roleName = '';
  selectedPermissions.value = [];
};

const deleteProduct = (data) => {
  if(userPermissions && userPermissions.includes('bloquer role')){
      if(data.id_role==1){
  pop.value="Vous ne pouvais pas bloquer le role du SuperAdmine";
  showModal2.value = true;
}else{
axios({
method: 'post',
url: `http://127.0.0.1:8000/api/role/modifier_role/${data.id_role}`,
data: {
      etas:'bloque',
    },
headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${$cookies?.get('token')}`
}
})
.then(response => {

  pop.value="role bloquer";
      showModal2.value = true;
fetcherole();
})
.catch(error => {
console.error('Erreur lors de la mise à jour du produit:', error);
});
}
    }else{
      pop.value='Vous n\'avez pas le droit de bloquer le role ',
      showModal2.value = true;
    }

};

const openPermissionsModal = (product) => {
  if(userPermissions && userPermissions.includes('permission')){
      showModal3.value = true;
  data = { ...product };
  fetchpermissionaff(data);
  users.value=null;
    }else{
      pop.value='Vous n\'avez pas le droit d\'ajouter des permissions ',
      showModal2.value = true;
    }
  
  //fetchpermissionafff(data)
};

const fetchpermissionaff = (data) => {
  // Vérifiez que inventoryName a une valeur
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/role-permission/afiicher_list_non_permission/' + data.id_role,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    
    const x=response.data.map(permission =>( {
           value: permission.id_permission,
            label: permission.nom_permission,
        }));
    users.value=x;
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des utilisateurs de l\'équipe:', error);
  });
};


const affecter= (data) => {
  for (let i = 0; i < selectedUsers.value.length; i++) {
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/role-permission/ajouter_role_permission',
    data: {
      id_permission:selectedUsers.value[i],
      id_role:data.id_role,
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    showModal3.value=false
   
  })
  .catch(error => {
    console.error('Erreur lors de la modification du produit:', error);
  });
}
}

const enregistrer = () => {

// Vérifier si le nom de l'équipe est défini
if (nom_role.value) {
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/role/modifier_role/' + data.id_role,
    data: {
      nom_role: nom_role.value,
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    // Suppression des utilisateurs sélectionnés
    supprimerpermission();
    showModal.value = false; // Fermer le modal après la modification
    fetcherole();
     // Recharger les produits après la modification
  
  })
  .catch(error => {
    console.error('Erreur lors de la modification du role :', error);
  });
} else if (selectedUsers.value.length > 0) {
  // Suppression des utilisateurs sélectionnés sans modification de l'équipe
  supprimerpermission();
  showModal.value = false; // Fermer le modal après la modification
  fetcherole();
   // Recharger les produits après la modification

} else {
  showModal.value = false; // Fermer le modal après la modification
  fetcherole();
 
}
};

const supprimerpermission = () => {
  for (let i = 0; i < selectedUsers.value.length; i++) {
    axios({
      method: 'delete',
      url: 'http://127.0.0.1:8000/api/role-permission/suprimer_role_permission/' + data.id_role + '/' + selectedUsers.value[i],
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${$cookies?.get('token')}`
      }
    })
    .then(response => {
      console.log('Utilisateur supprimé:', selectedUsers.value[i]);
      /////////showModal.value = false;
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    });
  }
};

onMounted(() => {
  fetcherole();
});


const fetcherole = () => {
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/role/liste_role',
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



const valider = () => {
  
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/role/ajouter_role',
    data: {
      nom_role: nom_role.value,
      
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
    fetcherole();
  })
  .catch(error => {
    console.error('Erreur lors de l\'ajout du comptage:', error);
    // Afficher un message d'erreur à l'utilisateur ou effectuer une autre action nécessaire
  });
}

const editProduct = (product) => {
  if(product.id_role==1){
    pop.value='Vous n\'avez pas le droit de modifier le role SuperAdmine ',
    showModal2.value = true;
  }else{
     if(userPermissions && userPermissions.includes('modifier role')){
      showModal.value = true;
  data = { ...product };
  fetchpermissionafff(data)
  userss.value=null;
    }else{
      pop.value='Vous n\'avez pas le droit de modifier le role ',
      showModal2.value = true;
    }
  }
 
  
}
const fetchpermissionafff = (data) => {
  // Vérifiez que inventoryName a une valeur
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/role-permission/afiicher_list_permission/' + data.id_role,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    const x=response.data.map(permission =>( {
           value: permission.id_permission,
            label: permission.nom_permission,
        }));
    userss.value=x;
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des utilisateurs de l\'équipe:', error);
  });
};



</script>

<style scoped>


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


/* Scoped styles specific to the component */
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
  background-color: #df8004;
}


.permission-button {
  background-color: #ffc107;
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

.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
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
.modal-content h2 {
  font-size: 27px;
  text-align: center; /* Centre le texte */
  margin: 0 0 30px; /* Ajoute un espace en bas du titre */
}

.centered-label {
      text-align: center;
      display: block; /* Pour s'assurer que le label prend toute la largeur disponible */
      margin: 0 auto; /* Centrer le label lui-même s'il est de type inline-block */
    }
</style>
