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
            headers: this.$store.getters.headers
        })
        .then((res) => {
            console.log('status', res.status);
            if (res.status == 200) {
                this.article = res.data;
            }
            else {
                console.log('err', res);
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
                console.log('', res);
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
        articleid: function(newVal) {
            this.updateArticle(newVal);
        }
    },
  mounted() {
        this.updateArticle(this.articleid);
  },

}
</script>

<style>
#articleview {
  border-radius: 30px;
  background-color: #82E9CF;
  color: black;
  filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));
}

#articleview h1 {
  font-size: 26px;
  margin-left: 30px;
  margin-top: 10px;
}
</style>