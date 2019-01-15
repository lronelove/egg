-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2019 年 01 月 02 日 11:38
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
  `create_time` datetime NOT NULL COMMENT '创建的时间',
  `title` varchar(255) NOT NULL COMMENT '标题名称',
  `content` longtext,
  `user_id` int(255) NOT NULL COMMENT '用户id,即作者',
  `view_number` int(11) NOT NULL DEFAULT '0' COMMENT '浏览次数',
  `layer` varchar(255) NOT NULL DEFAULT ',' COMMENT '显示分类所在的层级信息',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '代表被刪除的狀態，1代表沒有被刪除，0代表被刪除',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='文章表' AUTO_INCREMENT=19 ;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `category_id`, `create_time`, `title`, `content`, `user_id`, `view_number`, `layer`, `status`) VALUES
(1, 1, '2018-12-19 16:14:25', '工具推荐', '工具推荐文章', 1, 0, ',', 1),
(4, 1, '2018-11-13 14:37:14', 'css开发规范', 'css开发规范内容', 1, 0, ',', 1),
(5, 1, '2018-11-16 14:16:00', '测试触发器1', '测试触发器1', 1, 0, ',', 1),
(7, 1, '2018-11-16 16:47:34', 'test', 'test', 1, 0, ',', 1),
(8, 1, '2018-12-10 13:50:42', 'test111', '1111223', 17, 0, ',', 1),
(9, 2, '2018-12-14 10:52:30', 'test', 'test', 2, 0, ',', 1),
(10, 2, '2018-12-14 10:52:36', 'test', 'test', 2, 0, ',', 1),
(11, 3, '2018-12-14 10:52:45', 'test', 'test', 2, 0, ',', 1),
(12, 4, '2018-12-14 10:52:51', 'test', 'test', 2, 0, ',', 1),
(13, 5, '2018-12-14 10:52:57', 'test', 'test', 2, 0, ',', 1),
(14, 4, '2018-12-14 10:53:21', '444', '444', 4, 0, ',', 1),
(15, 4, '2018-12-14 10:53:24', '444', '444', 4, 0, ',', 1),
(18, 1, '2018-12-20 09:29:15', 'test', 'test', 1, 0, ',', 1);

--
-- 触发器 `article`
--
DROP TRIGGER IF EXISTS `add_article`;
DELIMITER //
CREATE TRIGGER `add_article` AFTER INSERT ON `article`
 FOR EACH ROW UPDATE statistics SET count = count + 1 WHERE type = 'article'
//
DELIMITER ;
DROP TRIGGER IF EXISTS `remove_article`;
DELIMITER //
CREATE TRIGGER `remove_article` AFTER DELETE ON `article`
 FOR EACH ROW UPDATE statistics SET count = count - 1 WHERE type = 'article'
//
DELIMITER ;

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '子分类id',
  `category_name` varchar(255) NOT NULL COMMENT '子分类名称',
  `create_time` datetime NOT NULL COMMENT '创建的时间',
  `detail` varchar(255) NOT NULL COMMENT '子分类的详情介绍',
  `article_count` int(11) NOT NULL COMMENT '该分类下面文档总数',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '代表刪除的狀態，1代表沒有被刪除，0代表已經被刪除',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='子分类表' AUTO_INCREMENT=17 ;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`id`, `category_name`, `create_time`, `detail`, `article_count`, `status`) VALUES
(2, '设计规范', '2018-11-13 14:33:07', '设计规范详情', 4, 1),
(3, '测试规范', '2018-11-13 14:33:16', '测试规范详情', 5, 1),
(4, '流程规范', '2018-11-13 14:33:24', '流程规范详情', 4, 1),
(1, '工具推荐', '2018-12-13 16:13:39', '工具推荐的描述', 6, 1);

-- --------------------------------------------------------

--
-- 表的结构 `config`
--

CREATE TABLE IF NOT EXISTS `config` (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `type` varchar(255) NOT NULL COMMENT '配志的种类',
  `value` varchar(255) NOT NULL COMMENT '配置的值',
  `count` int(20) NOT NULL DEFAULT '0' COMMENT '统计的总数',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `config`
--

INSERT INTO `config` (`id`, `type`, `value`, `count`) VALUES
(1, 'token_key', 'segi', 1);

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='首页导航' AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `home_nav`
--

INSERT INTO `home_nav` (`id`, `nav_name`, `layer`, `parent_id`, `url`) VALUES
(1, '首页', '', -1, '/'),
(2, '文档', '', -1, '/doc'),
(3, '组件', '', -1, '/component'),
(4, '每周分享', '', -1, '/share'),
(5, '工具推荐', '', -1, '/doc?category_id=1&article_id=1');

-- --------------------------------------------------------

--
-- 表的结构 `jobs`
--

CREATE TABLE IF NOT EXISTS `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `job_code` varchar(111) NOT NULL COMMENT '职位对应的code码',
  `job_name` varchar(20) NOT NULL COMMENT '职位名字',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '是否被删除，1代表没被删除，0代表被删除了',
  `create_time` datetime NOT NULL COMMENT '创建的时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- 转存表中的数据 `jobs`
--

INSERT INTO `jobs` (`id`, `job_code`, `job_name`, `status`, `create_time`) VALUES
(1, 'web', 'web前端开发', 1, '2018-12-26 00:00:00'),
(2, 'java', 'java后端开发', 1, '2018-12-24 00:00:00'),
(3, 'ios', 'ios开发', 1, '2018-12-16 00:00:00'),
(4, 'android', 'android开发', 1, '2018-12-26 00:00:01'),
(5, 'test', '测试', 1, '0000-00-00 00:00:00'),
(6, 'product', '产品', 1, '0000-00-00 00:00:00'),
(7, 'operator', '运营', 1, '0000-00-00 00:00:00'),
(8, 'UI', 'UI设计', 1, '0000-00-00 00:00:00'),
(9, 'money', '财务', 1, '0000-00-00 00:00:00'),
(10, 'popularize', '推广', 1, '0000-00-00 00:00:00'),
(11, 'C_plus', 'C++开发', 1, '0000-00-00 00:00:00'),
(12, 'manage', '管理', 1, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `link`
--

CREATE TABLE IF NOT EXISTS `link` (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `type` varchar(20) NOT NULL COMMENT '种类',
  `desc` varchar(20) NOT NULL COMMENT '描述',
  `url` varchar(255) NOT NULL COMMENT '跳转地址',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='存储类似banner图的配置等信息' AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `link`
--

INSERT INTO `link` (`id`, `type`, `desc`, `url`, `create_time`) VALUES
(1, 'home_banner', '首页banner图', '/doc', '2019-01-02 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `recommend`
--

CREATE TABLE IF NOT EXISTS `recommend` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '推荐分类id',
  `name` varchar(255) NOT NULL COMMENT '推荐分类名称（中文字段）',
  `desc` varchar(255) NOT NULL COMMENT '推荐分类描述',
  `type` varchar(255) NOT NULL COMMENT '推荐分类种类（英文字段）',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '状态，1代表存在，0代表被删除',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `recommend`
--

INSERT INTO `recommend` (`id`, `name`, `desc`, `type`, `status`) VALUES
(1, '开发规范', '开发规范描述', 'doc_standard', 1),
(2, '测试规范', '测试规范描述', 'test_standard', 1),
(3, '组件文档', '组件文档描述', 'com_doc', 1),
(4, '每周分享', '每周分析描述', 'share_desc', 1),
(5, '工具推荐', '工具推荐描述', 'tools_desc', 1),
(6, '其它', '其它描述', 'others', 1);

-- --------------------------------------------------------

--
-- 表的结构 `recommend_article`
--

CREATE TABLE IF NOT EXISTS `recommend_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '推荐文章id',
  `recommend_id` int(11) NOT NULL COMMENT '推荐分类id(外键)',
  `name` varchar(25) NOT NULL COMMENT '中文描述名',
  `url` varchar(255) NOT NULL COMMENT '链接地址',
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '0代表网站内的链接，1代表网站外的链接',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '状态，1代表存在，0代表被删除',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- 转存表中的数据 `recommend_article`
--

INSERT INTO `recommend_article` (`id`, `recommend_id`, `name`, `url`, `type`, `status`) VALUES
(1, 1, '工具推荐', '/doc/code/1', 0, 1),
(4, 2, 'css开发规范', '/doc/test/2', 0, 1),
(5, 3, '组件文档1', '/doc/com/1', 1, 1),
(6, 3, '组件文档2', '/doc/com/2', 1, 1),
(7, 4, '每周分享1', '/doc/share/1', 0, 1),
(8, 4, '每周分享2', '/doc/share/2', 0, 1),
(9, 2, 'test', '/doc/tools/1', 0, 1),
(10, 5, '工具推荐2', '/doc/tools/2', 0, 1),
(11, 6, '其它1', '/doc/others/1', 0, 1);

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
  `create_time` datetime NOT NULL COMMENT '评论创建的时间',
  `reply_id` int(11) NOT NULL DEFAULT '0' COMMENT '回复给具体某个评论的id,默认是0，代表的是回复的文章，如果不为零，那么 就是属于 评论的回复',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '删除状态，0代表被删除了，1代表未被删除',
  `like` varchar(6000) NOT NULL COMMENT '存储所有点赞者的userId,用“，”分隔开',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=69 ;

--
-- 转存表中的数据 `reply`
--

INSERT INTO `reply` (`id`, `article_id`, `content`, `reply_from_id`, `reply_to_id`, `create_time`, `reply_id`, `status`, `like`) VALUES
(3, 1, '评论1', 1, 0, '2018-12-19 16:39:39', 0, 1, '3'),
(4, 1, '第一次测试二级评论哈哈哈哈哈', 11, 1, '2018-12-19 16:39:49', 3, 1, '3,4'),
(5, 1, '第一次测试二级评论哈哈哈哈哈', 11, 1, '2018-12-17 16:39:57', 3, 1, '2'),
(6, 1, '第一次测试二级评论哈哈哈哈哈', 11, 1, '2018-12-19 16:40:15', 3, 1, '2'),
(7, 1, '第一次测试二级评论哈哈哈哈哈', 11, 1, '2018-12-19 16:40:06', 3, 1, '2'),
(8, 1, '11好用户提交一级评论', 11, 0, '2018-12-19 16:40:54', 0, 1, ''),
(9, 3, 'script11好用户提交一级评论/script', 1, 11, '2018-12-19 18:23:34', 8, 0, ''),
(10, 3, 'script11好用户提交一级评论/script', 1, 11, '2018-12-19 18:25:05', 8, 1, ''),
(11, 1, 'postman', 1, 0, '2018-12-19 16:46:22', 0, 1, ''),
(12, 4, 'script11好用户提交一级评论/script', 1, 11, '2018-12-19 17:54:24', 8, 0, ''),
(13, 1, 'postman111', 1, 0, '2018-12-19 17:36:21', 0, 1, ''),
(14, 1, 'postman111', 1, 0, '2018-12-19 17:45:53', 0, 1, ''),
(62, 4, '777', 2, 2, '2018-12-20 16:57:30', 51, 1, ''),
(61, 8, '99', 2, 0, '2018-12-20 16:57:18', 0, 1, '2'),
(60, 18, '888', 2, 0, '2018-12-20 16:57:13', 0, 1, ''),
(59, 4, 'jjj', 2, 2, '2018-12-20 16:57:01', 51, 1, ''),
(58, 4, '8888', 2, 0, '2018-12-20 16:56:56', 0, 1, ''),
(57, 5, '777', 2, 2, '2018-12-20 16:56:48', 14, 1, ''),
(56, 5, 'nihao ', 2, 0, '2018-12-20 16:55:49', 0, 1, ''),
(55, 1, '999', 2, 1, '2018-12-20 16:37:11', 14, 1, ''),
(54, 1, '8888', 2, 2, '2018-12-20 16:34:28', 14, 1, ''),
(53, 1, '777', 2, 1, '2018-12-20 16:34:15', 14, 1, ''),
(52, 4, '==============', 2, 0, '2018-12-20 16:31:31', 0, 1, ''),
(51, 4, '666', 2, 0, '2018-12-20 16:30:20', 0, 1, ''),
(50, 3, '测试时间', 2, 0, '2018-12-20 16:25:00', 0, 1, ''),
(63, 18, 'www', 2, 2, '2018-12-21 10:40:54', 60, 1, ''),
(64, 13, 'jack', 2, 0, '2018-12-21 10:57:00', 0, 1, ''),
(65, 13, 'nihao ', 2, 2, '2018-12-21 10:57:06', 64, 1, ''),
(66, 13, '6666', 2, 2, '2018-12-21 10:57:11', 64, 1, ''),
(67, 8, '往事清零，爱很随意。', 2, 0, '2018-12-24 09:36:48', 0, 1, ''),
(68, 8, '牛逼啊老铁', 2, 2, '2018-12-24 09:36:58', 67, 1, '');

-- --------------------------------------------------------

--
-- 表的结构 `share`
--

CREATE TABLE IF NOT EXISTS `share` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '每周分享期数id',
  `articles_id` varchar(255) NOT NULL COMMENT '这一期的所有文章id，用逗号哥开',
  `title` varchar(255) NOT NULL COMMENT '期数标题',
  `create_time` datetime NOT NULL COMMENT '创建的时间',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '判断是否被删除，0代表被删除，1代表没有被删除',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='每周分享' AUTO_INCREMENT=20 ;

--
-- 转存表中的数据 `share`
--

INSERT INTO `share` (`id`, `articles_id`, `title`, `create_time`, `status`) VALUES
(8, '3,7', '第2期前端分享', '2018-12-05 17:44:29', 1),
(7, '5,1,5,10,11,5,13', '第1期前端分享', '2018-12-05 17:44:23', 1),
(10, '4,5', '第2期前端分享', '2018-12-06 18:09:36', 1),
(9, '5,7', '第9期修改', '2018-12-06 11:16:21', 1),
(11, '5,1,5,10,11', '第3期修改', '2018-12-07 14:29:35', 0),
(12, '3', '第3期前端分享', '2018-12-11 13:45:44', 0),
(13, '3,7,5', '哈哈哈哈哈11', '2018-12-12 11:27:31', 0),
(14, '3,8', '测试', '2018-12-12 11:29:49', 0),
(15, '5,7', '22222', '2018-12-12 11:31:44', 0),
(16, '5,1', '333222不不不', '2018-12-12 11:32:19', 0),
(17, '4,5', '一期测试分享', '0000-00-00 00:00:00', 1),
(18, '4,5,10', 'test1期', '0000-00-00 00:00:00', 1),
(19, '4,7', '速度闪躲', '0000-00-00 00:00:00', 1);

--
-- 触发器 `share`
--
DROP TRIGGER IF EXISTS `新增`;
DELIMITER //
CREATE TRIGGER `新增` AFTER INSERT ON `share`
 FOR EACH ROW UPDATE statistics SET count = count + 1 WHERE type = 'share'
//
DELIMITER ;

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='segi数据库表的统一说明' AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `specification`
--

INSERT INTO `specification` (`table_id`, `type`, `table_name`, `detail`) VALUES
(1, 'user', '用户表', '用户的账号，密码，创建时间等信息'),
(2, 'config', '配置信息数据', '包含了各种配置的key信息，比如token_key'),
(3, 'article', '文章详情表格', '文章详情表格'),
(4, 'category', '分类', '文档的分类'),
(5, 'recommend', '推荐模块主分类表', '首页推荐模块的主分类'),
(6, 'reply', '回复的表格', '专门用于收集回复的表格'),
(7, 'home_nav', '首页导航', '首页可配置的导航列表表格'),
(9, 'share', '每周分享', '每周分享的详情'),
(11, 'recommend_article', '推荐模块文章', '首页推荐模块的具体文章信息'),
(8, 'jobs', '职位分类', '公司的所有职位分类'),
(12, 'statistics', '统计表', '有关的统计全放在这里面'),
(13, 'link', '链接表', '存储类似home_banner的链接配置等信息');

-- --------------------------------------------------------

--
-- 表的结构 `statistics`
--

CREATE TABLE IF NOT EXISTS `statistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `type` varchar(255) NOT NULL COMMENT '分类英文字段',
  `type_name` varchar(255) NOT NULL COMMENT '分类中文字段',
  `count` int(20) NOT NULL COMMENT '统计总数',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `statistics`
--

INSERT INTO `statistics` (`id`, `type`, `type_name`, `count`) VALUES
(1, 'article', '文档数量', 13),
(2, 'share', '每周分享次数', 7);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `permission` varchar(255) NOT NULL DEFAULT 'user' COMMENT '权限，默认是user',
  `telephone` varchar(255) NOT NULL COMMENT '电话号码',
  `realname` varchar(255) NOT NULL COMMENT '真实姓名',
  `create_time` varchar(20) NOT NULL COMMENT '用户创建时间',
  `update_time` datetime NOT NULL COMMENT '更新的时间',
  `avatar_image` varchar(255) NOT NULL DEFAULT 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2819752542,3024990056&fm=27&gp=0.jpg' COMMENT '头像图片',
  `email` varchar(255) NOT NULL COMMENT '邮箱',
  `job_type` varchar(255) NOT NULL COMMENT '工作种类',
  `job_name` varchar(255) NOT NULL COMMENT '工作的种类，中文名',
  `user_type` varchar(255) NOT NULL COMMENT '用户角色，分管理员和普通用户',
  `status` int(10) NOT NULL DEFAULT '1' COMMENT '1代表未删除，0代表已删除',
  `login_time` datetime NOT NULL COMMENT '最近登录时间',
  PRIMARY KEY (`user_id`),
  FULLTEXT KEY `realname` (`realname`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `permission`, `telephone`, `realname`, `create_time`, `update_time`, `avatar_image`, `email`, `job_type`, `job_name`, `user_type`, `status`, `login_time`) VALUES
(1, 'lronelove', 'w657828543', 'root', '15338870406', '王喆', '2018-11-13 06:36:02', '0000-00-00 00:00:00', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=284744206,1494248905&fm=27&gp=0.jpg', '657828543@qq.com', 'web', 'web前端开发', '管理员', 1, '2018-11-13 06:36:02'),
(2, 'jack', 'jack', 'user', '15338870406', '王者', '2018-12-19 13:29:54', '0000-00-00 00:00:00', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=284744206,1494248905&fm=27&gp=0.jpg', '657828543@qq.com', 'web', 'web前端开发', '普通用户', 1, '2018-11-13 06:36:02'),
(11, 'jack1', 'jack1', 'user', '123', '谁谁谁', '2018-11-22 15:15:08', '2018-12-20 18:28:30', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=284744206,1494248905&fm=27&gp=0.jpg', '12@qq.com', 'web', 'java后端开发', '', 1, '2018-11-13 06:36:02'),
(16, 'chenhan', 'Ch@1108', 'root', '', '陈瀚', '2018-12-19 14:29:56', '0000-00-00 00:00:00', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=284744206,1494248905&fm=27&gp=0.jpg', '675881538@qq.com', 'web', 'web前端开发', '管理员', 1, '2018-11-13 06:36:02'),
(17, 'lsx', 'lsx123456', 'user', '123', 'lishaoxiang', '2018-12-05 15:40:32', '2018-12-20 18:28:14', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2847827211,2653983773&fm=27&gp=0.jpg', 'abc@163.com', 'web', 'web前端开发', '', 1, '2018-11-13 00:00:00'),
(18, 'xiaoyuanfen', 'rzj722', 'root', '666', '阮正甲', '2018-12-12 17:48:30', '0000-00-00 00:00:00', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2847827211,2653983773&fm=27&gp=0.jpg', '', 'web', 'web前端开发', '管理员', 1, '2018-11-22 00:00:00'),
(19, 'utaware', 'minagi626QQ', 'root', '18285115398', '陈永钦', '2018-12-26 10:35:20', '0000-00-00 00:00:00', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2819752542,3024990056&fm=27&gp=0.jpg', '1264051408@qq.com', 'java', 'java后端开发', '管理员', 1, '2018-11-13 06:36:02');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
