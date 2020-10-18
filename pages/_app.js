import { SWRConfig } from 'swr';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import fetch from '../lib/fetchJson';

Router.events.on('routeChangeStart', (_) => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
	return (
		<SWRConfig
			value={{
				fetcher: fetch,
				onError: (err) => {
					console.error(err);
				},
			}}
		>
			<Head>
				<meta charSet="utf-8" />
				<title>Nisira Portal</title>
				<link rel="icon" href="/favicon.ico" />
				<title>Nisira Portal</title>
				<link rel="stylesheet" type="text/css" href="https://unpkg.com/nprogress@0.2.0/nprogress.css" />
				<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/> 
			</Head>
			<style jsx global>{`
				html {
					background-color: #ffffff;
				}
				*,
				*::before,
				*::after {
					box-sizing: border-box;
				}

				body {
					margin: 0;
					color: #333;
					font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
						Noto Sans, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
						'Noto Color Emoji', sans-serif;
				}

				.container {
					max-width: 65rem;
					margin: 1.5rem auto;
					padding-left: 1rem;
					padding-right: 1rem;
				}

				.form_container {
					margin: 0 auto;
					border-radius: 4px;
				}
				form,
				label {
					display: flex;
					flex-flow: column;
				}
				label > span {
					font-weight: 600;
				}
				input, textarea {
					padding: 8px;
					margin: 0.3rem 0 1rem;
					border: 1px solid #ccc;
					border-radius: 4px;
				}
				.error {
					color: brown;
					margin: 1rem 0 0;
				}
				a {
					color: white;
					text-decoration-line: none;
				}
			`}</style>
			<Component {...pageProps} />
		</SWRConfig>
	);
}

export default MyApp;
