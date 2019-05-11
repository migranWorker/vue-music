<template>
    <div class="player">
        <div class="bg">
            <img v-lazy="img" alt="" class="blur">
        </div>
        <div class="container">
            <div v-show="get_playScreen">
                <div class="title">
                    <img src="@/assets/img/down.png" alt="">
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
                        <div>
                            <img src="@/assets/img/stop.png" alt="">
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
        <div v-show="!get_playScreen">min player</div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name:'Player',
    computed:{
        img(){
            return this['get_songList'][this['get_currentIndex']].al.picUrl;
        },
        songName(){
            return this['get_songList'][this['get_currentIndex']].al.name;
        },
        singer(){
            let ar = this['get_songList'][this['get_currentIndex']].ar;
            let str = '';
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
    created(){
        console.log(this['get_songList'][this['get_currentIndex']]);
    }
}
</script>

<style lang="less" scoped>
    .player{
        font-size: 16px;
        width: 100%;
        height: 100vh;
        background-size: 300% 300%;
        background-repeat: no-repeat;
        .bg{
            width: 100%;
            height: 100%;
            position: fixed;
            top:0;
            right: 0;
            opacity: 0.2;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .container{
            width: 100%;
            height: 100%;
            background-color:rgba(0, 0, 0, 0.6);
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
</style>
