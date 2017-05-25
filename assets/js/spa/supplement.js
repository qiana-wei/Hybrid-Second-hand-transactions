Vue.component('supplement', {
    name: 'supplement',
    template: getSupplementTemplate(),
    data(){
        return{
            userInfo: this.$root.userInfo,
            username:'',
            admission_time:'',
            sex:'',
        }
    },
    methods: {
        changeCurrentView(name){
            this.$emit('event','changeCurrentView',name)
        },
        startUse(){
            let url = `/api/user/info`
            let data = {
                username : this.username,
                admission_time : this.admission_time,
                sex : this.sex
            }
            data = $.extend(data,this.userInfo)
            utils.DataService.patch(url,data).done(res=>{
                this.$emit('event','changeCurrentView','home')
            })
        }
    }
})