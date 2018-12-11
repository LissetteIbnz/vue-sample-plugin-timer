import _Vue from 'vue';

export default {
  install(Vue: typeof _Vue, options?: any) {
    Vue.mixin({
      data() {
        return {
          timers: {},
        };
      },
      created() {
        const timerDefinitions = (this as _Vue).$options.timers;
      },
    });
  },
};
