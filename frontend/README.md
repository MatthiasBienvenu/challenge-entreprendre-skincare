# AIVANA Tech - PWA d'Analyse de Peau

Application web progressive (PWA) mobile-first pour l'analyse de conditions cutanées avec recommandations de produits personnalisées.

## 🚀 Fonctionnalités

- **Analyse par caméra** : Capturez ou importez une photo de votre peau
- **Détection IA** : Backend FastAPI avec détection automatique des conditions cutanées
- **Recommandations produits** : Configuration locale mappant diseases → produits
- **PWA** : Installable sur mobile (iOS/Android) et desktop
- **Dark/Light mode** : Thème adaptatif
- **Responsive** : Design mobile-first avec Tailwind CSS

## 🛠️ Stack Technique

- **Frontend** : React 18 + TypeScript + Vite
- **UI** : Tailwind CSS + shadcn/ui
- **Icons** : Lucide React
- **Backend** : FastAPI (externe)
- **PWA** : Manifest + Service Worker ready

## 📦 Installation

```bash
# Cloner le repo
git clone <your-repo-url>
cd skin-analyzer

# Installer les dépendances
npm install

# Copier et configurer les variables d'environnement
cp .env.example .env
# Éditer .env et définir VITE_API_BASE_URL
```

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine :

```env
VITE_API_BASE_URL=http://localhost:8000
```

### Backend API

L'application s'attend à un backend FastAPI avec les endpoints suivants :

- `POST /api/v1/detect/` - Détection de condition cutanée (multipart/form-data avec champ `file`)
- `GET /openapi.json` - Documentation OpenAPI (optionnel, pour auto-discovery)

**Format de réponse attendu :**

```json
{
  "disease": "acne",
  "confidence": 0.85,
  "extras": {}
}
```

### Configuration produits

Le fichier `public/config/products.config.json` mappe les diseases aux produits recommandés.

**Structure :**

```json
{
  "version": 1,
  "currency": "EUR",
  "defaultFallback": [...],
  "map": {
    "acne": [...],
    "eczema": [...]
  },
  "overrides": {
    "byConfidence": [
      { "disease": "acne", "minConfidence": 0.7, "limit": 3 }
    ]
  }
}
```

Pour ajouter une nouvelle condition :
1. Ajoutez une entrée dans `map` avec la disease (en minuscules)
2. Listez les produits avec `name`, `url`, `image`, `price`, `tags`
3. Optionnel : ajoutez des overrides pour filtrer selon le score de confiance

## 🏃 Développement

```bash
# Lancer le serveur de dev
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview
```

L'application sera accessible sur `http://localhost:8080`

## 📱 Installation PWA

### Desktop
1. Visitez l'app dans Chrome/Edge
2. Cliquez sur l'icône d'installation dans la barre d'adresse
3. Suivez les instructions

### Mobile (iOS)
1. Ouvrez dans Safari
2. Tapez le bouton Partager
3. Sélectionnez "Sur l'écran d'accueil"

### Mobile (Android)
1. Ouvrez dans Chrome
2. Tapez le menu (⋮)
3. Sélectionnez "Installer l'application"

## 🎨 Personnalisation du Design

Le design system est défini dans :
- `src/index.css` - Variables CSS (couleurs HSL, gradients, shadows)
- `tailwind.config.ts` - Configuration Tailwind étendue

Pour changer les couleurs :
1. Modifiez les valeurs HSL dans `src/index.css`
2. Les variantes light/dark sont gérées automatiquement

## 📁 Structure du Projet

```
src/
├── components/
│   ├── ui/              # Composants shadcn/ui
│   ├── CameraCard.tsx   # Composant caméra/upload
│   ├── ProductCard.tsx  # Carte produit
│   ├── ResultCard.tsx   # Affichage résultat
│   └── ...
├── hooks/
│   ├── useCamera.tsx    # Gestion caméra
│   ├── useDetect.tsx    # Appel API détection
│   └── useProductConfig.tsx
├── pages/
│   ├── Scan.tsx         # Page principale
│   └── Result.tsx       # Page résultats
├── types/
│   └── api.ts           # Types TypeScript
└── ...

public/
├── config/
│   └── products.config.json
├── manifest.json
└── icon-*.png
```

## 🧪 Testing

### Test de l'API de détection

```bash
# Tester l'endpoint de détection
curl -X POST http://localhost:8000/api/v1/detect/ \
  -F "file=@test-image.jpg"
```

### Test de l'affichage mobile

1. Ouvrez Chrome DevTools (F12)
2. Activez le mode "Responsive" (Ctrl+Shift+M)
3. Testez différentes tailles d'écran

## 🔒 Sécurité & Confidentialité

- Les images ne sont **pas stockées** sur le serveur
- Traitement local des images (compression avant upload)
- Résultats stockés uniquement dans localStorage du navigateur
- CORS configuré côté backend

## 📊 Performances

- Lighthouse Score cible : ≥ 90 (Perf/SEO/A11y/Best Practices)
- Images compressées à 80% qualité JPEG
- Lazy loading des composants
- Code splitting automatique (Vite)

## 🐛 Troubleshooting

### Caméra ne s'active pas
- Vérifiez les permissions navigateur
- HTTPS requis en production (localhost OK en dev)

### Erreur 429/402 de l'API
- **429** : Rate limit dépassé, attendez quelques instants
- **402** : Crédit API insuffisant (backend)

### Produits ne s'affichent pas
- Vérifiez que `public/config/products.config.json` existe
- Vérifiez la casse de la disease (minuscules dans `map`)

## 📝 License

Ce projet est sous licence MIT.

## 🤝 Contribution

Les contributions sont bienvenues ! Ouvrez une issue ou soumettez une PR.
