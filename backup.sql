-- MySQL dump 10.13  Distrib 5.7.44, for Linux (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `air_quality_station`
--

DROP TABLE IF EXISTS `air_quality_station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `air_quality_station` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` float DEFAULT NULL,
  `month` float DEFAULT NULL,
  `day` float DEFAULT NULL,
  `hours` float DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `area` varchar(255) NOT NULL,
  `nameTH` varchar(255) NOT NULL,
  `nameEN` varchar(255) NOT NULL,
  `stationType` varchar(255) NOT NULL,
  `lat` decimal(10,6) NOT NULL,
  `long` decimal(10,6) NOT NULL,
  `locationIdId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_864bf864336e8234ee2b9bd62db` (`locationIdId`),
  CONSTRAINT `FK_864bf864336e8234ee2b9bd62db` FOREIGN KEY (`locationIdId`) REFERENCES `location` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `air_quality_station`
--

LOCK TABLES `air_quality_station` WRITE;
/*!40000 ALTER TABLE `air_quality_station` DISABLE KEYS */;
/*!40000 ALTER TABLE `air_quality_station` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `choho`
--

DROP TABLE IF EXISTS `choho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `choho` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `choho_name` varchar(255) NOT NULL,
  `choho` float DEFAULT NULL,
  `aod` float DEFAULT NULL,
  `o3` float DEFAULT NULL,
  `flag` float DEFAULT NULL,
  `gesIdId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a5e83abc496a4625be128225bf3` (`gesIdId`),
  CONSTRAINT `FK_a5e83abc496a4625be128225bf3` FOREIGN KEY (`gesIdId`) REFERENCES `ges` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choho`
--

LOCK TABLES `choho` WRITE;
/*!40000 ALTER TABLE `choho` DISABLE KEYS */;
/*!40000 ALTER TABLE `choho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ges`
--

DROP TABLE IF EXISTS `ges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` float DEFAULT NULL,
  `month` float DEFAULT NULL,
  `day` float DEFAULT NULL,
  `hours` float DEFAULT NULL,
  `locationIdId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c01e711da27b43a39485e706661` (`locationIdId`),
  CONSTRAINT `FK_c01e711da27b43a39485e706661` FOREIGN KEY (`locationIdId`) REFERENCES `location` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ges`
--

LOCK TABLES `ges` WRITE;
/*!40000 ALTER TABLE `ges` DISABLE KEYS */;
/*!40000 ALTER TABLE `ges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_location` varchar(255) NOT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `area` varchar(255) NOT NULL,
  `nameTH` varchar(255) NOT NULL,
  `nameEN` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meteoro_logical`
--

DROP TABLE IF EXISTS `meteoro_logical`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meteoro_logical` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` float DEFAULT NULL,
  `month` float DEFAULT NULL,
  `day` float DEFAULT NULL,
  `hours` float DEFAULT NULL,
  `temperaturde` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  `slp` float DEFAULT NULL,
  `rain` float DEFAULT NULL,
  `windspeed10m` float DEFAULT NULL,
  `winddirdedtion10m` float DEFAULT NULL,
  `lowcloud` float DEFAULT NULL,
  `highcloud` float DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `locationIdId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3f9eb99d0935670d162b08f7db9` (`locationIdId`),
  CONSTRAINT `FK_3f9eb99d0935670d162b08f7db9` FOREIGN KEY (`locationIdId`) REFERENCES `location` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meteoro_logical`
--

LOCK TABLES `meteoro_logical` WRITE;
/*!40000 ALTER TABLE `meteoro_logical` DISABLE KEYS */;
/*!40000 ALTER TABLE `meteoro_logical` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `no2`
--

DROP TABLE IF EXISTS `no2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `no2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no2_name` varchar(255) NOT NULL,
  `no2` float DEFAULT NULL,
  `aod` float DEFAULT NULL,
  `o3` float DEFAULT NULL,
  `flag` float DEFAULT NULL,
  `slant` float DEFAULT NULL,
  `gesIdId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d76c99915299605a13aec3b7337` (`gesIdId`),
  CONSTRAINT `FK_d76c99915299605a13aec3b7337` FOREIGN KEY (`gesIdId`) REFERENCES `ges` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `no2`
--

LOCK TABLES `no2` WRITE;
/*!40000 ALTER TABLE `no2` DISABLE KEYS */;
/*!40000 ALTER TABLE `no2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pm10`
--

DROP TABLE IF EXISTS `pm10`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pm10` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color_id` int(11) NOT NULL,
  `aqi` float DEFAULT NULL,
  `value` float DEFAULT NULL,
  `airIdId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_806191760e872faf566a88aed82` (`airIdId`),
  CONSTRAINT `FK_806191760e872faf566a88aed82` FOREIGN KEY (`airIdId`) REFERENCES `air_quality_station` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pm10`
--

LOCK TABLES `pm10` WRITE;
/*!40000 ALTER TABLE `pm10` DISABLE KEYS */;
/*!40000 ALTER TABLE `pm10` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pm25`
--

DROP TABLE IF EXISTS `pm25`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pm25` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color_id` int(11) NOT NULL,
  `aqi` float DEFAULT NULL,
  `value` float DEFAULT NULL,
  `airIdId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1741d53768f225972f4beeb6c5a` (`airIdId`),
  CONSTRAINT `FK_1741d53768f225972f4beeb6c5a` FOREIGN KEY (`airIdId`) REFERENCES `air_quality_station` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pm25`
--

LOCK TABLES `pm25` WRITE;
/*!40000 ALTER TABLE `pm25` DISABLE KEYS */;
/*!40000 ALTER TABLE `pm25` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `so2`
--

DROP TABLE IF EXISTS `so2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `so2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `so2_name` varchar(255) NOT NULL,
  `so2` float DEFAULT NULL,
  `aod` float DEFAULT NULL,
  `o3` float DEFAULT NULL,
  `flag` float DEFAULT NULL,
  `gesIdId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ae065bc86af0f240e72eb95e811` (`gesIdId`),
  CONSTRAINT `FK_ae065bc86af0f240e72eb95e811` FOREIGN KEY (`gesIdId`) REFERENCES `ges` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `so2`
--

LOCK TABLES `so2` WRITE;
/*!40000 ALTER TABLE `so2` DISABLE KEYS */;
/*!40000 ALTER TABLE `so2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-12 13:23:50
