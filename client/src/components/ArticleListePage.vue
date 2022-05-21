<template>

  <div id="articles">
    <transition name="slide-fade">
    <div v-if="articleOnDisplay!=''" :key="articleOnDisplay">Coucou {{articleOnDisplay}}
        <article-view :articleid="articleOnDisplay"></article-view>
    </div>
    </transition>
    <!-- <article-card :article="article" v-for="article in articles" :key="article.id" @onDisplay="display"></article-card> -->
    <article-list :articles="articles" @onDisplay="display"></article-list>

  </div>
</template>

<script>
import ArticleView from "./ArticleView.vue";
import ArticleList from "./ArticleList.vue";
const axios = require('axios').default;

export default {
  name: "ArticleListePage",
    components: {
        ArticleView,
        ArticleList
    },
  data() {
    return {
        articles:[],
        articleOnDisplay: ''
    }
  },
  props: {
    onlymine: {
      type: Boolean,
      default: false
    },
  },
  methods: {
      display(postId) {
          console.log('Display', postId);
          this.articleOnDisplay = postId;
      },
      prout() {
        this.articleOnDisplay = '';
      },
      updateArticleList() {
        //6286b246fae5c5b0edee022f
        const userId = this.$store.getters.id;
        const url = `http://localhost:3000/api/posts/` + (this.onlymine ? `/byauthor/${userId}` :'');
        console.log('url', url);
        axios({
            method: 'get',
            // baseURL: `http://localhost:3000/api/posts/byauthor/${userId}`,
            baseURL: url,
            // data: JSON.stringify({email: this.email, password: this.password}),
            headers: this.$store.getters.headers
        })
        .then((res) => {
            console.log('status', res.status);
            if (res.status == 200) {
                console.log('gg', res);
                this.articles = res.data;
                // this.$store.dispatch('connect', {email: res.data.email, token: res.data.token, id: res.data.id});
                // router.push('/');
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
  watch: { 
      onlymine: function() {
          this.updateArticleList();
      }
  },
  created() {
    this.updateArticleList();
  }
}
</script>


<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 1.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(1000px);

}
</style>