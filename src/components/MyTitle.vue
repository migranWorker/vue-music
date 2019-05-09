<template>
    <div class="mytitle">
        <h1>{{title}}</h1>
    </div>
</template>

<script>
export default {
    name:'MyTitle',
    props:{
        title:{
            type:String,
            default:'标题'
        }
    }
}
</script>

 <style lang="less" scoped>
    h1{
        font-size: 18px;
        color: #666;
        font-weight: 400;
        box-sizing: border-box;
        padding-left: 10px;
        line-height: .65rem;
        position: relative;
        &:after{
            content: '';
            display: block;
            position: absolute;
            width:3px;
            height: .25rem;
            top:50%;
            transform: translateY(-50%);
            background: red;
            left: 3px;
        }
    }
</style>


