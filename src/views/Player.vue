<template>
    <div class="player" v-show="get_songList.length > 0">
        <div class="container" v-show="get_playScreen">
            <div >
                <div class="bg">
                    <img v-lazy="img" alt="" class="blur">
                </div>
                <div class="title">
                    <img src="@/assets/img/down.png" alt="" @click="back">
                    <div class="title-msg">
                        <h1>{{songName}}</h1>
                        <h2>{{singer}}</h2>
                    </div>
                </div>
                <div class="turntable">
                    <div class="turntable-box">
                        <div class="turntable-box1">
                            <img v-lazy="img" alt="">
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="press"></div>
                    <div class="btns">
                        <div>
                            <img src="@/assets/img/loop.png" alt="">
                        </div>
                        <div>
                            <img src="@/assets/img/preve.png" alt="">
                        </div>
                        <div @click="stop">
                            <img :src="stopImg" alt="">
                        </div>
                        <div>
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
            <div class="box">
                <img v-lazy="img" alt="">
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
        <audio ref = 'audio' :src="src"></audio>
    </div>
</template>

<script>
import {mapGetters , mapMutations} from 'vuex'
import { setTimeout } from 'timers';
export default {
    name:'Player',
    data(){
        return{
            src:'',
            publicPath: process.env.BASE_URL
        }
    },
    watch:{
        src(newVal , oldVal){
            console.log(newVal,oldVal);
            this.$nextTick(()=>{
                this.$refs.audio.play();
            })
        },
        get_play(newVal){
            this.$nextTick(()=>{
                newVal ? this.$refs.audio.play() : this.$refs.audio.pause()
            })
        },
        get_songList(newVal){
            let obj = this['get_songList'][this['get_currentIndex']] || {};
            let id = obj.id;
            if(id === undefined){
                return ;
            }
            this.$http.get(`/song/url?id=${id}`)
                .then(res=>{
                    this.src = res.data.data[0].url;
                    console.log(this.src);
                })
        }
    },
    computed:{
        img(){
            let al = this['get_songList'][this['get_currentIndex']];
            if(al === undefined){
                return ;
            }
            al = this['get_songList'][this['get_currentIndex']].al;
            return al.picUrl;
        },
        songName(){
            let al = this['get_songList'][this['get_currentIndex']];
            if(al === undefined){
                return ;
            }
            al = this['get_songList'][this['get_currentIndex']].al;
            return al.name;
        },
        stopImg(){
            return  this['get_play'] ? `${this.publicPath}stop.png` : `${this.publicPath}start.png`
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
        }
    },
}
</script>

<style lang="less" scoped>
    .player{
        font-size: 16px;
        position: fixed;
        width: 100%;
        top:0;
        left: 0;
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
                .turntable-box{
                    width: 100%;
                    height: 3rem;
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
            }
            .bottom{
                width: 100%;
                height: .9rem;
                position: absolute;
                bottom: .5rem;
                left:0;
                .press{
                    width: 3rem;
                    height: .5rem;
                    margin:0 auto;
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
    background: #ddd;
    display: flex;
    align-items: center;
    .box{
        margin-left:.25rem;
        width: .4rem;
        height: .4rem;
        border-radius: 50%;
        overflow: hidden;
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
</style>
