import { axiosRequest } from "../utils/constants";
import { getToken } from "./auth";

export const addExamInformation = async (values) => {

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    return await axiosRequest.post("/api/v1/exam/add-exam-information", values, {headers} )
        .then((resp) => resp);
}