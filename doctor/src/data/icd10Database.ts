export interface ICD10Entry {
  code: string;
  description: string;
  category: string;
  isChronic: boolean;
}

export const icd10Database: ICD10Entry[] = [
  {
    code: 'E11.9',
    description: 'Type 2 diabetes mellitus without complications',
    category: 'Endocrine, nutritional and metabolic diseases',
    isChronic: true,
  },
  {
    code: 'E11.21',
    description: 'Type 2 diabetes mellitus with diabetic nephropathy',
    category: 'Endocrine, nutritional and metabolic diseases',
    isChronic: true,
  },
  {
    code: 'E11.40',
    description: 'Type 2 diabetes mellitus with diabetic neuropathy, unspecified',
    category: 'Endocrine, nutritional and metabolic diseases',
    isChronic: true,
  },
  {
    code: 'I10',
    description: 'Essential (primary) hypertension',
    category: 'Diseases of the circulatory system',
    isChronic: true,
  },
  {
    code: 'E78.5',
    description: 'Hyperlipidemia, unspecified',
    category: 'Endocrine, nutritional and metabolic diseases',
    isChronic: true,
  },
  {
    code: 'N18.3',
    description: 'Chronic kidney disease, stage 3 (moderate)',
    category: 'Diseases of the genitourinary system',
    isChronic: true,
  },
  {
    code: 'K21.9',
    description: 'Gastro-esophageal reflux disease without esophagitis',
    category: 'Diseases of the digestive system',
    isChronic: false,
  },
  {
    code: 'M79.2',
    description: 'Neuralgia and neuritis, unspecified',
    category: 'Diseases of the musculoskeletal system',
    isChronic: false,
  },
  {
    code: 'R53.83',
    description: 'Other fatigue (generalized asthenia)',
    category: 'Symptoms, signs and abnormal clinical findings',
    isChronic: false,
  },
  {
    code: 'J06.9',
    description: 'Acute upper respiratory infection, unspecified',
    category: 'Diseases of the respiratory system',
    isChronic: false,
  },
];
