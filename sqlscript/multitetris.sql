-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 18 Lis 2020, 19:16
-- Wersja serwera: 10.4.11-MariaDB
-- Wersja PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `multitetris`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `abilities`
--

CREATE TABLE `abilities` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `unlock_level` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `game`
--

CREATE TABLE `game` (
  `id` int(11) NOT NULL,
  `time` date NOT NULL,
  `user_1` int(11) NOT NULL,
  `user_2` int(11) NOT NULL,
  `game_history_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `game_block`
--

CREATE TABLE `game_block` (
  `id` int(11) NOT NULL,
  `time` float NOT NULL,
  `block_type` varchar(1) NOT NULL,
  `rotation` int(11) NOT NULL,
  `point` float NOT NULL,
  `landed` int(11) NOT NULL,
  `end` tinyint(4) NOT NULL,
  `game_history_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `game_history`
--

CREATE TABLE `game_history` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ranking_position`
--

CREATE TABLE `ranking_position` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `performance` float NOT NULL,
  `placement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(60) NOT NULL,
  `nickname` varchar(25) NOT NULL,
  `rank` varchar(3) NOT NULL,
  `level` int(11) NOT NULL,
  `experience` varchar(45) NOT NULL,
  `money` int(11) NOT NULL,
  `last_login` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_has_abilities`
--

CREATE TABLE `user_has_abilities` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `abilities_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_has_game`
--

CREATE TABLE `user_has_game` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `score` float NOT NULL,
  `win` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `abilities`
--
ALTER TABLE `abilities`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_history_id` (`game_history_id`);

--
-- Indeksy dla tabeli `game_block`
--
ALTER TABLE `game_block`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_history_id` (`game_history_id`);

--
-- Indeksy dla tabeli `game_history`
--
ALTER TABLE `game_history`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `ranking_position`
--
ALTER TABLE `ranking_position`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `user_has_abilities`
--
ALTER TABLE `user_has_abilities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `abilities_id` (`abilities_id`);

--
-- Indeksy dla tabeli `user_has_game`
--
ALTER TABLE `user_has_game`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `game_id` (`game_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `abilities`
--
ALTER TABLE `abilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `game`
--
ALTER TABLE `game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `game_block`
--
ALTER TABLE `game_block`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `game_history`
--
ALTER TABLE `game_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `ranking_position`
--
ALTER TABLE `ranking_position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `user_has_abilities`
--
ALTER TABLE `user_has_abilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `user_has_game`
--
ALTER TABLE `user_has_game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `game`
--
ALTER TABLE `game`
  ADD CONSTRAINT `game_ibfk_1` FOREIGN KEY (`game_history_id`) REFERENCES `game_history` (`id`);

--
-- Ograniczenia dla tabeli `game_block`
--
ALTER TABLE `game_block`
  ADD CONSTRAINT `game_block_ibfk_1` FOREIGN KEY (`game_history_id`) REFERENCES `game_history` (`id`);

--
-- Ograniczenia dla tabeli `ranking_position`
--
ALTER TABLE `ranking_position`
  ADD CONSTRAINT `ranking_position_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ograniczenia dla tabeli `user_has_abilities`
--
ALTER TABLE `user_has_abilities`
  ADD CONSTRAINT `user_has_abilities_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_has_abilities_ibfk_2` FOREIGN KEY (`abilities_id`) REFERENCES `abilities` (`id`);

--
-- Ograniczenia dla tabeli `user_has_game`
--
ALTER TABLE `user_has_game`
  ADD CONSTRAINT `user_has_game_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_has_game_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`);



INSERT INTO `abilities` (`id`, `name`, `unlock_level`, `price`) VALUES (NULL, 'SKIP', '3', '300'), (NULL, 'SAVE AND SKIP', '7', '500'), (NULL, 'DESTROY', '12', '700');


COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
