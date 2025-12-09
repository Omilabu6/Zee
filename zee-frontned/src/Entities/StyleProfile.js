const StyleProfile=
{
  "name": "StyleProfile",
  "type": "object",
  "properties": {
    "style_personality": {
      "type": "string",
      "description": "Main style archetype (e.g., Soft Romantic, Edgy Minimalist, Chaotic Creative)"
    },
    "style_traits": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of style characteristics"
    },
    "color_palette": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Preferred colors"
    },
    "quiz_answers": {
      "type": "object",
      "description": "Raw quiz responses for reference"
    },
    "style_description": {
      "type": "string",
      "description": "AI-generated description of their style"
    }
  },
  "required": [
    "style_personality"
  ]
}
export default StyleProfile;