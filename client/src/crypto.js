import CryptoJS from "crypto-js";

export const decrypt = (text, key) => {		
    const bytes = CryptoJS.AES.decrypt(text.toString(), key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

	// error handling

    console.log(decrypted);
	return decrypted;
}

export const encrypt = (text, key) => {		
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    
    // error handling
    
    console.log(encrypted);
	return encrypted;
}