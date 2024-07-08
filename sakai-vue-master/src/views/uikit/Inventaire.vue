<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <DataTable :value="products" v-model:expandedRows="expandedRows" dataKey="id" tableStyle="min-width: 60rem">
          <template #header>
            <button class="styled-button create-button" @click="vv">
              {{ showForm ? 'Masquer le formulaire' : 'Ajouter' }}
            </button>
          </template>

          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="id_inventaire" header="ID" :sortable="true">
            <template #body="{ data }">
              <span>{{ data.id_inventaire }}</span>
            </template>
          </Column>
          <Column field="id_user_createure" header="ID Créateur" :sortable="true">
            <template #body="{ data }">
              <span>{{ data.id_user_createure }}</span>
            </template>
          </Column>
          <Column field="id_user_updateure" header="ID Updateur" :sortable="true">
            <template #body="{ data }">
              <span>{{ data.id_user_updateure }}</span>
            </template>
          </Column>
          <Column field="nom_inventaire" header="Nom" :sortable="true">
            <template #body="{ data }">
              <span>{{ data.nom_inventaire }}</span>
            </template>
          </Column>
          <Column field="date_debut" header="Date Début" :sortable="true">
            <template #body="{ data }">
              <span>{{ data.date_debut }}</span>
            </template>
          </Column>
          <Column field="date_fin" header="Date Fin" :sortable="true">
            <template #body="{ data }">
              <span>{{ data.date_fin }}</span>
            </template>
          </Column>
          <Column field="etas" header="Etat" :sortable="true">
            <template #body="{ data }">
              <span>{{ data.etas }}</span>
            </template>
          </Column>
          <Column field="observation" header="Observation" :sortable="true">
            <template #body="{ data }">
              <span>{{ data.observation }}</span>
            </template>
          </Column>
          <Column field="created_at" header="Date Création" :sortable="true">
            <template #body="{ data }">
              <span>{{formatDate(data.created_at)  }}</span>
            </template>
          </Column>
          <Column field="updated_at" header="Date Modification" :sortable="true">
            <template #body="{ data }">
              <span>{{  formatDate(data.updated_at )}}</span>
            </template>
          </Column>
          <Column header="Action">
            <template #body="{ data }">
              <div class="action-buttons">
                <button @click="editProduct(data)" class="action-button edit-button" title="Modifier">
  <i class="fas fa-pencil-alt"></i>
</button>

                <button @click="deleteProduct(data)" class="action-button delete-button" title="Suprimer">
                  <i class="fas fa-trash-alt"></i> 
                </button>
              
                <button @click="launchProduct(data)" class="action-button launch-button" title="Lancer">
                  <i class="fas fa-play"></i> 
                </button>
                <button @click="cancelProduct(data)" class="action-button cancel-button" title="Annuler">
                  <i class="fas fa-times"></i> 
                </button>
                <button @click="closeProduct(data)" class="action-button close-button" title="Clôturer">
                  <i class="fas fa-lock"></i> 
                </button>
                <button @click="exportProduct(data)" class="action-button export-button"title="Exporter">
                  <i class="fas fa-file-export"></i> 
                </button>
                <form @submit.prevent="uploadFile(data)" enctype="multipart/form-data" class="upload-form" ref="uploadForm">
    <input type="file" ref="fileInput" name="import_file" @change="handleFileChange" style="display: none;">
    <button type="button"  class="action-button launch-button" @click="triggerFileInput">Choisir fichier</button>
    <button type="submit" class="action-button launch-button" title="Importer">Importer</button>
  </form>
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

        
        <!-- Modal pour l'édition de produit -->
<div class="modal" :class="{ 'is-active': showModal }">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h2>Modifier l'inventaire</h2>
    </div>
    <div class="modal-body">
      <button class="modal-close is-large" aria-label="close" @click="showModal = false"></button>
      <form @submit.prevent="updateProduct">
        <div class="form-group">
          <label for="productName">Nom de l'inventaire</label>
          <input type="text"  id="productName" v-model="editedProduct.name":placeholder="`${editedProduct.nom_inventaire}`" class="form-control">
        </div>
        <div class="form-group">
          <label for="productName">Observation</label>
          <input type="text"  id="productName" v-model="editedProduct.observation":placeholder="`${editedProduct.observation}`" class="form-control">
        </div>
        <!-- Ajoutez d'autres champs ici si nécessaire -->
        <div class="form-group submit-btn">
                <input type="submit" @click="enregistrer()"   value="Enregistrer">
              </div>
      </form>
    </div>
  </div>
</div>
        <!-- Fin du Modal -->



        <!-- Modal Form -->
        <div class="modal" :class="{ 'is-active': showForm }">
          <div class="modal-background" @click="showForm = false"></div>
          <div class="modal-content">
            <button class="modal-close is-large" aria-label="close" @click="showForm = false"></button>
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
                <input type="submit"  @click="valider()" value="Valider">
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
import { ref, onMounted, inject } from 'vue';
import { format } from 'date-fns';
import axios from 'axios';
const $cookies = inject('$cookies');
const fileInput = ref(null);
const form = ref({
  name: '',
  observation: ''
});
let products = ref([]);
const showForm = ref(false);
const expandedRows = ref(null);
let editedProduct = ref({});
const showModal = ref(false);
const showModal2 = ref(false);
const pop = ref('');
const userPermissions = $cookies?.get('user').permissions;


onMounted(() => {
  if(userPermissions && userPermissions.includes('afficher tous les inventaire')){
    fetchProducts(); 
    }else{
       fetchProducts2();
    }
 
});
const formatDate= (date) =>  {
  return format(new Date(date), 'yyyy/MM/dd');
};

const vv= () =>  {
  if(userPermissions && userPermissions.includes('ajouter inventaire')){
      showForm.value=true;
    }else{
      pop.value='Vous n\'avez pas le droit d\'ajouter un inventaire ',
      showModal2.value = true;
    }
 
 
};
const handleFileChange = () => {
 
  const file = fileInput.value.files[0];
  console.log(file);
};

const triggerFileInput = () => {
  if(userPermissions && userPermissions.includes('importer inventaire')){
      fileInput.value.click();
    }else{
      pop.value='Vous n\'avez pas le droit d\'importer des bien dans  un inventaire ',
      showModal2.value = true;
    }
};

const uploadFile = (data) => {
  const formData = new FormData();
  formData.append('import_file', fileInput.value.files[0]);

  axios.post('http://127.0.0.1:8000/api/bien/exel_bien/'+data.id_inventaire, 
  formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    }
  }).then(response => {
    console.log(response.data);
  
  }).catch(error => {
    console.log(error);
  });
};


const fetchProducts2 = () => {
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/inventaire/afiicher_inventaire_speciale/'+$cookies?.get('user').id_user,
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
    console.error('Erreur lors de la récupération des produits:', error);
  });
};
const fetchProducts = () => {
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/inventaire/liste_inventaire',
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
    console.error('Erreur lors de la récupération des produits:', error);
  });
};

const editProduct = (product) => {
  if(userPermissions && userPermissions.includes('modifier inventaire')){
       editedProduct.value = { ...product };
  showModal.value = true;
    }else{
      pop.value='Vous n\'avez pas le droit de modifier l\'inventaire',
      showModal2.value = true;
    }
 

};

const deleteProduct = (product) => {
  if(userPermissions && userPermissions.includes('supprimer inventaire')){
      console.log('Suppression du produit :', product);
    const index = products.value.findIndex(p => p.id === product.id);
    if (index !== -1) {
        products.value.splice(index, 1);
    }

    axios({
        method: 'delete', // Utilisation de la méthode DELETE
        url: `http://127.0.0.1:8000/api/inventaire/suprimer_inventaire/${product.id_inventaire}`,
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
        console.log('Inventaire supprimé avec succès:', response.data);
        fetchProducts(); // Recharger les produits après la suppression
    })
    .catch(error => {
        console.error('Erreur lors de la suppression de l\'inventaire:', error);
    });
    }else{
      pop.value='Vous n\'avez pas le droit de supprimer l\'inventaire',
      showModal2.value = true;
    }
    
};



const importProduct = (product) => {
  console.log('Produit importé :', product);
  // Implémentez ici la logique pour importer le produit
};

const launchProduct = (product) => {
  if(userPermissions && userPermissions.includes('lancer inventaire')){
       axios({
    method: 'post',
    url: `http://127.0.0.1:8000/api/inventaire/modifier_inventaire/${product.id_inventaire}`,
    data: {
      etas: 'en cours'
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
    fetchProducts(); // Recharger les produits après la mise à jour
  })
  .catch(error => {
    console.error('Erreur lors de la mise à jour du produit:', error);
  });
    }else{
      pop.value='Vous n\'avez pas le droit de lancer l\'inventaire ',
      showModal2.value = true;
    }
};

const cancelProduct = (product) => {
  if(userPermissions && userPermissions.includes('annuler inventaire')){
      axios({
    method: 'post',
    url: `http://127.0.0.1:8000/api/inventaire/modifier_inventaire/${product.id_inventaire}`,
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
    console.log('Produit mis à jour avec succès:', response.data);
    fetchProducts(); // Recharger les produits après la mise à jour
  })
  .catch(error => {
    console.error('Erreur lors de la mise à jour du produit:', error);
  });
    }else{
      pop.value='Vous n\'avez pas le droit d\'annuler l\'inventaire ',
      showModal2.value = true;
    } 
  
};

const closeProduct = (product) => {
  if(userPermissions && userPermissions.includes('cloturer inventaire')){
       axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/inventaire/modifier_inventaire/'+product.id_inventaire,
    data: {
      etas: 'cloture',
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
    fetchProducts(); // Recharger les produits après la mise à jour
  })
  .catch(error => {
    console.error('Erreur lors de la mise à jour du produit:', error);
  });
    }else{
      pop.value='Vous n\'avez pas le droit de cloturer l\'inventaire ',
      showModal2.value = true;
    }
 
};

const exportProduct = (product) => {
  if(userPermissions && userPermissions.includes('exporter inventaire')){
       axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/inventaire/export/' + product.id_inventaire,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bearer ${$cookies?.get('token')}`
    },
    responseType: 'blob'  // Important: spécifie que la réponse sera un blob
  })
  .then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'exported_product.csv'); // Le nom du fichier téléchargé
    document.body.appendChild(link);
    link.click();
    link.remove();
  })
  .catch(error => {
    console.error('Erreur lors de l\'exportation du produit:', error);
  });
    }else{
      pop.value='Vous n\'avez pas le droit d\'exporter l\'inventaire ',
      showModal2.value = true;
    }
 
};




const valider = () => {
 
    axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/inventaire/ajouter_inventaire',
        data: {
          'nom_inventaire':form.value.name,
          ...(form.value.observation && { 'observation': form.value.observation }),
          
          
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${$cookies?.get('token')}`
        }
    })
    .then(response => {
        showForm.value = false;
        fetchProducts();
    })
    .catch(error => {
        console.error('Erreur lors de l\'ajout du bien:', error);
    });
}


const enregistrer = () => {
  axios({
    method: 'post',
    url: `http://127.0.0.1:8000/api/inventaire/modifier_inventaire/${editedProduct.value.id_inventaire}`,
    data: {
      ...(editedProduct.value.name && { 'nom_inventaire': editedProduct.value.name}),
      ...(editedProduct.value.observation && { 'observation': editedProduct.value.observation }),
      
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
    showModal.value = false;
     pop.value=response.data.message;
     if(pop.value!=null){
      showModal2.value = true;
     }
      // Fermer le modal après la modification
    fetchProducts(); // Recharger les produits après la modification
  })
  .catch(error => {
    console.error('Erreur lors de la modification du produit:', error);
  });
};

</script>



<style scoped lang="scss">
.upload-form{
  display: flex;
  flex-direction: row;
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

.import-button {
  background-color: #ffc107; /* Couleur pour le bouton Importer */
}

.launch-button {
  background-color: #28a745; /* Couleur pour le bouton Lancer */
}

.cancel-button {
  background-color: #dc3545; /* Couleur pour le bouton Annuler */
}

.close-button {
  background-color: #ffc107; /* Couleur pour le bouton Clôturer */
}

.export-button {
  background-color: #007bff; /* Couleur pour le bouton Exporter */
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