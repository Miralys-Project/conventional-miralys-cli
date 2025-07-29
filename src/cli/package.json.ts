import inquirer from 'inquirer';
import { execa } from 'execa';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export async function run() {
	console.log('🚀 Project initializing...');

	const cwd = process.cwd();
	const defaultName = path.basename(cwd);

	const answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'Package name',
			default: defaultName
		},
		{
			type: 'input',
			name: 'version',
			message: 'Version',
			default: '1.0.0'
		},
		{ type: 'input', name: 'description', message: 'Description' },
		{ type: 'input', name: 'author', message: 'Author' },
		{
			type: 'input',
			name: 'license',
			message: 'License',
			default: 'Apache-2.0'
		},
		{
			type: 'input',
			name: 'main',
			message: 'Main File',
			default: 'dist/index.js'
		},
		{
			type: 'input',
			name: 'types',
			message: 'Types File',
			default: 'dist/index.d.ts'
		},
		{ type: 'input', name: 'repository', message: 'Git repository URL' },
		{ type: 'input', name: 'keywords', message: 'Keywords' },
		{ type: 'input', name: 'homepage', message: 'GitHub Main page' },
		{ type: 'input', name: 'bugs', message: 'Issues pages' },
		{
			type: 'confirm',
			name: 'private',
			message: 'Private package',
			default: false
		}
	]);

	// Génère le package.json basique
	await execa('npm', ['init', '-y']);

	const pkgPath = path.resolve(cwd, 'package.json');
	const raw = await readFile(pkgPath, 'utf-8');
	const pkg = JSON.parse(raw);

	// Appliquer les réponses
	Object.assign(pkg, {
		name: answers.name,
		version: answers.version,
		description: answers.description,
		author: answers.author,
		license: answers.license,
		main: answers.main,
		types: answers.types,
		repository: answers.repository
			? { type: 'git', url: answers.repository }
			: undefined,
		homepage: answers.homepage || undefined,
		bugs: answers.bugs ? { url: answers.bugs } : undefined,
		private: answers.private || undefined,
		keywords: answers.keywords
			? answers.keywords
					.split(',')
					.map((kw: string) => kw.trim())
					.filter(Boolean)
			: undefined,
		type: 'module'
	});

	await writeFile(pkgPath, JSON.stringify(pkg, null, 2));
	console.log('✅ package.json créé avec succès !');
}
