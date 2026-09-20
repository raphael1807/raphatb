# Portée de ce projet GSD

Lire STATE.md puis PROJECT.md. Cette planification concerne uniquement l’identité YouTube conservée dans `output/youtube-packaging/`, pas le développement du site.

- Conserver les décisions et preuves dans les documents existants.
- Ne pas régénérer les médias approuvés pour une simple sauvegarde.
- Les publications antérieures sont documentées, pas réexécutées automatiquement.
- Les options d’agents sont désactivées pour cette initialisation légère. La vérification locale reste obligatoire : `node output/youtube-packaging/verify-archive.mjs`.
- Ne pas fusionner dans main, déployer, publier ou restaurer une version sans autorisation applicable.
- Un push n’est confirmé qu’après comparaison du commit local avec la référence distante.
