import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "or", name: "ଓଡ଼ିଆ (Odia)" },
  { code: "as", name: "অসমীয়া (Assamese)" },
  { code: "ur", name: "اردو (Urdu)" },
  { code: "ne", name: "नेपाली (Nepali)" },
  { code: "sd", name: "سنڌي (Sindhi)" },
  { code: "ks", name: "कॉशुर (Kashmiri)" },
  { code: "sa", name: "संस्कृत (Sanskrit)" },
  { code: "mai", name: "मैथिली (Maithili)" },
  { code: "gom", name: "कोंकणी (Konkani)" },
  { code: "doi", name: "डोगरी (Dogri)" },
  { code: "sat", name: "ᱥᱟᱱᱛᱟᱲᱤ (Santali)" },
  { code: "mni-Mtei", name: "ꯃꯩꯇꯩꯂꯣꯟ (Manipuri/Meitei)" },
  { code: "brx", name: "बड़ो (Bodo)" },
  { code: "zh-CN", name: "中文简体 (Chinese Simplified)" },
  { code: "zh-TW", name: "中文繁體 (Chinese Traditional)" },
  { code: "ja", name: "日本語 (Japanese)" },
  { code: "ko", name: "한국어 (Korean)" },
  { code: "th", name: "ไทย (Thai)" },
  { code: "vi", name: "Tiếng Việt (Vietnamese)" },
  { code: "id", name: "Bahasa Indonesia (Indonesian)" },
  { code: "ms", name: "Bahasa Melayu (Malay)" },
  { code: "tl", name: "Filipino (Tagalog)" },
  { code: "my", name: "မြန်မာ (Burmese)" },
  { code: "km", name: "ខ្មែរ (Khmer)" },
  { code: "lo", name: "ລາວ (Lao)" },
  { code: "ar", name: "العربية (Arabic)" },
  { code: "fa", name: "فارسی (Persian)" },
  { code: "he", name: "עברית (Hebrew)" },
  { code: "tr", name: "Türkçe (Turkish)" },
  { code: "es", name: "Español (Spanish)" },
  { code: "fr", name: "Français (French)" },
  { code: "de", name: "Deutsch (German)" },
  { code: "it", name: "Italiano (Italian)" },
  { code: "pt", name: "Português (Portuguese)" },
  { code: "ru", name: "Русский (Russian)" },
  { code: "nl", name: "Nederlands (Dutch)" },
  { code: "pl", name: "Polski (Polish)" },
  { code: "uk", name: "Українська (Ukrainian)" },
  { code: "cs", name: "Čeština (Czech)" },
  { code: "ro", name: "Română (Romanian)" },
  { code: "sv", name: "Svenska (Swedish)" },
  { code: "da", name: "Dansk (Danish)" },
  { code: "no", name: "Norsk (Norwegian)" },
  { code: "fi", name: "Suomi (Finnish)" },
  { code: "el", name: "Ελληνικά (Greek)" },
  { code: "hu", name: "Magyar (Hungarian)" },
  { code: "bg", name: "Български (Bulgarian)" },
  { code: "sk", name: "Slovenčina (Slovak)" },
  { code: "hr", name: "Hrvatski (Croatian)" },
  { code: "sr", name: "Српски (Serbian)" },
  { code: "sl", name: "Slovenščina (Slovenian)" },
  { code: "lt", name: "Lietuvių (Lithuanian)" },
  { code: "lv", name: "Latviešu (Latvian)" },
  { code: "et", name: "Eesti (Estonian)" },
  { code: "is", name: "Íslenska (Icelandic)" },
  { code: "ga", name: "Gaeilge (Irish)" },
  { code: "mt", name: "Malti (Maltese)" },
  { code: "sw", name: "Kiswahili (Swahili)" },
  { code: "zu", name: "isiZulu (Zulu)" },
  { code: "xh", name: "isiXhosa (Xhosa)" },
  { code: "af", name: "Afrikaans" },
  { code: "am", name: "አማርኛ (Amharic)" },
  { code: "ha", name: "Hausa" },
  { code: "ig", name: "Igbo" },
  { code: "yo", name: "Yorùbá (Yoruba)" },
  { code: "so", name: "Soomaali (Somali)" },
  { code: "ca", name: "Català (Catalan)" },
  { code: "gl", name: "Galego (Galician)" },
  { code: "eu", name: "Euskara (Basque)" },
  { code: "sq", name: "Shqip (Albanian)" },
  { code: "hy", name: "Հայերեն (Armenian)" },
  { code: "az", name: "Azərbaycan (Azerbaijani)" },
  { code: "be", name: "Беларуская (Belarusian)" },
  { code: "bs", name: "Bosanski (Bosnian)" },
  { code: "ka", name: "ქართული (Georgian)" },
  { code: "kk", name: "Қазақ (Kazakh)" },
  { code: "ky", name: "Кыргызча (Kyrgyz)" },
  { code: "mk", name: "Македонски (Macedonian)" },
  { code: "mn", name: "Монгол (Mongolian)" },
  { code: "uz", name: "Oʻzbek (Uzbek)" },
  { code: "tg", name: "Тоҷикӣ (Tajik)" },
  { code: "tk", name: "Türkmen (Turkmen)" },
];

let googleTranslateInitialized = false;

export const LanguageSelector = () => {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    // Only run once on mount
    const savedLang = localStorage.getItem("preferredLanguage") || "en";
    setCurrentLang(savedLang);

    // Initialize Google Translate only once
    if (!googleTranslateInitialized && !window.google?.translate) {
      googleTranslateInitialized = true;
      
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => {
        console.warn("Google Translate failed to load");
      };
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: languages.map(l => l.code).join(","),
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element_hidden"
          );
        } catch (err) {
          console.warn("Google Translate init failed:", err);
        }
      };
    }

    // Hide Google Translate UI
    const style = document.createElement("style");
    style.innerHTML = `
      #google_translate_element_hidden { display: none !important; }
      .goog-te-banner-frame { display: none !important; }
      .skiptranslate { display: none !important; }
      .goog-te-gadget { display: none !important; }
      iframe.skiptranslate { display: none !important; }
      body > .skiptranslate { display: none !important; }
      [class^="goog-te"] { display: none !important; }
      [id^="goog-gt-"] { display: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      if (style.parentNode) style.parentNode.removeChild(style);
    };
  }, []); // Empty dependency array - run only once

  const changeLanguage = (langCode) => {
    localStorage.setItem("preferredLanguage", langCode);
    setCurrentLang(langCode);

    if (langCode === "en") {
      window.location.hash = "";
    } else {
      window.location.hash = `googtrans(en|${langCode})`;
    }

    // Reload after a short delay
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === currentLang);
    return lang?.name || "English";
  };

  return (
    <>
      <div id="google_translate_element_hidden"></div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1.5 notranslate hover:bg-accent px-2" 
            translate="no"
          >
            <Globe className="w-3.5 h-3.5" />
            <span 
              className="text-xs font-medium notranslate hidden xl:inline" 
              translate="no"
            >
              {getCurrentLanguageName()}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 max-h-96 overflow-y-auto notranslate">
          <div className="px-3 py-2 text-sm font-semibold border-b border-border">
            Select your language
          </div>
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`notranslate cursor-pointer ${
                currentLang === lang.code ? "bg-accent font-medium" : ""
              }`}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
