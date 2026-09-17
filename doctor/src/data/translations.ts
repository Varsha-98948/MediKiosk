export type SupportedLanguage = 'en' | 'hi' | 'mr';

export interface LocalizedMedInstruction {
  timing: Record<SupportedLanguage, string>;
  instructions: Record<SupportedLanguage, string>;
}

export const defaultPrescriptionDescriptions: Record<SupportedLanguage, string> = {
  en: 'Comprehensive 30-day oral glycemic & cardiovascular management plan. Includes dual oral hypoglycemic therapy (Metformin + Glimepiride), SGLT-2 inhibitor for cardio-renal protection (Empagliflozin), ARB for 24-hour BP control (Telmisartan), and neurotropic vitamin complex for peripheral neuropathy. Take medications strictly as scheduled with principal meals. Maintain strict hydration (>2.5L/day), low-sodium diabetic diet, and check fasting blood sugar twice weekly. If experiencing dizziness, trembling or cold sweating (hypoglycemia), immediately consume 3 teaspoons of sugar or glucose water.',
  hi: '30 दिनों का समग्र मधुमेह (शुगर) एवं हृदय-रक्तदाब प्रबंधन उपचार। इसमें मेटफॉर्मिन और ग्लिमेपिराइड, गुर्दे व हृदय की सुरक्षा के लिए एम्पाग्लिफ्लोज़िन, 24 घंटे बीपी नियंत्रण के लिए टेलमिसार्टन, तथा पैरों की नसों की मजबूती के लिए विटामिन सप्लीमेंट शामिल हैं। सभी दवाइयां भोजन के साथ निर्धारित समय पर नियमित लें। दिनभर में कम से कम 2.5 लीटर पानी पिएं। यदि चक्कर, हाथ में कंपन या अचानक पसीना आए (लो शुगर), तो तुरंत 3 चम्मच चीनी या ग्लूकोज का पानी लें। कम नमक व मधुमेह अनुकूल आहार का पालन करें।',
  mr: '३० दिवसांची सर्वसमावेशक मधुमेह (साखर) व रक्तदाब नियंत्रण उपचार योजना. यामध्ये मेटफॉर्मिन आणि ग्लिमेपिराइड, मूत्रपिंड व हृदयाच्या संरक्षणासाठी एम्पाग्लिफ्लॉझिन, २४ तास रक्तदाब नियंत्रणासाठी टेल्मिसार्टन, आणि पायांच्या नसांच्या आरोग्यासाठी जीवनसत्त्वे समाविष्ट आहेत. सर्व औषधे ठरवून दिलेल्या वेळेनुसार जेवणासोबत नियमितपणे घ्यावीत. किडनीच्या आरोग्यासाठी दिवसभरात किमान २.५ लिटर पाणी नक्की प्यावे. चक्कर आल्यास, हात थरथरल्यास किंवा खूप घाम आल्यास (साखर कमी झाल्यास) लगेच ३ चमचे साखर किंवा ग्लुकोजचे पाणी प्यावे. कमी मिठाचे व मधुमेहाचे पथ्य पाळावे.',
};

export const timingTranslations: Record<string, Record<SupportedLanguage, string>> = {
  'After Food': {
    en: 'After Food',
    hi: 'खाने के बाद',
    mr: 'जेवणानंतर',
  },
  'Before Food': {
    en: 'Before Food (Empty Stomach)',
    hi: 'खाने से पहले (खाली पेट)',
    mr: 'जेवणापूर्वी (उपाशी पोटी)',
  },
  'With Food': {
    en: 'With Food / Meal',
    hi: 'भोजन के साथ',
    mr: 'जेवणासोबत',
  },
  'At Bedtime': {
    en: 'At Bedtime / Night',
    hi: 'रात को सोते समय',
    mr: 'रात्री झोपताना',
  },
};

export const drugDescriptionTranslations: Record<
  string,
  Record<SupportedLanguage, { indication: string; details: string }>
> = {
  metformin: {
    en: {
      indication: 'Blood Sugar Control (Biguanide)',
      details: 'Improves body sensitivity to insulin and lowers glucose production in the liver.',
    },
    hi: {
      indication: 'रक्त शर्करा (शुगर) नियंत्रण',
      details: 'इंसुलिन की कार्यक्षमता बढ़ाता है और लिवर में अतिरिक्त शुगर बनने से रोकता है।',
    },
    mr: {
      indication: 'रक्तातील साखर नियंत्रण',
      details: 'इन्सुलिनची कार्यक्षमता वाढवून यकृतातून तयार होणारी अतिरिक्त साखर नियंत्रित करते.',
    },
  },
  glimepiride: {
    en: {
      indication: 'Insulin Secretion Stimulator',
      details: 'Helps the pancreas produce more insulin to lower post-meal blood sugar spikes.',
    },
    hi: {
      indication: 'इंसुलिन स्राव प्रेरक',
      details: 'अग्न्याशय (पैंक्रियाज) से इंसुलिन की मात्रा बढ़ाकर भोजन के बाद शुगर को नियंत्रित करता है।',
    },
    mr: {
      indication: 'इन्सुलिन निर्मिती वाढवणारे औषध',
      details: 'स्वादुपिंडातून इन्सुलिनचे प्रमाण वाढवून जेवणानंतर रक्तातील साखर वाढण्यास प्रतिबंध करते.',
    },
  },
  empagliflozin: {
    en: {
      indication: 'Cardio-Renal Protection & Glucose Excretion',
      details: 'Expels excess glucose via urine; shields kidneys and heart against diabetic damage.',
    },
    hi: {
      indication: 'किडनी एवं हृदय सुरक्षा (अतिरिक्त शुगर निष्कासन)',
      details: 'पेशाब के माध्यम से अतिरिक्त शुगर बाहर निकालता है और गुर्दे व दिल की रक्षा करता है।',
    },
    mr: {
      indication: 'हृदय व मूत्रपिंड संरक्षण',
      details: 'लघवीवाटे जास्तीची साखर बाहेर टाकून मूत्रपिंड आणि हृदयाचे मधुमेहाच्या दुष्परिणामांपासून रक्षण करते.',
    },
  },
  telmisartan: {
    en: {
      indication: '24-Hour Blood Pressure Control',
      details: 'Relaxes blood vessels, reduces cardiac workload, and delays kidney progression.',
    },
    hi: {
      indication: '24 घंटे ब्लड प्रेशर नियंत्रण',
      details: 'रक्त वाहिकाओं को शिथिल कर बीपी सामान्य रखता है और दिल व किडनी को सुरक्षित रखता है।',
    },
    mr: {
      indication: '२४ तास रक्तदाब नियंत्रण',
      details: 'रक्तवाहिन्या शिथिल करून रक्तदाब नियंत्रणात ठेवते आणि हृदय व मूत्रपिंडाचे रक्षण करते.',
    },
  },
  rejunex: {
    en: {
      indication: 'Nerve Regeneration & Numbness Care',
      details: 'Repairs damaged nerve myelin sheaths; relieves burning, tingling, and foot numbness.',
    },
    hi: {
      indication: 'पैरों के सुन्नपन व नसों की कमजोरी का निवारण',
      details: 'कमजोर नसों को पोषण देकर पैरों में जलन, झनझनाहट और सुन्नपन से राहत दिलाता है।',
    },
    mr: {
      indication: 'मज्जातंतूंचे पोषण व बधिरता निवारण',
      details: 'नसांना ऊर्जा देऊन पायांची जळजळ, मुंग्या येणे आणि बधिरपणा कमी करण्यास मदत करते.',
    },
  },
  atorva: {
    en: {
      indication: 'Cholesterol & Lipid Control',
      details: 'Lowers LDL bad cholesterol and reduces risk of cardiac events.',
    },
    hi: {
      indication: 'कोलेस्ट्रॉल एवं लिपिड नियंत्रण',
      details: 'हानिकारक कोलेस्ट्रॉल को घटाकर दिल के दौरे और नसों में रुकावट से बचाता है।',
    },
    mr: {
      indication: 'कोलेस्टेरॉल व चरबी नियंत्रण',
      details: 'रक्तातील घातक कोलेस्टेरॉल कमी करून हृदयविकाराचा झटका व रक्तवाहिन्यांतील अडथळे टाळते.',
    },
  },
  augmentin: {
    en: {
      indication: 'Broad Spectrum Antibiotic',
      details: 'Eradicates bacterial infections in respiratory, soft tissue, and urinary tracts.',
    },
    hi: {
      indication: 'एंटीबायोटिक (जीवाणु संक्रमण रोधी)',
      details: 'फेफड़ों, गले या त्वचा में फैले हानिकारक बैक्टीरिया को नष्ट करता है।',
    },
    mr: {
      indication: 'जिवाणू संसर्ग प्रतिबंधक (अँटीबायोटिक)',
      details: 'घसा, छाती किंवा त्वचेतील हानिकारक जिवाणूंचा संसर्ग पूर्णपणे बरा करते.',
    },
  },
  pantoprazole: {
    en: {
      indication: 'Gastric Acid Reflux & Ulcer Shield',
      details: 'Reduces excess stomach acid secretion to prevent gastritis, heartburn, and ulcers.',
    },
    hi: {
      indication: 'एसिडिटी व पेट की जलन से राहत',
      details: 'पेट में ज्यादा एसिड बनने से रोकता है और जलन व गैस से राहत प्रदान करता है।',
    },
    mr: {
      indication: 'पित्तनाशक व जठर संरक्षण (अ‍ॅसिडिटी)',
      details: 'पोटातील आम्लनिर्मिती कमी करून छातीतील जळजळ, गॅस आणि पित्तापासून संरक्षण देते.',
    },
  },
  sitagliptin: {
    en: {
      indication: 'DPP-4 Glycemic Stabilizer',
      details: 'Helps balance meal-dependent insulin release without causing weight gain.',
    },
    hi: {
      indication: 'ब्लड शुगर संतुलन (वजन बढ़ाए बिना)',
      details: 'भोजन के बाद शुगर के उतार-चढ़ाव को नियंत्रित करता है।',
    },
    mr: {
      indication: 'साखर समतोल राखणारे औषध',
      details: 'जेवणानंतर साखरेची पातळी न वाढवता रक्तातील ग्लुकोज स्थिर ठेवण्यास मदत करते.',
    },
  },
};

export const drugInstructionTranslations: Record<string, Record<SupportedLanguage, string>> = {
  metformin: {
    en: 'Take immediately after principal meals with water.',
    hi: 'मुख्य भोजन के तुरंत बाद पानी के साथ लें।',
    mr: 'जेवणानंतर लगेच पाण्यासोबत घ्या.',
  },
  glimepiride: {
    en: 'Take 15 mins before breakfast. Keep glucose candy handy for hypoglycemia.',
    hi: 'नाश्ते से 15 मिनट पहले लें। चक्कर या पसीना आने पर तुरंत मीठा खाएं।',
    mr: 'न्याहारीच्या 15 मिनिटे आधी घ्या. चक्कर आल्यास लगेच साखर किंवा गोड खावे.',
  },
  empagliflozin: {
    en: 'Drink minimum 2.5L water daily. Maintain perineal hygiene.',
    hi: 'दिन भर में कम से कम 2.5 लीटर पानी पिएं। व्यक्तिगत स्वच्छता बनाए रखें।',
    mr: 'दिवसभरात किमान 2.5 लिटर पाणी प्या. वैयक्तिक स्वच्छता ठेवा.',
  },
  telmisartan: {
    en: 'Continue regular nightly dosing for 24-hr BP control.',
    hi: 'ब्लड प्रेशर नियंत्रण के लिए रात को नियमित रूप से लें।',
    mr: 'रक्तदाब नियंत्रणासाठी दररोज रात्री नियमितपणे घ्या.',
  },
  rejunex: {
    en: 'Take after dinner for diabetic nerve health and foot numbness.',
    hi: 'पैरों में जलन और नसों की मजबूती के लिए रात को खाने के बाद लें।',
    mr: 'पायांची जळजळ आणि मज्जातंतूंच्या आरोग्यासाठी रात्री जेवणानंतर घ्या.',
  },
  augmentin: {
    en: 'Complete the entire 5-day antibiotic course without skipping.',
    hi: 'पूरे 5 दिनों का एंटीबायोटिक कोर्स बिना छोड़े पूरा करें।',
    mr: '5 दिवसांचा अँटीबायोटिक कोर्स न चुकता पूर्ण करा.',
  },
  pantoprazole: {
    en: 'Take 30 minutes before morning breakfast with water.',
    hi: 'सुबह नाश्ते से 30 मिनट पहले एक घूंट पानी के साथ लें।',
    mr: 'सकाळी न्याहारीच्या 30 मिनिटे आधी पाण्यासोबत घ्या.',
  },
  atorva: {
    en: 'Take at bedtime after dinner. Avoid grapefruit juice.',
    hi: 'रात को खाने के बाद सोते समय लें।',
    mr: 'रात्री जेवणानंतर झोपताना घ्या.',
  },
  sitagliptin: {
    en: 'Take once daily in the morning with or without food.',
    hi: 'प्रतिदिन सुबह एक बार भोजन के साथ या बिना लें।',
    mr: 'दररोज सकाळी एकदा जेवणासोबत किंवा जेवणाशिवाय घ्या.',
  },
};

export const diagnosisTranslations: Record<string, Record<SupportedLanguage, string>> = {
  'E11.9': {
    en: 'Type 2 diabetes mellitus without complications',
    hi: 'टाइप 2 मधुमेह (जटिलता रहित)',
    mr: 'टाइप २ मधुमेह (गुंतागुंत नसलेला)',
  },
  'I10': {
    en: 'Essential (primary) hypertension',
    hi: 'आवश्यक (प्राथमिक) उच्च रक्तदाब',
    mr: 'प्राथमिक उच्च रक्तदाब (हाय बीपी)',
  },
  'E11.40': {
    en: 'Type 2 diabetes mellitus with diabetic neuropathy, unspecified',
    hi: 'डायबिटिक न्यूरोपैथी युक्त टाइप 2 मधुमेह (पैरों की नसों की कमजोरी)',
    mr: 'डायबेटिक न्यूरोपॅथीसह टाइप २ मधुमेह (पायांचे मज्जातंतू विकार)',
  },
  'E11.21': {
    en: 'Type 2 diabetes mellitus with diabetic nephropathy',
    hi: 'डायबिटिक नेफ्रोपैथी युक्त टाइप 2 मधुमेह (गुर्दे का विकार)',
    mr: 'डायबेटिक नेफ्रोपॅथीसह टाइप २ मधुमेह (किडनी विकार)',
  },
  'E78.5': {
    en: 'Hyperlipidemia, unspecified',
    hi: 'हाइपरलिपिडेमिया (उच्च कोलेस्ट्रॉल)',
    mr: 'हायपरलिपिडेमिया (रक्तातील जादा चरबी/कोलेस्टेरॉल)',
  },
  'N18.3': {
    en: 'Chronic kidney disease, stage 3 (moderate)',
    hi: 'क्रॉनिक किडनी रोग (चरण 3 - मध्यम)',
    mr: 'दीर्घकालीन मूत्रपिंड आजार (टप्पा ३ - मध्यम)',
  },
  'K21.9': {
    en: 'Gastro-esophageal reflux disease without esophagitis',
    hi: 'गैस्ट्रो-ओसोफेगल रिफ्लक्स (एसिडिटी/जीईआरडी)',
    mr: 'गॅस्ट्रो-एसोफेजिअल रिफ्लक्स (आम्लपित्त/अ‍ॅसिडिटी)',
  },
  'M79.2': {
    en: 'Neuralgia and neuritis, unspecified',
    hi: 'नसों का दर्द (न्यूराल्जिया)',
    mr: 'मज्जातंतूंचे दुखणे (न्यूराल्जिया)',
  },
  'R53.83': {
    en: 'Other fatigue (generalized asthenia)',
    hi: 'सामान्य कमजोरी व थकान',
    mr: 'सर्वसाधारण थकवा व अशक्तपणा',
  },
  'J06.9': {
    en: 'Acute upper respiratory infection, unspecified',
    hi: 'तीव्र श्वसन संक्रमण (सर्दी/खांसी)',
    mr: 'श्वसनमार्गाचा संसर्ग (सर्दी-खोकला)',
  },
};

export const directiveTranslations: Record<string, Record<SupportedLanguage, { title: string; desc: string }>> = {
  'dir-1': {
    en: {
      title: 'Strict Diabetic Medical Nutrition Therapy (1500 kcal)',
      desc: 'Avoid refined sugars, sweets, jaggery, bakery foods, and fruit juices. Incorporate high-fiber vegetables, millets, and whole pulses.',
    },
    hi: {
      title: 'मधुमेह आहार नियंत्रण (1500 कैलोरी योजना)',
      desc: 'चीनी, गुड़, मिठाई, मैदा और फलों के जूस से पूर्ण परहेज करें। हरी पत्तेदार सब्जियां, बाजरा और छिलके वाली दालें अधिक लें।',
    },
    mr: {
      title: 'मधुमेह आहार पथ्य (1500 कॅलरी डाएट)',
      desc: 'साखर, गूळ, गोड पदार्थ, बेकरी उत्पादने आणि फळांचे रस पूर्णपणे टाळा. आहारात हिरव्या पालेभाज्या, ज्वारी, बाजरी आणि कडधान्यांचा समावेश करा.',
    },
  },
  'dir-2': {
    en: {
      title: 'Low Sodium Intake (< 2g Sodium / Day)',
      desc: 'Restrict table salt to under 1 flat teaspoon daily. Avoid processed pickles, papads, canned food, and salty commercial snacks.',
    },
    hi: {
      title: 'कम नमक का सेवन (प्रतिदिन 2 ग्राम से कम)',
      desc: 'दिन भर में 1 चम्मच से कम नमक का उपयोग करें। अचार, पापड़, डिब्बाबंद खाद्य पदार्थ और नमकीन स्नैक्स से पूरी तरह बचें।',
    },
    mr: {
      title: 'कमी मीठ आहार (दिवसाला 2 ग्रॅमपेक्षा कमी मीठ)',
      desc: 'दिवसभरात जेवणात 1 लहान चमच्यापेक्षा कमी मीठ वापरा. जेवणात वरून मीठ, लोणचे, पापड आणि खारट वेफर्स/फरसाण पूर्ण बंद करा.',
    },
  },
  'dir-3': {
    en: {
      title: 'Aerobic Exercise (30 Minutes Brisk Walk 5 Days/Week)',
      desc: 'Maintain regular moderate-intensity walking after meals. Avoid strenuous weight lifting until BP is normalized.',
    },
    hi: {
      title: 'दैनिक व्यायाम (प्रतिदिन 30 मिनट तेज गति से पैदल चलना)',
      desc: 'भोजन के बाद या सुबह 30 मिनट तेज चलें। अत्यधिक वजन उठाने वाले व्यायाम से बचें।',
    },
    mr: {
      title: 'नियमित व्यायाम (दररोज 30 मिनिटे वेगाने चालणे)',
      desc: 'आठवड्यातून किमान 5 दिवस दररोज 30 मिनिटे वेगाने चाला. रक्तदाब सामान्य होईपर्यंत जास्त वजन उचलण्याचे व्यायाम टाळा.',
    },
  },
  'dir-4': {
    en: {
      title: 'Diabetic Foot Care & Self-Inspection Protocol',
      desc: 'Wash feet daily in lukewarm water, dry carefully between toes, apply moisturizer, and never walk barefoot.',
    },
    hi: {
      title: 'डायबिटिक पैरों की विशेष देखभाल',
      desc: 'पैरों को प्रतिदिन गुनगुने पानी से धोएं, उंगलियों के बीच अच्छी तरह सुखाएं, और कभी भी नंगे पैर न चलें।',
    },
    mr: {
      title: 'पायांची विशेष काळजी व तपासणी',
      desc: 'पाय रोज कोमट पाण्याने धुवा, बोटांमधील जागा मऊ कापडाने कोरडी ठेवा, मॉइश्चरायझर लावा आणि अनवाणी कधीही चालू नका.',
    },
  },
  'dir-5': {
    en: {
      title: 'Hypoglycemia Red-Flag Emergency Instructions',
      desc: 'If trembling, cold sweating, or palpitations occur, immediately consume 3 teaspoons of sugar or 15g glucose water and report.',
    },
    hi: {
      title: 'लो शुगर (हाइपोग्लाइसीमिया) आपातकालीन निर्देश',
      desc: 'यदि कंपकंपी, ठंडा पसीना या घबराहट महसूस हो, तो तुरंत 3 चम्मच चीनी या ग्लूकोज का पानी पिएं और तुरंत संपर्क करें।',
    },
    mr: {
      title: 'रक्तातील साखर कमी झाल्यास (लो शुगर) आपत्कालीन सूचना',
      desc: 'हात थरथरणे, घाम येणे किंवा धडधड झाल्यास लगेच 3 चमचे साखर किंवा ग्लुकोजचे पाणी प्या आणि दवाखान्यात संपर्क साधा.',
    },
  },
};

export const prescriptionSectionLabels: Record<
  SupportedLanguage,
  {
    rxHeading: string;
    medicine: string;
    dosage: string;
    timing: string;
    duration: string;
    instructions: string;
    drugDescription: string;
    prescriptionDescriptionHeading: string;
    labHeading: string;
    dietHeading: string;
    nextReview: string;
    digitalStamp: string;
    patientName: string;
    ageGender: string;
    uhid: string;
    date: string;
    diagnosis: string;
    vitals: string;
    allergies: string;
    clinicalGoal: string;
    doctorName: string;
    doctorDegrees: string;
    doctorSpecialty: string;
    hospitalName: string;
    hospitalDept: string;
  }
> = {
  en: {
    rxHeading: 'Prescribed Medications (℞)',
    medicine: 'Medicine & Formulation',
    dosage: 'Dose Schedule',
    timing: 'Timing',
    duration: 'Duration',
    instructions: 'Instructions & Patient Advice',
    drugDescription: 'Drug Description & Indication',
    prescriptionDescriptionHeading: 'Prescription Description & Clinical Regimen',
    labHeading: 'Laboratory Investigations Ordered',
    dietHeading: 'Diet & Lifestyle Advice',
    nextReview: 'Next Follow-up Review:',
    digitalStamp: 'Digitally verified under Telemedicine Guidelines 2020',
    patientName: 'Patient Name',
    ageGender: 'Age / Gender',
    uhid: 'UHID / MRN',
    date: 'Date',
    diagnosis: 'Clinical Diagnosis',
    vitals: 'Vitals Snapshot',
    allergies: 'Allergies',
    clinicalGoal: 'Clinical Goal:',
    doctorName: 'Dr. Dhananjay Chavan',
    doctorDegrees: 'MBBS, MD (Internal Medicine)',
    doctorSpecialty: 'Senior Consultant Diabetologist',
    hospitalName: 'Apollo Multi-Specialty Clinic',
    hospitalDept: 'Centre for Diabetology, Endocrinology & Metabolic Care',
  },
  hi: {
    rxHeading: 'निर्धारित दवाइयां (℞)',
    medicine: 'दवाई का नाम एवं शक्ति',
    dosage: 'खुराक (मात्रा)',
    timing: 'लेने का समय',
    duration: 'दिन / अवधि',
    instructions: 'दवा लेने के निर्देश एवं सावधानियां',
    drugDescription: 'दवा का विवरण एवं चिकित्सीय उपयोग',
    prescriptionDescriptionHeading: 'प्रिस्क्रिप्शन का विवरण एवं उपचार सारांश',
    labHeading: 'जांच / टेस्ट (लैब ऑर्डर्स)',
    dietHeading: 'आहार एवं जीवनशैली निर्देश',
    nextReview: 'अगली जांच / फॉलो-अप तारीख:',
    digitalStamp: 'टेलीमेडिसिन दिशानिर्देश 2020 के तहत डिजिटल रूप से सत्यापित',
    patientName: 'मरीज का नाम',
    ageGender: 'आयु / लिंग',
    uhid: 'यूएचआईडी / पंजी. सं.',
    date: 'दिनांक',
    diagnosis: 'रोग निदान',
    vitals: 'महत्वपूर्ण लक्षण (वाइटल्स)',
    allergies: 'एलर्जी',
    clinicalGoal: 'उपचार उद्देश्य:',
    doctorName: 'डॉ. धनंजय चव्हाण',
    doctorDegrees: 'एमबीबीएस, एमडी (इंटरनल मेडिसिन)',
    doctorSpecialty: 'वरिष्ठ मधुमेह विशेषज्ञ (डायबेटोलॉजिस्ट)',
    hospitalName: 'अपोलो मल्टी-स्पेशियलिटी क्लिनिक',
    hospitalDept: 'मधुमेह, अंतःस्राव एवं चयापचय देखभाल केंद्र',
  },
  mr: {
    rxHeading: 'औषधोपचार व गोळ्या (℞)',
    medicine: 'औषधाचे नाव व प्रमाण',
    dosage: 'मात्रा (डोस)',
    timing: 'औषध घेण्याची वेळ',
    duration: 'कालावधी',
    instructions: 'औषध घेण्याच्या सूचना व पथ्य',
    drugDescription: 'औषधाचे सविस्तर वर्णन व उपयोग',
    prescriptionDescriptionHeading: 'प्रिस्क्रिप्शनचे सविस्तर वर्णन व उपचार सारांश',
    labHeading: 'तपासण्या व रक्त चाचण्या (लॅब ऑर्डर्स)',
    dietHeading: 'पथ्य व जीवनशैली मार्गदर्शन',
    nextReview: 'पुढील तपासणीची तारीख व वेळ:',
    digitalStamp: 'टेलिमेडिसिन मार्गदर्शक तत्त्वे 2020 अंतर्गत डिजिटल प्रमाणित',
    patientName: 'रुग्णाचे नाव',
    ageGender: 'वय / लिंग',
    uhid: 'नोंदणी क्रमांक (MRN)',
    date: 'तारीख',
    diagnosis: 'रोगनिदान',
    vitals: 'शारीरिक नोंदी (वाइटल्स)',
    allergies: 'ॲलर्जी',
    clinicalGoal: 'तपासणी हेतू:',
    doctorName: 'डॉ. धनंजय चव्हाण',
    doctorDegrees: 'एमबीबीएस, एमडी (इंटर्नल मेडिसिन)',
    doctorSpecialty: 'ज्येष्ठ मधुमेह तज्ज्ञ (डायबेटोलॉजिस्ट)',
    hospitalName: 'अपोलो मल्टी-स्पेशालिटी क्लिनिक',
    hospitalDept: 'मधुमेह, अंतःस्रावी व चयापचय विकार केंद्र',
  },
};

export function getLocalizedInstruction(
  drugName: string,
  englishInstructions: string,
  lang: SupportedLanguage
): string {
  if (lang === 'en') return englishInstructions;

  const lower = drugName.toLowerCase();
  for (const key of Object.keys(drugInstructionTranslations)) {
    if (lower.includes(key)) {
      return drugInstructionTranslations[key][lang];
    }
  }

  // Generic fallback if not explicitly keyed
  if (lang === 'hi') {
    return 'निर्देशानुसार नियमित पानी के साथ लें। कोई तकलीफ होने पर डॉक्टर से संपर्क करें।';
  }
  return 'डॉक्टरांच्या सल्ल्यानुसार नियमित पाण्यासोबत घ्या. काही त्रास झाल्यास संपर्क साधा.';
}

export function getLocalizedTiming(englishTiming: string, lang: SupportedLanguage): string {
  if (lang === 'en') return englishTiming;
  const match = timingTranslations[englishTiming];
  return match ? match[lang] : englishTiming;
}

export function getLocalizedDrugDescription(
  drugName: string,
  lang: SupportedLanguage
): { indication: string; details: string } {
  const lower = drugName.toLowerCase();
  for (const key of Object.keys(drugDescriptionTranslations)) {
    if (lower.includes(key)) {
      return drugDescriptionTranslations[key][lang];
    }
  }

  if (lang === 'hi') {
    return {
      indication: 'चिकित्सकीय परामर्श अनुसार दवा',
      details: 'रोग नियंत्रण हेतु डॉक्टर द्वारा निर्धारित मानक खुराक।',
    };
  }
  if (lang === 'mr') {
    return {
      indication: 'वैद्यकीय सल्ल्यानुसार औषध',
      details: 'आजार नियंत्रणासाठी डॉक्टरांनी निश्चित केलेली मात्रा.',
    };
  }
  return {
    indication: 'Standard Outpatient Formulation',
    details: 'Prescribed as targeted therapeutic agent under clinical guidance.',
  };
}

export function getLocalizedDiagnosis(
  code: string,
  englishDesc: string,
  lang: SupportedLanguage
): string {
  if (lang === 'en') return englishDesc;
  const match = diagnosisTranslations[code];
  return match ? match[lang] : englishDesc;
}

export function getLocalizedPrescriptionDescription(lang: SupportedLanguage): string {
  return defaultPrescriptionDescriptions[lang] || defaultPrescriptionDescriptions.en;
}
