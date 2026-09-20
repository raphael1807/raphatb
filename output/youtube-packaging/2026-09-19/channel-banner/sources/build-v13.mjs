import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

// Higgsfield art directions are retained alongside this production assembly.
// Original photographs replace every generated human; no face reconstruction.
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repo=path.resolve(root,'../../../..');
const event='/var/folders/b7/c1ddnp596psd5fbh4vdv76lr0000gp/T/codex-clipboard-f91bf358-5095-4dc5-adb5-9632ea55981a.png';
const consult=path.join(repo,'assets/photos/consulting.jpg');
const bold='/System/Library/Fonts/Supplemental/Arial Bold.ttf';
const regular='/System/Library/Fonts/Supplemental/Arial.ttf';
const magick='/Applications/MAMP/Library/bin/magick';
const p=n=>path.join(root,n);
const run=(...args)=>execFileSync(magick,args,{stdio:'inherit'});
const type=(font,size,color,x,y,text)=>['-font',font,'-pointsize',String(size),'-fill',color,'-gravity','NorthWest','-annotate',`+${x}+${y}`,text];
const photo=(src,crop,size,x,y)=>['(',src,...(crop?['-crop',crop,'+repage']:[]),'-resize',size,'+repage',')','-geometry',`+${x}+${y}`,'-composite'];

// A: immersive image with smooth falloff. The presenter is wholly in safe area.
run(event,'-crop','2730x1100+0+350','+repage','-resize','1900x766!',
 '-modulate','92,78,100','-alpha','set','-channel','A','-fx',
 'min(1,i/170)*min(1,(w-i)/220)*min(1,j/65)*min(1,(h-j)/280)*(1-0.85*min(1,max(0,(i-520)/360)))',
 '+channel',p('sources/v13a-original-photo-layer.png'));
run('-size','2560x1440','xc:#11160f',p('sources/v13a-original-photo-layer.png'),'-geometry','+330+470','-composite',
 ...type(bold,31,'#ffffff',1200,552,'raphatb'),
 ...type(bold,96,'#ffffff',1196,609,'Construire'),
 ...type(bold,96,'#ffffff',1196,714,'avec l’IA.'),
 ...type(regular,34,'#b4c49c',1200,843,'Du concret. Pas du bruit.'),
 '-sampling-factor','4:4:4','-quality','96',p('raphatb-banner-v13a-immersive.jpg'));

// B: preserve Higgsfield's actual type block; replace its generated photo.
run('-size','2560x1440','xc:white',
 '(',p('sources/higgsfield-v13b.png'),'-crop','550x410+565+515','+repage','-resize','420x313!',')',
 '-geometry','+590+563','-composite',
 ...photo(event,'2400x1138+250+350','780x370!',1200,535),
 '-sampling-factor','4:4:4','-quality','96',p('raphatb-banner-v13b-minimal.jpg'));

// C: faithful editorial diptych using the generated centre type and ivory tone.
run('-size','2560x1440','xc:#f8f5ee',
 '(',p('sources/higgsfield-v13c.png'),'-crop','520x460+1085+480','+repage','-resize','360x318!',')',
 '-geometry','+1100+560','-composite',
 ...photo(event,'1700x1150+250+350','510x345!',555,548),
 ...photo(consult,null,'510x339!',1500,551),
 '-sampling-factor','4:4:4','-quality','96',p('raphatb-banner-v13c-editorial.jpg'));

for(const variant of ['a-immersive','b-minimal','c-editorial']){
 const base=`raphatb-banner-v13${variant}`;
 run(p(`${base}.jpg`),'-crop','2560x422+0+509','+repage','-quality','94',p(`${base}-desktop.jpg`));
 run(p(`${base}.jpg`),'-crop','1544x422+508+509','+repage','-quality','94',p(`${base}-mobile.jpg`));
}

// Side-by-side choices are kept, not treated as superseded revisions.
const sheet=['-size','1800x1220','xc:#eeeeec'];
for(const [i,variant] of ['a-immersive','b-minimal','c-editorial'].entries()){
 const label=['A — Immersive','B — Minimaliste','C — Éditoriale'][i];
 sheet.push(...type(bold,26,'#222222',30,20+i*402,label));
 sheet.push('(',p(`raphatb-banner-v13${variant}-desktop.jpg`),'-resize','1740x287!',')','-geometry',`+30+${66+i*402}`,'-composite');
}
run(...sheet,'-quality','94',p('raphatb-banner-v13-comparatif.jpg'));
console.log('Three 2560×1440 masters, desktop and mobile crops, comparison generated.');
