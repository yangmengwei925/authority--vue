import router from '@/router';
import store from '@/store';


function hasToken() {
  return 'abc';
}


function getRoles() {
  return ['teacher'];
}

router.beforeEach(async (to, from, next) => {
  if (hasToken()) {
    // 访问的是 /login  ==> 首页
    if (to.path === '/login') {
      next({path: '/main-index'});
    } else {
      //获取角色
      let roles = null;
      if (roles) {
        next();// 角色到时候存到仓库
      } else {
        //没有获取到角色
        //发送请求 获取角色
        //根据角色 处理路由
        roles = getRoles();
        let routes = await store.dispatch('permission/generateRoutes', roles);
        next()
      }
    }

  } else {
    // 处理白名单
    next();
  }


});

