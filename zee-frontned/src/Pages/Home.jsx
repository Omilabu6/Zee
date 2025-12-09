// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Sparkles, ArrowRight, Heart, Zap, BookOpen } from 'lucide-react';
// import { Button } from "flowbite-react";
// import  base44  from '@/api/base44Client';
// import { createPageUrl } from "@/utils";

// export default function Home() {
//   const [hasProfile, setHasProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     checkProfile();
//   }, []);

//   const checkProfile = async () => {
//     try {
//       const profiles = await base44.entities.StyleProfile.list();
//       setHasProfile(profiles.length > 0);
//     } catch (error) {
//       setHasProfile(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
//         <div className="w-8 h-8 border-2 border-rose-300 border-t-rose-600 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
//       <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-16"
//         >
//           <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6">
//             <Sparkles className="h-4 w-4 text-rose-500" />
//             <span className="text-sm font-medium text-gray-600">Your personal style companion</span>
//           </div>
          
//           <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
//             Meet <span className="font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Zee</span>
//           </h1>
          
//           <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
//             Your AI-powered hype girl for getting dressed. 
//             <span className="text-gray-700"> Less decision fatigue, more confidence, cute outfits.</span>
//           </p>
//         </motion.div>

//         {/* CTA Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="flex flex-col items-center gap-4 mb-20"
//         >
//           {hasProfile ? (
//             <>
//               <Link to={createPageUrl('StyleDashboard')}>
//                 <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-2xl shadow-lg shadow-rose-200 hover:shadow-xl transition-all">
//                   Go to My Style Dashboard
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Button>
//               </Link>
//               <Link to={createPageUrl('StyleQuiz')}>
//                 <Button variant="ghost" className="text-gray-500 hover:text-rose-500">
//                   Retake the quiz
//                 </Button>
//               </Link>
//             </>
//           ) : (
//             <Link to={createPageUrl('StyleQuiz')}>
//               <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-2xl shadow-lg shadow-rose-200 hover:shadow-xl transition-all">
//                 Discover Your Style
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </Link>
//           )}
//         </motion.div>

//         {/* Features Grid */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="grid md:grid-cols-3 gap-6"
//         >
//           <FeatureCard
//             icon={<Zap className="h-6 w-6" />}
//             title="Find Your Vibe"
//             description="Take a fun quiz that actually gets your style - no boring questions, just vibes"
//             gradient="from-rose-400 to-pink-400"
//           />
//           <FeatureCard
//             icon={<Sparkles className="h-6 w-6" />}
//             title="Get Outfit Ideas"
//             description="Tell Zee what you're doing and get personalized looks that match YOUR energy"
//             gradient="from-pink-400 to-purple-400"
//           />
//           <FeatureCard
//             icon={<BookOpen className="h-6 w-6" />}
//             title="Build Your Lookbook"
//             description="Save your faves and build a collection of outfits you know work for you"
//             gradient="from-purple-400 to-indigo-400"
//           />
//         </motion.div>

//         {/* Style Personalities Preview */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//           className="mt-20 text-center"
//         >
//           <h2 className="text-2xl font-light text-gray-900 mb-8">Which one are you?</h2>
//           <div className="flex flex-wrap justify-center gap-3">
//             {['Soft Romantic 🦢', 'Edgy Minimalist 🖤', 'Chaotic Creative 🎨', 'Classic Elevated ✨', 'Effortless Cool 😎'].map((style) => (
//               <span
//                 key={style}
//                 className="px-4 py-2 bg-white rounded-full shadow-sm text-gray-700 text-sm font-medium"
//               >
//                 {style}
//               </span>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// function FeatureCard({ icon, title, description, gradient }) {
//   return (
//     <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
//       <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-5`}>
//         {icon}
//       </div>
//       <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
//       <p className="text-gray-500 leading-relaxed">{description}</p>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Zap, BookOpen } from 'lucide-react';
import { Button } from "flowbite-react";
import groqClient from '@/api/groqClient'; // Using FREE Groq!
import { createPageUrl } from "@/utils";

export default function Home() {
  const [hasProfile, setHasProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    try {
      const profiles = await groqClient.entities.StyleProfile.list();
      setHasProfile(profiles.length > 0);
    } catch (error) {
      setHasProfile(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-rose-300 border-t-rose-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium text-gray-600">Your personal style companion</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
            Meet <span className="font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Zee</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            Your AI-powered hype girl for getting dressed. 
            <span className="text-gray-700"> Less decision fatigue, more confidence, cute outfits.</span>
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-4 mb-20"
        >
          {hasProfile ? (
            <>
              <Link to={createPageUrl('StyleDashboard')}>
                <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-2xl shadow-lg shadow-rose-200 hover:shadow-xl transition-all">
                  Go to My Style Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to={createPageUrl('StyleQuiz')}>
                <Button variant="ghost" className="text-gray-500 hover:text-rose-500">
                  Retake the quiz
                </Button>
              </Link>
            </>
          ) : (
            <Link to={createPageUrl('StyleQuiz')}>
              <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-2xl shadow-lg shadow-rose-200 hover:shadow-xl transition-all">
                Discover Your Style
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Find Your Vibe"
            description="Take a fun quiz that actually gets your style - no boring questions, just vibes"
            gradient="from-rose-400 to-pink-400"
          />
          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            title="Get Outfit Ideas"
            description="Tell Zee what you're doing and get personalized looks that match YOUR energy"
            gradient="from-pink-400 to-purple-400"
          />
          <FeatureCard
            icon={<BookOpen className="h-6 w-6" />}
            title="Build Your Lookbook"
            description="Save your faves and build a collection of outfits you know work for you"
            gradient="from-purple-400 to-indigo-400"
          />
        </motion.div>

        {/* Style Personalities Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl font-light text-gray-900 mb-8">Which one are you?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Soft Romantic 🦢', 'Edgy Minimalist 🖤', 'Chaotic Creative 🎨', 'Classic Elevated ✨', 'Effortless Cool 😎'].map((style) => (
              <span
                key={style}
                className="px-4 py-2 bg-white rounded-full shadow-sm text-gray-700 text-sm font-medium"
              >
                {style}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-5`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}