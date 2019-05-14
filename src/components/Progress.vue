<template>
    <div class="progress"  v-cloak>
        <div class="left">
            {{nowTime}}
        </div>
        <div class="prog">
            <div class="wrap" @click="play" ref = 'progress'>
                <div class="con" :style="{width:rate +'%'}"></div>
            </div>
        </div>
        <div class="right">
            {{playTime}}
        </div>
    </div>
</template>

<script>
export default {
    name:'Progress',
    props:['nowTime','playTime','rate'],
    methods:{
        play(e){
            let width = parseFloat(window.getComputedStyle(this.$refs.progress,null).width);
            let proportion = e.offsetX / width;
            this.$emit('proportion',proportion);
            this.$store.commit('set_play', true);
        }
    }
}
</script>

<style lang="less" scoped>
    .progress{
        display: flex;
        align-items: center;
        color: #000;
        min-height: .12rem;
        .left , .right{
            text-align: center;
            font-size: 12px;
            color: #f1f1f1;
            min-height: .12rem;
            min-width: .18rem;
        }
        .prog{
            width: 2.4rem;
            .wrap{
                width: 2.2rem;
                margin:0 auto;
                height:.04rem;
                background: rgba(0, 0, 0, .3);
                position: relative;
                .con{
                    top:0;
                    position: absolute;
                    height: 100%;
                    background-color: red;
                }
            }
        }
    }
    [v-cloak]{
        display: none !important;
    }
</style>

