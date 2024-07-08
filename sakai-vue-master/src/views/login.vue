<template>
  <div id="app">
    <!-- Ajout du logo en haut à gauche de la page -->
    <img src="/logo-horizontal.png" width="200px" alt="loho" class="logo">
    <div class="container">
      <div class="login form">
        <header>Se connecter</header>
        <form @submit.prevent="login">
          <input type="text" v-model="email" placeholder="Email" />
          <input type="password" v-model="password" placeholder="Mot de passe" />
          <input type="submit" class="button" value="Se connecter" />
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        // Get CSRF token
        await axios.get('http://127.0.0.1:8000/api/sanctum/csrf-cookie', { withCredentials: true });

        // Make login request
        const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
          email: this.email,
          password: this.password
        }, { withCredentials: true });

        // Store token in cookie
        this.setAuthCookies(response.data.token, response.data.user);

        // Redirect to '/uikit/list_bien'
        this.$router.push('/uikit/biencomptage');

      } catch (error) {
        this.errorMessage = 'Invalid credentials';
        console.error(error);
      }
    },
    setAuthCookies(token, user) {
    // Set token and user ID cookies
    this.$cookies.set('token', token, '1m');
    this.$cookies.set('user', user, '1m');
  }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  min-height: 100vh;
  width: 100%;
  background: #fff; /* Changement du fond en blanc */
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative; /* Nécessaire pour positionner le logo */
}

.logo {
  position: absolute;
  top: 20px; /* Ajustez selon votre besoin */
  left: 20px; /* Ajustez selon votre besoin */
  width: 15rem; /* Adjust the width as needed */
  height: auto; /* Maintain aspect ratio */
}

.container {
  max-width: 430px;
  width: 100%;
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 2rem;
}

.login {
  margin-top: 50px; /* Ajustez l'espace au-dessus du formulaire selon vos besoins */
}

.form header {
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1.5rem;
}

.form input {
  height: 60px;
  width: 100%;
  padding: 0 15px;
  font-size: 17px;
  margin-bottom: 1.3rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
}

.form input:focus {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
}

.form input.button {
  color: #fff;
  background: #009579;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 1px;
  margin-top: 1.7rem;
  cursor: pointer;
  transition: 0.4s;
}

.form input.button:hover {
  background: #006653;
}
</style>