import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repo=path.resolve(root,'../../../..');
const p=n=>path.join(root,n), a=n=>path.join(repo,'assets',n);
const magick='/Applications/MAMP/Library/bin/magick';
const run=(...args)=>execFileSync(magick,args,{stdio:'inherit'});
const font='/System/Library/Fonts/Supplemental/Arial.ttf';
const bold='/System/Library/Fonts/Supplemental/Arial Bold.ttf';
const type=(size,color,x,y,text)=>['-font',font,'-pointsize',String(size),'-fill',color,'-gravity','NorthWest','-annotate',`+${x}+${y}`,text];
const event='/var/folders/b7/c1ddnp596psd5fbh4vdv76lr0000gp/T/codex-clipboard-f91bf358-5095-4dc5-adb5-9632ea55981a.png';
// Only original source photography. Uniform scaling, no warps or generative face edits.
run(event,'-crop','2730x1100+0+350','+repage','-resize','1900x766!',
 '-modulate','92,78,100','-alpha','set','-channel','A','-fx',
 'min(1,i/170)*min(1,(w-i)/220)*min(1,j/65)*min(1,(h-j)/280)*(1-0.9*min(1,max(0,(i-520)/360)))',
 '+channel',p('sources/v16-original-photo-layer.png'));
// Retain Higgsfield typography only. Remove its dark background, no generated humans.
run(p('sources/higgsfield-v16-type.png'),'-crop','1740x435+150+185','+repage',
 '-alpha','set','-channel','A','-fx','max(0,min(1,(max(r,max(g,b))-0.15)/0.1))','+channel',
 '-resize','1000x250!',p('sources/v16-type-layer.png'));
run('-size','80x80','xc:none','-fill','white','-draw','circle 40,40 40,2',p('sources/v16-avatar-mask.png'));
const people=['william-burgess.jpg','christophe-contant.jpg','pierre-olivier-drouin.webp','emmanuel-ouellet.webp','melanie-bacquet.jpg','oli-pharand.jpg'];
for(const [i,name] of people.entries()){
 run(a(`photos/${name}`),'-resize','80x80^','-gravity','center','-extent','80x80',
 p('sources/v16-avatar-mask.png'),'-alpha','off','-compose','CopyOpacity','-composite',
 '-compose','Over','-stroke','#f1f0e6','-strokewidth','2','-fill','none','-draw','circle 40,40 40,2',p(`sources/v16-avatar-${i}.png`));
}
const logos=['monsieurchalets.svg','holos.png','firebarns.png'];
for(const [i,name] of logos.entries()){
 run('-size','138x64','xc:none','-fill','#f4f2e9','-stroke','#11160f','-strokewidth','3',
 '-draw','roundrectangle 1,1 137,63 9,9',
 '(',a(`logos/${name}`),'-background','none','-trim','+repage','-resize','110x40',')',
 '-gravity','center','-composite',p(`sources/v16-client-logo-${i}.png`));
}
const args=['-size','2560x1440','xc:#11160f',p('sources/v16-original-photo-layer.png'),'-geometry','+330+470','-composite',
 p('sources/v16-type-layer.png'),'-geometry','+1020+548','-composite',
 '(', '/Users/rapharemblay-bouchard/Desktop/ai_academie/doc/brand/ai-academie-logo-white-transparent.png', '-trim','+repage','-resize','320x',')','-gravity','NorthWest','-geometry','+1020+820','-composite',
 ...type(25,'#d2d6cb',1020,877,'Commence ici : aiacademie.ca →'),
 '-fill','#11160fe6','-draw','roundrectangle 557,806 797,839 6,6',
 ...type(22,'#e2e3dd',567,811,'Clients de RaphATB')];
for(let i=0;i<3;i++)args.push(p(`sources/v16-client-logo-${i}.png`),'-geometry',`+${563+i*112}+${847+i*4}`,'-composite');
for(let i=0;i<6;i++)args.push(p(`sources/v16-avatar-${i}.png`),'-geometry',`+${1510+i*58}+805`,'-composite');
args.push(...type(24,'#d2d6cb',1510,892,'Témoignages · clients et partenaires'),'-sampling-factor','4:4:4','-quality','96',p('raphatb-banner-v16-academie-proof.jpg'));
run(...args);
for(const [kind,crop] of [['desktop','2560x422+0+509'],['mobile','1544x422+508+509']]){
 run(p('raphatb-banner-v16-academie-proof.jpg'),'-crop',crop,'+repage','-quality','95',p(`raphatb-banner-v16-${kind}.jpg`));
}
