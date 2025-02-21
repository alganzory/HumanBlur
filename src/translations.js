// Text direction information for languages
const HB_TRANSLATIONS_DIR = {
    en: "ltr",
    tr: "ltr",
    ar: "rtl",
    ur: "rtl",
    uk: "ltr",
    ru: "ltr"
  };
  
  // Legacy function for backwards compatibility
  const getTranslations = () => {
    console.warn("getTranslations() is deprecated. Translations are now loaded from JSON files.");
    return {}; 
  };