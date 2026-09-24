export type ServiceId =
  | 'rontas-ratetele'
  | 'rontas-levetele'
  | 'atok-levetele'
  | 'vedelem-rontas-ellen'
  | 'negativ-energia-tisztitas'
  | 'mi-a-franc'
  | 'teljes-sotetseg';

export interface ServiceItem {
  id: ServiceId;
  title: string;
  subtitle: string;
  price: number;
  formattedPrice: string;
  description: string;
  badge?: string;
  features: string[];
  ritualElements: string[];
  buttonText: string;
  iconName: string;
  popular?: boolean;
}

export interface BureaucraticCase {
  caseId: string;
  clientName: string;
  serviceTitle: string;
  submissionDate: string;
  darknessLevel: number;
  status: 'BEFOGADVA' | 'VIZSGALAT_ALATT' | 'RITUAL_FOLYAMATBAN' | 'VEDELEM_AKTIV' | 'LEZARVA';
  statusText: string;
  progressPercent: number;
  investigationStatus: 'FOLYAMATBAN' | 'KÉSZ';
  protectionStatus: 'VÁRAKOZIK' | 'FOLYAMATBAN' | 'KÉSZ';
  darknessCompatibility: string;
  attilaNotified: boolean;
  notes: string[];
  location: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  location: string;
  service: string;
  date: string;
  reply?: string;
}

export interface OccultSeal {
  sealId: string;
  ownerName: string;
  sealType: string;
  protectionRating: number;
  activationDate: string;
  expirationDate: string;
  darknessCompatibility: string;
  frequencyHz: number;
  sigilPattern: number;
}

export interface DiagnosticAnswer {
  questionId: number;
  answerIndex: number;
  score: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'alert' | 'info' | 'critical' | 'ritual';
  timestamp: number;
}
