import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, User, RefreshCw, Plus } from 'lucide-react';
import { Button } from "flowbite-react";
import { Badge } from "flowbite-react";
import base44 from '@/api/base44Client';
import { createPageUrl } from "@/utils";
import OutfitGenerator from '@/Components/outfit/OutfitGenerator';
import OutfitCard from '@/Components/outfit/OutfitCard';
import { toast } from 'sonner';

export default function StyleDashboard() {
  const [styleProfile, setStyleProfile] = useState(null);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [generatedOutfits, setGeneratedOutfits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('generate');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Add safety checks for base44 and entities
      if (!base44 || !base44.entities) {
        console.error('base44 client not properly initialized');
        toast.error('Unable to connect to the server');
        setIsLoading(false);
        return;
      }

      // Check if StyleProfile and SavedOutfit entities exist
      if (!base44.entities.StyleProfile || !base44.entities.SavedOutfit) {
        console.error('Required entities not found:', {
          hasStyleProfile: !!base44.entities.StyleProfile,
          hasSavedOutfit: !!base44.entities.SavedOutfit
        });
        toast.error('Application configuration error');
        setIsLoading(false);
        return;
      }

      const [profiles, outfits] = await Promise.all([
        base44.entities.StyleProfile.list(),
        base44.entities.SavedOutfit.list('-created_date')
      ]);
      
      if (profiles && profiles.length > 0) {
        setStyleProfile(profiles[0]);
      }
      setSavedOutfits(outfits || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load your style profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOutfitGenerated = (outfit) => {
    setGeneratedOutfits(prev => [outfit, ...prev]);
  };

  const saveOutfit = async (outfit) => {
    try {
      if (!base44?.entities?.SavedOutfit) {
        toast.error('Unable to save outfit');
        return;
      }
      
      const savedOutfit = await base44.entities.SavedOutfit.create(outfit);
      setSavedOutfits(prev => [savedOutfit, ...prev]);
      toast.success('Outfit saved to your lookbook!');
    } catch (error) {
      console.error('Error saving outfit:', error);
      toast.error('Failed to save outfit');
    }
  };

  const isOutfitSaved = (outfit) => {
    return savedOutfits.some(saved => 
      saved.outfit_name === outfit.outfit_name && 
      saved.occasion === outfit.occasion
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-rose-300 border-t-rose-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!styleProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-500 mb-4">You haven't taken the style quiz yet!</p>
          <Link to={createPageUrl('StyleQuiz')}>
            <Button className="bg-gradient-to-r from-rose-500 to-pink-500">
              Take the Quiz
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-light text-gray-900">
              Hey, <span className="font-semibold">{styleProfile.style_personality}</span> ✨
            </h1>
            <p className="text-gray-500 mt-1">Let's find your perfect outfit today</p>
          </div>
          <Link to={createPageUrl('StyleQuiz')}>
            <Button variant="outline" className="rounded-xl">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
          </Link>
        </div>

        {/* Style Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-rose-400" />
              <span className="text-sm text-gray-500">Your vibe:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {styleProfile.style_traits?.map((trait, i) => (
                <Badge key={i} variant="secondary" className="bg-rose-50 text-rose-600 capitalize">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Custom Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('generate')}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === 'generate'
                    ? 'border-rose-500 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Sparkles className="h-4 w-4" />
                Generate Outfit
              </button>
              <button
                onClick={() => setActiveTab('lookbook')}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === 'lookbook'
                    ? 'border-rose-500 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <BookOpen className="h-4 w-4" />
                My Lookbook ({savedOutfits.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'generate' && (
            <>
              {/* Generator Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100"
              >
                <OutfitGenerator 
                  styleProfile={styleProfile} 
                  onOutfitGenerated={handleOutfitGenerated}
                />
              </motion.div>

              {/* Generated Outfits */}
              {generatedOutfits.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Generated Looks</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {generatedOutfits.map((outfit, index) => (
                        <OutfitCard
                          key={index}
                          outfit={outfit}
                          onSave={saveOutfit}
                          isSaved={isOutfitSaved(outfit)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {generatedOutfits.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👗</div>
                  <p className="text-gray-500">Tell Zee what you're doing and get personalized outfit ideas!</p>
                </div>
              )}
            </>
          )}

          {activeTab === 'lookbook' && (
            <>
              {savedOutfits.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {savedOutfits.map((outfit) => (
                      <OutfitCard
                        key={outfit.id}
                        outfit={outfit}
                        showSaveButton={false}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your lookbook is empty</h3>
                  <p className="text-gray-500 mb-6">Generate some outfits and save your favorites!</p>
                  <Button 
                    onClick={() => setActiveTab('generate')}
                    className="bg-gradient-to-r from-rose-500 to-pink-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Your First Outfit
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}