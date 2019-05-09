<template>
    <div class="musicshow">
        <div class="msg">
            <p class="title">
                {{item.song.name}}
                <span>{{item.song.alias[0]}}</span>
            </p>
            <p class="ftitle">
                <span class="ftitle-img"></span>
                <span class="ftitle-msg">{{item.song.artists[0].name}} - {{item.song.name}}</span>
            </p>
        </div>
        <div class="img">
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
    name:'MusicShow',
    props:{
        item:Object
    }
}
</script>

<style lang='less' scoped>
    .musicshow{
        width: 100%;
        height: .55rem;
        display: flex;
        padding-left: .1rem;
        box-sizing: border-box;
        border-bottom:1px solid #eee;
        .msg{
            padding:.06rem 0;
            box-sizing: border-box;
            width: 3.23rem;
            height: 100%;
            .title{
                width: 100%;
                height: .25rem;
                font-size: 17px;
                line-height: .25rem;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: #333;
                span{
                    color: #888;
                }
            }
            .ftitle{
                width: 100%;
                height: .18rem;
                .ftitle-img{
                    display: inline-block;
                    width: .12rem;
                    height: .08rem;
                    background-image: url('https://s3.music.126.net/m/s/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880');
                    background-size:166px 97px;
                }
                span{
                    font-size: 12px;
                    color: #888;
                }
                .ftitle-msg{
                    padding-left:5px;
                }
            }
        }
        .img{
            flex:1;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                width: .22rem;
                height: .22rem;
                display: block;
                background-image: url('https://s3.music.126.net/m/s/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880');
                background-size: 166px 97px;
                background-position: -24px 0;
            }
        }
    }
</style>

