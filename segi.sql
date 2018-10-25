-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2018-10-25 04:12:48
-- 服务器版本： 5.7.22
-- PHP Version: 7.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `segi`
--

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE `article` (
  `id` int(11) NOT NULL COMMENT '文章的id',
  `category_main_id` int(11) NOT NULL COMMENT '主分类的id',
  `category_children_id` int(11) NOT NULL COMMENT '子分类id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建的时间',
  `title` varchar(255) NOT NULL COMMENT '标题名称',
  `content` varchar(255) NOT NULL COMMENT '文章的内容',
  `author` varchar(255) NOT NULL COMMENT '作者'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='文章表';

-- --------------------------------------------------------

--
-- 表的结构 `category_children`
--

CREATE TABLE `category_children` (
  `id` int(11) NOT NULL COMMENT '子分类id',
  `category_main_id` int(11) NOT NULL COMMENT '所属的主分类id',
  `category_name` varchar(255) NOT NULL COMMENT '子分类名称',
  `category_type` varchar(255) NOT NULL COMMENT '子分类种类',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建的时间',
  `detail` varchar(255) NOT NULL COMMENT '子分类的详情介绍'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='子分类表';

-- --------------------------------------------------------

--
-- 表的结构 `category_main`
--

CREATE TABLE `category_main` (
  `id` int(11) NOT NULL COMMENT '主分类id',
  `type` varchar(255) NOT NULL COMMENT '主分类的种类',
  `type_name` varchar(255) NOT NULL COMMENT '主分类的名字',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '主分类创建的时间',
  `type_detail` varchar(255) NOT NULL COMMENT '主分类的详情'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='主分类，就是在首页tab菜单栏';

--
-- 转存表中的数据 `category_main`
--

INSERT INTO `category_main` (`id`, `type`, `type_name`, `create_time`, `type_detail`) VALUES
(1, 'development_norms', '开发规范', '2018-10-24 03:32:50', '主要包括五部分内容：PC规范、移动端规范、性能优化、等'),
(2, 'component_document', '组件文档', '2018-10-24 03:32:50', '主要包括五部分内容：组件文档、组件文档·1、组件文档2、等'),
(3, 'week_share', '每周分享', '2018-10-24 03:34:35', '每周分享每周分享每周分享'),
(4, 'tools_recommended', '工具推荐', '2018-10-24 03:34:35', '工具推荐工具推荐工具推荐工具推荐');

-- --------------------------------------------------------

--
-- 表的结构 `config`
--

CREATE TABLE `config` (
  `id` int(255) NOT NULL COMMENT 'id',
  `type` varchar(255) NOT NULL COMMENT '配志的种类',
  `value` varchar(255) NOT NULL COMMENT '配置的值'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `config`
--

INSERT INTO `config` (`id`, `type`, `value`) VALUES
(1, 'token_key', 'segi');

-- --------------------------------------------------------

--
-- 表的结构 `reply`
--

CREATE TABLE `reply` (
  `id` int(11) NOT NULL COMMENT '回复的id',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '评论创建的时间',
  `article_id` int(11) NOT NULL COMMENT '所评论的文章id',
  `content` varchar(255) NOT NULL COMMENT '评论的内容',
  `reply_from_id` int(255) NOT NULL COMMENT '评论者id',
  `reply_to_id` int(255) NOT NULL DEFAULT '0' COMMENT '被评者id，如果为null,默认是文章评论'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `specification`
--

CREATE TABLE `specification` (
  `table_id` int(255) NOT NULL COMMENT '表id',
  `type` varchar(255) NOT NULL COMMENT '表的分类，基本是英文名',
  `table_name` varchar(255) NOT NULL COMMENT '表的名字',
  `detail` varchar(255) NOT NULL COMMENT '表的备注及详情'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='segi数据库表的统一说明';

--
-- 转存表中的数据 `specification`
--

INSERT INTO `specification` (`table_id`, `type`, `table_name`, `detail`) VALUES
(1, 'user', '用户表', '用户的账号，密码，创建时间等信息'),
(2, 'config', '配置信息数据', '包含了各种配置的key信息，比如token_key'),
(3, 'article', '文章详情表格', '文章详情表格'),
(4, 'category_children', '子分类', '所有的二级子分类的表格数据'),
(5, 'category_main', '主分类', '主分类有关信息，及首页的导航栏内容'),
(6, 'replay', '回复的表格', '专门用于收集回复的表格');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `permisson` varchar(255) NOT NULL DEFAULT 'user' COMMENT '权限，默认是user',
  `tel` varchar(255) NOT NULL COMMENT '电话号码',
  `realname` varchar(255) NOT NULL COMMENT '真实姓名',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '用户创建时间',
  `update_time` varchar(255) NOT NULL COMMENT '更新的时间',
  `avatar_image` varchar(255) NOT NULL COMMENT '头像图片'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `permisson`, `tel`, `realname`, `create_time`, `update_time`, `avatar_image`) VALUES
(1, 'lronelove', '657828543', 'root', '12345', '', '0000-00-00 00:00:00', '', ''),
(2, 'jack', 'rose', 'user', '15338870406', '', '0000-00-00 00:00:00', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category_children`
--
ALTER TABLE `category_children`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category_main`
--
ALTER TABLE `category_main`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reply`
--
ALTER TABLE `reply`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specification`
--
ALTER TABLE `specification`
  ADD PRIMARY KEY (`table_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);
ALTER TABLE `user` ADD FULLTEXT KEY `realname` (`realname`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `article`
--
ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章的id';

--
-- 使用表AUTO_INCREMENT `category_children`
--
ALTER TABLE `category_children`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '子分类id';

--
-- 使用表AUTO_INCREMENT `category_main`
--
ALTER TABLE `category_main`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主分类id', AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `config`
--
ALTER TABLE `config`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT COMMENT 'id', AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `reply`
--
ALTER TABLE `reply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '回复的id';

--
-- 使用表AUTO_INCREMENT `specification`
--
ALTER TABLE `specification`
  MODIFY `table_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '表id', AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id', AUTO_INCREMENT=33950;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
