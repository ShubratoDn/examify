import { axiosRequest } from "../utils/constants";

export const getStudentsByName = async (username) => {
    return await axiosRequest.get("/api/v1/public/student/" + username)
        .then((resp) => resp);
}