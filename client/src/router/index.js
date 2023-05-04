import { createWebHistory, createRouter } from "vue-router";
import Product from "@/views/product/Product.vue";
const routes = [
    {
        path: "/",
        name: "product",
        component: Product,
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: ()=> import("@/views/NotFound.vue"),
    },

    {
        path: "/products/:id",
        name: "product.edit",
        component: () => import("@/views/product/ProductEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/products/add",
        name: "product.add",
        component: () => import("@/views/product/ProductAdd.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
  
    {
        path: "/accounts/",
        name: "account",
        component: () => import("@/views/account/Account.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/accounts/add",
        name: "account.add",
        component: () => import("@/views/account/AccountAdd.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
   
    {
        path: "/accounts/:id",
        name: "account.edit",
        component: () => import("@/views/account/AccountEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    }, 
  
    
    {
        path: "/accounts/register",
        name: "account.register",
        component: () => import("@/views/account/AccountRegister.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/accounts/login",
        name: "account.login",
        component: () => import("@/views/account/AccountLogin.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },


    {
        path: "/brands/",
        name: "brand",
        component: () => import("@/views/brand/Brand.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/brands/add",
        name: "brand.add",
        component: () => import("@/views/brand/BrandAdd.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/brands/:id",
        name: "brand.edit",
        component: () => import("@/views/brand/BrandEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },


    
    
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;