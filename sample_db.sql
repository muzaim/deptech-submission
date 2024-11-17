-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: dashboard_it_test
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `activity_log`
--

DROP TABLE IF EXISTS `activity_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `activity` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_81615294532ca4b6c70abd1b2e6` (`user_id`),
  CONSTRAINT `FK_81615294532ca4b6c70abd1b2e6` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_log`
--

LOCK TABLES `activity_log` WRITE;
/*!40000 ALTER TABLE `activity_log` DISABLE KEYS */;
INSERT INTO `activity_log` VALUES (1,1,'login','2024-01-19 09:34:40.425756','2024-01-19 09:34:40.425756',NULL),(2,1,'login','2024-01-19 11:09:57.085832','2024-01-19 11:09:57.085832',NULL),(3,1,'login','2024-01-19 11:15:13.592750','2024-01-19 11:15:13.592750',NULL),(4,1,'login','2024-01-19 13:32:05.202600','2024-01-19 13:32:05.202600',NULL),(5,1,'login','2024-01-19 15:00:18.744951','2024-01-19 15:00:18.744951',NULL),(6,1,'login','2024-01-22 08:51:04.410542','2024-01-22 08:51:04.410542',NULL),(7,1,'login','2024-01-23 11:05:44.481995','2024-01-23 11:05:44.481995',NULL),(8,1,'login','2024-01-23 11:07:14.653752','2024-01-23 11:07:14.653752',NULL),(9,1,'login','2024-01-23 11:10:57.110124','2024-01-23 11:10:57.110124',NULL),(10,1,'login','2024-01-23 11:13:28.343769','2024-01-23 11:13:28.343769',NULL),(11,1,'login','2024-01-23 11:14:02.058785','2024-01-23 11:14:02.058785',NULL),(12,1,'login','2024-01-23 12:01:30.950084','2024-01-23 12:01:30.950084',NULL),(13,1,'login','2024-01-24 09:09:42.710496','2024-01-24 09:09:42.710496',NULL),(14,1,'login','2024-01-24 10:12:31.287696','2024-01-24 10:12:31.287696',NULL),(15,1,'login','2024-09-02 15:02:22.161360','2024-09-02 15:02:22.161360',NULL),(16,1,'login','2024-09-03 08:55:04.559143','2024-09-03 08:55:04.559143',NULL);
/*!40000 ALTER TABLE `activity_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divisions`
--

DROP TABLE IF EXISTS `divisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisions`
--

LOCK TABLES `divisions` WRITE;
/*!40000 ALTER TABLE `divisions` DISABLE KEYS */;
INSERT INTO `divisions` VALUES (1,'Tata Kelola','Divisi untuk Tata Kelola','2024-01-19 09:34:06.671000','2024-01-19 09:34:06.671000',NULL),(2,'Development','Divisi untuk Development','2024-01-19 09:34:06.671000','2024-01-19 09:34:06.671000',NULL),(3,'Infrastruktur','Divisi untuk Infrastruktur','2024-01-19 09:34:06.671000','2024-01-19 09:34:06.671000',NULL),(4,'Security','Divisi untuk Security','2024-01-19 09:34:06.671000','2024-01-19 09:34:06.671000',NULL);
/*!40000 ALTER TABLE `divisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manual_iku`
--

DROP TABLE IF EXISTS `manual_iku`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manual_iku` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `division_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a57096b4aec51da6c9c66159dd8` (`division_id`),
  CONSTRAINT `FK_a57096b4aec51da6c9c66159dd8` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manual_iku`
--

LOCK TABLES `manual_iku` WRITE;
/*!40000 ALTER TABLE `manual_iku` DISABLE KEYS */;
INSERT INTO `manual_iku` VALUES (1,'Manual Iku 1 - Perencanaan','2024-01-19 09:34:06.752000','2024-01-30 16:11:21.442031',NULL,2),(2,'Manual Iku 2 - Analisa Pengembangan Sistem','2024-01-19 09:34:06.752000','2024-01-30 16:11:21.460013',NULL,2),(3,'Manual Iku 3 - Desain dan Pengembangan','2024-01-19 09:34:06.752000','2024-01-30 16:11:21.498135',NULL,2),(4,'Manual Iku 4 - Unit Test Fitur Sistem (Unit Test)','2024-01-19 09:34:06.752000','2024-01-30 16:11:21.569639',NULL,2),(5,'Manual Iku 5 - Uji Penerima Pengguna (UAT)','2024-01-19 09:34:06.752000','2024-01-30 16:11:21.616120',NULL,2),(6,'Manual Iku 1 - Perencanaan dari Tata Kelola','2024-01-31 08:48:47.491140','2024-01-31 08:48:47.491140',NULL,1),(7,'Manual Iku 2 - Analisa Pengembangan Sistem Tata Kelola','2024-01-31 08:50:20.757152','2024-01-31 08:50:20.757152',NULL,1),(8,'Manual Iku 3 - Desain dan Pengembangan Tata Kelola','2024-01-31 08:50:33.501175','2024-01-31 08:50:33.501175',NULL,1),(9,'Manual Iku 4 - Unit Test Fitur Sistem (Unit Test) Tata Kelola','2024-01-31 08:50:44.713882','2024-01-31 08:50:44.713882',NULL,1),(10,'Manual Iku 5 - Uji Penerima Pengguna (UAT) Tata Kelola','2024-01-31 08:50:55.949382','2024-01-31 08:50:55.949382',NULL,1),(11,'Manual Iku 1 - Perencanaan Infrastruktur','2024-01-31 10:56:29.046516','2024-01-31 10:56:29.046516',NULL,3),(12,'Manual Iku 2 - Analisa Pengembangan Sistem) Infrastruktur','2024-01-31 10:56:32.880727','2024-01-31 10:56:32.880727',NULL,3),(13,'Manual Iku 3 - Desain dan Pengembangan Infrastruktur','2024-01-31 10:56:35.838655','2024-01-31 10:56:35.838655',NULL,3),(14,'Manual Iku 4 - Unit Test Fitur Sistem (Unit Test) Infrastruktur','2024-01-31 10:56:47.272095','2024-01-31 10:56:47.272095',NULL,3),(15,'Manual Iku 5 - Uji Penerima Pengguna (UAT) Infrastruktur','2024-01-31 10:56:49.738758','2024-01-31 10:56:49.738758',NULL,3),(16,'Manual Iku 1 - Perencanaan Security','2024-01-31 10:56:52.177149','2024-01-31 10:56:52.177149',NULL,4),(17,'Manual Iku 2 - Analisa Pengembangan Sistem) Security','2024-01-31 10:56:55.545013','2024-01-31 10:56:55.545013',NULL,4),(18,'Manual Iku 3 - Desain dan Pengembangan Security','2024-01-31 10:56:59.374620','2024-01-31 10:56:59.374620',NULL,4),(19,'Manual Iku 4 - Unit Test Fitur Sistem (Unit Test) Security','2024-01-31 10:57:02.984075','2024-01-31 10:57:02.984075',NULL,4),(20,'Manual Iku 5 - Uji Penerima Pengguna (UAT) Security','2024-01-31 10:57:04.950849','2024-01-31 10:57:04.950849',NULL,4),(21,'Manual Iku 6 - Go Live Tata Kelola','2024-01-31 11:33:55.211115','2024-01-31 11:33:55.211115',NULL,1),(22,'Manual Iku 6 - Go Live Development','2024-01-31 11:34:01.642723','2024-01-31 11:34:01.642723',NULL,2),(23,'Manual Iku 6 - Go Live Infrastruktur','2024-01-31 11:34:04.043678','2024-01-31 11:34:04.043678',NULL,3),(24,'Manual Iku 6 - Go Live Security','2024-01-31 11:34:06.357186','2024-01-31 11:34:06.357186',NULL,4);
/*!40000 ALTER TABLE `manual_iku` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1705630877124,'PostDivision1705630877124'),(2,1705631083852,'PostUser1705631083852'),(3,1705631243178,'PostManualIku1705631243178');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_activity`
--

DROP TABLE IF EXISTS `project_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int DEFAULT NULL,
  `manual_iku_id` int DEFAULT NULL,
  `activity` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` enum('Not Started','In Progress','Done','Cancelled','On Hold') NOT NULL DEFAULT 'Not Started',
  `sub_project_id` int DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `done_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_400d4f14fa12168d2af9c3c5437` (`project_id`),
  KEY `FK_3a95438b937e3ad87230cbca23c` (`manual_iku_id`),
  KEY `FK_e301b2321225e000b72d0c31d6c` (`sub_project_id`),
  CONSTRAINT `FK_3a95438b937e3ad87230cbca23c` FOREIGN KEY (`manual_iku_id`) REFERENCES `manual_iku` (`id`),
  CONSTRAINT `FK_400d4f14fa12168d2af9c3c5437` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `FK_e301b2321225e000b72d0c31d6c` FOREIGN KEY (`sub_project_id`) REFERENCES `sub_project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_activity`
--

LOCK TABLES `project_activity` WRITE;
/*!40000 ALTER TABLE `project_activity` DISABLE KEYS */;
INSERT INTO `project_activity` VALUES (59,8,1,'Deployment Sub Deal Type & Portofolio','2024-01-30 09:49:32.259069','2024-09-03 09:15:06.000000',NULL,'2024-01-30 14:37:50','2024-01-31 09:45:00','Done',20,'1,7,2','2024-09-03 09:15:06'),(60,8,2,'Konfirmasi ke OBS terkait script deployment','2024-01-30 09:49:32.263557','2024-01-31 11:31:39.000000',NULL,'2024-01-30 13:58:59','2024-01-31 09:45:00','Done',21,'1,7,2','2024-01-31 11:31:39'),(61,8,2,'Deployment Fund Transfer & MCA','2024-01-30 09:49:32.265958','2024-01-30 15:11:39.000000','2024-01-30 08:11:39.000000',NULL,'2024-01-31 09:45:00','Not Started',21,'1,7,2',NULL),(62,8,3,'Konfirmasi Hasil UAT Surat Instruksi','2024-01-30 09:49:32.271603','2024-01-31 11:31:52.000000',NULL,'2024-01-31 11:31:49','2024-01-31 09:46:00','Done',22,'1','2024-01-31 11:31:53'),(63,8,3,'Review Hasil UAT dan dokumen ceklis Surat Instruksi','2024-01-30 09:49:32.289080','2024-01-30 13:50:02.000000',NULL,NULL,'2024-01-31 09:46:00','Cancelled',22,'1',NULL),(64,8,3,'Membahas CR hasil UAT testing','2024-01-30 09:49:32.294232','2024-01-30 14:20:12.000000',NULL,NULL,'2024-01-31 09:47:00','Done',22,'1,5,8',NULL),(65,8,3,'Melakukan UAT untuk hasil bug fixing','2024-01-30 09:49:32.337867','2024-01-30 14:47:49.000000',NULL,'2024-01-30 14:47:43','2024-01-31 09:47:00','Cancelled',22,'1',NULL),(66,8,4,'Penyusunan BRD SIM','2024-01-30 09:49:32.342577','2024-01-31 11:41:13.000000',NULL,'2024-01-30 13:46:51','2024-01-31 09:48:00','Done',23,'8','2024-01-31 11:41:13'),(67,8,4,'UAT Fitur SIM , Sisya & OSTS','2024-01-30 09:49:32.369235','2024-01-30 09:49:32.369235',NULL,NULL,'2024-02-01 09:48:00','Not Started',23,'1,2,5',NULL),(68,8,4,'Go-Live','2024-01-30 09:49:32.371072','2024-01-30 09:49:32.371072',NULL,NULL,'2024-01-31 09:48:00','Not Started',23,'1',NULL),(69,8,5,'Master data OSTS','2024-01-30 09:49:32.373580','2024-01-30 13:45:58.000000',NULL,'2024-01-30 13:38:45','2024-01-31 09:49:00','On Hold',24,'1',NULL),(70,8,5,'Minta OBS untuk manual guide secara end to end','2024-01-30 09:49:32.383852','2024-01-30 13:49:38.000000',NULL,'2024-01-30 13:43:17','2024-01-31 09:49:00','Not Started',24,'1',NULL),(71,9,1,'Development tambahan pada saat sosialisasi ke 2 s','2024-01-30 09:52:03.400491','2024-01-30 15:50:28.000000',NULL,'2024-01-30 14:20:22','2024-01-30 09:50:00','Done',NULL,'3',NULL),(72,9,2,'Deployment','2024-01-30 09:52:03.407932','2024-01-30 14:25:35.000000',NULL,NULL,'2024-01-31 09:50:00','Not Started',NULL,'2',NULL),(73,9,3,'RFC Deployment ','2024-01-30 09:52:03.414957','2024-01-30 09:52:03.414957',NULL,NULL,'2024-01-31 09:51:00','Not Started',NULL,'9',NULL),(74,9,4,'Bugs Fixing & Testing','2024-01-30 09:52:03.419840','2024-01-30 09:52:03.419840',NULL,NULL,'2024-01-30 09:51:00','Not Started',NULL,'1,8,3',NULL),(75,9,4,'Master data input','2024-01-30 09:52:03.433644','2024-01-30 09:52:03.433644',NULL,NULL,'2024-01-31 09:51:00','Not Started',NULL,'1',NULL),(76,9,5,'BAST','2024-01-30 09:52:03.436079','2024-01-30 09:52:03.436079',NULL,NULL,'2024-01-31 09:51:00','Not Started',NULL,'9',NULL),(77,8,4,'Riset dan analis data','2024-01-30 13:25:08.449126','2024-01-30 14:37:00.000000',NULL,'2024-01-30 13:42:46','2024-01-24 13:25:00','Done',21,'1',NULL),(107,8,22,'Penambahan role user','2024-01-31 11:34:40.761118','2024-01-31 11:34:59.000000',NULL,'2024-01-31 11:34:53','2024-01-31 11:34:00','Done',24,'1,9','2024-01-31 11:34:59'),(108,8,2,'test tanpa sub project','2024-01-31 11:36:01.458072','2024-09-03 09:15:20.000000',NULL,NULL,'2024-01-31 11:35:00','Done',NULL,'1','2024-09-03 09:15:20'),(109,8,1,'fund transfer test','2024-01-31 11:39:55.697319','2024-01-31 11:40:11.000000',NULL,'2024-01-31 11:40:08','2024-01-31 11:39:00','Done',21,'2','2024-01-31 11:40:12'),(110,8,22,'go live','2024-01-31 11:41:51.042355','2024-01-31 11:42:05.000000',NULL,'2024-01-31 11:42:02','2024-01-31 11:41:00','Done',20,'1','2024-01-31 11:42:06'),(111,14,24,'Go live','2024-01-31 11:43:49.592048','2024-01-31 11:43:49.592048',NULL,NULL,'2024-01-31 11:43:00','Not Started',NULL,'9,1',NULL),(112,14,20,'eaea','2024-01-31 11:43:49.595576','2024-01-31 11:43:49.595576',NULL,NULL,'2024-01-31 11:43:00','Not Started',NULL,'1',NULL);
/*!40000 ALTER TABLE `project_activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `project_summary_view`
--

DROP TABLE IF EXISTS `project_summary_view`;
/*!50001 DROP VIEW IF EXISTS `project_summary_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `project_summary_view` AS SELECT 
 1 AS `project_name`,
 1 AS `division`,
 1 AS `rkap`,
 1 AS `pic`,
 1 AS `project_start_date`,
 1 AS `end_date`,
 1 AS `sub_project`,
 1 AS `manual_iku`,
 1 AS `activity`,
 1 AS `activity_pic`,
 1 AS `activity_start_date`,
 1 AS `done_date`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `division_id` int DEFAULT NULL,
  `rkap` tinyint NOT NULL DEFAULT '0',
  `user_id` int DEFAULT NULL,
  `start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_60b9bf9a536e6295cc57842a7ad` (`division_id`),
  KEY `FK_bd55b203eb9f92b0c8390380010` (`user_id`),
  CONSTRAINT `FK_60b9bf9a536e6295cc57842a7ad` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`id`),
  CONSTRAINT `FK_bd55b203eb9f92b0c8390380010` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (8,'OSTS',2,1,1,'2024-01-01 09:43:00','2024-01-31 09:43:00','2024-01-30 09:43:14.494085','2024-01-31 08:49:42.657491',NULL),(9,'FIFO FLPP',2,1,1,'2024-01-01 09:50:00','2024-01-31 09:50:00','2024-01-30 09:50:24.538127','2024-01-30 09:50:24.538127',NULL),(13,'Sistem Tata Kelola',1,1,8,'2024-01-31 11:42:00','2024-01-31 11:42:00','2024-01-31 11:42:33.780825','2024-01-31 12:01:03.000000','2024-01-31 05:01:03.000000'),(14,'Sistem Keamanan Informasi',4,1,7,'2024-01-17 11:43:00','2024-01-31 11:43:00','2024-01-31 11:43:09.053247','2024-01-31 12:01:00.000000','2024-01-31 05:01:00.000000');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_project`
--

DROP TABLE IF EXISTS `sub_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cecb37f25ef2aa3f5f47336e09a` (`project_id`),
  CONSTRAINT `FK_cecb37f25ef2aa3f5f47336e09a` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_project`
--

LOCK TABLES `sub_project` WRITE;
/*!40000 ALTER TABLE `sub_project` DISABLE KEYS */;
INSERT INTO `sub_project` VALUES (20,8,'SUB DEAL TYPE & PORTFOLIO','2024-01-30 09:43:29.473623','2024-01-30 09:43:29.473623',NULL),(21,8,'FUND TRANSFER & MCA','2024-01-30 09:43:41.887826','2024-01-30 09:43:41.887826',NULL),(22,8,'SURAT INSTRUKSI','2024-01-30 09:43:50.376744','2024-01-30 09:43:50.376744',NULL),(23,8,'INTEGRASI SIM, OSTS, SIM, SISYA','2024-01-30 09:44:02.204982','2024-01-30 09:44:02.204982',NULL),(24,8,'ROLE USER','2024-01-30 09:44:11.621407','2024-01-30 09:44:11.621407',NULL);
/*!40000 ALTER TABLE `sub_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `division_id` int DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e54f16bd3253721638e193dda17` (`division_id`),
  CONSTRAINT `FK_e54f16bd3253721638e193dda17` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,2,'Jona','jona.adhitya@smf-indonesia.co.id','Jl. Kebon jeruk No. 1','$2b$10$VlR0u8nVevK6kgDMezdZ.evEpWWpPncZWveZuVPCqMon6t9ZtMsdq','2024-01-19 09:34:06.722000','2024-01-19 15:00:03.726427',NULL),(2,1,'Vanza','vanza@yopmail.com','Jl Kaliurang No 26 Yogyakarta','$2b$10$k7oc8BR.Lr7//zHdXAtcQejLwjnTSgRuN6VubpQBVHXIFmyXlDRt.','2024-01-19 09:35:22.822391','2024-01-19 09:35:22.822391',NULL),(3,2,'Wahyu','wahyu@yopmail.com','Jl Kaliurang No 26 Yogyakarta','$2b$10$4sQ7wxegxI0YpmdG8oTcM.bNFw.ZfksQnWf./djsLDPfbvzhem/Vq','2024-01-19 09:35:46.817513','2024-01-19 09:35:46.817513',NULL),(4,2,'Wildan','wildan@yopmail.com','Jl Kaliurang No 26 Yogyakarta','$2b$10$PaUTQmXCn1VSpckDxaDse.dhfMR4FkfDwR4GxbhFzXvbEIvhfA8Ze','2024-01-19 09:36:03.003191','2024-01-19 09:36:03.003191',NULL),(5,3,'Dudi','dudi@yopmail.com','Jl Kaliurang No 26 Yogyakarta','$2b$10$sieReWrH16OdxLAtyBWqEOkRt5ludpwTnMhM3sc9GwdymkZ2BXEbW','2024-01-19 09:37:14.746572','2024-01-19 09:37:14.746572',NULL),(7,2,'Ryan','ryan@yopmail.com','jogja','$2b$10$ru9FFMr7ltUzO0Z03FGdOeZGJwebvrNdTgOy8AzSns9toM8SDgAWi','2024-01-30 09:41:55.404448','2024-01-30 09:41:55.404448',NULL),(8,4,'Dina','dina@yopmail.com','asd','$2b$10$No9DsjIIVzY/ojqq5irdMu0X3IdCDTNN04KIOfdXRrAuY1DvdlUSS','2024-01-30 09:42:06.012692','2024-01-30 09:42:06.012692',NULL),(9,1,'Afifah','afifah@yopmail.com','magelang','$2b$10$FRDt3lQrMTFqZpY1YaJhZ.pnyN1k3SGPJeDVv6FCitnAHE7m2xMjG','2024-01-30 09:42:23.182252','2024-01-30 09:42:23.182252',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dashboard_it_test'
--

--
-- Final view structure for view `project_summary_view`
--

/*!50001 DROP VIEW IF EXISTS `project_summary_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `project_summary_view` AS select `p`.`name` AS `project_name`,`division`.`name` AS `division`,(case when (`p`.`rkap` = 1) then 'Yes' else 'No' end) AS `rkap`,`user`.`username` AS `pic`,`p`.`start_date` AS `project_start_date`,`p`.`end_date` AS `end_date`,`subproject`.`name` AS `sub_project`,`mi`.`name` AS `manual_iku`,`pa`.`activity` AS `activity`,(select group_concat(`user`.`username` separator ',') from `user` where (find_in_set(`user`.`id`,`pa`.`user_id`) > 0)) AS `activity_pic`,`pa`.`start_date` AS `activity_start_date`,`pa`.`done_date` AS `done_date`,`pa`.`status` AS `status` from (((((`projects` `p` left join `project_activity` `pa` on((`p`.`id` = `pa`.`project_id`))) left join `user` on((`p`.`user_id` = `user`.`id`))) join `divisions` `division` on((`p`.`division_id` = `division`.`id`))) left join `manual_iku` `mi` on((`pa`.`manual_iku_id` = `mi`.`id`))) left join `sub_project` `subproject` on((`pa`.`sub_project_id` = `subproject`.`id`))) group by `p`.`id`,`pa`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-17 10:15:09
