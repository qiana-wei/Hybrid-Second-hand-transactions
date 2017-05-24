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
            name:'goods-details'
        },{
            name:'publish'
        },{
            name:'mine'
        },{
            name:'search'
        },{
            name:'supplement'
        }
        ]
    }, 
    mounted(){
        mui.init();
        // localStorage.setItem('userInfo','1111');
        // console.log(localStorage.getItem('userInfo'));
        // localStorage.clear();
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
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
    }
})