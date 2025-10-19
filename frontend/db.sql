-- Base : USERS (table mère)
CREATE TABLE users (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom               VARCHAR(120)        NOT NULL,
  prenom            VARCHAR(120)        NULL,
  email             VARCHAR(150)        NOT NULL,
  telephone         VARCHAR(50)         NULL,
  statut            ENUM('actif','inactif') NOT NULL DEFAULT 'actif',
  password          VARCHAR(255)        NOT NULL,
  adresse_ligne1    VARCHAR(150)        NULL,
  adresse_ligne2    VARCHAR(150)        NULL,
  ville             VARCHAR(100)        NULL,
  code_postal       VARCHAR(20)         NULL,
  pays              VARCHAR(100)        NULL,
  last_login_at     DATETIME            NULL,
  created_at        TIMESTAMP           NULL,
  updated_at        TIMESTAMP           NULL,
  deleted_at        TIMESTAMP           NULL,
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_statut (statut),
  KEY idx_users_ville (ville)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sous-type 1 : EMPLOYES (hérite de users)
-- PK = FK vers users.id (1:1)
CREATE TABLE employes (
  user_id           BIGINT UNSIGNED     NOT NULL,
  matricule         VARCHAR(50)         NOT NULL,
  poste             VARCHAR(120)        NULL,
  departement       VARCHAR(120)        NULL,
  type_contrat      ENUM('CDI','CDD','Freelance','Stage','Autre') NOT NULL DEFAULT 'CDI',
  date_embauche     DATE                NULL,
  date_fin_contrat  DATE                NULL,
  salaire_base      DECIMAL(12,2)       NULL,
  mode_paiement     ENUM('virement','especes','cheque','autre') DEFAULT 'virement',
  iban_rib          VARCHAR(34)         NULL,
  statut_employe    ENUM('actif','suspendu','sorti') DEFAULT 'actif',
  note_interne      TEXT                NULL,
  created_at        TIMESTAMP           NULL,
  updated_at        TIMESTAMP           NULL,
  PRIMARY KEY (user_id),
  CONSTRAINT fk_employes_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY uq_employes_matricule (matricule),
  KEY idx_employes_departement (departement),
  KEY idx_employes_statut (statut_employe),
  KEY idx_employes_contrat (type_contrat)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sous-type 2 : CLIENTS (hérite de users)
-- PK = FK vers users.id (1:1)
CREATE TABLE clients (
  user_id           BIGINT UNSIGNED     NOT NULL,
  type_personne     ENUM('personne','societe') NOT NULL DEFAULT 'personne',
  cin               VARCHAR(20)         NULL,      -- pour personne physique
  date_naissance    DATE                NULL,
  raison_sociale    VARCHAR(180)        NULL,      -- pour société
  ice               VARCHAR(30)         NULL,      -- identifiant commun entreprise (si Maroc)
  identifiant_fiscal VARCHAR(50)        NULL,
  secteur_activite  VARCHAR(150)        NULL,
  source_acquisition VARCHAR(100)       NULL,      -- origine du lead/opportunité
  statut_client     ENUM('prospect','actif','inactif','blacklist') DEFAULT 'prospect',
  note_client       TEXT                NULL,
  created_at        TIMESTAMP           NULL,
  updated_at        TIMESTAMP           NULL,
  PRIMARY KEY (user_id),
  CONSTRAINT fk_clients_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  KEY idx_clients_type (type_personne),
  KEY idx_clients_statut (statut_client),
  UNIQUE KEY uq_clients_ice (ice),
  UNIQUE KEY uq_clients_cin (cin)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sous-type 3 : PROPRIETAIRES (hérite de users)
-- PK = FK vers users.id (1:1)
CREATE TABLE proprietaires (
  user_id            BIGINT UNSIGNED     NOT NULL,
  type_personne      ENUM('personne','societe') NOT NULL DEFAULT 'personne',
  cin                VARCHAR(20)         NULL,      -- personne
  raison_sociale     VARCHAR(180)        NULL,      -- société
  ice                VARCHAR(30)         NULL,      -- société (Maroc)
  identifiant_fiscal VARCHAR(50)         NULL,
  rib_iban           VARCHAR(34)         NULL,
  mode_versement     ENUM('virement','cheque','autre') DEFAULT 'virement',
  preference_contact ENUM('email','telephone','courrier','app') DEFAULT 'email',
  statut_proprietaire ENUM('actif','inactif') DEFAULT 'actif',
  note_proprietaire  TEXT                NULL,
  created_at         TIMESTAMP           NULL,
  updated_at         TIMESTAMP           NULL,
  PRIMARY KEY (user_id),
  CONSTRAINT fk_proprietaires_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  KEY idx_prop_type (type_personne),
  KEY idx_prop_statut (statut_proprietaire),
  UNIQUE KEY uq_prop_ice (ice),
  UNIQUE KEY uq_prop_cin (cin),
  UNIQUE KEY uq_prop_rib (rib_iban)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- =========================
-- 1) UNITÉS LOCATIVES
-- =========================
CREATE TABLE unites_locatives (
  id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  reference           VARCHAR(80) NOT NULL,                 -- identifiant fonctionnel unique (ex: "APT-B12")
  type_unite          ENUM('appartement','local','terrain','bureau','autre') NOT NULL,
  statut              ENUM('disponible','occupe','travaux','reserve','retire') NOT NULL DEFAULT 'disponible',
  adresse_ligne1      VARCHAR(150) NULL,
  adresse_ligne2      VARCHAR(150) NULL,
  ville               VARCHAR(100) NULL,
  code_postal         VARCHAR(20)  NULL,
  surface_m2          DECIMAL(10,2) NULL,
  etage               VARCHAR(20)  NULL,
  cadastre_ref        VARCHAR(80)  NULL,
  dpe_classe          VARCHAR(5)   NULL,                    -- classe énergétique (optionnel)
  date_mise_service   DATE         NULL,
  description         TEXT         NULL,
  created_at          TIMESTAMP    NULL,
  updated_at          TIMESTAMP    NULL,
  UNIQUE KEY uq_unites_reference (reference),
  KEY idx_unites_type_statut (type_unite, statut),
  KEY idx_unites_ville (ville)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ===========================================
-- 2) HISTORIQUE DES ADRESSES (optionnel)
--    Si vous souhaitez historiser toute évolution d'adresse
-- ===========================================
CREATE TABLE adresses_unites (
  id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  unite_id            BIGINT UNSIGNED NOT NULL,
  adresse_ligne1      VARCHAR(150) NOT NULL,
  adresse_ligne2      VARCHAR(150) NULL,
  ville               VARCHAR(100) NOT NULL,
  code_postal         VARCHAR(20)  NULL,
  date_debut          DATE NOT NULL,
  date_fin            DATE NULL,                              -- NULL = en cours
  created_at          TIMESTAMP NULL,
  updated_at          TIMESTAMP NULL,
  CONSTRAINT fk_adru_unite
    FOREIGN KEY (unite_id) REFERENCES unites_locatives(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  KEY idx_adru_unite_periode (unite_id, date_debut, date_fin)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ==========================================================
-- 3) ÉVÉNEMENTS DE PROPRIÉTÉ (journal des mutations)
--    héritage, vente, donation, rectification, etc.
-- ==========================================================
CREATE TABLE evenements_propriete (
  id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  unite_id            BIGINT UNSIGNED NOT NULL,
  type_evenement      ENUM('acquisition','cession','heritage','donation','rectification','autre') NOT NULL,
  date_evenement      DATE NOT NULL,
  description         TEXT NULL,                               -- détails libres
  piece_justif_doc    VARCHAR(255) NULL,                        -- id/chemin GED si besoin
  enregistre_par      BIGINT UNSIGNED NULL,                     -- FK -> users.id (employé)
  created_at          TIMESTAMP NULL,
  updated_at          TIMESTAMP NULL,
  CONSTRAINT fk_ep_unite
    FOREIGN KEY (unite_id) REFERENCES unites_locatives(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  -- si vous voulez lier l’auteur (employé) :
  -- CONSTRAINT fk_ep_user FOREIGN KEY (enregistre_par) REFERENCES users(id) ON DELETE SET NULL,
  KEY idx_ep_unite_date (unite_id, date_evenement)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================================================
-- 4) PARTS DE COPROPRIÉTÉ PAR PÉRIODE (fractions & pourcentage)
--    -> Somme des parts actives = 100% pour une unité donnée à une date donnée
-- =====================================================================================
CREATE TABLE unites_proprietaires (
  id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  unite_id            BIGINT UNSIGNED NOT NULL,
  proprietaire_user_id BIGINT UNSIGNED NOT NULL,               -- FK -> proprietaires.user_id
  part_fraction       VARCHAR(30)  NOT NULL,                    -- ex. "1/3", "2/5" (forme lisible)
  part_num            INT UNSIGNED NOT NULL,                    -- numérateur (ex. 1)
  part_den            INT UNSIGNED NOT NULL,                    -- dénominateur (ex. 3)
  part_pct            DECIMAL(10,6) GENERATED ALWAYS AS (part_num / NULLIF(part_den,0)) STORED,
  date_debut          DATE NOT NULL,                            -- début d'effet
  date_fin            DATE NULL,                                -- NULL = en cours
  source_evenement_id BIGINT UNSIGNED NULL,                     -- FK -> evenements_propriete.id
  created_at          TIMESTAMP NULL,
  updated_at          TIMESTAMP NULL,
  CONSTRAINT fk_up_unite
    FOREIGN KEY (unite_id) REFERENCES unites_locatives(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  -- la table proprietaires (déjà créée) a PK = user_id
  CONSTRAINT fk_up_proprietaire
    FOREIGN KEY (proprietaire_user_id) REFERENCES proprietaires(user_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_up_event
    FOREIGN KEY (source_evenement_id) REFERENCES evenements_propriete(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT chk_up_den_pos CHECK (part_den > 0),
  KEY idx_up_unite_periode (unite_id, date_debut, date_fin),
  KEY idx_up_proprietaire (proprietaire_user_id),
  UNIQUE KEY uq_up_unite_prop_start (unite_id, proprietaire_user_id, date_debut)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- NOTE: le contrôle "somme des parts = 1.000000" pour une même unité et période
-- se fait via logique applicative ou TRIGGER (si vous le souhaitez).
-- La contrainte d’absence de chevauchement pour un même propriétaire/unité
-- est à gérer côté app ou trigger (selon vos préférences).


-- ========================================================
-- 5) BAUX (lien unité ↔ locataire) pour alimenter la
--    liquidation des loyers par part de copropriété
-- ========================================================
CREATE TABLE baux (
  id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  unite_id            BIGINT UNSIGNED NOT NULL,
  locataire_user_id   BIGINT UNSIGNED NOT NULL,                 -- FK -> clients.user_id
  type_bail           ENUM('habitation','commercial','professionnel','autre') NOT NULL,
  date_effet          DATE NOT NULL,
  date_fin            DATE NULL,
  periodicite         ENUM('mensuelle','trimestrielle','annuelle') NOT NULL DEFAULT 'mensuelle',
  loyer_ht            DECIMAL(12,2) NOT NULL DEFAULT 0,
  provisions_charges  DECIMAL(12,2) NOT NULL DEFAULT 0,
  depot_garantie      DECIMAL(12,2) NULL,
  indice_revision     VARCHAR(50) NULL,                          -- ex: IRL, ICC, etc.
  statut              ENUM('brouillon','signe','actif','preavis','resilie') NOT NULL DEFAULT 'actif',
  numero_contrat      VARCHAR(80) NULL,
  created_at          TIMESTAMP NULL,
  updated_at          TIMESTAMP NULL,
  CONSTRAINT fk_baux_unite
    FOREIGN KEY (unite_id) REFERENCES unites_locatives(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_baux_locataire
    FOREIGN KEY (locataire_user_id) REFERENCES clients(user_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  KEY idx_baux_unite (unite_id),
  KEY idx_baux_locataire (locataire_user_id),
  KEY idx_baux_statut (statut),
  UNIQUE KEY uq_baux_numero (numero_contrat)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =========================================================
-- 6) ENCAISSEMENTS LOYERS (base pour liquidations)
--    -> Les montants encaissés sont répartis par parts actives
-- =========================================================
CREATE TABLE encaissements_loyers (
  id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  bail_id             BIGINT UNSIGNED NOT NULL,
  date_encaissement   DATE NOT NULL,
  montant_encaisse    DECIMAL(12,2) NOT NULL,
  mode_paiement       ENUM('virement','cheque','especes','tpe','prelevement','autre') NOT NULL DEFAULT 'virement',
  reference_paiement  VARCHAR(120) NULL,
  created_at          TIMESTAMP NULL,
  updated_at          TIMESTAMP NULL,
  CONSTRAINT fk_enc_bail
    FOREIGN KEY (bail_id) REFERENCES baux(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  KEY idx_enc_bail_date (bail_id, date_encaissement)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE documents (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type_liaison    ENUM('client','proprietaire','unite','bail','encaissement','evenement','autre') NOT NULL,
  liaison_id      BIGINT UNSIGNED NOT NULL,
  titre           VARCHAR(180) NOT NULL,
  path            VARCHAR(255) NOT NULL,     -- chemin du fichier (ex: uploads/docs/contrat.pdf)
  note            TEXT NULL,
  created_at      TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_documents_liaison (type_liaison, liaison_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
