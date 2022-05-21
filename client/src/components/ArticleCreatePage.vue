<template>
    <div id="newarticleform">
        <input type="text" placeholder="Titre" v-model="title">
        <textarea v-model="content"></textarea>
        <button @click="createArticle()">Poster l'article</button>
    </div>
</template>

<script>
const axios = require('axios').default;

export default {
    name: "ArticleCreatePage",
    data() {
        return {
            title: '',
            content: ''
        }
    },
    methods: {
        createArticle() {
            const userId = this.$store.getters.id;
            axios({
                method: 'post',
                baseURL: 'http://localhost:3000/api/posts/',
                data: JSON.stringify({title: this.title, content: this.content, author: userId}),
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