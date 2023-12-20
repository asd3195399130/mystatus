import { apiPost } from "./api";

// 渲染列表
export function getreading(data){
    return apiPost("https://testshool.zzgoodqc.cn/index.php/index/User/getAllStudentList",data);
}
// 删除
export function getdelete(id){
    return apiPost(`https://testshool.zzgoodqc.cn/index.php/index/User/delWxUser?id=${id}`);
}
// 录入教师

export function getteacher(data){
    return apiPost(
      "https://testshool.zzgoodqc.cn/index.php/index/User/getUsers",data
    );
}
// 添加
export function getaddlist(data){
    return apiPost("https://testshool.zzgoodqc.cn/index.php/index/User/addWxUser",data)
}
// 查看详情信息
export function getdetail(id){
    return apiPost(`https://testshool.zzgoodqc.cn/index.php/index/User/getWxUserbyid?id=${id}`)
}
// 修改

export function getedit(data){
    return apiPost(
      `https://testshool.zzgoodqc.cn/index.php/index/User/addWxUser`,
      data
    );
}
// 搜索
export function getsearch(data){
    return apiPost("https://testshool.zzgoodqc.cn/index.php/index/User/getAllStudentList",data)
}
// 获取老师名下的所有学生
export function getAllStudent(data){
    return apiPost(
      "https://testshool.zzgoodqc.cn/index.php/index/User/getAllStudentList",data
    );
}