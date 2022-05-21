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

<style>
#connectionform {
  display:flex;
  flex-direction: column;
  justify-content: center;
}

#connectionform input {
    width: 490px;
    height: 50px;
    border-radius: 30px;
    background-color: white;
    font-size: 18px;
    color: black;
    font-family: 'Inter';
    line-height: 20px;
    border-color: #0085FF;
}

#connectionform button {
    width: 220px;
    height: 50px;
    background-color: #0085FF;
    border-radius: 30px;
    font-size: 18px;
    color: white;
    font-family: 'Inter';
    line-height: 20px;
    border-color: transparent;
}

input, button {
    margin-top: 20px;
}

</style>