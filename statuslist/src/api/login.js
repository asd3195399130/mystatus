import {apiPost } from "./api";

// 后台登陆
export function logon(data){
    return apiPost(
      "https://testshool.zzgoodqc.cn/index.php/index/index/login",
      data
    );
}
