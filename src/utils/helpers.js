const setCookie = (name, value, options) => {
    options = options || {};

    let expires = options.expires;

    if (typeof expires === "number" && expires) {
        const d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + "=" + value;

    options.forEach(propName => {
        updatedCookie += "; " + propName;
        const propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    });

    document.cookie = updatedCookie;
};
export const deleteCookies = names => {
    for (let i = 0; i < names.lenght; i++) {
        setCookie(names[i], "", {
            expires: -1
        });
    }
};

export const b64toBlob = (base64Data) => {
    const block = base64Data.split(";");
    const contentType = block[0].split(":")[1];
    const realData = block[1].split(",")[1];
    const sliceSize = 1024;
    const byteCharacters = atob(realData);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        const begin = sliceIndex * sliceSize;
        const end = Math.min(begin + sliceSize, bytesLength);

        const bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
};
