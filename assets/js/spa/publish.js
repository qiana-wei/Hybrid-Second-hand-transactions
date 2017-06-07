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
            good_type : '' ,
            pictureFileList:[],
            picture:'',
            picSrc:[] 
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
            data.type = this.good_type.replace('\'/g','').split(' ');
            data.pictureFileList = this.pictureFileList;
            data.picSrc = this.picSrc;
            utils.DataService.post(url,data).done(res=>{
                this.changeGoodsId(res._id)
                this.changeCurrentView('goods-details')
            })
        },
        changeGoodsId(id){
            this.$emit('event','changeGoodsId',id)
        },
        addPic(event){
            let element = event.target;
            this.picture = element.files[0]
            let pictureFileName = event.target.value.replace(/.+[\\\/]/, "");
            let pictureNum = this.pictureFileList.length > 0 ? this.pictureFileList[this.pictureFileList.length - 1] : 0;
            if (this.isFiles(element)) {
                pictureFileName = (++pictureNum);
                this.pictureFileList.push(pictureFileName.toString());
                this.showCompressPicture(pictureFileName);
            }
        },
        isFiles(element){
            return this.picture ? true : false;
        },
        showCompressPicture(fileName){
            let reader = new FileReader();
            let picSrc  =this.picSrc
            reader.onload = (function (theFile, fileName) {
                return function (e) {
                    picSrc.push(e.target.result.toString());
                }
            })(this.picture, fileName)
            reader.readAsDataURL(this.picture);
        }
    } 
})