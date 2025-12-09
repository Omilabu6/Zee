// src/api/groqClient.js
// 100% FREE AI - Groq + Hugging Face!
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Get your FREE Hugging Face API key at: https://huggingface.co/settings/tokens
const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

/**
 * Call Groq API (FREE - 14,400 requests/day!)
 */
const callGroq = async (prompt, jsonSchema = null) => {
  try {
    const messages = [
      {
        role: "system",
        content: "You are Zee, a fun and knowledgeable personal stylist AI. You provide helpful, creative outfit suggestions."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    if (jsonSchema) {
      messages.push({
        role: "system",
        content: `Respond ONLY with valid JSON matching this schema. No markdown, no explanations, just pure JSON:\n${JSON.stringify(jsonSchema, null, 2)}`
      });
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.7,
        max_tokens: 4096,
        response_format: jsonSchema ? { type: "json_object" } : undefined
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const textContent = data.choices[0].message.content;

    if (jsonSchema) {
      const cleanJson = textContent
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      return JSON.parse(cleanJson);
    }

    return textContent;
  } catch (error) {
    console.error('Groq API error:', error);
    throw error;
  }
};

/**
 * Generate image using Hugging Face (100% FREE!)
 * Get your free API key: https://huggingface.co/settings/tokens
 */
const generateImage = async (prompt) => {
  try {
    // Check if API key is set
    if (HUGGINGFACE_API_KEY === "hf_YOUR_KEY_HERE") {
      console.warn('Hugging Face API key not set. Using placeholder image.');
      return {
        url: `https://via.placeholder.com/600x800/ec4899/ffffff?text=${encodeURIComponent('Set HF API Key')}`,
        isPlaceholder: true
      };
    }

    // Enhance the prompt for fashion/outfit generation
    const enhancedPrompt = `professional fashion photograph, ${prompt}, high quality, studio lighting, clean background, detailed clothing textures, photorealistic`;

    const response = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: enhancedPrompt,
        parameters: {
          negative_prompt: "blurry, low quality, distorted, ugly, bad anatomy, extra limbs",
          num_inference_steps: 30,
          guidance_scale: 7.5
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API error:', errorText);
      
      // Fallback to placeholder
      return {
        url: `https://via.placeholder.com/600x800/ec4899/ffffff?text=${encodeURIComponent('Image Gen Failed')}`,
        isPlaceholder: true,
        error: errorText
      };
    }

    // HF returns image as blob
    const imageBlob = await response.blob();
    
    // Convert blob to base64 data URL for display
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          url: reader.result,
          isPlaceholder: false
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageBlob);
    });

  } catch (error) {
    console.error('Image generation error:', error);
    return {
      url: `https://via.placeholder.com/600x800/ec4899/ffffff?text=${encodeURIComponent('Error')}`,
      isPlaceholder: true,
      error: error.message
    };
  }
};

/**
 * Alternative: Use Pollinations.ai (NO API KEY NEEDED!)
 * Completely free, no signup required
 */
const generateImagePollinations = async (prompt) => {
  try {
    const enhancedPrompt = `professional fashion photograph, ${prompt}, high quality, studio lighting, clean background, detailed clothing textures, photorealistic`;
    
    // Pollinations.ai generates images via URL - no API key needed!
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=600&height=800&nologo=true`;
    
    return {
      url: imageUrl,
      isPlaceholder: false
    };
  } catch (error) {
    console.error('Pollinations image generation error:', error);
    return {
      url: `https://via.placeholder.com/600x800/ec4899/ffffff?text=${encodeURIComponent('Error')}`,
      isPlaceholder: true,
      error: error.message
    };
  }
};

// Export the client in the same structure as base44
const groqClient = {
  integrations: {
    Core: {
      InvokeLLM: async ({ prompt, response_json_schema }) => {
        return callGroq(prompt, response_json_schema);
      },
      
      GenerateImage: async ({ prompt }) => {
        // Option 1: Use Pollinations.ai (NO API KEY NEEDED - EASIEST!)
        return generateImagePollinations(prompt);
        
        // Option 2: Use Hugging Face (FREE but needs API key)
        // return generateImage(prompt);
      }
    }
  },
  
  entities: {
    StyleProfile: {
      list: async () => {
        const profiles = localStorage.getItem('style_profiles');
        return profiles ? JSON.parse(profiles) : [];
      },
      get: async (id) => {
        const profiles = await groqClient.entities.StyleProfile.list();
        return profiles.find(p => p.id === id);
      },
      create: async (data) => {
        const profiles = await groqClient.entities.StyleProfile.list();
        const newProfile = {
          id: Date.now().toString(),
          ...data,
          created_at: new Date().toISOString()
        };
        profiles.push(newProfile);
        localStorage.setItem('style_profiles', JSON.stringify(profiles));
        return newProfile;
      },
      update: async (id, data) => {
        const profiles = await groqClient.entities.StyleProfile.list();
        const index = profiles.findIndex(p => p.id === id);
        if (index !== -1) {
          profiles[index] = { ...profiles[index], ...data };
          localStorage.setItem('style_profiles', JSON.stringify(profiles));
          return profiles[index];
        }
        throw new Error('Profile not found');
      },
      delete: async (id) => {
        const profiles = await groqClient.entities.StyleProfile.list();
        const filtered = profiles.filter(p => p.id !== id);
        localStorage.setItem('style_profiles', JSON.stringify(filtered));
        return true;
      }
    },
    SavedOutfit: {
      list: async () => {
        const outfits = localStorage.getItem('saved_outfits');
        return outfits ? JSON.parse(outfits) : [];
      },
      get: async (id) => {
        const outfits = await groqClient.entities.SavedOutfit.list();
        return outfits.find(o => o.id === id);
      },
      create: async (data) => {
        const outfits = await groqClient.entities.SavedOutfit.list();
        const newOutfit = {
          id: Date.now().toString(),
          ...data,
          created_at: new Date().toISOString()
        };
        outfits.push(newOutfit);
        localStorage.setItem('saved_outfits', JSON.stringify(outfits));
        return newOutfit;
      },
      update: async (id, data) => {
        const outfits = await groqClient.entities.SavedOutfit.list();
        const index = outfits.findIndex(o => o.id === id);
        if (index !== -1) {
          outfits[index] = { ...outfits[index], ...data };
          localStorage.setItem('saved_outfits', JSON.stringify(outfits));
          return outfits[index];
        }
        throw new Error('Outfit not found');
      },
      delete: async (id) => {
        const outfits = await groqClient.entities.SavedOutfit.list();
        const filtered = outfits.filter(o => o.id !== id);
        localStorage.setItem('saved_outfits', JSON.stringify(filtered));
        return true;
      }
    }
  }
};

export default groqClient;