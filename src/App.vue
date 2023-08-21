<template>
  <div class="login-page">
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Nom d'utilisateur:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
  <div>
    <h2>Zone protégée</h2>
    <button @click="loadProtectedData">Charger les données protégées</button>
    <div v-if="dataLoaded">
      <p>Données chargées : {{ protectedData }}</p>
    </div>
  </div>
</template>

<style>
.login-page {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: '',
      dataLoaded: false,
      protectedData: '',
      token: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
      username : this.username,
      password : this.password,
    });
     this.token = response.data.token;
    console.log('Connecté avec succès !', this.token);
      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
      }
    },

    async loadProtectedData() {
      try {
        const response = await axios.get('http://localhost:3000/protected', {
          headers: {
            Authorization: this.token,
          },
        });

        this.protectedData = response.data.message;
        this.dataLoaded = true;
      } catch (error) {
        console.error('Erreur lors du chargement des données protégées :', error.response.data.message);
      }
    },
  },
};
</script>
