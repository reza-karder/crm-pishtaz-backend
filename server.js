import createApp from "./src/app.js";
import connectDB from "./src/config/db.js";
import env from "./src/config/env.js";

async function runServer() {
	await connectDB();

	const app = createApp();

	const server = app.listen(env.port, () => {
		console.log(`Started Server on port ${env.port}`);
	});

	process.on("unhandledRejection", (err) => {
		console.error("Unhandled Error", err);
		server.close(() => process.exit(1));
	});
}

runServer();
