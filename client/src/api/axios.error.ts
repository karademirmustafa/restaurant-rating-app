import axios,{AxiosError} from "axios";
export function handleAxiosError(err:any) {
    if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
            console.log("HTTP Error:", axiosError.response.status, axiosError.response.data);
            return axiosError.response.data;
        } else {
            console.error("Axios Error:", axiosError.message);
            return {error:true,errorDetails:{message:axiosError.message}}
        }
    } else {
        console.error("Unknown Error:", err);
        return {error:true};
    }
}