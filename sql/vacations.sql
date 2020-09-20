-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2020 at 10:52 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(2, 'admin'),
(1, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `password_hash` varchar(512) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `password_hash`, `first_name`, `last_name`, `role_id`) VALUES
(22, 'ron', '+OZPF0NlweGlAV+4kh5pZh1ZKB7HbsKvVaM54XoNS7Q=', 'Ron', 'Inbar', 2),
(26, 'girit', '+OZPF0NlweGlAV+4kh5pZh1ZKB7HbsKvVaM54XoNS7Q=', 'Girit', 'Inbar', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_vacation`
--

CREATE TABLE `user_vacation` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vacation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_vacation`
--

INSERT INTO `user_vacation` (`id`, `user_id`, `vacation_id`) VALUES
(15, 26, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `id` int(11) NOT NULL,
  `desc` varchar(280) NOT NULL,
  `price` decimal(8,2) NOT NULL DEFAULT 0.00,
  `picture` varchar(500) DEFAULT NULL,
  `from` date NOT NULL,
  `to` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacation`
--

INSERT INTO `vacation` (`id`, `desc`, `price`, `picture`, `from`, `to`) VALUES
(1, 'Coyhaique', '5000.00', 'https://radiogenial.cl/wp-content/uploads/2019/09/foto-centro-coyhaique--696x426.jpg', '2020-11-01', '2020-11-05'),
(2, 'Puerto Aysén', '6500.00', 'https://s0.wklcdn.com/image_38/1145035/7179015/4066224Master.jpg', '2020-11-11', '2020-11-15'),
(3, 'Punta Arenas', '8000.00', 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg', '2020-10-06', '2020-09-10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE_ROLE_NAME` (`name`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE_USERNAME` (`name`),
  ADD KEY `FK_USER_ROLE` (`role_id`);

--
-- Indexes for table `user_vacation`
--
ALTER TABLE `user_vacation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE_USER_VACATION` (`user_id`,`vacation_id`) USING BTREE,
  ADD KEY `FK_VACATION` (`vacation_id`),
  ADD KEY `FK_USER` (`user_id`);

--
-- Indexes for table `vacation`
--
ALTER TABLE `vacation`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_vacation`
--
ALTER TABLE `user_vacation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vacation`
--
ALTER TABLE `vacation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_USER_ROLE` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

--
-- Constraints for table `user_vacation`
--
ALTER TABLE `user_vacation`
  ADD CONSTRAINT `FK_USER` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_VACATION` FOREIGN KEY (`vacation_id`) REFERENCES `vacation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
