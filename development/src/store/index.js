import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		navLinks: [
			{text: "Home", href: "/", icon: "mdi-home"},
			{text: "Galleries", href: "/#galleries-section", icon: "mdi-image-frame"},
			{text: "Recent Projects", href: "/#recent-projects-section", icon: "mdi-clock-outline"},
			{text: "About Me", href: "/about", icon: "mdi-information-outline"},
			{text: "Pricing", href: "/pricing", icon: "mdi-basket-outline"}
		],
		stripe: {
			publicKey: 'pk_test_4p8oeYTxHCP4BoDvFYoCGxQX00kgDFVn6t'
		},
		accessToken: "",
		userData: {},
		initialising: false,
		colours: {
			1: "#91B3BC",
			2: "#5B7D87",
			3: "#45415E",
			4: "#2B4251",
		}
	},
	mutations: {
		setJWT( state, payload ) {
			state.accessToken = payload;
		},
		setUserData( state, payload ) {
			state.userData = payload;
		},
		initialising( state, payload ) {
			state.initialising = payload;
		}
	},
	actions: {
	},
	modules: {
	},
	getters: {
		loggedIn: state => {
			if (state.userData && state.userData.email) return true;
			else return false;
		}
	}
})
