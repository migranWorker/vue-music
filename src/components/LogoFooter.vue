<template>
    <div class="logofooter">
        <div class="btn-box">
            <button>打开APP，发现更多好音乐 ></button>
            <p>网易版权所有©1997-2019杭州乐读科技有限公司运营</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'LogoFooter'
}
</script>

<style lang="less" scoped>
 .logofooter{
    width: 100%;
    height: 2rem;
    background-image: url('https://s3.music.126.net/m/s/img/recommand_bg_2x.png?d045fafc60e017b653f8065a87496922');
    display: flex;
    justify-content: center;
    align-items: center;
    .btn-box{
        width: 3.01rem;
        height:.4rem;
        button{
            width: 100%;
            height: 100%;
            border:1px solid #d33a31;
            border-radius: 25px;
            background-color: transparent;
            color: #d33a31;
            font-size: 16px;
        }
        p{
            width: 100%;
            font-size: 12px;
            color:#888;
            transform: scale(.8);
            padding-top:3px;
        }
    }
 }
</style>

