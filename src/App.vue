<template>
  <div>
    <div class="card" style="width: 18rem; margin-bottom: 2rem">
      <div class="card-body">
        <h5 class="card-title">
          <h1>{{ count }}</h1>
        </h5>
        <p class="card-text">
          <span v-if="timer">Running</span>
          <span v-else>Stopped</span>
        </p>
        <button
          type="button"
          class="btn btn-success"
          @click="startTimer"
        >
          Start
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="stopTimer"
        >
          Stop
        </button>
      </div>
    </div>
    <hr />
    <p>
      <button
        type="button"
        style="margin-right: 2rem"
        class="btn btn-primary"
        @click="toggleInterval"
      >
        Toggle interval
      </button>
      <strong>Interval:</strong> {{ interval }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';

export default Vue.extend({
  data() {
    return {
      // timer: null as number | null, // handler del setInterval
      count: 0,
      // interval: 1000, // tiempo entre disparos del setInterval
    };
  },
  // methods: {
  //   toggleInterval() {
  //     this.interval = this.interval === 1000 ? 100 : 1000;
  //   },
  // },
  timers: {
    clock: { // opciones de mi temporizador
    interval: 1000,
      onTick() {
        ++(this as any).count;
      },
    },
  },
});
</script>
