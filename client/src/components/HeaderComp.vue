<template>
  <div id="header">
    <router-link to="/inscription" v-if="!$store.getters.isConnected">Inscription</router-link>
    <router-link to="/connexion" v-if="!$store.getters.isConnected">Connection</router-link>
    <router-link to="/wall" v-if="$store.getters.isConnected">Wall</router-link>
    <router-link to="/mypage" v-if="$store.getters.isConnected">Messages</router-link>
    <router-link to="/account" v-if="$store.getters.isConnected">Compte</router-link>
    <router-link to="/newarticle" v-if="$store.getters.isConnected">Poster un nouvel article</router-link>

<router-link to="/" @click.native="logout()" v-if="$store.getters.isConnected">Déconnexion</router-link>
  </div>
</template>



<script>
export default {
  name: "HeaderComp",
  data() {
    return {

    }
  },
  methods: {
    logout() {
      this.$store.dispatch('disconnect');
    }
  },
}
</script>

<style>
#header a {
  margin-right: 10px;

}


</style>