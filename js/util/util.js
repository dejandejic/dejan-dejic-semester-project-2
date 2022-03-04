let ConcurrentReq = false;
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
    BlockConcurrentReq: function (timeout) {
		if (!timeout) {
			timeout = 10000;
		}
		if (ConcurrentReq) {
			return true;
		}
		ConcurrentReq = true;
		window.setTimeout(function () {
			ConcurrentReq = false;
		}, timeout);
		return false;
	},
    addEvent: (element, evnt, funct) => {
        if (element.attachEvent)
            return element.attachEvent('on' + evnt, funct);
        else
            return element.addEventListener(evnt, funct, false);
    },
    postData: async function (url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data) 
        });
        return response.json();
        if (response.ok) {
        }
        throw new Error(response);
    }
};
