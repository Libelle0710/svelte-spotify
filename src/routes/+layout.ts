import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ data, url }) => {
	const { user } = data || {};
	if (user && url.pathname == '/login') {
		throw redirect(307, '/');
        //authenticated user try to login will be redirected back to homepage
	}
	if (!user && url.pathname != '/login') {
		throw redirect(307, '/login'); 
        //unauthenticated user is trying to access a page that requires 
        //authentication will be redirected to login page
	}

	return {
		user
	};
};