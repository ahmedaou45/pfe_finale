<script setup>
import { ref, computed, onMounted, onBeforeUnmount, inject } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import axios from 'axios';

const $cookies = inject('$cookies');
const router = useRouter();
const { layoutConfig, onMenuToggle } = useLayout();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const onSettingsClick = () => {
    topbarMenuActive.value = false;
    router.push('/documentation');
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};

const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener.value);
        outsideClickListener.value = null;
    }
};

const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

const deconnexion = () => {
    axios({
        method: 'post',
        url: 'http://localhost:8000/api/auth/deconexion',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${$cookies?.get('token')}`
        }
    })
    .then(response => {
        $cookies.remove('token'); // Supprime le cookie de token
        router.push('/auth/login'); // Redirige vers la page de connexion
    })
    .catch(error => {
        console.log(error);
    });
};
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/uikit/biencomptage" class="layout-topbar-logo">
            <img src="/logo-horizontal.png" alt="Logo" class="logo">
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            
            
            <button @click="deconnexion()"class="logout-button" title="Déconnexion">
                <i class="fas fa-sign-out-alt"></i>
            </button>
           
           
        </div>
    </div>
</template>

<style lang="scss" scoped>
.layout-topbar-logo {
    display: flex;
    align-items: center;
    padding: 0.5rem;
}

.logo {
    width: 8rem; /* Adjust the width as needed */
    height: auto; /* Maintain aspect ratio */
}

.layout-topbar-menu {
    display: flex;
    align-items: center;
    gap: 1rem; /* Spacing between buttons */
}

.logout-button {
    background-color: #4dac9c ; /* Button background color */
    color: white; /* Icon color */
    border: none; /* Remove default button border */
    padding: 0.5rem 1rem; /* Button padding */
    border-radius: 5px; /* Rounded corners */
    font-size: 1rem; /* Font size */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer; /* Pointer cursor on hover */
    transition: background-color 0.3s ease; /* Smooth background color transition */
}

.logout-button:hover {
    background-color: #45a049; /* Darker background on hover */
}

.logout-button i {
    margin-right: 0.5rem; /* Space between icon and text (if any) */
    font-size: 1.2rem; /* Icon size */
}
</style>

