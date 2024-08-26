export async function generateToken(): Promise<string> {
    const key = import.meta.env.VITE_SECRET_KEY;
    
    if (!key) {
      throw new Error("VITE_SECRET_KEY is not defined");
    }
  
    const nonce = '1234567890123456';
    const dateString = new Date().toISOString().replace('Z', '');
    const text = `${'Telegram-mini'}&${'request-type'}&${dateString}&${nonce}`;
  
    const keyBytes = Uint8Array.from(key.match(/.{1,2}/g)!.map((byte: any) => parseInt(byte, 16)));
  
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      keyBytes,
      "AES-CBC",
      false,
      ["encrypt"]
    );
  
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "AES-CBC",
        iv: iv,
      },
      keyMaterial,
      new TextEncoder().encode(text)
    );
  
    const result = new Uint8Array(encrypted.byteLength + iv.byteLength);
    result.set(iv, 0);
    result.set(new Uint8Array(encrypted), iv.length);
  
    return btoa(String.fromCharCode(...new Uint8Array(result)));
  }
  