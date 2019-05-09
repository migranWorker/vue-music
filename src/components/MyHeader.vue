<template>
    <div class="myheader">
        <img src="@/assets/img/home_02.png" alt="">
        <input type="text" placeholder="  搜索音乐，视频，歌词，电台">
        <img src="@/assets/img/home_04.png" alt="">
    </div>
</template>

<script>
export default {
    name:'MyHeader'
}
</script>

<style scoped lang='less'>
    .myheader{
        width: 100%;
        height: .4rem;
        background-color: #d43c33;
        position: fixed;
        top:0;
        left:0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index:2;
            
        img{
            width: .475rem;
            height: 100%;
        }
        input{
            width: 2.75rem;
            height: .3rem;
            border:0px;
            outline: none;
            border-radius: 10px;
        }
    }
</style>


