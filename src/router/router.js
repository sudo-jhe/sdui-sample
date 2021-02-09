import Vue from 'vue'
import VueRouter from "vue-router";
import NewsFeed from "@/components/NewsFeed";
import SamplePage from "@/components/SamplePage";
import NotFound from "@/components/NotFound";

Vue.use(VueRouter)

export default new VueRouter({
    base: __dirname,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: [
        {path: '/', component: NewsFeed},
        {path: '/sample1', component: SamplePage, props: {displayText: 'This is Sample Page 1'}},
        {path: '/sample2', component: SamplePage, props: {displayText: 'This is Sample Page 2'}},
        {path: '/sample3', component: SamplePage, props: {displayText: 'This is Sample Page 3'}},
        {path: '*', component: NotFound},
    ]
})