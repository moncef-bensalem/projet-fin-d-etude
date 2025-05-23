# Implémentation de la sécurité des mots de passe ISO/IEC 27034-1

## Introduction

Cette documentation détaille l'implémentation technique des exigences de sécurité des mots de passe conformément à la norme ISO/IEC 27034-1 dans le projet PENVENTORY. L'objectif est de fournir une protection robuste contre les attaques par force brute, dictionnaire et autres vulnérabilités liées aux mots de passe.

## Architecture

L'implémentation est structurée autour de trois composants principaux :

1. **Module de validation des mots de passe** (`lib/password-validator.js`) : Contient les règles et la logique de validation
2. **Composant d'interface utilisateur** (`components/ui/password-strength-meter.jsx`) : Affiche la force du mot de passe à l'utilisateur
3. **Intégration dans les APIs** : Valide les mots de passe côté serveur

### Diagramme d'architecture

```
┌────────────────────┐     ┌─────────────────────┐     ┌───────────────────┐
│                    │     │                     │     │                   │
│ Interface          │     │ Validation          │     │ APIs serveur      │
│ utilisateur        │────>│ côté client         │────>│ (validation côté  │
│ (formulaires)      │     │ (temps réel)        │     │ serveur)          │
│                    │     │                     │     │                   │
└────────────────────┘     └─────────────────────┘     └───────────────────┘
                                    │                           │
                                    │                           │
                                    ▼                           ▼
                           ┌─────────────────────┐     ┌───────────────────┐
                           │                     │     │                   │
                           │ Module de           │     │ Journalisation    │
                           │ validation          │     │ des événements    │
                           │ (règles & logique)  │     │ (sécurité)        │
                           │                     │     │                   │
                           └─────────────────────┘     └───────────────────┘
```

## Module de validation des mots de passe

Le module `lib/password-validator.js` constitue le cœur de la logique de validation et d'évaluation des mots de passe.

### Configuration des règles

Les règles sont définies dans une constante `PASSWORD_RULES` :

```javascript
const PASSWORD_RULES = {
  minLength: 10,             // Longueur minimale
  maxLength: 128,            // Longueur maximale
  minLowercase: 1,           // Minimum de lettres minuscules
  minUppercase: 1,           // Minimum de lettres majuscules
  minNumbers: 1,             // Minimum de chiffres
  minSymbols: 1,             // Minimum de caractères spéciaux
  maxConsecutiveChars: 3,    // Maximum de caractères consécutifs identiques
  // ...
};
```

### Fonctions principales

Le module exporte plusieurs fonctions :

- `validatePassword(password)` : Validation simple (retourne vrai/faux)
- `evaluatePasswordStrength(password)` : Évaluation du niveau de force
- `getPasswordScore(password)` : Calcul du score numérique (0-100)
- `validatePasswordWithDetails(password)` : Validation détaillée avec liste de problèmes
- `getPasswordCriteria()` : Liste des critères à satisfaire
- `checkPasswordCriteria(password)` : Vérifie quels critères sont satisfaits
- `logPasswordEvent(event, data)` : Journalisation des événements liés aux mots de passe

### Calcul du score

Le score de force du mot de passe (0-100) est calculé selon les critères suivants :

1. **Longueur** : Jusqu'à 25 points (2 points par caractère, max 25)
2. **Complexité** : Jusqu'à 40 points (présence de minuscules, majuscules, chiffres, symboles)
3. **Variété de caractères** : Jusqu'à 10 points (nombre de caractères uniques)
4. **Distribution des types** : Jusqu'à 15 points (répartition des différents types de caractères)
5. **Pénalités** : Déduction jusqu'à 50 points pour les problèmes détectés

## Composant d'interface utilisateur

Le composant `components/ui/password-strength-meter.jsx` visualise la force du mot de passe et guide l'utilisateur pour créer un mot de passe fort.

### Fonctionnalités

- Barre de progression colorée basée sur le score
- Indication textuelle de la force du mot de passe
- Liste des critères avec indicateurs visuels (✓/✗)
- Liste des problèmes détectés

### Versions du composant

Deux versions sont disponibles :
- `PasswordStrengthMeter` : Version complète avec tous les détails
- `SimplePasswordStrengthMeter` : Version simplifiée pour les espaces restreints

### Exemple d'utilisation

```jsx
import PasswordStrengthMeter from "@/components/ui/password-strength-meter";

// Dans un composant React
function PasswordForm() {
  const [password, setPassword] = useState("");
  
  return (
    <div>
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordStrengthMeter password={password} />
    </div>
  );
}
```

## Intégration dans les formulaires

### Formulaire d'inscription

Le formulaire d'inscription (`app/register/seller/page.jsx`) utilise le composant pour fournir un feedback en temps réel :

1. Observer les changements du mot de passe avec `useEffect` et `watch` de react-hook-form
2. Valider le mot de passe à chaque changement
3. Afficher l'indicateur de force
4. Empêcher la soumission si le mot de passe est invalide

```jsx
// Dans le formulaire d'inscription
useEffect(() => {
  const subscription = watch((value, { name }) => {
    if (name === "password") {
      setPassword(value.password || "");
      setIsPasswordValid(validatePassword(value.password || ""));
    }
  });
  return () => subscription.unsubscribe();
}, [watch]);
```

## Validation côté serveur

La validation est également effectuée côté serveur pour garantir la sécurité même si la validation côté client est contournée.

### API d'inscription

Dans `app/api/auth/register/seller/route.js`, le mot de passe est validé avant la création du compte :

```javascript
// Valider la force du mot de passe côté serveur
const passwordIssues = validatePasswordWithDetails(password);
if (passwordIssues.length > 0) {
  logPasswordEvent("password_validation_failed", {
    email,
    issues: passwordIssues.length,
  });
  
  return NextResponse.json(
    { 
      message: "Le mot de passe ne respecte pas les critères de sécurité",
      issues: passwordIssues 
    },
    { status: 400 }
  );
}
```

### Stockage sécurisé

Les mots de passe sont hachés avec bcrypt avant stockage :

```javascript
// Hasher le mot de passe avec un coût élevé (12 rounds)
const hashedPassword = await bcrypt.hash(password, 12);
```

## Journalisation et sécurité

La fonction `logPasswordEvent` enregistre les événements liés aux mots de passe pour la détection et l'analyse des incidents de sécurité.

### Types d'événements journalisés

- `password_creation_attempt` : Tentative de création de mot de passe
- `password_creation_success` : Création réussie
- `password_creation_failed` : Échec de création
- `password_validation_failed` : Échec de validation
- `user_created` : Utilisateur créé
- `verification_email_sent` : Email de vérification envoyé

### Sécurité des journaux

La fonction supprime automatiquement les données sensibles (comme le mot de passe lui-même) avant la journalisation :

```javascript
const sanitizedData = { ...data };
if (sanitizedData.password) {
  delete sanitizedData.password;
}
```

## Tests

Des tests unitaires exhaustifs sont disponibles dans `lib/__tests__/password-validator.test.js` pour vérifier :

- La validation des mots de passe valides et invalides
- L'évaluation correcte de la force
- L'identification précise des problèmes

## Personnalisation

Pour modifier les règles de validation, ajustez les valeurs dans l'objet `PASSWORD_RULES` dans `lib/password-validator.js`.

### Exemples de personnalisation

```javascript
// Augmenter la longueur minimale à 12 caractères
PASSWORD_RULES.minLength = 12;

// Exiger 2 caractères spéciaux au lieu d'un seul
PASSWORD_RULES.minSymbols = 2;

// Ajouter un nouveau mot interdit
PASSWORD_RULES.prohibitedWords.push("nouveaumotinterdit");
```

## Conformité à la norme ISO/IEC 27034-1

Cette implémentation respecte les principes de la norme ISO/IEC 27034-1 en matière de sécurité des applications, notamment :

1. **Identification des menaces** : Protection contre les attaques par force brute, dictionnaire, etc.
2. **Contrôles de sécurité** : Règles strictes de validation, feedback utilisateur, validation côté serveur
3. **Séparation des préoccupations** : Module distinct pour la logique de validation
4. **Journalisation** : Enregistrement des événements de sécurité
5. **Interface utilisateur sécurisée** : Feedback en temps réel pour guider l'utilisateur

## Conclusion

Cette implémentation offre une solution complète pour la gestion sécurisée des mots de passe dans PENVENTORY, assurant la conformité avec les normes de sécurité tout en offrant une expérience utilisateur intuitive.
