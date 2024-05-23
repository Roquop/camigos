//una función para cada cosa: con la primera guardamos el token en el localStorage
export const saveLocalStorageCamigos = (item) => {
    window.localStorage.setItem("token", item)
    return true
}
//Con esta cogemos el token para trabajar con el
export const getLocalStorageCamigos = () => {
    const token = localStorage.getItem("token")
    return token
}
//Y con esta lo borramos del localStorage
export const deleteLocalStorageCamigos = () => {
    localStorage.removeItem("token")
    return true;
}