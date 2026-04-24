export type JourneyKey = 'guest' | 'member' | 'admin';

export interface JourneyFeatures {
  showLoyaltyPoints: boolean;
  showPromoCode: boolean;
  showAdminPanel: boolean;
  showAvatar: boolean;
  showWelcomeBanner: boolean;
}

export interface JourneyConfig {
  label: string;
  badgeColor: string;
  sections: string[];
  features: JourneyFeatures;
  fields: Partial<Record<string, string[]>>;
  dashboardWidgets: string[];
}

export type JourneyConfigs = Record<JourneyKey, JourneyConfig>;

export interface HiddenItem {
  name: string;
  reason: string;
}

export type PatternNumber = 1 | 2 | 3 | 4 | 5;
