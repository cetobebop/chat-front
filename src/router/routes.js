const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: { transition: "animated slideInLeft" },
      },
      {
        path: "chat",
        component: () => import("pages/ChatPage.vue"),
        meta: {
          transition: "animated slideInRight",
          windowWidthLimit: 600,
          onReloadReturnToMain: true,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
