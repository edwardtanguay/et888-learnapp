import { Router } from 'express';
import { getArrayOfLogObjects, getLogBackgroundColorByLevel, getLogTextColorByLevel } from '../handlers/dbtools';

export const flashcardInfoRouter = Router();

flashcardInfoRouter.get('/logs', async (req, res) => {
	const logs = await getArrayOfLogObjects();
	res.send(`
<html>
    <head>
        <style>
            body {
                font-family: monospace;
            }
            table {
                border-spacing: 5px;
            }
            th {
                text-align: left;
            }
            td {
                margin: 10px;
                padding: 3px;
                vertical-align: top;
            }
        </style>
    </head>
    <body>
        <h1>API Logs</h1>
        <table>
            <thead>
                <tr>
                <th>Level</th>
                <th>Timestamp</th>
                <th>Message</th>
                <th>Method</th>
                <th>URL</th>
                <th>Status</th>
                <th>Remote Address</th>
                <th>Response Time</th>
                </tr>
            </thead>
            <tbody>
            ${logs.map(log => {
		return `
                <tr style="background-color: ${getLogBackgroundColorByLevel(log.level)}; color: ${getLogTextColorByLevel(log.level)}">
                    <td>${log.level}</td>
                    <td>${log.timestamp}</td>
                    <td>${log.message}</td>
                    <td>${log.method}</td>
                    <td>${log.url}</td>
                    <td>${log.status}</td>
                    <td>${log.remoteAddr}</td>
                    <td>${log.responseTime}</td>
                </tr>
                `
	}).join('')}
            </body>
        </table>
    </body>
</html>
    `)
})