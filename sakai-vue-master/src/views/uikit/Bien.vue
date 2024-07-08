<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <DataTable :value="products" v-model:expandedRows="expandedRows" dataKey="id" tableStyle="min-width: 60rem">
          <template #header>
            <div class="header-container">
              <button @click="toggleForm" class="styled-button">
                {{ showForm ? 'Masquer le Formulaire' : 'Ajouter' }}
              </button>
              <form @submit.prevent="uploadFile" enctype="multipart/form-data" class="upload-form" ref="uploadForm">
    <input type="file" ref="fileInput" name="import_file" @change="handleFileChange" style="display: none;">
    <button type="button" class="styled-button" @click="triggerFileInput">Choisir fichier</button>
    <button type="submit" class="styled-button">Importer</button>
  </form>
            </div>
          </template>
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column v-model="id_bien" field="id_bien" header="ID bien" :sortable="true" />
          <Column field="id_user_importateure" header="ID user importateur" :sortable="true" />
          <Column field="id_user_updateure" header="ID user updateur" :sortable="true" />
          <Column field="barcode" header="Code" :sortable="true" />
          <Column field="nom_bien" header="Libelle" :sortable="true" />
          <Column field="date_achat" header="Date achat" :sortable="true" />
          <Column field="prix_d_achat" header="Prix achat" :sortable="true"  />
          <Column field="nom_zone" header="Zone" :sortable="true" />
          <Column field="nom_departement" header="Emplacement" :sortable="true" />
          <Column field="affecter_a" header="Affectation" :sortable="true" />
          <Column field="fournisseure" header="Fournisseur" :sortable="true" />
          <Column field="no_serie" header="Num série" :sortable="true" />
          <Column field="etas" header="Etat" :sortable="true" />
          <Column field="duree_vie" header="Durée de vie" :sortable="true" />
          <Column field="created_at" header="Date création" :sortable="true">
      <template #body="{ data }">
        <span>{{ formatDate(data.created_at) }}</span>
      </template>
    </Column>
    <Column field="updated_at" header="Date modification" :sortable="true">
      <template #body="{ data }">
        <span>{{ formatDate(data.updated_at) }}</span>
      </template>
    </Column>
          <Column field="inventoryStatus" header="Action" :sortable="true">
            <template #body="{ data }">
              <div class="action-buttons">
                <button @click="editProduct(data)" class="action-button edit-button" title="Modifier">
                  <i class="fas fa-pencil-alt"></i>
                </button>
                
                <!--<button @click="deleteProduct(data)" class="action-button delete-button">
                  <i class="fas fa-trash-alt"></i> Supprimer
                </button>-->
              </div>
            </template>
          </Column>
        </DataTable>



        <div class="modal" :class="{ 'is-active': showModal }">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h2>Modifier bien</h2>
    </div>
    <div class="modal-body">
      <button class="modal-close is-large" aria-label="close" @click="showModal = false"></button>
      <form @submit.prevent="updateProduct">
        <div class="form-group">
          <label for="productName">Etat</label>
          <input type="text"  id="productName" v-model="Etat":placeholder="`${data.etas}`" class="form-control">
        </div>
        <div class="form-group">
          <label for="productName">Durée de vie</label>
          <input type="text"  id="productName" v-model="dureeVie":placeholder="`${data.duree_vie}`" class="form-control">
        </div>
        <!-- Ajoutez d'autres champs ici si nécessaire -->
        <div class="form-group submit-btn">
                <input type="submit" @click="enregistrer(data)"   value="Enregistrer">
              </div>
      </form>
    </div>
  </div>
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




       <!-- Modal Form -->
        <div class="modal" :class="{ 'is-active': showForm }">
          <div class="modal-background" @click="showForm = false"></div>
          <div class="modal-content">
            <button class="modal-close is-large" aria-label="close" @click="showForm = false"></button>
            <form @submit.prevent="submitForm">
              <h2>Nouveau Bien</h2>
              <div class="form-group">
                <label for="name">Libellé</label>
                <input type="text" id="name" v-model="bien.name" required>
              </div>
              <div class="form-group">
                <label for="zone">Zone</label>
          <select v-model="zone" id="zone">
            <option value="" selected disabled>Sélectionnez la zone</option>
            <option v-for="zone in zones" :key="zone.value" :value="zone.value">{{ zone.label }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="department">Département</label>
          <select v-model="departement" id="department">
            <option value="" selected disabled>Sélectionnez le département</option>
            <option v-for="departement in departements" :key="departement.value" :value="departement.value">{{ departement.label }}</option>
          </select>
        </div>
              <div class="form-group">
                <label for="observation">Affectation</label>
                <input v-model="bien.affecter_a" type="text" id="observation">
              </div>
              <div class="form-group">
                <label for="price">Prix d'achat</label>
                <input type="text" id="price" v-model="bien.price" >
              </div>
              <div class="form-group">
                <label for="category">Date d'achat</label>
                <input type="date" id="category" v-model="bien.date" >
              </div>
              <div class="form-group">
                <label for="code">Code</label>
                <input type="text" id="code" v-model="bien.code" required>
              </div>
              <div class="form-group">
                <label for="dureeVie">Durée de vie</label>
                <input type="number" id="dureeVie" v-model.number="bien.dureeVie" >
              </div>
              <div class="form-group">
                <label for="fournisseur">Fournisseur</label>
                <input type="text" id="fournisseur" v-model="bien.fournisseur" >
              </div>
              <div class="form-group">
                <label for="etat">Etat</label>
                <input type="text" id="fournisseur" v-model="bien.etat" >
              </div>
              <div class="form-group">
                <label for="numSerie">Num série</label>
                <input type="text" id="numSerie" v-model="bien.numSerie" >
              </div>
              <div class="form-group submit-btn" @click="valider()">
                <button type="submit">Valider</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch,inject } from 'vue';
import { format } from 'date-fns';
import axios from 'axios';
const showModal2 = ref(false);
const pop = ref('');
const fileInput = ref(null);
const $cookies = inject('$cookies');
const userPermissions = $cookies?.get('user').permissions;
const id_bien = ref('');
const departements = ref('');
const zones = ref('');
const dureeVie = ref('');
let data = ref({});
const Etat = ref('');
const zone = ref(null);
const departement = ref(null);
const formatDate= (date) =>  {
  return format(new Date(date), 'yyyy/MM/dd');
};
const bien = ref({
  name: '',
  price: 0,
  category: '',
  code: '',
  affecter_a:'',
  dureeVie: 0,
  fournisseur: '',
  etat: '',
  date: '',
  numSerie: ''
});

let products = ref([]);
const expandedRows = ref([]);
const showForm = ref(false);
const showModal = ref(false); // Add this line

const handleFileChange = () => {
  const file = fileInput.value.files[0];
  console.log(file);
};

const triggerFileInput = () => {
  if(userPermissions && userPermissions.includes('importer bien')){
      fileInput.value.click();
    }else{
      pop.value='Vous n\'avez pas le droit d\'importer des bien ',
      showModal2.value = true;
    }
  
};

const uploadFile = () => {
  const formData = new FormData();
  formData.append('import_file', fileInput.value.files[0]);

  axios.post('http://127.0.0.1:8000/api/bien/exel_biensansinv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  }).then(response => {
    console.log(response.data);
    fetchProducts();
  }).catch(error => {
    console.log(error);
  });
};

const fetchData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/bien/bien', {
      headers: {
        Authorization: `Bearer ${$cookies?.get('token')}`
      }
    });
    products.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  console.log($cookies?.get('user').id_user)
  fetchProducts();
});

const editProduct = (product) => {
  if(userPermissions && userPermissions.includes('modifier bien')){
      showModal.value = true;
  data = { ...product };
    }else{
      pop.value='Vous n\'avez pas le droit de modifier le bien',
      showModal2.value = true;
    }
  
}


const fetchProducts = () => {
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/bien/liste_bien',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    products.value = response.data;
    //fetchDepartments(); // Une fois les produits récupérés, appeler fetchDepartments
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des produits:', error);
  });
};


/*const deleteProduct = (product) => {

console.log('Produit lancé :', product);
axios({
  method: 'delete',
  url: `http://127.0.0.1:8000/api/bien/suprimer_bien/${product.id_bien}`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${$cookies?.get('token')}`
  }
})
.then(response => {
  console.log('Produit mis à jour avec succès:', response.data);
  fetchProducts();// Recharger les produits après la mise à jour
})
.catch(error => {
  console.error('Erreur lors de la mise à jour du produit:', error);
});
}*/





const toggleForm = () => {
  if(userPermissions && userPermissions.includes('ajouter bien')){
       showForm.value = !showForm.value;
  fetchZones();
    }else{
      pop.value='Vous n\'avez pas le droit d\'ajouter un bien ',
      showModal2.value = true;
    }
 
  
};

watch(zone, (newValue) => {
 
    fetchDepartmentajouter();
  });

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



const fetchDepartmentajouter = () => {  
  if(zone.value){
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/departement/afiicher_departement_par_zone/'+zone.value,
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
  }
};

const valider = () => {
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/bien/ajouter_bien',
    data: {
      'nom_bien': bien.value.name,
      ...(bien.value.price && { 'prix_d_achat': bien.value.price }),
      'barcode': bien.value.code,
      ...(bien.value.date && { 'date_achat': bien.value.date }),
      ...(bien.value.dureeVie && { 'duree_vie': bien.value.dureeVie }),
      ...(bien.value.fournisseur && { 'fournisseure': bien.value.fournisseur }),
      ...(bien.value.etat && { 'etas': bien.value.etat }),
      ...(bien.value.numSerie && { 'no_serie': bien.value.numSerie }),
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  })
  .then(response => {
    console.log('Réponse de l\'ajout du bien:', response.data);
    
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/departement-bien/ajouter_departement_bien',
      data: {
        'id_bien': response.data,
        'id_departement': departement.value,
        'affecter_a': bien.value.affecter_a,
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${$cookies?.get('token')}`
      }
    })
    .then(response => {
      console.log('Réponse de l\'ajout du departement bien:', response.data);
      showForm.value = false;
      fetchProducts();
    })
    .catch(error => {
      if (error.response && error.response.status === 422) {
        console.error('Erreur de validation lors de l\'ajout du departement bien:', error.response.data.errors);
      } else {
        console.error('Erreur lors de l\'ajout du departement bien:', error);
      }
    });
  })
  .catch(error => {
    if (error.response && error.response.status === 422) {
      console.error('Erreur de validation lors de l\'ajout du bien:', error.response.data.errors);
    } else {
      console.error('Erreur lors de l\'ajout du bien:', error);
    }
  });
};







const enregistrer = () => {
  
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/bien/modifier_bien/'+data.id_bien,
    data: {
      ...(dureeVie.value && { 'duree_vie': dureeVie.value }),
      ...(Etat.value && { 'etas': Etat.value }),
    
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
    fetchProducts();// Recharger les produits après la modification
  })
  .catch(error => {
    console.error('Erreur lors de la modification du produit:', error);
  });
};

</script>






<style scoped lang="scss">

.styled-button {
      background-color: #4CAF50; /* Vert */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 4px;
    }

    .styled-button:hover {
      background-color: #45a049; /* Couleur au survol */
    }
.header-container{
  display: flex;
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
input[type="date"],
select {
  width: 100%;
  height: 45px;
  padding: 10px;
  font-size: 15px;
  outline: none;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #bfbfbf;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="date"]:focus,
select:focus {
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

.custom-textarea {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: none;
  outline: none; /* Supprime le contour de sélection */
  resize: none; /* Empêche le redimensionnement du textarea par l'utilisateur */
  text-align: center; /* Centre le texte à l'intérieur du textarea */
}





.submit-btn input[type="submit"] {
  width: 100%; /* S'étend sur toute la largeur du conteneur parent */
  padding: 10px;
  background-color: #1BB295; /* Vert */
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.submit-btn input[type="submit"]:hover {
  background-color: #1BB295; /* Couleur au survol */
}

.submit-btn input[type="submit"]:active {
  background-color: #1BB295;
  transform: scale(0.95);
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="date"],
.form-group select {
  width: 100%; /* S'étend sur toute la largeur du conteneur parent */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px; /* Espacement en bas */
}

</style>
