Vue.component('login', {
    name: 'login',
    template: getLoginTemplate(),
    data(){
        return{
            user_phone:'',
            check_code:'',
            isGetCheckCode:false,
            timeWait:60
        }
    },
    methods: {
        getCheckCode(){
            console.log(this.timeWait);
            this.isGetCheckCode = true;
            let timer  =setInterval(()=>{
                if(this.timeWait){
                    this.timeWait--;
                }else{
                    clearInterval(timer);
                    this.timeWait=60;
                    this.isGetCheckCode=false
                }
            },1000)
            let url = `/api/user/checkcode`
            let data = {
                phone:this.user_phone
            }
            utils.DataService.post(url,data).done(res=>{
                console.log(res);
            })
        },
        checkCode(){
            let url = `/api/user/register`
            let data = {
                phone:this.user_phone,
                check_code:this.check_code
            }
             utils.DataService.post(url,data).done(res=>{
                console.log(res);
                localStorage.setItem('userInfo',JSON.stringify(res.userInfo))
                this.$emit('event','changeCurrentView',res.changeCurrentView)
            })
        }
    }
})