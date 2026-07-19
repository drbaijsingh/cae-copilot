// app/app/page.tsx

'use client';

import { ProfessionalLayout } from '../components/ProfessionalLayout';
import { EnhancedChat } from '../components/EnhancedChat';

export default function AppPage() {
  return (
    <ProfessionalLayout>
      <EnhancedChat />
    </ProfessionalLayout>
  );
}