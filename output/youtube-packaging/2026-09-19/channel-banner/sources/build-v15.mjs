import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const p=n=>path.join(root,n);
const source='/var/folders/b7/c1ddnp596psd5fbh4vdv76lr0000gp/T/codex-clipboard-23689f4d-c48d-4f1e-b866-d85323bbd732.png';
const run=(...args)=>execFileSync('/Applications/MAMP/Library/bin/magick',args,{stdio:'inherit'});
// Register Higgsfield's edit to the reference, then take ONLY the subtitle patch.
// The rest of the source, including presenter's face, is never regenerated.
run(p('sources/higgsfield-v15-layout.png'),'-crop','3072x825+0+99','+repage',
 '-resize','1296x348!','-crop','315x65+555+202','+repage',p('sources/v15-cta-patch.png'));
run(source,p('sources/v15-cta-patch.png'),'-geometry','+555+202','-composite',
 '-crop','1282x348+7+0','+repage','-resize','1544x419!',
 '-background','#11150f','-alpha','remove','-alpha','off',
 '-gravity','center','-extent','2560x1440','-sampling-factor','4:4:4','-quality','96',
 p('raphatb-banner-v15-dark-cta.jpg'));
for(const [name,crop] of [['desktop','2560x422+0+509'],['mobile','1544x422+508+509']]){
 run(p('raphatb-banner-v15-dark-cta.jpg'),'-crop',crop,'+repage','-quality','96',p(`raphatb-banner-v15-${name}.jpg`));
}
