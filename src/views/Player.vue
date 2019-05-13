<template>
    <div class="player" v-show="get_songList.length > 0">
        <div class="container" v-show="get_playScreen">
            <div >
                <div class="bg">
                    <img :src="img()" :key="get_currentIndex" alt="" class="blur">
                </div>
                <div class="title">
                    <img src="@/assets/img/down.png" alt="" @click="back">
                    <div class="title-msg">
                        <h1>{{songName}}</h1>
                        <h2>{{singer}}</h2>
                    </div>
                </div>
                <div class="turntable" @click="changeShow">
                    <transition name="slide-fade" mode="out-in">
                        <div class="turntable-box" v-show="isShow">
                            <div class="turntable-box1 " :class="['rotate',get_play ? '' : 'pause']" >
                                <img :src="img()" :key="get_currentIndex" alt="">
                            </div>
                        </div>
                    </transition>
                    <transition name="slide-fade" mode="out-in">
                        <div class="lyric" v-show="!isShow" ref="lyric">
                            <div class="bscroll" ref="bscroll">
                                <div class="bscroll-container">
                                    <div class="lyric-content" >
                                        <p 
                                            ref="p"
                                            v-for="(item,index) in lyric.lines" 
                                            :key='index'
                                            :class="[currentLineNum === index ? 'current' : '']" 
                                        >
                                            {{item.txt}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <div class="bottom">
                    <div class="press">
                        <my-progress 
                            @proportion = 'check'
                            :nowTime='nowTime'
                            :playTime = 'playTime'
                            :rate = 'rate'
                        >
                        </my-progress>
                    </div>
                    <div class="btns">
                        <div>
                            <img src="@/assets/img/loop.png" alt="">
                        </div>
                        <div @click="prev">
                            <img src="@/assets/img/preve.png" alt="">
                        </div>
                        <div @click="stop">
                            <img :src="stopImg" alt="">
                        </div>
                        <div @click='next'>
                            <img src="@/assets/img/next.png" alt="">
                        </div>
                        <div>
                            <img src="@/assets/img/collection.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mini-player" v-show="!get_playScreen" @click="changePlayScreen">
            <div class="box" :class="['rotate',get_play ? '' : 'pause']" >
                <img :src="img()" alt="">
            </div>
            <div class="minit-player-container">
                <p class="p1">{{songName}}</p>
                <p class="p2">{{singer}}</p>
            </div>
            <div class="btnStart">
                <div @click.stop="stop">
                    <img :src="stopImg" alt="">
                </div>
            </div>
        </div>
        <audio ref = 'audio' :src="src" :key="get_currentIndex" @timeupdate="updataTime"></audio>
    </div>
</template>

<script>
import {mapGetters , mapMutations} from 'vuex'
import { setTimeout } from 'timers';
import Lyric from 'lyric-parser'
import BScroll from "better-scroll";

export default {
    name:'Player',
    data(){
        return{
            src:'',
            nowTime:'',
            dt:'',
            nowS:'',
            lrc:'',
            lyric:'',
            isShow:true,
            currentLineNum:'',
            aBScroll:'',
            publicPath: process.env.BASE_URL
        }
    },
    watch:{
        src(newVal , oldVal){
            if(this.lyric){
                this.lyric.stop();
            }
            this.$nextTick(()=>{
                this.$refs.audio.play();
                this.getLyric();
            })
        },
        get_play(newVal){
            this.$nextTick(()=>{
                newVal ? this.$refs.audio.play() : this.$refs.audio.pause();
            })
            if(this.lyric){
                this.lyric.togglePlay();
            }
        },
        get_songList(){
            this.getSongList();
        },
        get_currentIndex(){
            this.getSongList();
            this.img();
            
        },
        rate(newVal){
            if(newVal > 100){
                this.next();
            }
        }
    },
    computed:{
        //进度比例计算
        rate(){
            return (this.nowS / (this.dt /1000))*100 ;
        },
        playTime(){
            let ar = this['get_songList'][this['get_currentIndex']];
            if(ar === undefined){
                return ;
            }
            let timer = ar.dt;
            this.dt = timer;
            return this.format(timer,1000);
        },
        
        songName(){
            let item = this['get_songList'][this['get_currentIndex']];
            if(item === undefined){
                return ;
            }
            let name = this['get_songList'][this['get_currentIndex']].name;
            return name;
        },
        stopImg(){
            if(this.get_playScreen){
                return  this['get_play'] ? `${this.publicPath}stop.png` : `${this.publicPath}start.png`
            }else{
                return  this['get_play'] ? `${this.publicPath}stop1.png` : `${this.publicPath}start1.png`
            }
        },
        singer(){
            let ar = this['get_songList'][this['get_currentIndex']];
            if(ar === undefined){
                return ;
            }
            let str = '';
            ar = ar['ar'];
            ar.forEach((item,index) => {
                if(index == ar.length -1){
                    str += item.name
                }else{
                    str += item.name + '/'
                }
            });
            return str;
        },
        ...mapGetters([
            'get_currentIndex',
            'get_songList',
            'get_play',
            'get_playScreen',
            'get_mode'
        ])
    },
    methods:{
        back(){
            this.$store.commit('set_playScreen',false);
        },
        stop(){
            this.$store.commit('set_play', !this['get_play']);
        },
        changePlayScreen(){
            this.$store.commit('set_playScreen',true);
        },
        img(){
            let al = this['get_songList'][this['get_currentIndex']];
            if(al === undefined){
                return ;
            }
            al = this['get_songList'][this['get_currentIndex']].al;
            return al.picUrl;
        },
        getSongList(){
            let obj = this['get_songList'][this['get_currentIndex']] || {};
            let id = obj.id;
            if(id === undefined){
                return ;
            }
            this.$http.get(`/song/url?id=${id}`)
                .then(res=>{
                    this.src = res.data.data[0].url;
                })
        },
        updataTime(e){
            this.nowS = e.target.currentTime;
            this.nowTime = this.format(e.target.currentTime,1);
        },
        check(proportion){
            this.nowS = proportion * (this.dt /1000);
            this.$refs.audio.currentTime = this.nowS;
            if(this.lyric){
                this.lyric.seek(this.nowS * 1000);
            }
        },
        next(){
            let index = this.get_currentIndex;
            index ++;
            if(index == this.get_songList.length){
                index = 0;
            }
            this.$store.commit('set_play',true);
            this.$store.commit('set_currentIndex', index);
        },
        prev(){
            let index = this.get_currentIndex;
            index --;
            if(index < 0){
                index = this.get_songList.length -1;
            }
            this.$store.commit('set_currentIndex', index);
            this.$store.commit('set_play',true);
        },
        getLyric(){
            let obj = this['get_songList'][this['get_currentIndex']] || {};
            let id = obj.id;
            if(id === undefined){
                return ;
            }
            this.$http.get(`/lyric?id=${id}`)
                .then(res=>{
                    this.lrc = res.data.lrc.lyric;
                    this.lyric = new Lyric(this.lrc,this.handlerLyric);
                    if(this.get_play){
                        this.lyric.play();
                    }
                })
        },
        handlerLyric({lineNum,txt}){
            this.currentLineNum = lineNum;
            if(lineNum > 5){
                let ele = this.$refs.p[lineNum - 5];
                this.aBScroll.scrollToElement(ele,1000);
            }else{
                this.aBScroll.scrollTo(0,0,1000);
            }
        },
        changeShow(){
             this.isShow = !this.isShow;
        },
        format(timer,num){
            let now = Math.floor(timer/num);
            let m = Math.floor(now /60);
            let s = Math.floor(now%60);
            s = s > 9 ? s : `0${s}`;
            return `${m} : ${s}`
        }
    },
    mounted(){
        let bscrollDom = this.$refs.bscroll;
            this.aBScroll = new BScroll(bscrollDom,{
                probeType: 3,
                click: true
        });
    }
}
</script>

<style lang="less" scoped>
    .player{
        font-size: 16px;
        position: fixed;
        width: 100%;
        top:0;
        left: 0;
        z-index: 10;
        .bg{
        background: rgba(50,50,50,1);
            width: 100%;
            height: 100vh;
            position: fixed;
            top:0;
            right: 0;
            z-index: -1;
            img{
                width: 100%;
                height: 100vh;
            }
        }
        .container{
            width: 100%;
            height: 100vh;
            background-color:rgba(0, 0, 0, .5);
            z-index:10;
            .title{
                width: 100%;
                height:.5rem;
                display: flex;
                align-items: center;
                margin-bottom: 25px;
                img{
                    width: .22rem;
                    height: .22rem;
                    padding:5px 19px;
                }
                .title-msg{
                    display: inline-block;
                    width: 2.62rem;
                    height: .5rem;;
                    color: #f1f1f1;
                    h1{
                        width: 100%;
                        height: .3rem;
                        text-align: center;
                        line-height: .3rem;
                        font-weight: 600;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    h2{
                        width: 100%;
                        height: .2rem;
                        text-align: center;
                        line-height: .2rem;
                        font-size: 12px;
                    }
                }
            }
            .turntable{
                width:100%;
                height: 4.17rem;
                display: flex;
                align-items: center;
                position: relative;
                .turntable-box{
                    width: 100%;
                    height: 3rem;
                    position: absolute;
                    z-index: 11;
                    .turntable-box1{
                        width: 2.7rem;
                        height: 2.7rem;
                        margin:0 auto;
                        border-radius: 50%;
                        border:.15rem solid #959596;
                        overflow: hidden;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .bscroll{
                    width: 100%;
                    overflow: hidden;
                    height:100%;
                }
                .lyric{
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    position: absolute;
                    z-index: 10;
                    p{
                        color: #c7c7c7;
                        font-size: 14px;
                        padding: .1rem 0;
                        text-align: center;
                    }
                    .current{
                        color: #d43c33;
                    }
                }
            }
            .bottom{
                width: 100%;
                height: .9rem;
                position: absolute;
                bottom: .5rem;
                left:0;
                .press{
                    width: 3.1rem;
                    height: .5rem;
                    margin:0 auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .btns{
                    width: 100%;
                    height: .4rem;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    div{
                        width: .61rem;
                        height: .3rem;
                        text-align: center;
                        img{
                            width: .3rem;
                            height: .3rem;
                        }
                    }
                }
            }
        }
    }
 .blur {
     -webkit-filter: blur(30px); /* Chrome, Opera */
        -moz-filter: blur(30px);
         -ms-filter: blur(30px);    
             filter: blur(30px);
     filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6~IE9 */
}
.mini-player{
    position:fixed;
    bottom:0;
    left:0;
    width: 100%;
    height: .6rem;
    background: #fff;
    display: flex;
    align-items: center;
    .box{
        margin-left:.25rem;
        width: .4rem;
        height: .4rem;
        border-radius: 50%;
        overflow: hidden;
        border:1px solid #d43c33;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .minit-player-container{
        width: 1.95rem;
        height: .28rem;
        padding-left:10px;
        color: #2e3030;
        .p1{
            width: 100%;
            height: .14rem;
            font-size: 14px;
            line-height: .14rem;
            padding-bottom: .02rem;
        }
        .p2{
            width: 100%;
            height: .12rem;
            font-size: 12px;
            line-height: .12rem;
        }
    }
    .btnStart{
        width: .3rem;
        height: .34rem;
        img{
            width: 100%;
            height:100%;
        }
    }
}

@keyframes rot {
    from{
        transform: rotateZ(0deg);
    }
    to{
        transform: rotateZ(360deg);
    }
}
.rotate{
    animation:rot 20s  infinite linear;
}
.pause{
    animation-play-state:paused;
}


</style>
