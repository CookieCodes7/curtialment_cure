import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)

const translations = {
  en: {
    language: 'Language',
    switchLanguage: 'Change language',

    // Navigation
    home: 'Home',
    activity: 'Activity',
    earnings: 'Earnings',
    alerts: 'Alerts',
    profile: 'Profile',

    // Portal
    farmerPortal: 'Farmer / Participant Portal',
    systemOnline: 'System Online',
    namaste: 'Namaste',

    // Flexible Load
    flexibleLoad: 'Flexible Load',
    yourFlexibleLoad: 'Your Flexible Load',
    runningNow: 'Running now',
    ready: 'Ready',

    participatingEvent:
      'Your pump is participating in a flexibility event.',

    availableEvent:
      'Your pump is available for the next event.',

    currentPower: 'Current power',
    capacity: 'Capacity',

    live: 'Live',
    available: 'Available',
    notRunning: 'Not currently running',

    // Events
    flexibilityEvent: 'Flexibility event',
    solarPlant: 'Solar plant',
    requested: 'requested',
    energyFlexibilityRequest:
      'Energy flexibility request',
    eventInProgress: 'Event in progress',
    participating: 'Participating',

    // Earnings / Energy
    thisMonth: 'This month',
    verifiedEnergy: 'Verified energy',
    hardwareVerified: 'Hardware verified',
    earnedFromFlexibility:
      'Earned from flexibility',

    // Participation
    yourParticipation: 'Your participation',
    yourContribution:
      'Your contribution this month',
    events: 'Events',
    kwhVerified: 'kWh verified',
    verified: 'Verified',

    // Activity
    recentActivity: 'Recent activity',
    latestEvents:
      'Your latest verified flexibility events',
    viewAll: 'View all',

    // Impact
    yourFlexibilityMatters:
      'Your flexibility matters',

    verifiedFlexibility:
      'Verified flexibility this month',

    helpingGrid:
      'By making your pump available when the grid needs flexible demand, you help absorb renewable energy that might otherwise be curtailed.',

    // Demo
    demoNote:
      'SolarRevive demo · Energy and earnings shown are illustrative values from the prototype.',

    // Account
    logout: 'Log out',
  },

  hi: {
    language: 'भाषा',
    switchLanguage: 'भाषा बदलें',

    // Navigation
    home: 'होम',
    activity: 'गतिविधि',
    earnings: 'कमाई',
    alerts: 'सूचनाएँ',
    profile: 'प्रोफ़ाइल',

    // Portal
    farmerPortal: 'किसान / प्रतिभागी पोर्टल',
    systemOnline: 'सिस्टम ऑनलाइन',
    namaste: 'नमस्ते',

    // Flexible Load
    flexibleLoad: 'लचीला लोड',
    yourFlexibleLoad: 'आपका लचीला लोड',
    runningNow: 'अभी चल रहा है',
    ready: 'तैयार है',

    participatingEvent:
      'आपका पंप अभी लचीलापन कार्यक्रम में भाग ले रहा है।',

    availableEvent:
      'आपका पंप अगले लचीलापन कार्यक्रम के लिए उपलब्ध है।',

    currentPower: 'वर्तमान बिजली',
    capacity: 'क्षमता',

    live: 'लाइव',
    available: 'उपलब्ध',
    notRunning: 'अभी नहीं चल रहा',

    // Events
    flexibilityEvent: 'लचीलापन कार्यक्रम',
    solarPlant: 'सौर संयंत्र',
    requested: 'की मांग',
    energyFlexibilityRequest:
      'ऊर्जा लचीलापन अनुरोध',
    eventInProgress: 'कार्यक्रम जारी है',
    participating: 'भाग ले रहे हैं',

    // Earnings / Energy
    thisMonth: 'इस महीने',
    verifiedEnergy: 'सत्यापित ऊर्जा',
    hardwareVerified:
      'हार्डवेयर द्वारा सत्यापित',
    earnedFromFlexibility:
      'लचीलेपन से कमाई',

    // Participation
    yourParticipation: 'आपकी भागीदारी',
    yourContribution:
      'इस महीने आपका योगदान',
    events: 'कार्यक्रम',
    kwhVerified: 'kWh सत्यापित',
    verified: 'सत्यापित',

    // Activity
    recentActivity: 'हाल की गतिविधि',
    latestEvents:
      'आपके हाल के सत्यापित लचीलापन कार्यक्रम',
    viewAll: 'सभी देखें',

    // Impact
    yourFlexibilityMatters:
      'आपका योगदान महत्वपूर्ण है',

    verifiedFlexibility:
      'इस महीने का सत्यापित लचीलापन',

    helpingGrid:
      'जब ग्रिड को लचीली मांग की आवश्यकता होती है, तब अपने पंप को उपलब्ध रखकर आप ऐसी अक्षय ऊर्जा को उपयोग करने में मदद करते हैं जो अन्यथा कम हो सकती थी।',

    // Demo
    demoNote:
      'SolarRevive डेमो · ऊर्जा और कमाई के आँकड़े प्रोटोटाइप के उदाहरणात्मक आँकड़े हैं।',

    // Account
    logout: 'लॉग आउट',
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('SolarRevive-language') || 'en'
  })

  useEffect(() => {
    localStorage.setItem(
      'SolarRevive-language',
      language
    )
  }, [language])

  const toggleLanguage = () => {
    setLanguage((current) =>
      current === 'en' ? 'hi' : 'en'
    )
  }

  const t = (key) => {
    return (
      translations[language]?.[key] ??
      translations.en[key] ??
      key
    )
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error(
      'useLanguage must be used inside LanguageProvider'
    )
  }

  return context
}