import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import CompHeader from './components/Header.vue';
import SlideUpDown from 'vue-slide-up-down';
import KinesisUnderlink from './components/misc/Underlink';

Vue.config.productionTip = false
Vue.component('comp-header', CompHeader);
Vue.component('slide-up-down', SlideUpDown);
Vue.component('underlink', KinesisUnderlink)

Vue.prototype.$api = function( { method = "post", content = "json", url, body = null } ) {
	return new Promise((resolve,reject) => {

		let status, ok;
		const contentType = content === "json" ? "application/json"
						: content === "files" ? "multipart/form-data"
						: "application/x-www-form-urlencoded";
		const bodyContent = content === "json" ? JSON.stringify(body) : body;

		const token = localStorage.getItem('accessToken');

		const fetchObject = {
				method,
				headers: {
					'Content-Type': contentType,
					'Authorization': 'Bearer ' + token
				},
				body: bodyContent
			}

		if (/get/i.test(method) === true) delete fetchObject.body;

		return fetch(url, fetchObject)
			.then(response => {
				status = response.status;
				ok = response.ok;
				if (content === "json") return response.json();
				else return response.text();
			})
			.then(response => {
				response.status = status;
				response.ok = ok;
				if (response.token) this.$store.commit('setJWT', response.token);
				if (ok) resolve(response);
				else {
					this.$store.commit('setJWT', '');
					reject(response);
				}
			})
			.catch(err => {
				console.log(err);
				const response = {
					status: 500,
					ok: false,
					event: "server_error",
					message: "Could not make request. Please try again later."
				}
				reject(response);
			})
	})
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
