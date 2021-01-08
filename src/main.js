import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		size: 40, 
		backgroundColor: "#333"
	}
});

export default app;