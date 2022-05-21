import VueRouter from "vue-router";
import HomePage from "../components/HomePage";
import SignupPage from "../components/SignupPage";
import ConnectionPage from "../components/ConnectionPage";
import ArticleListePage from "../components/ArticleListePage";
import UserEditPage from "../components/UserEditPage";
import ArticleCreatePage from "../components/ArticleCreatePage"


const routes = [
    {path: "/", component: HomePage},
    {path: "/inscription", component: SignupPage},
    {path: "/connexion", component: ConnectionPage},
    {path: "/account", component: UserEditPage},
    {path: "/newarticle", component: ArticleCreatePage},
    {path: "/wall", component: ArticleListePage},
    {path: "/mypage", component: ArticleListePage, props: {onlymine: true}}
  ];
  
const router = new VueRouter({
    mode: "history",
    routes
});
  
export default router;
  