<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <DataTable :value="products" v-model:expandedRows="expandedRows" dataKey="id" tableStyle="min-width: 60rem">
          <template #header>
            <div>
              <button @click="toggleForm" class="styled-button">
                {{ showForm ? 'Masquer le Formulaire' : 'Ajouter' }}
              </button>
              
            </div>
          </template>
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="id_user" header="ID" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.id_user }}
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
          <Column field="name" header="Nom d'utilisateur" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column field="email" header="Email" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.email }}
            </template>
          </Column>
          <Column field="date_debut_session" header="Date début session" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.date_debut_session }}
            </template>
          </Column>
          <Column field="date_fin_session" header="Date fin session" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.date_fin_session }}
            </template>
          </Column>
          <Column field="nom_employe" header="Nom employé" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.nom_employe }}
            </template>
          </Column>
          <Column field="prenom_employe" header="Prénom employé" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.prenom_employe }}
            </template>
          </Column>
          <Column field="nom_role" header="Rôle" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.nom_role }}
            </template>
          </Column>
          <Column field="created_at" header="Date création" :sortable="true">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.created_at) }}
            </template>
          </Column>
          <Column field="updated_at" header="Date modification" :sortable="true">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.updated_at) }}
            </template>
          </Column>
          <Column field="inventoryStatus" header="Action" :sortable="true">
            <template #body="{ data }">
              <div v-if="showActionButtons" class="action-buttons" >
                <button @click="editProduct(data)" class="action-button edit-button" title="Modifier">
                  <i class="fas fa-pencil-alt"></i> 
                </button>
                <button @click="deleteProduct(data)" class="action-button delete-button" title="Bloquer">
                  <i class="fas fa-ban"></i> 
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
        <h2>Modifier l'utilisateure</h2>
        <div class="form-group">
          <label for="productName">Nom de l'utilisateur</label>
          <input type="text"  id="productName3" v-model="nom":placeholder="`${data.name}`" class="form-control">
        </div>
        <div class="form-group">
          <label for="productName">Email</label>
          <input type="text"  id="productName2" v-model="email":placeholder="`${data.email}`" class="form-control">
        </div>
        <div class="form-group">
          <label for="productName">Mot de passe</label>
          <input type="text"  id="productName1" v-model="mdp" class="form-control">
        </div>
        <div class="form-group">
          <label for="productName">Date de debut de session</label>
          <input  type="date"  id="productName4" v-model="d" class="form-control">
        </div>
        <div class="form-group">
          <label for="productName">Date de fin de session</label>
          <input type="date"  id="productName5" v-model="f" class="form-control">
        </div>

        <div class="form-group">
        <label for="role">Rôle</label>
        <select v-model="nvrole" id="role">
          <option value="" selected disabled>Sélectionnez le rôle</option>
        <option v-for="role in roles" :key="role.value" :value="role.value">
                    {{ role.label }}
                  </option>
                </select>
      </div>
        <!-- Ajoutez d'autres champs ici si nécessaire -->
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
            <button class="modal-close" aria-label="close" @click="showForm = false"></button>
            <form @submit.prevent="handleSubmit">
      <h2>Nouvel utilisateur</h2>
  
      <div class="form-group">
        <label for="userName">Nom d'utilisateur</label>
        <input v-model="formData.userName" type="text" id="userName">
      </div>
  
      <div class="form-group">
        <label for="mail">Email</label>
        <input v-model="formData.email" type="text" id="mail">
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
        <select v-model="nvemploye" id="empl">
          <option value="" selected disabled>Sélectionnez l'employé</option>
          <option v-for="employe in employes" :key="employe.value" :value="employe.value">
                    {{ employe.label }}
                  </option>
        </select>
      </div>
  
      <div class="form-group">
        <label for="role">Rôle</label>
        <select v-model="nvrole" id="role2">
          <option value="" selected disabled>Sélectionnez le rôle</option>
        <option v-for="role in roles" :key="role.value" :value="role.value">
                    {{ role.label }}
                  </option>
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
const products = ref([]);
const showForm = ref(false);
const nvemploye = ref('');
const nvrole = ref('');
const employes = ref('');
const roles = ref('');
const showActionButtons = ref(true);
const expandedRows = ref(null);
let data = ref({});
const showModal2 = ref(false);
const pop = ref('');
const userPermissions = $cookies?.get('user').permissions;
const toggleForm = () => {
  if(userPermissions && userPermissions.includes('ajouter utilisateur')){
       showForm.value = !showForm.value;
    }else{
      pop.value='Vous n\'avez pas le droit d\'ajouter un utilisateur',
      showModal2.value = true;
    }
 
};
const formatDate= (date) =>  {
  return format(new Date(date), 'yyyy/MM/dd');
};
const formData = ref({
  userName: '',
  email: '',
  password: '',
  dt_Db_ses: '',
  dt_fn_ses: '',
  empl: '',
  role: ''
});
const nom = ref('');
const email = ref('');
const mdp = ref('');
const d = ref('');
const f = ref('');
/*const handleSubmit = () => {
  this.$emit('form-submitted', formData.value); // Émet un événement avec les données
  resetForm();
};*/

const resetForm = () => {
  formData.value = {
    userName: '',
    mail: '',
    password: '',
    dt_Db_ses: '',
    dt_fn_ses: '',
    empl: '',
    role: ''
  };
};

const editProduct = (product) => {
  if(userPermissions && userPermissions.includes('modifier utilisateur')){
       data = { ...product };
  if(data.id_user==1){
    pop.value="Vous ne pouvais pas modifier le SuperAdmine";
    showModal2.value = true;
  }else{
  showModal.value = true;
}
    }else{
      pop.value='Vous n\'avez pas le droit de modifier l\'utilisateur ',
      showModal2.value = true;
    }
 }

watch(showForm, (newValue, oldValue) => {
  if (newValue) {
    fetchemploye();
    fetchrole();
  }
});

watch(showModal, (newValue, oldValue) => {
  if (newValue) {
    fetchrole();
  }
});
const fetchemploye = () => {
  
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/employe/liste_employe',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    
    const newemployes = response.data.map(employe => ({
      
      label: employe.nom_employe+'  '+employe.prenom_employe,
      value: employe.id_employe,
    }));
    
    employes.value = newemployes;
   
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des employes :', error);
  });
};

const fetchrole = () => {
  
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/role/afiicher_role_actife',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    
    const newroles = response.data.map(role => ({
      
      label: role.nom_role,
      value: role.id_role,
    }));
    
    roles.value = newroles;
   
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des roles :', error);
  });
};

onMounted(() => {
  fetcheuser();

});


const fetcheuser = () => {
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/user/liste_user2',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    
      products.value = response.data; // Mettre à jour les produits avec les données utilisateur mises à jour
    
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
  });
};

const deleteProduct = (data) => {
  if(userPermissions && userPermissions.includes('bloquer utilisateur')){
        if(data.id_user==1){
    pop.value="Vous ne pouvais pas bloquer le SuperAdmine";
    showModal2.value = true;
  }else{
  const currentDate = new Date().toISOString().slice(0, 10);
axios({
method: 'post',
url: 'http://127.0.0.1:8000/api/user/modifier_user/'+data.id_user,
data: {
  date_fin_session: currentDate,
    },
headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${$cookies?.get('token')}`
}
})
.then(response => {
  pop.value="utilisateur bloquer";
    
      showModal2.value = true;
     

fetcheuser();
})
.catch(error => {

console.error('Erreur lors de la mise à jour du produit:', error);
});
  }
    }else{
      pop.value='Vous n\'avez pas le droit de bloquer l\'utilisateur ',
      showModal2.value = true;
    }

};


const valider = () => {
  console.log()
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/user/ajouter_user',
    data: {
      name: formData.value.userName,
      email:formData.value.email,
      password:formData.value.password,
      ...(formData.value.dt_Db_ses && { 'date_debut_session': formData.value.dt_Db_ses }),
      ...(formData.value.dt_fn_ses && { 'date_fin_session': formData.value.dt_fn_ses}),
      id_employe:nvemploye.value,
      id_role:nvrole.value,
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
    fetcheuser();
  })
  .catch(error => {
    console.error('Erreur lors de l\'ajout du user:', error);
    // Afficher un message d'erreur à l'utilisateur ou effectuer une autre action nécessaire
  });
}

const enregistrer = () => {
  
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/user/modifier_user/'+data.id_user,
    data: {
      ...(nom.value && { 'name': nom.value}),
      ...(email.value && { 'email': email.value}),
      ...(mdp.value && { 'password': mdp.value}),
      ...(d.value && { 'date_debut_session': d.value }),
      ...(f.value && { 'date_fin_session': f.value}),
      ...(nvrole.value && { 'id_role': nvrole.value}),
      
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    console.log('User modifié avec succès:', response.data);
    showModal.value = false; // Fermer le modal après la modification
    fetcheuser();// Recharger les produits après la modification
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
  background-color: #df8004;
}

.action-button:hover {
  opacity: 0.8;
}

.action-button:active {
  transform: scale(0.95);
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

.form-container {
  padding: 25px;
  background: #fff;
  max-width: 500px;
  width: 100%;
  border-radius: 7px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

h2 {
  font-size: 27px;
  text-align: center;
  margin: 0 0 30px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 15px;
  margin-bottom: 7px;
}

input[type="text"],
input[type="number"],
input[type="date"] {
  height: 45px;
  padding: 10px;
  width: 100%;
  font-size: 15px;
  outline: none;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #bfbfbf;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="date"]:focus {
  border-color: #9a9a9a;
}

.submit-btn button {
  color: white;
  border: none;
  height: auto;
  font-size: 16px;
  padding: 13px 0;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  background: #1bb295;
  width: 100%;
  transition: 0.2s ease;
}

.submit-btn button:hover {
  background: #179b81;
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

  .table-container {
  max-height: 400px; /* Ajustez la hauteur maximale selon vos besoins */
  overflow-y: auto; /* Ajoutez une barre de défilement vertical si nécessaire */
}
</style>
