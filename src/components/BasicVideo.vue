<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import videoApi from "@/api/video.api";

export default {
    name: "VideoList",
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            page: 1,
            dataList: [
                {
                    // id待处理-2024-06-02
                    // id: "19",
                    url: "http://110.41.17.28:3000/uploads/videos/951bdd0332ddd6876cf724b0d9b7ae63",
                    video_id: 1,
                    followStatus: 0,
                    like_count: 0,
                    likeStatus: 0,
                    comment_count: 0,
                    collection_count: 0,
                    collectionStatus: 0,
                    share_count: "",
                    suggest_words: "相关搜索内容",
                    nickname: "seo",
                    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwCrfqaZ2H95Cs7Cu9S81mqKV_feGdQfMf1A&s",
                    description: "今天也好香泥！#甜妹 #圆脸 #今天也长这样",
                    videoAuthId: 1,
                },
            ],

            isPaused: false, // 控制暂停图标的显示
            swiperOption: {
                on: {
                    // 获取视频
                    reachEnd: () => {
                        this.handleReachEnd();
                    },
                    // 自动播放
                    slideChange: swiper => {
                        this.handleSlideChange(swiper);
                    },
                    // tap方法 是swiper组件提供的点击方法
                    tap: () => {
                        this.playAction(this.page - 1);
                    },
                    // 上滑（屏幕向上滑时，跳到下一个视频）
                    slideNextTransitionStart: () => {
                        this.page += 1;
                        this.nextVideo(this.page - 1);
                        console.log(this.page);
                    },
                    // 下滑（屏幕向下滑时）
                    slidePrevTransitionEnd: () => {
                        if (this.page > 1) {
                            this.page -= 1;
                            this.prevVideo(this.page - 1);
                            console.log(this.page);
                        }
                    },
                },
            },
        };
    },

    watch: {
        // Watch for changes in the dataList array length
        dataList: {
            handler: function (newVal) {
                // console.log("DataList length:", newVal);
                if (newVal.length < 2) {
                    // Fetch new data
                    // this.fetchNewData().then(newData => {
                    //     // Push the new data into the dataList array
                    //     this.dataList.push(newData);
                    // });
                    // console.log("this.dataList", this.dataList);

                    this.fetchNewData();
                }
            },
            immediate: true,
            deep: true, // Deep watch for changes within dataList array
        },
    },
    mounted() {
        // this.fetchNewData();
    },
    created() {
        // this.$emit("update-video-info", this.dataList);
    },
    methods: {
        // 请求数据
        async fetchNewData() {
            // Simulated fetch request, replace with your actual fetch logic
            // return new Promise(resolve => {
            //     // Simulating delay for fetching data
            //     setTimeout(() => {
            //         // Simulated new data
            //         const newData = {
            //             id: (this.dataList.length + 1).toString(),
            //             url: this.newUrl,
            //         };
            //         resolve(newData);
            //     }, 100); // Adjust delay as needed
            // })

            // 获取服务器视频
            const response = await videoApi.getVideoApi();
            // console.log("video-response", response);
            // this.dataList.push(newData);
            if (response.code === 200) {
                // console.log("response.data", response.data);

                let newVideo = {
                    id: response.data.id,
                    url: response.data.video_url,
                    video_id: response.data.video_id,
                    followStatus: response.data.followStatus,
                    like_count: response.data.like_count,
                    likeStatus: response.data.likeStatus,
                    comment_count: response.data.comment_count,
                    collection_count: response.data.collection_count,
                    collectionStatus: response.data.collectionStatus,
                    description: response.data.description,
                    share_count: response.data.share_count,
                    suggest_words: response.data.suggest_words,
                    nickname: response.data.nickname,
                    avatar: response.data.avatar,
                    videoAuthId: response.data.videoAuthId,
                };
                // console.log("newVideo", newVideo);
                this.dataList.push(newVideo);
                // console.log("this.dataList", this.dataList);
            }
        },

        playAction(index) {
            // 入参 是 当前屏幕显示的是第几个视频
            // this.$refs.videos[index].playOrStop();
            // Stop all videos
            this.$refs.videos.forEach((video, idx) => {
                if (idx !== index) {
                    video.pause();
                    video.currentTime = 0;
                }
            });

            // Play the selected video
            this.$refs.videos[index].play();
            // 将视频传递
            // this.$emit("update-video-info", this.dataList[index]);
        },
        // 向下
        nextVideo(index) {
            // this.$refs.videos[index - 1].stop();
            // this.$refs.videos[index].play();
            if (index > 0) {
                this.$refs.videos[index - 1].pause(); // Pause the previous video
                this.$refs.videos[index - 1].currentTime = 0; // Rewind the previous video
            }
            this.$refs.videos[index].play(); // Play the current video
            // 将视频传递
            // this.$emit("update-video-info", this.dataList[index]);
        },
        // 向上
        prevVideo(index) {
            // this.$refs.videos[index + 1].stop();
            // this.$refs.videos[index].play();
            if (index < this.dataList.length - 1) {
                this.$refs.videos[index + 1].pause(); // Pause the next video
                this.$refs.videos[index + 1].currentTime = 0; // Rewind the next video
            }
            this.$refs.videos[index].play(); // Play the current video
            // 将视频传递
            // this.$emit("update-video-info", this.dataList[index]);
        },
        // 视频切换
        toggleVideo(index, dataList) {
            // // 上个视频停止
            // if (index > 0) {
            //     const prev = this.$refs.videos[index - 1];
            //     if (!prev.paused) {
            //         prev.pause();
            //     }
            // }
            // // 回到上个视频
            // // Stop the next video if it exists and is not the last video
            // // Stop the next video if it exists and is not the last video
            // if (index < dataList.length - 1) {
            //     const next = this.$refs.videos[index + 1];
            //     if (!next.paused) {
            //         next.pause();
            //     }
            // }
            // // 当前视频
            // const video = this.$refs.videos[index];
            // if (video.paused) {
            //     video.play();
            // } else {
            //     video.pause();
            // }

            // // 根据当前视频的播放状态更新 isPaused
            // this.isPaused = video.paused;

            // 手机端视频未暂停
            const video = this.$refs.videos[index];

            // Toggle video playback on click or touchstart
            const togglePlayback = () => {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            };

            // Execute togglePlayback function on click event
            const clickHandler = () => {
                togglePlayback();
            };

            // Execute togglePlayback function on touchstart event
            const touchStartHandler = () => {
                togglePlayback();
            };

            // Add event listeners for both click and touchstart events
            const addEventListeners = () => {
                video.addEventListener("click", clickHandler);
                video.addEventListener("touchstart", touchStartHandler);
            };

            // Remove event listeners after executing togglePlayback function
            const removeEventListeners = () => {
                video.removeEventListener("click", clickHandler);
                video.removeEventListener("touchstart", touchStartHandler);
            };

            // Execute togglePlayback function and add/remove event listeners
            // when clicking or tapping on the video element
            if ("ontouchstart" in window) {
                // For touch-enabled devices, use touchstart event
                togglePlayback();
            } else {
                // For other devices, use click event
                addEventListeners();
                togglePlayback();
                removeEventListeners();
            }

            // Ensure previous and next videos are paused if not the last or first video
            if (index > 0) {
                const prev = this.$refs.videos[index - 1];
                if (!prev.paused) {
                    prev.pause();
                }
            }
            if (index < dataList.length - 1) {
                const next = this.$refs.videos[index + 1];
                if (!next.paused) {
                    next.pause();
                }
            }

            // Update isPaused state based on the current video's playback status
            this.isPaused = video.paused;
        },

        handleSlideChange(swiper) {
            const activeIndex = swiper.activeIndex;
            // console.log(`当前数组中共有${this.dataList.length + 1}个视频`);
            console.log(`当前屏幕上的视频为: ${activeIndex + 1}`);
            this.$emit("update-video-info", this.dataList[activeIndex]);

            const videos = this.$refs.videos;
            for (let i = 0; i < videos.length; i++) {
                if (i === activeIndex) {
                    // 当前屏幕上的视频，重头开始播放
                    videos[i].currentTime = 0;
                    videos[i].play();
                    // 将视频传递
                } else {
                    // 不在当前屏幕上的视频，暂停并重置时间
                    videos[i].pause();
                    videos[i].currentTime = 0;
                }
            }

            // 在处理视频播放状态时，传递活动索引
            this.handleVideoPause(activeIndex);

            // 当视频时倒数第二个的时候，请求数据
            // Check if the active index is the second last position of dataList
            if (activeIndex === this.dataList.length - 1) {
                // Fetch new data
                // this.fetchNewData().then(newData => {
                //     // Push the new data into dataList array
                //     this.dataList.push(newData);
                // });
                this.fetchNewData();
            }
        },

        handleVideoPlay(index) {
            // console.log(`视频 ${index + 1} 正在播放`);
            // 可以在这里执行其他操作
            this.isPaused = false; // 视频播放时隐藏暂停图标
        },
        handleVideoPause(index) {
            // console.log(`视频 ${index + 1} 已暂停`);
            // 可以在这里执行其他操作
            // 只有当当前视频是活动视频（即当前页面显示的视频）时，才显示暂停图标
            // 上划会出现暂停键
            if (index == -1) {
                this.isPaused = true; // 视频暂停时显示暂停图标
            }
            // this.isPaused = true; // 视频暂停时显示暂停图标
        },
    },
    setup() {},
};
</script>

<script setup>
import { ref } from "vue";
</script>
<template>
    <div class="swiper-wrapper">
        <swiper
            class="swiper-box"
            :direction="'vertical'"
            :grabCursor="true"
            :mousewheel="true"
            :mousewheelControl="true"
            :resistanceRatio="0"
            :observeParents="true"
            :options="swiperOption"
            @slideChange="handleSlideChange"
        >
            <!-- 幻灯片内容 -->
            <swiper-slide
                class="slide-box"
                v-for="(item, index) in dataList"
                :key="index"
            >
                <div>
                    <div class="overlay" @click="toggleVideo(index, dataList)">
                        <ion-icon
                            name="caret-forward-outline"
                            class="icon"
                            v-show="isPaused"
                        ></ion-icon>
                    </div>
                    <video
                        class="video-box"
                        ref="videos"
                        :videoList="item"
                        :src="item.url"
                        :index="index"
                        @play="handleVideoPlay(index)"
                        @pause="handleVideoPause(index)"
                        loop
                    ></video>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<style scoped lang="scss">
.swiper-wrapper {
    /* width: 100vw ;  */
    height: calc(100vh - 100px);
    .swiper-box {
        width: 100%;
        .slide-box {
            position: relative;
            .overlay {
                z-index: 15;
                position: absolute;
                width: 100%;
                top: 0;
                bottom: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                // opacity: 0.5;

                .icon {
                    font-size: 76px;
                    opacity: 0.5;
                }
            }
            .video-box {
                z-index: -1;
                width: 100%;
                height: calc(100vh - 100px);
            }
            .video-box-right {
                position: absolute;
                right: 0;
                bottom: 30vh;
                top: 30vh;
                /* z-index: 80; */
            }
            .infobar_warp {
                position: absolute;
                bottom: 55px;
                left: 0;
            }
        }
    }
}
</style>
