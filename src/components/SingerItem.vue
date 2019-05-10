<template>
    <div>
        <div v-for="(value,prop) in singerList" :key="prop">
            <h2>{{prop}}</h2>
            <div class="singer-item" v-for="item in value" :key='item.id'>
                <img v-lazy="item.img1v1Url" alt="">
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'SingerItem',
    props:{
        singerList:Object
    }
}
</script>

<style lang="less" scoped>
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

