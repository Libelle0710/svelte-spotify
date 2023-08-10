import type { RequestHandler } from './$types';
import {BASE_URL, SPOTIFY_APP_CLIENT_ID} from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import pkce from "pkce-gen";


const generateRandomString = (length: number) => {
	let randomString = '';
	const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
	}
	return randomString;
};
const state = generateRandomString(16);
const challenge = pkce.create();
const scope =
	'ugc-image-upload user-modify-playback-state user-read-playback-state user-read-currently-playing user-follow-modify user-follow-read user-read-recently-played user-read-playback-position user-top-read playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private app-remote-control streaming user-read-email user-read-private user-library-modify user-library-read';

export const GET: RequestHandler = ({cookies}) => {
    cookies.set('spotify_auth_state', state);
	cookies.set('spotify_auth_challenge_verifier', challenge.code_verifier);
	throw redirect( //temporary redirect, preserves the method and request body of the original request 
		307,
		`https://accounts.spotify.com/authorize?${new URLSearchParams({//construct the Spotify authorization URL
			response_type: 'code',
			client_id: SPOTIFY_APP_CLIENT_ID,
			scope,
			redirect_uri: `${BASE_URL}/api/auth/callback`,
			state,
			code_challenge_method: 'S256',
			code_challenge: challenge.code_challenge
		})}`
	);

};