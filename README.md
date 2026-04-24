# Journey Patterns — Developer Guide

> **Who this is for:** Newly onboarded developers joining the team.
> By the end of this guide you will understand what a "journey" is, why we manage
> them the way we do, and exactly how to work with each of the four patterns we use
> in this codebase. No prior knowledge of these patterns is assumed.

---

## Table of Contents

1. [First Things First — Run the App](#1-first-things-first--run-the-app)
2. [What Is a Journey?](#2-what-is-a-journey)
3. [The Problem We Are Solving](#3-the-problem-we-are-solving)
4. [Project Structure at a Glance](#4-project-structure-at-a-glance)
5. [Atomic Design — How Our Components Are Organised](#5-atomic-design--how-our-components-are-organised)
6. [The Journey Config — Your Source of Truth](#6-the-journey-config--your-source-of-truth)
7. [JourneyProvider and useJourney — The Wiring](#7-journeyprovider-and-usejourney--the-wiring)
8. [Redux Store — Global Journey State](#8-redux-store--global-journey-state)
9. [Pattern 1 — Config-Driven Rendering](#9-pattern-1--config-driven-rendering)
10. [Pattern 2 — Slot / Render Props](#10-pattern-2--slot--render-props)
11. [Pattern 3 — Context / Feature Flags](#11-pattern-3--context--feature-flags)
12. [Pattern 4 — HOC / Factory](#12-pattern-4--hoc--factory)
13. [How to Choose a Pattern](#13-how-to-choose-a-pattern)
14. [How to Add a New Journey](#14-how-to-add-a-new-journey)
15. [How to Add a New Section or Widget](#15-how-to-add-a-new-section-or-widget)
16. [The Rules — Things You Must Not Do](#16-the-rules--things-you-must-not-do)
17. [Quick Reference Card](#17-quick-reference-card)

---

## 1. First Things First — Run the App

```bash
cd journey-patterns-app
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

You will see a home page with four pattern cards. Each card has clickable links for
**guest**, **member**, and **admin** journeys. Click through all of them. Spend 10
minutes just navigating before reading further — you will understand this guide much
better once you have seen the output.

---

## 2. What Is a Journey?

A **journey** is the role and context a user is in when they visit a page.

In this app we have three journeys:

| Journey | Who they are | Badge colour |
|---------|-------------|--------------|
| `guest` | Anonymous visitor, not logged in | Blue |
| `member` | Logged-in customer with a membership | Green |
| `admin` | Internal staff with elevated privileges | Red |

The same URL can serve completely different UI depending on the journey. For example,
`/pattern3/guest` shows a profile page with no avatar, no loyalty points, and no
promo codes. `/pattern3/admin` shows the exact same page but now the avatar, loyalty
points, promo section, AND an admin control panel are all visible.

**The journey never changes mid-session.** It is set at the route level and flows
down through the component tree.

---

## 3. The Problem We Are Solving

Before we had these patterns, journey-specific logic looked like this:

```tsx
// ❌ The old way — do not write code like this
export default function CheckoutPage({ journeyType }: { journeyType: string }) {
  return (
    <div>
      <PersonalDetailsSection />

      {journeyType === 'member' && <LoyaltySection />}
      {journeyType === 'admin'  && <LoyaltySection />}

      <PaymentFormSection />

      {journeyType === 'member' && <PromoCodeInput />}
      {journeyType === 'admin'  && <PromoCodeInput />}
      {journeyType === 'admin'  && <AdminPanel />}
    </div>
  );
}
```

This looks fine with three journeys. Now imagine six journeys and twenty sections.
The page becomes a wall of conditionals, every new requirement touches the same file,
and every reviewer has to re-read the whole component to understand what changed.

The patterns in this repo solve that. Each pattern removes journey logic from a
different place in the tree. Which pattern to use depends on where the logic lives
and how often the page changes.

---

## 4. Project Structure at a Glance

```
journey-patterns-app/
├── src/
│   ├── types/
│   │   └── journey.ts           ← Shared TypeScript types for the whole project
│   │
│   ├── config/
│   │   └── journeyConfigs.ts    ← The master config for all journeys
│   │
│   ├── store/                   ← Redux Toolkit store
│   │   ├── index.ts             ← configureStore, RootState, AppDispatch
│   │   ├── journeySlice.ts      ← activeJourney slice (set/clear on route change)
│   │   └── hooks.ts             ← Typed useAppSelector / useAppDispatch
│   │
│   ├── context/
│   │   └── JourneyContext.tsx   ← JourneyProvider, useJourney, useJourneyFeature
│   │
│   ├── hooks/
│   │   └── useJourneyFeature.ts ← Standalone hook (same as context export)
│   │
│   ├── router/
│   │   └── index.tsx            ← All routes, each wrapped with JourneyProvider
│   │
│   ├── components/              ← Atomic Design component library
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   │
│   └── pages/
│       ├── Home.tsx
│       ├── pattern1-config-driven/
│       ├── pattern2-slot/
│       ├── pattern3-context/
│       └── pattern4-hoc/
```

Each `pages/pattern*/` folder is self-contained. The files inside it only implement
that one pattern. You should be able to read a single pattern folder from top to
bottom without needing to jump to other folders (except to look at the shared
`journeyConfigs.ts` and context).

---

## 5. Atomic Design — How Our Components Are Organised

Our component library follows **Atomic Design**, a methodology that organises
components by complexity — from the smallest possible piece up to full page layouts.

Think of it like building with Lego:

```
atoms      → individual bricks (Button, Input, Label, Dot, Badge)
molecules  → small assemblies of bricks (FormField, NavItem, SummaryRow, WidgetCard)
organisms  → meaningful sections built from molecules (Sidebar, ComparisonTable)
templates  → page-level shells that hold organisms and a content slot (AppShell, PageLayout)
pages      → the actual page instances that live inside templates
```

### The five levels in our codebase

#### Atoms — `src/components/atoms/`

The smallest, most primitive pieces. An atom does one thing and has no knowledge
of any other component.

| File | What it is |
|------|-----------|
| `Badge.tsx` | Coloured pill label (guest/member/admin or pattern number) |
| `Button.tsx` | Styled button with variant props (primary, secondary, ghost, danger, success, warning) |
| `Dot.tsx` | Tiny coloured circle used to indicate journey type |
| `Input.tsx` | A single styled `<input>` element with focus colour variants |
| `Label.tsx` | A styled `<label>` with optional hint and tag text |

**Rule:** An atom must not import from molecules, organisms, or templates.
The only allowed imports are other atoms or external libraries.

#### Molecules — `src/components/molecules/`

A molecule combines two or more atoms into a small, reusable UI pattern.

| File | What it does |
|------|-------------|
| `FormField.tsx` | Composes `Label` + `Input` into a labelled form field |
| `NavItem.tsx` | Composes `Dot` + `NavLink` + journey pill into a sidebar link |
| `SectionBlock.tsx` | A bordered labelled container that visually shows "rendered" or "hidden" |
| `SummaryRow.tsx` | A label/value row used in order summaries |
| `WidgetCard.tsx` | A dashboard widget tile with icon, name, and active/inactive states |
| `Card.tsx` | A generic white box with optional title and subtitle |

**Rule:** A molecule may import atoms, but must not import organisms or templates.

#### Organisms — `src/components/organisms/`

An organism is a significant, self-contained section of UI. It typically owns its
own data (or reads from context/store) and produces a visually complete block.

| File | What it does |
|------|-------------|
| `Sidebar.tsx` | The full left navigation panel — brand, nav groups, active journey footer |
| `PatternExplanationPanel.tsx` | The collapsible "Pattern Explanation" card on every pattern page |
| `HiddenItemsPanel.tsx` | The amber "What's Hidden & Why" warning box |
| `PatternCardGrid.tsx` | The 2×2 grid of pattern cards on the Home page |
| `ComparisonTable.tsx` | The full pattern comparison table on the Home page |

**Rule:** An organism may import atoms and molecules. It may also read from
React Context or the Redux store via `useAppSelector`. It must not import templates or pages.

#### Templates — `src/components/templates/`

A template defines a page-level layout shell. It positions organisms and provides
a slot (via `<Outlet />` or `children`) where page content flows in.

| File | What it does |
|------|-------------|
| `AppShell.tsx` | The outer frame: sidebar + topbar + `<Outlet />` for page content |
| `PageLayout.tsx` | The inner page wrapper: journey banner + explanation panel + hidden items panel + `children` |

**Rule:** A template orchestrates organisms and provides layout structure.
It must not contain page-specific business logic.

#### Pages — `src/pages/`

Pages are the specific instances. They know which journey they belong to, what the
page content is, and how to pass props into the templates.

**Rule:** A page calls `useJourney()` or `useJourneyFeature()` from context.
It must not contain raw HTML layout structure — that belongs in templates.

### Importing between levels

Each level has a barrel file (`index.ts`) so you can use named imports:

```tsx
// Instead of this:
import Badge  from '../components/atoms/Badge';
import Button from '../components/atoms/Button';

// You can write this:
import { Badge, Button } from '../components/atoms';
```

The full import chain is always **downward only**:

```
pages → templates → organisms → molecules → atoms
```

A molecule must never import from an organism. An atom must never import from
a molecule. Breaking this direction makes the library impossible to reason about.

---

## 6. The Journey Config — Your Source of Truth

Open `src/config/journeyConfigs.ts`. This is the **single file you edit when a
journey's behaviour changes**. Every pattern in this repo reads from it.

```ts
import type { JourneyConfigs } from '../types/journey';

export const journeyConfigs: JourneyConfigs = {
  guest: {
    label: 'Guest',
    badgeColor: 'blue',

    // Pattern 1 uses this — the ordered list of sections to render
    sections: ['PersonalDetails', 'PaymentForm'],

    // Pattern 3 uses this — feature flags that sections read individually
    features: {
      showLoyaltyPoints: false,
      showPromoCode:     false,
      showAdminPanel:    false,
      showAvatar:        false,
      showWelcomeBanner: true,
    },

    // Pattern 1 uses this — field lists passed as props to each section
    fields: {
      PersonalDetails: ['First Name', 'Last Name', 'Email Address'],
      PaymentForm:     ['Card Number', 'Expiry Date', 'CVV'],
    },

    // Pattern 4 uses this — widgets to render in the dashboard
    dashboardWidgets: ['RecentOrders', 'BrowsingHistory'],
  },

  member: { /* ... */ },
  admin:  { /* ... */ },
};
```

**Important:** Adding a journey = adding a new key here. Adding a section to a
journey = adding the key to `sections`. Toggling a feature = changing `true`/`false`.
You almost never need to touch page components to make configuration changes.

### Shared TypeScript types

All shared types live in `src/types/journey.ts`. The most important ones:

```ts
export type JourneyKey = 'guest' | 'member' | 'admin';

export interface JourneyFeatures {
  showLoyaltyPoints: boolean;
  showPromoCode:     boolean;
  showAdminPanel:    boolean;
  showAvatar:        boolean;
  showWelcomeBanner: boolean;
}

export interface JourneyConfig {
  label:            string;
  badgeColor:       string;
  sections:         string[];
  features:         JourneyFeatures;
  fields:           Partial<Record<string, string[]>>;
  dashboardWidgets: string[];
}

export type JourneyConfigs = Record<JourneyKey, JourneyConfig>;
```

TypeScript will tell you immediately if you add a new feature flag to
`JourneyFeatures` without updating all three journey configs.

---

## 7. JourneyProvider and useJourney — The Wiring

Before any pattern can work, the journey must be made available to the component tree.
This is done in the router.

### How routes are set up

In `src/router/index.tsx` every route wraps its page component in `<JourneyProvider>`:

```tsx
function wrap(Component: ComponentType, journey: JourneyKey): ReactElement {
  return (
    <JourneyProvider journey={journey}>
      <Component />
    </JourneyProvider>
  );
}

// Route definitions:
{ path: 'pattern1/guest',  element: wrap(Pattern1Entry, 'guest') },
{ path: 'pattern1/member', element: wrap(Pattern1Entry, 'member') },
```

`JourneyProvider` does two things:

1. Looks up `journeyConfigs[journey]` and places both `journey` (the string key)
   and `config` (the full config object) into React Context.
2. Dispatches `setActiveJourney(journey)` to the Redux store so the sidebar and
   topbar can read the active journey without being inside the `JourneyProvider` tree.
   On unmount it dispatches `setActiveJourney(null)` to clear the state.

### Reading the journey in a component

Any component inside a `<JourneyProvider>` can call:

```tsx
import { useJourney } from '../context/JourneyContext';

const { journey, config } = useJourney();
// journey → 'guest' | 'member' | 'admin'
// config  → the full JourneyConfig object for the active journey
```

To read a single feature flag:

```tsx
import { useJourneyFeature } from '../hooks/useJourneyFeature';

const showAvatar = useJourneyFeature('showAvatar');
// returns true or false — reads config.features.showAvatar for the current journey
// TypeScript enforces that 'showAvatar' is a valid key of JourneyFeatures
```

---

## 8. Redux Store — Global Journey State

### Why we use Redux here

`JourneyProvider` only exists inside a route's subtree. The `Sidebar` and topbar
(`AppShell`) sit **outside** every `JourneyProvider` — they are part of the outer
shell layout. They need to know the active journey to highlight the correct nav link
and show the journey badge in the topbar.

We use **Redux Toolkit (RTK)** for this single piece of global state.

### Store layout

```
src/store/
├── index.ts          ← configureStore + exported RootState / AppDispatch types
├── journeySlice.ts   ← the one slice: { activeJourney: JourneyKey | null }
└── hooks.ts          ← typed wrappers around useSelector / useDispatch
```

### The journey slice

```ts
// src/store/journeySlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { JourneyKey } from '../types/journey';

interface JourneyState {
  activeJourney: JourneyKey | null;
}

const initialState: JourneyState = { activeJourney: null };

export const journeySlice = createSlice({
  name: 'journey',
  initialState,
  reducers: {
    setActiveJourney: (state, action: PayloadAction<JourneyKey | null>) => {
      state.activeJourney = action.payload;
    },
  },
});

export const { setActiveJourney } = journeySlice.actions;
export default journeySlice.reducer;
```

### Typed hooks

Always use the typed hooks — never the raw `useSelector` / `useDispatch`:

```ts
// src/store/hooks.ts
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Reading from the store (outside JourneyProvider)

```tsx
// Used in AppShell.tsx and Sidebar.tsx — both live outside JourneyProvider
import { useAppSelector } from '../../store/hooks';

const activeJourney = useAppSelector((state) => state.journey.activeJourney);
// activeJourney is typed as JourneyKey | null
```

### Writing to the store (JourneyContext.tsx does this automatically)

You do not normally dispatch `setActiveJourney` yourself. `JourneyProvider` handles
it for you on mount and unmount. Here is how it works inside the provider:

```tsx
// src/context/JourneyContext.tsx
export function JourneyProvider({ journey, children }: { journey: JourneyKey; children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveJourney(journey));          // set on mount
    return () => { dispatch(setActiveJourney(null)); }; // clear on unmount
  }, [journey, dispatch]);

  // ... provides journey + config via Context
}
```

### Where the Provider is mounted

The Redux `<Provider>` wraps the entire app in `src/App.tsx`, so every component
in the tree — including those outside `JourneyProvider` — can call `useAppSelector`:

```tsx
// src/App.tsx
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
```

---

## 9. Pattern 1 — Config-Driven Rendering

**The core idea:** The page reads an ordered array from the config and loops over it.
A registry object maps string keys to React components. The page never knows which
specific sections it is rendering — it just loops and resolves.

### Key files

```
src/pages/pattern1-config-driven/
├── index.tsx                    ← Route entry, renders CheckoutPage
├── CheckoutPage.tsx             ← The pattern implementation
└── sections/
    ├── PersonalDetailsSection.tsx
    ├── LoyaltySection.tsx
    └── PaymentFormSection.tsx
```

### How it works

`CheckoutPage.tsx` is the entire pattern in one look:

```tsx
import type { ComponentType } from 'react';

interface SectionProps { fields: string[]; }

// The registry maps config string keys → React components
const sectionRegistry: Record<string, ComponentType<SectionProps>> = {
  PersonalDetails: PersonalDetailsSection,
  Loyalty:         LoyaltySection,
  PaymentForm:     PaymentFormSection,
};

export default function CheckoutPage() {
  const { journey, config } = useJourney();

  return (
    <PageLayout ...>
      {config.sections.map((sectionKey) => {
        const SectionComponent = sectionRegistry[sectionKey];
        const fields = (config.fields?.[sectionKey] ?? []) as string[];
        return (
          <SectionBlock key={sectionKey} title={sectionKey}>
            <SectionComponent fields={fields} />
          </SectionBlock>
        );
      })}
    </PageLayout>
  );
}
```

For the **guest** journey, `config.sections` is `['PersonalDetails', 'PaymentForm']`
so only two sections render. For **member** it is
`['PersonalDetails', 'Loyalty', 'PaymentForm']` — three sections, no code change.

### What makes this pattern work

- `CheckoutPage.tsx` contains **zero `if` statements** about journeys.
- The **order** of sections is controlled by the config array — reordering sections
  across journeys is a config change, not a code change.
- Each section receives its field list as a prop (`fields={fields}`), so sections
  are also data-driven.

### When you need to add a new section

**Step 1** — Create the section component:

```tsx
// src/pages/pattern1-config-driven/sections/AddressSection.tsx
import FormField from '../../../components/molecules/FormField';

interface AddressSectionProps { fields?: string[]; }

export default function AddressSection({ fields = [] }: AddressSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {fields.map((field) => (
        <FormField key={field} label={field} />
      ))}
    </div>
  );
}
```

**Step 2** — Register it in `CheckoutPage.tsx`:

```tsx
import AddressSection from './sections/AddressSection';

const sectionRegistry: Record<string, ComponentType<SectionProps>> = {
  PersonalDetails: PersonalDetailsSection,
  Loyalty:         LoyaltySection,
  PaymentForm:     PaymentFormSection,
  Address:         AddressSection,     // ← add this line
};
```

**Step 3** — Add it to the journeys that need it in `journeyConfigs.ts`:

```ts
member: {
  sections: ['PersonalDetails', 'Loyalty', 'Address', 'PaymentForm'], // ← add 'Address'
  fields: {
    Address: ['Street', 'City', 'Postal Code'],  // ← add field list
  },
}
```

`CheckoutPage.tsx` itself never changed. The guest journey is unaffected.

### When NOT to use this pattern

- When sections have complex inter-dependencies (section A needs data from section B).
- When the layout of sections differs drastically between journeys (use Pattern 2).
- When sections are not ordered lists but rather conditional blocks (use Pattern 3).

---

## 10. Pattern 2 — Slot / Render Props

**The core idea:** A "shell" component defines a layout structure with named slots.
Journey-specific pages choose what to put in each slot. The shell knows nothing
about journeys — it only knows slot names.

### Key files

```
src/pages/pattern2-slot/
├── CheckoutShell.tsx            ← The dumb shell (no journey logic at all)
├── GuestJourneyPage.tsx         ← Knows about GuestForm + GuestSummary
├── MemberJourneyPage.tsx        ← Knows about MemberForm + MemberSummary
└── components/
    ├── GuestForm.tsx
    ├── MemberForm.tsx
    ├── GuestSummary.tsx
    └── MemberSummary.tsx
```

### How it works

`CheckoutShell.tsx` is the contract:

```tsx
import type { ReactNode } from 'react';
import type { JourneyKey } from '../../types/journey';

interface CheckoutShellProps {
  headerSlot:  ReactNode;
  formSlot:    ReactNode;
  summarySlot: ReactNode;
  journey:     JourneyKey;
}

export default function CheckoutShell({ headerSlot, formSlot, summarySlot }: CheckoutShellProps) {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-3">{headerSlot}</div>
      <div className="col-span-2">{formSlot}</div>
      <div className="col-span-1">{summarySlot}</div>
    </div>
  );
}
```

`GuestJourneyPage.tsx` fills the slots:

```tsx
export default function GuestJourneyPage() {
  const { journey } = useJourney();
  return (
    <PageLayout ...>
      <CheckoutShell
        journey={journey}
        headerSlot={<div>Guest Checkout Header</div>}
        formSlot={<GuestForm />}
        summarySlot={<GuestSummary />}
      />
    </PageLayout>
  );
}
```

`MemberJourneyPage.tsx` uses **the identical shell** but injects different components:

```tsx
<CheckoutShell
  journey={journey}
  headerSlot={<div>Member Checkout Header</div>}
  formSlot={<MemberForm />}       // ← different
  summarySlot={<MemberSummary />} // ← different
/>
```

### What makes this pattern work

- `CheckoutShell.tsx` has **zero imports from journey-specific files**.
  It renders exactly what is handed to it.
- **GuestJourneyPage** and **MemberJourneyPage** are the only files that know which
  components go together. This knowledge is explicit and co-located.
- Adding a new journey (e.g. `VIPJourneyPage.tsx`) means creating one new file.
  The shell is not touched.

### How slots differ from just passing `children`

A single `children` prop is unnamed — you cannot tell a component "put this part in
the header and that part in the footer". Named slots solve that. Compare:

```tsx
// ❌ Too broad — the shell cannot control layout
<CheckoutShell>
  <GuestForm />
  <GuestSummary />
</CheckoutShell>

// ✅ Shell controls exact placement of each slot
<CheckoutShell
  formSlot={<GuestForm />}
  summarySlot={<GuestSummary />}
/>
```

### When NOT to use this pattern

- When all journeys share exactly the same inner components (just different data).
  Use Pattern 1 or Pattern 3 instead.
- When there are ten or more slots. That is a sign the shell is doing too much —
  break it into smaller shells.

---

## 11. Pattern 3 — Context / Feature Flags

**The core idea:** Feature flags live in the journey config. Each section component
reads its own flag and decides for itself whether to render. The parent page renders
every section unconditionally — it has no visibility logic at all.

### Key files

```
src/pages/pattern3-context/
├── index.tsx                    ← Route entry
├── ProfilePage.tsx              ← Renders ALL sections, zero conditionals
└── sections/
    ├── ProfileHeader.tsx        ← Reads showAvatar
    ├── LoyaltyPointsSection.tsx ← Reads showLoyaltyPoints, returns null if false
    ├── PromoSection.tsx         ← Reads showPromoCode, returns null if false
    └── AdminPanel.tsx           ← Reads showAdminPanel, returns null if false
```

### How it works

`ProfilePage.tsx` — the parent page:

```tsx
export default function ProfilePage() {
  return (
    <PageLayout ...>
      <ProfileHeader />
      <LoyaltyPointsSection />
      <PromoSection />
      <AdminPanel />
    </PageLayout>
  );
}
```

That is the entire component. No `if`, no ternaries, no journey checks.

Each section handles its own visibility. Here is `LoyaltyPointsSection.tsx`:

```tsx
export default function LoyaltyPointsSection() {
  const show = useJourneyFeature('showLoyaltyPoints');
  // TypeScript enforces 'showLoyaltyPoints' is a valid key of JourneyFeatures

  if (!show) return <SectionBlock title="LoyaltyPointsSection" hidden />;

  return (
    <SectionBlock title="LoyaltyPointsSection">
      {/* ... loyalty points UI ... */}
    </SectionBlock>
  );
}
```

And `PromoSection.tsx`:

```tsx
export default function PromoSection() {
  const show = useJourneyFeature('showPromoCode');

  if (!show) return <SectionBlock title="PromoSection" hidden />;

  return (
    <SectionBlock title="PromoSection">
      {/* ... promo code UI ... */}
    </SectionBlock>
  );
}
```

Each section's visibility logic is documented right there in the file. A developer
reading `PromoSection.tsx` immediately knows the exact condition under which this
section is shown — they do not need to search for it in a parent component.

### The feature flags for each journey

From `journeyConfigs.ts`:

```ts
guest: {
  features: {
    showLoyaltyPoints: false,   // LoyaltyPointsSection → returns null
    showPromoCode:     false,   // PromoSection → returns null
    showAdminPanel:    false,   // AdminPanel → returns null
    showAvatar:        false,   // ProfileHeader → renders without avatar
    showWelcomeBanner: true,    // ProfileHeader → shows the welcome message
  }
}

admin: {
  features: {
    showLoyaltyPoints: true,
    showPromoCode:     true,
    showAdminPanel:    true,    // AdminPanel → renders admin controls
    showAvatar:        true,
    showWelcomeBanner: false,   // ProfileHeader → no welcome banner (admins don't need it)
  }
}
```

### When you need to add a new feature-flagged section

**Step 1** — Add the feature flag to the `JourneyFeatures` interface in `src/types/journey.ts`:

```ts
export interface JourneyFeatures {
  showLoyaltyPoints: boolean;
  showPromoCode:     boolean;
  showAdminPanel:    boolean;
  showAvatar:        boolean;
  showWelcomeBanner: boolean;
  showNewWidget:     boolean;  // ← add here first
}
```

TypeScript will now error on every journey config that is missing `showNewWidget`,
guiding you to update all of them.

**Step 2** — Add the flag to all journeys in `journeyConfigs.ts`:

```ts
guest:  { features: { showNewWidget: false } },
member: { features: { showNewWidget: true  } },
admin:  { features: { showNewWidget: true  } },
```

**Step 3** — Create the section:

```tsx
// src/pages/pattern3-context/sections/NewWidgetSection.tsx
import { useJourneyFeature } from '../../../hooks/useJourneyFeature';
import SectionBlock from '../../../components/molecules/SectionBlock';

export default function NewWidgetSection() {
  const show = useJourneyFeature('showNewWidget');
  if (!show) return <SectionBlock title="NewWidgetSection" hidden />;

  return (
    <SectionBlock title="NewWidgetSection">
      <p>New widget content here</p>
    </SectionBlock>
  );
}
```

**Step 4** — Add it to `ProfilePage.tsx`:

```tsx
import NewWidgetSection from './sections/NewWidgetSection';

export default function ProfilePage() {
  return (
    <PageLayout ...>
      <ProfileHeader />
      <LoyaltyPointsSection />
      <PromoSection />
      <AdminPanel />
      <NewWidgetSection />   {/* ← just drop it in */}
    </PageLayout>
  );
}
```

No conditionals. No journey checks. Done.

### When NOT to use this pattern

- When the sections are also **ordered differently** between journeys. Pattern 1
  handles ordering better.
- When a feature flag requires a network call to evaluate. This pattern assumes flags
  are synchronous values from the config.
- When you need to A/B test flags dynamically at runtime (consider a proper feature
  flag service instead).

---

## 12. Pattern 4 — HOC / Factory

**The core idea:** A Higher-Order Component (HOC) wraps a base component and injects
a pre-loaded config as a prop. The base component is a pure function — it only
knows about the `config` prop and never touches the journey system directly.

### Key files

```
src/pages/pattern4-hoc/
├── withJourneyConfig.tsx    ← The generic HOC factory function
├── BaseDashboard.tsx        ← Pure base component — only receives config prop
├── GuestDashboard.tsx       ← One line: withJourneyConfig(BaseDashboard, 'guest')
├── MemberDashboard.tsx      ← One line: withJourneyConfig(BaseDashboard, 'member')
└── AdminDashboard.tsx       ← One line: withJourneyConfig(BaseDashboard, 'admin')
```

### How it works

The HOC — `withJourneyConfig.tsx`:

```tsx
import type { ComponentType } from 'react';
import { journeyConfigs } from '../../config/journeyConfigs';
import type { JourneyKey, JourneyConfig } from '../../types/journey';

export interface WithJourneyConfigProps {
  config: JourneyConfig;
}

export default function withJourneyConfig<P extends WithJourneyConfigProps>(
  BaseComponent: ComponentType<P>,
  journeyKey: JourneyKey,
): ComponentType<Omit<P, 'config'>> {
  const config = journeyConfigs[journeyKey];

  function WrappedComponent(props: Omit<P, 'config'>) {
    return <BaseComponent {...(props as P)} config={config} />;
  }

  WrappedComponent.displayName = `${config.label}Dashboard`;
  return WrappedComponent;
}
```

`BaseDashboard.tsx` — the pure base (note: no import of `journeyConfigs`):

```tsx
import type { WithJourneyConfigProps } from './withJourneyConfig';

export default function BaseDashboard({ config }: WithJourneyConfigProps) {
  // config was injected by the HOC — BaseDashboard never calls useJourney()
  return (
    <PageLayout ...>
      <div className="grid grid-cols-3 gap-3">
        {config.dashboardWidgets.map((name) => (
          <WidgetCard key={name} name={name} active />
        ))}
      </div>
    </PageLayout>
  );
}
```

Each variant file is a single line:

```tsx
// GuestDashboard.tsx
import BaseDashboard from './BaseDashboard';
import withJourneyConfig from './withJourneyConfig';

export default withJourneyConfig(BaseDashboard, 'guest');
```

```tsx
// MemberDashboard.tsx
export default withJourneyConfig(BaseDashboard, 'member');

// AdminDashboard.tsx
export default withJourneyConfig(BaseDashboard, 'admin');
```

### What makes this pattern powerful

The HOC is the perfect injection point for cross-cutting concerns. In a production
application the HOC can be extended to also inject:

```tsx
function WrappedComponent(props: Omit<P, 'config'>) {
  return (
    <ErrorBoundary journey={journeyKey}>
      <AnalyticsTracker journeyKey={journeyKey}>
        <BaseComponent {...(props as P)} config={config} />
      </AnalyticsTracker>
    </ErrorBoundary>
  );
}
```

Adding error boundaries, analytics tracking, or permission checks for every journey
becomes a single code change in the HOC — not a change in every variant file.

### Adding a new journey variant

```tsx
// PremiumDashboard.tsx — that's the whole file
import BaseDashboard from './BaseDashboard';
import withJourneyConfig from './withJourneyConfig';

export default withJourneyConfig(BaseDashboard, 'premium');
```

You also need to:
1. Add `premium` to `JourneyKey` in `src/types/journey.ts`
2. Add `premium` to `journeyConfigs.ts` with `dashboardWidgets: [...]`
3. Register the route in `src/router/index.tsx`

`BaseDashboard.tsx` is never touched.

### When NOT to use this pattern

- When variants need **fundamentally different layouts** (not just different data).
  Use Pattern 2 instead.
- When the injected config is dynamic or changes at runtime. HOCs inject at
  module load time — the config is fixed at the point the HOC is called.

---

## 13. How to Choose a Pattern

Use this decision tree when starting a new journey-aware page:

```
Does the page render a variable list of sections that can be reordered per journey?
│
├─ YES → Use Pattern 1 (Config-Driven)
│        Best when: section list and field list differ between journeys
│
└─ NO → Is the layout structure the same but inner components are completely different?
        │
        ├─ YES → Use Pattern 2 (Slot / Render Props)
        │        Best when: shell stays, but forms/summaries/headers swap out
        │
        └─ NO → Does the page have a fixed list of sections some of which may be hidden?
                │
                ├─ YES → Use Pattern 3 (Context / Feature Flags)
                │        Best when: same page for all journeys, sections self-show/hide
                │
                └─ NO → Are you building a dashboard or data-driven widget grid?
                        │
                        └─ YES → Use Pattern 4 (HOC / Factory)
                                 Best when: base layout is shared but content is config-driven
```

### Quick comparison

| | Pattern 1 | Pattern 2 | Pattern 3 | Pattern 4 |
|---|---|---|---|---|
| Journey logic in page? | None | None | None | None |
| Where is journey logic? | Config array | Journey page files | Section components | HOC |
| Sections ordered by config? | ✅ Yes | ❌ No | ❌ No | Partial |
| Sections self-hide? | ❌ No | ❌ No | ✅ Yes | ❌ No |
| New journey = new file? | No | Yes | No | Yes (1 line) |
| Config-driven field lists? | ✅ Yes | Manually | ❌ No | ✅ Yes |
| Best at | Flexible forms | Different inner components | Feature toggling | Shared base, variant config |

---

## 14. How to Add a New Journey

Adding a new journey (e.g. `vip`) is the same process across all patterns.

### Step 1 — Add the type to `src/types/journey.ts`

```ts
export type JourneyKey = 'guest' | 'member' | 'admin' | 'vip'; // ← add 'vip'
```

TypeScript will now flag every `Record<JourneyKey, ...>` that is missing the `vip` key.

### Step 2 — Add to `journeyConfigs.ts`

```ts
export const journeyConfigs: JourneyConfigs = {
  guest:  { /* existing */ },
  member: { /* existing */ },
  admin:  { /* existing */ },

  vip: {
    label: 'VIP',
    badgeColor: 'purple',
    sections: ['PersonalDetails', 'Loyalty', 'PaymentForm'],
    features: {
      showLoyaltyPoints: true,
      showPromoCode:     true,
      showAdminPanel:    false,
      showAvatar:        true,
      showWelcomeBanner: true,
    },
    fields: {
      PersonalDetails: ['First Name', 'Last Name', 'Email', 'Concierge Code'],
      Loyalty:         ['Points Balance', 'VIP Tier', 'Dedicated Manager'],
      PaymentForm:     ['Card Number', 'Expiry Date', 'CVV'],
    },
    dashboardWidgets: ['LoyaltyPoints', 'RecentOrders', 'VIPConcierge', 'RewardOffers'],
  },
};
```

### Step 3 — Register routes in `src/router/index.tsx`

```tsx
// For patterns that support it, just add routes
{ path: 'pattern1/vip',  element: wrap(Pattern1Entry, 'vip') },
{ path: 'pattern3/vip',  element: wrap(Pattern3Entry, 'vip') },
{ path: 'pattern4/vip',  element: wrap(VIPDashboard,  'vip') },
```

### Step 4 — For Pattern 2, create a new journey page

```tsx
// src/pages/pattern2-slot/VIPJourneyPage.tsx
import { useJourney } from '../../context/JourneyContext';
import PageLayout from '../../components/templates/PageLayout';
import CheckoutShell from './CheckoutShell';
import VIPForm from './components/VIPForm';
import VIPSummary from './components/VIPSummary';

export default function VIPJourneyPage() {
  const { journey } = useJourney();
  return (
    <PageLayout pattern="Pattern 2 · Slot / Render Props" patternNumber={2} ...>
      <CheckoutShell
        journey={journey}
        headerSlot={<div>VIP Checkout</div>}
        formSlot={<VIPForm />}
        summarySlot={<VIPSummary />}
      />
    </PageLayout>
  );
}
```

### Step 5 — For Pattern 4, create a one-line variant file

```tsx
// src/pages/pattern4-hoc/VIPDashboard.tsx
import BaseDashboard from './BaseDashboard';
import withJourneyConfig from './withJourneyConfig';

export default withJourneyConfig(BaseDashboard, 'vip');
```

### Step 6 — Add the journey to the sidebar

In `src/components/organisms/Sidebar.tsx`, add entries to the relevant `NAV_GROUPS`:

```ts
{
  id: 'pattern1',
  items: [
    { label: 'Guest Checkout', path: '/pattern1/guest',  journey: 'guest' },
    { label: 'Member Checkout', path: '/pattern1/member', journey: 'member' },
    { label: 'VIP Checkout',   path: '/pattern1/vip',    journey: 'vip'   }, // ← add
  ],
}
```

---

## 15. How to Add a New Section or Widget

### Adding a section (Patterns 1 and 3)

Sections live in the `sections/` folder of their pattern.

**For Pattern 1 (config-driven):**
1. Create `sections/MyNewSection.tsx` — accepts a `fields` prop typed as `string[]`
2. Register it in `sectionRegistry` inside `CheckoutPage.tsx`
3. Add the key to `config.sections` and `config.fields` for relevant journeys

**For Pattern 3 (feature flags):**
1. Add the feature key to `JourneyFeatures` in `src/types/journey.ts`
2. Add `true`/`false` values to all journeys in `journeyConfigs.ts`
3. Create `sections/MyNewSection.tsx` — calls `useJourneyFeature('myFeatureKey')`
4. Return `<SectionBlock hidden />` if the feature is off
5. Add `<MyNewSection />` to `ProfilePage.tsx`

### Adding a widget (Pattern 4)

1. Add the widget name to `dashboardWidgets` for relevant journeys in `journeyConfigs.ts`
2. Add an entry to `WIDGET_META` in `src/components/molecules/WidgetCard.tsx`:
   ```ts
   MyNewWidget: { icon: '🆕', color: 'border-teal-200 bg-teal-50/80 text-teal-700', hover: 'hover:border-teal-300' },
   ```
3. Add the name to `ALL_WIDGETS` in `journeyConfigs.ts` (so it appears in the
   "suppressed" section for journeys that don't have it)

---

## 16. The Rules — Things You Must Not Do

These rules exist because we have seen them cause problems in production. They are
not suggestions.

---

### Rule 1 — Never write journey checks inside a page that uses Pattern 1

```tsx
// ❌ This destroys the point of config-driven rendering
export default function CheckoutPage() {
  const { journey } = useJourney();
  return (
    <div>
      {journey !== 'guest' && <LoyaltySection />}  {/* WRONG */}
      <PaymentFormSection />
    </div>
  );
}

// ✅ Config drives it — no if needed
export default function CheckoutPage() {
  const { config } = useJourney();
  return (
    <div>
      {config.sections.map((key) => {
        const Section = sectionRegistry[key];
        return <Section key={key} fields={(config.fields?.[key] ?? []) as string[]} />;
      })}
    </div>
  );
}
```

---

### Rule 2 — Never put journey logic inside CheckoutShell (Pattern 2)

```tsx
// ❌ The shell should not know what a 'member' is
export default function CheckoutShell({ journey, formSlot }: CheckoutShellProps) {
  return (
    <div>
      {journey === 'member' && <LoyaltyBanner />}  {/* WRONG */}
      {formSlot}
    </div>
  );
}

// ✅ Journey pages inject everything — shell renders blindly
export default function CheckoutShell({ headerSlot, formSlot, summarySlot }: CheckoutShellProps) {
  return (
    <div>
      {headerSlot}
      {formSlot}
      {summarySlot}
    </div>
  );
}
```

---

### Rule 3 — Never put conditionals in ProfilePage (Pattern 3)

```tsx
// ❌ The page should not think about feature flags
export default function ProfilePage() {
  const { config } = useJourney();
  return (
    <div>
      {config.features.showLoyaltyPoints && <LoyaltyPointsSection />}  {/* WRONG */}
      {config.features.showAdminPanel    && <AdminPanel />}             {/* WRONG */}
    </div>
  );
}

// ✅ Each section owns its own flag check
export default function ProfilePage() {
  return (
    <div>
      <LoyaltyPointsSection />  {/* self-hides if flag is off */}
      <AdminPanel />            {/* self-hides if flag is off */}
    </div>
  );
}
```

---

### Rule 4 — Never import journeyConfigs directly in BaseDashboard (Pattern 4)

```tsx
// ❌ BaseDashboard is supposed to be a pure component
import { journeyConfigs } from '../../config/journeyConfigs';  // WRONG

export default function BaseDashboard() {
  const config = journeyConfigs['member'];  // hard-coded — defeats the whole pattern
}

// ✅ Receive config as a prop — the HOC injects it
export default function BaseDashboard({ config }: WithJourneyConfigProps) {
  return config.dashboardWidgets.map((name) => <WidgetCard key={name} name={name} />);
}
```

---

### Rule 5 — Never break the Atomic Design import direction

```tsx
// ❌ An atom importing a molecule is a circular dependency waiting to happen
// src/components/atoms/Badge.tsx
import SectionBlock from '../molecules/SectionBlock';  // WRONG

// ✅ Atoms only import other atoms or external libraries
// src/components/atoms/Badge.tsx
import Dot from './Dot';  // OK — same level
```

---

### Rule 6 — Never hard-code journey strings in page components

```tsx
// ❌ If the journey key changes, this silently breaks
if (journey === 'memebr') { /* typo — will never match */ }

// ✅ Let the config drive rendering — the string is only in the router and config
const { config } = useJourney();
// work with config.features.* and config.sections — not raw string comparisons
```

---

### Rule 7 — Never use raw useSelector or useDispatch

```tsx
// ❌ Untyped — no autocomplete, no safety on state shape
import { useSelector } from 'react-redux';
const active = useSelector((state: any) => state.journey.activeJourney);

// ✅ Always use the typed wrappers from src/store/hooks.ts
import { useAppSelector } from '../../store/hooks';
const activeJourney = useAppSelector((state) => state.journey.activeJourney);
// activeJourney is correctly typed as JourneyKey | null
```

---

## 17. Quick Reference Card

Save this or pin it somewhere visible.

### Reading journey data

```tsx
// Inside a JourneyProvider subtree — full config + journey key
import { useJourney } from '../context/JourneyContext';
const { journey, config } = useJourney();

// Inside a JourneyProvider subtree — single feature flag (boolean)
import { useJourneyFeature } from '../hooks/useJourneyFeature';
const showAvatar = useJourneyFeature('showAvatar'); // key is type-safe

// Outside JourneyProvider (e.g. AppShell, Sidebar) — global Redux store
import { useAppSelector } from '../store/hooks';
const activeJourney = useAppSelector((state) => state.journey.activeJourney);
// typed as JourneyKey | null
```

### Pattern 1 checklist

- [ ] `CheckoutPage.tsx` loops `config.sections` — no `if` statements
- [ ] Every section is in `sectionRegistry`
- [ ] New section added to `sections` and `fields` in config

### Pattern 2 checklist

- [ ] `CheckoutShell.tsx` has zero journey imports
- [ ] New journey = one new `*JourneyPage.tsx` file
- [ ] Slot names are stable (`headerSlot`, `formSlot`, `summarySlot`)

### Pattern 3 checklist

- [ ] `ProfilePage.tsx` renders all sections unconditionally
- [ ] Every section starts with `useJourneyFeature(key)`
- [ ] Feature key added to `JourneyFeatures` interface **first**, then to all journey configs

### Pattern 4 checklist

- [ ] `BaseDashboard.tsx` does not import `journeyConfigs`
- [ ] New variant is one line: `withJourneyConfig(BaseDashboard, 'key')`
- [ ] New widget added to `ALL_WIDGETS` and to `WIDGET_META` in `WidgetCard.tsx`

### File to edit for common tasks

| Task | File to edit |
|------|-------------|
| Toggle a feature on/off for a journey | `src/config/journeyConfigs.ts` |
| Add a new feature flag (type-safe) | `src/types/journey.ts` → `JourneyFeatures`, then `journeyConfigs.ts` |
| Add a section to a journey (Pattern 1) | `journeyConfigs.ts` + `sectionRegistry` in `CheckoutPage.tsx` |
| Add a feature flag section (Pattern 3) | `types/journey.ts` + `journeyConfigs.ts` + new section file + `ProfilePage.tsx` |
| Add a dashboard widget (Pattern 4) | `journeyConfigs.ts` + `WidgetCard.tsx` WIDGET_META |
| Add a new journey | `types/journey.ts` + `journeyConfigs.ts` + router + sidebar nav |
| Change sidebar nav groups | `src/components/organisms/Sidebar.tsx` |
| Change page template layout | `src/components/templates/PageLayout.tsx` |
| Change the topbar or outer shell | `src/components/templates/AppShell.tsx` |
| Read active journey outside JourneyProvider | `useAppSelector((s) => s.journey.activeJourney)` |

---

> **Questions?** If something in the codebase does not match this guide, the guide
> may be outdated — check the actual source files and update this README.
> The living source of truth is always the code.
