import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

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
