-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 31 Oca 2020, 10:29:05
-- Sunucu sürümü: 5.6.47-cll-lve
-- PHP Sürümü: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `schooll1_db`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `bookhistory`
--

CREATE TABLE `bookhistory` (
  `id` int(11) NOT NULL,
  `bookname` mediumtext NOT NULL,
  `bookwriter` mediumtext NOT NULL,
  `bookreader` mediumtext NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  `time` bigint(15) NOT NULL,
  `bookid` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `bookhistory`
--

INSERT INTO `bookhistory` (`id`, `bookname`, `bookwriter`, `bookreader`, `active`, `time`, `bookid`) VALUES
(2, 'Test', 'Test writer', 'aisolak.s5@gmail.com', 0, 1577664000000, 123456),
(3, 'Test', 'Test writer', 'aisolak.s5@gmail.com', 0, 1577836800000, 123456),
(4, 'Test', 'Test writer', 'aisolak.s5@gmail.com', 0, 1577923200000, 123456),
(5, 'Test', 'Test writer', 'aisolak.s5@gmail.com', 0, 1578009600000, 123456),
(7, '1984', 'George Orwell ', 'pirilsu.keskiner@stu.alkev.k12.tr', 1, 1577923200000, 870),
(8, 'ata', 'ata', 'aisolak.s5@gmail.com', 1, 1577750400000, 123),
(9, 'ata', 'ata', 'atakan@epiah.com', 1, 1577664000000, 123);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `bookname` mediumtext NOT NULL,
  `bookwriter` mediumtext NOT NULL,
  `bookreader` mediumtext,
  `bookid` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `books`
--

INSERT INTO `books` (`id`, `bookname`, `bookwriter`, `bookreader`, `bookid`) VALUES
(3, 'Test', 'Test writer', 'atakan', 123456),
(4, '1984', 'George Orwell ', 'Piril', 870);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` mediumtext NOT NULL,
  `usercode` text NOT NULL,
  `password` mediumtext NOT NULL,
  `mail` mediumtext NOT NULL,
  `active` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `username`, `usercode`, `password`, `mail`, `active`) VALUES
(1, 'Fatihcansu', 'fatmaz', 'fatmazeynep', 'fatihcansu@gmail.com', 0),
(2, 'Tolga', 'evcime', 'evcimen', 'tolga.evcimen@stu.alkev.k12.tr', 0),
(3, 'atakan', '123456', '123456', 'aisolak.s5@gmail.com', 1),
(4, 'atakan2', 'atakan', 'atakan', 'aisolak.2s5@gmail.com', 0),
(5, 'Piril', '2600gy', '2600gymn', 'pirilsu.keskiner@stu.alkev.k12.tr', 1);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `bookhistory`
--
ALTER TABLE `bookhistory`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `bookhistory`
--
ALTER TABLE `bookhistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Tablo için AUTO_INCREMENT değeri `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
