const [, , method, route, ...args] = process.argv;

console.log(route);
const [resource, id] = route.split("/");

const BASE_URL = "https://fakestoreapi.com/";

const request = async (url, option = {}) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

try {
  if (method === "GET") {
    console.log(`Fetching ${resource} with ID ${id}`);
    if (id) {
      const data = await request(`${BASE_URL}/${resource}/${id}`);
      console.log(data);
    } else {
      const data = await request(`${BASE_URL}/${resource}`);
      console.log(data);
    }
  } else if (method === "POST") {
    const [title, price, category] = args;
    const numericPrice = Number(price);

    if (!title || !category || !Number.isFinite(numericPrice)) {
      throw new Error("POST products requiere title, price y category válidos");
    }

    const data = await request(`${BASE_URL}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, price: numericPrice, category }),
    });

    console.log(data);
  } else if (method === "DELETE") {
    if (!id) {
      throw new Error("DELETE products requiere un ID válido");
    }
    const data = await request(`${BASE_URL}/${resource}/${id}`, {
      method: "DELETE",
    });

    console.log(data);
  } else {
    throw new Error("Method not supported");
  }
} catch (error) {
  console.error("Error:", error.message);
}
