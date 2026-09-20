import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

// Read-only archive validation. No network calls, generation or publication.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const archive = 'output/youtube-packaging';
const baseline = '6eac2a16d3becf38118f63cd3b7f8078848f7654';
const git = (...args) => execFileSync('git', args, { cwd: root, maxBuffer: 32 * 1024 * 1024 });
const read = path => readFileSync(resolve(root, path));
const baselineFiles = git('ls-tree', '-rz', '--name-only', baseline, '--', archive)
  .toString().split('\0').filter(Boolean);
assert.equal(baselineFiles.length, 111, 'Expected 111 initial archive files');
for (const path of baselineFiles) {
  assert(read(path).equals(git('show', `${baseline}:${path}`)), `Baseline changed: ${path}`);
}
console.log('PASS: 111 baseline files preserved byte-for-byte');

// JPEG SOF dimensions; works without ImageMagick or macOS-specific tools.
function dimensions(bytes) {
  assert.equal(bytes.readUInt16BE(0), 0xffd8, 'Expected JPEG');
  for (let pos = 2; pos < bytes.length;) {
    assert.equal(bytes[pos++], 0xff, 'Expected JPEG marker');
    while (bytes[pos] === 0xff) pos++;
    const marker = bytes[pos++];
    assert(marker !== 0xda && marker !== 0xd9, 'Missing JPEG frame');
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    const size = bytes.readUInt16BE(pos);
    assert(size >= 2 && pos + size <= bytes.length, 'Invalid JPEG segment');
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return [bytes.readUInt16BE(pos + 5), bytes.readUInt16BE(pos + 3)];
    }
    pos += size;
  }
  throw new Error('Missing JPEG dimensions');
}
for (const [suffix, expected] of [['social-proof', [2560, 1440]], ['desktop', [2560, 422]], ['mobile', [1544, 422]]]) {
  const bytes = read(`${archive}/2026-09-19/channel-banner/raphatb-banner-v18-${suffix}.jpg`);
  assert.deepEqual(dimensions(bytes), expected, suffix);
}
console.log('PASS: V18 master, desktop and mobile dimensions');

for (const lang of ['fr', 'en']) {
  const description = read(`${archive}/channel-profile/description-${lang}.txt`).toString().trim();
  assert([...description].length <= 1000 && description.length > 0);
  for (const url of ['https://aiacademie.ca/', 'https://aigeekssquad.com/']) assert(description.includes(url));
  console.log(`PASS: ${lang} description, ${[...description].length} characters, both CTAs`);
}
const links = JSON.parse(read(`${archive}/channel-profile/links.json`));
assert.equal(links.channel_id, 'UCc5GGFRjQrTjPWog0VKRjMg');
assert.equal(links.profile_links.length, 4);
assert.equal(links.profile_links.find(link => link.title === 'TikTok')?.url, 'https://www.tiktok.com/@rapha.tb');
for (const link of [...links.profile_links, ...links.description_ctas]) assert.equal(new URL(link.url).protocol, 'https:');
const config = JSON.parse(read('.planning/config.json'));
assert.equal(config.commit_docs, true);
assert.equal(config.workflow.auto_advance, false);
console.log('PASS: channel, profile links and GSD configuration');

function markdownFiles(dir) {
  return readdirSync(resolve(root, dir), { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? markdownFiles(path) : path.endsWith('.md') ? [path] : [];
  });
}
for (const file of [...markdownFiles('.planning'), `${archive}/README.md`]) {
  for (const match of read(file).toString().matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (/^(?:[a-z]+:|#)/i.test(target)) continue;
    assert(existsSync(resolve(root, dirname(file), decodeURIComponent(target.split('#')[0]))), `Broken link in ${file}: ${target}`);
  }
}
console.log('PASS: current documentation file links');
console.log('Archive checks passed. Remote Git and historical UI publication are separate checks.');
