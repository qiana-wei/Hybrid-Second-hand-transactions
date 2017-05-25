Vue.component('goods-details', {
    name: 'goods-details',
    template: getDetailsTemplate(),
    data(){
        return{
            userInfo: this.$root.userInfo,
            goods_id:'',
        }
    },
    mounted(){
        this.goods_id = this.$root.goods_id;
        console.log(this.goods_id);
        let url = `/api/good/details/${this.goods_id}`
        utils.DataService.get(url).done(res=>{
            console.log(res);
        })
    },
    methods: {
        changeCurrentView(name){
            this.$emit('event','changeCurrentView',name)
        }
    }
})