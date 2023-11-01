import { axiosRequest } from "../utils/constants"

export const userSignUp = async (userData) => {

    const data = { ...userData };

    let userRole = data.role.toUpperCase();
    let roleId = 1003;
    if (userRole === "STUDENT") {
        roleId = 1003
    } else if (userRole === "TEACHER") {
        roleId = 1002
    }

    let image = data.image;

    // Create the roles array with the specified structure
    const roles = [
        {
            id: roleId,
            role: userRole
        }
    ];

    // // Remove the 'role' property from the data object    
    delete data.role;
    delete data.image;

    // Add the 'roles' property to the data object
    data.roles = roles;


    // Create a new FormData object and append the modified data
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('image', image);

    // Send the POST request with the formData
    return await axiosRequest.post("/api/v1/auth/register", formData)
        .then((resp) => resp);
};



//user login service
export const userLogin = async (loginDetails) => {
    return await axiosRequest.post("/api/v1/auth/login", loginDetails)
        .then((response) => response.data)

}