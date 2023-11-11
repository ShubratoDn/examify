import { axiosRequest } from "../utils/constants";
import { getToken } from "./auth";

export const addExamInformation = async () => {

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    return await axiosRequest.post("/api/v1/exam/add-exam-information", {}, {headers} )
        .then((resp) => resp);
}