'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { HospitalWaitingRoomDisplay } from '@/components/common/HospitalWaitingRoomDisplay';
import { Language } from '@/types/patient';

export default function WaitingTvPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentServing, setCurrentServing] = useState<any>(null);
  const [waitingTokens, setWaitingTokens] = useState<any[]>([]);

  const fetchLiveQueue = useCallback(async () => {
    try {
      const res = await fetch('/api/queue/active');
      const data = await res.json();
      if (res.ok && data.queue) {
        const waiting = data.queue
          .filter((q: any) => q.status === 'waiting' || q.status === 'in_progress')
          .map((q: any) => ({
            token: q.tokenFormatted || `A-${q.tokenNumber}`,
            patientName: q.patientName,
            dept: q.category || 'General Medicine',
            status: q.status === 'in_progress' ? 'called' : 'waiting',
            isPriority: q.triage === 'Urgent' || q.triage === 'Priority',
          }));

        setWaitingTokens(waiting);

        if (data.currentlyServing) {
          setCurrentServing(data.currentlyServing);
        } else if (data.queue.length > 0) {
          setCurrentServing(data.queue[0]);
        }
      }
    } catch (e) {
      console.error('Error fetching TV display queue:', e);
    }
  }, []);

  useEffect(() => {
    fetchLiveQueue();

    let eventSource: EventSource | null = null;
    let fallbackInterval: NodeJS.Timeout | null = null;

    try {
      eventSource = new EventSource('/api/queue/stream');

      eventSource.addEventListener('queue_update', (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'TOKEN_CALLED') {
            setCurrentServing({
              tokenFormatted: payload.tokenFormatted,
              patientName: payload.patientName,
              roomNumber: payload.roomNumber,
              doctorName: payload.doctorName,
              category: payload.departmentName,
            });
          }
        } catch (e) {}
        fetchLiveQueue();
      });

      eventSource.onerror = () => {
        if (!fallbackInterval) {
          fallbackInterval = setInterval(fetchLiveQueue, 5000);
        }
      };
    } catch (e) {
      fallbackInterval = setInterval(fetchLiveQueue, 5000);
    }

    return () => {
      if (eventSource) eventSource.close();
      if (fallbackInterval) clearInterval(fallbackInterval);
    };
  }, [fetchLiveQueue]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <HospitalWaitingRoomDisplay
        language={language}
        currentServingToken={currentServing?.tokenFormatted || (currentServing?.tokenNumber ? `A-${currentServing.tokenNumber}` : 'A-104')}
        servingRoom={currentServing?.roomNumber || 'Room 3 (OPD Block A)'}
        servingDoctor={currentServing?.doctorName || 'Dr. Dhananjay Chavan'}
        servingDepartment={currentServing?.category || 'General Medicine & Diabetology'}
        servingPatientName={currentServing?.patientName || 'Mr. Ramesh Chandra'}
        waitingTokens={waitingTokens}
        onSimulateNextToken={fetchLiveQueue}
        onBackToKiosk={() => {
          window.location.href = '/patient';
        }}
      />
    </div>
  );
}
