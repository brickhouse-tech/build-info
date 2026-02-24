import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import buildInfoAsync, { getGitAsync, git, getPackage, getBuildTimeAsync } from './index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('buildInfoAsync', () => {
  it('should return all build info', async () => {
    const { build, os, git, pack } = await buildInfoAsync({
      pack: [path.join(__dirname, '..', 'package.json')],
      build: [path.join(__dirname, '..', 'package.json')],
    });
    expect(build).toBeDefined();
    expect(os).toBeDefined();
    expect(git).toBeDefined();
    expect(pack).toBeDefined();
  });

  it('should fail with empty options', async () => {
    await expect(buildInfoAsync({})).rejects.toThrow();
  });
});

describe('getGitAsync', () => {
  it('should return branch, commit, and tag', async () => {
    const { branch, commit, tag } = await getGitAsync();
    const { current } = await git.branch();
    expect(branch).toEqual(current);
    expect(commit).toBeTruthy();
    expect(tag).toBeTruthy();
  });
});

describe('getPackage', () => {
  it('should return default fields (name, version)', () => {
    const obj = getPackage(path.join(__dirname, '..', 'package.json'));
    expect(Object.keys(obj)).toEqual(['name', 'version']);
  });

  it('should return override fields', () => {
    const picks = ['scripts'];
    const obj = getPackage(path.join(__dirname, '..', 'package.json'), picks);
    expect(Object.keys(obj)).toEqual(picks);
  });
});

describe('getBuildTimeAsync', () => {
  it('should return a Date', async () => {
    const ret = await getBuildTimeAsync(path.join(__dirname, '..', 'package.json'));
    expect(ret.toUTCString()).toMatch(/.*GMT/);
  });
});
