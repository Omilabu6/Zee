const API_KEY = "3f228c2650f84ef1898c4db6578d163d";
const BASE_URL = "https://app.base44.com/api/apps/69381da885e86e582aaf5cd5/entities";

// Fetch all style profiles
export async function fetchStyleProfileEntities() {
  const response = await fetch(`${BASE_URL}/StyleProfile`, {
    headers: {
      api_key: API_KEY,
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

// Create a new style profile
export async function createStyleProfileEntity(data) {
  const response = await fetch(`${BASE_URL}/StyleProfile`, {
    method: "POST",
    headers: {
      api_key: API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Delete an existing style profile
export async function deleteStyleProfileEntity(id) {
  return await fetch(`${BASE_URL}/StyleProfile/${id}`, {
    method: "DELETE",
    headers: {
      api_key: API_KEY,
      "Content-Type": "application/json",
    },
  });
}

export default {
  fetchStyleProfileEntities,
  createStyleProfileEntity,
  deleteStyleProfileEntity,
};
