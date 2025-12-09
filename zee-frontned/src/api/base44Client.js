// src/api/base44Client.js

const API_KEY = "3f228c2650f84ef1898c4db6578d163d";
const BASE_URL = "https://app.base44.com/api/apps/69381da885e86e582aaf5cd5/entities";
const APP_BASE_URL = "https://app.base44.com/api/apps/69381da885e86e582aaf5cd5";

// -------------------- StyleProfile Entity --------------------
const StyleProfile = {
  // List all style profiles (with optional sorting)
  list: async (sortBy = null) => {
    let url = `${BASE_URL}/StyleProfile`;
    if (sortBy) {
      url += `?sort=${sortBy}`;
    }
    const response = await fetch(url, {
      headers: {
        api_key: API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch StyleProfile: ${response.statusText}`);
    }
    return response.json();
  },

  // Get a single style profile by ID
  get: async (entityId) => {
    const response = await fetch(`${BASE_URL}/StyleProfile/${entityId}`, {
      headers: {
        api_key: API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to get StyleProfile: ${response.statusText}`);
    }
    return response.json();
  },

  // Create a new style profile
  create: async (data) => {
    const response = await fetch(`${BASE_URL}/StyleProfile`, {
      method: "POST",
      headers: {
        api_key: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to create StyleProfile: ${response.statusText}`);
    }
    return response.json();
  },

  // Update an existing style profile
  update: async (entityId, updateData) => {
    const response = await fetch(`${BASE_URL}/StyleProfile/${entityId}`, {
      method: "PUT",
      headers: {
        api_key: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update StyleProfile: ${response.statusText}`);
    }
    return response.json();
  },

  // Delete a style profile
  delete: async (entityId) => {
    const response = await fetch(`${BASE_URL}/StyleProfile/${entityId}`, {
      method: "DELETE",
      headers: {
        api_key: API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to delete StyleProfile: ${response.statusText}`);
    }
    return response.ok;
  },
};

// -------------------- SavedOutfit Entity --------------------
const SavedOutfit = {
  // List all saved outfits (with optional sorting)
  list: async (sortBy = null) => {
    let url = `${BASE_URL}/SavedOutfit`;
    if (sortBy) {
      url += `?sort=${sortBy}`;
    }
    const response = await fetch(url, {
      headers: {
        api_key: API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch SavedOutfit: ${response.statusText}`);
    }
    return response.json();
  },

  // Get a single saved outfit by ID
  get: async (entityId) => {
    const response = await fetch(`${BASE_URL}/SavedOutfit/${entityId}`, {
      headers: {
        api_key: API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to get SavedOutfit: ${response.statusText}`);
    }
    return response.json();
  },

  // Create a new saved outfit
  create: async (data) => {
    const response = await fetch(`${BASE_URL}/SavedOutfit`, {
      method: "POST",
      headers: {
        api_key: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to create SavedOutfit: ${response.statusText}`);
    }
    return response.json();
  },

  // Update an existing saved outfit
  update: async (entityId, updateData) => {
    const response = await fetch(`${BASE_URL}/SavedOutfit/${entityId}`, {
      method: "PUT",
      headers: {
        api_key: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update SavedOutfit: ${response.statusText}`);
    }
    return response.json();
  },

  // Delete a saved outfit
  delete: async (entityId) => {
    const response = await fetch(`${BASE_URL}/SavedOutfit/${entityId}`, {
      method: "DELETE",
      headers: {
        api_key: API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to delete SavedOutfit: ${response.statusText}`);
    }
    return response.ok;
  },
};

// -------------------- Core Integrations --------------------
const Core = {
  // Invoke LLM for AI-powered responses
  InvokeLLM: async ({ prompt, response_json_schema }) => {
    const response = await fetch(`${APP_BASE_URL}/integrations/core/invoke_llm`, {
      method: "POST",
      headers: {
        api_key: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        response_json_schema,
      }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('LLM invocation error:', errorText);
      throw new Error(`Failed to invoke LLM: ${response.statusText}`);
    }
    return response.json();
  },

  // Generate images using AI
  GenerateImage: async ({ prompt }) => {
    const response = await fetch(`${APP_BASE_URL}/integrations/core/generate_image`, {
      method: "POST",
      headers: {
        api_key: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Image generation error:', errorText);
      throw new Error(`Failed to generate image: ${response.statusText}`);
    }
    return response.json();
  },
};

// -------------------- Export as structured client --------------------
const base44 = {
  entities: {
    StyleProfile,
    SavedOutfit,
  },
  integrations: {
    Core,
  },
};

export default base44;

// Also export individual functions for backward compatibility
export {
  StyleProfile,
  SavedOutfit,
  Core,
};