export const Util = {
    setLocalStorage: (k, v) => {
        if (k) {
            localStorage.setItem(k, JSON.stringify(v));
        } else {
            return false;
        }
    },
    getLocalStorage: (k) => {
        if (k) {
            const item = localStorage.getItem(k);
            if (item) {
                return JSON.parse(item);
            }
        }
        return false;
    },
    addEvent: (element, evnt, funct) => {
        if (element.attachEvent)
            return element.attachEvent('on' + evnt, funct);
        else
            return element.addEventListener(evnt, funct, false);
    }
};
