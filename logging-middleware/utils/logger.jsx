
const URL = "http://4.224.186.213/evaluation-service/logs";


async function Log(stack, level, packageName, message) {
  try {
    const token = import.meta.env.accessToken;

    if (!token) {
      console.error("Access token not found.");
      return;
    }

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to Logging :", error);
      return;
    }

    const data = await response.json();
    console.log("Logs sented successfully:", data);

  } catch (error) {
    console.error("Error occurs :", error);
  }
}

export default Log ;