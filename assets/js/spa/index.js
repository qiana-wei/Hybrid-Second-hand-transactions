new Vue({
    el:'#app',
    data:{
        userInfo:'',
        currentView:'welcome',
        pages:[{
            name:'welcome'
        },{
            name:'login'
        },{
            name:'home'
        },{
            name:'goodsdetails'
        },{
            name:'uploadgoods'
        },{
            name:'profile'
        }
        ]
    },
    template:getSTTemplate(),
    methods:{
        eventManager(type, params) {
            this[type](params);
        },
        changeCurrentView(name) {
            console.log(name);
            this.currentView = name;
        }
    },
    mounted(){
        this.userInfo = localStorage.getItem('userInfo');
    }
})