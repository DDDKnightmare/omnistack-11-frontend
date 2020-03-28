import * as CryptoJS from 'crypto-js';

export function aes256Encrypt(msg, pass){
    try {
        const options = { mode: CryptoJS.mode.CBC, iv: CryptoJS.lib.WordArray.random(16)};
        const cipherParams = CryptoJS.AES.encrypt(msg, CryptoJS.enc.Utf8.parse(pass.repeat(Math.ceil(32 / pass.length)).substring(0,32)), options);
        const cipherText = cipherParams.ciphertext.toString(CryptoJS.enc.Hex);
        const iv = cipherParams.iv.toString();
        console.log({
            iv,
            cipherText,
        })
        console.log(cipherParams.key.toString());
        return {
            iv,
            cipherText
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export default {
    aes256Encrypt
}