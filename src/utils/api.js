import axios from "axios";
import router from "@/router";
//import { getCookie } from "./cookies";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getCookie("jwt");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Redirect to the login page when a 401 Unauthorized status is received
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export const getMembers = () => {
  return axiosInstance.get("/members");
};
export const getMembersWithSameTeam = (id) => {
  return axiosInstance.get(`/members/team/${id}`);
};

export const getMemberById = (id) => {
  return axiosInstance.get(`/member/${id}`);
};

export const editMemberById = (id, data) => {
  return axiosInstance.put(`/member/${id}`, data);
};

export const addMember = (data) => {
  return axiosInstance.post("/members", data);
};

export const deleteMember = (id) => {
  return axiosInstance.delete(`/member/${id}`);
};
export const getTeams = () => {
  return axiosInstance.get("/teams");
};

export const getTeamById = (id) => {
  return axiosInstance.get(`/teams/${id}`);
};
export const getTeamsById = (id) => {
  return axiosInstance.get(`/teams/${id}`);
};

export const editTeamById = (id, data) => {
  return axiosInstance.put(`/team/${id}`, data);
};

export const addTeam = (data) => {
  return axiosInstance.post("/teams", data);
};

export const deleteTeam = (id) => {
  return axiosInstance.delete(`/team/${id}`);
};

export const deleteAllMembersFromTeam = (id) => {
  return axiosInstance.delete(`/team/${id}/members`);
};

export const updateMemberTeam = (memberId, teamId) => {
  return axiosInstance.put(`/member/${memberId}/team/${teamId}`);
};

export const updateTeamName = (teamName, name) => {
  return axiosInstance.put(`/team/${teamName}/name`, { name });
};

export const updateMemberName = (memberId, name) => {
  return axiosInstance.put(`/memberId/${memberId}/name`, { name });
};

export const registerAdmin = (data) => {
  return axiosInstance.post("/register/admin", data);
};

export const login = (email, password) => {
  return axiosInstance.post("/login", { email, password });
};
