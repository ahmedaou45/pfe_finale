
<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const model = ref([]);

// Fonction pour définir les items en fonction des permissions
const setUserItems = () => {
    const userPermissions = $cookies?.get('user').permissions;
    let items = [];
    
    items.push(     { label: 'Bien\\Comptage', icon: 'pi pi-fw pi-table', to: '/uikit/biencomptage' }    );
    if(userPermissions && userPermissions.includes('bien')){
       items.push({ label: 'Bien', icon: 'pi pi-fw pi-table', to: '/uikit/list_bien' });
    }
    if(userPermissions && userPermissions.includes('inventaire')){
        items.push({ label: 'Inventaire', icon: 'pi pi-fw pi-table', to: '/uikit/list_Inv' });
    }
    if(userPermissions && userPermissions.includes('comptage')){
        items.push(   { label: 'Comptage', icon: 'pi pi-fw pi-table', to: '/uikit/list_Cmp' });
    }
    if(userPermissions && userPermissions.includes('equipe')){
        items.push(    { label: 'Equipe', icon: 'pi pi-fw pi-table', to: '/uikit/list_equipe' });
    }
    if(userPermissions && userPermissions.includes('zone')){
        items.push(   { label: 'Zone', icon: 'pi pi-fw pi-table', to: '/uikit/list_zone' });
    }
    if(userPermissions && userPermissions.includes('departement')){
        items.push(   { label: 'Département', icon: 'pi pi-fw pi-table', to: '/uikit/list_dprt' });
    }
    if(userPermissions && userPermissions.includes('employe')){
        items.push(   { label: 'Employés', icon: 'pi pi-fw pi-table', to: '/uikit/list_mbr' });
    }
    if(userPermissions && userPermissions.includes('role')){
        items.push(    { label: 'Rôle', icon: 'pi pi-fw pi-table', to: '/uikit/role' });
    }
    if(userPermissions && userPermissions.includes('utilisateur')){
        items.push(   { label: 'Utilisateur', icon: 'pi pi-fw pi-table', to: '/uikit/user' });
    }
   

          
      
    

    // Mettre à jour model.value avec les items construits
    model.value = [{ items }];
};

// Appel de la fonction pour initialiser les items
setUserItems();
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <li>
            
        </li>
    </ul>
</template>

<style lang="scss" scoped></style>
