<template>
  <div class="navbar">
    <i @click="$router.go(-1)" v-show="$store.getters.getIsShowBack" class="iconfont icon-back"></i>
    {{title}}
  </div>
</template>
<script>
import { reactive, inject ,toRefs} from "vue";
export default {
  setup() {
    const state = reactive({
      title: inject("title"),
    });
    return {
        ...toRefs(state)
    }
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  height: 44px;
  line-height: 44px;
  width: 100%;
  background-color: #42bd56;
  text-align: center;
  color: white;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
}
.icon-back {
  position: absolute;
  left: 10px;
  font-size: 20px;
}
</style>