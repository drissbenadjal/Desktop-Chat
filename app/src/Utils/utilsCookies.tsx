const addCookie = (name: string, value: string, days: number) => {
    localStorage.setItem(name, value);
};

const getCookie = (name: string) => {
    return localStorage.getItem(name);
};

const removeCookie = (name: string) => {
    localStorage.removeItem(name);
}

export { addCookie, getCookie, removeCookie };