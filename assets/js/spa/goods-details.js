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
        let goodUrl = `/api/good/details/${this.goods_id}`
        utils.DataService.get(goodUrl).done(res=>{
            this.goodsInfo = res;
            let timer = setTimeout(()=>{
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval:0
                });
            },1000)
            
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
                this.commentList.unshift(res)
                this.commentMsg=''
            })
        }
    }
})