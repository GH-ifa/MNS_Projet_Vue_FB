<template>
    <div id="connectionform">
        <input type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="Mot de passe" v-model="password">
        <button @click="connect()">Se connecter</button>
        <router-link to="/">Mot de passe oublié ?</router-link>
    </div>
</template>




<script>
const axios = require('axios').default;
import router from "../router/index";

export default {
    name: "ConnectionPage",
    data() {
        return {
            email: "",
            password: "",
        }
    },
    created () {
        if (this.$store.getters.isConnected) {
            router.push('/');
        }
    },
    methods: {
        connect() {
            console.log('mail', this.email);
            axios({
                method: 'post',
                baseURL: 'http://localhost:3000/api/connection',
                data: JSON.stringify({email: this.email, password: this.password}),
                headers: this.$store.getters.headers
            })
            .then((res) => {
                console.log('status', res.status);
                if (res.status == 200) {
                    console.log('gg', res);
                    this.$store.dispatch('connect', {email: res.data.email, token: res.data.token, id: res.data.id, username: res.data.username});
                    router.push('/');
                }
                else {
                    console.log('err', res);
                }
            })
            .catch((error) => {
                console.log('err', error);
            });
        }
    },
}
</script>