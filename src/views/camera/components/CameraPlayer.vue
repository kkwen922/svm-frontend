<template>
  <div>
    <video ref="videoPlayer" class="video-js vjs-default-skin vjs-big-play-centered"></video>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
  mounted() {
    const options = {
      autoplay: true,
      controls: true,
      sources: [{
        src: 'rtsp://192.168.0.12:8554/CH001.sdp', // 替换为您的摄像机RTSP URL
        type: 'rtsp/mp4'
      }]
    };

    this.player = videojs(this.$refs.videoPlayer, options);
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>

<style scoped>
.video-js {
  width: 640px;
  height: 480px;
}
</style>
