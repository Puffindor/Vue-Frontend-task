<template>
  <section>
    <ul>
      <li v-for="node in this.$store.getters.getTree" :key="node.id">
        <tree-node :node="node" />
      </li>
    </ul>
  </section>
</template>

<script>
import TreeNode from "./TreeNode.vue";
export default {
  components: { TreeNode },
};
</script>

<style lang="scss" scoped>
ul {
  width: 20vw;
  padding: 10px 15px 15px 0px;
  height: fit-content;
  list-style: none;
  border-radius: 15px;
  background-color: rgba(233, 233, 237, 0.509);
  li {
    width: 100%;
    display: flex;
    align-items: center;
  }
}
section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(221, 216, 216);
}
</style>
