# Activity Feed — README

Un flux d’activité filtrable (statut, type, utilisateur, plage de dates) construit avec React + Vite.

## Installation

```bash
npm install
npm run dev    # http://localhost:5173/
```

Build & utilitaires:

```bash
npm run build      # build de production
npm run preview    # prévisualiser le build
npm run lint       # ESLint
npm run typecheck  # TypeScript --noEmit
```

## À propos

- Données: `src/data/activities.json` (échantillon d’évènements)
- Filtres: Statut, Type, Utilisateur, Plage de dates (bornes inclusives)
- Reset: réinitialise tous les filtres
- URL: les filtres sont reflétés dans la query (`status`, `type`, `user`, `from`, `to`) pour partage

### Architecture rapide
- Feature‑first: tout le code du flux est sous `src/ActivityFeed/` (liste, filtres, store, hooks, types).
- Store: `ActivityFeed/store` (Zustand vanilla + Provider React).
- Hooks: `ActivityFeed/hooks` (dont `hooks/filters` pour chaque filtre).
- Outils partagés: `src/shared/utils` (dates, filtre/pagination, collecte d’options).

### Pourquoi Zustand (bref)
- Léger, sans boilerplate (pas d’actions/slices), parfait pour un état « feature‑scopé ».
- Performance: sélecteurs ciblés + `shallow` → pas de re‑renders inutiles.
- Facile à tester/faire évoluer (un store par feature).

### Performance côté UI
- Sélectionne seulement ce qui est nécessaire (selectors Zustand + `shallow`).
- Compare avant d’écrire (listes/dates) → pas de set() superflu.
- `getActivitiesPage`: filtre + pagination en un seul passage (O(n)).

### Synchro URL (nuqs)
- Clés: `status`, `type`, `user`, `from`, `to` (pagination volontairement non synchronisée).
- Chaque filtre gère sa propre clé (co‑localisé) et met à jour l’URL sans boucle grâce à un garde local.
- Coller une URL (ex: `?status=IN_PROGRESS` ou `?from=…&to=…`) applique les filtres.
