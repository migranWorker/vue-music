<template>
    <div class="recommend">
        <loading v-show="loadingShow" />
        <div class="bscroll" ref="bscroll">
            <div class="bscroll-container">
                <my-swiper :imgList='imgList'></my-swiper>
                <my-title title="推荐歌单"></my-title>
                <div v-for="(item,index) in items" :key="index">
                    <music-item :listOne = 'item'></music-item>
                </div>
                <my-title title="最新音乐"></my-title>
                <div 
                    v-for="(item,index) in newSongList" 
                    :key='item.id'
                    @click="play(index)"
                >
                    <music-show :item='item'></music-show>
                </div>
                <logo-footer></logo-footer>
                <div class="footer-item"></div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
import {mapActions} from 'vuex'
import { setTimeout } from 'timers';
export default {
    name:'recommend',
    data(){
        return{
             imgList:[
                {
                    id:'1',
                    src:'http://p1.music.126.net/etGElLEcyy37IlATBiIn_A==/109951164059892090.jpg'
                },
                {
                    id:'2',
                    src:'http://p1.music.126.net/Qqyi717wrDnJU8V2mSjd7Q==/109951164059931279.jpg'
                },
                {
                    id:'3',
                    src:'http://p1.music.126.net/S7ZRImpaNU2q9L1L8jp24w==/109951164060714615.jpg'
                },
                {
                    id:'4',
                    src:'http://p1.music.126.net/_eSyIRRUYI1UWA4xsSZSGA==/109951164059933045.jpg'
                }
            ],
            songList:[],
            items:[],
            newSongList:[],
            aBScroll:''  ,
            loadingShow:true
        }
    },
    computed:{
        listOne(){
            return this.songList.splice(0,3)
        },
        listTwo(){
            return this.songList.splice(3,3);
        }
    },
    created(){
        //推荐歌单
        this.$http.get('/personalized')
            .then(res=>{
                let {result} = res.data;
                this.songList = result.splice(0,6);
                this.items.push(this.songList.slice(0,3));
                this.items.push(this.songList.slice(3))
            })
        //最新歌曲
        this.$http.get('/personalized/newsong')
            .then(res=>{
                let {result} = res.data;
                this.newSongList = result;
                this.$nextTick(()=>{
                let bscrollDom = this.$refs.bscroll;
                this.aBScroll = new BScroll(bscrollDom,{
                        probeType: 3,
                        click: true
                    });
                })
                setTimeout(()=>{
                    this.loadingShow = false;
                },100)
            })
    },
    methods:{
         play(idx){
             let arr = [];
             this.newSongList.forEach(item=>{
                 let obj = {
                     name:item.name,
                     id:item.id,
                     al:{
                         picUrl : item.song.album.picUrl
                     },
                     ar:[{name:item.song.album.artists[0].name}],
                     dt:item.song.bMusic.playTime
                 }
                 arr.push(obj);
             })
            let obj = {
                songList:arr,
                currentIndex:idx,
                modeList:arr,
                play:true,
                playScreen:true
            }
            this.com_play(obj);
        },
        ...mapActions(['com_play'])
    }
}
</script>

<style lang="less" scoped>
.recommend{
        font-size: 16px;
    }
.bscroll{
    width: 100%;
    overflow: hidden;
    height:100vh;
}
.footer-item{
      height: .75rem !important;
    }
</style>

