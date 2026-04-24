export const journeyConfigs = {
  guest: {
    label: 'Guest',
    badgeColor: 'blue',
    sections: ['PersonalDetails', 'PaymentForm'],
    features: {
      showLoyaltyPoints: false,
      showPromoCode: false,
      showAdminPanel: false,
      showAvatar: false,
      showWelcomeBanner: true,
    },
    fields: {
      PersonalDetails: ['First Name', 'Last Name', 'Email Address'],
      PaymentForm: ['Card Number', 'Expiry Date', 'CVV'],
    },
    dashboardWidgets: ['RecentOrders', 'BrowsingHistory'],
  },

  member: {
    label: 'Member',
    badgeColor: 'green',
    sections: ['PersonalDetails', 'Loyalty', 'PaymentForm'],
    features: {
      showLoyaltyPoints: true,
      showPromoCode: true,
      showAdminPanel: false,
      showAvatar: true,
      showWelcomeBanner: true,
    },
    fields: {
      PersonalDetails: ['First Name', 'Last Name', 'Email Address', 'Phone', 'Membership ID'],
      Loyalty: ['Points Balance', 'Tier Status', 'Redeem Code'],
      PaymentForm: ['Card Number', 'Expiry Date', 'CVV', 'Billing Address'],
    },
    dashboardWidgets: ['LoyaltyPoints', 'RecentOrders', 'RewardOffers', 'MemberBenefits'],
  },

  admin: {
    label: 'Admin',
    badgeColor: 'red',
    sections: ['PersonalDetails', 'Loyalty', 'PaymentForm'],
    features: {
      showLoyaltyPoints: true,
      showPromoCode: true,
      showAdminPanel: true,
      showAvatar: true,
      showWelcomeBanner: false,
    },
    fields: {
      PersonalDetails: ['First Name', 'Last Name', 'Email Address', 'Phone', 'Membership ID', 'Admin Role'],
      Loyalty: ['Points Balance', 'Tier Status', 'Override Privileges'],
      PaymentForm: ['Card Number', 'Expiry Date', 'CVV', 'Billing Address', 'Payment Method Override'],
    },
    dashboardWidgets: ['UserManagement', 'Analytics', 'LoyaltyPoints', 'RecentOrders', 'SystemAlerts', 'AuditLog'],
  },
};

export const ALL_SECTIONS = ['PersonalDetails', 'Loyalty', 'PaymentForm'];

export const ALL_WIDGETS = [
  'UserManagement',
  'Analytics',
  'LoyaltyPoints',
  'RecentOrders',
  'RewardOffers',
  'MemberBenefits',
  'BrowsingHistory',
  'SystemAlerts',
  'AuditLog',
];
