import CryptoJS from 'crypto-js';

const AES_KEY = 'b2c17b46e2b1415392aab5a82869856c';
const AES_IV = '61960842';

/**
 * 随机生成指定数量的16进制key
 * @param num
 */
const generateKey = (num: number) => {
  const library =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < num; i += 1) {
    const randomPoz = Math.floor(Math.random() * library.length);
    key += library.substring(randomPoz, randomPoz + 1);
  }
  return key;
};

/**
 * 加密
 * @param word
 * @param keyStr
 * @param iv
 */
const encrypt = (word: string, iv?: string, keyStr?: string) => {
  const key = CryptoJS.enc.Utf8.parse(keyStr || AES_KEY);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const $iv = CryptoJS.enc.Utf8.parse(iv || AES_IV);
  const encrypted = CryptoJS.TripleDES.encrypt(srcs, key, {
    iv: $iv,
    mode: CryptoJS.mode.CBC,
    // padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

/**
 * 解密
 * @param word
 * @param keyStr
 * @param iv
 */
const decrypt = (word: string, iv?: string, keyStr?: string) => {
  const key = CryptoJS.enc.Utf8.parse(keyStr || AES_KEY);
  const $iv = CryptoJS.enc.Utf8.parse(iv || AES_IV);
  const decryptAES = CryptoJS.TripleDES.decrypt(word, key, {
    iv: $iv,
    mode: CryptoJS.mode.CBC,
    // padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decryptAES).toString();
};

export default {
  generateKey,
  encrypt,
  decrypt,
};
