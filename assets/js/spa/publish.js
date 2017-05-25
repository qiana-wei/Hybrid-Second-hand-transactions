Vue.component('publish', {
    name: 'publish',
    template: getPublishTemplate(),
    data(){
        return{
            userInfo: this.$root.userInfo,
            goodsInfo:{
                goods_name:"",
                price : '',
                degree : '',
                description : ''
            },
            good_type : ''          
        }
    },
    mounted(){

    },
    methods: {
        changeCurrentView(name){
            this.$emit('event','changeCurrentView',name)
        },
        publishGoods(){
            let url='/api/good';
            let data=this.goodsInfo;
            data.user_id = this.userInfo._id;
            data.type = this.good_type.replace('\'/g','').split(' ')
            utils.DataService.post(url,data).done(res=>{
                this.changeGoodsId(res._id)
                this.changeCurrentView('goods-details')
            })
        },
        changeGoodsId(id){
            this.$emit('event','changeGoodsId',id)
        }
    }
})