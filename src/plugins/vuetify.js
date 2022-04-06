import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

// https://learnui.design/tools/data-color-picker.html#palette
export const topics_palette = [
  '#003f5c', '#2f4b7c', '#665191', '#a05195',
  '#d45087', '#f95d6a', '#ff7c43', '#ffa600'
]

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    }
  },
  icons: {
    iconfont: 'faSvg'
  }
});
