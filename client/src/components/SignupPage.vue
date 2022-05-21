<template>
    <div id="signupform">
        <input type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="Mot de passe" v-model="password">
        <input type="password" placeholder="Confirmer le mot de passe" v-model="passwordConfirm">
        <button @click="signup()">S'enregistrer</button>
        <router-link to="/connexion">Vous avez déjà un compte ?</router-link>
    </div>
</template>




<script>
const axios = require('axios').default;
import router from "../router/index";

export default {
    name: "SignupPage",
    data() {
        return {
            email: "",
            password: "",
            passwordConfirm: ""
        }
    },
    created () {
        if (this.$store.getters.isConnected) {
            router.push('/');
        }
    },
    methods: {
        signup() {
            console.log(this.email);
            // this.$store.commit('signup', {email: this.email, password: this.password});
            // this.$store.dispatch("signup", {email: this.email, password: this.password});
            axios({
                method: 'post',
                baseURL: 'http://localhost:3000/api/users/signup',
                data: JSON.stringify({email: this.email, password: this.password}),
                headers: this.$store.getters.headers
            })
            .then((res) => {
                if (res.status == 201) {
                    console.log('gg', res);
                    router.push('/connexion');
                    // this.$store.commit('signup', {email: this.email, password: this.password});
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
}
</script>