-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 01, 2022 lúc 06:50 AM
-- Phiên bản máy phục vụ: 10.4.19-MariaDB
-- Phiên bản PHP: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `banking`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `creditcards`
--

CREATE TABLE `creditcards` (
  `id` int(11) NOT NULL,
  `numberCard` int(11) DEFAULT NULL,
  `money` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `creditcards`
--

INSERT INTO `creditcards` (`id`, `numberCard`, `money`, `userId`, `createdAt`, `updatedAt`) VALUES
(7, 2147483647, '1800000', 9, '2022-03-31 22:18:16', '2022-03-31 22:21:48'),
(8, 2147483642, '2200000', 10, '2022-03-31 22:18:32', '2022-03-31 22:21:48');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `cccd` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `passWord` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `refreshToken` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`id`, `fullName`, `cccd`, `birthday`, `address`, `image`, `email`, `phone`, `sex`, `userName`, `passWord`, `status`, `roleId`, `refreshToken`, `createdAt`, `updatedAt`) VALUES
(9, 'Khanhbatluc', '323435678963', '15/082002', 'Viet Nam', NULL, 'rerw@gmail.com', '0343896254', 'MALE', 'khanh', '$2a$10$C71HRw00ZEc7L.uYQec/XOLuFxiruW20F6qYAX0l6K742GZ6.7UYe', 0, 0, NULL, '2022-03-31 22:18:16', '2022-03-31 22:18:16'),
(10, 'Khanhbatluc', '323435678962', '15/082002', 'Viet Nam', NULL, 'rerw@gmail.com', '0343896252', 'MALE', 'khanh', '$2a$10$C71HRw00ZEc7L.uYQec/XOLuFxiruW20F6qYAX0l6K742GZ6.7UYe', 0, 0, NULL, '2022-03-31 22:18:32', '2022-03-31 22:18:32');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `savings`
--

CREATE TABLE `savings` (
  `id` int(11) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `moneySaving` varchar(255) DEFAULT NULL,
  `idTransaction` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `typeRate` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220330103619-create-customer.js'),
('create-credit-card.js'),
('create-saving.js'),
('create-transaction.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `idSend` int(11) DEFAULT NULL,
  `idReceive` int(11) DEFAULT NULL,
  `moneySend` varchar(255) DEFAULT NULL,
  `moneyRest` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `transactionPee` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `transactions`
--

INSERT INTO `transactions` (`id`, `idSend`, `idReceive`, `moneySend`, `moneyRest`, `description`, `type`, `transactionPee`, `createdAt`, `updatedAt`) VALUES
(1, 2147483647, 2147483642, '200000', '1800000', 'ok nhu lon ', 'CK', '0', '2022-03-31 22:21:48', '2022-03-31 22:21:48');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `creditcards`
--
ALTER TABLE `creditcards`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `savings`
--
ALTER TABLE `savings`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `creditcards`
--
ALTER TABLE `creditcards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `savings`
--
ALTER TABLE `savings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
