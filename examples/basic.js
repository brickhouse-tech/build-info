import path from 'node:path';
import { fileURLToPath } from 'node:url';
import buildInfoAsync, { getGitAsync, getOS, getPackage } from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const bar = '--------';
const barThing = (str) => console.log(`\n${bar} ${str} ${bar}\n`);

const main = async () => {
  const result = await buildInfoAsync({
    build: [path.join(__dirname, '..', 'src', 'index.js')],
    pack: [path.join(__dirname, '..', 'package.json')],
  });
  barThing('buildInfoAsync');
  console.log(result);

  const gitInfo = await getGitAsync();
  barThing('getGitAsync');
  console.log(gitInfo);

  barThing('getOS');
  console.log(getOS());

  barThing('getPackage');
  console.log(getPackage(path.join(__dirname, '..', 'package.json')));
};

main().catch(console.error);
