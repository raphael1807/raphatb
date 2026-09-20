# RaphATB : sauvegarde de l’identité YouTube

## What This Is

Projet GSD léger pour conserver et reprendre le travail YouTube des 19 et 20 septembre 2026. Il couvre la bannière approuvée, ses versions et sources, les descriptions FR/EN et les liens de profil. Il ne redéfinit pas le projet du site web RaphATB.

La création et les publications précèdent cette initialisation GSD. Les preuves datées restent dans [PUBLICATION.md](../output/youtube-packaging/channel-profile/PUBLICATION.md), sans prétendre qu’un workflow GSD les a exécutées.

## Core Value

Retrouver les bons fichiers et les décisions approuvées, sans confondre proposition, sauvegarde Git et publication YouTube.

## Requirements

### Validated

- Bannière V18 approuvée et publication observée dans la tâche.
- Descriptions française et anglaise avec AI Académie et AI Geeks.
- Lien TikTok corrigé et vérifié : `https://www.tiktok.com/@rapha.tb`.
- Historique et sources conservés dans le commit `6eac2a1` déjà poussé.

### Active

Aucune exigence restante dans cette sauvegarde. Le contexte GSD et les contrôles sont livrés; le push `0515a21` est vérifié. Suivi : [REQUIREMENTS.md](REQUIREMENTS.md).

### Out of Scope

- Modifier le site, la bannière ou les textes approuvés pendant cette sauvegarde.
- Fusionner dans `main`, déployer le site ou publier de nouvelles vidéos.
- Exécuter les anciennes demandes de playlists ou de collaborations d’autres tâches.
- Rendre portables les anciens scripts de génération, ou lancer des agents/recherches.

## Context

Point d’entrée des livrables : [README YouTube](../output/youtube-packaging/README.md). Historique canonique : [VERSIONS.md](../output/youtube-packaging/2026-09-19/channel-banner/VERSIONS.md).

Autorisation actuelle : « Oui je veux que tout soit pushed et que ce soit parfait », après confirmation du GSD léger. Portée : fichiers de ce travail, branche `codex/youtube-branding-20260920`, dépôt public `raphael1807/raphatb`.

## Constraints

- Préserver les médias approuvés et les changements étrangers à la tâche.
- Aucune donnée secrète ou export de session authentifiée dans Git.
- Les scripts historiques ont des dépendances locales; les exports livrés font foi.
- La vérification publique française reste distincte de sa sauvegarde relue dans Studio.

## Key Decisions

| Decision | Rationale | Outcome |
| --- | --- | --- |
| V18 et vraie photo, visage non régénéré | Correction du menton et approbation utilisateur | Confirmé |
| « Apprends à vendre et livrer des services IA. » | Promesse utile et CTA AI Académie | Confirmé |
| « 20+ témoignages sur Raph » | Ne pas transformer des cartes publiques en nombre d’élèves | Confirmé |
| Logos de communauté distincts des clients | Éviter une preuve commerciale trompeuse | Confirmé |
| GSD léger, sans recherche ni sous-agents | Sauvegarde d’un travail existant | Confirmé le 20 septembre |
| Branche dédiée, aucun merge | Préserver le site et `main` | Confirmé |

## Evolution

Mettre à jour les fichiers existants lors d’une nouvelle décision. Le hub Second Brain existant reste `08_projects/20_07_22_raphatb_instagram_growth_analysis/README.md`; aucun nouveau hub Notion.

*Last updated: 2026-09-20 after user approval of the lightweight GSD archive.*
