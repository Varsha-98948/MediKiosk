'use client';

import React, { useState } from 'react';
import { AyushIntelligenceEngine } from '@/components/ayush/AyushIntelligenceEngine';
import { Language } from '@/types/patient';

export default function AyushPage() {
  const [language] = useState<Language>('en');
  return (
    <div className="min-h-screen bg-[#F9F9F6] text-stone-900 p-6">
      <AyushIntelligenceEngine language={language} />
    </div>
  );
}
