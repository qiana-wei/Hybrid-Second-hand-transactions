Vue.component('home', {
    name: 'home',
    template: getHomeTemplate(),
    data(){
        return{
            userInfo: this.$root.userInfo,
            goods_list:''
        }
    },
    mounted () {
        let url = `/api/good/list`;
        utils.DataService.get(url).done(res=>{
            this.goods_list = res;
        })
    },
    methods: {
        changeCurrentView(name){
            this.$emit('event','changeCurrentView',name)
        },
        CheckTheDetails(goodID){
            this.$emit('event','changeGoodsId',goodID)
            this.$emit('event','changeCurrentView','goods-details')
        }
    }
})