-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 11 月 13 日 06:43
-- 服务器版本: 5.5.53
-- PHP 版本: 5.4.45

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `segi`
--

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章的id',
  `category_id` int(11) NOT NULL COMMENT '子分类id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建的时间',
  `title` varchar(255) NOT NULL COMMENT '标题名称',
  `content` mediumtext NOT NULL COMMENT '文章的内容',
  `user_id` int(255) NOT NULL COMMENT '用户id,即作者',
  `view_number` int(11) NOT NULL DEFAULT '0' COMMENT '浏览次数',
  `layer` varchar(255) NOT NULL DEFAULT ',' COMMENT '显示分类所在的层级信息',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='文章表' AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `category_id`, `create_time`, `title`, `content`, `user_id`, `view_number`, `layer`) VALUES
(3, 1, '2018-11-13 06:37:14', 'html开发规范', 'html开发规范的内容', 1, 0, ','),
(4, 1, '2018-11-13 06:37:14', 'css开发规范', 'css开发规范内容', 1, 0, ',');

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '子分类id',
  `category_name` varchar(255) NOT NULL COMMENT '子分类名称',
  `category_type` varchar(255) NOT NULL COMMENT '子分类种类',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建的时间',
  `detail` varchar(255) NOT NULL COMMENT '子分类的详情介绍',
  `article_count` int(11) NOT NULL COMMENT '该分类下面文档总数',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='子分类表' AUTO_INCREMENT=16 ;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`id`, `category_name`, `category_type`, `create_time`, `detail`, `article_count`) VALUES
(1, '开发规范', 'code_standard', '2018-11-13 06:32:58', '开发规范详情', 5),
(2, '设计规范', 'design_standard', '2018-11-13 06:33:07', '设计规范详情', 4),
(3, '测试规范', 'test_standard', '2018-11-13 06:33:16', '测试规范详情', 5),
(4, '流程规范', 'process_standard', '2018-11-13 06:33:24', '流程规范详情', 4);

-- --------------------------------------------------------

--
-- 表的结构 `config`
--

CREATE TABLE IF NOT EXISTS `config` (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `type` varchar(255) NOT NULL COMMENT '配志的种类',
  `value` varchar(255) NOT NULL COMMENT '配置的值',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `config`
--

INSERT INTO `config` (`id`, `type`, `value`) VALUES
(1, 'token_key', 'segi');

-- --------------------------------------------------------

--
-- 表的结构 `home_nav`
--

CREATE TABLE IF NOT EXISTS `home_nav` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `nav_name` varchar(30) NOT NULL COMMENT '导航名字',
  `layer` varchar(255) NOT NULL COMMENT '层级',
  `parent_id` int(11) NOT NULL COMMENT '父级id',
  `url` varchar(255) NOT NULL COMMENT '跳转的路径',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='首页导航' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `reply`
--

CREATE TABLE IF NOT EXISTS `reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '回复的id',
  `article_id` int(11) NOT NULL COMMENT '所评论的文章id',
  `content` varchar(255) NOT NULL COMMENT '评论的内容',
  `reply_from_id` int(255) NOT NULL COMMENT '评论者id',
  `reply_to_id` int(255) NOT NULL DEFAULT '0' COMMENT '被评者id，如果为null,默认是文章评论',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '评论创建的时间',
  `layer` varchar(255) NOT NULL COMMENT '显示分类所在的层级信息',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- 表的结构 `specification`
--

CREATE TABLE IF NOT EXISTS `specification` (
  `table_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `type` varchar(255) NOT NULL COMMENT '表的分类，基本是英文名',
  `table_name` varchar(255) NOT NULL COMMENT '表的名字',
  `detail` varchar(255) NOT NULL COMMENT '表的备注及详情',
  PRIMARY KEY (`table_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='segi数据库表的统一说明' AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `specification`
--

INSERT INTO `specification` (`table_id`, `type`, `table_name`, `detail`) VALUES
(1, 'user', '用户表', '用户的账号，密码，创建时间等信息'),
(2, 'config', '配置信息数据', '包含了各种配置的key信息，比如token_key'),
(3, 'article', '文章详情表格', '文章详情表格'),
(4, 'category_children', '子分类', '所有的二级子分类的表格数据'),
(5, 'category_main', '主分类', '主分类有关信息，及首页的导航栏内容'),
(6, 'replay', '回复的表格', '专门用于收集回复的表格'),
(7, 'home_nav', 'home_nav', '首页可配置的导航列表表格'),
(8, '', '', '');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `permisson` varchar(255) NOT NULL DEFAULT 'user' COMMENT '权限，默认是user',
  `telepthone` varchar(255) NOT NULL COMMENT '电话号码',
  `realname` varchar(255) NOT NULL COMMENT '真实姓名',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '用户创建时间',
  `update_time` varchar(255) NOT NULL COMMENT '更新的时间',
  `avatar_image` varchar(255) NOT NULL COMMENT '头像图片',
  `email` varchar(255) NOT NULL COMMENT '邮箱',
  `job_type` varchar(255) NOT NULL COMMENT '工作种类',
  `job_name` varchar(255) NOT NULL COMMENT '工作的种类，中文名',
  `user_type` varchar(255) NOT NULL COMMENT '用户角色，分管理员和普通用户',
  PRIMARY KEY (`user_id`),
  FULLTEXT KEY `realname` (`realname`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `permisson`, `telepthone`, `realname`, `create_time`, `update_time`, `avatar_image`, `email`, `job_type`, `job_name`, `user_type`) VALUES
(1, 'lronelove', 'w657828543', 'root', '15338870406', '王喆', '2018-11-13 06:36:02', '', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=284744206,1494248905&fm=27&gp=0.jpg', '657828543@qq.com', 'web', 'Web前端', '管理员'),
(2, 'jack', 'jack', 'user', '15338870406', '王者', '2018-11-13 06:36:04', '', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=284744206,1494248905&fm=27&gp=0.jpg', '657828543@qq.com', 'web', 'Web前端', '普通用户');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
