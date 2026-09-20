import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repo=path.resolve(root,'../../../..');
const p=n=>path.join(root,n);
const magick='/Applications/MAMP/Library/bin/magick';
const run=(...args)=>execFileSync(magick,args,{stdio:'inherit'});
// Fix the SVG viewport before rasterization. Default SVG dimensions distorted V16.
run('-background','none','-size','2237x187',path.join(repo,'assets/logos/monsieurchalets.svg'),
 '-trim','+repage','-channel','RGB','-fill','#e5e8de','-colorize','100','+channel',
 '-resize','195x',p('sources/v17-monsieur-chalets.png'));
// Provided official Femtum asset, alpha preserved; remove only transparent margins.
run(p('sources/femtum-original.png'),'-trim','+repage','-channel','RGB','-fill','#e5e8de','-colorize','100','+channel','-resize','135x',p('sources/v17-femtum.png'));
run('-background','none','-size','140x90',p('sources/aigeeks-vooban.svg'),'-trim','+repage',
 '-channel','RGB','-fill','#e5e8de','-colorize','100','+channel','-resize','70x36',p('sources/v17-vooban.png'));
run(p('sources/aigeeks-fourwaves.png'),'-trim','+repage','-channel','RGB','-fill','#e5e8de','-colorize','100','+channel','-resize','155x',p('sources/v17-fourwaves.png'));
const args=['-size','2560x1440','xc:#11160f',p('sources/v16-original-photo-layer.png'),'-geometry','+330+470','-composite',
 '(',p('sources/v16-type-layer.png'),'-resize','950x',')','-geometry','+1060+557','-composite',
 '(', '/Users/rapharemblay-bouchard/Desktop/ai_academie/doc/brand/ai-academie-logo-white-transparent.png','-trim','+repage','-resize','245x',')',
 '-gravity','NorthWest','-geometry','+1060+829','-composite',
 '-font','/System/Library/Fonts/Supplemental/Arial.ttf','-pointsize','24','-fill','#d2d6cb','-annotate','+1060+878','aiacademie.ca →'];
for(let i=0;i<6;i++)args.push('(',p(`sources/v16-avatar-${i}.png`),'-resize','54x54',')','-geometry',`+${1350+i*39}+837`,'-composite');
args.push(p('sources/v17-monsieur-chalets.png'),'-geometry','+1650+833','-composite',
 p('sources/v17-femtum.png'),'-geometry','+1880+823','-composite',
 p('sources/v17-vooban.png'),'-geometry','+1715+866','-composite',
 p('sources/v17-fourwaves.png'),'-geometry','+1870+873','-composite',
 '-sampling-factor','4:4:4','-quality','96',p('raphatb-banner-v17-minimal-proof.jpg'));
run(...args);
for(const [kind,crop] of [['desktop','2560x422+0+509'],['mobile','1544x422+508+509']])
 run(p('raphatb-banner-v17-minimal-proof.jpg'),'-crop',crop,'+repage','-quality','95',p(`raphatb-banner-v17-${kind}.jpg`));
