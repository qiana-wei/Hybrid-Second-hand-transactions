Vue.component('home', {
    name: 'home',
    template: getHomeTemplate(),
    data(){
        return{
            userInfo: this.$root.userInfo,
            goods_list:'',
            isNormal:true
        }
    },
    mounted () {
        let url = `/api/good/list`;
        utils.DataService.get(url).done(res=>{
            console.log(res);
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
        },
        addLike(goodID,num){
            let url = `/api/good/like/${goodID}`
            let data = {like:num}
            utils.DataService.patch(url,data).done(res=>{
                console.log(res);
            })
        },
        sortByLike(){
            let url = `/api/good/list/like`;
            utils.DataService.get(url).done(res=>{
                console.log(res);
                this.goods_list = res;
            })
        },
        sortByTime(){
            let url = `/api/good/list`;
            utils.DataService.get(url).done(res=>{
                console.log(res);
                this.goods_list = res;
            })
        }
    }
})