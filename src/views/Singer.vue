<template>
    <div class="singer">
        <loading v-show="loadingShow" />
        <div class="bscroll" ref="bscroll">
            <div class="bscroll-container">
                <div>
                    <div v-for="(value,prop) in singerList" :key="prop" ref='ul'>
                        <h2>{{prop}}</h2>
                        <div class="singer-item" v-for="item in value" :key='item.id' @click="goto(item.id)">
                            <img v-lazy="item.img1v1Url" alt="">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <index-list @send='take' :currentIndex="currentIndex"></index-list>
    </div>  
</template>

<script>

import BScroll from "better-scroll";
import { setTimeout } from 'timers';
export default {
    name:'Singer',
    data(){
        return{
            singerList:{},
            aBScroll:'',
            scrollY:'',
            singerHeight:[],
            currentIndex:0,
            loadingShow:true
        }
    },
    watch:{
        scrollY(newVal){
            if(newVal > 0){
                this.currentIndex = 0;
                return ;
            }
            for (let i = 0; i < this.singerHeight.length - 1; i++) {
                let height1 = this.singerHeight[i]
                let height2 = this.singerHeight[i + 1]

                if (-newVal >= height1 && -newVal < height2) {
                    this.currentIndex = i
                    return
                }
            }
            if(!this.listHeight){return};
            this.currentIndex = this.listHeight.length ;
        }
    },
    methods:{
        take(idx,e){
            this.aBScroll.scrollToElement(this.$refs.ul[idx],300)
        },
        computedHeight(){
            let height = 0;
            this.singerHeight.push(height);
            let ulArr = [...this.$refs.ul];
            ulArr.forEach(item=>{
                height += item.clientHeight;
                this.singerHeight.push(height);
            })
        },
        goto(id){
            this.$router.push({
                name:'songdetail',
                query:{
                    id,
                    type:'singer'
                }
            })
        }
    },
    created(){
        let letters = ['A','B','C','E','F','G','H','I','J','L','M','N','O','P','R','S','T','V','W','X','Y','Z'];
        this.$http.get('/top/artists?offset=0&limit=10')
        .then(res=>{
            this.$set(this.singerList , '热门' ,res.data.artists );
        })
        letters.forEach(item=>{
            this.$http.get(`/artist/list?limit=60&initial=${item}`)
            .then(res=>{
                let ran = Math.round(Math.random()*10 + 10);
                this.$set(this.singerList , item ,res.data.artists.slice(0,ran) );
            })
        })
        
    },
    mounted(){
        this.$nextTick(()=>{
            let bscrollDom = this.$refs.bscroll;
            this.aBScroll = new BScroll(bscrollDom,{
                probeType: 3,
                click: true
            });
            this.aBScroll.on('scroll', (pos) => {
                this.scrollY = pos.y
            })
        }),
        setTimeout(()=>{
            this.computedHeight();
            this.loadingShow = false;
        },1000)
    }
}
</script>

<style lang="less" scoped>
.singer{
        font-size: 16px;
        width: 100%;
    .bscroll{
        width: 100%;
        overflow: hidden;
        height:100vh;
        }
}
 h2{
        width: 100%;
        height: .2rem;
        font-size: 14px;
        color: #fff;
        padding-left: .12rem;
        background: rgba(0, 0, 0, 0.1);
        font-weight: 600;
        line-height: .2rem;
    }
    .singer-item{
        width: 100%;
        height: .6rem;
        background-color: rgba(240, 240, 240, .3);
        display: flex;
        align-items: center;
        padding-left:5px;
        border-bottom: 1px solid #eee;
        img{
            width: .5rem;
            height: .5rem;
        }
        span{
            display: inline-block;
            width: .98rem;
            line-height: 14px;
            font-size: 14px;
            color:#2e3030;
            padding-left: 10px;
        }
    }

</style>

