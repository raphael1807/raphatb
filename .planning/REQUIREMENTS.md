# Requirements: RaphATB YouTube

**Defined:** 2026-09-20
**Core Value:** Une archive fidèle, vérifiable et facile à reprendre.

## v1 Requirements

- [x] **ARCH-01** : conserver les 111 fichiers de la sauvegarde initiale, sans altérer les médias.
- [x] **ARCH-02** : pointer vers V18, les descriptions FR/EN, les quatre liens de profil et les preuves datées.
- [x] **ARCH-03** : fournir le contexte GSD léger, une feuille de route et un état de reprise cohérents.
- [x] **ARCH-04** : vérifier les références locales, dimensions, textes et liens avec un contrôle reproductible.
- [ ] **ARCH-05** : pousser le complément GSD, comparer les commits local/distant et laisser le worktree propre.

## Out of Scope

| Feature | Reason |
| --- | --- |
| Nouveau design ou texte | Versions déjà approuvées, demande actuelle de sauvegarde |
| Merge ou déploiement | Non demandé |
| Build portable des anciennes versions | Dépendances historiques documentées, pas une application à livrer |
| Playlists, autres vidéos et autres worktrees | Distincts de cette sauvegarde |

## Traceability

| Requirement | Phase | Status |
| --- | --- | --- |
| ARCH-01 | Phase 1 | Complete |
| ARCH-02 | Phase 1 | Complete |
| ARCH-03 | Phase 1 | Complete |
| ARCH-04 | Phase 1 | Complete |
| ARCH-05 | Phase 1 | Pending remote verification |

## Definition of Done

Les contrôles locaux passent, aucun ancien fichier de la sauvegarde n’est perdu, la branche distante correspond à HEAD et le worktree est propre. Un état public YouTube non relu maintenant n’est pas présenté comme un contrôle live de cette passe Git.
