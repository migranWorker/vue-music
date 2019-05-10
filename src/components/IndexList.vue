<template>
    <ul class="index-list">
        <li 
            v-for="(item,index) in letters" 
            :key="index" 
            @click="goTo(index)"
            :class="{red : currentIndex == index}"
        >
            {{item}}
        </li>
    </ul>
</template>

<script>
import BScroll from "better-scroll";
export default {
    name:'IndexList',
    props:{
        currentIndex:Number
    },
    data(){
        return{
            letters : ['热','A','B','C','E','F','G','H','I','J','L','M','N','O','P','R','S','T','V','W','X','Y','Z']
        }
    },
    methods:{
        goTo(idx){
           this.$emit('send',idx);
        }
    },
    created(){
        console.log(this.currentIndex);
    }
}
</script>

<style lang="less" scoped>
    .index-list{
        width: .2rem;
        height:5rem;
        position: fixed;
        right: 0;
        top:50%;
        transform: translateY(-40%);
        line-height: 1;
        li{
            color: #757575;
            font-size: 11px;
            padding: 5px;
            font-weight: 600;
        }
    }
    .red{
        color: #d43c33 !important;
    }
</style>
