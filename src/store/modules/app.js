import { Login } from '@/api/login'
import { setToKen, removeToKen, removeUsername, setUsername, getUsername } from '@/utils/app';
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  to_ken: '',
  username: getUsername() || ''
}
const getters = {
  isCollapse: state => state.isCollapse
}
const mutations = {
  SET_COLLAPSE(state){
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state,value){
    state.to_ken = value
  },
  SET_USERNAME(state,value){
    state.username = value
  }
}
const actions = {
  login({commit}, requestData){
    return new Promise((resolve, reject)=>{
      Login(requestData).then((response) => {
        console.log(response);
        let data = response.data.data;
        commit('SET_TOKEN',data.token);
        commit('SET_USERNAME',data.username);
        setToKen(data.token);
        setUsername(data.username);
        resolve(response);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  exit({ commit }){
    return new Promise ((resolve, reject) => {
      removeToKen();
      removeUsername();
      commit('SET_TOKEN','');
      commit('SET_USERNAME','');
      resolve();
    })
  }
}
export default{
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}