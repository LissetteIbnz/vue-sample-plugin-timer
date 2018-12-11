import Vue, { VueConstructor } from 'vue';

// declare module 'vue/types/vue' {
//   // Global properties can be declared
//   // on the `VueConstructor` interface
//   interface VueConstructor {
//     $options: any
//   }
// }
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    timers?: any;
    // $options?: any;
  }
}
