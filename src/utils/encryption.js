import * as CryptoJS from 'crypto-js';

export function aes256Encrypt({msg, pass, ivEnc = 'hex', passEnc = 'utf8', iv = CryptoJS.lib.WordArray.random(16)}){
    try {
        switch(ivEnc){
            case 'utf8': 
                ivEnc = CryptoJS.enc.Utf8;
                break;
            case 'hex':
                ivEnc = CryptoJS.enc.Hex;
                break;
            default:
                throw new Error("encoding not used!");
        }
        if(typeof iv === 'string'){
            iv = ivEnc.parse(iv);
        }
        const options = { mode: CryptoJS.mode.CBC, iv};
        const cipherParams = passEnc === 'utf8' ? 
            CryptoJS.AES.encrypt(msg, CryptoJS.enc.Utf8.parse(pass.repeat(Math.ceil(32 / pass.length)).substring(0,32)), options)
            :
            CryptoJS.AES.encrypt(msg, CryptoJS.enc.Hex.parse(pass), options)
            ;
        const cipherText = cipherParams.ciphertext.toString(CryptoJS.enc.Hex);
        return {
            iv:ivEnc.stringify(iv),
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