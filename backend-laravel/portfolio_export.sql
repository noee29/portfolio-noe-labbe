-- MySQL dump 10.13  Distrib 8.4.3, for Win64 (x86_64)
--
-- Host: localhost    Database: portfolio
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'No├® Labb├®','noe.labbe29@gmail.com','message de test',1,'2026-01-21 16:24:03','2026-03-29 08:43:42'),(4,'test','test@test.fr','Message test email',0,'2026-04-20 19:06:41','2026-04-20 19:06:41'),(5,'test','test@test.fr','Message de test email',0,'2026-04-20 19:14:51','2026-04-20 19:14:51'),(6,'test','test@test.fr','Message test email !',0,'2026-04-20 19:15:44','2026-04-20 19:15:44'),(7,'test','test@test.fr','Message de test 20/04',0,'2026-04-20 19:22:14','2026-04-20 19:22:14');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formations`
--

DROP TABLE IF EXISTS `formations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `school` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `degree` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `field` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formations`
--

LOCK TABLES `formations` WRITE;
/*!40000 ALTER TABLE `formations` DISABLE KEYS */;
INSERT INTO `formations` VALUES (1,'Universit├® Catholique de Lille','Licence 3','Informatique (EDN)','2025-09-01','2026-06-30','Parcours Data','2026-02-26 13:17:25','2026-02-26 13:17:25'),(2,'Universit├® Catholique de Lille','Licence 2','Informatique (EDN)','2024-09-01','2025-06-30',NULL,'2026-02-26 13:17:25','2026-02-26 13:17:25'),(3,'Universit├® Catholique de Lille','Licence 1','Informatique (EDN)','2023-09-01','2024-06-30',NULL,'2026-02-26 13:17:25','2026-02-26 13:17:25'),(4,'Universit├® de Lille','Licence 1','Math├®matiques MIASHS','2022-09-01','2023-06-30',NULL,'2026-02-26 13:17:25','2026-02-26 13:17:25'),(5,'Lyc├®e Charlotte Perriand, Genech','BAC mention Bien','Math├®matiques et Sciences ├ëconomiques et Sociales','2019-09-02','2022-06-30','Sp├®cialit├®s : Math├®matiques et Sciences ├ëconomiques et Sociales','2026-02-26 13:17:25','2026-03-26 16:56:33');
/*!40000 ALTER TABLE `formations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2025_10_29_002113_create_personal_access_tokens_table',1),(5,'2025_11_10_172607_create_projects_table',1),(6,'2025_11_10_172641_create_skills_table',1),(7,'2025_11_10_172739_create_formations_table',1),(8,'2025_11_10_174153_create_contacts_table',1),(9,'2026_02_12_000000_create_project_images_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (15,'App\\Models\\User',1,'auth_token','e408b2cb72d406f461761a867c6b6dfc66c652c0260d1751cb1b6aa70d40e46f','[\"*\"]','2026-04-18 08:41:36',NULL,'2026-04-18 08:22:00','2026-04-18 08:41:36'),(16,'App\\Models\\User',1,'auth_token','993cf1b2d2dc4f20ff107a57a0df298934768815602c958bc2f547d08161bc29','[\"*\"]',NULL,NULL,'2026-04-23 08:33:19','2026-04-23 08:33:19'),(17,'App\\Models\\User',1,'auth_token','50c0d07c0a2bab49be8f73c8508eecad4f19c2a980f4d1500672a5626b92d44c','[\"*\"]',NULL,NULL,'2026-04-23 08:38:10','2026-04-23 08:38:10'),(18,'App\\Models\\User',1,'auth_token','09568630d32b07cf0cd36d28e938c65f58530588d09de427f7ef77a20b2b4a94','[\"*\"]','2026-04-24 11:13:54',NULL,'2026-04-24 10:59:14','2026-04-24 11:13:54');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_images`
--

DROP TABLE IF EXISTS `project_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `project_id` bigint unsigned NOT NULL,
  `file_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_type` enum('image','video') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'image',
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_images_project_id_foreign` (`project_id`),
  CONSTRAINT `project_images_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_images`
--

LOCK TABLES `project_images` WRITE;
/*!40000 ALTER TABLE `project_images` DISABLE KEYS */;
INSERT INTO `project_images` VALUES (1,1,'Assets/Captures ├®cran/Projet Dataviz/Projet Dataviz (1).png','image',0,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(2,1,'Assets/Captures ├®cran/Projet Dataviz/Projet Dataviz (2).png','image',1,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(3,1,'Assets/Captures ├®cran/Projet Dataviz/Projet Dataviz (3).png','image',2,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(4,1,'Assets/Captures ├®cran/Projet Dataviz/Projet Dataviz (4).png','image',3,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(5,2,'Assets/Captures ├®cran/Projet HTML CSS JS/Projet HTML CSS JS (1).png','image',0,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(6,2,'Assets/Captures ├®cran/Projet HTML CSS JS/Projet HTML CSS JS (2).png','image',1,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(7,2,'Assets/Captures ├®cran/Projet HTML CSS JS/Projet HTML CSS JS (3).png','image',2,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(8,3,'Assets/Captures ├®cran/Projet PHP/Projet PHP (1).png','image',0,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(9,3,'Assets/Captures ├®cran/Projet PHP/Projet PHP (2).png','image',1,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(10,3,'Assets/Captures ├®cran/Captures vid├®os/Projet PHP/Capture vid├®o Projet PHP.mp4','video',2,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(11,4,'Assets/Captures ├®cran/Projet Symfony/Projet Symfony (1).png','image',0,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(12,4,'Assets/Captures ├®cran/Projet Symfony/Projet Symfony (2).png','image',1,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(13,4,'Assets/Captures ├®cran/Projet Symfony/Projet Symfony (3).png','image',2,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(14,4,'Assets/Captures ├®cran/Captures vid├®os/Projet Symfony/Capture vid├®o Projet Symfony.mp4','video',3,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(20,6,'project-media/5Z7ixUDoHKsftaidbXX6nv68nurTXF2FfqYseMRJ.png','image',0,'2026-04-18 08:41:07','2026-04-18 08:41:07'),(21,6,'project-media/Csa7aESVSUkBdujaU1NlRuED2KREwx4ZxzNAtV2s.png','image',1,'2026-04-18 08:41:36','2026-04-18 08:41:36'),(22,6,'project-media/Xcxe3ImBtLJOQG3XFk67f8rY1wwPbkG2Oe2K6WUO.png','image',2,'2026-04-18 08:41:36','2026-04-18 08:41:36'),(23,6,'project-media/eqRD17u13DteBJclk9iKHY272RSX2r3JAneIlkPH.png','image',3,'2026-04-18 08:41:36','2026-04-18 08:41:36');
/*!40000 ALTER TABLE `project_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `technologies` json DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `github_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `demo_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `order` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Projet Dataviz','Projet de visualisation de donn├®es permettant d\'analyser un jeu de donn├®es sur Spotify.','[\"Python\", \"Data Visualization\", \"Pandas\", \"Matplotlib\", \"PowerBI\"]','Assets/Captures ├®cran/Projet Dataviz/Projet Dataviz (1).png',NULL,NULL,1,0,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(2,'Projet HTML CSS JS','Site web front-end companie a├®rienne r├®alis├® en HTML, CSS et JavaScript, mettant en pratique les fondamentaux du d├®veloppement web.','[\"HTML\", \"CSS\", \"JavaScript\"]','Assets/Captures ├®cran/Projet HTML CSS JS/Projet HTML CSS JS (1).png',NULL,NULL,1,1,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(3,'Projet PHP','Application web : site de gestion d\'une salle de sport d├®velopp├®e en PHP, int├®grant la gestion de donn├®es c├┤t├® serveur et l\'interaction avec une base de donn├®es.','[\"PHP\", \"MySQL\", \"HTML\", \"CSS\"]','Assets/Captures ├®cran/Projet PHP/Projet PHP (1).png',NULL,NULL,1,2,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(4,'Projet Symfony','Application web agence immobili├¿re d├®velopp├®e avec le framework Symfony.','[\"Symfony\", \"PHP\", \"Twig\", \"Doctrine\", \"MySQL\"]','Assets/Captures ├®cran/Projet Symfony/Projet Symfony (1).png',NULL,NULL,1,3,'2026-02-12 13:35:51','2026-02-12 13:15:14'),(6,'Projet Data Science ÔÇô Pr├®diction du co├╗t de transport Sweek','D├®veloppement dÔÇÖun mod├¿le de Machine Learning pour pr├®dire les co├╗ts de transport chez Sweek ├á partir du poids, volume, pays, entrep├┤t et transporteur.\n\nLe projet permet dÔÇÖidentifier les lignes non rentables, de mesurer la performance (MAE/MAPE), dÔÇÖexpliquer les variables les plus influentes et de simuler des sc├®narios via une API.','[\"Python\", \"Pandas\", \"NumPy\", \"Matplotlib\", \"Scikit-learn\", \"FastAPI\"]',NULL,NULL,NULL,0,4,'2026-04-18 08:40:08','2026-04-18 08:40:08');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('FRLFdZxPdJh4dr6oETTez3gBftmH6Oc805gtA3qH',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQzN6QnE5VkZ3OTg0STE0R2hITjBoZklDd2o3akxVa1NTYXhKalZqWCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1770903815),('Mvv8Hm1IJ5C47GltQ2BVl1PJPvrRFtQdToqttpxw',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoicTZzemxRUHFxQldsUTBZMW5BUTRSU2FsdlNKQzNyZ2tDUGxCTDFFdSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1769264073),('uv3efjlCTJJrMjiX6LKjAJOp3SwQOpQUClh4ytgp',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUWpuVmxneUNXQXVhNng3bzQ5dUdQOG5CQ3owVE5VYzRhWWlkSzEyNCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1768858486),('wmKqWPjgr852faZYullu217Kixg4oUm2zkdZs840',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiM1h1cUVhZ1hGYXdZUDd6aE5oQ1I2elRYRkRsbGxzenAxbmIxOWFZUyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1769016560);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'Python','Informatique',NULL,'skills-icons/python.png','2026-04-23 08:37:18','2026-04-23 08:37:18'),(2,'NumPy','Data Science',NULL,'skills-icons/numpy.png','2026-04-23 08:37:18','2026-04-23 08:37:18'),(3,'Pandas','Data Science',NULL,'skills-icons/pandas.png','2026-04-23 08:37:18','2026-04-23 08:37:18'),(4,'Matplotlib','Data Science',NULL,'skills-icons/matplotlib.png','2026-04-23 08:37:18','2026-04-23 08:37:18'),(5,'HTML','Frontend',NULL,'skills-icons/html.jpg','2026-04-23 08:37:18','2026-04-23 08:37:18'),(6,'CSS','Frontend',NULL,'skills-icons/css.png','2026-04-23 08:37:18','2026-04-23 08:37:18'),(7,'C','Informatique',NULL,'skills-icons/c.png','2026-04-23 08:37:18','2026-04-23 08:37:18'),(8,'Java','Informatique',NULL,'skills-icons/java.png','2026-04-23 08:37:18','2026-04-23 08:37:18'),(9,'Machine Learning','Data Science',NULL,'skills-icons/machinelearning.png','2026-04-23 08:37:18','2026-04-23 08:37:18'),(10,'JavaScript','Frontend',NULL,'skills-icons/javascript.png','2026-04-23 08:37:18','2026-04-23 08:37:18'),(11,'Vue.js','Frontend',NULL,'skills-icons/vuejs.png','2026-04-23 08:37:18','2026-04-23 08:37:18'),(12,'PHP','Backend',NULL,'skills-icons/php.png','2026-04-23 08:37:18','2026-04-23 08:37:18'),(13,'Symfony','Backend',NULL,'skills-icons/symfony.png','2026-04-23 08:37:18','2026-04-23 08:37:18'),(14,'Jupyter Notebook','Outils',NULL,'skills-icons/jupyter.png','2026-04-23 08:37:18','2026-04-23 08:37:18'),(15,'Power BI','Outils',NULL,'skills-icons/powerbi.jpg','2026-04-23 08:37:18','2026-04-23 08:37:18'),(16,'VS Code','Outils',NULL,'skills-icons/vscode.png','2026-04-23 08:37:18','2026-04-23 08:37:18'),(17,'React','Frontend',NULL,'skills-icons/knqK9TFj084BZxuktsQsBbzWkeYcxppPgYSIpUCF.png','2026-04-24 11:02:01','2026-04-24 11:02:01'),(18,'Laravel','Backend',NULL,'skills-icons/MNAy8LI8twcrAVSLz7m2sUBKQODZR1aSCu6mdjne.png','2026-04-24 11:03:22','2026-04-24 11:03:22'),(19,'SQL','Base de donn├®es',NULL,'skills-icons/cWMz4ogMDhnBPw7uQQwxHyZS7RT6TbGCb4jFxT9G.png','2026-04-24 11:07:27','2026-04-24 11:07:27'),(20,'MySQL','Base de donn├®es',NULL,'skills-icons/RVQ9VPljXAjs3ExItnCJrRWrIkmEggAV1iVYQHI9.jpg','2026-04-24 11:08:19','2026-04-24 11:08:19'),(21,'PostgreSQL','Base de donn├®es',NULL,'skills-icons/O0URhcSpyIg4naXOqUp9fx7SwlXwxRmEeFt9At8N.png','2026-04-24 11:08:44','2026-04-24 11:08:44'),(22,'Git','Outils',NULL,'skills-icons/LEt6IfmXJzae26UYTOITBnaeGwqFjEvVHOEJTfu9.png','2026-04-24 11:10:27','2026-04-24 11:10:27'),(23,'GitHub','Outils',NULL,'skills-icons/BLuT8EOTZ0E1s4L0tCOLGoL8fc05UCgYM88BAqW0.png','2026-04-24 11:11:00','2026-04-24 11:11:00'),(24,'Firebase','Outils',NULL,'skills-icons/MANPRVPEJhq14dJym5qYOhIbp0QrgFAunwpb4Q45.png','2026-04-24 11:13:13','2026-04-24 11:13:13'),(25,'Suite Office','Outils',NULL,'skills-icons/fNnwKaUGFGMiSlNtzVIiyKB0XLDM9aUwa8VaPSUU.png','2026-04-24 11:13:54','2026-04-24 11:13:54');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'noe.labbe29','noe.labbe29@gmail.com',NULL,'$2y$12$8KrveNswZ8IHh34NuxWDAOx/uq31K4QThkkd9KMGVG4/xaKWH5HQ.',NULL,'admin','2026-01-21 16:12:57','2026-01-21 16:12:57');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-25 14:33:06
