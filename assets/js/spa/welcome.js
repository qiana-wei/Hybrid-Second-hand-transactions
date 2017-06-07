Vue.component('welcome', {
    name: 'welcome',
    prop:['userinfo'],
    template: getWelcomeTemplate(),
    data(){
        return{
            userInfo:''
        }
    },
    mounted () {
        this.userInfo = localStorage.getItem('userInfo');
    },
    methods: {
        changeCurrentView() {
            if(this.userInfo){
                this.$emit('event','changeCurrentView','home')
            }else{
                this.$emit('event','changeCurrentView','login')                
            }
        }
    }
})