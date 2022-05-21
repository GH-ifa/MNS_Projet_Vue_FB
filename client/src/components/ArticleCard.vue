<template>
  <div id="articlecard">
    <h1 @click="display()">{{article.title}}</h1>
    <small>Publié par {{article.author.username}}</small><br>
    <small>Le {{article.publication}}</small><br>
    <div>{{article.content}}</div>
    <div>{{article.comments.length}} commentaires</div>
    <button @click="like()">Like ({{article.likes.length}})</button>
  </div>
</template>



<script>
const axios = require('axios').default;

//réduire le content
export default {
  name: "ArticleCard",
  data() {
    return {

    }
  },
  props: {
    article: Object
  },
  methods: {
    display() {
      this.$emit('onDisplay', this.article._id);
    },
    like() {
      console.log('like de l\'article ' + this.article._id);
      const userId = this.$store.getters.id;
      axios({
          method: 'put',
          baseURL: `http://localhost:3000/api/posts/like/${this.article._id}`,
          data: JSON.stringify({userId: userId}),
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
}
</script>