import MyAlertComponent from './myAlert';
const MyAlert = {};
MyAlert.install = Vue => {
  const MyAlertConstructor = Vue.extend(MyAlertComponent);
  const instance = new MyAlertConstructor();
  instance.$mount(document.createElement('div'));
  document.body.appendChild(instance.$el);

  // 4. 添加实例方法
  Vue.prototype.$myAlert = function(msg) {
    // 逻辑...
    instance.msg = msg;
    instance.isShow = true;
  };
  Vue.prototype.$myConfirm = function(msg, success, cancel) {
    // 逻辑...
    instance.type = 'confirm';
    instance.msg = msg;
    instance.isShow = true;
    if (typeof success === 'function') {
      instance.success = success;
    }
    if (typeof cancel === 'function') {
      instance.cancel = cancel;
    }
  };
};

export default MyAlert;
