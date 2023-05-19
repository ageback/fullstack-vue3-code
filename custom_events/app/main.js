/**
事件触发过程：
1. 在input-component实例中，松开Enter键触发keyup.enter事件监听器并调用 monitorEnterKey()
2. monitorEnterKey() 方法发出 add-note 事件，并清除用户输入框
3. <input-component></input-component> 元素上绑定的 add-note 事件监听器监听事件触发，并调用 root instance 的 addNote() 方法。
4. addNote() 方法随即更新 root instance 的 data 属性，此属性会响应式渲染视图。
*/

const inputComponent = {
  template: `<input 
              :placeholder="placeholder" 
              class="input is-small" 
              type="text" 
              @keyup.enter="monitorEnterKey"
              v-model="input"  />`,
  props: ["placeholder"],
  data() {
    return {
      input: "",
    };
  },
  emits: ["add-note"],
  methods: {
    monitorEnterKey() {
      this.$emit("add-note", {
        note: this.input,
        timestamp: new Date().toLocaleString(),
      });
      this.input = "";
    },
  },
};

const app = {
  data() {
    return {
      notes: [],
      timestamps: [],
      placeholder: 'Enter a note'
    }
  },
  components: {
    'input-component': inputComponent
  },
  methods: {
    addNote(event) {
      this.notes.push(event.note);
      this.timestamps.push(event.timestamp);
    }
  }
};

Vue.createApp(app).mount('#app');
