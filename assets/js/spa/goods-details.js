Vue.component('goods-details', {
    name: 'goods-details',
    template: getDetailsTemplate(),
    data(){
        return{
            userInfo: this.$root.userInfo,
            goods_id:'',
            goodsInfo:{
                user_id:{}
            },
            isdetails:true,
            commentMsg:'',
            commentList:''
        }
    },
    mounted(){
        this.goods_id = this.$root.goods_id;
        console.log(this.goods_id);
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval:0//自动轮播周期，若为0则不自动播放，默认为0；
        });
        let goodUrl = `/api/good/details/${this.goods_id}`
        utils.DataService.get(goodUrl).done(res=>{
            console.log(res);
            this.goodsInfo = res;
        })
        let commentUrl = `/api/good/${this.goods_id}/comment`
        utils.DataService.get(commentUrl).done(res=>{
            console.log(res);
            this.commentList=res;
        })
    },
    methods: {
        changeCurrentView(name){
            this.$emit('event','changeCurrentView',name)
        },
        publishComment(){
            let url=`/api/good/${this.goods_id}/comment`
            let data={
                comment : this.commentMsg,
                goods_id : this.goods_id,
                user_id : this.userInfo._id
            }
            utils.DataService.post(url,data).done(res=>{
                console.log(res);
                this.commentList.unshift(res)
                this.commentMsg=''
            })
        }
    }
})