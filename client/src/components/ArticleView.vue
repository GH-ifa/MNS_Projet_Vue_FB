<template>
    <div id="articleview">
        <h1>{{article.title}}</h1>
        <small>Publié par {{article.author.username}}</small><br>
        <small>Le {{article.publication}}</small><br>
        <div>{{article.content}}</div>
        <button @click="like()">Like ({{article.likes.length}})</button>

        <div v-for="comment in article.comments" :key="comment.id">
            <small>Publié par {{article.author.username}} le {{article.publication}}</small><br>
            <div>- {{comment.content}}</div>
        </div>

        <div id="newcommform">
        <input type="text" placeholder="Commentaire" v-model="commentcontent">
        <button @click="createComment()">Poster le commentaire</button>
    </div>
    </div>
</template>



<script>
const axios = require('axios').default;

export default {
  name: "ArticleView",
    components: {

    },
  data() {
    return {
        article: {author:{}, comments:{}, likes:{}},
        commentcontent: ''
    }
  },
  props: {
    articleid: String,
  },
  methods: {
    updateArticle() {
        axios({
            method: 'get',
            baseURL: `http://localhost:3000/api/posts/${this.articleid}`,
            // data: JSON.stringify({email: this.email, password: this.password}),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((res) => {
            console.log('status', res.status);
            if (res.status == 200) {
                console.log('zz', res);
                this.article = res.data;
                // this.$store.dispatch('connect', {email: res.data.email, token: res.data.token, id: res.data.id});
                // router.push('/');
            }
            else {
                console.log('errzz', res);
            }
        })
        .catch((error) => {
            console.log('err', error);
        });
    },
    createComment() {
        const userId = this.$store.getters.id;

        axios({
            method: 'post',
            baseURL: `http://localhost:3000/api/posts/comment/${this.articleid}`,
            data: JSON.stringify({content: this.commentcontent, author: userId}),
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

    watch: { 
        articleid: function(newVal) { // watch it
            this.updateArticle(newVal);
        }
    },
  mounted() {
      console.log('oooo', this.articleid);
        this.updateArticle(this.articleid);
  },

}
</script>

<style scoped>
* {
    white-space: pre;
    color: red;
    background-color: yellow;
}
</style>