import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Bookmark, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "flowbite-react";
import { Badge } from "flowbite-react";
import { cn } from "@/lib/utils";

export default function OutfitCard({ outfit, onSave, isSaved, showSaveButton = true }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500"
    >
      {outfit.image_url && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={outfit.image_url}
            alt={outfit.outfit_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{outfit.outfit_name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{outfit.occasion}</p>
          </div>
          {showSaveButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSave(outfit)}
              className={cn(
                "rounded-full transition-all",
                isSaved ? "text-rose-500 bg-rose-50" : "text-gray-400 hover:text-rose-500"
              )}
            >
              <Bookmark className={cn("h-5 w-5", isSaved && "fill-current")} />
            </Button>
          )}
        </div>

        {outfit.vibe_tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {outfit.vibe_tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-600 font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-2 mb-4">
          {outfit.pieces?.slice(0, expanded ? undefined : 3).map((piece, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <div 
                className="w-3 h-3 rounded-full border-2 border-gray-200"
                style={{ backgroundColor: piece.color || '#e5e7eb' }}
              />
              <span className="text-gray-700 font-medium">{piece.item}</span>
              {piece.details && (
                <span className="text-gray-400">• {piece.details}</span>
              )}
            </div>
          ))}
        </div>

        {outfit.pieces?.length > 3 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-sm text-rose-500 hover:text-rose-600 mb-4"
          >
            {expanded ? (
              <>Show less <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>+{outfit.pieces.length - 3} more pieces <ChevronDown className="h-4 w-4" /></>
            )}
          </button>
        )}

        {outfit.styling_tips && (
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-4 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-rose-400" />
              <span className="text-xs font-semibold text-rose-500 uppercase tracking-wide">Why it works</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{outfit.styling_tips}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

