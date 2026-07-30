# Guide de déploiement — InterventionHub

Ce document décrit la procédure générale permettant de déployer InterventionHub dans un environnement de production.

Les détails peuvent varier selon l’infrastructure choisie : serveur Linux, VPS, hébergement mutualisé ou plateforme cloud.

## 1. Prérequis du serveur

L’environnement doit fournir :

- PHP 8.2 ou supérieur ;
- Composer 2 ;
- MySQL ou MariaDB ;
- serveur Apache ou Nginx ;
- Node.js 22 et npm pour compiler le frontend ;
- accès à une ligne de commande ;
- certificat HTTPS ;
- service SMTP ;
- stockage persistant pour les pièces jointes ;
- système de sauvegarde.

### Extensions PHP

Les principales extensions nécessaires sont :

```text
bcmath
ctype
curl
fileinfo
json
mbstring
openssl
pdo
pdo_mysql
tokenizer
xml
zip
```

## 2. Récupérer le projet

```bash
git clone https://github.com/TEKIMADJE/InterventionHub.git
cd InterventionHub
```

Pour une mise à jour ultérieure :

```bash
git pull origin master
```

## 3. Installer les dépendances PHP

En production :

```bash
composer install \
    --no-dev \
    --prefer-dist \
    --optimize-autoloader \
    --no-interaction
```

Ne pas exécuter `composer update` directement sur le serveur de production.

## 4. Créer le fichier d’environnement

```bash
cp .env.example .env
```

Le fichier `.env` contient les paramètres propres au serveur et ne doit jamais être envoyé sur GitHub.

## 5. Configuration générale

Exemple de configuration :

```env
APP_NAME=InterventionHub
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://interventionhub.example.com

APP_LOCALE=fr
APP_FALLBACK_LOCALE=fr
APP_FAKER_LOCALE=fr_FR

LOG_CHANNEL=stack
LOG_LEVEL=warning
```

Générer la clé Laravel une seule fois :

```bash
php artisan key:generate
```

La valeur `APP_KEY` doit être sauvegardée et conservée. La changer après le déploiement peut rendre certaines données chiffrées illisibles.

## 6. Configuration de la base de données

Créer une base et un utilisateur MySQL dédiés.

Exemple :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=interventionhub
DB_USERNAME=interventionhub_user
DB_PASSWORD=mot_de_passe_securise
```

L’utilisateur MySQL ne doit avoir accès qu’à la base InterventionHub.

## 7. Exécuter les migrations

Pour une première installation ou une mise à jour :

```bash
php artisan migrate --force
```

Initialiser les rôles, catégories, priorités et statuts :

```bash
php artisan db:seed --force
```

Ne jamais exécuter cette commande en production :

```bash
php artisan migrate:fresh
```

Elle supprimerait toutes les tables et toutes les données.

Le seeder `DemoUserSeeder` est réservé aux démonstrations et ne doit pas être exécuté sur une installation réelle sans autorisation.

## 8. Configurer les emails

Exemple SMTP :

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=adresse@example.com
MAIL_PASSWORD=mot_de_passe_smtp
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=adresse@example.com
MAIL_FROM_NAME="${APP_NAME}"
```

Tester notamment :

- vérification d’adresse email ;
- réinitialisation du mot de passe ;
- adresse et nom de l’expéditeur.

Les identifiants SMTP doivent rester dans `.env`.

## 9. Configurer le stockage

Créer le lien public :

```bash
php artisan storage:link
```

Les dossiers suivants doivent être accessibles en écriture par le serveur web :

```text
storage
bootstrap/cache
```

Exemple sur Linux :

```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

Le propriétaire exact dépend de la configuration du serveur.

Les fichiers utilisateurs doivent être stockés sur un espace persistant et sauvegardé.

## 10. Compiler le frontend

### Compilation sur le serveur

```bash
npm ci
npm run build
```

### Compilation avant transfert

Si Node.js n’est pas disponible sur l’hébergement, le frontend peut être compilé dans un environnement de construction compatible, puis le dossier `public/build` peut être transféré vers le serveur.

Le contenu compilé doit correspondre exactement au commit déployé.

## 11. Optimiser Laravel

Après la configuration :

```bash
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Après toute modification du fichier `.env`, régénérer le cache :

```bash
php artisan config:clear
php artisan config:cache
```

## 12. Configurer le serveur web

Le répertoire public du domaine doit pointer vers :

```text
InterventionHub/public
```

Il ne doit jamais pointer vers la racine complète du projet.

### Exemple Nginx

```nginx
server {
    listen 80;
    server_name interventionhub.example.com;

    root /var/www/interventionhub/public;
    index index.php;

    client_max_body_size 6M;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Cet exemple doit être adapté à la version de PHP et à l’organisation du serveur.

### Apache

Avec Apache :

- activer `mod_rewrite` ;
- autoriser les règles `.htaccess` ;
- définir le `DocumentRoot` sur le dossier `public`.

## 13. Activer HTTPS

La production doit obligatoirement utiliser HTTPS.

Après activation, vérifier :

```env
APP_URL=https://interventionhub.example.com
SESSION_SECURE_COOKIE=true
```

Configurer également les cookies et le domaine de session si nécessaire :

```env
SESSION_DOMAIN=interventionhub.example.com
```

## 14. Files d’attente

La V1 peut utiliser :

```env
QUEUE_CONNECTION=database
```

Créer les tables nécessaires si elles ne sont pas encore présentes :

```bash
php artisan queue:table
php artisan migrate --force
```

Lancer un worker :

```bash
php artisan queue:work \
    --sleep=3 \
    --tries=3 \
    --timeout=90
```

En production, le worker doit être surveillé par Supervisor, systemd ou le système proposé par l’hébergeur.

Après un nouveau déploiement :

```bash
php artisan queue:restart
```

## 15. Tâches planifiées

Ajouter une tâche cron exécutée chaque minute :

```cron
* * * * * cd /var/www/interventionhub && php artisan schedule:run >> /dev/null 2>&1
```

Elle permettra d’ajouter ultérieurement des rappels, rapports périodiques et opérations de maintenance.

## 16. Sauvegardes

Prévoir des sauvegardes régulières de :

- la base MySQL ;
- `storage/app` ;
- la configuration de production ;
- la configuration du serveur web.

La sauvegarde du fichier `.env` doit être chiffrée et stockée dans un emplacement sécurisé.

Avant une migration importante :

```bash
mysqldump \
    -u interventionhub_user \
    -p \
    interventionhub \
    > interventionhub_backup.sql
```

La commande doit être adaptée aux règles et outils de l’entreprise.

## 17. Mise à jour de l’application

Procédure générale :

```bash
php artisan down

git pull origin master

composer install \
    --no-dev \
    --prefer-dist \
    --optimize-autoloader \
    --no-interaction

npm ci
npm run build

php artisan migrate --force
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan queue:restart

php artisan up
```

Avant chaque mise à jour :

- vérifier que GitHub Actions est vert ;
- effectuer une sauvegarde ;
- consulter les nouvelles migrations ;
- prévoir une procédure de retour en arrière.

## 18. Vérifications après déploiement

Tester les éléments suivants :

### Accès général

- page d’accueil ;
- connexion et déconnexion ;
- inscription ;
- vérification d’email ;
- réinitialisation du mot de passe ;
- certificat HTTPS.

### Rôles

- Administrateur ;
- Responsable technique ;
- Technicien ;
- Client ;
- interdiction des pages non autorisées ;
- blocage des comptes désactivés.

### Cycle métier

```text
Création
→ notification du responsable
→ affectation
→ notification du technicien et du client
→ démarrage
→ commentaires
→ pièces jointes
→ solution
→ clôture
→ notification finale
```

### Infrastructure

- emails ;
- stockage et téléchargement ;
- permissions des dossiers ;
- journaux Laravel ;
- sauvegardes ;
- worker de file d’attente ;
- tâches planifiées.

## 19. Journaux et diagnostic

Les journaux Laravel se trouvent généralement dans :

```text
storage/logs/laravel.log
```

En production :

```env
APP_DEBUG=false
LOG_LEVEL=warning
```

Ne jamais afficher les détails techniques d’une exception aux utilisateurs finaux.

## 20. Variables à demander à l’entreprise

Avant le déploiement Medyouin, confirmer :

- type d’hébergement ;
- accès SSH ou panneau d’administration ;
- version de PHP ;
- serveur MySQL ;
- domaine ou sous-domaine ;
- certificat SSL ;
- serveur SMTP ;
- emplacement de stockage ;
- stratégie de sauvegarde ;
- responsable technique du serveur ;
- règles internes de sécurité ;
- données autorisées pour la démonstration ;
- identité visuelle officielle.

## 21. Retour en arrière

En cas d’échec :

1. remettre l’application en maintenance ;
2. restaurer la version précédente du code ;
3. restaurer la sauvegarde de la base si nécessaire ;
4. reconstruire les caches ;
5. relancer les workers ;
6. effectuer les tests essentiels ;
7. remettre l’application en ligne.

Les migrations destructives doivent toujours être examinées avant leur exécution.

## 22. Checklist de production

- [ ] GitHub Actions réussi
- [ ] Tests Laravel réussis
- [ ] Audit Composer réussi
- [ ] Audit npm réussi
- [ ] Build Vite réussi
- [ ] `APP_ENV=production`
- [ ] `APP_DEBUG=false`
- [ ] `APP_URL` correct
- [ ] Base MySQL configurée
- [ ] Migrations exécutées
- [ ] HTTPS actif
- [ ] SMTP testé
- [ ] Stockage persistant
- [ ] Permissions vérifiées
- [ ] Sauvegardes activées
- [ ] Worker actif
- [ ] Cron actif
- [ ] Comptes de démonstration sécurisés
- [ ] Recette manuelle terminée