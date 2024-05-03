<template>
  <div >
    <h1>User Details</h1>
    <p v-if="user">
    name:{{ user.name }}<br>
    diet:{{ user.diet }}<br>
    ID: {{ user.id }}
    </p>
    <div v-if="error">
    <p > Failed to fetch user info. </p>
    <p > Please try again. </p>
    <p>Please Reload </p>
    <br>
    <p id="error-message">{{error}}</p>
    </div>

  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      user: null,
      error: null,
      listOfNames: ['George', 'Matthew', 'Liyanna', 'Ingrid', 'Frank', 'Mike', 'Casey'],
      currentNameIndex: Math.floor(Math.random() * 7),
    };
  },
  methods: {
    getNextName() {
      const name = this.listOfNames[this.currentNameIndex];
      this.currentNameIndex = (this.currentNameIndex + 1) % this.listOfNames.length;
      return name;
    },
  },
  async mounted() {
    try {
      const newUser = { name: this.getNextName(), diet: 'vegan' };
      const response = await axios.post('http://localhost:3001/api/v1/users', newUser);
      this.user = response.data.newUser;
      this.error = null
    } catch (error) {
      console.error('Failed to create new user:', error);
      this.error = error;
      this.user - null;
      if (error.response && error.response.data && error.response.data.error) {
        this.error = error.response.data.error; 
      } else {
        this.error = 'An unexpected error occurred. Please try again later.';
      }
    }
  },
};
</script>

<style scoped>
#error-message {
  color: red;
  font-weight: bold;
}


</style>