<template>
  <div class="hello">
    <div class="logout">Hello, {{ adminName }}</div>
    <h1 class="d-flex justify-content-start">Team Listing Page</h1>
    <div class="d-flex justify-content-start py-3">
      <RouterLink class="btn btn-outline-success" to="/addTeam">
        Add Team
      </RouterLink>
      <RouterLink class="btn btn-outline-success" to="/addMember">
        Add Member
      </RouterLink>
      <input type="text" v-model="searchItem" placeholder="Search" />
    </div>

    <TeamTable :paginatedTeams="paginatedTeams" />

    <PaginationSection
      :currentPage="currentPage"
      :totalPage="totalPages"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import PaginationSection from "./TeamListing/PaginationSection.vue";
import TeamTable from "./TeamListing/TeamlistingTable.vue";
import { getMembersWithSameTeam, getTeams } from "../utils/api";
import { RouterLink } from "vue-router";

export default {
  name: "HelloWorld",
  components: {
    PaginationSection,
    TeamTable,
    RouterLink,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      searchItem: "",
      info: [],
      teamNamePromises: [],
      showModal: false,
      teamMembers: [],
      adminName: "",
    };
  },
  created() {
    const storedAdminName = localStorage.getItem("adminName");
    if (storedAdminName) {
      this.adminName = storedAdminName;
    }
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    searchItem() {
      this.currentPage = 1;
    },
  },
  methods: {
    fetchTeams() {
      return getTeams()
        .then((response) => response.data)
        .catch((error) => {
          console.error(error);
          return [];
        });
    },

    fetchMembersByTeam(teamIds) {
      const memberPromises = teamIds.map((teamId) =>
        getMembersWithSameTeam(teamId)
      );
      return Promise.all(memberPromises)
        .then((responses) =>
          responses.map((response, index) => ({
            teamId: teamIds[index],
            members: response.data,
          }))
        )
        .catch((error) => {
          console.error(error);
          return [];
        });
    },

    generateTeamMembers(teamNamePromises, membersByTeam) {
      const teamMembers = [];

      membersByTeam.forEach((team) => {
        const members = team.members;
        const teamId = team.teamId;
        const teamName = teamNamePromises.find(
          (team) => team.id === teamId
        ).name;

        if (Array.isArray(members) && members.length > 0) {
          members.forEach((member) => {
            const memberId = member.id;
            const memberName = member.name;

            if (memberName !== "") {
              teamMembers.push({
                memberId: memberId,
                memberName: memberName,
                teamId: teamId,
                teamName: teamName,
              });
            }
          });
        } else {
          teamMembers.push({
            memberId: "",
            memberName: "",
            teamId: teamId,
            teamName: teamName,
          });
        }
      });

      return teamMembers;
    },

    fetchData() {
      this.fetchTeams()
        .then((teamNamePromises) => {
          this.teamNamePromises = teamNamePromises;

          const teamIds = this.teamNamePromises.map((team) => team.id);
          return this.fetchMembersByTeam(teamIds);
        })
        .then((membersByTeam) => {
          const teamMembers = this.generateTeamMembers(
            this.teamNamePromises,
            membersByTeam
          );
          console.log(teamMembers);
          this.teamMembers = teamMembers;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    handlePageChange(page) {
      this.currentPage = page;
    },
  },
  computed: {
    filteredItems() {
      const searchLowerCase = this.searchItem.toLowerCase();
      return this.teamMembers.filter((team) => {
        return (
          team.teamName.toLowerCase().includes(searchLowerCase) ||
          team.memberName.toLowerCase().includes(searchLowerCase)
        );
      });
    },

    totalPages() {
      const filteredItemCount = this.filteredItems.length;
      return Math.ceil(filteredItemCount / this.itemsPerPage);
    },

    paginatedTeams() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredItems.slice(startIndex, endIndex);
    },
  },
};
</script>

<style scoped>
.team-tab {
  background-color: #42b983;
  color: white;
}
.member-tab {
  background-color: #4299b9;
  color: white;
}
.hello {
  margin: 150px;
}
.btn {
  margin-right: 5px;
  min-width: 75px;
}
.logout {
  display: flex;
  justify-content: end;
  font-size: 28px;
  font-weight: 400;
}
input {
  margin-left: auto;
  width: 350px;
  border-radius: 15px;
}

@media (max-width: 672px) {
  .hello {
    margin: 5px;
  }
}
</style>
