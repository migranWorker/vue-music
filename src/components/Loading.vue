<template>
    <div class="lodingBox">
        <div>
            <div  class="fm_loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="p-box">
                <p>努力加载中</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'loading'
}
</script>

<style lang="less" scoped>
    .lodingBox{
        width: 100%;
        height: 100vh;
        position:fixed;
        top:0;
        left:0;
        z-index: 15;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        .p-box{
            overflow: hidden;
            width: 100%;
            p{
                font-size: 14px;
                line-height: .5rem;
                color: #757575;
            }
        }
        .fm_loading {
            width: .7rem;
            height: .35rem;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            padding-right: 3px;
        }

        .fm_loading div {
            width: .05rem;
            height: .2rem;
            background-color: #d43c33;
            animation-duration: .5s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            margin-left: .05rem;
        }
        .fm_loading div:nth-of-type(1) {
            animation-name: fm_loadAnimate1;
        }

        .fm_loading div:nth-of-type(2) {
            animation-name: fm_loadAnimate2;
        }

        .fm_loading div:nth-of-type(3) {
            animation-name: fm_loadAnimate3;
        }

        .fm_loading div:nth-of-type(4) {
            animation-name: fm_loadAnimate4;
        }

        @keyframes fm_loadAnimate1 {
            0% {
                height: .15rem;
            }
            50% {
                height: .3rem;
            }
            100% {
                height: .15rem;
            }
        }

        @keyframes fm_loadAnimate2 {
            0% {
                height: .25rem;
            }
            50% {
                height: .15rem;
            }
            100% {
                height: .25rem;
            }
        }

        @keyframes fm_loadAnimate3 {
            0% {
                height: .18rem;
            }
            50% {
                height: .28rem;
            }
            100% {
                height: .18rem;
            }
        }

        @keyframes fm_loadAnimate4 {
            0% {
                height: .23rem;
            }
            50% {
                height: .15rem;
            }
            100% {
                height: .23rem;
            }
        }
    }
</style>
