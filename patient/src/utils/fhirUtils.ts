import { PatientRecord } from '../types';

/**
 * Generates an ABDM & FHIR R4 compliant bundle JSON object from a MediKiosk PatientRecord.
 */
export function generateFhirBundle(patient: PatientRecord): object {
  const now = new Date().toISOString();
  
  return {
    resourceType: 'Bundle',
    id: `bundle-medikiosk-${patient.id}`,
    meta: {
      lastUpdated: now,
      profile: ['https://nrces.in/ndhm/fhir/r4/StructureDefinition/ClinicalArtifactBundle']
    },
    identifier: {
      system: 'https://medikiosk.ai/bundles',
      value: `MK-BUNDLE-${patient.tokenNumber}-${Date.now().toString().slice(-6)}`
    },
    type: 'document',
    timestamp: now,
    entry: [
      // 1. Composition Resource
      {
        fullUrl: `urn:uuid:composition-${patient.id}`,
        resource: {
          resourceType: 'Composition',
          id: `composition-${patient.id}`,
          status: 'final',
          type: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '34133-9',
                display: 'Summary of episode note'
              }
            ],
            text: 'MediKiosk Clinical Intake Case Sheet'
          },
          subject: {
            reference: `urn:uuid:patient-${patient.id}`,
            display: patient.name
          },
          date: now,
          author: [
            {
              display: 'MediKiosk AI Clinical Intake Engine v2.4'
            }
          ],
          title: `Pre-Consultation Intake Record — Token ${patient.tokenNumber}`,
          section: [
            {
              title: 'Chief Complaints & History of Present Illness',
              code: {
                coding: [{ system: 'http://loinc.org', code: '10154-3', display: 'Chief complaint' }]
              },
              text: {
                status: 'generated',
                div: `<div xmlns="http://www.w3.org/1999/xhtml"><p><strong>Chief Complaint:</strong> ${patient.chiefComplaint}</p><p><strong>Onset:</strong> ${patient.intakeSummary.duration}</p><p><strong>Pain Score:</strong> ${patient.intakeSummary.painScore}/10 (${patient.intakeSummary.character})</p></div>`
              }
            },
            {
              title: 'Vital Signs',
              code: {
                coding: [{ system: 'http://loinc.org', code: '8716-3', display: 'Vital signs' }]
              },
              text: {
                status: 'generated',
                div: `<div xmlns="http://www.w3.org/1999/xhtml"><p>BP: ${patient.vitals.bp} | Pulse: ${patient.vitals.pulse} bpm | SpO2: ${patient.vitals.spo2}%</p></div>`
              }
            }
          ]
        }
      },

      // 2. Patient Resource
      {
        fullUrl: `urn:uuid:patient-${patient.id}`,
        resource: {
          resourceType: 'Patient',
          id: patient.id,
          identifier: [
            {
              system: 'https://healthid.ndhm.gov.in',
              type: {
                coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v2-0203', code: 'MR', display: 'Medical Record Number' }]
              },
              value: patient.abhaId
            }
          ],
          name: [
            {
              text: patient.name
            }
          ],
          telecom: [
            {
              system: 'phone',
              value: patient.phone
            }
          ],
          gender: patient.gender === 'male' ? 'male' : patient.gender === 'female' ? 'female' : 'other',
          communication: [
            {
              language: {
                coding: [
                  {
                    system: 'urn:ietf:bcp:47',
                    code: patient.language === 'hi' ? 'hi' : patient.language === 'mr' ? 'mr' : 'en',
                    display: patient.language === 'hi' ? 'Hindi' : patient.language === 'mr' ? 'Marathi' : 'English'
                  }
                ]
              },
              preferred: true
            }
          ]
        }
      },

      // 3. Condition Resource (Chief Complaint / Red Flag)
      {
        fullUrl: `urn:uuid:condition-${patient.id}-1`,
        resource: {
          resourceType: 'Condition',
          id: `cond-${patient.id}-1`,
          clinicalStatus: {
            coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-clinical', code: 'active' }]
          },
          verificationStatus: {
            coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status', code: 'provisional' }]
          },
          category: [
            {
              coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-category', code: 'encounter-diagnosis' }]
            }
          ],
          severity: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: patient.priority === 'urgent' ? '24484000' : '255604002',
                display: patient.priority === 'urgent' ? 'Severe' : 'Mild'
              }
            ]
          },
          code: {
            text: patient.chiefComplaint
          },
          subject: {
            reference: `urn:uuid:patient-${patient.id}`
          },
          recordedDate: now
        }
      },

      // 4. Observation Resource (Vitals & Lab Parameters)
      {
        fullUrl: `urn:uuid:observation-bp-${patient.id}`,
        resource: {
          resourceType: 'Observation',
          id: `obs-bp-${patient.id}`,
          status: 'final',
          category: [
            {
              coding: [{ system: 'http://terminology.hl7.org/CodeSystem/observation-category', code: 'vital-signs' }]
            }
          ],
          code: {
            coding: [{ system: 'http://loinc.org', code: '85354-9', display: 'Blood pressure panel' }],
            text: 'Blood Pressure'
          },
          subject: { reference: `urn:uuid:patient-${patient.id}` },
          valueString: patient.vitals.bp
        }
      },

      // 5. Consent Resource
      {
        fullUrl: `urn:uuid:consent-${patient.id}`,
        resource: {
          resourceType: 'Consent',
          id: `consent-${patient.id}`,
          status: 'active',
          scope: {
            coding: [{ system: 'http://terminology.hl7.org/CodeSystem/consentscope', code: 'patient-privacy' }]
          },
          category: [
            {
              coding: [{ system: 'http://loinc.org', code: '59284-0', display: 'Consent document' }]
            }
          ],
          patient: { reference: `urn:uuid:patient-${patient.id}` },
          dateTime: now,
          policyRule: {
            text: 'ABDM Ayush Data Exchange Consent v2.1'
          }
        }
      }
    ]
  };
}
