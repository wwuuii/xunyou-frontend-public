import myAxios from "../plugins/myAxios";
import {errorNotify} from "../utils/notifyUtil";


export const getCurrentUser = async () => {

    //从远程处获取用户信息
    const res: any = await myAxios.get("/user/get/login");
    if (res.code === 0) {
        return res.data;
    } else {
        errorNotify(res.message)
    }
    return null;
}