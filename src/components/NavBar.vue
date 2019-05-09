<template>
    <div class="navbar">
        <router-link 
            v-for="item in linkArr"
            :key = "item.name"
            :to='{name:item.name}'
        >
        {{item.title}}
        </router-link>
    </div>
</template>

<script>
export default {
    name:'NavBar',
    data(){
        return {
            linkArr:[
                {name:'recommend',title:'推荐'},
                {name:'ranking',title:'排行'},
                {name:'singer',title:'歌手'}
            ]
        }
    }
}
</script>

<style lang="less" scoped>
    .navbar{
        width: 100%;
        height: .4rem;
        display: flex;
        position: fixed;
        top:.4rem;
        left:0;
        z-index: 2;
        background: #fff;
        a{
            font-size: 16px;
            display: block;
            flex: 1;
            line-height: .4rem;
            text-align: center;
            text-decoration: none;
            color: #000;
        }
        .router-link-active{
            color: red;
            position: relative;
            border-bottom:1px solid red;
        }
    }
    
</style>


