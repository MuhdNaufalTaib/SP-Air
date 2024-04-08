-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: sp_air
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `airport`
--

DROP TABLE IF EXISTS `airport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airport` (
  `airportid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `description` longtext,
  `airportimage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`airportid`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  FULLTEXT KEY `info` (`country`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airport`
--

LOCK TABLES `airport` WRITE;
/*!40000 ALTER TABLE `airport` DISABLE KEYS */;
INSERT INTO `airport` VALUES (1,'Changi Airport','Singapore','Main International Airport of Singapore','2022-08-07T06-52-34.973Z--changi.jpg'),(2,'Narita Airport','Japan','International airport serving the Greater Tokyo Area','2022-08-07T18-24-08.092Z--2022-06-25T14-58-07.882Z--index.jpg'),(3,'San Francisco Airport','United States','International airport in San Mateo County','2022-08-07T06-54-37.734Z--2022-06-26T09-18-22.028Z--SanFranciscoAirport.jpg'),(6,'Haneda Airport','Japan','International airports serving the Greater Tokyo Area','2022-08-07T18-21-37.147Z--haneda.jpg'),(58,'Deez','Uganda','Deez is the Capital Airport for Uganda. Many greets views and known for technology.',NULL);
/*!40000 ALTER TABLE `airport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `bookingid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `passport` varchar(100) NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `flightid` int NOT NULL,
  `userid` int NOT NULL,
  PRIMARY KEY (`bookingid`),
  KEY `userid_idx` (`userid`),
  KEY `flightid_idx` (`flightid`),
  CONSTRAINT `flightid` FOREIGN KEY (`flightid`) REFERENCES `flight` (`flightId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,'John Tan','E1234555Z','Singaporean',20,1,1);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checkout`
--

DROP TABLE IF EXISTS `checkout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkout` (
  `checkoutid` int NOT NULL AUTO_INCREMENT,
  `bookingid` int NOT NULL,
  `promotionid` int NOT NULL,
  PRIMARY KEY (`checkoutid`),
  KEY `bookingid_idx` (`bookingid`),
  KEY `promotionid_idx` (`promotionid`),
  CONSTRAINT `bookingid` FOREIGN KEY (`bookingid`) REFERENCES `booking` (`bookingid`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `promotionid` FOREIGN KEY (`promotionid`) REFERENCES `promotion` (`promotionid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkout`
--

LOCK TABLES `checkout` WRITE;
/*!40000 ALTER TABLE `checkout` DISABLE KEYS */;
INSERT INTO `checkout` VALUES (2,1,2),(3,1,2),(4,1,2),(6,1,2),(7,1,2),(8,1,2),(9,1,2),(10,1,2);
/*!40000 ALTER TABLE `checkout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flight`
--

DROP TABLE IF EXISTS `flight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flight` (
  `flightId` int NOT NULL AUTO_INCREMENT,
  `flightCode` varchar(255) NOT NULL,
  `aircraft` varchar(255) NOT NULL,
  `originAirport` int NOT NULL,
  `destinationAirport` int NOT NULL,
  `embarkDate` datetime NOT NULL,
  `travelTime` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`flightId`),
  UNIQUE KEY `flightCode_UNIQUE` (`flightCode`),
  KEY `destairportid_idx` (`destinationAirport`),
  KEY `originairportid_idx` (`originAirport`),
  CONSTRAINT `destairportid` FOREIGN KEY (`destinationAirport`) REFERENCES `airport` (`airportid`),
  CONSTRAINT `originairportid` FOREIGN KEY (`originAirport`) REFERENCES `airport` (`airportid`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight`
--

LOCK TABLES `flight` WRITE;
/*!40000 ALTER TABLE `flight` DISABLE KEYS */;
INSERT INTO `flight` VALUES (1,'SP110','BOEING 737',1,2,'2022-12-22 08:19:00','6 hours 50 mins',855.50),(2,'SP111','BOEING NONCE',2,3,'2022-12-22 08:20:00','1 hour 5 mins',1.00),(3,'SP112','BOEING 111',1,2,'2022-12-22 08:20:00','1 hour 10 mins',1.00),(12,'SP1111','BOEING 7871',2,1,'2022-12-23 19:00:00','3 hours 50 mins',555.50),(15,'SP12','BOEING 7871',2,1,'2022-12-23 19:00:00','3 hours 50 mins',555.50),(30,'SP1234','Boeing21',3,6,'2023-01-02 05:09:00','5 hours 1 mins',1000.00);
/*!40000 ALTER TABLE `flight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion` (
  `promotionid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `discount` float NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`promotionid`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
INSERT INTO `promotion` VALUES (2,'Holiday Sale','2022-12-01 00:00:00','2022-12-30 00:00:00',20,'There would be a 20% discount due to it being the holiday'),(3,'Hari Raya','2022-12-01 00:00:00','2022-12-30 00:00:00',30,'There would be a 30% discount due to it being the Hari Raya and aildilfirtry sigma aqoul boss'),(4,'Noncet','2022-12-22 23:57:00','2022-12-23 23:57:00',69,'The holiday for the grown ups. 69% is a big difference.'),(7,'Okanawi','2022-08-25 07:09:00','2022-09-08 13:13:00',69,'Japanese Holiday for all people. 69% is back.'),(8,'Kawaii','2022-08-26 04:41:00','2022-12-23 04:42:00',21,'Japan konichiwa');
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` int NOT NULL,
  `password` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  `profile_pic_url` longtext,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `contact_UNIQUE` (`contact`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Timmy Abraham','terry@gmail.com',91234569,'abc123456','Customer','https://i2-prod.mirror.co.uk/incoming/article27521542.ece/ALTERNATES/s615/0_Lionel-Messi.jpg','2022-06-26 22:38:51'),(3,'YingSong','Songz@gmail.com',91234568,'abc1234567','Customer','https://media2.giphy.com/media/3kzrzzQXUfI6bmUNf3/giphy.gif?cid=ecf05e47rq8qycr3d7h9adv28397uq7w8ya5xxutbq4dw16p&rid=giphy.gif&ct=g','2022-07-06 11:07:49'),(4,'Nama','abc@gmail.com',12345678,'12345','Admin','https://phantom-marca.unidadeditorial.es/f310a33f8e0303d76f3d29e79c7ee5f9/resize/1320/f/jpg/assets/multimedia/imagenes/2022/07/27/16589056532137.jpg','2022-07-06 11:07:49'),(6,'Jeff','ImmaNonce@gmail.com',99912629,'pool123','Admin','https://media0.giphy.com/media/wpMSzfWzWFOEiu4EU0/200w.webp','2022-08-08 03:58:08');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sp_air'
--

--
-- Dumping routines for database 'sp_air'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-08  4:48:55
