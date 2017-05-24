Vue.component('goods-details', {
    name: 'goods-details',
    template: getDetailsTemplate(),
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