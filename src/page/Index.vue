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
        <div class="composite-btn" @click="createPhoto">合成图片</div>
    </div>
</template>
<script>
    import html2canvas from 'html2canvas'
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
                reviewImgDom: '',
                lastTouchX: 0,
                lastTouchY: 0
            }
        },
        mounted () {
            this.reviewImgDom = document.querySelector('#preview-img')
        },
        methods: {
            defaultSwipe () {
                document.addEventListener('touchstart', function () {
                    let winHeight = document.innerHeight;

                })
            },
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
                    this.reviewImgDom.style.transform = 'translate3d(' + (this.lastTouchX + this.changeTouchX) + 'px, ' + (this.lastTouchY + this.changeTouchY) + 'px, 0)'
                }
            },
            getLeavePosition (e) {
                this.lastTouchX = this.lastTouchX + this.changeTouchX
                this.lastTouchY = this.lastTouchY + this.changeTouchY
            },
            createPhoto () {
                let photoBox = document.querySelector('.photo-box')
                let newImgWidth = photoBox.style.offsetWidth
                let newImgHeight = photoBox.style.offsetHeight
                let scale = window.devicePixelRatio
                let that = this
                html2canvas(photoBox, {
                    width: newImgWidth,
                    height: newImgHeight,
                    scale: scale,
                    useCORS: true
                }).then(function (canvas) { 
                    var dataUrl = canvas.toDataURL('image/jpg')
					localStorage.imgData = dataUrl
					that.$router.push({
						name: 'share',
						params: {
							storage: 'imgData'
						}
					})
                })
            }
        }
    }
</script>
<style lang="less">
    @import '../assets/css/reset.css';
    #app {
        .index-container {
            padding-top: 0.6rem;
            box-sizing: border-box;
            min-height: 100vh;
            background: url(../assets/imgs/bg.png) no-repeat;
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
                margin: 0.4rem auto 0.2rem auto;
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
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
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
            .composite-btn {
                display: block;
                font-size: 0.36rem;
                width: 5.26rem;
                height: 0.92rem;
                background:rgba(243, 111, 84, 0.881);
                line-height: 0.92rem;
                color: #fff;
                margin: 0.2rem auto;
                text-align: center;
                border-radius: 10px;
                font-weight: normal;
                box-shadow: 0rem 0.1rem 0 0.001rem #e0836a;
            }
        }
        
    }
</style>