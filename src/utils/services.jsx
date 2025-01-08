export const baseurl =
  import.meta.env.VITE_BASE_URL || "http://localhost:4000/api";

export const postResquest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = response.json();
  console.log(data);
  //   if (!response.ok) {
  //     let message;
  //     if (data?.message) {
  //       message = data.message;
  //     } else {
  //       message = data;
  //     }
  //     return { error: true, message };
  //   }
  return data;
};
