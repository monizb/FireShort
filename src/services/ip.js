export const getUserIP = async () => {
  const CLOUDFARE_API_URL = "https://www.cloudflare.com/cdn-cgi/trace";
  const response = await fetch(CLOUDFARE_API_URL);
  const data = await response.text();
  if (data.includes("ip")) {
    const lines = data.split("\n");
    return lines[2].split("=")[1];
  }
};
