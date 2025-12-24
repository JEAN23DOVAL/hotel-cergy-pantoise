# 📋 GUIDE D'UTILISATION & PERSONNALISATION

## 🚀 DÉMARRAGE RAPIDE

### 1. Remplacer les images
Placez vos images dans les dossiers :
- `assets/rooms/` - Images des chambres prestige (room-2.jpg à room-9.jpg) + room-2.webp, etc.
- `assets/juniors/` - Images des suites junior (suite-1.jpg, suite-2.jpg) + webp
- `assets/standarts/` - Images des chambres standard (standard-1.jpg, standard-2.jpg) + webp

**IMPORTANT :** Pour chaque JPG, créez un fichier WebP avec le même nom (meilleure compression).

### 2. Personnaliser le contenu
Modifiez dans `index.html` :
- Textes des sections
- Descriptions des chambres
- Prix (actuellement en FCFA)
- Numéro WhatsApp (remplacez 237658534464)

### 3. Modifier la palette de couleurs
Allez dans `css/style.css` - section `:root` :
```css
:root {
    --primary-gold: #D4AF37;      /* Changez cette couleur */
    --primary-red: #C41E3A;       /* Ou celle-ci */
    --primary-green: #165B33;     /* Ou celle-là */
}
```

---

## 🎨 STRUCTURE DES SECTIONS

### Header & Navigation
- Menu hamburger automatique sur mobile (<768px)
- Liens de navigation avec animations
- Logo avec gradient

**À modifier :**
- Logo : Changez l'emoji 🏨 ou le texte "Cergy Pontoise"

### Hero Section
- Animation de neige (10 particules)
- Titre animé avec gradient
- 3 features icons
- 2 CTAs (Réserver + Localisation)

**À modifier :**
- Titre principal
- Sous-titre
- Text des features
- Textes des boutons

### About Section
- Grille 2 colonnes responsive
- Stats (nombre chambres, services, disponibilité)
- Carte décorée animée

**À modifier :**
- Paragraphes d'introduction
- Nombres dans les stats
- Textes des labels

### Prestige Rooms (Rooms 2-9)
- 8 cartes de chambres avec images
- Badge "Prestige" 
- 3 détails (lit, balcon, etc.)
- Prix et bouton WhatsApp
- Animations au hover

**À modifier :**
- Prix dans `.price`
- Features dans `.room-features`
- Descriptions

### Suites Junior (2 suites)
- 2 cartes "featured" plus grandes
- Design premium
- Même structure que Prestige

**À modifier :**
- Prix : 45 000 FCFA/nuit
- Features : Lit King, Salon, 2 SdB
- Descriptions

### Chambres Standard (2 chambres)
- 2 cartes standard
- Design épuré
- Même structure

**À modifier :**
- Prix : 25 000 FCFA/nuit
- Features : Lit Queen, TV, Climatisée
- Descriptions

### Services Section
- 8 cards avec icônes emoji
- Fond sombre
- Hover effect

**À modifier :**
- Titres des services
- Descriptions
- Emoji (si désiré)

### Galerie
- 6 images en grille responsive
- Hover zoom effect
- Lazy loading natif

**À modifier :**
- Remplacer les images
- Modifier alt text

### Testimonials
- 3 avis clients
- Stars (⭐⭐⭐⭐⭐)
- Auteur + rôle

**À modifier :**
- Textes des avis
- Noms des clients
- Rôles (Touriste, Famille, etc.)

### Google Maps
- Carte intégrée Bafoussam
- 3 cards d'infos (Tél, Localisation, WhatsApp)

**À modifier :**
- Code d'embed Google Maps
- Texte des infos
- Coordonnées

### CTA Section
- Section d'appel à l'action
- Gradient or/rouge
- Bouton principal

**À modifier :**
- Texte du titre et paragraphe
- Texte du bouton

### Footer
- 4 colonnes responsive
- Liens rapides
- Contact
- Social media
- Copyright

**À modifier :**
- Description de l'hôtel
- Liens dans chaque colonne
- Social links (actuellement #)
- Texte copyright

### Floating WhatsApp
- Bouton flottant bas-droit
- Animation pulse
- Toujours visible

**À modifier :**
- Emoji (actuellement 💬)
- Position (CSS)
- Animation

---

## 🔧 CONFIGURATION TECHNIQUE

### URLs WhatsApp
Format standard :
```
https://wa.me/237658534464?text=Message%20personnalisé
```

Pour les remplacer globalement, utilisez Find & Replace (Ctrl+H) :
- Cherchez : `237658534464`
- Remplacez par : Votre numéro

### Images WebP
Optimisation automatique avec picture element :
```html
<picture>
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="Description">
</picture>
```

Créez des WebP avec :
- Online : convertio.co, cloud-convert.com
- Local : ImageMagick, XnConvert

### CSS Variables
Tous les espacements et couleurs utilisent des variables root :
- `--spacing-xs` à `--spacing-2xl`
- `--font-size-xs` à `--font-size-4xl`
- `--primary-*` pour couleurs
- `--transition-*` pour animations

Modifiez-les une seule fois pour tout changer !

### Responsive Design
Breakpoints définis :
- Desktop : >1200px (layout full)
- Tablette : 768px - 1200px (grid adapté)
- Mobile : <768px (hamburger menu, single column)
- Petit mobile : <480px (fonts + spacing réduit)

---

## ⚡ OPTIMISATIONS INCLUSES

### Performance
✅ **Lazy Loading** - Images chargées à la demande
✅ **Debouncing** - Scroll/resize optimisés
✅ **Intersection Observer** - Animations au scroll
✅ **GPU Acceleration** - Transform/opacity pour fluidité
✅ **Minification Ready** - Code prêt pour minification
✅ **Scroll Progress Bar** - Indicateur visuel

### Accessibilité
✅ `aria-label` sur boutons
✅ Sémantique HTML5 complète
✅ Contraste suffisant (WCAG AA)
✅ Support préfers-reduced-motion
✅ Navigation au clavier fonctionnelle

### Référencement (SEO)
✅ Meta description
✅ Titres hiérarchiques (H1-H3)
✅ Alt text sur images
✅ URLs sémantiques (ids)
✅ Open Graph ready (à compléter)

---

## 🐛 DÉPANNAGE

### Images ne s'affichent pas
1. Vérifiez les chemins : `assets/rooms/room-2.jpg`
2. Vérifiez que les fichiers existent
3. Vérifiez les permissions d'accès
4. Utilisez un serveur local (pas file://)

### Menu hamburger ne fonctionne pas
1. Vérifiez que `js/main.js` est chargé
2. Ouvrez la console (F12) et vérifiez les erreurs
3. Vérifiez les IDs : `hamburger`, `nav`, `header`

### WhatsApp links ne fonctionnent pas
1. Vérifiez le format : `https://wa.me/[NUMÉRO]`
2. Vérifiez que le numéro commence par code pays (+237)
3. Testez sur mobile (desktop peut demander app)

### Animations à saccades
1. Vérifiez le navigateur (utilise Chrome/Firefox récent)
2. Vérifiez `prefers-reduced-motion` en settings
3. Réduisez les transitions en CSS si device lent

### Google Maps ne charge pas
1. Vérifiez l'iframe embed code
2. Vérifiez la coordonnée/zoom
3. Vérifiez le CORS (cross-origin)

---

## 📱 TEST MOBILE

### Tester localement
1. Ouvrez `index.html` dans Firefox/Chrome
2. Appuyez sur F12 (DevTools)
3. Cliquez l'icone "Toggle device toolbar"
4. Sélectionnez mobile device (iPhone, Samsung, etc.)
5. Testez les interactions

### Tester sur appareil réel
1. Hébergez le site (GitHub Pages, Netlify, etc.)
2. Scannez le QR code ou accédez par URL
3. Testez tous les boutons, scroll, menu

---

## 🚢 DÉPLOIEMENT

### Option 1 : GitHub Pages (Gratuit)
1. Créez un repo GitHub
2. Poussez les fichiers
3. Activez Pages dans settings
4. Votre site est live !

### Option 2 : Netlify (Gratuit)
1. Connectez votre repo GitHub
2. Configurez build settings (pas nécessaire ici)
3. Déployez en un clic
4. Obtenu un domaine gratuit

### Option 3 : Hébergement web (Payant)
1. Loué un hébergement
2. Uploadez les fichiers par FTP
3. Configurez le domaine
4. Site online !

---

## 📝 CHECKLIST PRE-LANCEMENT

- [ ] Images remplacées (JPG + WebP)
- [ ] Tous les prix vérifiés et actualisés
- [ ] Numéro WhatsApp changé
- [ ] Textes personnalisés (descriptions, etc.)
- [ ] Couleurs de la palette modifiées (optionnel)
- [ ] Logo/branding adapté
- [ ] Google Maps embed actualisé
- [ ] Testimonials changés
- [ ] Services listés correspondent à l'hôtel
- [ ] Footer avec infos correctes
- [ ] Testé sur mobile (2-3 appareils)
- [ ] Testé tous les CTAs/buttons
- [ ] Testé le menu hamburger
- [ ] Vérifiés les liens internes
- [ ] Performance testée (Google Pagespeed)

---

## 🎓 ASTUCES

### Accélérer encore plus les images
```bash
# Via ImageMagick
convert input.jpg -quality 80 -strip output.webp
```

### Ajouter des icônes
Les icônes utilisées sont des emoji (👑, 💎, ⭐, etc.) pour :
- Compatibilité universelle
- Pas de dépendance externe
- Taille minimale

Pour des icônes SVG, remplacez les emoji par `<svg>`.

### Ajouter des sections
1. Copiez une section existante
2. Changez l'id unique
3. Mettez à jour le contenu
4. Ajoutez le lien dans le header nav
5. Ajoutez le CSS responsive si needed

### Ajouter une animation personnalisée
```css
@keyframes monAnimation {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.ma-classe {
    animation: monAnimation 0.5s ease-out;
}
```

---

## 📞 SUPPORT

Pour toute question ou modification :
1. Consultez ce guide d'abord
2. Vérifiez la console du navigateur (F12)
3. Testez avec un autre navigateur
4. Contactez le développeur

---

**Version :** 1.0 - Premium
**Dernière mise à jour :** December 2024
**Créé pour :** Hôtel Cergy Pontoise, Bafoussam, Cameroun

🎄 Joyeuses fêtes ! 🎄
