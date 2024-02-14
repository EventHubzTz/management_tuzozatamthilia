//LIVE SERVER BASE URLs
export const eventHubServiceUrl = "https://www.service.eventhubtz.com"

//LOCAL SERVER BASE URLs
// export const eventHubServiceUrl = "http://192.168.1.142:3009"

//USER MANAGEMENT URLs
export const loginByEmailPhoneUrl = `${eventHubServiceUrl}/api/v1/login/user`
export const getAllUsersByRoleUrl = `${eventHubServiceUrl}/api/v1/get/users`
export const getUserUrl = `${eventHubServiceUrl}/api/v1/get/user`
export const registerUserByRoleUrl = `${eventHubServiceUrl}/api/v1/register/user`
export const enableDisableUserUrl = `${eventHubServiceUrl}/api/enable/disable/user`
export const changePasswordUrl = `${eventHubServiceUrl}/api/v1/change/password`
export const deleteAccountUrl = `${eventHubServiceUrl}/api/delete/account`