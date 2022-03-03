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
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json();
        if (response.ok) {
        }
        throw new Error(response);
    }
};
