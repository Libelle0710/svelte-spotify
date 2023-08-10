<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
    import '../styles/main.scss';
    import type { LayoutData } from './$types';
	export let data: LayoutData;
    import { LogoutButton } from '$components';
    $: user = data.user;
</script>

{#if user}
	<p>Hello {user.display_name}</p>
	<LogoutButton />
{/if}
<slot />