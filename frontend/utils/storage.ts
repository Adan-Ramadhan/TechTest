export const storage = {
    save: function <T>(name: string, data: T) {
      try {
        if (!name || !data) {
          throw new Error(
            "Name and Data dibutuhkan saat ingin save ke localStorage"
          );
        }
        const jsonData = JSON.stringify(data);
        localStorage.setItem(name, jsonData);
      } catch (error) {
        console.error("Error saat save ke localStorage:", (error as Error).message);
        throw error;
      }
    },
    get: function <T>(name: string) : T | null {
      try {
        if (!name) {
          throw new Error(
            "Name dibutuhkan untuk mengambil data dari localStorage"
          );
        }
        const storageData = localStorage.getItem(name);
        return storageData ? JSON.parse(storageData) as T : null;
      } catch (error) {
        console.error(
          "Error ketika mengambil data dari localStorage",
          (error as Error).message
        );
        throw error;
      }
    },
    remove: function (name: string) {
      try {
        if (!name) {
          throw new Error(
            "Name dibutuhkan untuk mengambil data dari localStorage"
          );
        }
        localStorage.removeItem(name);
      } catch (error) {
        console.error("Error ketika menghapus data localStorage", (error as Error).message);
      }
    },
  };
  