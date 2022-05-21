<template>

  <div id="articles">
    <div v-if="articleOnDisplay!=''" :key="articleOnDisplay">Coucou {{articleOnDisplay}}
        <article-view :articleid="articleOnDisplay"></article-view>
    </div>
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
        const userId = this.$store.getters.id;
        const url = `http://localhost:3000/api/posts/` + (this.onlymine ? `/byauthor/${userId}` :'');
        console.log('url', url);
        axios({
            method: 'get',
            baseURL: url,
            headers: this.$store.getters.headers
        })
        .then((res) => {
            console.log('status', res.status);
            if (res.status == 200) {
                this.articles = res.data;
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
