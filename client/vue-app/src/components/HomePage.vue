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
    } catch (error) {
      console.error('Failed to create new user:', error);
      this.error = error;
    }
  },
};
</script>