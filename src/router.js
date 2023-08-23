import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import AddMember from "@/components/members/AddMember.vue";
import DeleteMember from "@/components/members/DeleteMember.vue";
import AddTeam from "@/components/teams/AddTeam.vue";
import ViewTeam from "@/components/teams/ViewTeam.vue";
import DeleteTeam from "@/components/teams/DeleteTeam.vue";
import EditTeam from "@/components/teams/EditTeam.vue";
import EditMember from "@/components/members/EditMember.vue";
import Login from "@/components/login/LoginCard.vue";
import RegisterCard from "@/RegisterCard.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "RegisterCard",
    component: RegisterCard,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/addMember",
    name: "AddMember",
    component: AddMember,
  },
  {
    path: "/addTeam",
    name: "AddTeam",
    component: AddTeam,
  },
  {
    path: "/viewTeam/:teamId",
    name: "ViewTeam",
    component: ViewTeam,
  },
  {
    path: "/delete/:teamId",
    name: "DeleteTeam",
    component: DeleteTeam,
  },
  {
    path: "/editTeam/:teamId",
    name: "EditTeam",
    component: EditTeam,
  },
  {
    path: "/editMember/:memberId",
    name: "EditMember",
    component: EditMember,
  },
  {
    path: "/deleteMember/:memberId",
    name: "DeleteMember",
    component: DeleteMember,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
