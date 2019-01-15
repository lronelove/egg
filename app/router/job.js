module.exports = app => {
  const {router , controller, config} = app;
  const version = config.apiVersion;

  router.post(version + '/job/addJob', app.middlewares.checklogin(), controller.job.addJob) // 添加职位
  router.get(version + '/job/jobList', app.middlewares.checklogin(), controller.job.jobList) // 职位列表
  router.get(version + '/job/jobDetail', app.middlewares.checklogin(), controller.job.jobDetail) // 根据职位id查详情
  router.post(version + '/job/editJob', app.middlewares.checklogin(), controller.job.editJob) // 编辑职位
  router.post(version + '/job/deleteJob', app.middlewares.checklogin(), controller.job.deleteJob) // 删除职位
}