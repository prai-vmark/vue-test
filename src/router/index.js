import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from "@/components/HelloWorld";
import LookupUtility from "@/components/lookup";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "LookupUtility",
      component: LookupUtility
    }
  ]
});
