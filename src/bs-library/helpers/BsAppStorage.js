import Bs from "./Bs";

class BsAppStorage {

    static clear() {
        localStorage.clear();
    }

    static set(key, val = '') {
        try {
            key = Bs.appName + '::' + key;
            localStorage.setItem(key, val);
            return true;
        } catch (e) {
            return false;
        }
    }



    static get(key) {
        key = Bs.appName + '::' + key;
        return localStorage.getItem(key);
    }

    static isLoggedIn() {
        return BsAppStorage.get("isLoggedIn") == 1;
    }
}



export default BsAppStorage;