import React from 'react';
import { useState } from 'react';
import Layout from '../components/Layout';
import Form from '../components/Form';
import useUser from '../lib/useUser';
import fetchJson from '../lib/fetchJson';
import Router from "next/router";

const SignUp = () => {
	const { mutateUser } = useUser({
		redirectTo: '/dashboard/home',
		redirectIfFound: true,
	});

	const [errorMsg, setErrorMsg] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		// Get form data
		const name = e.currentTarget.name.value;
		const photo = e.currentTarget.photo.value;
		const email = e.currentTarget.email.value;
		const password = e.currentTarget.password.value;
		const company = e.currentTarget.company.value;

		const body = {
			name,
			photo,
			email,
			password,
			company
		};

		try {
			await mutateUser(
				fetchJson('/api/signup', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
				})
				.then(res=>{
					if (res.isSignUp) Router.push("/login");
				})
			);
		} catch (error) {
			console.error('An unexpected error happened:', error);
			setErrorMsg(error.data.message);
		}
	}

	return (
		<Layout>
			<div className="form_container">
				<Form errorMessage={errorMsg} onSubmit={handleSubmit} />
			</div>
		</Layout>
	);
};

export default SignUp;
