import {Notify} from "vant";

export const successNotify = (message: string) => {
    Notify({
        message,
        duration: 1000,
        background: '#278dee'
    });
}

export const errorNotify = (message: string) => {
    Notify({
        message,
        duration: 1000,
        background: '#f56767'
    });
}