<template>
  <div class="houseType">
    <house-type-manage @showCreateView="showCreateView" />

  </div>
</template>

<script>
import houseTypeManage from "@/views/houseType/houseTypeManage.vue";

export default {
  name: "houseType",
  components: {
    houseTypeManage,
  },
  data() {
    return {
      isShowCreate: false
    };
  },
  methods: {
    showCreateView() {
      this.isShowCreate = true;
    },
    showManageView(){
      this.isShowCreate = false;
    }
  },
  created() {}
};
</script>


<style scoped lang='scss'>
</style>
