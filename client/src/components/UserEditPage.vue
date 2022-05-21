<template>
  <div id="useredit">
        <input type="text" placeholder="Nom" v-model="username">
        <input type="text" placeholder="Email" v-model="email">
        <button @click="edit()">Modifier</button>
  </div>
</template>


<script>
const axios = require('axios').default;

export default {
  name: "UserEditPage",
  data() {
    return {
        username: this.$store.state.username,
        email: this.$store.state.email,
    }
  },
  methods: {
    edit() {
        const userId = this.$store.getters.id;
        const token = this.$store.getters.token;

        axios({
            method: 'put',
            baseURL: `http://localhost:3000/api/users/${userId}`,
            data: JSON.stringify({
                username: this.username,
                email: this.email,
                token: token
            }),
            headers: this.$store.getters.headers
        })
        .then((res) => {
            if (res.status == 201) {
                console.log('gg', res);
            }
            else {
                console.log('err', res);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
  },
  created() {
    
  },
}
</script>