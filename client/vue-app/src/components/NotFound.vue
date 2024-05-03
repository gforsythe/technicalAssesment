<template>
  <div>
    <h1>404 - Page Not Found</h1>
    <p>Sorry. We are Unable to locate this page</p>
    <p>Would you like to go back<router-link to="/"> home?</router-link></p>
  </div>
</template>


<script>
export default {
  name: 'NotFound',

};
</script>