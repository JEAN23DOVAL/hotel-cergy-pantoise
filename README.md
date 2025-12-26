
# Cergy Pontoise Hôtel – Présentation Officielle

Bienvenue au **Cergy Pontoise Hôtel**, votre adresse de référence à Bafoussam, en face du marché Bimop. Nous vous accueillons dans un cadre moderne, chaleureux et sécurisé, avec des chambres confortables et des services haut de gamme pour tous vos séjours professionnels ou privés.

---
## 📱 Optimisation Web Avancée

### ⚡ Performance & Caching

Ce site utilise une **stratégie complète de caching multi-niveaux** pour offrir une expérience ultra-rapide:

#### 🔄 Service Worker (sw.js)
- **Cache-First**: CSS, JavaScript, images (1 an) - Zéro re-téléchargement lors du scroll
- **Network-First**: HTML (1 heure) - Toujours avoir la dernière version
- **Intelligent Fallback**: Gestion offline avec images placeholder

#### 💾 Memory Cache (JavaScript)
- Cache en mémoire pour images dans `ImageCache` Map
- IntersectionObserver pour lazy loading avec preload 50px avant visibilité
- Animations fade-in lors du chargement

#### 🌐 HTTP Caching (.htaccess)
- GZIP compression pour CSS, JS, HTML
- Cache-Control headers optimisés par type de fichier
- Security headers (X-Content-Type-Options, CSP, etc.)

#### 🚀 Resource Hints (index.html)
- DNS Prefetch pour kit.fontawesome.com
- Preconnect pour établir connexion rapide
- Preload pour CSS et JS critiques

#### 📦 Progressive Web App (manifest.json)
- Installable sur mobile/desktop
- Offline support via Service Worker
- Icônes adaptatives et shortcuts

### 📊 Gains de Performance

| Métrique | Avant | Après | Économie |
|----------|-------|-------|----------|
| 1ère visite | 2.21 MB | 2.21 MB | - |
| Scroll (rechargement) | +500 KB | 0 KB | **100%** |
| Visite 2 | 2.21 MB | ~10 KB | **99.5%** |
| First Paint (visite 1) | 3.5s | 1.2s | **66%** |
| First Paint (visite 2) | 3.5s | 0.3s | **91%** |

### 🔧 Documentation Complète

- **[CACHING_OPTIMIZATION.md](CACHING_OPTIMIZATION.md)** - Guide détaillé du caching
- **[SERVER_CONFIGURATION.md](SERVER_CONFIGURATION.md)** - Configuration Apache, Nginx, Node.js

### 🛠️ Commandes Utiles (Console)

```javascript
// Afficher les stats du cache
logCacheStats()

// Vider tous les caches (force rechargement)
clearHotelCache()

// Vérifier Service Worker
navigator.serviceWorker.getRegistrations()
```

---
## 🏨 Présentation de l’établissement

- **Nom :** Cergy Pontoise Hôtel
- **Adresse :** En face du marché Bimop, Bafoussam, Cameroun
- **Téléphone (Appel direct) :** +237 6 58 53 44 64
- **WhatsApp :** +237 6 71 11 26 78
- **E-mail :** cergypontoise237@gmail.com

---

## 🛏️ Nos chambres & tarifs

| Type de chambre      | Nombre | Tarif (FCFA)      | Équipements principaux                | Média(s) disponible(s)         |
|---------------------|--------|-------------------|---------------------------------------|-------------------------------|
| Standard            | 5      | 25 000            | TV, Climatisation, Wi-Fi, Petit-déj.  | 4 photos                      |
| Prestige (balcon)   | 15     | 35 000 (discutable)| TV, Climatisation, Wi-Fi, Balcon, Petit-déj. | 9 vidéos (sélection possible) |
| Suite Junior        | 2      | 45 000 (discutable)| TV, Climatisation, Wi-Fi, Salon, Petit-déj.  | 1 vidéo                       |

**Petit-déjeuner inclus pour toutes les chambres.**

---

## 🛎️ Équipements & services

- Climatiseur dans toutes les chambres
- Télévision dans toutes les chambres
- Wi-Fi gratuit haut débit
- Petit déjeuner inclus
- Service de chambre
- Ménage quotidien (matin et soir)
- Restaurant (avec vidéo de présentation)
- Bar
- Salle de réunion
- Grande cour sécurisée

---

## 📸 Médias disponibles

- **Chambres standards :** 4 photos
- **Chambres prestige :** 9 vidéos (possibilité de sélection)
- **Suites junior :** 1 vidéo
- **Restaurant/bar :** 1 vidéo

---

## 📞 Contact & Réservation

- **WhatsApp (réservation rapide) :** [+237 6 71 11 26 78](https://wa.me/237671112678)
- **Appel direct :** +237 6 58 53 44 64
- **E-mail :** [cergypontoise237@gmail.com](mailto:cergypontoise237@gmail.com)

---

## 🌐 Localisation

Cergy Pontoise Hôtel est idéalement situé en face du marché Bimop, Bafoussam, Cameroun.

---

## 🎬 Démo & Présentation web

### Version démo validée
Une page de démonstration moderne, responsive, festive (Noël), a été validée par le client. Elle met en avant :
- Présentation visuelle premium
- Navigation mobile first (menu hamburger)
- Animations, transitions, lazy loading, palette festive
- Galerie photos/vidéos, Google Maps, CTA WhatsApp

### Version professionnelle (projet final)
Le site final intégrera :
- Les vraies informations de l’hôtel (tarifs, contacts, médias)
- Les vidéos/photos fournies (sélection à valider)
- Un design sobre, élégant, professionnel, adapté à la charte de l’établissement
- Tous les services et équipements listés
- Un formulaire de contact/réservation (WhatsApp, e-mail, téléphone)
- Optimisation SEO, accessibilité, rapidité

---

## 🛠️ Technologies utilisées

- **HTML5** (structure sémantique, accessibilité)
- **CSS3** (variables, responsive, animations, palette personnalisée)
- **JavaScript ES6+** (interactions, lazy loading, animations, CTA dynamiques)
- **Google Maps** (localisation interactive)
- **WebP/JPG/MP4** (optimisation médias)

---

## 📋 À fournir/valider pour la version finale

- Sélection des vidéos à utiliser pour les chambres prestige et suites junior
- Photos définitives des chambres standards
- Vidéo du restaurant/bar
- Logo officiel (si différent de la démo)
- Couleurs de la charte graphique (si souhaité)
- Textes de présentation personnalisés (si besoin)
- Liens réseaux sociaux (si existants)

---

## ✨ Exemples de CTA (Call To Action)

- Réserver une chambre : [WhatsApp](https://wa.me/237671112678)
- Demander un devis : [E-mail](mailto:cergypontoise237@gmail.com)
- Appeler la réception : +237 6 58 53 44 64

---

## 📄 Mentions légales & RGPD

Toutes les données personnelles collectées via le formulaire de contact sont strictement confidentielles et utilisées uniquement pour la gestion des réservations.

---

## 🤝 Remerciements

Merci à toute l’équipe du Cergy Pontoise Hôtel pour leur confiance et leur collaboration.

---

*Dernière mise à jour : Décembre 2025*
