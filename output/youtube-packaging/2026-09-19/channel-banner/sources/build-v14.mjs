import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const p=n=>path.join(root,n);
const source='/var/folders/b7/c1ddnp596psd5fbh4vdv76lr0000gp/T/codex-clipboard-30bde46e-72f4-46dd-b6da-04ca54291558.png';
const run=(...args)=>execFileSync('/Applications/MAMP/Library/bin/magick',args,{stdio:'inherit'});
// Preserve the exact user-selected reference. Only reduce the tagline gap by 13 px.
// The Higgsfield edit is kept as an independent source, not as a face replacement.
run(source,'-background','#f9f6ee','-alpha','remove','-alpha','off',
 '-crop','132x57+489+320','+repage',p('sources/v14-tagline.png'));
run(source,'-background','#f9f6ee','-alpha','remove','-alpha','off',
 '-fill','#f9f6ee','-draw','rectangle 485,319 624,377',
 p('sources/v14-tagline.png'),'-geometry','+489+307','-composite',
 '-crop','1025x274+40+151','+repage','-resize','1486x397!',
 '-background','#f9f6ee','-gravity','center','-extent','2560x1440',
 '-sampling-factor','4:4:4','-quality','96',p('raphatb-banner-v14-editorial-taglines.jpg'));
for(const [label,crop] of [['desktop','2560x422+0+509'],['mobile','1544x422+508+509']]){
 run(p('raphatb-banner-v14-editorial-taglines.jpg'),'-crop',crop,'+repage','-quality','96',p(`raphatb-banner-v14-${label}.jpg`));
}
