-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2023 at 07:22 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tailor`
--

-- --------------------------------------------------------

--
-- Table structure for table `collartype`
--

CREATE TABLE `collartype` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `shortName` varchar(50) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `collartype`
--

INSERT INTO `collartype` (`id`, `name`, `shortName`, `status`, `created_at`) VALUES
(3, 'ddd', 'www', 1, '2023-08-05 19:07:42');

-- --------------------------------------------------------

--
-- Table structure for table `colortype`
--

CREATE TABLE `colortype` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `shortName` varchar(50) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `colortype`
--

INSERT INTO `colortype` (`id`, `name`, `shortName`, `status`, `created_at`) VALUES
(1, 'blue', 'BL', 1, '2023-08-06 10:21:01'),
(2, 'nproon', 'JL', 1, '2023-08-06 10:21:27');

-- --------------------------------------------------------

--
-- Table structure for table `cufftype`
--

CREATE TABLE `cufftype` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `shortName` varchar(50) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cufftype`
--

INSERT INTO `cufftype` (`id`, `name`, `shortName`, `status`, `created_at`) VALUES
(1, 'doosa', 'wq', 1, '2023-08-05 19:07:31'),
(2, 'ww', '1233', 0, '2023-08-05 05:54:00');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) NOT NULL,
  `alternateNumber` int(50) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `customerType` varchar(50) NOT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `full_name`, `email`, `phone`, `alternateNumber`, `country`, `city`, `customerType`, `address`, `created_at`) VALUES
(1, 'syed momin', 'syedmomin168@gmail.com', '011423565665', 2147483647, 'Pakistan', 'Karachi', 'Wholesale Fabric Customer', 'loopa change', '2023-08-03 18:16:21'),
(2, 'khoon khaol', 'gloof@gmail.com', '686866', NULL, 'UK', 'Islamabad', 'Wholesale Fabric Supplier', 'north town', '2023-09-11 17:35:25'),
(3, 'jouind', 'duehu@sjdsj.com', '136132156163', 2147483647, 'Pakistan', 'Karachi', 'Stitching', 'sdugasidhiashduiashidashi', '2023-08-13 07:08:55'),
(4, 'jamad', 'sdhsui344@sdns', '38999823', 351566656, 'Pakistan', 'Karachi', 'Stitching', 'dfhdbhfjf dsjf\\ds fhj', '2023-08-13 10:14:39'),
(5, 'momin', 'syedmomin\\', '0326161', 166564646, 'Pakistan', 'Karachi', 'Stitching', 'mominn', '2023-08-14 07:05:54'),
(6, 'junaid', 'demo!23@gmail.com', '032151646545665465', 0, 'Pakistan', 'Karachi', 'Stitching', '', '2023-08-27 04:45:05'),
(7, 'junaid ', '', '0356651542', 5456656, 'Pakistan', 'Karachi', 'Wholesale Fabric Customer', 'north karachi', '2023-09-02 11:46:34'),
(8, 'yousuf ', '252765@gmail.com', '02354556', 13134545, 'Pakistan', 'Karachi', 'Stitching', 'dd', '2023-09-02 11:48:51'),
(9, 'farhan asif', 'demo@gmail.com', '03142309654', 0, 'Pakistan', 'Karachi', 'Stitching', 'north karachi sector 2', '2023-09-24 04:52:32'),
(10, 'danial khan', 'demouser@123.com', '03124512565', 0, 'Pakistan', 'Karachi', 'Stitching', 'north karachi, pakistan', '2023-09-30 10:34:15'),
(11, 'moosa ', 'demo123@gmail.com', '0345132555456', 0, 'Pakistan', 'Karachi', 'Wholesale Fabric Supplier', 'NAZIMABAD', '2023-09-30 10:44:11');

-- --------------------------------------------------------

--
-- Table structure for table `customer_ledger`
--

CREATE TABLE `customer_ledger` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(50) NOT NULL,
  `customer_phone` varchar(50) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `total_received` int(11) DEFAULT NULL,
  `total_balance` int(11) DEFAULT NULL,
  `collected_amount` int(11) DEFAULT NULL,
  `advance_payment` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer_ledger`
--

INSERT INTO `customer_ledger` (`id`, `customer_name`, `customer_phone`, `total_amount`, `total_received`, `total_balance`, `collected_amount`, `advance_payment`, `created_at`) VALUES
(2, 'momin', '0326161', 50006434, 6300, 5134, 6000, NULL, '2023-09-24 05:04:54'),
(3, 'jouind', '136132156163', 25549, 21099, 4450, 6135, NULL, '2023-10-14 18:04:14'),
(4, 'danial khan', '03124512565', 3620, 100, 3520, 0, NULL, '2023-09-30 10:41:35');

-- --------------------------------------------------------

--
-- Table structure for table `customer_ledger_history`
--

CREATE TABLE `customer_ledger_history` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(200) NOT NULL,
  `customer_phone` varchar(200) NOT NULL,
  `collectedAmount` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer_ledger_history`
--

INSERT INTO `customer_ledger_history` (`id`, `customer_name`, `customer_phone`, `collectedAmount`, `createdAt`) VALUES
(1, 'jouind', '136132156163', 500, '2023-09-20 06:19:05'),
(2, 'jouind', '136132156163', 50, '2023-10-14 18:04:14');

-- --------------------------------------------------------

--
-- Table structure for table `customer_wholesale_ledger`
--

CREATE TABLE `customer_wholesale_ledger` (
  `id` int(11) NOT NULL,
  `supplierName` varchar(200) NOT NULL,
  `supplierNumber` varchar(200) NOT NULL,
  `totalOrderAmount` int(11) NOT NULL,
  `totalAmountReceived` int(11) NOT NULL,
  `totalNetBalance` int(11) NOT NULL,
  `created-at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer_wholesale_ledger`
--

INSERT INTO `customer_wholesale_ledger` (`id`, `supplierName`, `supplierNumber`, `totalOrderAmount`, `totalAmountReceived`, `totalNetBalance`, `created-at`) VALUES
(1, 'khoon khaol', '686866', 81037, 16450, 64587, '2023-10-08 18:05:14'),
(2, 'moosa ', '0345132555456', 4140, 300, 3840, '2023-09-30 10:59:09');

-- --------------------------------------------------------

--
-- Table structure for table `expenses_ledger`
--

CREATE TABLE `expenses_ledger` (
  `id` int(11) NOT NULL,
  `fromDate` varchar(250) NOT NULL,
  `toDate` varchar(250) NOT NULL,
  `businessType` varchar(200) NOT NULL,
  `expensesType` varchar(200) NOT NULL,
  `amount` int(11) NOT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expenses_ledger`
--

INSERT INTO `expenses_ledger` (`id`, `fromDate`, `toDate`, `businessType`, `expensesType`, `amount`, `remarks`, `created_at`) VALUES
(1, '2023-08-24', '2023-08-15', 'Needlework Stiching', 'Needlework Stiching', 33, 'sam', '2023-08-29 19:45:08'),
(2, '2023-08-16', '2023-08-09', 'Needlework Fabric Wholesale', 'Needlework Stiching', 123, '', '2023-08-29 20:09:29'),
(3, '2023-08-14', '2023-08-04', 'Needlework Stiching', 'Needlework Stiching', 2313, NULL, '2023-08-29 20:09:44'),
(4, '2023-08-02', '2023-08-06', 'Needlework Fabric Wholesale', 'Needlework Stiching', 213123, NULL, '2023-08-29 20:10:00'),
(5, '2023-09-06', '2023-09-18', 'Needlework Stiching', 'Conveyance Expenses', 2000, 'articale', '2023-09-24 05:05:20');

-- --------------------------------------------------------

--
-- Table structure for table `grn_detail`
--

CREATE TABLE `grn_detail` (
  `id` int(11) NOT NULL,
  `masterId` int(10) NOT NULL,
  `itemMaster` varchar(500) NOT NULL,
  `itemUOM` varchar(100) NOT NULL,
  `itemArticle` varchar(500) DEFAULT NULL,
  `itemColor` varchar(50) NOT NULL,
  `itemQuantity` int(10) NOT NULL,
  `itemRate` int(10) NOT NULL,
  `itemAmount` int(10) NOT NULL,
  `itemShipment` int(10) NOT NULL,
  `itemMiscCost` int(10) NOT NULL,
  `itemNetRate` int(10) NOT NULL,
  `itemNetAmount` int(10) NOT NULL,
  `itemImage` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `grn_detail`
--

INSERT INTO `grn_detail` (`id`, `masterId`, `itemMaster`, `itemUOM`, `itemArticle`, `itemColor`, `itemQuantity`, `itemRate`, `itemAmount`, `itemShipment`, `itemMiscCost`, `itemNetRate`, `itemNetAmount`, `itemImage`, `created_at`) VALUES
(5, 4, 'Kameez', 'MTR', '', 'blue', 2, 120, 240, 3333, 1667, 2620, 5240, 'ReadyPlayerMe-Avatar.jpeg', '2023-09-19 18:56:12'),
(6, 4, 'trouser', 'MTR', 'glooo', 'blue', 6, 145, 870, 10000, 5000, 2645, 15870, 'Untitled design.png', '2023-09-19 18:56:12'),
(7, 4, 'Short', 'MTR', 'flooop', 'blue', 4, 121, 484, 6667, 3333, 2621, 10484, 'IMG-20200624-WA0054.jpg', '2023-09-19 18:56:12'),
(8, 5, 'trouser', 'MTR', 'glooo', 'nproon', 2, 154, 308, 545, 182, 518, 1035, NULL, '2023-09-12 18:01:04'),
(9, 5, 'trouser', 'MTR', 'glooo', 'blue', 4, 123, 492, 1091, 364, 487, 1947, NULL, '2023-09-12 18:01:04'),
(10, 5, 'Kameez', 'MTR', '', 'nproon', 5, 141, 705, 1364, 455, 505, 2524, NULL, '2023-09-12 18:01:04'),
(11, 6, 'trouser', 'MTR', 'glooo', 'blue', 2, 120, 240, 333, 167, 370, 740, NULL, '2023-09-12 18:02:50'),
(12, 6, 'Kameez', 'MTR', '', 'blue', 6, 145, 870, 1000, 500, 395, 2370, NULL, '2023-09-12 18:02:50'),
(13, 6, 'Short', 'MTR', 'flooop', 'blue', 4, 170, 680, 667, 333, 420, 1680, NULL, '2023-09-12 18:02:50'),
(14, 8, 'Kameez', 'MTR', '', 'blue', 2, 102, 204, 400, 200, 402, 804, NULL, '2023-09-12 18:18:38'),
(15, 8, 'Kameez', 'MTR', '', 'blue', 4, 145, 580, 800, 400, 445, 1780, NULL, '2023-09-12 18:18:38'),
(16, 8, 'trouser', 'MTR', 'glooo', 'blue', 4, 412, 1648, 800, 400, 712, 2848, NULL, '2023-09-12 18:18:38'),
(17, 9, 'Kameez', 'MTR', '', 'blue', 2, 120, 240, 2500, 350, 1545, 3090, NULL, '2023-09-12 19:06:08'),
(18, 9, 'Kameez', 'MTR', '', 'blue', 2, 50, 100, 2500, 350, 1475, 2950, NULL, '2023-09-12 19:06:08'),
(19, 9, 'Short', 'MTR', 'flooop', 'nproon', 4, 41, 164, 5000, 700, 1466, 5864, NULL, '2023-09-12 19:06:08'),
(20, 10, 'Kameez', 'MTR', '', 'blue', 2, 141, 282, 444, 2222, 1474, 2948, NULL, '2023-09-12 19:09:27'),
(21, 10, 'Short', 'MTR', 'flooop', 'blue', 3, 145, 435, 667, 3333, 1478, 4435, NULL, '2023-09-12 19:09:27'),
(22, 10, 'trouser', 'MTR', 'glooo', 'blue', 4, 120, 480, 889, 4444, 1453, 5813, NULL, '2023-09-12 19:09:27'),
(23, 11, 'Kameez', 'MTR', '', 'blue', 2, 145, 290, 10000, 500, 5395, 10790, NULL, '2023-09-13 17:23:34'),
(24, 11, 'trouser', 'MTR', 'glooo', 'blue', 2, 124, 248, 10000, 500, 5374, 10748, NULL, '2023-09-13 17:23:34'),
(25, 12, 'Kameez', 'MTR', '', 'blue', 2, 100, 200, 3636, 182, 2009, 4018, NULL, '2023-09-24 05:02:54'),
(26, 12, 'trouser', 'MTR', 'glooo', 'blue', 4, 100, 400, 7273, 364, 2009, 8037, NULL, '2023-09-24 05:02:54'),
(27, 12, 'Short', 'MTR', 'flooop', 'blue', 5, 124, 620, 9091, 455, 2033, 10166, NULL, '2023-09-24 05:02:54'),
(28, 13, 'Kameez', 'MTR', '', 'blue', 4, 100, 400, 3077, 615, 1023, 4092, 'Untitled design (1).jpg', '2023-09-30 10:51:29'),
(29, 13, 'trouser', 'MTR', 'glooo', 'nproon', 4, 40, 160, 3077, 615, 963, 3852, NULL, '2023-09-30 10:51:29'),
(30, 13, 'Short', 'MTR', 'flooop', 'blue', 5, 30, 150, 3846, 769, 953, 4765, NULL, '2023-09-30 10:51:29');

-- --------------------------------------------------------

--
-- Table structure for table `grn_master`
--

CREATE TABLE `grn_master` (
  `id` int(11) NOT NULL,
  `transactionDate` varchar(100) NOT NULL,
  `receivingDate` varchar(100) NOT NULL,
  `supplierName` varchar(100) NOT NULL,
  `supplierNumber` varchar(100) NOT NULL DEFAULT '',
  `totalShipmentCost` varchar(100) NOT NULL,
  `totalMiscCost` varchar(100) NOT NULL,
  `totalCost` varchar(100) NOT NULL,
  `totalNetAmount` varchar(100) NOT NULL,
  `note` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `grn_master`
--

INSERT INTO `grn_master` (`id`, `transactionDate`, `receivingDate`, `supplierName`, `supplierNumber`, `totalShipmentCost`, `totalMiscCost`, `totalCost`, `totalNetAmount`, `note`, `created_at`) VALUES
(4, '2023-09-06', '2023-09-19', 'syed momin', '011423565665', '20000', '10000', '30000', '31594', '', '2023-09-12 17:59:33'),
(5, '2023-09-06', '2023-09-11', 'syed momin', '011423565665', '3000', '1000', '4000', '5506', '.', '2023-09-12 18:01:04'),
(6, '2023-09-07', '2023-09-05', 'syed momin', '011423565665', '2000', '1000', '3000', '4790', NULL, '2023-09-12 18:02:50'),
(7, '2023-08-27', '2023-09-10', 'syed momin', '011423565665', '20000', '1000', '21000', '21000', NULL, '2023-09-12 18:16:31'),
(8, '2023-08-30', '2023-09-10', 'syed momin', '011423565665', '2000', '1000', '3000', '5432', NULL, '2023-09-12 18:18:38'),
(9, '2023-09-01', '2023-09-01', 'syed momin', '011423565665', '10000', '1400', '11400', '11904', '', '2023-09-12 19:06:08'),
(10, '2023-09-06', '2023-09-05', 'syed momin', '011423565665', '2000', '10000', '12000', '13196', NULL, '2023-09-12 19:09:27'),
(11, '2023-08-27', '2023-09-12', 'syed momin', '011423565665', '20000', '1000', '21000', '21538', '', '2023-09-13 17:23:34'),
(12, '2023-09-04', '2023-09-07', 'syed momin', '011423565665', '20000', '1000', '21000', '22221', '', '2023-09-24 05:02:54'),
(13, '2023-09-13', '2023-09-30', 'syed momin', '011423565665', '10000', '2000', '12000', '12709', '', '2023-09-30 10:51:29');

-- --------------------------------------------------------

--
-- Table structure for table `item_master`
--

CREATE TABLE `item_master` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `shortName` varchar(50) DEFAULT NULL,
  `itemType` varchar(100) NOT NULL,
  `UOM` varchar(100) NOT NULL,
  `article` varchar(100) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `closingQuantity` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created-at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item_master`
--

INSERT INTO `item_master` (`id`, `name`, `shortName`, `itemType`, `UOM`, `article`, `color`, `closingQuantity`, `status`, `created-at`) VALUES
(1, 'Kameez', 'kaz', 'Unstich', 'MTR', '', 'blue', 2, 1, '2023-10-08 18:01:17'),
(2, 'trouser', 'tro', 'Unstich', 'MTR', 'glooo', 'blue', 3, 1, '2023-10-08 18:05:14'),
(3, 'Short', 'st', 'Unstich', 'MTR', 'flooop', 'blue', -4, 1, '2023-10-08 18:05:14'),
(4, 'ST', 'pajama', 'Stich', 'MTR', 'TR-221', 'nproon', NULL, 1, '2023-09-24 04:57:41');

-- --------------------------------------------------------

--
-- Table structure for table `karigar`
--

CREATE TABLE `karigar` (
  `id` int(11) NOT NULL,
  `karigar_image` varchar(250) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `phone` varchar(150) NOT NULL,
  `cnic` varchar(150) NOT NULL,
  `address` text NOT NULL,
  `designation` varchar(25) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `karigar`
--

INSERT INTO `karigar` (`id`, `karigar_image`, `name`, `phone`, `cnic`, `address`, `designation`, `status`, `created_at`) VALUES
(1, NULL, 'momin khan', '0312456466546', '031653215646513', 'northhhh whjew', 'looopa', 0, '2023-09-03 11:38:21'),
(2, NULL, 'loopa lona ', '014553568566', '3213213216556', 'north town look after stand good', 'nine', 0, '2023-09-03 11:47:07'),
(3, '1693741836100.png', 'momin', '164545', '55545', 'ld,sd,;;ld', 'stand', 1, '2023-09-03 11:50:44'),
(4, '1693735730757.png', 'junaid iqbal', '30321321651515', '0231635165151651', 'jdishsdfkhsdfbdskgfkdsbrfdv', 'looopa', 0, '2023-09-03 10:09:55'),
(5, NULL, 'farhan asif', '031256898', '2165165465465465', 'north town hy bhai', 'popet', 0, '2023-09-03 11:12:56'),
(6, '1695531236991.png', 'juinad kamal', '03124509654', '421012635454524', 'north karachi ', 'emploee', 1, '2023-09-24 04:53:57');

-- --------------------------------------------------------

--
-- Table structure for table `karigar_salary`
--

CREATE TABLE `karigar_salary` (
  `id` int(11) NOT NULL,
  `karigarName` varchar(250) NOT NULL,
  `karigarMobile` varchar(250) NOT NULL,
  `karigarDesignation` varchar(250) DEFAULT NULL,
  `paymentType` varchar(250) NOT NULL,
  `toDate` varchar(250) NOT NULL,
  `amount` int(11) NOT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `karigar_salary`
--

INSERT INTO `karigar_salary` (`id`, `karigarName`, `karigarMobile`, `karigarDesignation`, `paymentType`, `toDate`, `amount`, `remarks`, `created_at`) VALUES
(1, 'junaid iqbal', '30321321651515', 'looopa', 'Needlework Stiching', '2023-08-28', 10000, 'khan', '2023-08-28 17:19:47'),
(2, 'momin khan', '0312456466546', '', 'Needlework Stiching', '2023-08-02', 200, 'bad news', '2023-08-28 17:23:34'),
(4, 'junaid iqbal', '30321321651515', 'looopa', 'Loan', '2023-09-04', 1000, 'demo', '2023-09-02 11:51:31'),
(5, 'juinad kamal', '03124509654', 'emploee', 'Loan', '2023-09-04', 10000, 'in petrol ', '2023-09-24 04:54:44'),
(6, 'juinad kamal', '03124509654', 'emploee', 'Loan', '2023-09-24', 20000, 'new bike', '2023-09-24 04:55:12');

-- --------------------------------------------------------

--
-- Table structure for table `ledger`
--

CREATE TABLE `ledger` (
  `id` int(11) NOT NULL,
  `date` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `reference` varchar(50) NOT NULL,
  `transaction` varchar(50) NOT NULL,
  `amount` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ledger`
--

INSERT INTO `ledger` (`id`, `date`, `description`, `reference`, `transaction`, `amount`, `created_at`) VALUES
(2, '2023-05-10', 'delioidoiiooidoiddiooi', 'momin khan', 'Debit', '11114', '2023-05-13 20:05:01'),
(3, '2023-05-10', 'delo foloki', 'loop ronki', 'Credit', '12000', '2023-05-13 20:30:28'),
(4, '2023-05-08', 'rong way', 'hellen', 'Debit', '1000', '2023-05-13 20:30:53'),
(5, '2023-02-02', 'tolindo its best option of night right', 'tolido', 'Debit', '1200', '2023-05-13 20:31:35'),
(6, '2023-05-29', 'loo me agyiaa', 'join as ten', 'Credit', '10000', '2023-05-13 20:32:10');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `master_id` int(11) NOT NULL,
  `stich_type` varchar(50) NOT NULL,
  `quantity` int(10) NOT NULL,
  `price` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  `note` text DEFAULT NULL,
  `imageName` varchar(200) DEFAULT NULL,
  `created-at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id`, `master_id`, `stich_type`, `quantity`, `price`, `amount`, `note`, `imageName`, `created-at`) VALUES
(20, 18, 'shalwar', 12, 10, 120, '', '', '2023-08-23 17:01:25'),
(21, 19, 'shalwar', 12, 10, 120, '', '', '2023-08-23 17:07:32'),
(22, 20, 'shalwar', 2, 20, 40, '', '', '2023-08-23 18:26:25'),
(23, 21, 'shalwar', 6, 210, 1260, '', '', '2023-08-26 14:52:49'),
(24, 21, 'shalwar', 2, 141, 282, '', '', '2023-08-26 14:52:49'),
(25, 21, 'lopad', 3, 154, 462, '', '', '2023-08-26 14:52:49'),
(26, 22, 'shalwar', 3, 124, 372, '', '', '2023-08-26 14:58:25'),
(27, 22, 'lopad', 2, 89, 178, '', '', '2023-08-26 14:58:25'),
(28, 23, 'shalwar', 2, 1000, 2000, '', '', '2023-08-27 04:51:52'),
(29, 23, 'lopad', 2, 200, 400, '', '', '2023-08-27 04:51:52'),
(30, 23, 'shalwar', 1, 500, 500, '', '', '2023-08-27 04:51:52'),
(31, 24, 'shalwar', 5, 700, 3500, '', '', '2023-08-27 10:24:09'),
(32, 25, 'shalwar', 10, 200, 2000, '', '', '2023-09-02 12:03:16'),
(33, 25, 'lopad', 10, 300, 3000, '', '', '2023-09-02 12:03:16'),
(34, 26, 'shalwar', 5, 400, 2000, '', 'ReadyPlayerMe-Avatar.png', '2023-09-09 11:18:00'),
(35, 26, 'lopad', 12, 230, 2760, '', 'Untitled design.jpg', '2023-09-09 11:18:00'),
(36, 27, 'shalwar', 5, 521, 2605, '', 'ReadyPlayerMe-Avatar (1).png', '2023-09-11 18:49:56'),
(37, 27, 'shalwar', 5, 142, 710, '', 'Untitled design (1).jpg', '2023-09-11 18:49:56'),
(38, 28, 'shalwar', 3, 120, 360, ' this is persanl narrow ', 'Untitled design (1).jpg', '2023-09-17 19:24:20'),
(39, 28, 'shalwar', 4, 141, 564, '', 'Untitled design (1).jpg', '2023-09-17 19:24:20'),
(40, 28, 'lopad', 3, 250, 750, '', NULL, '2023-09-17 19:16:23'),
(41, 29, 'shalwar', 2, 1000, 2000, '', 'ReadyPlayerMe-Avatar.png', '2023-09-24 05:00:49'),
(42, 29, 'lopad', 6, 200, 1200, '', NULL, '2023-09-24 05:00:49'),
(43, 29, 'CS', 1000, 0, 0, '', 'Untitled design (1).jpg', '2023-09-24 05:00:49'),
(44, 30, 'shalwar', 2, 120, 240, '', 'ReadyPlayerMe-Avatar (1).png', '2023-09-30 10:37:36'),
(45, 30, 'lopad', 5, 400, 2000, '', NULL, '2023-09-30 10:37:36'),
(46, 30, 'CS', 3, 200, 600, '', 'Untitled design (1).jpg', '2023-09-30 10:37:36'),
(47, 31, 'shalwar', 5, 140, 700, '', NULL, '2023-09-30 10:41:35'),
(48, 31, 'CS', 4, 20, 80, '', NULL, '2023-09-30 10:41:35');

-- --------------------------------------------------------

--
-- Table structure for table `order_master`
--

CREATE TABLE `order_master` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(50) NOT NULL,
  `customer_phone` varchar(50) NOT NULL,
  `order_type` varchar(50) NOT NULL,
  `item_master` varchar(50) NOT NULL,
  `previous_balance` int(11) DEFAULT NULL,
  `person_name` varchar(50) DEFAULT NULL,
  `order_date` varchar(50) NOT NULL,
  `plan_date` varchar(50) DEFAULT NULL,
  `actual_date` varchar(50) DEFAULT NULL,
  `total_amount` int(11) NOT NULL,
  `amount_received` int(11) DEFAULT NULL,
  `balance_amount` int(11) NOT NULL,
  `length` varchar(50) DEFAULT NULL,
  `shoulder` varchar(50) DEFAULT NULL,
  `sleeve` varchar(50) DEFAULT NULL,
  `chest` varchar(50) DEFAULT NULL,
  `chest_loosing` varchar(50) DEFAULT NULL,
  `middle` varchar(50) DEFAULT NULL,
  `middle_loosing` varchar(50) DEFAULT NULL,
  `west` varchar(50) DEFAULT NULL,
  `west_loosing` varchar(50) DEFAULT NULL,
  `hip` varchar(50) DEFAULT NULL,
  `hip_loosing` varchar(50) DEFAULT NULL,
  `daman` varchar(50) DEFAULT NULL,
  `daman_loosing` varchar(50) DEFAULT NULL,
  `daman_type` varchar(50) DEFAULT NULL,
  `cuff_type` varchar(50) DEFAULT NULL,
  `cuff_type_size` varchar(50) DEFAULT NULL,
  `collar` varchar(50) DEFAULT NULL,
  `collar_type` varchar(50) DEFAULT NULL,
  `collar_type_size` varchar(50) DEFAULT NULL,
  `placket_type` varchar(50) DEFAULT NULL,
  `placket_type_size` varchar(50) DEFAULT NULL,
  `front_pocket` int(11) DEFAULT NULL,
  `side_pocket` int(11) DEFAULT NULL,
  `right_length` varchar(50) NOT NULL,
  `right_west` varchar(50) NOT NULL,
  `right_hip` varchar(50) NOT NULL,
  `thai` varchar(50) NOT NULL,
  `knee` varchar(50) NOT NULL,
  `calf` varchar(50) NOT NULL,
  `bottom` varchar(50) NOT NULL,
  `rightZip` varchar(200) DEFAULT NULL,
  `note` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_master`
--

INSERT INTO `order_master` (`id`, `customer_name`, `customer_phone`, `order_type`, `item_master`, `previous_balance`, `person_name`, `order_date`, `plan_date`, `actual_date`, `total_amount`, `amount_received`, `balance_amount`, `length`, `shoulder`, `sleeve`, `chest`, `chest_loosing`, `middle`, `middle_loosing`, `west`, `west_loosing`, `hip`, `hip_loosing`, `daman`, `daman_loosing`, `daman_type`, `cuff_type`, `cuff_type_size`, `collar`, `collar_type`, `collar_type_size`, `placket_type`, `placket_type_size`, `front_pocket`, `side_pocket`, `right_length`, `right_west`, `right_hip`, `thai`, `knee`, `calf`, `bottom`, `rightZip`, `note`, `created_at`) VALUES
(18, 'jouind', '136132156163', 'Pending', 'mom', NULL, 'momin', '2023-08-09', '2023-08-09', '2023-08-13', 120, 100, 20, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', 'Round', 'doosa', '5', '5', 'ddd', '5', 'lopsa', '5', 0, 1, '5', '5', '5', '55', '5', '5', '5', '', '5', '2023-08-23 17:01:25'),
(19, 'jouind', '136132156163', 'Pending', 'mom', NULL, 'momin', '2023-08-09', '2023-08-09', '2023-08-13', 120, 120, 0, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', 'Round', 'doosa', '5', '5', 'ddd', '5', 'lopsa', '5', 0, 1, '5', '5', '5', '55', '5', '5', '5', '', '5', '2023-08-27 10:13:21'),
(20, 'jouind', '136132156163', 'Complete', 'mom', NULL, 'momin', '2023-08-09', '2023-08-09', '2023-08-13', 40, 10, 30, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', 'Round', 'doosa', '5', '5', 'ddd', '5', 'lopsa', '5', 0, 1, '5', '5', '5', '55', '5', '5', '5', '', '5', '2023-08-23 18:26:25'),
(21, 'jouind', '136132156163', 'Processing', 'mom', NULL, 'momin khan', '2023-08-22', '2023-08-10', '2023-08-01', 2004, 1000, 1004, '5', '5', '5', '5', '5', '5', '5', '5', '5', '55', '5', '5', '5', 'Square', 'doosa', '5', '5', 'ddd', '5', 'placketv', '5', 0, 1, '5', '5', '5', '5', '5', '5', '5', '', '5', '2023-08-26 14:52:49'),
(22, 'jouind', '136132156163', 'Processing', 'mom', NULL, 'down ', '2023-08-09', '2023-08-09', '2023-08-01', 550, 500, 50, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', 'Square', 'doosa', '5', '5', 'ddd', '5', 'placketv', '5', 0, 1, '5', '5', '5', '5', '5', '5', '5', '', '', '2023-08-26 14:58:25'),
(23, 'jouind', '136132156163', 'Pending', 'mom', NULL, 'momin', '2023-08-07', '2023-08-03', '2023-08-09', 2900, 2000, 900, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', 'Square', 'doosa', '5', '5', 'ddd', '5', 'lopsa', '5', 0, 1, '5', '5', '5', '5', '5', '5', '5', '', '', '2023-08-27 04:51:52'),
(24, 'jouind', '136132156163', 'Processing', 'mom', NULL, 'momin', '2023-08-03', '2023-08-26', '2023-08-03', 3500, 3500, 0, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', 'Square', 'doosa', '5', '5', 'ddd', '5', 'lopsa', '5', 0, 1, '5', '5', '5', '5', '55', '5', '5', '', '', '2023-08-27 10:32:02'),
(25, 'momin', '0326161', 'Processing', 'mom', NULL, 'khan', '2023-09-05', '2023-09-04', '2023-09-10', 5000, 0, 5000, '5', '5', '55', '', '55', '5', '5', '5', '5', '5', '5', '5', '5', 'Square', 'doosa', '5', '5', 'ddd', '5', 'placketv', '5', 1, 2, '5', '5', '5', '5', '5', '55', '5', 'Trouser Pocket', '', '2023-09-02 18:00:34'),
(26, 'momin', '0326161', 'Processing', 'mom', NULL, 'khan', '2023-09-20', '2023-08-27', '2023-08-10', 4760, 300, 4460, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', 'Square', 'doosa', '5', '5', 'ddd', '5', 'lopsa', '5', 5, 5, '5', '5', '5', '5', '5', '5', '5', 'Trouser Pocket', '', '2023-09-08 19:10:11'),
(27, 'jouind', '136132156163', 'Processing', 'mom', NULL, 'momin', '2023-08-01', '2023-09-11', '2023-08-31', 3315, 0, 3315, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', 'Square', 'doosa', '5', '5', 'ddd', '5', 'lopsa', '5', 0, 1, '5', '5', '5', '5', '55', '5', '5', '', '', '2023-09-11 18:49:56'),
(28, 'momin', '0326161', 'Processing', 'Kameez', NULL, 'momin', '2023-09-01', '2023-09-05', '2023-09-09', 1674, 0, 1674, '5', '5', '55', '5', '55', '5', '5', '5', '5', '5', '5', '5', '5', 'Round', 'doosa', '5', '5', 'ddd', '5', 'lopsa', '5', 1, 1, '5', '5', '5', '5', '5', '5', '5', 'Trouser Pocket', 'yhis more import product now', '2023-09-17 19:16:23'),
(29, 'jouind', '136132156163', 'Processing', 'Short', NULL, 'momin', '2023-09-05', '2023-09-03', '2023-09-10', 3200, 1000, 2200, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', 'Square', 'doosa', '5', '5', 'ddd', '5', 'lopsa', '5', 0, 1, '5', '5', '5', '5', '55', '5', '5', '', '', '2023-09-24 05:00:49'),
(30, 'danial khan', '03124512565', 'Processing', 'Kameez', NULL, 'danial', '2023-09-14', '2023-09-25', '2023-09-19', 2840, 0, 2840, '5', '5', '5', '5', '5', '5', '5', '55', '5', '5', '', '5', '5', 'Square', 'doosa', '5', '5', 'ddd', '5', 'placketv', '5', 2, 2, '5', '5', '5', '5', '5', '55', '5', 'Zip Pocket', '', '2023-09-30 10:37:36'),
(31, 'danial khan', '03124512565', 'Processing', 'trouser', NULL, 'danial', '2023-09-22', '2023-09-04', '2023-09-07', 780, 100, 680, '5', '5', '5', '5', '5', '5', '5', '55', '5', '5', '', '5', '5', 'Square', 'doosa', '5', '5', 'ddd', '5', 'placketv', '5', 2, 2, '5', '5', '5', '5', '5', '55', '5', 'Zip Pocket', '', '2023-09-30 10:41:34');

-- --------------------------------------------------------

--
-- Table structure for table `plackettype`
--

CREATE TABLE `plackettype` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `shortName` varchar(50) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `plackettype`
--

INSERT INTO `plackettype` (`id`, `name`, `shortName`, `status`, `created_at`) VALUES
(1, 'placketv', 'pll', 1, '2023-08-14 06:02:17'),
(2, 'lopsa', 'loopa', 1, '2023-08-14 06:02:32');

-- --------------------------------------------------------

--
-- Table structure for table `stichtype`
--

CREATE TABLE `stichtype` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `shortName` varchar(50) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created-at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stichtype`
--

INSERT INTO `stichtype` (`id`, `name`, `shortName`, `status`, `created-at`) VALUES
(14, 'paint', 'pt', 0, '2023-08-13 13:43:21'),
(15, 'shalwar', 'sh', 1, '2023-08-13 13:42:39'),
(16, 'lopad', 'ds', 1, '2023-08-13 13:42:46'),
(17, 'simple stich', 'ss', 0, '2023-09-02 11:45:02'),
(18, 'CS', 'stich', 1, '2023-09-24 04:56:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `mob` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` varchar(25) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_active` tinyint(1) NOT NULL,
  `is_verify` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `mob`, `email`, `password`, `role`, `created_at`, `is_active`, `is_verify`) VALUES
(4, 'momin', 'momin', '15464654646', 's.momin@finspacegroup.co.uk1', '$2b$12$wjpKUmjYJHpy613QSjzjLukJor674wZmlcNZP3ss6KDxxGuCdKley', 'Admin', '2023-04-26 04:16:03', 1, 0),
(5, 'momin', 'momin', '15464654646', 's.momin@errie.co.uk1', '$2b$12$dEjM5Rq1sEgFgC37pAwy0eLUWW1xWDPenrbRfI4F4doYySZD20VrG', 'Customer', '2023-04-22 09:15:27', 0, 0),
(11, 'khan', 'moon', '34234234234', 'kiloterew@root.co.uk1', '$2b$12$DCtl8pCeXn9HGLiGBm8vE.lCb9Bb.T55e092gg3jQozMS.9Z7yfjy', 'Customer', '2023-04-24 17:02:00', 0, 0),
(12, 'khan', 'moon', '34234234234', 'moasodisd@root.co.uk1', '$2b$12$mJiOuwKMiAfO96.oJApHFuWRQoYmv5WlAjG5ddOzYUhZEe.jIVCj2', 'Customer', '2023-04-24 17:02:12', 0, 0),
(13, 'khan 4655', 'moon', '34234234234', 'lsdjdskj@root.co.uk1', '$2b$12$tUszUEjUXPZ9n8HD9DAN3OOWf0Cp7GWdnON1jwgyUOLls4.rQGal2', 'Customer', '2023-04-24 18:55:08', 0, 0),
(14, 'khan', 'loop', '34234234234', 'epwoirpweiro@root.co.uk1', '$2b$12$hezAlP1611n22x6ostPGJegTpdBAynCaf6dxpXgxIs4atiIH84L/i', 'Customer', '2023-04-30 17:56:00', 0, 0),
(15, 'khan', 'moon', '34234234234', 'sdsnmfsbmfnb@root.co.uk1', '$2b$12$yoaSvDSDqLTpRhGp.isUduFaFKNIV2cZIUxueFTMKekQSVzvPnmjG', 'Customer', '2023-04-24 17:02:35', 0, 0),
(16, 'sdf', 'fdfd', '34234234234', 'mdflmdso@root.co.uk1', '$2b$12$qULGIfBPsHz6RdgqVosfkOAJShSgn0GBCnvPPl5XRR9/47kECp1Aq', 'Customer', '2023-04-24 17:02:53', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `wholesale_detail`
--

CREATE TABLE `wholesale_detail` (
  `id` int(11) NOT NULL,
  `masterId` int(10) NOT NULL,
  `itemMaster` varchar(500) NOT NULL,
  `itemUOM` varchar(100) NOT NULL,
  `itemArticle` varchar(500) DEFAULT NULL,
  `itemColor` varchar(50) NOT NULL,
  `itemQuantity` int(10) NOT NULL,
  `itemPrice` int(10) NOT NULL,
  `itemAmount` int(10) NOT NULL,
  `itemDelivery` int(10) NOT NULL,
  `itemNetSalePrice` int(10) NOT NULL,
  `itemNetAmount` int(10) NOT NULL,
  `itemImage` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wholesale_detail`
--

INSERT INTO `wholesale_detail` (`id`, `masterId`, `itemMaster`, `itemUOM`, `itemArticle`, `itemColor`, `itemQuantity`, `itemPrice`, `itemAmount`, `itemDelivery`, `itemNetSalePrice`, `itemNetAmount`, `itemImage`, `created_at`) VALUES
(27, 11, 'Kameez', 'MTR', '', 'blue', 4, 152, 304, 10000, 5152, 10304, NULL, '2023-09-12 18:58:54'),
(28, 11, 'trouser', 'MTR', 'glooo', 'blue', 2, 140, 280, 10000, 5140, 10280, NULL, '2023-09-12 18:37:00'),
(29, 11, 'Short', 'MTR', 'flooop', 'blue', 2, 120, 240, 10000, 5120, 10240, NULL, '2023-09-12 18:37:00'),
(30, 12, 'Kameez', 'MTR', '', 'blue', 5, 120, 600, 8333, 1787, 8933, NULL, '2023-09-12 19:04:48'),
(31, 12, 'Kameez', 'MTR', '', 'blue', 4, 120, 480, 6667, 1787, 7147, NULL, '2023-09-12 19:04:48'),
(32, 12, 'trouser', 'MTR', 'glooo', 'blue', 3, 410, 1230, 5000, 2077, 6230, NULL, '2023-09-12 19:04:48'),
(33, 13, 'Kameez', 'MTR', '', 'blue', 5, 120, 600, 667, 253, 1267, NULL, '2023-09-12 19:12:01'),
(34, 13, 'Short', 'MTR', 'flooop', 'nproon', 5, 120, 600, 667, 253, 1267, NULL, '2023-09-12 19:12:01'),
(35, 13, 'trouser', 'MTR', 'glooo', 'nproon', 5, 120, 600, 667, 253, 1267, NULL, '2023-09-12 19:12:01'),
(36, 14, 'Kameez', 'MTR', '', 'blue', 2, 120, 240, 5714, 2977, 5954, NULL, '2023-09-24 05:04:05'),
(37, 14, 'Kameez', 'MTR', '', 'blue', 4, 410, 1640, 11429, 3267, 13069, NULL, '2023-09-24 05:04:05'),
(38, 14, 'trouser', 'MTR', 'glooo', 'blue', 1, 450, 450, 2857, 3307, 3307, NULL, '2023-09-24 05:04:05'),
(39, 15, 'Kameez', 'MTR', '', 'blue', 5, 120, 600, 263, 173, 863, NULL, '2023-09-30 10:59:09'),
(40, 15, 'trouser', 'MTR', 'glooo', 'blue', 4, 500, 2000, 211, 553, 2211, NULL, '2023-09-30 10:59:09'),
(41, 15, 'Short', 'MTR', 'flooop', 'nproon', 10, 54, 540, 526, 107, 1066, NULL, '2023-09-30 10:59:09'),
(42, 16, 'Kameez', 'MTR', '', 'blue', 2, 122, 244, 407, 326, 651, NULL, '2023-10-08 18:01:17'),
(43, 16, 'trouser', 'MTR', 'glooo', 'blue', 2, 12, 24, 407, 216, 431, NULL, '2023-10-08 18:01:17'),
(44, 16, 'Short', 'MTR', 'flooop', 'blue', 2, 12, 24, 407, 216, 431, NULL, '2023-10-08 18:01:17'),
(45, 17, 'trouser', 'MTR', 'glooo', 'blue', 2, 10, 20, 9, 15, 29, NULL, '2023-10-08 18:05:14'),
(46, 17, 'Short', 'MTR', 'flooop', 'blue', 10, 12, 120, 45, 17, 165, NULL, '2023-10-08 18:05:14'),
(47, 17, 'trouser', 'MTR', 'glooo', 'blue', 10, 2, 20, 45, 7, 65, NULL, '2023-10-08 18:05:14');

-- --------------------------------------------------------

--
-- Table structure for table `wholesale_master`
--

CREATE TABLE `wholesale_master` (
  `id` int(11) NOT NULL,
  `transactionDate` varchar(100) NOT NULL,
  `deliveryDate` varchar(100) NOT NULL,
  `personName` varchar(200) DEFAULT NULL,
  `supplierName` varchar(100) NOT NULL,
  `supplierNumber` varchar(100) NOT NULL DEFAULT '',
  `totalDeliveryCost` varchar(100) NOT NULL,
  `totalNetAmount` varchar(100) NOT NULL,
  `amountReceived` varchar(100) NOT NULL,
  `netBalanceAmount` varchar(100) NOT NULL,
  `note` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wholesale_master`
--

INSERT INTO `wholesale_master` (`id`, `transactionDate`, `deliveryDate`, `personName`, `supplierName`, `supplierNumber`, `totalDeliveryCost`, `totalNetAmount`, `amountReceived`, `netBalanceAmount`, `note`, `created_at`) VALUES
(11, '2023-08-31', '2023-08-28', 'khan', 'khoon khaol', '686866', '30000', '30824', '2000', '28824', '', '2023-09-12 18:37:00'),
(12, '2023-09-01', '2023-09-04', 'khan', 'khoon khaol', '686866', '20000', '22310', '1000', '21310', '', '2023-09-12 19:04:48'),
(13, '2023-09-07', '2023-09-07', '12', 'khoon khaol', '686866', '2000', '3801', '1000', '2801', '', '2023-09-12 19:12:01'),
(14, '2023-09-12', '2023-09-04', 'momin', 'khoon khaol', '686866', '20000', '22330', '10000', '12330', '', '2023-09-24 05:04:05'),
(15, '2023-09-21', '2023-09-20', 'momin', 'moosa ', '0345132555456', '1000', '4140', '300', '3840', '', '2023-09-30 10:59:09'),
(16, '2023-10-10', '2023-10-18', '', 'khoon khaol', '686866', '1222', '1513', '0', '1513', '', '2023-10-08 18:01:17'),
(17, '2023-10-05', '2023-11-07', NULL, 'khoon khaol', '686866', '100', '259', '20', '239', NULL, '2023-10-08 18:05:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `collartype`
--
ALTER TABLE `collartype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colortype`
--
ALTER TABLE `colortype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cufftype`
--
ALTER TABLE `cufftype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_ledger`
--
ALTER TABLE `customer_ledger`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_ledger_history`
--
ALTER TABLE `customer_ledger_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_wholesale_ledger`
--
ALTER TABLE `customer_wholesale_ledger`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expenses_ledger`
--
ALTER TABLE `expenses_ledger`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grn_detail`
--
ALTER TABLE `grn_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grn_master`
--
ALTER TABLE `grn_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_master`
--
ALTER TABLE `item_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `karigar`
--
ALTER TABLE `karigar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `karigar_salary`
--
ALTER TABLE `karigar_salary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ledger`
--
ALTER TABLE `ledger`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_master`
--
ALTER TABLE `order_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plackettype`
--
ALTER TABLE `plackettype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stichtype`
--
ALTER TABLE `stichtype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wholesale_detail`
--
ALTER TABLE `wholesale_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wholesale_master`
--
ALTER TABLE `wholesale_master`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `collartype`
--
ALTER TABLE `collartype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `colortype`
--
ALTER TABLE `colortype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cufftype`
--
ALTER TABLE `cufftype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `customer_ledger`
--
ALTER TABLE `customer_ledger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `customer_ledger_history`
--
ALTER TABLE `customer_ledger_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer_wholesale_ledger`
--
ALTER TABLE `customer_wholesale_ledger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `expenses_ledger`
--
ALTER TABLE `expenses_ledger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `grn_detail`
--
ALTER TABLE `grn_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `grn_master`
--
ALTER TABLE `grn_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `item_master`
--
ALTER TABLE `item_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `karigar`
--
ALTER TABLE `karigar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `karigar_salary`
--
ALTER TABLE `karigar_salary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ledger`
--
ALTER TABLE `ledger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `order_master`
--
ALTER TABLE `order_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `plackettype`
--
ALTER TABLE `plackettype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `stichtype`
--
ALTER TABLE `stichtype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `wholesale_detail`
--
ALTER TABLE `wholesale_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `wholesale_master`
--
ALTER TABLE `wholesale_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
