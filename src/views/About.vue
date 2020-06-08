<template>
  <div class="about">
    <Login />
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  name: 'About',
  components: {
    Login
  }
}
</script>
