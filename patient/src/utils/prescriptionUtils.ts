import { Language, PrescriptionItem, PatientRecord, PrescriptionRecord } from '../types';

export const timingTranslations: Record<string, Record<Language, string>> = {
  'After meals': {
    en: 'After meals (Post-meal)',
    hi: 'भोजन के बाद (खाने के बाद)',
    mr: 'जेवणानंतर (जेवण झाल्यावर)',
  },
  'Before meals': {
    en: 'Before meals (Pre-meal)',
    hi: 'भोजन से पहले (30 मिनट पूर्व)',
    mr: 'जेवणापूर्वी (३० मिनिटे आधी)',
  },
  'Empty stomach (Morning)': {
    en: 'Empty stomach (Early Morning)',
    hi: 'सुबह खाली पेट (चाय/नाश्ते से पहले)',
    mr: 'सकाळी उपाशीपोटी (चहा/न्याहारीपूर्वी)',
  },
  'Under tongue during acute chest pain': {
    en: 'Under tongue during chest pain (Sublingual SOS)',
    hi: 'छाती में दर्द होने पर जीभ के नीचे रखें (आपातकालीन)',
    mr: 'छातीत तीव्र वेदना झाल्यास जिभेखाली ठेवा (आपत्कालीन)',
  },
  'At bedtime': {
    en: 'At bedtime (Night)',
    hi: 'रात को सोने से पहले',
    mr: 'रात्री झोपताना',
  },
  'With warm water after food': {
    en: 'With warm water after food',
    hi: 'गुनगुने पानी के साथ भोजन के बाद',
    mr: 'कोमट पाण्यासोबत जेवणानंतर',
  },
  'After lunch': {
    en: 'After lunch (Afternoon)',
    hi: 'दोपहर के भोजन के बाद',
    mr: 'दुपारच्या जेवणानंतर',
  },
  'After dinner (Night)': {
    en: 'After dinner (Night)',
    hi: 'रात के भोजन के बाद',
    mr: 'रात्रीच्या जेवणानंतर',
  },
  'After breakfast & dinner': {
    en: 'After breakfast & dinner',
    hi: 'सुबह के नाश्ते और रात के खाने के बाद',
    mr: 'सकाळच्या नाश्त्यानंतर आणि रात्रीच्या जेवणानंतर',
  }
};

export const dosageTranslations: Record<string, Record<Language, string>> = {
  '1-0-1': {
    en: '1-0-1 (Morning 1 - Night 1 | Twice daily)',
    hi: '1-0-1 (सुबह 1 - रात 1 | दिन में 2 बार)',
    mr: '1-0-1 (सकाळी 1 - रात्री 1 | दिवसातून २ वेळा)',
  },
  '1-0-0': {
    en: '1-0-0 (Morning 1 | Once daily)',
    hi: '1-0-0 (सुबह 1 | दिन में एक बार)',
    mr: '1-0-0 (सकाळी 1 | दिवसातून एकदा)',
  },
  '0-0-1': {
    en: '0-0-1 (Night 1 | Once daily)',
    hi: '0-0-1 (रात 1 | रात को एक बार)',
    mr: '0-0-1 (रात्री 1 | रात्री एकदा)',
  },
  '0-1-0': {
    en: '0-1-0 (Afternoon 1 | Once daily)',
    hi: '0-1-0 (दोपहर 1 | दोपहर में एक बार)',
    mr: '0-1-0 (दुपारी 1 | दुपारी एकदा)',
  },
  '1-1-1': {
    en: '1-1-1 (Morning 1 - Afternoon 1 - Night 1 | Thrice daily)',
    hi: '1-1-1 (सुबह 1 - दोपहर 1 - रात 1 | दिन में 3 बार)',
    mr: '1-1-1 (सकाळी 1 - दुपारी 1 - रात्री 1 | दिवसातून ३ वेळा)',
  },
  'SOS': {
    en: 'SOS (As needed in acute chest pain / distress)',
    hi: 'SOS (दर्द या आपात स्थिति में आवश्यकता पड़ने पर)',
    mr: 'SOS (छातीत दुखल्यास किंवा गरजेनुसार)',
  },
};

export const adviceTranslations: Record<string, Record<Language, string>> = {
  cardiac_default: {
    en: '1. Strict low sodium & low fat diabetic diet\n2. Avoid heavy exertion; regular 30 mins gentle walk\n3. Emergency hospital review if chest pain lasts > 10 mins despite sublingual sorbitrate',
    hi: '1. भोजन में नमक और वसा (तेल/घी) की मात्रा बहुत कम रखें\n2. भारी वजन न उठाएं, प्रतिदिन 30 मिनट हल्का टहलें\n3. यदि सोर्बिट्रेट लेने के 10 मिनट बाद भी छाती का दर्द बना रहे तो तुरंत आपातकालीन कक्ष में आएं',
    mr: '1. आहारातील मीठ आणि तेल-तुपाचे प्रमाण कमी ठेवा\n2. जास्त श्रमाची कामे टाळा, दररोज ३० मिनिटे हलके चाला\n3. सोर्बिट्रेट गोळी घेतल्यानंतर १० मिनिटांत छातीतील वेदना न थांबल्यास तातडीने रुग्णालयात यावे',
  },
  hypertension_default: {
    en: '1. Strict sodium restriction (< 2g per day)\n2. Daily morning BP monitoring log\n3. Continue medications without missed doses',
    hi: '1. नमक का सेवन कड़ाई से सीमित करें (< 2 ग्राम प्रतिदिन)\n2. प्रतिदिन सुबह बीपी नोट करें\n3. दवा का कोई भी डोज़ न छोड़ें',
    mr: '1. आहारातील मिठाचे प्रमाण अत्यंत कमी ठेवा (< २ ग्रॅम/दिवस)\n2. दररोज सकाळी रक्तदाब (BP) मोजून नोंद ठेवा\n3. औषधांचा एकही डोस चुकू देऊ नका',
  },
  anemia_default: {
    en: '1. Iron-rich diet (spinach, beetroot, pomegranate, lentils, jaggery)\n2. Avoid tea/coffee within 1 hour of taking iron tablet\n3. Repeat CBC test after 30 days',
    hi: '1. आयरन युक्त पौष्टिक आहार लें (पालक, चुकंदर, अनार, दालें, गुड़)\n2. आयरन की गोली लेने के 1 घंटे तक चाय या कॉफी न पिएं\n3. 30 दिनों के बाद दोबारा हीमोग्लोबिन/सीबीसी जांच कराएं',
    mr: '1. लोहयुक्त पौष्टिक आहार घ्या (पालक, बीट, डाळिंब, डाळी, गूळ)\n2. लोहाची गोळी घेतल्यानंतर १ तास चहा किंवा कॉफी पिऊ नका\n3. ३० दिवसांनी पुन्हा हिमोग्लोबिन/सीबीसी तपासणी करा',
  }
};

export function getLocalizedTiming(timing: string, lang: Language): string {
  if (timingTranslations[timing] && timingTranslations[timing][lang]) {
    return timingTranslations[timing][lang];
  }
  return timing;
}

export function getLocalizedDosage(dosage: string, lang: Language): string {
  if (dosageTranslations[dosage] && dosageTranslations[dosage][lang]) {
    return dosageTranslations[dosage][lang];
  }
  return dosage;
}

export function formatWhatsAppPrescriptionMessage({
  patient,
  doctorName,
  doctorSpecialty,
  doctorRegNo,
  facility,
  diagnosis,
  medicines,
  generalAdvice,
  language = 'en',
  date,
  includeAyush = false,
}: {
  patient: PatientRecord;
  doctorName: string;
  doctorSpecialty: string;
  doctorRegNo: string;
  facility: string;
  diagnosis: string;
  medicines: PrescriptionItem[];
  generalAdvice: string;
  language: Language;
  date: string;
  includeAyush?: boolean;
}): string {
  const isHi = language === 'hi';
  const isMr = language === 'mr';

  const hospitalHeader = isHi
    ? `🏥 *एपेक्स मल्टीस्पेशलिटी हॉस्पिटल - डिजिटल प्रिस्क्रिप्शन (Rx)*`
    : isMr
    ? `🏥 *अपेक्स मल्टीस्पेशालिटी हॉस्पिटल - डिजिटल प्रिस्क्रिप्शन (Rx)*`
    : `🏥 *APEX MULTISPECIALTY HOSPITAL - DIGITAL PRESCRIPTION (Rx)*`;

  const patientLine = isHi
    ? `👤 *रोगी का नाम:* ${patient.name} (${patient.age} वर्ष / ${patient.gender === 'male' ? 'पुरुष' : 'महिला'})\n🆔 *ABHA ID:* ${patient.abhaId}\n📅 *तारीख:* ${date} | *टोकन:* #${patient.tokenNumber}`
    : isMr
    ? `👤 *रुग्णाचे नाव:* ${patient.name} (${patient.age} वर्षे / ${patient.gender === 'male' ? 'पुरुष' : 'स्त्री'})\n🆔 *ABHA ID:* ${patient.abhaId}\n📅 *दिनांक:* ${date} | *टोकन:* #${patient.tokenNumber}`
    : `👤 *Patient:* ${patient.name} (${patient.age}y / ${patient.gender})\n🆔 *ABHA ID:* ${patient.abhaId}\n📅 *Date:* ${date} | *Token:* #${patient.tokenNumber}`;

  const doctorLine = isHi
    ? `👨‍⚕️ *चिकित्सक:* ${doctorName}\n📋 *विशेषज्ञता:* ${doctorSpecialty} (पंजीकरण: ${doctorRegNo})\n📍 *सुविधा:* ${facility}`
    : isMr
    ? `👨‍⚕️ *डॉक्टर:* ${doctorName}\n📋 *तज्ज्ञ:* ${doctorSpecialty} (नोंदणी: ${doctorRegNo})\n📍 *विभाग:* ${facility}`
    : `👨‍⚕️ *Doctor:* ${doctorName}\n📋 *Specialty:* ${doctorSpecialty} (Reg: ${doctorRegNo})\n📍 *Facility:* ${facility}`;

  const diagLine = isHi
    ? `🩺 *निदान (Diagnosis):*\n${diagnosis}`
    : isMr
    ? `🩺 *निदान (Diagnosis):*\n${diagnosis}`
    : `🩺 *Diagnosis:*\n${diagnosis}`;

  const medHeader = isHi
    ? `💊 *निर्धारित औषधियां (Prescribed Medications):*`
    : isMr
    ? `💊 *औषधांचे वेळापत्रक (Prescribed Medicines):*`
    : `💊 *Prescribed Medications (Rx):*`;

  const medList = medicines.map((med, idx) => {
    const locDosage = getLocalizedDosage(med.dosage, language);
    const locTiming = getLocalizedTiming(med.timing, language);
    return `${idx + 1}. *${med.name}* (${med.strength || ''})\n   • ${locDosage}\n   • ⏰ ${locTiming} | ⏱️ ${med.duration}${med.instructions ? `\n   • ℹ️ ${med.instructions}` : ''}`;
  }).join('\n\n');

  let ayushText = '';
  if (includeAyush) {
    const ayushIdx = medicines.length + 1;
    ayushText = isHi
      ? `\n\n${ayushIdx}. *आयुष अर्जुन क्वाथ (15ml)*\n   • 1-0-1 (सुबह 1 - रात 1)\n   • ⏰ भोजन के बाद गुनगुने पानी के साथ | ⏱️ 30 दिन\n   • ℹ️ हृदय टॉनिक व रक्तसंचार सुधार`
      : isMr
      ? `\n\n${ayushIdx}. *आयुष अर्जुन काढा (15ml)*\n   • 1-0-1 (सकाळी 1 - रात्री 1)\n   • ⏰ जेवणानंतर कोमट पाण्यासोबत | ⏱️ ३० दिवस\n   • ℹ️ हृदय व रक्तवाहिन्यांचे आरोग्य`
      : `\n\n${ayushIdx}. *Ayush Arjuna Kwatha (15ml)*\n   • 1-0-1 (Twice daily)\n   • ⏰ With warm water after food | ⏱️ 30 days\n   • ℹ️ Cardiotonic adjuvant`;
  }

  const adviceHeader = isHi
    ? `📋 *डॉक्टर की सलाह एवं सावधानियां:*`
    : isMr
    ? `📋 *डॉक्टरांचा सल्ला व सूचना:*`
    : `📋 *Doctor's Lifestyle & Dietary Advice:*`;

  const footerText = isHi
    ? `🔗 *ABDM डिजिटल रिकॉर्ड व PDF डाउनलोड:* https://abha.abdm.gov.in/records/${patient.tokenNumber}\n\n🚨 *आपातकालीन सहायता:* 011-2659-4000 (24x7 हेल्पलाइन)\n_यह प्रिस्क्रिप्शन राष्ट्रीय डिजिटल स्वास्थ्य मिशन (ABDM) द्वारा प्रमाणित है।_`
    : isMr
    ? `🔗 *ABDM डिजिटल रेकॉर्ड व PDF डाउनलोड:* https://abha.abdm.gov.in/records/${patient.tokenNumber}\n\n🚨 *आपत्कालीन संपर्क:* 011-2659-4000 (२४x७)\n_हे प्रिस्क्रिप्शन आयुष्मान भारत डिजिटल मिशन (ABDM) प्रमाणित आहे._`
    : `🔗 *View ABDM Digital Record & PDF:* https://abha.abdm.gov.in/records/${patient.tokenNumber}\n\n🚨 *Emergency Helpline:* 011-2659-4000 (24x7)\n_Government of India ABDM Compliant E-Prescription._`;

  return `${hospitalHeader}

${patientLine}

${doctorLine}

${diagLine}

${medHeader}
${medList}${ayushText}

${adviceHeader}
${generalAdvice}

${footerText}`;
}

export function generateWhatsAppUrl(phone: string, text: string): string {
  // Sanitize phone number to standard digits
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(text);
  
  if (cleanPhone) {
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
  }
  return `https://api.whatsapp.com/send?text=${encodedText}`;
}
