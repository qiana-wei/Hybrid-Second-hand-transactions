new Vue({
    el:'#app',
    data:{
        userInfo:'',
        currentView:'welcome',
        goods_id:'',
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
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    },
    template:getSTTemplate(),
    methods:{
        eventManager(type, params) {
            this[type](params);
        },
        changeCurrentView(name) {
            this.currentView = name;
        },
        changeGoodsId(id){
            this.goods_id = id;
        },
        changeUserInfo(userInfo){
            this.userInfo = userInfo
        }
    }
})