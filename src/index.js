import { simpleGit } from 'simple-git';
import { stat, readFile } from 'node:fs/promises';
import os from 'node:os';
import { createRequire } from 'node:module';

export const git = simpleGit();

/**
 * Get OS name and release info
 */
export const getOS = () => {
  const platform = os.platform();
  const release = os.release();
  const arch = os.arch();
  return `${platform} ${release} (${arch})`;
};

/**
 * Get git branch, commit, and tag info
 */
export const getGitAsync = async () => {
  const { current: branch } = await git.branch();
  const log = await git.log({ maxCount: 1 });
  const commit = log.latest?.hash ?? '';
  const tags = await git.tags({ '--contains': commit });
  return { branch, commit, tag: tags };
};

/**
 * Read and pick fields from a package.json file
 * @param {string} filePath - Path to package.json
 * @param {string[]} picks - Fields to include (default: name, version)
 */
export const getPackage = (filePath, picks = ['name', 'version']) => {
  const require = createRequire(import.meta.url);
  const pkg = require(filePath);
  const result = {};
  for (const key of picks) {
    if (key in pkg) {
      result[key] = pkg[key];
    }
  }
  return result;
};

/**
 * Get the birthtime of a file
 * @param {string} filePath
 */
export const getBuildTimeAsync = async (filePath) => {
  const stats = await stat(filePath);
  return stats.birthtime;
};

/**
 * Get all build info
 * @param {Object} options
 * @param {Array} options.pack - [filePath, picks] for getPackage
 * @param {Array} options.build - [filePath] for getBuildTimeAsync
 */
const buildInfoAsync = async ({ pack = [], build = [] }) => {
  const [packResult, gitResult, buildResult] = await Promise.all([
    Promise.resolve(getPackage(...pack)),
    getGitAsync(),
    getBuildTimeAsync(...build),
  ]);

  return {
    pack: packResult,
    git: gitResult,
    build: buildResult,
    os: getOS(),
  };
};

export default buildInfoAsync;
