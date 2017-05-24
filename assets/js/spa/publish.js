Vue.component('publish', {
    name: 'publish',
    template: getPublishTemplate(),
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