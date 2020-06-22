import React from 'react';
import { Typography } from '@material-ui/core';
import { formatDistanceToNow } from 'date-fns';
import br from 'date-fns/locale/pt-BR';

function Message({ message }) {
	const { message: content, timestamp } = message;
	return (
		<div
			style={{
				background: '#fff',
				margin: 10,
				padding: 10,
				borderRadius: 5,
			}}
		>
			<Typography>{content}</Typography>
			<Typography variant="caption" align="right">
				{formatDistanceToNow(new Date(timestamp), {
					addSuffix: true,
					locale: br,
				})}
			</Typography>
		</div>
	);
}

export default Message;
