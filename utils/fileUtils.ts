
export const toBase64 = (file: File): Promise<string> => 
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URI prefix (e.g., "data:image/png;base64,")
        resolve(result.split(',')[1]);
    };
    reader.onerror = error => reject(error);
});
