# Vérification de l’archive YouTube

Date : 20 septembre 2026. Portée : conservation et documentation, sans nouvelle publication YouTube.

## Contrôles locaux exécutés

Commande : `node output/youtube-packaging/verify-archive.mjs` depuis la racine du dépôt.

| Contrôle | Résultat |
| --- | --- |
| 111 fichiers de `6eac2a1` | Identiques octet pour octet |
| V18 master | JPEG 2560 × 1440 |
| V18 ordinateur / mobile | 2560 × 422 / 1544 × 422 |
| Description FR / EN | 848 / 807 caractères Unicode, sous 1000 |
| CTA descriptions | AI Académie et AI Geeks présents |
| Profil | Bonne chaîne, 4 liens, TikTok `@rapha.tb` |
| Références Markdown courantes | Fichiers cibles présents |
| `git diff --check` | Aucun défaut signalé |
| `gsd-sdk query init.new-project` | `project_exists: true`, `planning_exists: true` |
| `gsd-sdk query roadmap analyze` | Une phase et un plan reconnus |

Le premier essai du vérificateur dépassait le tampon standard de Node sur une image historique. Limite relevée à 32 Mio; deuxième exécution réussie sur tous les fichiers. Aucun média modifié.

## Git distant

Baseline `6eac2a16d3becf38118f63cd3b7f8078848f7654` déjà poussée et vérifiée. Le complément GSD doit passer le même contrôle : comparer `git rev-parse HEAD` avec `git ls-remote origin refs/heads/codex/youtube-branding-20260920`, puis vérifier `git status --porcelain` vide.

## Limites conservées

- Les contrôles de publication sont ceux de [PUBLICATION.md](../output/youtube-packaging/channel-profile/PUBLICATION.md), datés; aucune nouvelle inspection UI dans cette passe Git.
- L’affichage public français n’a pas été vérifié séparément de Studio.
- Les anciens scripts de génération ne sont pas une chaîne de build portable et n’ont pas été réexécutés.
- Un push sur la branche dédiée ne constitue ni un merge ni un déploiement du site.
