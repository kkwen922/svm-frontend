<template>
  <div class="player">player{{ str1 }}</div>
</template>
  
<script>
export default {
  name: 'playVideo',
  props: {
    str1: {
      type: String,
      default: ''
    },
  },
  create() {
    console.log("下标", this.str1);
  }
}
</script>
  
<style scoped>
.player {
  background-color: black;
  height: 100%;
  border: 1px solid white;
  color: white;
  text-align: center;
}
</style>
  
  