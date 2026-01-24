# 🔒 Analyse de Sécurité - Portfolio

## ✅ Points Forts Actuels

### Authentification
- **Laravel Sanctum** : Utilisation d'un système de tokens moderne et sécurisé
- **Hashing BCrypt** : Les mots de passe sont hashés avec `Hash::make()` (bcrypt par défaut)
- **Validation backend** : Emails uniques, mots de passe min 6 caractères, confirmation obligatoire
- **Protection CSRF** : Laravel protège automatiquement contre les attaques CSRF
- **Token Bearer** : Transmission sécurisée via headers HTTP (pas en URL)

### Routes API
- **Séparation public/admin** : Routes admin protégées par `auth:sanctum` middleware
- **Pas d'accès direct aux données sensibles** : Les endpoints CRUD sont protégés

### Frontend
- **Validation côté client** : Regex email, longueur mot de passe, confirmation
- **Messages d'erreur génériques** : Pas de fuite d'informations sensibles côté client
- **Token stocké localement** : localStorage pour persistance entre sessions

## ⚠️ Risques Identifiés et Recommandations

### 1. Stockage du Token (Priorité HAUTE)
**Risque** : Token dans `localStorage` vulnérable aux attaques XSS
```javascript
// ❌ Actuel
localStorage.setItem('authToken', token);
```

**Recommandations** :
- **Court terme** : Garder localStorage mais ajouter `httpOnly` cookies Laravel
- **Moyen terme** : Migrer vers cookies httpOnly uniquement (plus sécurisé)
- **Ajout immédiat** : Expiration du token (TTL)

**Action** : Ajouter dans `config/sanctum.php` :
```php
'expiration' => 60, // Token expire après 60 minutes
```

### 2. Mot de Passe (Priorité MOYENNE)
**Problème** : Exigences trop faibles (6 caractères minimum)

**Recommandations** :
```php
// Backend : AuthController.php
'password' => 'required|min:8|confirmed|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
```

**Messages personnalisés** :
- Min 8 caractères
- 1 majuscule
- 1 minuscule  
- 1 chiffre

### 3. Rate Limiting (Priorité HAUTE)
**Problème** : Pas de limitation des tentatives de connexion (risque brute force)

**Action** : Ajouter dans `routes/api.php` :
```php
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1'); // 5 tentatives par minute
Route::post('/register', [AuthController::class, 'register'])
    ->middleware('throttle:3,60'); // 3 inscriptions par heure
```

### 4. Headers de Sécurité (Priorité MOYENNE)
**Manquant** : Headers HTTP de sécurité

**Action** : Créer middleware `SecurityHeaders.php` :
```php
$response->headers->set('X-Content-Type-Options', 'nosniff');
$response->headers->set('X-Frame-Options', 'DENY');
$response->headers->set('X-XSS-Protection', '1; mode=block');
$response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
```

### 5. CORS (Priorité HAUTE en Production)
**Actuel** : `withCredentials: true` dans api.js

**À vérifier** : `config/cors.php` doit limiter les origines :
```php
// ❌ Dangereux en production
'allowed_origins' => ['*'],

// ✅ Correct
'allowed_origins' => ['http://localhost:5173', 'https://votre-domaine.com'],
```

### 6. Logging et Monitoring (Priorité BASSE)
**Manquant** : Logs des tentatives de connexion échouées

**Recommandation** : Ajouter dans `login()` :
```php
if (!Auth::attempt($credentials)) {
    Log::warning('Tentative de connexion échouée', [
        'email' => $request->email,
        'ip' => $request->ip(),
    ]);
    return response()->json(['message' => 'Identifiants incorrects'], 401);
}
```

### 7. Validation Email (Priorité BASSE)
**Amélioration possible** : Vérification email réel

**Action future** : Ajouter email de confirmation :
```php
'email' => 'required|email:rfc,dns|unique:users,email',
```

### 8. Protection contre l'énumération (Priorité MOYENNE)
**Problème** : Message "Cet email est déjà utilisé" révèle les emails existants

**Solution** : Message générique en production :
```php
// En développement : ok pour debug
'email.unique' => 'Cet email est déjà utilisé',

// En production : 
'email.unique' => 'Une erreur s\'est produite',
```

## 📋 Checklist Avant Production

- [ ] Activer expiration token Sanctum (60 min)
- [ ] Ajouter rate limiting sur login/register
- [ ] Renforcer règles mot de passe (8 car, maj, min, chiffre)
- [ ] Configurer CORS strictement (pas de wildcard)
- [ ] Ajouter headers de sécurité HTTP
- [ ] Logger tentatives de connexion échouées
- [ ] Vérifier HTTPS forcé en production
- [ ] Variables d'environnement sécurisées (.env pas commité)
- [ ] Désactiver mode debug Laravel (`APP_DEBUG=false`)
- [ ] Nettoyer les logs sensibles

## 🛡️ Bonnes Pratiques Appliquées

✅ Séparation frontend/backend  
✅ Tokens Bearer (pas de sessions)  
✅ Validation input côté serveur  
✅ Hashing bcrypt automatique  
✅ Middleware auth Sanctum  
✅ Messages d'erreur génériques  
✅ HTTPS recommandé en production  

## 📚 Ressources

- [Laravel Sanctum Docs](https://laravel.com/docs/sanctum)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Guide CNIL Sécurité](https://www.cnil.fr/fr/securite-des-mots-de-passe)
