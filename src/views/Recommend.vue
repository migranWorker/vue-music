<template>
    <div class="recommend">
        <my-swiper :imgList='imgList'></my-swiper>
        <my-title title="推荐歌单"></my-title>
        <div v-for="(item,index) in items" :key="index">
            <music-item :listOne = 'item'></music-item>
        </div>
        <my-title title="最新音乐"></my-title>
        <div v-for="item in newSongList" :key='item.id'>
            <music-show :item='item'></music-show>
        </div>
        <logo-footer></logo-footer>
    </div>
</template>

<script>
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
            newSongList:[]
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
        this.$http.get('http://localhost:3000/personalized')
                .then(res=>{
                    let {result} = res.data;
                    this.songList = result.splice(0,6);
                    this.items.push(this.songList.slice(0,3));
                    this.items.push(this.songList.slice(3))
                })
        //最新歌曲
        this.$http.get('http://localhost:3000/personalized/newsong')
                .then(res=>{
                    let {result} = res.data;
                    this.newSongList = result;
                })
    }
}
</script>

<style lang="less" scoped>
.recommend{
        font-size: 16px;
    }
</style>

