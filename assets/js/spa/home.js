Vue.component('home', {
    name: 'home',
    template: getHomeTemplate(),
    data(){
        return{
            userInfo: this.$root.userInfo
        }
    },
    methods: {
    }
})