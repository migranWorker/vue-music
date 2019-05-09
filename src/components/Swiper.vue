<template>
    <div class="swiper">
        <div class="box">
            <swiper :options="options">
                <swiper-slide  v-for="item in imgList" :key="item.id">
                    <img :src="item.src" alt="">
                </swiper-slide>
                <div class="swiper-pagination" v-if="options.pagination" slot="pagination"/>
            </swiper>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    name:'MySwiper',
    props:{
        imgList:Array,
        options: {
            type: Object,
            default() {
                return {
                autoplay: true,
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    color:'red'
                }
                };
            }
        }
    },
    components:{
        swiper,
        swiperSlide
    }
}
</script>

<style lang="less" scoped>
    .box{
        width: 100%;
        box-sizing: border-box;
        padding: 3px 10px;
        border-radius: 10px;
        overflow: hidden;
        .swiper-container{
            border-radius: 15px;

        }
        img{
            width: 100%;
        }
    }
</style>



