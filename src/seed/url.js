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

//CATEGORY MANAGEMENT URLs
export const createCategoryUrl = `${eventHubServiceUrl}/api/v1/create/event/category`
export const getAllCategoriesUrl = `${eventHubServiceUrl}/api/v1/get/all/event/categories`
export const getAllCategoriesByPaginationUrl = `${eventHubServiceUrl}/api/v1/get/all/event/categories/by/pagination`
export const updateCategoryUrl = `${eventHubServiceUrl}/api/v1/update/event/category`
export const deleteCategoryUrl = `${eventHubServiceUrl}/api/v1/delete/event/category`

//SUB-CATEGORY MANAGEMENT URLs
export const createSubCategoryUrl = `${eventHubServiceUrl}/api/v1/create/event/subcategory`
export const getAllSubCategoriesUrl = `${eventHubServiceUrl}/api/v1/get/all/event/subcategories`
export const getAllSubCategoriesByPaginationUrl = `${eventHubServiceUrl}/api/v1/get/all/event/subcategories/by/pagination`
export const updateSubCategoryUrl = `${eventHubServiceUrl}/api/v1/update/event/subcategory`
export const deleteSubCategoryUrl = `${eventHubServiceUrl}/api/v1/delete/event/subcategory`

//EVENT MANAGEMENT URLs
export const addEventUrl = `${eventHubServiceUrl}/api/v1/add/event`
export const addEventImageUrl = `${eventHubServiceUrl}/api/v1/add/event/image`
export const getEventsUrl = `${eventHubServiceUrl}/api/v1/get/events`
export const getEventUrl = `${eventHubServiceUrl}/api/v1/get/event`
export const updateEventUrl = `${eventHubServiceUrl}/api/v1/update/event`
export const deleteEventImageUrl = `${eventHubServiceUrl}/api/v1/delete/event/image`
export const deleteEventUrl = `${eventHubServiceUrl}/api/v1/delete/event`