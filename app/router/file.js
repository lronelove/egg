module.exports = app => {
  const {router , controller, config} = app;
  const version = config.apiVersion;
  
  router.post(version + '/file/uploadImage', controller.file.uploadImage);
}