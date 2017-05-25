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
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval:0//自动轮播周期，若为0则不自动播放，默认为0；
        });
    },
    methods: {
        changeCurrentView(name){
            this.$emit('event','changeCurrentView',name)
        }
    }
})