<template>
  <div id="header">
    <router-link to="/inscription" v-if="!$store.getters.isConnected">inscription</router-link>
    <router-link to="/connexion" v-if="!$store.getters.isConnected">connection</router-link>
    <router-link to="/wall" v-if="$store.getters.isConnected">tous</router-link>
    <router-link to="/mypage" v-if="$store.getters.isConnected">my</router-link>
    <router-link to="/account" v-if="$store.getters.isConnected">compte</router-link>
    <router-link to="/newarticle" v-if="$store.getters.isConnected">poster</router-link>

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