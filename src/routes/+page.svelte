<h1>Welcome to SvelteKit </h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<input />
<select>
	<option>Option</option>
</select>
<button>Button</button>
<style lang="scss">
	h1 {
		color: red;
        font-size: functions.toRem(36);
        @include breakpoint.up('md') { //targeting a breakpoint labeled as 'md', corresponds to a medium-sized screen
			color: green;
		}
		@include breakpoint.up('lg') { //targeting a breakpoint labeled as 'lg', corresponds to a large-sized screen
			color: blue;
		}
	}
</style>
