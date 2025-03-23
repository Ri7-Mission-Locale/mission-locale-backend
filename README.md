# 🚀 Mission Locale - Backend

Partie backend du projet de l'application web de la Mission Locale du Pays d'Aubagne.

---

## 📌 Sommaire

**Routes:**

- [👥 Utilisateurs](#-utilisateurs)
- [🙋‍♂️ Profil](#-profil)
- [🔐 Authentification](#-authentification)

---

## 👥 Utilisateurs

CRUD pour la gestion des utilisateurs depuis un compte **admin**.

| Méthode    | Route        | Description                                                      |
| ---------- | ------------ | ---------------------------------------------------------------- |
| **GET**    | `/users`     | 🔍 Récupérer la liste des utilisateurs _(filtrage & pagination)_ |
| **GET**    | `/users/:id` | 🔎 Récupérer un utilisateur par son **ID**                       |
| **PATCH**  | `/users/:id` | ✏️ Modifier un utilisateur                                       |
| **DELETE** | `/users/:id` | ❌ Supprimer un utilisateur                                      |

---

## 🙋‍♂️ Profil

Gestion du **profil utilisateur** _(actions personnelles, sans besoin d'accès admin)_.

| Méthode    | Route      | Description                        |
| ---------- | ---------- | ---------------------------------- |
| **GET**    | `/profile` | 🆔 Récupérer **son propre profil** |
| **PATCH**  | `/profile` | ✍️ Modifier **son profil**         |
| **DELETE** | `/profile` | 🗑️ Supprimer **son propre compte** |

---

## 🔐 Authentification

Gestion de l'**authentification des utilisateurs** _(inscription, connexion, sécurité...)_.

| Méthode  | Route                | Description                                                    |
| -------- | -------------------- | -------------------------------------------------------------- |
| **POST** | `/auth/register`     | 📝 **Inscription** d’un nouvel utilisateur                     |
| **POST** | `/auth/login`        | 🔑 **Connexion** & récupération du token **JWT**               |
| **POST** | `/auth/logout`       | 🚪 **Déconnexion** de l'utilisateur                            |
| **POST** | `/auth/force-logout` | 🚪 **Déconnexion** de l'utilisateur sur **tous ses appareils** |
| **POST** | `/auth/refresh`      | ♻️ **Rafraîchissement** du token **JWT**                       |
