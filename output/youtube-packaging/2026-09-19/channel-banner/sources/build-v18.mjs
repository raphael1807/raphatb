import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repo=path.resolve(root,'../../../..'),p=n=>path.join(root,n);
const run=(...args)=>execFileSync('/Applications/MAMP/Library/bin/magick',args,{stdio:'inherit'});
const extra=['gael-mercier.webp','carl-moreau.jpg','miguel-alain.jpg','azaria-chavannes.jpg'];
for(const [i,name] of extra.entries())run(path.join(repo,'assets/photos',name),'-resize','80x80^','-gravity','center','-extent','80x80',
 p('sources/v16-avatar-mask.png'),'-alpha','off','-compose','CopyOpacity','-composite',
 '-compose','Over','-stroke','#f1f0e6','-strokewidth','2','-fill','none','-draw','circle 40,40 40,2',p(`sources/v18-avatar-${i+6}.png`));
for(const [name,viewport,size] of [['frontleap','680x120','115x'],['spektrum','674x77','108x']])
 run('-background','none','-size',viewport,p(`sources/aigeeks-${name}.svg`),'-trim','+repage',
 '-channel','RGB','-fill','#e5e8de','-colorize','100','+channel','-resize',size,p(`sources/v18-${name}.png`));
run('-background','none',p('sources/aigeeks-instrumnt.svg'),'-trim','+repage','-resize','29x29',p('sources/v18-instrumnt.png'));
const args=['-size','2560x1440','xc:#11160f',p('sources/v16-original-photo-layer.png'),'-geometry','+330+470','-composite',
 '(',p('sources/v16-type-layer.png'),'-resize','950x',')','-geometry','+1060+557','-composite',
 '(', '/Users/rapharemblay-bouchard/Desktop/ai_academie/doc/brand/ai-academie-logo-white-transparent.png','-trim','+repage','-resize','225x',')',
 '-gravity','NorthWest','-geometry','+1060+829','-composite',
 '-font','/System/Library/Fonts/Supplemental/Arial.ttf','-pointsize','24','-fill','#d2d6cb','-annotate','+1060+878','aiacademie.ca →'];
for(let i=0;i<10;i++)args.push('(',p(`sources/${i<6?'v16':'v18'}-avatar-${i}.png`),'-resize','44x44',')','-geometry',`+${1325+i*28}+823`,'-composite');
args.push('-font','/System/Library/Fonts/Supplemental/Arial.ttf','-pointsize','23','-fill','#e5e8de','-annotate','+1325+882','20+ témoignages sur Raph');
const logos=[
 ['v17-monsieur-chalets','160x',1658,825],['v17-femtum','100x',1843,816],['v17-vooban','40x25',1972,819],
 ['v18-spektrum','98x',1658,877],['v18-frontleap','108x',1774,874],['v17-fourwaves','91x',1902,874],['v18-instrumnt','25x25',2006,871]
];
for(const [name,size,x,y] of logos)args.push('(',p(`sources/${name}.png`),'-resize',size,')','-geometry',`+${x}+${y}`,'-composite');
args.push('-sampling-factor','4:4:4','-quality','96',p('raphatb-banner-v18-social-proof.jpg'));
run(...args);
for(const [kind,crop] of [['desktop','2560x422+0+509'],['mobile','1544x422+508+509']])
 run(p('raphatb-banner-v18-social-proof.jpg'),'-crop',crop,'+repage','-quality','95',p(`raphatb-banner-v18-${kind}.jpg`));
