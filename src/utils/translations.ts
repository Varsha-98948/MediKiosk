import { Language } from '@/types/patient';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  subTagline: string;
  start: string;
  help: string;
  listen: string;
  back: string;
  continue: string;
  skip: string;
  confirm: string;
  edit: string;
  save: string;
  cancel: string;
  yes: string;
  no: string;
  iAgree: string;
  iNeedHelp: string;
  termsTitle: string;
  termsDesc: string;
  privacyProtected: string;
  secureRecord: string;
  identifyTitle: string;
  scanAbha: string;
  enterAbha: string;
  newPatient: string;
  continueGuest: string;
  profileTitle: string;
  fullName: string;
  age: string;
  gender: string;
  male: string;
  female: string;
  other: string;
  mobileNumber: string;
  preferredLanguage: string;
  mainComplaintTitle: string;
  mainComplaintSubtitle: string;
  tellInOwnWords: string;
  speakNaturally: string;
  stopVoice: string;
  repeatVoice: string;
  whereItHurts: string;
  whenStarted: string;
  painType: string;
  painRadiation: string;
  associatedSymptomsTitle: string;
  painSeverityTitle: string;
  severityLow: string;
  severityModerate: string;
  severitySevere: string;
  aiAssistantHeader: string;
  aiAssistantSubheader: string;
  aiStatusListening: string;
  aiDoctorDisclaimer: string;
  redFlagTitle: string;
  redFlagSubtitle: string;
  redFlagNotice: string;
  callStaff: string;
  continueIfAllowed: string;
  docUploadTitle: string;
  docUploadSubtitle: string;
  takePhoto: string;
  uploadFile: string;
  cameraGuide: string;
  scanningDoc: string;
  docAiResultTitle: string;
  docAiResultSubtitle: string;
  looksCorrect: string;
  timelineTitle: string;
  reviewTitle: string;
  reviewSubtitle: string;
  doctorReviewDisclaimer: string;
  submitToDoctor: string;
  patientEmrTitle: string;
  nextAppointment: string;
  myPrescriptions: string;
  myReports: string;
  consultationHistory: string;
  profilePrivacy: string;
  printSummary: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: "MediKiosk",
    tagline: "Your health history, ready before your consultation.",
    subTagline: "Tell us about your health. You can speak or tap.",
    start: "Start Intake",
    help: "Need Help?",
    listen: "Listen to instructions",
    back: "Back",
    continue: "Continue",
    skip: "Skip Step",
    confirm: "Confirm",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    yes: "Yes",
    no: "No",
    iAgree: "I Agree & Begin",
    iNeedHelp: "I Need Staff Assistance",
    termsTitle: "Before we begin",
    termsDesc: "We will ask a few simple questions about your health and help digitize your previous medical papers to prepare for your doctor visit.",
    privacyProtected: "Privacy Protected under ABDM",
    secureRecord: "100% Secure Digital Health Record",
    identifyTitle: "How would you like to check in?",
    scanAbha: "Scan ABHA Card / QR",
    enterAbha: "Enter ABHA Number / Mobile",
    newPatient: "New Hospital Registration",
    continueGuest: "Quick Guest Intake",
    profileTitle: "Basic Patient Profile",
    fullName: "Full Name",
    age: "Age (Years)",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    mobileNumber: "Mobile Number",
    preferredLanguage: "Preferred Language",
    mainComplaintTitle: "What brings you to the hospital today?",
    mainComplaintSubtitle: "Choose the picture that best describes your main problem.",
    tellInOwnWords: "Tell in your own words (Voice)",
    speakNaturally: "Speak naturally in your language...",
    stopVoice: "Stop Speaking",
    repeatVoice: "Speak Again",
    whereItHurts: "Where does it hurt or feel uncomfortable?",
    whenStarted: "When did this issue start?",
    painType: "How does the pain feel?",
    painRadiation: "Does the pain spread anywhere else?",
    associatedSymptomsTitle: "Are you having any of these associated symptoms?",
    painSeverityTitle: "How severe is the pain or discomfort?",
    severityLow: "Mild (0-3)",
    severityModerate: "Moderate (4-6)",
    severitySevere: "Severe (7-10)",
    aiAssistantHeader: "MediKiosk Assistant",
    aiAssistantSubheader: "Clinical Guidance",
    aiStatusListening: "Listening carefully...",
    aiDoctorDisclaimer: "Pre-consultation draft — your doctor will verify all details during examination.",
    redFlagTitle: "Priority Triage Alert",
    redFlagSubtitle: "Some of your symptoms require prompt medical attention.",
    redFlagNotice: "Please remain seated here. The nursing staff and doctor have been notified.",
    callStaff: "Call Staff / Nurse",
    continueIfAllowed: "Proceed if feeling okay",
    docUploadTitle: "Scan or Upload Medical Documents",
    docUploadSubtitle: "Scan prescriptions, lab test reports, or discharge summaries.",
    takePhoto: "Take Document Photo",
    uploadFile: "Upload Document File",
    cameraGuide: "Align paper inside frame",
    scanningDoc: "Extracting handwritten & printed medical text...",
    docAiResultTitle: "Extracted Clinical Information",
    docAiResultSubtitle: "Check the extracted details from your document.",
    looksCorrect: "Looks Correct",
    timelineTitle: "Longitudinal Health History",
    reviewTitle: "Review Intake Summary",
    reviewSubtitle: "Verify your information before sending to doctor queue.",
    doctorReviewDisclaimer: "Your doctor will review and verify this information during examination.",
    submitToDoctor: "Send to Doctor Queue",
    patientEmrTitle: "My Electronic Medical Record",
    nextAppointment: "Today's OPD Token",
    myPrescriptions: "My Past Prescriptions",
    myReports: "My Lab Reports",
    consultationHistory: "Past Hospital Visits",
    profilePrivacy: "Profile & ABHA Privacy",
    printSummary: "Print Token Pass",
  },
  hi: {
    appName: "मेडीकियोस्क",
    tagline: "आपकी स्वास्थ्य जानकारी, डॉक्टर से परामर्श से पहले तैयार।",
    subTagline: "अपनी समस्या के बारे में बताएं। आप बोल या टच कर सकते हैं।",
    start: "शुरू करें",
    help: "सहायता चाहिए?",
    listen: "निर्देश सुनें",
    back: "पीछे जाएं",
    continue: "आगे बढ़ें",
    skip: "छोड़ें",
    confirm: "पुष्टि करें",
    edit: "बदलें",
    save: "सुरक्षित करें",
    cancel: "रद्द करें",
    yes: "हाँ",
    no: "नहीं",
    iAgree: "मैं सहमत हूँ और शुरू करें",
    iNeedHelp: "सहायक कर्मचारी की आवश्यकता है",
    termsTitle: "शुरू करने से पहले",
    termsDesc: "हम आपकी स्वास्थ्य स्थिति के बारे में कुछ सरल प्रश्न पूछेंगे और आपकी पुरानी पर्चियां डिजिटल करने में मदद करेंगे।",
    privacyProtected: "आभा डिजिटल हेल्थ सुरक्षा अंतर्गत सुरक्षित",
    secureRecord: "100% सुरक्षित डिजिटल स्वास्थ्य रिकॉर्ड",
    identifyTitle: "आप पहचान की पुष्टि कैसे करना चाहते हैं?",
    scanAbha: "आभा कार्ड / क्यूआर स्कैन करें",
    enterAbha: "आभा नंबर / मोबाइल नंबर दर्ज करें",
    newPatient: "नया अस्पताल पंजीकरण",
    continueGuest: "त्वरित अतिथि प्रविष्टि",
    profileTitle: "मरीज़ की बुनियादी जानकारी",
    fullName: "पूरा नाम",
    age: "उम्र (वर्ष)",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    mobileNumber: "मोबाइल नंबर",
    preferredLanguage: "पसंदीदा भाषा",
    mainComplaintTitle: "आज आप किस मुख्य समस्या के लिए आए हैं?",
    mainComplaintSubtitle: "अपनी मुख्य समस्या से मिलता-जुलता विकल्प चुनें।",
    tellInOwnWords: "अपनी आवाज़ में बताएं (माइक)",
    speakNaturally: "अपनी भाषा में सामान्य रूप से बोलें...",
    stopVoice: "बोलना समाप्त करें",
    repeatVoice: "फिर से बोलें",
    whereItHurts: "दर्द या तकलीफ कहाँ पर है?",
    whenStarted: "यह समस्या कब शुरू हुई?",
    painType: "दर्द किस प्रकार का महसूस होता है?",
    painRadiation: "क्या यह दर्द शरीर के किसी अन्य हिस्से में फैलता है?",
    associatedSymptomsTitle: "क्या आपको इनमें से भी कोई लक्षण हैं?",
    painSeverityTitle: "तकलीफ या दर्द कितना तेज है?",
    severityLow: "हल्का (0-3)",
    severityModerate: "मध्यम (4-6)",
    severitySevere: "बहुत तेज (7-10)",
    aiAssistantHeader: "मेडीकियोस्क सहायक",
    aiAssistantSubheader: "स्वास्थ्य विवरण मार्गदर्शक",
    aiStatusListening: "ध्यानपूर्वक सुन रहा है...",
    aiDoctorDisclaimer: "चिकित्सकीय विवरण — डॉक्टर साहब जांच के दौरान इसकी पुष्टि करेंगे।",
    redFlagTitle: "प्राथमिकता सूचना (Priority Alert)",
    redFlagSubtitle: "आपके कुछ लक्षणों को तत्काल चिकित्सकीय देखरेख की आवश्यकता हो सकती है।",
    redFlagNotice: "कृपया यहीं बैठें। अस्पताल के नर्सिंग स्टाफ और डॉक्टर को सूचित कर दिया गया है।",
    callStaff: "कर्मचारी / नर्स को बुलाएं",
    continueIfAllowed: "यदि आप ठीक महसूस कर रहे हैं तो आगे बढ़ें",
    docUploadTitle: "पुराने पर्चे या रिपोर्ट स्कैन करें",
    docUploadSubtitle: "पुरानी पर्चियां, खून की जांच रिपोर्ट या डिस्चार्ज समरी जोड़ें।",
    takePhoto: "कागज की फोटो लें",
    uploadFile: "फाइल अपलोड करें",
    cameraGuide: "कागज को फ्रेम के भीतर सीधा रखें",
    scanningDoc: "कागज़ को पढ़कर दवाइयाँ और जांच जांची जा रही हैं...",
    docAiResultTitle: "दस्तावेज़ से निकाली गई जानकारी",
    docAiResultSubtitle: "कृपया दवाइयाँ और जांच परिणामों की जांच करें।",
    looksCorrect: "सब सही है",
    timelineTitle: "आपकी चिकित्सा समयरेखा (Timeline)",
    reviewTitle: "आपके दौरे का सारांश",
    reviewSubtitle: "डॉक्टर के पास भेजने से पहले अपनी सभी जानकारी देख लें।",
    doctorReviewDisclaimer: "आपके डॉक्टर परामर्श के दौरान इस जानकारी की समीक्षा और सत्यापन करेंगे।",
    submitToDoctor: "डॉक्टर की कतार में भेजें",
    patientEmrTitle: "मेरा इलेक्ट्रॉनिक मेडिकल रिकॉर्ड",
    nextAppointment: "आज का ओपीडी टोकन",
    myPrescriptions: "मेरे पुराने पर्चे",
    myReports: "मेरी लैब रिपोर्ट",
    consultationHistory: "अस्पताल के पुराने दौरे",
    profilePrivacy: "प्रोफ़ाइल और आभा गोपनीयता",
    printSummary: "टोकन पास प्रिंट करें",
  },
  mr: {
    appName: "मेडीकिऑस्क (MediKiosk)",
    tagline: "डॉक्टरांच्या तपासणीपूर्वी, तुमची आरोग्य माहिती तयार.",
    subTagline: "तुमच्या त्रासाबद्दल सांगा. तुम्ही बोलू शकता किंवा स्क्रीनवर स्पर्श करू शकता.",
    start: "सुरुवात करा",
    help: "मदत हवी आहे?",
    listen: "सूचना ऐका",
    back: "मागे जा",
    continue: "पुढे जा",
    skip: "सोडून द्या",
    confirm: "पुष्टी करा",
    edit: "बदला",
    save: "जतन करा",
    cancel: "रद्द करा",
    yes: "होय",
    no: "नाही",
    iAgree: "मला मान्य आहे आणि सुरू करा",
    iNeedHelp: "मला कर्मचाऱ्यांची मदत हवी आहे",
    termsTitle: "सुरू करण्यापूर्वी",
    termsDesc: "आम्ही तुमच्या आरोग्याबद्दल काही सोपे प्रश्न विचारू आणि डॉक्टरांच्या भेटीची तयारी करण्यासाठी तुमची जुनी वैद्यकीय कागदपत्रे स्कॅन करू.",
    privacyProtected: "आयुष्मान भारत डिजिटल मिशन (ABDM) अंतर्गत सुरक्षित",
    secureRecord: "१००% सुरक्षित डिजिटल आरोग्य नोंद",
    identifyTitle: "तुम्ही नोंदणी कशी करू इच्छिता?",
    scanAbha: "आभा (ABHA) कार्ड / QR स्कॅन करा",
    enterAbha: "आभा क्रमांक किंवा मोबाइल नंबर टाका",
    newPatient: "रुग्णालयात नवीन नोंदणी",
    continueGuest: "थेट पाहुणे म्हणून पुढे जा",
    profileTitle: "रुग्णाची प्राथमिक माहिती",
    fullName: "पूर्ण नाव",
    age: "वय (वर्षे)",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "इतर",
    mobileNumber: "मोबाइल नंबर",
    preferredLanguage: "पसंतीची भाषा",
    mainComplaintTitle: "आज तुम्हाला काय त्रास होत आहे?",
    mainComplaintSubtitle: "खाली दिलेल्या लक्षणांवर स्पर्श करा किंवा तुमच्या स्वतःच्या आवाजात सांगा.",
    tellInOwnWords: "तुमच्या शब्दांत सांगा (माईक)",
    speakNaturally: "तुमच्या भाषेत सहजतेने बोला...",
    stopVoice: "बोलणे थांबवा",
    repeatVoice: "पुन्हा बोला",
    whereItHurts: "वेदना किंवा त्रास नेमका कुठे होत आहे?",
    whenStarted: "हा त्रास कधी सुरू झाला?",
    painType: "वेदना कशा प्रकारची जाणवते?",
    painRadiation: "ही वेदना शरीराच्या इतर भागात पसरते का?",
    associatedSymptomsTitle: "तुम्हाला खालीलपैकी काही त्रास जाणवतो का?",
    painSeverityTitle: "त्रास किंवा वेदना किती तीव्र आहे?",
    severityLow: "कमी (0-3)",
    severityModerate: "मध्यम (4-6)",
    severitySevere: "अतिशय तीव्र (7-10)",
    aiAssistantHeader: "मेडीकिऑस्क सहाय्यक",
    aiAssistantSubheader: "आरोग्य इतिहास मार्गदर्शक",
    aiStatusListening: "काळजीपूर्वक ऐकत आहे...",
    aiDoctorDisclaimer: "वैद्यकीय माहिती — तपासणीदरम्यान डॉक्टर या माहितीची पडताळणी करतील.",
    redFlagTitle: "तातडीची सूचना (Priority Alert)",
    redFlagSubtitle: "तुमच्या काही लक्षणांकडे तातडीने वैद्यकीय लक्ष देणे गरजेचे असू शकते.",
    redFlagNotice: "कृपया जागेवरच थांबा. रुग्णालयातील नर्सिंग स्टाफ आणि ओपीडी डॉक्टरांना सूचित करण्यात आले आहे.",
    callStaff: "कर्मचारी / नर्सला बोलवा",
    continueIfAllowed: "कर्मचाऱ्यांच्या उपस्थितीत पुढे जा",
    docUploadTitle: "तुमच्याकडे जुनी वैद्यकीय कागदपत्रे किंवा रिपोर्ट आहेत का?",
    docUploadSubtitle: "जुने प्रिस्क्रिप्शन किंवा रक्ताचे रिपोर्ट स्कॅन करा जेणेकरून डॉक्टर ते लगेच पाहू शकतील.",
    takePhoto: "कॅमेऱ्याने फोटो घ्या",
    uploadFile: "कागदपत्र / फोटो अपलोड करा",
    cameraGuide: "कागद सरळ आणि चौकटीच्या आत ठेवा.",
    scanningDoc: "कागदपत्र वाचून औषधे आणि चाचण्यांची नोंद घेतली जात आहे...",
    docAiResultTitle: "कागदपत्रातून काढलेली माहिती",
    docAiResultSubtitle: "कृपया चाचण्यांचे निकाल आणि औषधांची खात्री करा.",
    looksCorrect: "सर्व योग्य आहे",
    timelineTitle: "तुमची वैद्यकीय कालरेषा (Timeline)",
    reviewTitle: "तुमच्या भेटीचा गोषवारा",
    reviewSubtitle: "डॉक्टरांकडे पाठवण्यापूर्वी सर्व माहिती एकदा तपासून घ्या.",
    doctorReviewDisclaimer: "तुमचे डॉक्टर तपासणीदरम्यान या सर्व माहितीची खातरजमा करतील.",
    submitToDoctor: "डॉक्टरांच्या रांगेत पाठवा",
    patientEmrTitle: "माझे इलेक्ट्रॉनिक मेडिकल रेकॉर्ड",
    nextAppointment: "आजचा ओपीडी टोकन",
    myPrescriptions: "माझे जुने प्रिस्क्रिप्शन",
    myReports: "माझे लॅब रिपोर्ट्स",
    consultationHistory: "मागील रुग्णालय भेटी",
    profilePrivacy: "प्रोफाइल आणि आभा गोपनीयता",
    printSummary: "टोकन पास प्रिंट करा",
  },
};

export const symptomOptions: Record<Language, Array<{ id: string; iconKey: string; label: string; redFlag?: boolean }>> = {
  en: [
    { id: 'chest_pain', iconKey: 'HeartPulse', label: 'Chest Pain / Pressure', redFlag: true },
    { id: 'fever', iconKey: 'Thermometer', label: 'Fever / Chills' },
    { id: 'breathing', iconKey: 'Wind', label: 'Breathing Problem', redFlag: true },
    { id: 'stomach', iconKey: 'Activity', label: 'Stomach / Acidity' },
    { id: 'cough_cold', iconKey: 'ShieldAlert', label: 'Cold / Cough' },
    { id: 'headache_dizzy', iconKey: 'Brain', label: 'Headache / Dizziness' },
    { id: 'bleeding', iconKey: 'AlertTriangle', label: 'Bleeding / Injury', redFlag: true },
    { id: 'joint_pain', iconKey: 'Bone', label: 'Joint / Body Pain' },
    { id: 'medication_issue', iconKey: 'Pill', label: 'Medicine Refill / Issue' },
    { id: 'other', iconKey: 'Plus', label: 'Other Symptoms' },
  ],
  hi: [
    { id: 'chest_pain', iconKey: 'HeartPulse', label: 'छाती में दर्द या भारीपन', redFlag: true },
    { id: 'fever', iconKey: 'Thermometer', label: 'बुखार / कंपकपी' },
    { id: 'breathing', iconKey: 'Wind', label: 'सांस लेने में तकलीफ', redFlag: true },
    { id: 'stomach', iconKey: 'Activity', label: 'पेट दर्द / गैस / उल्टी' },
    { id: 'cough_cold', iconKey: 'ShieldAlert', label: 'सर्दी / खांसी' },
    { id: 'headache_dizzy', iconKey: 'Brain', label: 'सिरदर्द / चक्कर आना' },
    { id: 'bleeding', iconKey: 'AlertTriangle', label: 'खून बहना / चोट', redFlag: true },
    { id: 'joint_pain', iconKey: 'Bone', label: 'जोड़ों / बदन का दर्द' },
    { id: 'medication_issue', iconKey: 'Pill', label: 'दवाई संबंधी समस्या' },
    { id: 'other', iconKey: 'Plus', label: 'कोई अन्य समस्या' },
  ],
  mr: [
    { id: 'chest_pain', iconKey: 'HeartPulse', label: 'छातीत दुखणे / जड वाटणे', redFlag: true },
    { id: 'fever', iconKey: 'Thermometer', label: 'ताप / थंडी वाजणे' },
    { id: 'breathing', iconKey: 'Wind', label: 'श्वास घेण्यास त्रास', redFlag: true },
    { id: 'stomach', iconKey: 'Activity', label: 'पोटदुखी / पित्त / उलट्या' },
    { id: 'cough_cold', iconKey: 'ShieldAlert', label: 'सर्दी / खोकला' },
    { id: 'headache_dizzy', iconKey: 'Brain', label: 'डोकेदुखी / चक्कर येणे' },
    { id: 'bleeding', iconKey: 'AlertTriangle', label: 'रक्तस्राव / दुखापत', redFlag: true },
    { id: 'joint_pain', iconKey: 'Bone', label: 'सांधेदुखी / अंगदुखी' },
    { id: 'medication_issue', iconKey: 'Pill', label: 'औषधांबाबत अडचण' },
    { id: 'other', iconKey: 'Plus', label: 'इतर काही त्रास' },
  ],
};
