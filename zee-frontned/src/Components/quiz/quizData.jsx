export const quizQuestions = [
  {
    id: 'coffee_shop',
    question: "Pick your dream coffee shop aesthetic ☕",
    options: [
      { value: 'cozy', emoji: '🕯️', label: 'Cozy & Candlelit', subtitle: 'Soft lighting, vintage vibes, journal in hand' },
      { value: 'minimal', emoji: '🤍', label: 'Sleek & Minimal', subtitle: 'Clean lines, concrete floors, perfect latte art' },
      { value: 'eclectic', emoji: '🎨', label: 'Artsy & Eclectic', subtitle: 'Mismatched furniture, local art, good chaos' },
      { value: 'chic', emoji: '✨', label: 'Parisian Chic', subtitle: 'Marble tables, fresh flowers, croissant energy' }
    ]
  },
  {
    id: 'saturday_vibe',
    question: "What's your ideal Saturday vibe?",
    options: [
      { value: 'cozy', emoji: '📚', label: 'Soft & Slow', subtitle: 'Farmers market, reading, golden hour walks' },
      { value: 'productive', emoji: '💪', label: 'Put Together', subtitle: 'Gym, errands, looking good while doing it' },
      { value: 'adventurous', emoji: '🌿', label: 'Spontaneous', subtitle: 'Day trip, thrift shopping, see where it goes' },
      { value: 'social', emoji: '🥂', label: 'Main Character', subtitle: 'Brunch, shopping, rooftop sunset drinks' }
    ]
  },
  {
    id: 'color_mood',
    question: "You're redecorating - what's the color story?",
    options: [
      { value: 'soft', emoji: '🌸', label: 'Soft & Dreamy', subtitle: 'Blush, cream, sage, dusty rose' },
      { value: 'neutral', emoji: '🖤', label: 'Moody Neutrals', subtitle: 'Black, white, gray, touches of camel' },
      { value: 'bold', emoji: '🔥', label: 'Bold & Unexpected', subtitle: 'Emerald, burgundy, mustard - why not all?' },
      { value: 'earthy', emoji: '🍂', label: 'Warm & Earthy', subtitle: 'Terracotta, olive, warm browns, rust' }
    ]
  },
  {
    id: 'fashion_icon',
    question: "Pick a fashion icon energy",
    options: [
      { value: 'romantic', emoji: '🦢', label: 'Florence Pugh', subtitle: 'Feminine, playful, unapologetically pretty' },
      { value: 'minimal', emoji: '🖤', label: 'Hailey Bieber', subtitle: 'Clean girl, effortless, quiet luxury' },
      { value: 'eclectic', emoji: '🌈', label: 'Zendaya', subtitle: 'Risk-taker, statement pieces, never boring' },
      { value: 'classic', emoji: '👜', label: 'Amal Clooney', subtitle: 'Timeless, polished, power elegance' }
    ]
  },
  {
    id: 'closet_reality',
    question: "Be honest - what does your closet actually look like?",
    options: [
      { value: 'curated', emoji: '🧺', label: 'Carefully Curated', subtitle: 'Everything matches, color-coded maybe' },
      { value: 'chaotic', emoji: '🌪️', label: 'Beautiful Chaos', subtitle: 'Treasures everywhere, I know where things are' },
      { value: 'basics', emoji: '👕', label: 'Basics Heavy', subtitle: 'Lots of basics, need more statement pieces' },
      { value: 'evolving', emoji: '🦋', label: 'In Transition', subtitle: 'Figuring out my style, mix of everything' }
    ]
  },
  {
    id: 'accessory_pick',
    question: "You can only keep ONE accessory forever",
    options: [
      { value: 'delicate', emoji: '📿', label: 'Delicate Gold Jewelry', subtitle: 'Dainty layers, understated sparkle' },
      { value: 'statement', emoji: '🕶️', label: 'Statement Sunglasses', subtitle: 'Instant cool, hide-from-the-world vibes' },
      { value: 'bag', emoji: '👜', label: 'The Perfect Bag', subtitle: 'Goes with everything, carries my life' },
      { value: 'scarf', emoji: '🧣', label: 'Silk Scarf', subtitle: 'Tie it anywhere, instant chic' }
    ]
  },
  {
    id: 'confidence_outfit',
    question: "What makes you feel most confident?",
    options: [
      { value: 'flowy', emoji: '💃', label: 'Something Flowy', subtitle: 'Movement, fabric that feels like a dream' },
      { value: 'structured', emoji: '🖤', label: 'Something Structured', subtitle: 'Sharp shoulders, clean silhouette' },
      { value: 'unexpected', emoji: '⚡', label: 'Something Unexpected', subtitle: 'A piece that makes people ask "where\'d you get that?"' },
      { value: 'classic', emoji: '👠', label: 'Something Classic', subtitle: 'Tried and true, always appropriate' }
    ]
  }
];

export const stylePersonalities = {
  'Soft Romantic': {
    traits: ['feminine', 'delicate', 'flowy', 'dreamy'],
    colors: ['blush pink', 'cream', 'sage green', 'dusty rose', 'soft lavender'],
    description: "You're drawn to the softer side of style - think flowy fabrics, delicate details, and colors that feel like a sunset. Your outfits have a romantic, ethereal quality that's effortlessly feminine without trying too hard."
  },
  'Edgy Minimalist': {
    traits: ['sleek', 'monochromatic', 'structured', 'intentional'],
    colors: ['black', 'white', 'gray', 'camel', 'navy'],
    description: "Less is more, but make it interesting. You gravitate toward clean lines and a neutral palette, but there's always an edge - maybe it's the cut, the texture, or that one statement piece that says 'I thought about this.'"
  },
  'Chaotic Creative': {
    traits: ['bold', 'eclectic', 'experimental', 'artistic'],
    colors: ['emerald', 'burgundy', 'mustard', 'cobalt', 'terracotta'],
    description: "Rules? You make your own. Your style is a mood board come to life - mixing patterns, playing with proportions, and pulling off combinations that shouldn't work but absolutely do. Fashion is your creative outlet."
  },
  'Classic Elevated': {
    traits: ['timeless', 'polished', 'sophisticated', 'refined'],
    colors: ['navy', 'ivory', 'camel', 'burgundy', 'forest green'],
    description: "You believe in investment pieces and timeless elegance. Your style whispers luxury - quality fabrics, perfect tailoring, and a color palette that never goes out of fashion. You dress like you have a trust fund (whether you do or not)."
  },
  'Effortless Cool': {
    traits: ['relaxed', 'confident', 'understated', 'modern'],
    colors: ['white', 'tan', 'olive', 'warm gray', 'soft black'],
    description: "You've mastered the art of looking like you didn't try - but in the best way. Your style is relaxed but intentional, mixing high and low effortlessly. You're the friend everyone asks 'where did you get that?' about basics."
  }
};

export function calculateStylePersonality(answers) {
  const scores = {
    'Soft Romantic': 0,
    'Edgy Minimalist': 0,
    'Chaotic Creative': 0,
    'Classic Elevated': 0,
    'Effortless Cool': 0
  };

  // Coffee shop
  if (answers.coffee_shop === 'cozy') scores['Soft Romantic'] += 2;
  if (answers.coffee_shop === 'minimal') scores['Edgy Minimalist'] += 2;
  if (answers.coffee_shop === 'eclectic') scores['Chaotic Creative'] += 2;
  if (answers.coffee_shop === 'chic') scores['Classic Elevated'] += 2;

  // Saturday vibe
  if (answers.saturday_vibe === 'cozy') scores['Soft Romantic'] += 2;
  if (answers.saturday_vibe === 'productive') scores['Effortless Cool'] += 2;
  if (answers.saturday_vibe === 'adventurous') scores['Chaotic Creative'] += 2;
  if (answers.saturday_vibe === 'social') scores['Classic Elevated'] += 2;

  // Color mood
  if (answers.color_mood === 'soft') scores['Soft Romantic'] += 2;
  if (answers.color_mood === 'neutral') scores['Edgy Minimalist'] += 2;
  if (answers.color_mood === 'bold') scores['Chaotic Creative'] += 2;
  if (answers.color_mood === 'earthy') scores['Effortless Cool'] += 2;

  // Fashion icon
  if (answers.fashion_icon === 'romantic') scores['Soft Romantic'] += 2;
  if (answers.fashion_icon === 'minimal') scores['Edgy Minimalist'] += 2;
  if (answers.fashion_icon === 'eclectic') scores['Chaotic Creative'] += 2;
  if (answers.fashion_icon === 'classic') scores['Classic Elevated'] += 2;

  // Closet reality
  if (answers.closet_reality === 'curated') scores['Edgy Minimalist'] += 1;
  if (answers.closet_reality === 'chaotic') scores['Chaotic Creative'] += 1;
  if (answers.closet_reality === 'basics') scores['Effortless Cool'] += 1;
  if (answers.closet_reality === 'evolving') scores['Soft Romantic'] += 1;

  // Accessory pick
  if (answers.accessory_pick === 'delicate') scores['Soft Romantic'] += 2;
  if (answers.accessory_pick === 'statement') scores['Edgy Minimalist'] += 2;
  if (answers.accessory_pick === 'bag') scores['Classic Elevated'] += 2;
  if (answers.accessory_pick === 'scarf') scores['Chaotic Creative'] += 2;

  // Confidence outfit
  if (answers.confidence_outfit === 'flowy') scores['Soft Romantic'] += 2;
  if (answers.confidence_outfit === 'structured') scores['Edgy Minimalist'] += 2;
  if (answers.confidence_outfit === 'unexpected') scores['Chaotic Creative'] += 2;
  if (answers.confidence_outfit === 'classic') scores['Classic Elevated'] += 2;

  const topStyle = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return topStyle;
}