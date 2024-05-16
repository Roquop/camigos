export const saveLocalStorageCamigos = (item) => {
    window.localStorage.setItem("token", item)
    return true
}

export const getLocalStorageCamigos = () => {
    const token = localStorage.getItem("token")
    return token
}

export const deleteLocalStorageCamigos = () => {
    localStorage.removeItem("token")
    return true;
}