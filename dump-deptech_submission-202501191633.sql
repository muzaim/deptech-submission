-- MySQL dump 10.13  Distrib 9.1.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: deptech_submission
-- ------------------------------------------------------
-- Server version	9.1.0

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
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_log`
--

LOCK TABLES `activity_log` WRITE;
/*!40000 ALTER TABLE `activity_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `activity_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuti`
--

DROP TABLE IF EXISTS `cuti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuti` (
  `id` int NOT NULL AUTO_INCREMENT,
  `alasan` varchar(255) NOT NULL,
  `mulai_tanggal` date NOT NULL,
  `akhir_tanggal` date NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `pegawai_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b802930eb18ebb7c7bbb62e7fee` (`pegawai_id`),
  CONSTRAINT `FK_b802930eb18ebb7c7bbb62e7fee` FOREIGN KEY (`pegawai_id`) REFERENCES `pegawai` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuti`
--

LOCK TABLES `cuti` WRITE;
/*!40000 ALTER TABLE `cuti` DISABLE KEYS */;
INSERT INTO `cuti` VALUES (34,'Healing','2024-08-01','2024-08-02','2024-11-17 20:27:13.443388','2024-11-17 20:27:13.443388',NULL,31),(35,'Nonton konser','2024-09-03','2024-09-12','2024-11-17 20:28:36.709310','2024-11-17 20:28:36.709310',NULL,32);
/*!40000 ALTER TABLE `cuti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_transaksi`
--

DROP TABLE IF EXISTS `detail_transaksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_transaksi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `subtotal` decimal(15,2) NOT NULL DEFAULT '0.00',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `transaksi_id` int DEFAULT NULL,
  `produk_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f95375947400d3da46d01a4cddf` (`transaksi_id`),
  KEY `FK_2ac6c9280a18a50973b5f7c52a6` (`produk_id`),
  CONSTRAINT `FK_2ac6c9280a18a50973b5f7c52a6` FOREIGN KEY (`produk_id`) REFERENCES `produk` (`id`),
  CONSTRAINT `FK_f95375947400d3da46d01a4cddf` FOREIGN KEY (`transaksi_id`) REFERENCES `transaksi` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=332 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_transaksi`
--

LOCK TABLES `detail_transaksi` WRITE;
/*!40000 ALTER TABLE `detail_transaksi` DISABLE KEYS */;
INSERT INTO `detail_transaksi` VALUES (322,2,30000.00,'2025-01-18 12:42:31.396791','2025-01-18 12:42:31.396791',126,5),(323,3,30000.00,'2025-01-18 12:42:31.399197','2025-01-18 12:42:31.399197',126,6),(324,2,30000.00,'2025-01-18 12:44:30.517756','2025-01-18 12:44:30.517756',127,5),(325,3,30000.00,'2025-01-18 12:44:30.519650','2025-01-18 12:44:30.519650',127,6),(326,2,30000.00,'2025-01-18 13:15:15.940274','2025-01-18 13:15:15.940274',128,5),(327,3,30000.00,'2025-01-18 13:15:15.940953','2025-01-18 13:15:15.940953',128,6),(328,2,30000.00,'2025-01-18 13:48:57.138833','2025-01-18 13:48:57.138833',129,5),(329,3,30000.00,'2025-01-18 13:48:57.140860','2025-01-18 13:48:57.140860',129,6),(330,2,30000.00,'2025-01-18 14:04:32.773893','2025-01-18 14:04:32.773893',130,5),(331,3,30000.00,'2025-01-18 14:04:32.775848','2025-01-18 14:04:32.775848',130,6);
/*!40000 ALTER TABLE `detail_transaksi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pegawai`
--

DROP TABLE IF EXISTS `pegawai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pegawai` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_depan` varchar(50) NOT NULL,
  `nama_belakang` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `no_hp` varchar(15) NOT NULL,
  `address` varchar(255) NOT NULL,
  `jenis_kelamin` enum('Male','Female') NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `sisa_cuti` int NOT NULL DEFAULT '12',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_2da708b7a7c191aaf2982a4f6d` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pegawai`
--

LOCK TABLES `pegawai` WRITE;
/*!40000 ALTER TABLE `pegawai` DISABLE KEYS */;
INSERT INTO `pegawai` VALUES (31,'Sugeng','Pranoto','sugeng_pranoto@yopmail.com','0937216213','Jl Kaliurang','Male','2024-11-17 19:41:31.332210','2024-11-17 20:27:26.927405',NULL,10),(32,'Ilham','Ramadhan','ilham_ramadhan@yopmail.com','08229382421','Jl Kebayoran Baru No 21','Male','2024-11-17 20:28:17.793885','2024-11-17 20:28:36.000000',NULL,2),(33,'Bernadya','Ribka','bernadya@yopmail.com','0897223442','Jakarta Selatan','Female','2024-11-17 21:24:45.803585','2024-11-17 21:24:45.803585',NULL,12),(34,'Dandianto','anto','dandi@gmail.com','04241623132','jl kaliurang','Male','2025-01-06 13:32:06.748645','2025-01-06 13:32:06.748645',NULL,12),(37,'Nadia','Varayandita','nadia@yopmail.com','0937216213','eaeaea','Female','2025-01-11 11:41:27.200847','2025-01-11 11:41:27.200847',NULL,12);
/*!40000 ALTER TABLE `pegawai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produk`
--

DROP TABLE IF EXISTS `produk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `harga` decimal(10,0) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `foto` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produk`
--

LOCK TABLES `produk` WRITE;
/*!40000 ALTER TABLE `produk` DISABLE KEYS */;
INSERT INTO `produk` VALUES (2,'Baju ramzi',12000,'2025-01-11 12:15:29.668781','2025-01-11 20:05:43.833366',NULL,'produk-1736578191849-535406090.jpg'),(5,'kaos hitam polo',15000,'2025-01-11 13:29:26.374405','2025-01-11 20:05:49.022191',NULL,'produk-1736576966363-960972349.png'),(6,'batik',10000,'2025-01-11 13:35:32.368758','2025-01-11 13:35:32.368758',NULL,'produk-1736577332361-789286665.jpg'),(7,'kaos hitam polo',30000,'2025-01-18 12:31:07.345149','2025-01-18 12:31:07.345149',NULL,'produk-1737178267321-301213908.jpg');
/*!40000 ALTER TABLE `produk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaksi`
--

DROP TABLE IF EXISTS `transaksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaksi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `nomor_transaksi` varchar(255) NOT NULL,
  `nama_pembeli` varchar(255) NOT NULL,
  `tanggal` datetime NOT NULL,
  `bukti_transfer` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `kode_pos` varchar(255) NOT NULL,
  `metode_pengiriman` varchar(255) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaksi`
--

LOCK TABLES `transaksi` WRITE;
/*!40000 ALTER TABLE `transaksi` DISABLE KEYS */;
INSERT INTO `transaksi` VALUES (126,'2025-01-18 12:42:31.392573','2025-01-18 12:42:31.399806',NULL,'TR-20250118-951390','Baju ramzi','2025-01-18 12:42:31','bukti_transfer-1737178951381-949996449.jpg','Jl kaliurang','TR0123','jne',60000.00),(127,'2025-01-18 12:44:30.510511','2025-01-18 12:44:30.520259',NULL,'TR-20250118-070507','Baju ramzi','2025-01-18 12:44:31','bukti_transfer-1737179070500-844203890.jpg','Jl kaliurang','TR0123','jne',60000.00),(128,'2025-01-18 13:15:15.937541','2025-01-18 13:15:15.941166',NULL,'TR-20250118-915934','Baju ramzi','2025-01-18 13:15:16','bukti_transfer-1737180915916-753164602.jpg','Jl kaliurang','TR0123','jne',60000.00),(129,'2025-01-18 13:48:57.135070','2025-01-18 13:48:57.141557',NULL,'TR-20250118-937132','Baju ramzi','2025-01-18 13:48:57','bukti_transfer-1737182937122-128942344.jpg','Jl ahmad yani','TR0123','jne',60000.00),(130,'2025-01-18 14:04:32.771318','2025-01-18 14:04:32.776904',NULL,'TR-20250118-872769','Dandi anto','2025-01-18 14:04:33','bukti_transfer-1737183872760-336484458.jpg','Jl ahmad yani','YK0231','J&T Express',60000.00);
/*!40000 ALTER TABLE `transaksi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `nama_depan` varchar(50) NOT NULL,
  `nama_belakang` varchar(50) NOT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` enum('Male','Female') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (16,'admin1@yopmail.com','$2b$10$77NZjurH/pFUNe4A//kzyu40OmirJiRp3tTNbREBUV8FTagEcSOh6','2024-11-17 21:33:59.174417','2024-11-17 22:10:00.672106',NULL,'admin','1','2024-11-06','Female');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'deptech_submission'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-19 16:33:06
