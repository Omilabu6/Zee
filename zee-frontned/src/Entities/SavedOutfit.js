const SavedOutfit= {
  name: "SavedOutfit",
  type: "object",
  properties: {
    occasion: { type: "string", description: "What the outfit is for" },
    outfit_name: { type: "string", description: "Cute name for the outfit" },
    pieces: {
      type: "array",
      items: {
        type: "object",
        properties: {
          item: { type: "string" },
          details: { type: "string" },
          color: { type: "string" }
        }
      }
    },
    styling_tips: { type: "string" },
    vibe_tags: { type: "array", items: { type: "string" } },
    image_url: { type: "string" }
  },
  required: ["occasion", "pieces"]
};

export default SavedOutfit;
