-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2020 at 02:51 PM
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
(22, 'ron', '+OZPF0NlweGlAV+4kh5pZh1ZKB7HbsKvVaM54XoNS7Q=', 'Ron', 'Inbar', 1),
(26, 'girit', '+OZPF0NlweGlAV+4kh5pZh1ZKB7HbsKvVaM54XoNS7Q=', 'Girit', 'Inbar', 1),
(27, 'dan', '+OZPF0NlweGlAV+4kh5pZh1ZKB7HbsKvVaM54XoNS7Q=', 'Dan', 'Inbar', 1),
(28, 'uri', '+OZPF0NlweGlAV+4kh5pZh1ZKB7HbsKvVaM54XoNS7Q=', 'Uri', 'Inbar', 1),
(29, 'admin', 'G9a/pOtmKqmPqNm1Q8nBG1y/K7h1prIjizOM0E7vMvM=', 'Ron', 'Inbar', 2),
(30, 'namir', '+OZPF0NlweGlAV+4kh5pZh1ZKB7HbsKvVaM54XoNS7Q=', 'Namir', 'Inbar', 1),
(41, 'user', 'wwVD5HfVXD3DTGXU1UMHW7exMySigpo2KxD89BaMOBI=', 'Ron', 'Inbar', 1);

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
(455, 26, 2),
(410, 27, 1),
(411, 27, 2),
(409, 27, 3),
(408, 28, 1),
(407, 28, 3),
(420, 30, 2),
(412, 30, 3),
(456, 31, 27),
(417, 33, 1),
(441, 41, 1),
(438, 41, 2),
(442, 41, 3),
(443, 41, 17),
(444, 41, 23),
(445, 41, 27);

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `id` int(11) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `from` date NOT NULL,
  `to` date NOT NULL,
  `price` decimal(8,2) NOT NULL DEFAULT 0.00,
  `description` varchar(1000) NOT NULL,
  `image` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacation`
--

INSERT INTO `vacation` (`id`, `destination`, `from`, `to`, `price`, `description`, `image`) VALUES
(1, 'Coyhaique', '2020-11-01', '2020-12-31', '5000.00', 'If adventure runs through your veins, this is the right place for you. This corner of Patagonia challenges you to climb its amazing peaks, like the Mackay or the Castillo. Trekking is a must and fly fishing gives you time to relax on the amazing rivers. Wonder at the untouched nature of this area in the heart of Patagonia, with its evergreen forests and lengthy Carretera Austral, which will captivate you with beautiful views. This is the perfect destination if you want to push your senses to the limit and get in touch with your wild side. Visit the arts and crafts fair in Coyhaique’s Main Square. You’ll find handmade products on the stands made with materials like native wood, leather, stone and wool, souvenirs that will remind you of your trip through the south of Chile.', '/images/foto-centro-coyhaique--696x426.jpg'),
(2, 'Puerto Aysén', '2021-01-01', '2020-11-15', '6500.00', 'Have you imagined how life goes on in the fjords of Patagonia? Here we will tell you the history of Puerto Aysén, a town located on the banks of the river, a few kilometers from the sea and surrounded by huge mountains full of evergreen forests. It is an almost pristine place, where 80% of the territory has not been explored by humans. This presents a tremendous challenge for its people, Chileans who are united to receive tourists and show them the best of Puerto Aysén.', '/images/4066224Master.jpg'),
(3, 'Punta Arenas', '2021-01-01', '2040-12-31', '5.00', '`With port and sheep-breeding history, the gateway into Antartica will captivate you with its clean air and sophisticated European architecture. Take a boat or a kayak along the Magellan Straits and you’ll be surprised by the penguins as they welcome you to Magdalena Island. Go on an adventure to Tierra del Fuego and discover the best kept secrets of the Kawesqar and Selk’nam people, indigenous to the southernmost part of Chile.', '/images/MG_9778.jpg'),
(17, 'Vancouver', '2021-01-01', '2021-01-07', '1000.00', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore consequuntur assumenda aspernatur dolore voluptatum nesciunt doloremque velit officia eius quia! Laudantium facere similique fugiat pariatur est. Quod repudiandae eveniet nihil.', 'https://res.cloudinary.com/simpleview/image/upload/v1486505969/clients/vancouverbc/Aerial_Sunset_Vancouver_d3_copy_1bb86ed0-1edc-4cda-841d-0b033ca0bb72.jpg'),
(21, 'Nepal', '2021-01-01', '2021-01-07', '2000.00', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore consequuntur assumenda aspernatur dolore voluptatum nesciunt doloremque velit officia eius quia! Laudantium facere similique fugiat pariatur est. Quod repudiandae eveniet nihil.', 'https://mk0cs00242yfx7ww7i54.kinstacdn.com/wp-content/uploads/sites/5/nepal-village.jpg');
(23, 'Haifa', '2021-01-01', '2021-01-07', '1.00', 'The Bahá’í Gardens (bahai gardens) are almost as famous as they are beautiful. This world heritage site is carved into the side of Mount Carmel, and is one of the most magnificent works of art you’ll ever lay eyes on. ', 'https://laurenonlocation.com/wp-content/uploads/2020/03/image10.png'),
(27, 'The Moon', '2969-07-16', '2969-07-24', '999999.99', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore consequuntur assumenda aspernatur dolore voluptatum nesciunt doloremque velit officia eius quia! Laudantium facere similique fugiat pariatur est. Quod repudiandae eveniet nihil.', 'https://i.insider.com/5d2faa4d7e76cc3f20437ff6?width=1000&format=jpeg&auto=webp');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `user_vacation`
--
ALTER TABLE `user_vacation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=458;

--
-- AUTO_INCREMENT for table `vacation`
--
ALTER TABLE `vacation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

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
