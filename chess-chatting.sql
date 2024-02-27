/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1-MySQL8.0
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : chess-chatting

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 06/12/2022 16:45:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for friendapl
-- ----------------------------
DROP TABLE IF EXISTS `friendapl`;
CREATE TABLE `friendapl`  (
  `aplId` bigint(0) NOT NULL,
  `applicant` bigint(0) NOT NULL,
  `state` tinyint(0) NOT NULL DEFAULT 0,
  `applyTime` datetime(0) NOT NULL,
  `aplReceiver` bigint(0) NOT NULL,
  PRIMARY KEY (`aplId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for friendship
-- ----------------------------
DROP TABLE IF EXISTS `friendship`;
CREATE TABLE `friendship`  (
  `uIdA` bigint(0) NOT NULL,
  `uIdB` bigint(0) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for history
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history`  (
  `uId` bigint(0) NOT NULL,
  `res` tinyint(0) NOT NULL,
  `endTime` datetime(0) NOT NULL,
  `fae` bigint(0) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `sendTime` datetime(0) NOT NULL,
  `sender` bigint(0) NOT NULL,
  `msg` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `msgReceiver` bigint(0) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `uId` bigint(0) NOT NULL,
  `uName` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `uPwd` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `wins` mediumint(0) NULL DEFAULT 0,
  `loses` mediumint(0) NULL DEFAULT 0,
  `total` mediumint(0) NULL DEFAULT 0,
  `draws` mediumint(0) NULL DEFAULT 0,
  `winRate` double GENERATED ALWAYS AS ((`wins` + (0.0 / if((`total` > 0),`total`,1)))) VIRTUAL NULL,
  `state` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`uId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
