-- MariaDB dump 10.19  Distrib 10.11.0-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: biblioteca
-- ------------------------------------------------------
-- Server version	10.11.0-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administrador` (
  `ID_Admin` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(255) DEFAULT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `Direccion` varchar(255) NOT NULL,
  `Telefono` varchar(255) NOT NULL,
  `Contrasena` varchar(255) DEFAULT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID_Admin`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES
(1,'Soni17','Sonia','Flores Zuniga','El Faro','2871252008','$2a$10$JuMuua2Nt1W0Xl8hyb81G.CUVEkb3s6bdTkEXB905FLfK7G3vfwCu','A','2022-12-14 08:48:41','2022-12-14 17:00:46'),
(2,'JuanC09','Juan Carlos','Ruperto Zarate','Jalapa de Diaz','2871340802','$2a$10$mclsw7O6/r.RKlrWGtStbOOqlAdO9uvwKXdal58RsptVBuZxsNI3K','S','2022-12-14 08:54:03','2022-12-14 08:54:03'),
(3,'Fatu123','Juan Carlos','Ruperto Zarate','Jalapa de Diaz','2871340802','$2a$10$TUiISJma22Nzpzy/4ZYOUO2yFW7fip7OkD/DNTBv0kuvXs3Nf0Uzy','S','2022-12-14 10:38:33','2022-12-14 10:38:33'),
(4,'simon','Juan Carlos','Ruperto Zarate','Jalapa de Diaz','2871340802','$2a$10$XRH6YjArYoV97IsJu6RgkerQEjs4mCVK2KVKTPR9U8tCWEMNaGp2e','S','2022-12-14 15:13:55','2022-12-14 15:13:55');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `ID_Clientes` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(255) DEFAULT NULL,
  `Nombre_Cliente` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `Dirección` varchar(50) NOT NULL,
  `Telefono` varchar(255) NOT NULL,
  `Correo_Electronico` varchar(255) NOT NULL,
  `Edad` int(3) NOT NULL,
  `Contrasena` varchar(255) DEFAULT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID_Clientes`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES
(1,'Kar29','Karla','Torres Lara','Tuxtepec','2586262685','kar123@gmail.com',26,'$2a$10$aD1IBUi8/CVis/UXdZTBWOoVXO7RVzLVPFBJ/Y5O92bw/dsSbw4lq','N','2022-12-14 10:37:42','2022-12-15 02:30:50'),
(2,'Uziel29','Karla','Torres Lara','Veracruz','2871340802','zunig@gmail.com',25,'$2a$10$0L62MpKP1uPezfMZO08aiulZJDVZrdoqfd0p49rBuzyBckoEd5oqq','S','2022-12-14 15:14:15','2022-12-14 15:14:15'),
(3,'liliana','Karla','Torres Lara','Veracruz','2871340802','zunig@gmail.com',25,'$2a$10$T7bzutTXvU3u.GEzGqz8SuR.oRzrczIUDdcIsABsB85woDnlXnWl6','S','2022-12-14 17:01:28','2022-12-14 17:01:28');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libros`
--

DROP TABLE IF EXISTS `libros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `libros` (
  `ID_Libro` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_Libro` varchar(255) NOT NULL,
  `Editorial` varchar(255) NOT NULL,
  `Autor` varchar(255) NOT NULL,
  `Genero` varchar(255) NOT NULL,
  `Numero_paginas` varchar(20) NOT NULL,
  `Fecha_Edicion` int(6) NOT NULL,
  `Precio` int(50) NOT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID_Libro`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libros`
--

LOCK TABLES `libros` WRITE;
/*!40000 ALTER TABLE `libros` DISABLE KEYS */;
INSERT INTO `libros` VALUES
(1,'Harry Potter','Bloomsbury Salamandra Scholastic','J. K. Rowling','Misterio','296',2020,105,'N','2022-12-14 12:29:21','2022-12-15 02:28:26'),
(2,'Paco el chato','Bloomsbury Salamandra Scholastic','J. K. Rowling','Misterio','296',2020,0,'S','2022-12-14 15:14:38','2022-12-14 15:14:38');
/*!40000 ALTER TABLE `libros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamos`
--

DROP TABLE IF EXISTS `prestamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prestamos` (
  `ID_Prestamos` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Clientes` int(11) NOT NULL,
  `ID_Libro` int(11) NOT NULL,
  `ID_Admin` int(11) NOT NULL,
  `Fecha_Salida` date DEFAULT NULL,
  `Fecha_Devolver` date DEFAULT NULL,
  `Creado` timestamp NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID_Prestamos`),
  KEY `ID_Clientes` (`ID_Clientes`),
  KEY `ID_Libro` (`ID_Libro`),
  KEY `ID_Admin` (`ID_Admin`),
  CONSTRAINT `prestamos_ibfk_1` FOREIGN KEY (`ID_Clientes`) REFERENCES `clientes` (`ID_Clientes`),
  CONSTRAINT `prestamos_ibfk_2` FOREIGN KEY (`ID_Libro`) REFERENCES `libros` (`ID_Libro`),
  CONSTRAINT `prestamos_ibfk_3` FOREIGN KEY (`ID_Admin`) REFERENCES `administrador` (`ID_Admin`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamos`
--

LOCK TABLES `prestamos` WRITE;
/*!40000 ALTER TABLE `prestamos` DISABLE KEYS */;
/*!40000 ALTER TABLE `prestamos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-14 22:00:16
