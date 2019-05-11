<template>
    <div class="ranking">
        <div class="bscroll" ref="bscroll">
            <div class="bscroll-container">
                <div 
                    class="top-item" 
                    v-for="item in topList"
                    :key="item.id"
                    @click="push(item)"
                    >
                    <img v-lazy="item.coverImgUrl" alt="">
                    <ul>
                        <li v-for="(it,i) in item.songList" :key="i">
                          <span><i>{{i}} . </i> {{it.al.name}} - {{it.ar[0].name}}</span> 
                        </li>
                    </ul>
                </div>
                <div class="footer-item"></div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
import { setTimeout } from 'timers';
export default {
  name: "Ranking",
  data() {
    return {
      topList: [],
      aBScroll: "",
    };
  },
  methods:{
    push(id){
      this.$router.push({
        name:'songdetail',
        query:{
          id:id.idx,
          type:'ranking'
        }
      })
    }
  },
  created() {
    this.$http.get("/toplist/detail").then(res => {
      this.topList = res.data.list;
      let arr = ['云音乐新歌榜','云音乐热歌榜','网易原创歌曲榜','云音乐飙升榜','云音乐电音榜','UK排行榜周榜','美国Billboard周榜','KTV嗨榜','iTunes榜','Hit FM Top榜','日本Oricon周榜','韩国Melon排行榜周榜','韩国Mnet排行榜周榜',
'韩国Melon原声周榜','中国TOP排行榜(港台榜)','中国TOP排行榜(内地榜)','香港电台中文歌曲龙虎榜','华语金曲榜','中国嘻哈榜','法国 NRJ EuroHot 30周榜','台湾Hito排行榜','Beatport全球电子舞曲榜',
'云音乐ACG音乐榜','云音乐嘻哈榜'];
      for(let j=0;j<arr.length;j++){
        for(let i=0;i<this.topList.length;i++){
          if(this.topList[i].name.indexOf(arr[j]) > -1){
            this.$set(this.topList[i],'idx',j);
            break;
          }
        }
      }

    //过滤没有idx 属性的数据 有的发送ajax请求，没有则删除
    for(let i=0;i<this.topList.length;i++){
      if(!('idx' in this.topList[i])){
          this.topList.splice(i,1);
          i--;
      }else{
        this.$http.get(`/top/list?idx=${this.topList[i].idx}`)
            .then(res=>{
                let newArr = res.data.playlist.tracks.slice(0,3);
                this.$set(this.topList[i],'songList',newArr);
            })
      }
    }
        this.$nextTick(() => {
            let bscrollDom = this.$refs.bscroll;
            this.aBScroll = new BScroll(bscrollDom,{
              click:true
            })
        });
    });
  }
};
</script>

<style lang="less" scoped>
  .bscroll {
  width: 100%;
  overflow: hidden;
  height: 100vh;
}
.ranking {
  font-size: 16px;
  background-color: rgba(230, 230, 230, 0.4);

  .top-item {
    height: 1.07rem;
    width: 100%;
    padding: 3px 10px;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
    }
    ul {
      width: 2.15rem;
      height: 1rem;
      padding: 5px 20px 0;
      li {
        width: 100%;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 12px;
        color: #2e3030;
        span{
          display: inline-block;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
}
.footer-item{
    height: .75rem;
}
</style>


