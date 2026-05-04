-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2026 at 02:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perfume_catalog`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(500) NOT NULL,
  `for_male` tinyint(1) NOT NULL DEFAULT 0,
  `for_female` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `for_male`, `for_female`, `created_at`) VALUES
(4, 'STRONG WITH YOU', 'Emporio Armani Stronger With You Intensely of Giorgio Armani is an Oriental Fougère perfume for men.it was launched in 2019.', 6000.00, '/uploads/dark-375x500.52802.2x.avif', 1, 1, '2026-04-27 11:03:28'),
(5, 'LE MALE ELIXIR ', 'The Male Elixir of Jean Paul Gaultier is an Oriental Fougère perfume for men. The Male Elixir was launched in 2023', 7800.00, '/uploads/dark-375x500.81642.2x.avif', 1, 0, '2026-04-27 11:03:28'),
(6, 'SOSPIRO VIBRATO', 'Vibrato of Sospiro Perfumes is a perfume for men and women. Vibrato was launched in 2022.', 9000.00, '/uploads/1776691623056-4310122.avif', 1, 0, '2026-04-27 11:03:28'),
(7, 'KIRKE OVERDOSE', 'Kirkè Overdose of Tiziana Terenzi is a perfume for men and women. It\'s a new perfume, was launched in 2025.', 9500.00, '/uploads/dark-375x500.103499.2x.avif', 1, 1, '2026-04-27 11:03:28'),
(8, 'LIBRE YSL', 'Libre of Yves Saint Laurent is an Oriental Fougère perfume for women. Libre was launched in 2019. Libre was created by Anne Flipo and Carlos Benaïm.', 8500.00, '/uploads/dark-375x500.56077.2x.avif', 0, 1, '2026-04-27 11:03:28'),
(9, 'ACQUA DI GIO', 'Giorgio Armani Acqua di Gio Pour Homme', 7000.00, '/uploads/dark-375x500.410.2x.avif', 1, 0, '2026-04-27 11:03:28'),
(10, 'AZZARO POUR HOMME', 'Azzaro pour Homme by Azzaro is an Aromatic Fougere fragrance for men.', 9000.00, '/uploads/1777290719117-459490858.avif', 1, 0, '2026-04-27 11:51:59'),
(11, 'The Scent Absolute Hugo Boss', 'Boss The Scent Absolute of Hugo Boss is an Oriental Spicy fragrance for men.', 6000.00, '/uploads/1777373387571-761529068.avif', 1, 0, '2026-04-28 10:49:47'),
(12, 'Arabian Leather Subhi Khalilbayov', 'Top notes are Hay, Cinnamon, Nutmeg and Tobacco Leaf;', 8500.00, '/uploads/1777373738900-699308773.avif', 1, 1, '2026-04-28 10:55:38'),
(13, 'Floral s Secret In Green', 'Floral\'s Secret (In Green) by Fuller Cosmetics® is a Floral Green fragrance for women. The fragrance features Floral Notes and Green Notes.', 4000.00, '/uploads/1777373975082-496699936.avif', 0, 1, '2026-04-28 10:59:35'),
(14, 'ameerat Al Arab Asdaaf', 'ameerat Al Arab of Asdaaf is a Floral perfume for women.it was launched in 2022.', 6000.00, '/uploads/1777375881935-397623737.avif', 0, 1, '2026-04-28 11:31:21'),
(15, 'Power Of You', 'Power Of You of Giorgio Armani is a Gourmet Fruity Floral fragrance for women. It\'s a new perfume, created by Nisrine Bouazzaoui Grillié and Nadège Le Garlantezec, in 2026.', 12000.00, '/uploads/1777378476569-618631663.avif', 0, 1, '2026-04-28 12:14:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
