import axios  from "axios";

axios.defaults.timeout = 30000;

axios.interceptors.response.use(function (response) {
    return response;
},function (err){
    return Promise.reject(err)
}
);
export function apiGet(url ,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params: params,
        }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
}

export function apiPost(url ,params){
    return new Promise((resolve,reject)=>{
    axios({
        method: "post",
        url: url,
        data: params,
        headers:{"token":localStorage.getItem("token")}
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
    })
}
