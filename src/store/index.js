import Vue from "vue";
import Vuex from "vuex";
import api from "../services/api";
import { getMostFrequent } from "./functions";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: [],
    companies: [],
    usage: [],
    appLoading: false
  },
  mutations: {
    FETCH_USERS: (state, payload) => (state.users = payload),
    FETCH_COMPANIES: (state, payload) => (state.companies = payload),
    SET_USAGE: (state, payload) => (state.usage = payload),
    SET_LOADING: (state, payload) => (state.appLoading = payload)
  },
  actions: {
    fetchUsers({ commit }) {
      commit("SET_LOADING", true);
      api.get("/user").then(response => {
        commit("FETCH_USERS", response.data);
        commit("SET_LOADING", false);
      });
    },
    fetchCompanies({ commit }) {
      commit("SET_LOADING", true);
      api.get("/company").then(response => {
        commit("FETCH_COMPANIES", response.data);
        commit("SET_LOADING", false);
      });
    }
  },
  getters: {
    companiesUsage(state) {
      let data = null;

      if (state.companies.length > 0) {
        data = [];
        state.companies.map(company => {
          state.usage
            .filter(usageEvent => usageEvent.companyId == company.id)
            .map(usageEvent => {
              const { id: companyId, name: companyName } = company;
              const {
                eventName: actionEvent,
                action: actionName,
                companyId: actionCompanyId,
                date: actionDate
              } = usageEvent;

              data.push({
                company: { id: companyId, name: companyName },
                usage: { eventName: actionEvent, action: actionName, companyId: actionCompanyId, date: actionDate }
              });
            });
        });
      }

      return data;
    },
    mostFrequentUsers(state) {
      let result = null;
      if (state.usage.length > 0) {
        const ids = getMostFrequent(state.usage, "userId");
        const users = state.users.filter(user => ids.includes(user.id.toString()));
        result = users.map(user => {
          const companyOfUser = state.companies.find(company => company.id == user.companyId);
          return { ...user, company: companyOfUser };
        });
      }

      return result;
    },
    mostFrequentEvents(state) {
      if (state.usage.length > 0) return getMostFrequent(state.usage, "eventName");
      return null;
    }
  },
  strict: process.env.NODE_ENV !== "production"
});

export default store;
