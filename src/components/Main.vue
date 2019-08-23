<template>
  <v-content>
    <TopBar />
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="mx-auto">
          <Uploader />
          <div v-if="!appLoading">
            <DataCard title="FREQUENT USERS">
              <template v-if="mostFrequentUsers">
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>E-mail</th>
                      <th>Empresa</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in mostFrequentUsers" :key="user.id">
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.company.name }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </template>
            </DataCard>
            <DataCard title="FREQUENT EVENTS">
              <div v-if="mostFrequentEvents">
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(event, index) in mostFrequentEvents" :key="index">
                      <td>{{ event }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </div>
            </DataCard>
            <ActionsByCompanyCard />
          </div>
          <Loading v-else />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ActionsByCompanyCard from "./ActionsByCompanyCard";
import DataCard from "./DataCard";
import Loading from "./Loading";
import TopBar from "./TopBar";
import Uploader from "./Uploader";

export default {
  components: { ActionsByCompanyCard, DataCard, Loading, TopBar, Uploader },
  computed: {
    ...mapState(["appLoading"]),
    ...mapGetters(["mostFrequentUsers", "mostFrequentEvents"])
  }
};
</script>
