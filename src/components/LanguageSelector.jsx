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
  // English (Default)
  { code: "en", name: "English" },
  
  //Indian
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
  
  // Major Asian 
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
  
  // Middle Eastern 
  { code: "ar", name: "العربية (Arabic)" },
  { code: "fa", name: "فارسی (Persian)" },
  { code: "he", name: "עברית (Hebrew)" },
  { code: "tr", name: "Türkçe (Turkish)" },
  
  // European 
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
  
  // African
  { code: "sw", name: "Kiswahili (Swahili)" },
  { code: "zu", name: "isiZulu (Zulu)" },
  { code: "xh", name: "isiXhosa (Xhosa)" },
  { code: "af", name: "Afrikaans" },
  { code: "am", name: "አማርኛ (Amharic)" },
  { code: "ha", name: "Hausa" },
  { code: "ig", name: "Igbo" },
  { code: "yo", name: "Yorùbá (Yoruba)" },
  { code: "so", name: "Soomaali (Somali)" },
  
  // Latin American 
  { code: "ca", name: "Català (Catalan)" },
  { code: "gl", name: "Galego (Galician)" },
  { code: "eu", name: "Euskara (Basque)" },
  
  // Other 
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

//total 92 languages


export const LanguageSelector = () => {
  const [currentLang, setCurrentLang] = useState("en");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!window.google?.translate) {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: languages.map(l => l.code).join(","),
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element_hidden"
        );
        setIsLoaded(true);
        
        // Check if page is already translated and update state
        setTimeout(() => {
          const currentLangFromHash = window.location.hash.match(/#googtrans\(en\|([^)]+)\)/);
          if (currentLangFromHash && currentLangFromHash[1]) {
            setCurrentLang(currentLangFromHash[1]);
          }
        }, 500);
      };
    } else {
      setIsLoaded(true);
      // Check current language on mount
      const currentLangFromHash = window.location.hash.match(/#googtrans\(en\|([^)]+)\)/);
      if (currentLangFromHash && currentLangFromHash[1]) {
        setCurrentLang(currentLangFromHash[1]);
      }
    }

    const style = document.createElement("style");
    style.innerHTML = `
      #google_translate_element_hidden {
        display: none !important;
        visibility: hidden !important;
        position: absolute !important;
        left: -9999px !important;
      }
      .goog-te-banner-frame {
        display: none !important;
        visibility: hidden !important;
      }
      body {
        top: 0 !important;
        position: static !important;
      }
      .skiptranslate {
        display: none !important;
        visibility: hidden !important;
      }
      /* Hide all Google Translate UI elements */
      .goog-te-gadget {
        display: none !important;
        visibility: hidden !important;
      }
      .goog-te-combo {
        display: none !important;
        visibility: hidden !important;
      }
      iframe.skiptranslate {
        display: none !important;
        visibility: hidden !important;
        position: absolute !important;
        left: -9999px !important;
      }
      body > .skiptranslate {
        display: none !important;
        visibility: hidden !important;
      }
      .goog-te-spinner-pos {
        display: none !important;
        visibility: hidden !important;
      }
      .goog-te-balloon-frame {
        display: none !important;
        visibility: hidden !important;
      }
      /* Hide the translate icon/widget completely */
      #goog-gt-tt, .goog-gt-tt {
        display: none !important;
        visibility: hidden !important;
      }
      .goog-te-menu-value span:first-child {
        display: none !important;
      }
      /* Hide menu frame */
      .goog-te-menu-frame {
        display: none !important;
        visibility: hidden !important;
      }
      /* Hide menu2 frame */
      .goog-te-menu2 {
        display: none !important;
        visibility: hidden !important;
      }
      /* Hide ftab */
      .goog-te-ftab {
        display: none !important;
        visibility: hidden !important;
      }
      /* Hide all Google Translate UI by ID pattern */
      [id^="goog-gt-"] {
        display: none !important;
        visibility: hidden !important;
      }
      /* Hide elements with class starting with goog-te */
      [class^="goog-te"] {
        display: none !important;
        visibility: hidden !important;
      }
      /* Force hide any visible translate elements */
      body > .skiptranslate,
      body > .goog-te-banner-frame,
      body > iframe.skiptranslate {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
      /* Keep dropdown menu text in original language */
      .notranslate {
        translate: no !important;
      }
      .notranslate * {
        translate: no !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (style.parentNode) style.parentNode.removeChild(style);
    };
  }, []);

  const changeLanguage = (langCode) => {
    // Set the hash FIRST, then reload
    // This ensures Google Translate sees the hash on page load
    window.location.hash = `googtrans(en|${langCode})`;
    
    // Immediately reload - the hash is already set
    window.location.reload();
  };

  const getCurrentLanguageName = () => {
    return languages.find(l => l.code === currentLang)?.name || "English";
  };

  return (
    <>
      <div id="google_translate_element_hidden"></div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-1.5 notranslate hover:bg-accent px-2">
            <Globe className="w-3.5 h-3.5" />
            <span className="text-xs font-medium notranslate hidden xl:inline">{getCurrentLanguageName()}</span>
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
              className={`notranslate cursor-pointer ${currentLang === lang.code ? "bg-accent font-medium" : ""}`}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
