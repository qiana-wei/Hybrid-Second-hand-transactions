Vue.component('welcome', {
    name: 'welcome',
    template: getWelcomeTemplate(),
    data(){
        return{
            userInfo: this.$root.userInfo
        }
    },
    methods: {
        changeCurrentView() {
            if(this.userInfo){
                console.log('home');
                this.$emit('event','changeCurrentView','home')
            }else{
                console.log('login');
                this.$emit('event','changeCurrentView','login')                
            }
        }
    }
})