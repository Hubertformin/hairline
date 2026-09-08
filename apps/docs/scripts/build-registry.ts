/**
 * Resolves the registry URL into `registry.json` before `shadcn build` runs.
 *
 * Items reference each other by absolute URL rather than bare name, because a bare
 * name only resolves when the consumer reached the item through a configured
 * namespace — an absolute URL works whether they typed a URL, used `@hairline/x`, or
 * arrived through MCP. But an absolute URL has to know where it lives, and that
 * differs between a preview deploy, local development and production.
 *
 * So the committed file is a template with a `{{REGISTRY_URL}}` placeholder, and the
 * built `registry.json` is generated. Set NEXT_PUBLIC_REGISTRY_URL to the deployment's
 * own origin on previews so a registry change can be installed and tested before it
 * goes live.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const url = (process.env.NEXT_PUBLIC_REGISTRY_URL ?? 'https://usehairline.com').replace(/\/$/, '');
const template = readFileSync(resolve(root, 'registry.template.json'), 'utf8');
const resolved = template.replaceAll('{{REGISTRY_URL}}', url);

if (resolved.includes('{{')) throw new Error('unsubstituted placeholder left in registry.json');

writeFileSync(resolve(root, 'registry.json'), resolved);
console.log(`registry → ${url}/r/{name}.json (${JSON.parse(resolved).items.length} items)`);
