Vue.component('search', {
    name: 'search',
    template: getSearchTemplate(),
    data(){
        return{
            userInfo: this.$root.userInfo,
            searchContent:'',
            goods_list:''
        }
    },
    mounted(){

    },
    methods: {
        changeCurrentView(name){
            this.$emit('event','changeCurrentView',name)
        },
        searchGoods(){
            let url=`/api/good/search?key=${this.searchContent}`
            utils.DataService.get(url).done(res=>{
                res.length > 0 ? this.goods_list = res : this.goods_list='未找到商品'
            })
        },
        CheckTheDetails(goodID){
            this.$emit('event','changeGoodsId',goodID)
            this.$emit('event','changeCurrentView','goods-details')
        },
        addLike(goodID,num){
            let url = `/api/good/like/${goodID}`
            let data = {like:num}
            utils.DataService.patch(url,data)
        }
    }
})