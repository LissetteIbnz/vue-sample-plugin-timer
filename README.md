# Creación de plugin paso a paso (adaptado a Typescript)

Joaquín Bernal @jobedom [Vídeo explicativo de Joaquín Bernal](https://www.youtube.com/watch?v=FjkKdDvMpMo&t=2117s)

Si utilizamos `Vue.use(myPlugin)` nos aseguramos que vamos a realizar una instalación única, debido a que el sistema de instalación de plugins de Vue, mantiene una lista interna de los plugins que hemos instalado.

> [Código instalador plugins de Vue](https://github.com/vuejs/vue/blob/dev/src/core/global-api/use.js)

## Definición

Un plugin es un módulo que exporta un objeto con un método _install_, que recibe la instancia de _Vue_ y unos parámetros opcionales.

```js
export default {
  install(Vue, options) {
    // ToDo
  }
}
```

## Pasos para construirlo

Tenemos el siguiente fichero *App.vue* con un funcionamiento *timer* que queremos extraer como un plugin.

**src/App.Vue**

```html
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
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      timer: null as number | null, // handler del setInterval
      count: 0,
      interval: 1000, // tiempo entre disparos del setInterval
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
  },
});
</script>

```

1. Creamos un fichero *vue-timers.js* el cual sólo tendrá exportada una función `install` que recibirá como parámetro la instancia de `Vue`.

```ts
import _Vue from 'vue';

export default {
  install(Vue: typeof _Vue) {},
};

```

2. Vamos al _main.js_ y cargamos nuestro módulo que contendrá el plugin y hacemos uso de él mediante `Vue.use(VueTimers)`.

```diff
import Vue from 'vue';
import App from './App.vue';
+ import VueTimers from './plugins/vue-timers';

+ Vue.use(VueTimers);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

```

3. Comenzaremos a extraer las funciones que tiene nuestro componente *App* para pasarlas a nuestro plugin. Empezamos eliminando los métodos que tenemos en el componente y para sólo dejar *toggleInterval*. También eliminaremos la sección *watch* y los ciclos de vida *created* y *destroyed*.

```diff
···
- watch: {
-   interval() {
-     if (this.timer) {
-       this.restartTimer();
-     }
-   },
- },
- created() {
-   this.startTimer();
- },
- destroyed() {
-   this.stopTimer();
- },
methods: {
-   timerTick() {
-     ++this.count;
-   },
-   startTimer() {
-     this.timer = window.setInterval(this.timerTick, this.interval);
-   },
-   stopTimer() {
-     if (this.timer) {
-       window.clearInterval(this.timer);
-       this.timer = null;
-     }
-   },
-   restartTimer() {
-     this.stopTimer();
-     this.startTimer();
-   },
    toggleInterval() {
      this.interval = this.interval === 1000 ? 100 : 1000;
    },
  },
});
</script>

```

Ahora definiremos una nueva sección *timers*.

Nuestro plugin va a definir un mixins global que tendrá una definición para los ciclos de vida *created* y *destroyed*.

El *created* va a inicializar todos los *interval* mientas que el *destroyed* los limpiará.
