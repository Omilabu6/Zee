import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { Button } from "flowbite-react";
import groqClient from '@/api/groqClient'; 

const occasionSuggestions = [
  "Brunch with the girls",
  "Casual Friday at work",
  "First date dinner",
  "Coffee shop work session",
  "Weekend farmers market",
  "Girls night out",
  "Meeting the parents",
  "Job interview",
  "Beach day",
  "Concert tonight"
];

export default function OutfitGenerator({ styleProfile, onOutfitGenerated }) {
  const [occasion, setOccasion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateOutfit = async () => {
    if (!occasion.trim()) return;
    
    setIsGenerating(true);
    try {
      const prompt = `You are Zee, a fun and knowledgeable personal stylist AI. Generate THREE different outfit options for someone with the following style profile:

Style Personality: ${styleProfile.style_personality}
Style Traits: ${styleProfile.style_traits?.join(', ')}
Preferred Colors: ${styleProfile.color_palette?.join(', ')}
Style Description: ${styleProfile.style_description}

The occasion is: "${occasion}"

Create THREE distinct outfits that:
1. All match their style personality perfectly
2. Are appropriate for the occasion
3. Use colors from their preferred palette when possible
4. Include specific, descriptive pieces (not just "nice top" but "cream silk button-up with subtle texture")
5. Offer different vibes/approaches to the same occasion

Be specific with colors, fabrics, and details. Make each outfit feel personalized and achievable.`;

      const result = await groqClient.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            outfits: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  outfit_name: { type: "string", description: "A cute, catchy name for the outfit like 'Effortless Sophisticate' or 'Weekend Wanderer'" },
                  pieces: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        item: { type: "string" },
                        details: { type: "string" },
                        color: { type: "string", description: "Hex color code for the piece" }
                      }
                    }
                  },
                  styling_tips: { type: "string", description: "2-3 sentences explaining WHY this outfit works for their style and the occasion" },
                  vibe_tags: { type: "array", items: { type: "string" }, description: "3-4 mood/vibe tags" }
                }
              }
            }
          }
        }
      });

      // Generate images for each outfit in parallel
      const outfitsWithImages = await Promise.all(
        result.outfits.map(async (outfit) => {
          try {
            // Build a detailed, visual description for better image generation
            const pieceDescriptions = outfit.pieces.map(p => {
              // Use the color from details if available, otherwise use hex color
              const colorDesc = p.details.includes('color') ? '' : p.details.split(' ')[0];
              return `${colorDesc} ${p.item} (${p.details})`.trim();
            }).join(', ');
            
            // Create a comprehensive, descriptive prompt for the image generator
            const imagePrompt = `Professional fashion photography: ${outfit.outfit_name}. Full body shot of a stylish person wearing ${pieceDescriptions}. ${outfit.vibe_tags.join(', ')} aesthetic, ${styleProfile.style_personality} style. For occasion: ${occasion}. Clean white studio background, natural lighting, realistic fabric textures, high fashion editorial style, full outfit visible from head to toe`;
            
            // Debug log to see what prompt is being sent
            console.log('🎨 IMAGE PROMPT:', imagePrompt);
            
            const imageResult = await groqClient.integrations.Core.GenerateImage({
              prompt: imagePrompt
            });
            
            return {
              ...outfit,
              occasion,
              image_url: imageResult.url
            };
          } catch (error) {
            console.error('Error generating image for outfit:', error);
            // Fallback to placeholder with outfit name
            return {
              ...outfit,
              occasion,
              image_url: `https://via.placeholder.com/600x800/ec4899/ffffff?text=${encodeURIComponent(outfit.outfit_name)}`
            };
          }
        })
      );

      // Pass all outfits to parent
      outfitsWithImages.forEach(outfit => onOutfitGenerated(outfit));
      
    } catch (error) {
      console.error('Error generating outfit:', error);
      alert('Failed to generate outfits. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What's the occasion?
        </label>
        <div className="flex gap-3">
          <input
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-300 focus:outline-none"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            placeholder="e.g., Brunch with the girls"
            onKeyPress={(e) => e.key === 'Enter' && generateOutfit()}
          />
          <Button
            onClick={generateOutfit}
            disabled={isGenerating || !occasion.trim()}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl px-6"
          >
            {isGenerating ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Wand2 className="h-5 w-5 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Quick picks</p>
        <div className="flex flex-wrap gap-2">
          {occasionSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setOccasion(suggestion)}
              className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-rose-50 text-gray-600 hover:text-rose-600 rounded-full transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}