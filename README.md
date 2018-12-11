# Creación de plugin paso a paso

Joaquín Bernal @jobedom

> https://www.youtube.com/watch?v=FjkKdDvMpMo&t=2117s

Si utilizamos `Vue.use(myPlugin)` nos aseguramos que vamos a realizar una insralación única.
El sistema de instalación de plugins de Vue, mantiene una lista interna de los plugins que hemos instalado.

[Código instalador plugins de Vue](https://github.com/vuejs/vue/blob/dev/src/core/global-api/use.js)

Un plugin es un módulo que exporta un objeto con un método _install_, que recibe la instancia de _Vue_ y unos parámetros opcionales.

```js
export default {
  install(Vue, options) {

  }
}
```

1. Creamos un fichero vue-timers.js el cual sólo tendrá exportada una función _install_ que recibirá como parámetro la instancia de Vue.
2. Vamos al _main.js_ y cargamos nuestro módulo que contendrá el plugin y hacemos uso de él mediante `Vue.use(VueTimers)`.
3. Empezamos a rellenar nuestro plugin.

_src/App._Vue_

```vue
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

<script>
export default {
  data() {
    return {
      timer: null, // handler del setInterval
      count: 0,
      interval: 1000 // tiempo entre disparos del setInterval
    };
  },
  watch: {
    interval() {
      if (this.timer) {
        this.restartTimer();
      }
    },
  },
  created() {
    this.startTimer();
  },
  destroyed() {
    this.stopTimer();
  },
  methods: {
    timerTick() {
      ++this.count;
    },
    startTimer() {
      this.timer = window.setInterval(this.timerTick, this.interval);
    },
    stopTimer() {
      if (this.timer) {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    },
    restartTimer() {
      this.stopTimer();
      this.startTimer();
    },
    toggleInterval() {
      this.interval = this.interval === 1000 ? 100 : 1000;
    },
  }
};
</script>
```
