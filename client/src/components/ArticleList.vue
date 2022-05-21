<template>
    <div id="articlelist">
        <article-card :article="article" v-for="article in articles" :key="article._id" @onDisplay="display"></article-card>
    </div>
</template>

<script>
// const axios = require('axios').default;
import ArticleCard from "./ArticleCard.vue"

export default {
  name: "ArticleList",
    components: {
        ArticleCard
    },
  data() {
    return {
        
    }
  },
  props: {
    articles: [],
  },
  methods: {
    display(articleId) {
      this.$emit('onDisplay', articleId);
    },
  }

}
</script>

<style>
</style>