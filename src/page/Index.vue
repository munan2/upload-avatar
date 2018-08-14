<template>
    <div class="index-container">
        <label class="upload-btn">开始上传或拍照
            <input type="file" value="" accept="image/*" @click="getPhoto" id="image-input">
        </label>
        <div class="photo-box">
            <div class="preview-box">
                <img :src="imgUrl" id="preview-img" @touchstart="getPosition($event)" @touchmove="getMovePosition($event)" @touchend="getLeavePosition($event)">
            </div>
            <img :src="imgArr[curIndex]" id="preview-bg" @touchstart="getInitPosition($event)" @touchmove="getMovePosition($event)" @touchend="getLeavePosition($event)">
        </div>
        <div class="photo-ul">
            <img src="../assets/imgs/temp1.png" @click="changeIndex(0)" :class="{'select-img':curIndex==0}">
            <img src="../assets/imgs/temp2.png" @click="changeIndex(1)" :class="{'select-img':curIndex==1}">
            <img src="../assets/imgs/temp3.png" @click="changeIndex(2)" :class="{'select-img':curIndex==2}">
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                curIndex: 0,
                imgArr: [
                    require('../assets/imgs/temp1.png'), 
                    require('../assets/imgs/temp2.png'),
                    require('../assets/imgs/temp3.png')
                ],
                imgUrl: '',
                initTouchX: 0,
                initTouchY: 0,
                changeTouchX: 0,
                changeTouchY: 0,
                reviewImgDom: ''
            }
        },
        mounted () {
            this.reviewImgDom = document.querySelector('#preview-img')
        },
        methods: {
            getPhoto () {
                var imageInput = document.querySelector('#image-input')
                var that = this
                imageInput.addEventListener('change', function (e) {
                    let reads = new FileReader()
                    reads.readAsDataURL(this.files[0])
                    reads.addEventListener('load', function (e) {
                        that.imgUrl = this.result
                    }) 
                })
            },
            changeIndex (index) {
                this.curIndex = index
            },
            getInitPosition (e) {
                if (this.imgUrl) {
                    var touches = e.touches[0]
                    this.initTouchX = touches.clientX
                    this.initTouchY = touches.clientY
                }
            },
            getMovePosition (e) {
                if (this.imgUrl) {
                    var touches = e.touches[0]
                    this.changeTouchX = touches.clientX - this.initTouchX
                    this.changeTouchY = touches.clientY - this.initTouchY
                    this.reviewImgDom.style.left = this.reviewImgDom.offsetLeft + this.changeTouchX + 'px'
                    this.reviewImgDom.style.top = this.reviewImgDom.offsetTop + this.changeTouchY + 'px'
                } 
            },
            getLeavePosition (e) {
                this.initTouchX += this.changeTouchX
                this.initTouchY += this.changeTouchY
            }
        }
    }
</script>
<style lang="less">
    @import '../assets/css/reset.css';
    body {
        width: 100vw;
        min-height: 100vh;
        background: url(../assets/imgs/bg.png) no-repeat;
        .index-container {
            margin-top: 1rem;
            .upload-btn {
                display: block;
                font-size: 0.36rem;
                width: 5.26rem;
                height: 0.92rem;
                background: #2f96ff;
                line-height: 0.92rem;
                color: #fff;
                margin: 0 auto;
                text-align: center;
                border-radius: 10px;
                font-weight: normal;
                box-shadow: 0rem 0.1rem 0 0.001rem #448adf;
                position: relative;
                &::before {
                    display: inline-block;
                    content: '';
                    width: 0.44rem;
                    height: 0.36rem;
                    background: url(../assets/imgs/camera.png) no-repeat;
                    background-size: 100%;
                    margin-right: 0.1rem;
                    vertical-align: middle;
                }
                #image-input {
                    position: absolute;
                    z-index: -1;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    outline: none;
                    border-radius: 10px;
                }
            }
            .photo-box {
                margin: 0.5rem auto;
                width: 6.4rem;
                height: 6rem;
                background: #fff;
                position: relative;
                overflow: hidden;
                img {
                    width: 6.4rem;
                    height: 6rem;
                    position: absolute;
                    z-index: 99;
                }
                .preview-box {
                    position: absolute;
                    z-index: 9;
                }
            }
            .photo-ul {
                width: 100%;
                height: 2.1rem;
                padding: 0.14rem 0;
                box-sizing: border-box;
                background: #fff;
                text-align: center;
                img {
                    width: 1.6rem;
                    height: 1.72rem;
                    border-radius: 5px;
                }
                .select-img {
                    border: 2px solid #ff5b2f;
                    box-shadow: 0px 4px 10px 0 rgba(250, 82, 82, 0.7);
                }
            }
        }
        
    }
</style>