import { createStore } from "vuex";
import Directory from "../Classes";

// Функция для поиска вложенных элементов
function findElement(arr, payload, param = false) {
  let i = [];
  arr.forEach((el) => {
    if (el.id === payload.dirId) {
      if (param) {
        el.filterContent(payload.nodeId);
      } else {
        el.editTitle(payload.nodeId, payload.title);
      }
    } else {
      for (let dir of arr) {
        if (dir.content && !i.includes(dir.id)) {
          i.push(dir.id);
          findElement(dir.content, payload, param);
        }
      }
    }
  });
}
export default createStore({
  state: {
    nodes: [
      new Directory("dir 1", [
        new Directory("dir 1-1", [
          {
            id: Math.random(),
            name: "file 1-1-1",
            type: "file",
          },
        ]),
        {
          id: Math.random(),
          name: "file 1-2",
          type: "file",
        },
      ]),
      new Directory("dir 2", [
        new Directory("dir 2-1", [
          {
            id: Math.random(),
            name: "file 2-2",
            type: "file",
          },
        ]),
      ]),

      {
        id: Math.random(),
        name: "file 2",
        type: "file",
      },
    ],
  },

  getters: {
    getTree(state) {
      return state.nodes;
    },
  },
  actions: {
    edit(context, payload) {
      context.commit("edit", payload);
    },
    deleteFile(context, payload) {
      context.commit("delete", payload);
    },
  },
  mutations: {
    edit(state, payload) {
      if (!payload.dirId) {
        state.nodes.forEach((el) => {
          if (el.id === payload.nodeId) {
            el.name = payload.title;
          }
        });
      } else {
        findElement(state.nodes, payload);
      }
    },
    delete(state, payload) {
      if (!payload.dirId) {
        state.nodes = state.nodes.filter((el) => el.id !== payload.nodeId);
      } else {
        findElement(state.nodes, payload, true);
      }
    },
  },
});
