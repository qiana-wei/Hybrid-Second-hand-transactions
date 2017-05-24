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
            // if(this.userInfo){
            //     console.log('home');
            //     this.$emit('event','changeCurrentView','home')
            // }else{
            //     console.log('login');
            //     this.$emit('event','changeCurrentView','login')                
            // }
            this.$emit('event','changeCurrentView','supplement')
        }
    }
})