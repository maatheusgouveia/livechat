import React, { useState, useEffect } from 'react';
import socket from 'socket.io-client';
import { Grid, TextareaAutosize, IconButton } from '@material-ui/core';
import { MdSend } from 'react-icons/md';

import Message from './components/Message';
import api from './services/api';

const io = socket('http://192.168.0.112:3333');

function App() {
	const [messages, setMessages] = useState([]);
	const [content, setContent] = useState('');

	io.emit('connectRoom', 'livechat');

	io.on('received-message', data => {
		setMessages([...messages, data]);

		if (Notification.permission === 'granted') {
			new Notification(data.message);
		}
	});

	useEffect(() => {
		async function loadMessages() {
			const response = await api.get('messages');

			setMessages(response.data);
		}

		loadMessages();
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();

		const newMessage = {
			message: content,
			author: 'matheusgouveia',
		};

		const response = await api.post('messages', newMessage);

		setMessages([...messages, response.data]);

		setContent('');
	}

	return (
		<Grid
			id="app"
			container
			direction="column"
			justify="space-between"
			alignItems="center"
		>
			<Grid item style={{ width: '100%' }}>
				{messages.map(message => (
					<Message
						key={message.key}
						message={message}
						sent={message.author === 'matheusgouveia'}
						received={message.author !== 'matheusgouveia'}
					/>
				))}
			</Grid>

			<form onSubmit={handleSubmit}>
				<Grid
					id="footer"
					container
					justify="flex-end"
					alignItems="center"
				>
					<TextareaAutosize
						required
						onChange={e => setContent(e.target.value)}
						value={content}
					/>

					<IconButton type="submit">
						<MdSend />
					</IconButton>
				</Grid>
			</form>
		</Grid>
	);
}

export default App;
