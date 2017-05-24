Vue.component('search', {
    name: 'search',
    template: getSearchTemplate(),
    data(){
        return{
            userInfo: this.$root.userInfo
        }
    },
    mounted(){

    },
    methods: {
        changeCurrentView(name){
            this.$emit('event','changeCurrentView',name)
        }
    }
})