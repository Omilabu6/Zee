import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Palette, Heart, Star } from 'lucide-react';
import { Button } from "flowbite-react";
import { Badge } from "flowbite-react";
import { createPageUrl } from "@/utils";
import { stylePersonalities } from '@/components/quiz/quizData';

const styleEmojis = {
  'Soft Romantic': '🦢',
  'Edgy Minimalist': '🖤',
  'Chaotic Creative': '🎨',
  'Classic Elevated': '✨',
  'Effortless Cool': '😎'
};

const styleGradients = {
  'Soft Romantic': 'from-rose-400 to-pink-300',
  'Edgy Minimalist': 'from-gray-800 to-gray-600',
  'Chaotic Creative': 'from-purple-500 to-orange-400',
  'Classic Elevated': 'from-amber-400 to-orange-300',
  'Effortless Cool': 'from-teal-400 to-emerald-400'
};

export default function StyleResult() {
  const urlParams = new URLSearchParams(window.location.search);
  const styleName = urlParams.get('style') || 'Soft Romantic';
  const styleData = stylePersonalities[styleName] || stylePersonalities['Soft Romantic'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Celebration Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-7xl mb-6"
          >
            {styleEmojis[styleName]}
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-medium text-rose-500 uppercase tracking-widest mb-3"
          >
            Your style personality is
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${styleGradients[styleName]} bg-clip-text text-transparent mb-6`}
          >
            {styleName}
          </motion.h1>
        </motion.div>

        {/* Style Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-lg mb-8"
        >
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {styleData.description}
          </p>

          {/* Style Traits */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-rose-400" />
              <span className="font-semibold text-gray-900">Your Style Traits</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {styleData.traits.map((trait, i) => (
                <Badge 
                  key={i} 
                  variant="secondary"
                  className="bg-rose-50 text-rose-700 font-medium capitalize px-4 py-1.5"
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-rose-400" />
              <span className="font-semibold text-gray-900">Your Color Palette</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {styleData.colors.map((color, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2"
                >
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: getColorHex(color) }}
                  />
                  <span className="text-sm text-gray-600 capitalize">{color}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link to={createPageUrl('StyleDashboard')}>
            <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-2xl shadow-lg shadow-rose-200">
              Start Getting Outfit Ideas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <p className="mt-4 text-sm text-gray-400">
            Zee will help you put together looks that match your vibe ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function getColorHex(colorName) {
  const colorMap = {
    'blush pink': '#f8b4c4',
    'cream': '#fffdd0',
    'sage green': '#b2ac88',
    'dusty rose': '#dcae96',
    'soft lavender': '#e6e6fa',
    'black': '#1a1a1a',
    'white': '#ffffff',
    'gray': '#808080',
    'camel': '#c19a6b',
    'navy': '#000080',
    'emerald': '#50c878',
    'burgundy': '#800020',
    'mustard': '#ffdb58',
    'cobalt': '#0047ab',
    'terracotta': '#e2725b',
    'ivory': '#fffff0',
    'forest green': '#228b22',
    'tan': '#d2b48c',
    'olive': '#808000',
    'warm gray': '#a8a29e',
    'soft black': '#2d2d2d'
  };
  return colorMap[colorName.toLowerCase()] || '#e5e7eb';
}