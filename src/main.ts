import { createApp } from 'vue';
import { createOnyx } from 'sit-onyx';
import App from './app.vue';

import 'sit-onyx/style.css'; // Include the styles required by onyx
import 'sit-onyx/global.css'; // Reset global styles e.g. default margins

// Include fonts used by onyx
import '@fontsource-variable/source-code-pro';
import '@fontsource-variable/source-sans-3';

// Create a new instance of vue
const app = createApp(App);

// Add the onyx plugin to it
app.use(createOnyx());

// Mount the vue app on the root element with the id "app"
app.mount('#app');
