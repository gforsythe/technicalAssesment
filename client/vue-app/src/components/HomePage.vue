<template>
  <div>
    <h1>User Details</h1>
    <p v-if="user">
    name:{{ user.name }}<br>
    diet:{{ user.diet }}<br>
    ID: {{ user.id }}
    </p>
    <p v-else>
    Failed to fetch user info. Please try again.
    </p>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      user: null,
      error: null
    };
  },
  async mounted() {
    try {
      const newUser = { name: 'newUser', diet: 'vegan' };
      const response = await axios.post('http://localhost:3000/api/v1/users', newUser);
      this.user = response.data.newUser;
    } catch (error) {
      console.error('failed to fetch user', error);
      this.error = error;
    }
  },
};
</script>