<template>
        <div class="index-container">
            <label class="upload-btn">开始上传或拍照
                <input type="file" value="" accept="image/*" @click="getPhoto" id="image-input">
            </label>
            <div class="photo-box">
                <div class="preview-box">
                    <img :src="imgUrl" id="preview-img" :style="{transform:'scale('+ myImg.scale+ ') translate('+myImg.position.x+'px,'+myImg.position.y+'px)'}" @touchstart="getPosition($event)" @touchmove="getMovePosition($event)" @touchend="getLeavePosition($event)">
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
        import Exif from 'exif-js'
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
                    lastTouchY: 0,
                    previewImg: '',
                    myImg: {
                        position: {
                            x: 0,
                            y: 0
                        },
                        scale: 1,
                        lastScale: 1
                    }
                }
            },
            mounted () {
                this.previewImg = document.querySelector('#preview-img')
                document.addEventListener('touchstart',function (event) { 
                    if(event.touches.length>1){ 
                        event.preventDefault(); 
                    } 
                }) 
                var lastTouchEnd=0; 
                document.addEventListener('touchend',function (event) { 
                    var now=(new Date()).getTime(); 
                    if(now-lastTouchEnd<=300){ 
                        event.preventDefault(); 
                    } 
                    lastTouchEnd=now; 
                },false) 
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
                            that.myImg.position.x = 0
                            that.myImg.position.y = 0
                            that.myImg.scale = 1
                            var orientation
                            that.previewImg.addEventListener('load', function () {
                                Exif.getData(that.previewImg, function() { // 获取图像的数据
                                    Exif.getAllTags(this); // 获取图像的全部数据，值以对象的方式返回
                                    orientation = Exif.getTag(this, "Orientation"); // 获取图像的拍摄方向
                                    var rotateCanvas = document.createElement("canvas"),
                                        rotateCtx = rotateCanvas.getContext("2d");
                                    // 针对图像方向进行处理
                                    switch (orientation) {
                                        case 1 :
                                            rotateCanvas.width = that.previewImg.width;
                                            rotateCanvas.height = that.previewImg.height;
                                            rotateCtx.drawImage(that.previewImg, 0, 0, that.previewImg.width, that.previewImg.height);
                                            break;
                                        case 6 : // 顺时针 90 度
                                            rotateCanvas.width = that.previewImg.height;
                                            rotateCanvas.height = that.previewImg.width;
                                            rotateCtx.translate(0, 0);
                                            rotateCtx.rotate(90 * Math.PI / 180);
                                            rotateCtx.drawImage(that.previewImg, 0, -that.previewImg.height, that.previewImg.width, that.previewImg.height);
                                            break;
                                        case 8 :
                                            rotateCanvas.width = that.previewImg.height;
                                            rotateCanvas.height = that.previewImg.width;
                                            rotateCtx.translate(0, 0);
                                            rotateCtx.rotate(-90 * Math.PI / 180);
                                            rotateCtx.drawImage(that.previewImg, -that.previewImg.width, 0, that.previewImg.width, that.previewImg.height);
                                            break;
                                        case 3 : // 180 度
                                            rotateCanvas.width = that.previewImg.width;
                                            rotateCanvas.height = that.previewImg.height;
                                            rotateCtx.translate(0, 0);
                                            rotateCtx.rotate(Math.PI);
                                            rotateCtx.drawImage(that.previewImg, -that.previewImg.width, -that.previewImg.height, that.previewImg.width, that.previewImg.height);
                                            break;
                                        default :
                                            rotateCanvas.width = that.previewImg.width;
                                            rotateCanvas.height = that.previewImg.height;
                                            rotateCtx.drawImage(that.previewImg, 0, 0, that.previewImg.width, that.previewImg.height);
                                    }
                                    var rotateBase64 = rotateCanvas.toDataURL("image/jpeg", 0.5);

                                });
                            })
                        }) 
                    })
                },
                changeIndex (index) {
                    this.curIndex = index
                },
                getInitPosition (e) {
                    event.preventDefault()
                    if (this.imgUrl) {
                        var length = e.touches.length
                        if (length > 1) {
                            let pointOne = e.touches[0]
                            let pointTwo = e.touches[1]
                            this.initTouchX = pointOne.clientX - pointTwo.clientX
                            this.initTouchY = pointOne.clientY - pointTwo.clientY
                        } else {
                            var touches = e.touches[0]
                            this.initTouchX = touches.clientX
                            this.initTouchY = touches.clientY
                        }   
                    }
                },
                getMovePosition (e) {
                    event.preventDefault()
                    if (this.imgUrl) {
                        var length = e.touches.length
                        if (length > 1) {
                            let pointOne = e.touches[0]
                            let pointTwo = e.touches[1]
                            this.changeTouchX = pointOne.clientX - pointTwo.clientX
                            this.changeTouchY = pointOne.clientY - pointTwo.clientY
                            var scale = (this.changeTouchX - this.initTouchX) > (this.changeTouchY - this.initTouchY) ? (this.changeTouchX / this.initTouchX) : (this.changeTouchY / this.initTouchY) 
                            scale *= this.myImg.lastScale
                            this.myImg.scale = scale > 3 ? 3 : scale < 0.2 ? 0.2 : scale
                        } else {
                            var touches = e.touches[0]
                            this.changeTouchX = touches.clientX - this.initTouchX
                            this.changeTouchY = touches.clientY - this.initTouchY
                            this.myImg.position.x = (this.lastTouchX + this.changeTouchX) / this.myImg.scale
                            this.myImg.position.y = (this.lastTouchY + this.changeTouchY) / this.myImg.scale
                        }   
                    }
                },
                getLeavePosition (e) {
                    this.myImg.lastScale = this.myImg.scale
                    if (e.touches.length > 0) {
                        var touches = e.touches[0]
                        this.initTouchX = touches.clientX
                        this.initTouchY = touches.clientY
                    } else {
                        this.lastTouchX = this.lastTouchX + this.changeTouchX
                        this.lastTouchY = this.lastTouchY + this.changeTouchY
                    }
                },
                createPhoto () {
                    if (this.imgUrl) {
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
                    } else {
                        alert('请上传图片')
                    }
                    
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