/**
事件触发过程：
1. 在input-component实例中，松开Enter键触发keyup.enter事件监听器并调用 monitorEnterKey()
2. monitorEnterKey() 方法发出 add-note 事件，并清除用户输入框
3. <input-component></input-component> 元素上绑定的 add-note 事件监听器监听事件触发，并调用 root instance 的 addNote() 方法。
4. addNote() 方法随即更新 root instance 的 data 属性，此属性会响应式渲染视图。
*/

const state = {
  notes: [],
  timestamps: []
};

const actions = {
  addNote(context, payload) {
    context.commit('ADD_NOTE', payload);
  },
  addTimestamp(context, payload) {
    context.commit('ADD_TIMESTAMP', payload);
  }
};

const getters = {
  getNotes(state) {
    return state.notes;
  },
  getTimestamps(state) {
    return state.timestamps;
  },
  getNoteCount(state) {
    return state.notes.length;
  }
};

const mutations = {
  ADD_NOTE(state, payload) {
    let newNote = payload;
    state.notes.push(newNote);
  },
  ADD_TIMESTAMP(state, payload) {
    let newTimeStamp = payload;
    state.timestamps.push(newTimeStamp);
  },
};

const store = Vuex.createStore({
  state, mutations, actions, getters
});

const emitter = mitt();

const inputComponent = {
  template: `<input 
      placeholder='Enter a note'
              class="input is-small" 
              type="text" 
              @keyup.enter="monitorEnterKey"
              v-model="input"  />`,
  data() {
    return {
      input: "",
    };
  },
  methods: {
    monitorEnterKey () {
      this.$store.dispatch('addNote', this.input);
      this.$store.dispatch('addTimestamp', new Date().toLocaleString());
      this.input = '';
    },
  },
};

const noteCountComponent = {
  template: `<div class="note-count">Note count: <strong>{{ noteCount }}</strong></div>`,
  computed: {
    noteCount() {
      return this.$store.getters.getNoteCount;
    }
  },
}


const app = Vue.createApp({
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
    timestamps() {
      return this.$store.getters.getTimestamps;
    }
  },
  components: {
    "input-component": inputComponent,
    "note-count-component": noteCountComponent
  },
});
app.use(store);
app.mount('#app');
