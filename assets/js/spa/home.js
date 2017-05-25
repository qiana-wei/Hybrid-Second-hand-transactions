Vue.component('home', {
    name: 'home',
    template: getHomeTemplate(),
    data(){
        return{
            userInfo: this.$root.userInfo
        }
    },
    mounted () {
        let url = `/api/good/list`;
        utils.DataService.get(url).done(res=>{
            console.log(res);
        })
    },
    methods: {
        changeCurrentView(name){
            this.$emit('event','changeCurrentView',name)
        }
    }
})