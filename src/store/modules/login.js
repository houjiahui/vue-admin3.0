const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
}
const getters = {
  isCollapse: state => state.isCollapse
}
const mutations = {
  SET_COLLAPSE(state){
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse));
  }
}
const actions = {
  login(context, requestData){
    return new Promise((resolve, reject)=>{
      Login(requestData).then((resolve) => {
        response(resolve)
      }).catch((error) => {
        reject(error)
      })
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