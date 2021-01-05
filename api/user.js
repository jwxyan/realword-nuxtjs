import { request } from "@/plugins/request"

export const login = data => {
    return request({
        method: "POST",
        url: "/api/users/login",
        data
    })
}

export const register = data => {
    return request({
        method: "POST",
        url: "/api/users",
        data
    })
}

export const getProfiles = name => {
    return request({
        method: "GET",
        url: `/api/profiles/${name}`,
    })
}

export const updateUser = data => {
    return request({
        method: "PUT",
        url: "/api/user",
        data
    })
}

export const getUser = () => {
    return request({
        method: "GET",
        url: "/api/user",
    })
}

export const follow = name => {
    return request({
        method: "POST",
        url: `/api/profiles/${name}/follow`,
    })
}

export const unFollow = name => {
    return request({
        method: "DELETE",
        url: `/api/profiles/${name}/follow`,
    })
}
