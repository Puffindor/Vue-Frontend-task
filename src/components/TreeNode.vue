<template>
  <div class="container">
    <div class="con">
      <div v-if="!isEditing" class="title">
        <img v-if="node.type === 'file'" src="../assets/file.svg" />
        <img v-else src="../assets/folder.svg" />
        <p>{{ nameTruncate }}</p>
      </div>
      <div v-if="!isEditing" class="buttons">
        <button @click="editTitile"><img src="../assets/edit.svg" /></button>
        <button @click="del"><img src="../assets/delete.svg" /></button>
      </div>
      <div class="edit" v-if="isEditing">
        <input v-model="newTitle" />
        <button @click="setTitle" self>Save</button>
      </div>
    </div>

    <ul v-if="node.type === 'directory'">
      <li v-for="subNode in node.content" :key="subNode.id">
        <tree-node :node="subNode" :dirId="node.id" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["node", "dirId"],
  data() {
    return {
      newTitle: this.node.name,
      isEditing: false,
    };
  },
  computed: {
    nameTruncate() {
      if (this.node.name.length > 20) {
        return this.node.name.substring(0, 20) + "...";
      } else {
        return this.node.name;
      }
    },
  },
  methods: {
    setTitle() {
      this.isEditing = false;
      this.$store.dispatch("edit", {
        nodeId: this.node.id,
        dirId: this.dirId,
        title: this.newTitle,
      });
    },
    editTitile() {
      this.isEditing = !this.isEditing;
    },
    del() {
      this.$store.dispatch("deleteFile", { nodeId: this.node.id, dirId: this.dirId });
    },
  },
};
</script>
<style lang="scss">
.edit {
  input {
    background-color: #bbbbbb;
    outline: none;
    border-style: hidden;
    border-radius: 5px;
    padding: 6px;
    width: 70%;
  }
  button {
    cursor: pointer;
    margin-left: 5px;
    height: 100%;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    border-style: hidden;
    background-color: #bbbbbb;
  }
}
.con {
  background-color: #d4d4d4;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-radius: 10px;
  .buttons {
    button {
      border-style: hidden;
      background-color: transparent;
      cursor: pointer;
    }
  }
}
.con:hover {
  transition: 200ms;
  background-color: #c9c9c9;
}
.container {
  width: calc(100% - 15px);
  margin-left: 15px;
  margin-top: 5px;
  align-items: center;
  .title {
    align-items: center;
    display: flex;
  }

  ul {
    list-style: none;
  }
}
p {
  margin-left: 5px;
}
</style>
