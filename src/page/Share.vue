<template>
    <div class="share-box">
        <img :src="shareImgUrl" alt="">
        <span>长按图片保存</span>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                shareImgUrl: ''
            }
        },
        created () {
            this.shareImgUrl = localStorage[this.$route.params.storage]
        }
    }
</script>
<style lang="less">
    .share-box {
        text-align: center;
        img {
            width: 6.4rem;
            margin: 0 auto;
        }
    }
</style>