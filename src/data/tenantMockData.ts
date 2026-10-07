import { Tenant, TenantModuleConfig, TenantPreset } from '@/types/tenant';

export const HIERARCHICAL_MODULES: TenantModuleConfig[] = [
  // =========================================================================
  // 1. CAMPUS LIFE & OPERATIONS (School Domain)
  // =========================================================================
  {
    key: 'campus_sports',
    label: 'Campus Sports Houses & Tournaments',
    category: 'Campus Life & Operations',
    targetRole: 'shared',
    description: 'Inter-house cricket, football, sports standings, rosters, and live tournament fixtures.',
    badge: 'School Special',
    subOptions: [
      {
        key: 'sub_sports_houses',
        label: 'House Standings & Point Tables',
        description: 'Track annual athletic meet house points, rank positions, and championship trophies.'
      },
      {
        key: 'sub_sports_fixtures',
        label: 'Match Fixtures & Match Schedules',
        description: 'Schedule cricket, football, rugby, and track & field matches with venue details.'
      },
      {
        key: 'sub_sports_rosters',
        label: 'Team Player Squads & Captains',
        description: 'Manage player rosters, jersey numbers, and student captaincy badges.'
      },
      {
        key: 'sub_sports_live_scores',
        label: 'Live Match Scorecards & Commentary',
        description: 'Real-time match scoring, overs/wickets counter, and live commentary feeds.'
      }
    ]
  },
  {
    key: 'campus_events',
    label: 'School Events, RSVP & Ceremonies',
    category: 'Campus Life & Operations',
    targetRole: 'shared',
    description: 'Prize day, annual athletic meet, cultural festivals, and event RSVP ticketing.',
    badge: 'School Special',
    subOptions: [
      {
        key: 'sub_events_calendar',
        label: 'Public School Event Calendar',
        description: 'Monthly and term event calendars with date, time, and venue details.'
      },
      {
        key: 'sub_events_rsvp',
        label: 'Online Student & Guest RSVP',
        description: 'Digital seat reservations and headcount registration for campus ceremonies.'
      },
      {
        key: 'sub_events_reminders',
        label: 'Automated Event Reminders',
        description: 'In-app and SMS reminders sent to registered attendees 24 hours prior.'
      }
    ]
  },
  {
    key: 'campus_announcements',
    label: 'Official Campus Circulars & Feeds',
    category: 'Campus Life & Operations',
    targetRole: 'shared',
    description: 'Administrative announcements, exam schedules, multi-paragraph circulars, and notifications.',
    subOptions: [
      {
        key: 'sub_announcements_urgent',
        label: 'Urgent Alert Sticky Banner',
        description: 'Display high-priority emergency or weather circulars at the top of all student dashboards.'
      },
      {
        key: 'sub_announcements_pdf',
        label: 'Printable Official PDF Circulars',
        description: 'Attach official school letterhead PDFs for parents and students to download.'
      },
      {
        key: 'sub_announcements_targeted',
        label: 'Grade-Specific Audience Filters',
        description: 'Target circulars strictly to Grade 10, 11, 12, or 13 candidate batches.'
      }
    ]
  },
  {
    key: 'school_classes_grades',
    label: 'Academic Grades & Class Sections',
    category: 'Campus Life & Operations',
    targetRole: 'admin',
    description: 'Grade 10 to 13 section management (10-A, 11-Science, 12-Maths) with designated class teachers.',
    subOptions: [
      {
        key: 'sub_classes_sections',
        label: 'Grade Class Rooms (10-A, 11-B, 12-Bio)',
        description: 'Configure grade divisions, maximum student caps, and section naming.'
      },
      {
        key: 'sub_classes_teachers',
        label: 'Designated Class Teacher Assignee',
        description: 'Assign master class teachers with supervisory permissions for their section.'
      },
      {
        key: 'sub_classes_attendance',
        label: 'Daily Roll Call Attendance Register',
        description: 'Digital morning attendance register with automated monthly percentage calculation.'
      }
    ]
  },

  // =========================================================================
  // 2. TUITION & COMMERCIAL BILLING (Tuition / Solo Tutors)
  // =========================================================================
  {
    key: 'tuition_subscriptions',
    label: 'Tuition Subscriptions & Connect Hub',
    category: 'Tuition & Commercial Billing',
    targetRole: 'shared',
    description: 'Student recurring monthly tuition subscriptions, subscriber roster, and auto-access gating.',
    badge: 'Tuition Core',
    subOptions: [
      {
        key: 'sub_tuition_plans',
        label: 'Custom Tiered Tuition Plans (LKR)',
        description: 'Create monthly fee plans (e.g., Theory: LKR 2,500/mo, Revision: LKR 3,500/mo).'
      },
      {
        key: 'sub_tuition_slips',
        label: 'BOC & Commercial Bank Slip Upload',
        description: 'Students upload bank deposit receipts with transaction numbers for manual verification.'
      },
      {
        key: 'sub_tuition_online_pay',
        label: 'Online Visa / Mastercard / LANKAQR',
        description: 'Direct instant online card checkout with automated invoice activation.'
      },
      {
        key: 'sub_tuition_discounts',
        label: 'Scholarship & Promo Discount Codes',
        description: 'Provide fee waivers, sibling discounts, and early-bird promotional codes.'
      },
      {
        key: 'sub_tuition_auto_lock',
        label: 'Auto-Lock Unpaid Accounts on Expiry',
        description: 'Automatically restrict class recordings and live streams when monthly fees expire.'
      }
    ]
  },
  {
    key: 'course_marketplace',
    label: 'Course Materials & Paper Marketplace',
    category: 'Tuition & Commercial Billing',
    targetRole: 'student',
    description: 'Direct purchasing of downloadable past papers, revision packages, and masterclass bundles.',
    subOptions: [
      {
        key: 'sub_market_standalone_papers',
        label: 'Individual Past Paper Sales',
        description: 'Allow non-enrolled students to purchase model papers or marking schemes individually.'
      },
      {
        key: 'sub_market_video_bundles',
        label: 'Unit Video Masterclass Bundles',
        description: 'Sell complete topic recordings (e.g., Full Calculus Pack) as one-time purchases.'
      },
      {
        key: 'sub_market_digital_receipts',
        label: 'Instant Digital PDF Invoicing',
        description: 'Generate instant downloadable tax receipts and purchase order confirmations.'
      }
    ]
  },

  // =========================================================================
  // 3. LIVE BROADCAST & VIRTUAL CLASSROOM
  // =========================================================================
  {
    key: 'live_broadcast_studio',
    label: 'Live Broadcast & Meeting Studio',
    category: 'Live Broadcast & Studio',
    targetRole: 'teacher',
    description: 'Integrated Google Meet & Zoom live schedule manager with permanent lecture room links.',
    badge: 'Virtual Hall',
    subOptions: [
      {
        key: 'sub_live_google_meet',
        label: 'Google Meet Faculty Room Launcher',
        description: 'Permanent Google Meet room URL with 1-click start and student join controls.'
      },
      {
        key: 'sub_live_zoom',
        label: 'Zoom Pro Direct Meeting Launcher',
        description: 'Support Zoom meeting IDs, encrypted passcodes, and direct launch buttons.'
      },
      {
        key: 'sub_live_sms_alerts',
        label: '1-Click Student Broadcast SMS Alerts',
        description: 'Send instant SMS & push alerts to all enrolled subscribers 15 minutes before class.'
      },
      {
        key: 'sub_live_recordings',
        label: '1080p Cloud Lecture Replay Archive',
        description: 'Archive HD live stream recordings with chapter timestamps for late revision.'
      },
      {
        key: 'sub_live_doubt_chat',
        label: 'Student Doubt Clearing & Raise Hand',
        description: 'In-session question queue and post-lecture doubt clearing discussion threads.'
      }
    ]
  },

  // =========================================================================
  // 4. CURRICULUM & DIGITAL LEARNING
  // =========================================================================
  {
    key: 'syllabus_builder',
    label: 'Interactive Curriculum & Unit Builder',
    category: 'Curriculum & Digital Learning',
    targetRole: 'teacher',
    description: 'Structured course syllabus breakdown with units, subtopics, learning objectives, and notes.',
    subOptions: [
      {
        key: 'sub_syllabus_units',
        label: 'Structured Unit & Topic Breakdown',
        description: 'Build sequential syllabus roadmaps with learning objectives and estimated study hours.'
      },
      {
        key: 'sub_syllabus_video',
        label: 'Embedded Video Player (1080p)',
        description: 'Video lesson player with speed playback (1.25x, 1.5x), bookmarks, and progress tracking.'
      },
      {
        key: 'sub_syllabus_quizzes',
        label: 'Interactive Timed MCQ Assessments',
        description: 'Self-grading multiple choice quizzes with instant answer key explanations.'
      },
      {
        key: 'sub_syllabus_past_papers',
        label: 'A/L & O/L Past Examination Papers',
        description: 'National examination archive (2015-2025) categorized by year and subject.'
      },
      {
        key: 'sub_syllabus_digital_books',
        label: 'PDF Digital Textbooks & Lecture Notes',
        description: 'Downloadable teacher lecture handouts, formula sheets, and PDF textbooks.'
      }
    ]
  },

  // =========================================================================
  // 5. ASSESSMENTS & EXAMINATIONS
  // =========================================================================
  {
    key: 'assignments_grading',
    label: 'Assessments, Homework & Grading Studio',
    category: 'Assessments & Examinations',
    targetRole: 'teacher',
    description: 'Student assignment upload portal with teacher annotation mark-sheets and feedback.',
    subOptions: [
      {
        key: 'sub_assign_student_upload',
        label: 'Student Homework File Upload Portal',
        description: 'Students submit homework as PDF or image photos directly from mobile or desktop.'
      },
      {
        key: 'sub_assign_teacher_rubrics',
        label: 'Teacher Rubric Grading & Mark Sheets',
        description: 'Mark assignments out of 100, record rubric criteria, and provide written feedback.'
      },
      {
        key: 'sub_assign_term_exams',
        label: 'Term Examination Timetables & Seating',
        description: 'Publish official examination hall allocations, desk numbers, and candidate timetables.'
      },
      {
        key: 'sub_assign_report_cards',
        label: 'Student Term Report Cards & GPA',
        description: 'Automated student progress report cards with class rankings and grade point averages.'
      },
      {
        key: 'sub_assign_study_groups',
        label: 'Peer Study Groups & Discussion Circles',
        description: 'Student collaboration rooms for past paper problem-solving and peer discussion.'
      }
    ]
  },

  // =========================================================================
  // 6. FACULTY & ADMINISTRATION
  // =========================================================================
  {
    key: 'multi_teacher_roster',
    label: 'Faculty, Administration & White-Labeling',
    category: 'Faculty & Administration',
    targetRole: 'admin',
    description: 'Managing department heads, sectional teachers, staff directory, and teaching workloads.',
    subOptions: [
      {
        key: 'sub_admin_multi_staff',
        label: 'Multi-Teacher & Subject Faculty Roster',
        description: 'Add and manage multiple teachers, assigned subjects, and teaching hour quotas.'
      },
      {
        key: 'sub_admin_principal_panel',
        label: 'Principal Supervision Control Panel',
        description: 'Supervisory dashboard to audit teacher activity and curriculum completion across grades.'
      },
      {
        key: 'sub_admin_parent_portal',
        label: 'Parent SMS Gateway & Progress Monitoring',
        description: 'Send automated SMS notifications to parents for attendance, exam marks, and fees.'
      },
      {
        key: 'sub_admin_white_label',
        label: 'Custom Subdomain & White-Label Crest',
        description: 'White-label LMS with institutional crest/logo, colors, and custom domain (e.g., royal.lms.lk).'
      }
    ]
  }
];

// Helper to generate a flat map of all feature keys (parent + sub-options)
const buildFullFeatures = (config: Record<string, boolean>): Record<string, boolean> => {
  const result: Record<string, boolean> = {};
  HIERARCHICAL_MODULES.forEach((mod) => {
    const isParentEnabled = config[mod.key] ?? false;
    result[mod.key] = isParentEnabled;
    mod.subOptions.forEach((sub) => {
      result[sub.key] = config[sub.key] !== undefined ? config[sub.key] : isParentEnabled;
    });
  });
  return result;
};

// Presets for 1-click tenant setup
export const TENANT_PRESETS: TenantPreset[] = [
  {
    id: 'preset_school',
    name: 'K-12 School Enterprise Edition',
    type: 'school',
    description: 'Comprehensive setup for National & Private Schools with Sports Houses, Events, Term Exams, Report Cards, and Multi-Teacher Staff.',
    icon: 'School',
    features: buildFullFeatures({
      campus_sports: true,
      campus_events: true,
      campus_announcements: true,
      school_classes_grades: true,
      tuition_subscriptions: false,
      course_marketplace: false,
      live_broadcast_studio: false,
      syllabus_builder: true,
      assignments_grading: true,
      multi_teacher_roster: true
    })
  },
  {
    id: 'preset_tuition',
    name: 'Tuition Center & Academy Edition',
    type: 'tuition_center',
    description: 'Tailored for commercial coaching institutes: Monthly tuition subscriptions, BOC/Commercial bank slip approval, Live Broadcast studio, and Marketplace.',
    icon: 'Building2',
    features: buildFullFeatures({
      campus_sports: false,
      campus_events: false,
      campus_announcements: true,
      school_classes_grades: true,
      tuition_subscriptions: true,
      course_marketplace: true,
      live_broadcast_studio: true,
      syllabus_builder: true,
      assignments_grading: true,
      multi_teacher_roster: true
    })
  },
  {
    id: 'preset_tutor',
    name: 'Solo Educator / Individual Tutor Pro',
    type: 'individual_teacher',
    description: 'Streamlined personal studio for solo tuition teachers: direct bank slip verifications, Connect Hub subscribers, Live Meet classes, and past papers.',
    icon: 'GraduationCap',
    features: buildFullFeatures({
      campus_sports: false,
      campus_events: false,
      campus_announcements: false,
      school_classes_grades: false,
      tuition_subscriptions: true,
      course_marketplace: true,
      live_broadcast_studio: true,
      syllabus_builder: true,
      assignments_grading: true,
      multi_teacher_roster: false
    })
  }
];

export const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'tenant_royal',
    name: 'Royal College Colombo',
    code: 'RC-CMB',
    type: 'school',
    plan: 'enterprise',
    status: 'active',
    contactEmail: 'admin@royalcollege.lk',
    contactPhone: '+94 11 269 1163',
    adminName: 'M. V. S. Gunathilake (Principal)',
    studentCount: 8450,
    teacherCount: 380,
    monthlyFeeLkr: 150000,
    createdAt: '2025-01-10',
    renewalDate: '2027-01-10',
    primaryColor: '#0d5c4d',
    address: 'Rajakeeya Mawatha, Colombo 07',
    tagline: 'Disce aut Discede (Learn or Depart)',
    enabledFeatures: { ...TENANT_PRESETS[0].features }
  },
  {
    id: 'tenant_apex',
    name: 'Apex Higher Education Institute',
    code: 'APEX-NGD',
    type: 'tuition_center',
    plan: 'enterprise',
    status: 'active',
    contactEmail: 'admissions@apexedu.lk',
    contactPhone: '+94 11 282 4455',
    adminName: 'Eng. Janaka Wickramasinghe',
    studentCount: 3200,
    teacherCount: 24,
    monthlyFeeLkr: 95000,
    createdAt: '2025-06-01',
    renewalDate: '2026-12-31',
    primaryColor: '#1d4ed8',
    address: 'High Level Road, Nugegoda',
    tagline: 'The Apex of A/L Excellence',
    enabledFeatures: { ...TENANT_PRESETS[1].features }
  },
  {
    id: 'tenant_samantha',
    name: 'Dr. Samantha Perera (Combined Maths)',
    code: 'TUTOR-SAM',
    type: 'individual_teacher',
    plan: 'pro',
    status: 'active',
    contactEmail: 'sam.maths@combinedmaths.lk',
    contactPhone: '+94 77 123 4567',
    adminName: 'Dr. Samantha Perera',
    studentCount: 142,
    teacherCount: 1,
    monthlyFeeLkr: 18000,
    createdAt: '2026-01-15',
    renewalDate: '2027-01-15',
    primaryColor: '#059669',
    address: 'Online Faculty & Studio, Colombo',
    tagline: 'A/L Combined Mathematics Masterclass',
    enabledFeatures: { ...TENANT_PRESETS[2].features }
  },
  {
    id: 'tenant_jaffna_hindu',
    name: 'Jaffna Hindu College',
    code: 'JHC-JAF',
    type: 'school',
    plan: 'enterprise',
    status: 'active',
    contactEmail: 'principal@jaffnahindu.lk',
    contactPhone: '+94 21 222 2379',
    adminName: 'S. Nimalan (Principal)',
    studentCount: 3100,
    teacherCount: 145,
    monthlyFeeLkr: 85000,
    createdAt: '2025-04-12',
    renewalDate: '2026-11-30',
    primaryColor: '#7c2d12',
    address: 'Kandarodai Road, Jaffna',
    tagline: 'Kadavul Unmai (God is Truth)',
    enabledFeatures: { ...TENANT_PRESETS[0].features }
  }
];
