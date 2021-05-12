<template>
  <a-empty :image="emptyImage" class="empty" />
</template>

<script>
import { Empty } from "ant-design-vue";
export default {
  name: "index",
  beforeCreate() {
    this.emptyImage = Empty.PRESENTED_IMAGE_SIMPLE;
  },
};
</script>

<style scoped>
.empty {
  margin-top: 120px;
}
</style>
