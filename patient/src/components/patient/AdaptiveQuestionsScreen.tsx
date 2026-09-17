'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, ArrowLeft, ArrowRight, Check, AlertTriangle, Sparkles, HelpCircle, Activity } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';
import { speakText } from '../../utils/speech';
import { PreciseBodyDiagram } from '../common/PreciseBodyDiagram';
import { PainScale } from '../common/PainScale';

interface AdaptiveQuestionsScreenProps {
  language: Language;
  primaryComplaint: string;
  onComplete: (data: {
    bodyLocation: string;
    onset: string;
    painCharacter: string;
    painRadiation: string[];
    painSeverity: number;
    associatedSymptoms: string[];
    redFlagDetected: boolean;
  }) => void;
  onBack: () => void;
}

export const AdaptiveQuestionsScreen: React.FC<AdaptiveQuestionsScreenProps> = ({
  language,
  primaryComplaint,
  onComplete,
  onBack,
}) => {
  const t = translations[language];

  // Sub-step inside the questionnaire (1 to 6)
  const [subStep, setSubStep] = useState(1);
  const [bodyLocation, setBodyLocation] = useState('chest_heart');
  const [onset, setOnset] = useState('Today');
  const [painCharacter, setPainCharacter] = useState('Heavy / Pressure');
  const [painRadiation, setPainRadiation] = useState<string[]>([]);
  const [painSeverity, setPainSeverity] = useState(7);
  const [associatedSymptoms, setAssociatedSymptoms] = useState<string[]>([]);

  const totalSubSteps = 6;

  // Disease Category Classification
  const compLower = primaryComplaint.toLowerCase();
  const isChest = compLower.includes('chest') || compLower.includes('heart') || compLower.includes('छाती') || compLower.includes('सीना');
  const isFever = compLower.includes('fever') || compLower.includes('ताप') || compLower.includes('बुखार') || compLower.includes('cough') || compLower.includes('infection');
  const isStomach = compLower.includes('stomach') || compLower.includes('abdomen') || compLower.includes('belly') || compLower.includes('पेट') || compLower.includes('गैस');
  const isHeadache = compLower.includes('headache') || compLower.includes('head') || compLower.includes('migraine') || compLower.includes('सिर') || compLower.includes('डोके');
  const isBreathing = compLower.includes('breath') || compLower.includes('asthma') || compLower.includes('सांस') || compLower.includes('श्वास');
  const isJoint = compLower.includes('joint') || compLower.includes('knee') || compLower.includes('back') || compLower.includes('कमर') || compLower.includes('घुटना') || compLower.includes('injury');

  // Disease Title Badge
  const getDiseaseTitle = () => {
    if (isChest) return { en: 'Cardiopulmonary Intake (Chest)', hi: 'हृदय व सीना रोग प्रश्नावली', mr: 'हृदय व छाती तपासणी प्रश्न' };
    if (isFever) return { en: 'Infectious & Fever Intake', hi: 'बुखार एवं संक्रमण प्रश्नावली', mr: 'ताप व संसर्ग तपासणी प्रश्न' };
    if (isStomach) return { en: 'Gastrointestinal & Abdomen Intake', hi: 'उदर एवं पेट रोग प्रश्नावली', mr: 'पोट विकार तपासणी प्रश्न' };
    if (isHeadache) return { en: 'Neurological & Headache Intake', hi: 'सिरदर्द व न्यूरो प्रश्नावली', mr: 'डोकेदुखी तपासणी प्रश्न' };
    if (isBreathing) return { en: 'Respiratory & Lung Intake', hi: 'श्वसन व फेफड़े प्रश्नावली', mr: 'श्वसन विकार तपासणी प्रश्न' };
    if (isJoint) return { en: 'Orthopedic & Joint Pain Intake', hi: 'हड्डी व जोड़ दर्द प्रश्नावली', mr: 'हाडे व सांधेदुखी प्रश्न' };
    return { en: 'Clinical Symptom Evaluation', hi: 'स्वास्थ्य लक्षण मूल्यांकन', mr: 'आरोग्य लक्षण मूल्यांकन' };
  };

  const diseaseTitle = getDiseaseTitle()[language];

  // 1. DYNAMIC ONSET OPTIONS
  const onsetOptions = [
    { id: 'Sudden', en: 'Sudden onset (Last 1-2 hours)', hi: 'अचानक शुरू हुआ (१-२ घंटे पहले)', mr: 'अचानक सुरू झाले (१-२ तासांपूर्वी)' },
    { id: 'Today', en: 'Earlier today (Few hours)', hi: 'आज सुबह से', mr: 'आज सकाळपासून' },
    { id: 'Yesterday', en: 'Since yesterday (24 hrs)', hi: 'कल से (२४ घंटे)', mr: 'कालपासून (२४ तास)' },
    { id: '2-3 Days', en: '2 to 3 days ago', hi: '२-३ दिन पहले से', mr: '२-३ दिवसांपूर्वी' },
    { id: 'Over a Week', en: 'More than a week', hi: 'एक सप्ताह से अधिक', mr: 'एका आठवड्यापेक्षा जास्त' },
    { id: 'Chronic', en: 'Months / Chronic issue', hi: 'महीनों से (पुराना दर्द)', mr: 'महिन्यांपासून (जुना त्रास)' },
  ];

  // 2. DYNAMIC PAIN / SYMPTOM CHARACTER
  const characterOptions = isChest ? [
    { id: 'Heavy / Pressure', emoji: '🪨', en: 'Heavy / Crushing Pressure', hi: 'भारीपन / छाती पर दबाव', mr: 'छातीत जड वाटणे / दाब' },
    { id: 'Sharp Stabbing', emoji: '⚡', en: 'Sharp / Pricking Pain', hi: 'तेज चुभने वाला दर्द', mr: 'तीक्ष्ण / टोचल्यासारखे' },
    { id: 'Burning Acidity', emoji: '🔥', en: 'Burning / Heartburn', hi: 'जलन / सीने में जलन', mr: 'छातीत जळजळ' },
    { id: 'Tightness Band', emoji: '🪢', en: 'Constricting Band', hi: 'कसावट / घुटन', mr: 'आवळल्यासारखे' },
    { id: 'Dull Ache', emoji: '🤕', en: 'Dull Continuous Ache', hi: 'हल्का लगातार दर्द', mr: 'मंद दुखणे' },
    { id: 'Uncertain', emoji: '❓', en: 'Not sure / General discomfort', hi: 'स्पष्ट नहीं', mr: 'खात्री नाही' },
  ] : isFever ? [
    { id: 'High Continuous', emoji: '🌡️', en: 'High Continuous Fever', hi: 'तेज लगातार बुखार', mr: 'सतत जास्त ताप' },
    { id: 'With Chills', emoji: '🥶', en: 'Fever with Chills / Shivering', hi: 'ठंड और कंपकंपी के साथ', mr: 'थंडी वाजून ताप' },
    { id: 'Evening Spikes', emoji: '🌅', en: 'Spikes in Evening', hi: 'शाम को तेज बुखार', mr: 'संध्याकाळी ताप वाढणे' },
    { id: 'Body Aches', emoji: '😫', en: 'Severe Muscle / Bone Ache', hi: 'हड्डियों व बदन में दर्द', mr: 'हाडे व अंगदुखी' },
    { id: 'Sweating Spells', emoji: '💦', en: 'Fever with Profuse Sweating', hi: 'पसीने के साथ बुखार उतरना', mr: 'घाम येऊन ताप उतरणे' },
    { id: 'Mild Low Grade', emoji: '🤒', en: 'Mild Low Grade', hi: 'हल्का बुखार', mr: 'मंद ताप' },
  ] : isStomach ? [
    { id: 'Burning Acidic', emoji: '🔥', en: 'Burning / Acidity Reflux', hi: 'जलन / खट्टी डकारें', mr: 'जळजळ / ॲसिडिटी' },
    { id: 'Cramping Colic', emoji: '〰️', en: 'Severe Cramping / Twisting', hi: 'मरोड़ / ऐंठन दर्द', mr: 'पोटात पिळवटून येणे' },
    { id: 'Sharp Constant', emoji: '⚡', en: 'Sharp Stabbing', hi: 'तेज चुभन वाला दर्द', mr: 'तीक्ष्ण दुखणे' },
    { id: 'Bloating Gas', emoji: '🎈', en: 'Heavy Gas & Bloating', hi: 'पेट फूलना / गैस का भारीपन', mr: 'पोट फुगणे / गॅस' },
    { id: 'Dull Soreness', emoji: '🤕', en: 'Dull Soreness', hi: 'हल्का लगातार मीठा दर्द', mr: 'सतत मंद दुखणे' },
    { id: 'Food Triggered', emoji: '🍽️', en: 'Pain after eating', hi: 'खाना खाने के बाद दर्द', mr: 'जेवणानंतर दुखणे' },
  ] : isHeadache ? [
    { id: 'Throbbing Pulsing', emoji: '💓', en: 'Throbbing / Pulsating (Migraine)', hi: 'धड़कता हुआ आधा सीसी दर्द', mr: 'ठोकणारे डोकेदुखी (मायग्रेन)' },
    { id: 'Band Tightness', emoji: '🪢', en: 'Tight Band around Forehead', hi: 'माथे पर कसावट / भारीपन', mr: 'कपाळावर दाब' },
    { id: 'Behind Eye Piercing', emoji: '👁️', en: 'Sharp Behind Eye', hi: 'आँख के पीछे तेज दर्द', mr: 'डोळ्यामागे तीक्ष्ण कळ' },
    { id: 'Back Neck Tension', emoji: '⚡', en: 'Base of Skull / Neck Tension', hi: 'गर्दन से सिर तक खिंचाव', mr: 'मानेतून डोक्यात कळ' },
    { id: 'Dull Heavy', emoji: '🤕', en: 'Dull Heavy Head', hi: 'सिर में भारीपन', mr: 'डोके जड होणे' },
    { id: 'Sudden Explosive', emoji: '💥', en: 'Sudden Explosive ("Worst Ever")', hi: 'अचानक तीव्र असहनीय दर्द', mr: 'अचानक तीव्र डोकेदुखी' },
  ] : isBreathing ? [
    { id: 'Shortness on Rest', emoji: '😮‍💨', en: 'Breathless even at Rest', hi: 'बैठे-बैठे सांस फूलना', mr: 'बसल्या जागी श्वास लागणे' },
    { id: 'Wheezing Whistle', emoji: '🌬️', en: 'Wheezing / Whistling Sound', hi: 'सांस में सीटी जैसी आवाज', mr: 'श्वासात शिट्टीचा आवाज' },
    { id: 'Chest Tightness', emoji: '🪢', en: 'Chest Constriction / Choking', hi: 'गले व सीने में घुटन', mr: 'छातीत आवळणे' },
    { id: 'Exertion Breathless', emoji: '🚶', en: 'Breathless on Walking', hi: 'चलने पर सांस फूलना', mr: 'चालताना दम लागणे' },
    { id: 'Night Awakening', emoji: '🌙', en: 'Wakes up Gasping at Night', hi: 'रात को अचानक सांस रुकना', mr: 'रात्री श्वास कोंडणे' },
    { id: 'Cough with Phlegm', emoji: '🗣️', en: 'Deep Cough with Sputum', hi: 'कफ के साथ खांसी', mr: 'कफासह खोकला' },
  ] : [
    { id: 'Stiffness Morning', emoji: '🦴', en: 'Morning Joint Stiffness', hi: 'सुबह जोड़ों में जकड़न', mr: 'सकाळी सांधे ताठरणे' },
    { id: 'Swelling Heat', emoji: '🔴', en: 'Swelling & Redness', hi: 'जोड़ में सूजन व लाली', mr: 'सांध्याला सूज व लाली' },
    { id: 'Weightbearing Pain', emoji: '🦵', en: 'Pain on Walking / Standing', hi: 'वजन देने पर तेज दर्द', mr: 'उभे राहिल्यावर कळ' },
    { id: 'Shooting Nerve', emoji: '⚡', en: 'Shooting Nerve Pain (Sciatica)', hi: 'करंट जैसा नस का दर्द', mr: 'नसांमध्ये विजेसारखी कळ' },
    { id: 'Dull Continuous', emoji: '🤕', en: 'Dull Continuous Ache', hi: 'लगातार मीठा दर्द', mr: 'सतत मंद दुखणे' },
    { id: 'Clicking Popping', emoji: '🔊', en: 'Clicking / Grinding Sound', hi: 'जोड़ों से आवाज आना', mr: 'सांध्यातून आवाज येणे' },
  ];

  // 3. DYNAMIC SPREAD / RADIATION / TRIGGER
  const radiationOptions = isChest ? [
    { id: 'Left arm', en: 'Left Arm & Shoulder', hi: 'बाईं बांह और कंधा', mr: 'डावा हात आणि खांदा', isRedFlag: true },
    { id: 'Jaw / Neck', en: 'Jaw, Throat & Teeth', hi: 'जबड़ा, गला और दांत', mr: 'जबडा व मान', isRedFlag: true },
    { id: 'Back Blades', en: 'Back between Shoulder Blades', hi: 'पीठ में दोनों कंधों के बीच', mr: 'पाठीच्या मध्यभागी' },
    { id: 'Upper Stomach', en: 'Down to Upper Stomach', hi: 'ऊपरी पेट की ओर', mr: 'पोटाच्या वरच्या भागात' },
    { id: 'Right Arm', en: 'Right Arm', hi: 'दाहिनी बांह', mr: 'उजवा हात' },
    { id: 'No spread', en: 'Stays in center of chest (No spread)', hi: 'कहीं नहीं फैलता (केवल सीने में)', mr: 'कुठेही पसरत नाही' },
  ] : isStomach ? [
    { id: 'Spread to Back', en: 'Spreading straight to Back', hi: 'पीठ के पीछे तक दर्द', mr: 'पाठीत कळ जाणे' },
    { id: 'Right Lower Quadrant', en: 'Shifting to Right Lower Side (Appendix)', hi: 'दाहिनी तरफ नीचे खिसकना (अपेंडिक्स)', mr: 'उजव्या बाजूला खाली कळ', isRedFlag: true },
    { id: 'Up into Chest', en: 'Radiating Up to Throat / Chest', hi: 'ऊपर सीने व गले तक जलन', mr: 'छाती व घशाकडे जळजळ' },
    { id: 'Down into Groin', en: 'Radiating to Groin / Thigh (Kidney Stone)', hi: 'नीचे जांघ/मूत्राशय की ओर (पथरी)', mr: 'मांडीकडे कळ (खडा)', isRedFlag: true },
    { id: 'No spread', en: 'Localized in one spot only', hi: 'एक ही जगह रहता है', mr: 'एकाच जागी राहते' },
  ] : isHeadache ? [
    { id: 'Neck Spine', en: 'Spreading down to Neck / Spine', hi: 'गर्दन और रीढ़ की हड्डी तक', mr: 'मानेपर्यंत व पाठीच्या मणक्यात', isRedFlag: true },
    { id: 'Behind Eyes', en: 'Spreading behind Eyeballs', hi: 'आँखों के पीछे तक', mr: 'डोळ्यांच्या मागे' },
    { id: 'Jaw Face', en: 'Spreading to Teeth & Jaw', hi: 'चेहरे और जबड़े तक', mr: 'चेहऱ्यावर व जबड्यात' },
    { id: 'No spread', en: 'Confined to Head only', hi: 'सिर्फ सिर में सीमित', mr: 'फक्त डोक्यात' },
  ] : isFever ? [
    { id: 'Headache', en: 'Severe Frontal Headache', hi: 'माथे में तेज सिरदर्द', mr: 'कपाळात तीव्र डोकेदुखी' },
    { id: 'Back Calf', en: 'Spreading to Back & Calves (Dengue)', hi: 'पिंडलियों व कमर में दर्द (डेंगू)', mr: 'कमर व पोटऱ्यांमध्ये कळ' },
    { id: 'Joints All', en: 'All major body joints (Chikungunya)', hi: 'शरीर के सभी जोड़ों में जकड़न', mr: 'सर्व सांध्यांमध्ये त्रास' },
    { id: 'No spread', en: 'Generalized weakness only', hi: 'सिर्फ कमजोरी', mr: 'फक्त थकवा' },
  ] : [
    { id: 'Down the Leg', en: 'Shooting down to Ankle (Sciatica)', hi: 'कूल्हे से टखने तक (सायटिका)', mr: 'मांडीतून घोट्यापर्यंत', isRedFlag: true },
    { id: 'Arm Fingers', en: 'Shooting to Fingers / Numbness', hi: 'हाथ व उंगलियों में सुन्नपन', mr: 'हाताच्या बोटांमध्ये बधिरता' },
    { id: 'No spread', en: 'Confined to one joint only', hi: 'केवल एक जोड़ में सीमित', mr: 'एकाच सांध्यात' },
  ];

  // 4. DYNAMIC ASSOCIATED RED-FLAG SYMPTOMS
  const associatedList = isChest ? [
    { id: 'Cold Sweating', emoji: '💦', en: 'Cold Profuse Sweating', hi: 'ठंडा पसीना छूटना', mr: 'गार घाम येणे', redFlag: true },
    { id: 'Shortness of Breath', emoji: '😮‍💨', en: 'Sudden Breathlessness', hi: 'सांस लेने में भारी तकलीफ', mr: 'अचानक धाप लागणे', redFlag: true },
    { id: 'Dizziness Fainting', emoji: '😵', en: 'Dizziness / Near Fainting', hi: 'चक्कर आना / बेहोशी', mr: 'चक्कर / अंधारी येणे', redFlag: true },
    { id: 'Nausea Vomiting', emoji: '🤢', en: 'Nausea / Giddiness', hi: 'जी मिचलाना / उल्टी जैसा लगना', mr: 'मळमळ / उलटी' },
    { id: 'Racing Heartbeat', emoji: '❤️', en: 'Racing / Irregular Pulse', hi: 'दिल की धड़कन तेज व अनियमित', mr: 'हृदयाचे ठोके जलद' },
    { id: 'None', emoji: '🛡️', en: 'None of these warning signs', hi: 'इनमें से कोई नहीं', mr: 'यापैकी काहीही नाही' },
  ] : isFever ? [
    { id: 'Convulsions Fits', emoji: '⚡', en: 'Convulsions / Fits / Shivers', hi: 'दौरे / झटके आना / तेज कंपकंपी', mr: 'झटके येणे / तीव्र थंडी', redFlag: true },
    { id: 'Bleeding Gums Nose', emoji: '🩸', en: 'Bleeding Gums / Red Spots (Dengue)', hi: 'मसूड़ों से खून / त्वचा पर लाल चकत्ते', mr: 'हिरड्यांतून रक्त / लाल चट्टे', redFlag: true },
    { id: 'Inability to Drink', emoji: '🚱', en: 'Cannot Drink / Persistent Vomiting', hi: 'पानी न पच पाना / लगातार उल्टी', mr: 'पाणी न टिकणे / सतत उलट्या', redFlag: true },
    { id: 'Extreme Drowsiness', emoji: '😴', en: 'Severe Drowsiness / Confusion', hi: 'बेहोशी / भ्रमित होना', mr: 'गुंगी / बेशुद्धी', redFlag: true },
    { id: 'Severe Body Rash', emoji: '🔴', en: 'Widespread Skin Rash', hi: 'पूरे शरीर पर दाने व चकत्ते', mr: 'अंगावर लाल पुरळ' },
    { id: 'None', emoji: '🛡️', en: 'None of these warning signs', hi: 'इनमें से कोई नहीं', mr: 'यापैकी काहीही नाही' },
  ] : isStomach ? [
    { id: 'Blood in Vomit', emoji: '🩸', en: 'Blood in Vomit / Black Stool', hi: 'उल्टी में खून / काला मल', mr: 'उलटीत रक्त / काळे शौच', redFlag: true },
    { id: 'Severe Rigidity', emoji: '🪨', en: 'Hard Board-like Stiff Belly', hi: 'पेट पत्थर जैसा कड़ा हो जाना', mr: 'पोट कडक दगड होणे', redFlag: true },
    { id: 'High Fever Vomiting', emoji: '🌡️', en: 'High Fever with Continuous Vomiting', hi: 'तेज बुखार और लगातार उल्टियां', mr: 'जास्त ताप व सतत उलट्या', redFlag: true },
    { id: 'Severe Dehydration', emoji: '🏜️', en: 'Sunken Eyes / Extreme Thirst', hi: 'आँखें धंसना / अत्यधिक निर्जलीकरण', mr: 'डोळे खोल जाणे / अति तहान' },
    { id: 'Yellow Eyes Skin', emoji: '🟡', en: 'Yellow Eyes / Dark Urine (Jaundice)', hi: 'पीलिया / आँखों व पेशाब में पीलापन', mr: 'डोळे पिवळे / कावीळ लक्षणे' },
    { id: 'None', emoji: '🛡️', en: 'None of these warning signs', hi: 'इनमें से कोई नहीं', mr: 'यापैकी काहीही नाही' },
  ] : isHeadache ? [
    { id: 'Stiff Neck Fever', emoji: '🧣', en: 'Stiff Neck with High Fever (Meningitis)', hi: 'गर्दन अकड़ना व तेज बुखार', mr: 'मान ताठरणे व जास्त ताप', redFlag: true },
    { id: 'Vision Loss Double', emoji: '👁️', en: 'Sudden Vision Loss / Double Vision', hi: 'अचानक दिखना बंद / दो-दो दिखना', mr: 'अचानक दृष्टी जाणे / दोन दिसणे', redFlag: true },
    { id: 'Slurred Speech Limb', emoji: '🗣️', en: 'Slurred Speech / Arm Weakness (Stroke)', hi: 'बोली लड़खड़ाना / हाथ में कमजोरी', mr: 'बोबडी वळणे / हात लुळा पडणे', redFlag: true },
    { id: 'Projectile Vomiting', emoji: '🤢', en: 'Sudden Projectile Vomiting', hi: 'अचानक फव्वारे जैसी उल्टी', mr: 'अचानक जोरात उलटी होणे' },
    { id: 'Confusion Memory', emoji: '🧠', en: 'Confusion / Memory Loss', hi: 'याददाश्त खोना / भ्रमित होना', mr: 'स्मरणशक्ती जाणे / गोंधळ' },
    { id: 'None', emoji: '🛡️', en: 'None of these warning signs', hi: 'इनमें से कोई नहीं', mr: 'यापैकी काहीही नाही' },
  ] : [
    { id: 'Blue Lips Nails', emoji: '🫐', en: 'Bluish Lips or Fingernails (Low O2)', hi: 'होंठ या नाखून नीले पड़ना (ऑक्सीजन कमी)', mr: 'ओठ व नखे निळी पडणे', redFlag: true },
    { id: 'Cannot Speak Sentences', emoji: '🗣️', en: 'Cannot speak full sentences', hi: 'एक वाक्य भी पूरा न बोल पाना', mr: 'सलग वाक्य बोलता न येणे', redFlag: true },
    { id: 'Chest Sucking In', emoji: '🫁', en: 'Chest muscles sinking in heavily', hi: 'सांस में पसलियां अंदर धंसना', mr: 'श्वासात बरगड्या आत ओढणे', redFlag: true },
    { id: 'High Pulse Racing', emoji: '❤️', en: 'Extreme Heart Racing', hi: 'बहुत तेज दिल की धड़कन', mr: 'खूप जलद हृदयाचे ठोके' },
    { id: 'Severe Exhaustion', emoji: '🛌', en: 'Too exhausted to stay awake', hi: 'अत्यधिक थकान व सुस्ती', mr: 'अतिशय थकवा' },
    { id: 'None', emoji: '🛡️', en: 'None of these warning signs', hi: 'इनमें से कोई नहीं', mr: 'यापैकी काहीही नाही' },
  ];

  // Read question text aloud whenever substep changes
  useEffect(() => {
    let questionText = '';
    if (subStep === 1) {
      questionText = language === 'hi' 
        ? 'कृपया कंकाल या शरीर के दर्द वाले हिस्से पर उंगली दबाएं।' 
        : language === 'mr' 
        ? 'कृपया कंकाल किंवा शरीराच्या दुखऱ्या भागावर बोट ठेवा.' 
        : 'Please tap the exact location of your pain on the skeleton or body.';
    } else if (subStep === 2) {
      questionText = language === 'hi'
        ? 'यह तकलीफ कब से शुरू हुई है?'
        : language === 'mr'
        ? 'हा त्रास कधीपासून सुरू झाला आहे?'
        : 'When did this problem start?';
    } else if (subStep === 3) {
      questionText = language === 'hi'
        ? 'दर्द या तकलीफ का अहसास कैसा है?'
        : language === 'mr'
        ? 'त्रास किंवा वेदना कशा प्रकारची आहे?'
        : 'What does the pain or sensation feel like?';
    } else if (subStep === 4) {
      questionText = language === 'hi'
        ? 'क्या यह दर्द शरीर के किसी और हिस्से में फैलता है?'
        : language === 'mr'
        ? 'ही कळ शरीराच्या इतर भागात पसरते का?'
        : 'Does the pain radiate or spread anywhere else?';
    } else if (subStep === 5) {
      questionText = language === 'hi'
        ? 'दर्द कितना तेज है? शून्य से दस के पैमाने पर चुनें।'
        : language === 'mr'
        ? 'वेदना किती तीव्र आहेत? शून्यापासून दहापर्यंत निवडा.'
        : 'How severe is the pain on a scale from 0 to 10?';
    } else if (subStep === 6) {
      questionText = language === 'hi'
        ? 'क्या आपको इनमें से कोई चेतावनी लक्षण महसूस हो रहे हैं?'
        : language === 'mr'
        ? 'तुम्हाला यापैकी काही धोक्याची लक्षणे जाणवत आहेत का?'
        : 'Are you experiencing any of these warning signs?';
    }
    speakText(questionText, language);
  }, [subStep, language]);

  const handleNext = () => {
    if (subStep < totalSubSteps) {
      setSubStep(subStep + 1);
    } else {
      // Calculate red flag presence
      const hasRedFlag = 
        painSeverity >= 8 ||
        associatedSymptoms.some(symId => {
          const matched = associatedList.find(a => a.id === symId);
          return matched?.redFlag;
        }) ||
        painRadiation.some(radId => {
          const matched = radiationOptions.find(r => r.id === radId);
          return (matched as any)?.isRedFlag;
        });

      onComplete({
        bodyLocation,
        onset,
        painCharacter,
        painRadiation,
        painSeverity,
        associatedSymptoms,
        redFlagDetected: hasRedFlag,
      });
    }
  };

  const handlePrev = () => {
    if (subStep > 1) {
      setSubStep(subStep - 1);
    } else {
      onBack();
    }
  };

  const toggleRadiation = (id: string) => {
    if (id.includes('No spread')) {
      setPainRadiation([id]);
      return;
    }
    const filtered = painRadiation.filter(r => !r.includes('No spread'));
    if (filtered.includes(id)) {
      setPainRadiation(filtered.filter(r => r !== id));
    } else {
      setPainRadiation([...filtered, id]);
    }
  };

  const toggleAssociated = (id: string) => {
    if (id === 'None') {
      setAssociatedSymptoms(['None']);
      return;
    }
    const filtered = associatedSymptoms.filter(r => r !== 'None');
    if (filtered.includes(id)) {
      setAssociatedSymptoms(filtered.filter(r => r !== id));
    } else {
      setAssociatedSymptoms([...filtered, id]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[640px] p-4 sm:p-8 max-w-4xl mx-auto font-['Outfit']">
      
      {/* Top Header with Disease Badge & Progress */}
      <div className="w-full space-y-3 pb-2 border-b border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </button>

          {/* Active Disease Context Pill */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-teal-950 bg-gradient-to-r from-teal-100 to-emerald-100 px-3.5 py-1 rounded-full border border-teal-300 flex items-center gap-1.5 shadow-xs">
              <Activity className="w-3.5 h-3.5 text-teal-700 animate-pulse" />
              <span>{diseaseTitle}</span>
            </span>

            <span className="text-xs font-black text-cyan-900 bg-cyan-100 px-3 py-1 rounded-full border border-cyan-200">
              Step {subStep} of {totalSubSteps}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              const prompt = `Step ${subStep} of ${totalSubSteps}`;
              speakText(prompt, language);
            }}
            className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200 cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-teal-600" />
            <span>{t.listen}</span>
          </button>
        </div>

        {/* Dynamic Multi-Step Progress Fill */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-600 via-cyan-500 to-emerald-500 transition-all duration-500 rounded-full shadow-sm"
            style={{ width: `${(subStep / totalSubSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Dynamic Question Canvas */}
      <div className="my-auto w-full py-4 space-y-5">
        
        {/* SUBSTEP 1: SKELETON & BODY PINPOINT */}
        {subStep === 1 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {language === 'hi' ? 'दर्द का सटीक स्थान बताएं' : language === 'mr' ? 'दुखऱ्या भागाची अचूक जागा दाखवा' : 'Pinpoint Your Pain on Skeleton / Body'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {language === 'hi' 
                  ? 'कंकाल या शरीर चित्र पर उंगली दबाकर सटीक जगह चुनें' 
                  : language === 'mr'
                  ? 'कंकाल किंवा शरीराच्या चित्रावर बोट ठेवून जागा निवडा'
                  : 'Touch directly on the realistic skeleton or body map to mark pain'}
              </p>
            </div>

            <div className="w-full max-w-xl mx-auto">
              <PreciseBodyDiagram
                selectedLocation={bodyLocation}
                onSelectLocation={(id) => setBodyLocation(id)}
                language={language}
                interactive={true}
              />
            </div>
          </div>
        )}

        {/* SUBSTEP 2: WHEN STARTED */}
        {subStep === 2 && (
          <div className="space-y-5 text-center max-w-xl mx-auto">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {t.whenStarted}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {language === 'hi' ? 'यह तकलीफ कब शुरू हुई?' : language === 'mr' ? 'हा त्रास कधी सुरू झाला?' : 'Select when you first noticed this condition'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 text-left">
              {onsetOptions.map((opt) => {
                const label = language === 'hi' ? opt.hi : language === 'mr' ? opt.mr : opt.en;
                const isSelected = onset === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setOnset(opt.id);
                      speakText(label, language);
                    }}
                    className={`py-4 px-6 rounded-2xl border-2 text-base font-extrabold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-600 text-teal-950 ring-4 ring-teal-500/20 shadow-md scale-[1.01]'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{label}</span>
                    {isSelected && <Check className="w-5 h-5 text-teal-700 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SUBSTEP 3: DISEASE-SPECIFIC CHARACTER */}
        {subStep === 3 && (
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {language === 'hi' ? 'तकलीफ का अहसास कैसा है?' : language === 'mr' ? 'त्रासाचे स्वरूप कसे आहे?' : 'How does this symptom feel?'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {language === 'hi' ? 'नीचे दिए गए विकल्पों में से सबसे सटीक लक्षण चुनें' : language === 'mr' ? 'खालील पर्यायांपैकी सर्वात अचूक लक्षण निवडा' : 'Select the sensation closest to your experience'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {characterOptions.map((opt) => {
                const label = language === 'hi' ? opt.hi : language === 'mr' ? opt.mr : opt.en;
                const isSelected = painCharacter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setPainCharacter(opt.id);
                      speakText(label, language);
                    }}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center min-h-[120px] transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-tr from-teal-50 to-emerald-50 border-teal-600 text-teal-950 ring-4 ring-teal-500/20 shadow-lg scale-[1.03]'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs'
                    }`}
                  >
                    <span className="text-3xl mb-2">{opt.emoji}</span>
                    <span className="font-extrabold text-xs sm:text-sm leading-snug">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SUBSTEP 4: DISEASE SPREAD / RADIATION */}
        {subStep === 4 && (
          <div className="space-y-4 text-center max-w-xl mx-auto">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {language === 'hi' ? 'क्या दर्द कहीं और फैलता है?' : language === 'mr' ? 'कळ इतर भागात पसरते का?' : 'Does the discomfort spread elsewhere?'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {language === 'hi' ? 'लागू होने वाले सभी हिस्से चुनें' : language === 'mr' ? 'लागू असलेले सर्व भाग निवडा' : 'Select all body areas where the pain travels'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {radiationOptions.map((opt) => {
                const label = language === 'hi' ? opt.hi : language === 'mr' ? opt.mr : opt.en;
                const isSelected = painRadiation.includes(opt.id);
                const isWarning = (opt as any).isRedFlag;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      toggleRadiation(opt.id);
                      speakText(label, language);
                    }}
                    className={`p-4 rounded-2xl border-2 font-black text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-600 text-teal-950 ring-4 ring-teal-500/20 shadow-md scale-[1.01]'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isWarning && isSelected && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                      )}
                      <span>{label}</span>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-teal-700 shrink-0 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SUBSTEP 5: PAIN SEVERITY SCALE (0-10) */}
        {subStep === 5 && (
          <div className="space-y-4 max-w-xl mx-auto text-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {t.painSeverityTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {language === 'hi' ? 'चेहरे के भाव देखकर 0 से 10 तक दर्द की तीव्रता चुनें' : language === 'mr' ? 'चेहऱ्याचे हावभाव पाहून 0 ते 10 पर्यंत वेदना निवडा' : 'Wong-Baker clinical calibration score'}
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-lg">
              <PainScale
                value={painSeverity}
                onChange={(val) => setPainSeverity(val)}
                language={language}
              />
            </div>
          </div>
        )}

        {/* SUBSTEP 6: ASSOCIATED RED-FLAG SYMPTOMS */}
        {subStep === 6 && (
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-black mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Critical Clinical Red Flags</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {t.associatedSymptomsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {language === 'hi' ? 'इनमें से कोई भी चेतावनी संकेत हो तो तुरंत चुनें' : language === 'mr' ? 'यापैकी कोणताही धोक्याचा इशारा असल्यास त्वरित निवडा' : 'Select all warning symptoms present right now'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {associatedList.map((sym) => {
                const label = language === 'hi' ? sym.hi : language === 'mr' ? sym.mr : sym.en;
                const isSelected = associatedSymptoms.includes(sym.id);
                return (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => {
                      toggleAssociated(sym.id);
                      speakText(label, language);
                    }}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-between text-center min-h-[115px] transition-all cursor-pointer ${
                      isSelected
                        ? sym.redFlag
                          ? 'bg-rose-50 border-rose-600 text-rose-950 ring-4 ring-rose-500/20 shadow-lg scale-[1.02]'
                          : 'bg-teal-50 border-teal-600 text-teal-950 ring-4 ring-teal-500/20 shadow-md scale-[1.02]'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl">{sym.emoji}</span>
                    <span className="font-black text-xs sm:text-sm leading-tight">{label}</span>
                    {isSelected ? (
                      <Check className={`w-4 h-4 ${sym.redFlag ? 'text-rose-600' : 'text-teal-700'} stroke-[3]`} />
                    ) : (
                      <span className="h-4"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Action Footer Navigation */}
      <div className="w-full max-w-md flex items-center gap-3 pt-3">
        <button
          type="button"
          onClick={handleNext}
          className="w-full py-4 sm:py-5 px-6 bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-700 hover:from-teal-600 hover:to-emerald-500 text-white rounded-2xl font-black text-lg sm:text-xl shadow-xl shadow-teal-900/25 flex items-center justify-center gap-3 transition-all cursor-pointer group"
        >
          <span>{subStep === totalSubSteps ? t.continue : 'Next Question (आगे बढ़ें)'}</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};
