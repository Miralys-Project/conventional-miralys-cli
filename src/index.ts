import chalk from 'chalk';
import { run } from './cli/package.json.js';

console.log(chalk.blue('Welcome to Conventional Miralys CLI'));

run().catch((err) => {
	console.error('❌ Une erreur est survenue :', err);
	process.exit(1);
});
