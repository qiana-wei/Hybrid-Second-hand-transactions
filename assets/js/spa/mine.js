Vue.component('mine', {
    name: 'mine',
    template: getMineTemplate(),
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