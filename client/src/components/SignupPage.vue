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


<style>
#signupform {
  display:flex;
  flex-direction: column;
  justify-content: center;
}

#signupform input {
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

#signupform button {
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
