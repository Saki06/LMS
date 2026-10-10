export interface SubjectGrade {
  code: string;
  subject: string;
  teacher: string;
  score: number;
  grade: 'A*' | 'A' | 'B' | 'C' | 'S' | 'F';
  classAverage: number;
  highestScore: number;
  remarks: string;
}

export interface TermReportCard {
  id: string;
  term: string;
  shortTermLabel: string;
  issueDate: string;
  academicYear: string;
  gradeLevel: string;
  classSection: string;
  subjects: SubjectGrade[];
  overallPercentage: number;
  classRank: number;
  totalStudents: number;
  conduct: string;
  principalRemarks: string;
  attendancePercentage: number;
  isLatest?: boolean;
}

export interface AttendanceRecord {
  date: string;
  day: string;
  status: 'present' | 'absent' | 'excused' | 'late';
  checkInTime?: string;
  note?: string;
}

export interface ExamScheduleItem {
  id: string;
  examType: 'Term 3 Final Exam' | 'Mid-Term Evaluation' | 'Practical / Lab Exam' | 'Zonal Trial Paper';
  subject: string;
  paperCode: string;
  paperName: string;
  date: string;
  day: string;
  timeSlot: string;
  duration: string;
  hallNumber: string;
  seatNumber: string;
  syllabusCoverage: string;
  maxMarks: number;
  status: 'upcoming' | 'completed';
  obtainedScore?: number;
  grade?: string;
  admissionStatus: 'Hall Ticket Issued' | 'Confirmed' | 'Completed';
}

export interface PastTermComparison {
  termName: string;
  academicYear: string;
  aggregateAverage: number;
  classRank: number;
  totalStudents: number;
  attendanceRate: number;
  gradeClassification: string;
}

export interface AcademicYearRecord {
  id: string;
  year: string;
  gradeLevel: string;
  stage: 'Collegiate A/L' | 'Senior Secondary (G.C.E. O/L)' | 'Junior Secondary';
  classSection: string;
  classTeacher: string;
  annualAverage: number;
  annualRank: number;
  totalStudents: number;
  attendanceRate: number;
  promotionStatus: string;
  awardsOrMilestone?: string;
  terms: TermReportCard[];
}

export interface ParentChildProfile {
  id: string;
  studentId: string;
  name: string;
  admissionNo: string;
  grade: string;
  classSection: string;
  avatarText: string;
  schoolName: string;
  enrolledSinceYear: string;
  admissionGrade: string;
  currentStage: string;
  cumulativeCareerAverage: number;
  totalYearsEnrolled: number;
  classTeacher: string;
  classTeacherEmail: string;
  classTeacherPhone: string;
  attendanceRate: number;
  presentDays: number;
  totalDays: number;
  overallAverage: number;
  classRank: number;
  totalStudents: number;
  upcomingExamsCount: number;
  hallTicketNo: string;
  nextExamDate: string;
  nextExamName: string;
  termReport: TermReportCard; // Active latest
  termReports: TermReportCard[]; // Full historical terms archive across all years
  academicJourney: AcademicYearRecord[]; // Structured Grade 6 to 13 academic dossier
  recentAttendance: AttendanceRecord[];
  examSchedules: ExamScheduleItem[];
  pastTermsHistory: PastTermComparison[];
}

export interface ParentLeaveRequest {
  id: string;
  childId: string;
  childName: string;
  startDate: string;
  endDate: string;
  reason: 'Medical Illness' | 'Family Emergency' | 'Religious Observation' | 'Official Competition' | 'Other';
  note: string;
  hasMedicalCertificate: boolean;
  status: 'approved' | 'pending' | 'rejected';
  submittedDate: string;
  reviewedBy?: string;
  reviewComment?: string;
}

export interface SchoolCircular {
  id: string;
  circularNo: string;
  title: string;
  category: 'Academic' | 'Administrative' | 'Safety' | 'Event';
  date: string;
  summary: string;
  content: string;
  priority: 'high' | 'normal';
  targetAudience: string;
  attachmentName?: string;
  attachmentSize?: string;
}

// ----------------------------------------------------------------------
// SATHURJAN K. - COMPLETE ACADEMIC JOURNEY (GRADE 6 TO GRADE 12)
// ----------------------------------------------------------------------
export const sathurjanAcademicJourney: AcademicYearRecord[] = [
  {
    id: 'yr_sat_2026_gr12',
    year: '2026',
    gradeLevel: 'Grade 12',
    stage: 'Collegiate A/L',
    classSection: '12-Physical Science (A/L 2026)',
    classTeacher: 'Mr. Samantha Perera',
    annualAverage: 87.8,
    annualRank: 3,
    totalStudents: 42,
    attendanceRate: 96.8,
    promotionStatus: 'Current Ongoing (Candidate for G.C.E. A/L 2027)',
    awardsOrMilestone: 'Physics Olympiad Semifinalist & Senior Prefect Council',
    terms: [
      {
        id: 'rep_sat_2026_t2',
        term: '2nd Term Summative Assessment 2026',
        shortTermLabel: '2026 Term 2 (Latest)',
        issueDate: 'September 28, 2026',
        academicYear: '2026 / G.C.E. A/L Stream',
        gradeLevel: 'Grade 12',
        classSection: '12-Physical Science (A/L 2026)',
        overallPercentage: 89.4,
        classRank: 3,
        totalStudents: 42,
        conduct: 'Exemplary & Cooperative',
        attendancePercentage: 96.5,
        isLatest: true,
        principalRemarks:
          'Demonstrates remarkable analytic consistency and leadership in laboratory experiments. Recommended for advanced national physics seminar.',
        subjects: [
          {
            code: 'PHY-12',
            subject: 'Physics',
            teacher: 'Mr. Samantha Perera',
            score: 88,
            grade: 'A',
            classAverage: 67,
            highestScore: 94,
            remarks: 'Exceptional comprehension in Wave Optics and Mechanics. Diligent laboratory practical record.'
          },
          {
            code: 'CMTH-12',
            subject: 'Combined Mathematics',
            teacher: 'Mrs. K. Jayasundara',
            score: 92,
            grade: 'A',
            classAverage: 62,
            highestScore: 96,
            remarks: 'Top-tier problem solving speed in Differential Equations and Trigonometry.'
          },
          {
            code: 'CHM-12',
            subject: 'Chemistry',
            teacher: 'Dr. N. Fernando',
            score: 85,
            grade: 'A',
            classAverage: 65,
            highestScore: 91,
            remarks: 'Good grasp of Physical and Inorganic Chemistry. Strong conceptual foundation.'
          },
          {
            code: 'ENG-12',
            subject: 'General English',
            teacher: 'Ms. T. De Silva',
            score: 90,
            grade: 'A',
            classAverage: 71,
            highestScore: 95,
            remarks: 'Fluent academic writing and flawless reading comprehension.'
          },
          {
            code: 'GK-12',
            subject: 'General Knowledge & IT',
            teacher: 'Mr. A. Wickremasinghe',
            score: 86,
            grade: 'A',
            classAverage: 74,
            highestScore: 92,
            remarks: 'Well-informed about international affairs and applied computing.'
          }
        ]
      },
      {
        id: 'rep_sat_2026_t1',
        term: '1st Term Mid-Year Assessment 2026',
        shortTermLabel: '2026 Term 1',
        issueDate: 'April 08, 2026',
        academicYear: '2026 / G.C.E. A/L Stream',
        gradeLevel: 'Grade 12',
        classSection: '12-Physical Science (A/L 2026)',
        overallPercentage: 86.2,
        classRank: 4,
        totalStudents: 42,
        conduct: 'Very Good & Attentive',
        attendancePercentage: 97.0,
        isLatest: false,
        principalRemarks:
          'Solid foundational performance in the introductory Advanced Level syllabus. Shows great discipline in theoretical calculus.',
        subjects: [
          {
            code: 'PHY-12',
            subject: 'Physics',
            teacher: 'Mr. Samantha Perera',
            score: 84,
            grade: 'A',
            classAverage: 63,
            highestScore: 92,
            remarks: 'Strong understanding of Units, Dimensions, and Linear Mechanics.'
          },
          {
            code: 'CMTH-12',
            subject: 'Combined Mathematics',
            teacher: 'Mrs. K. Jayasundara',
            score: 88,
            grade: 'A',
            classAverage: 58,
            highestScore: 95,
            remarks: 'Excellent algebraic manipulation and polynomial factorisation.'
          },
          {
            code: 'CHM-12',
            subject: 'Chemistry',
            teacher: 'Dr. N. Fernando',
            score: 82,
            grade: 'A',
            classAverage: 60,
            highestScore: 89,
            remarks: 'Clear grasp of Atomic Structure and Periodic Trends.'
          },
          {
            code: 'ENG-12',
            subject: 'General English',
            teacher: 'Ms. T. De Silva',
            score: 92,
            grade: 'A',
            classAverage: 69,
            highestScore: 94,
            remarks: 'Very proficient vocabulary and articulate verbal presentations.'
          },
          {
            code: 'GK-12',
            subject: 'General Knowledge & IT',
            teacher: 'Mr. A. Wickremasinghe',
            score: 85,
            grade: 'A',
            classAverage: 70,
            highestScore: 90,
            remarks: 'Active participant in current affairs quiz.'
          }
        ]
      }
    ]
  },
  {
    id: 'yr_sat_2025_gr11',
    year: '2025',
    gradeLevel: 'Grade 11',
    stage: 'Senior Secondary (G.C.E. O/L)',
    classSection: '11-Science A',
    classTeacher: 'Mrs. K. Jayasundara',
    annualAverage: 89.8,
    annualRank: 2,
    totalStudents: 44,
    attendanceRate: 98.2,
    promotionStatus: 'Passed G.C.E. O/L with 9 Distinctions (9 A Grades)',
    awardsOrMilestone: 'G.C.E. O/L 9A Distinction Honours; Promoted to Collegiate A/L Physical Science',
    terms: [
      {
        id: 'rep_sat_2025_t3',
        term: '3rd Term Annual Evaluation 2025 (Grade 11)',
        shortTermLabel: '2025 Term 3 (Grade 11 O/L)',
        issueDate: 'December 12, 2025',
        academicYear: '2025 / Secondary O/L',
        gradeLevel: 'Grade 11',
        classSection: '11-Science A',
        overallPercentage: 91.8,
        classRank: 2,
        totalStudents: 44,
        conduct: 'Exemplary Scholar & Senior Prefect',
        attendancePercentage: 98.2,
        isLatest: false,
        principalRemarks:
          'Graduated Grade 11 with stellar distinction across all core academic disciplines. Fully qualified for the A/L Physical Science stream.',
        subjects: [
          {
            code: 'MTH-11',
            subject: 'Mathematics',
            teacher: 'Mrs. K. Jayasundara',
            score: 96,
            grade: 'A*',
            classAverage: 64,
            highestScore: 98,
            remarks: 'Flawless performance in Geometry proofs and Trigonometry.'
          },
          {
            code: 'SCI-11',
            subject: 'Science',
            teacher: 'Mr. P. Bandara',
            score: 94,
            grade: 'A*',
            classAverage: 66,
            highestScore: 96,
            remarks: 'Exceptional answers in Organic Chemistry and Electric Circuits.'
          },
          {
            code: 'ENG-11',
            subject: 'English Language',
            teacher: 'Ms. T. De Silva',
            score: 91,
            grade: 'A',
            classAverage: 70,
            highestScore: 95,
            remarks: 'Impeccable grammar and creative essay narrative.'
          },
          {
            code: 'HIS-11',
            subject: 'History & Heritage',
            teacher: 'Mr. R. Karunaratne',
            score: 89,
            grade: 'A',
            classAverage: 68,
            highestScore: 92,
            remarks: 'Detailed historical analytical essays.'
          },
          {
            code: 'ICT-11',
            subject: 'Information & Communication Tech',
            teacher: 'Mr. A. Wickremasinghe',
            score: 95,
            grade: 'A*',
            classAverage: 73,
            highestScore: 97,
            remarks: 'Top score in database design and Pascal/Python algorithms.'
          },
          {
            code: 'LAN-11',
            subject: 'Second Language',
            teacher: 'Mrs. V. Sivalingam',
            score: 86,
            grade: 'A',
            classAverage: 70,
            highestScore: 92,
            remarks: 'Strong grammatical competence and reading fluency.'
          }
        ]
      },
      {
        id: 'rep_sat_2025_t2',
        term: '2nd Term Mid-Year Evaluation 2025',
        shortTermLabel: '2025 Term 2',
        issueDate: 'August 15, 2025',
        academicYear: '2025 / Secondary O/L',
        gradeLevel: 'Grade 11',
        classSection: '11-Science A',
        overallPercentage: 89.5,
        classRank: 3,
        totalStudents: 44,
        conduct: 'Very Good',
        attendancePercentage: 98.0,
        isLatest: false,
        principalRemarks: 'Consistent high marks in science and mathematics. Keep up momentum for pre-board exams.',
        subjects: [
          {
            code: 'MTH-11',
            subject: 'Mathematics',
            teacher: 'Mrs. K. Jayasundara',
            score: 94,
            grade: 'A*',
            classAverage: 62,
            highestScore: 97,
            remarks: 'Excellent progress in quadratic functions.'
          },
          {
            code: 'SCI-11',
            subject: 'Science',
            teacher: 'Mr. P. Bandara',
            score: 91,
            grade: 'A',
            classAverage: 65,
            highestScore: 94,
            remarks: 'Strong understanding in Light and Reflection.'
          },
          {
            code: 'ENG-11',
            subject: 'English Language',
            teacher: 'Ms. T. De Silva',
            score: 88,
            grade: 'A',
            classAverage: 69,
            highestScore: 93,
            remarks: 'Well-structured formal letters and comprehension.'
          },
          {
            code: 'ICT-11',
            subject: 'Information & Communication Tech',
            teacher: 'Mr. A. Wickremasinghe',
            score: 92,
            grade: 'A',
            classAverage: 71,
            highestScore: 95,
            remarks: 'Good handling of spreadsheets.'
          }
        ]
      },
      {
        id: 'rep_sat_2025_t1',
        term: '1st Term Evaluation 2025',
        shortTermLabel: '2025 Term 1',
        issueDate: 'April 10, 2025',
        academicYear: '2025 / Secondary O/L',
        gradeLevel: 'Grade 11',
        classSection: '11-Science A',
        overallPercentage: 88.0,
        classRank: 3,
        totalStudents: 44,
        conduct: 'Disciplined & Studious',
        attendancePercentage: 98.5,
        isLatest: false,
        principalRemarks: 'Strong start to the Grade 11 national exam syllabus.',
        subjects: [
          {
            code: 'MTH-11',
            subject: 'Mathematics',
            teacher: 'Mrs. K. Jayasundara',
            score: 92,
            grade: 'A',
            classAverage: 60,
            highestScore: 96,
            remarks: 'Accurate algebraic simplifications.'
          },
          {
            code: 'SCI-11',
            subject: 'Science',
            teacher: 'Mr. P. Bandara',
            score: 89,
            grade: 'A',
            classAverage: 63,
            highestScore: 92,
            remarks: 'Solid grasp of human circulatory system.'
          },
          {
            code: 'ENG-11',
            subject: 'English Language',
            teacher: 'Ms. T. De Silva',
            score: 87,
            grade: 'A',
            classAverage: 68,
            highestScore: 91,
            remarks: 'Active contributor in reading comprehension.'
          }
        ]
      }
    ]
  },
  {
    id: 'yr_sat_2024_gr10',
    year: '2024',
    gradeLevel: 'Grade 10',
    stage: 'Senior Secondary (G.C.E. O/L)',
    classSection: '10-Science A',
    classTeacher: 'Mr. P. Bandara',
    annualAverage: 88.6,
    annualRank: 3,
    totalStudents: 43,
    attendanceRate: 97.4,
    promotionStatus: 'Promoted to Grade 11 (O/L Senior)',
    awardsOrMilestone: '1st Place Zonal Science Olympiad Junior Division',
    terms: [
      {
        id: 'rep_sat_2024_t3',
        term: '3rd Term Annual Evaluation 2024 (Grade 10)',
        shortTermLabel: '2024 Term 3',
        issueDate: 'December 10, 2024',
        academicYear: '2024 / Secondary',
        gradeLevel: 'Grade 10',
        classSection: '10-Science A',
        overallPercentage: 90.2,
        classRank: 2,
        totalStudents: 43,
        conduct: 'Outstanding',
        attendancePercentage: 97.5,
        isLatest: false,
        principalRemarks: 'Exemplary achievement in Grade 10 final examinations. Ready for Grade 11 challenge.',
        subjects: [
          {
            code: 'MTH-10',
            subject: 'Mathematics',
            teacher: 'Mrs. K. Jayasundara',
            score: 94,
            grade: 'A*',
            classAverage: 61,
            highestScore: 97,
            remarks: 'Superior geometrical theorem execution.'
          },
          {
            code: 'SCI-10',
            subject: 'Science',
            teacher: 'Mr. P. Bandara',
            score: 93,
            grade: 'A*',
            classAverage: 64,
            highestScore: 95,
            remarks: 'Highest laboratory assignment mark.'
          },
          {
            code: 'ENG-10',
            subject: 'English Language',
            teacher: 'Ms. T. De Silva',
            score: 88,
            grade: 'A',
            classAverage: 67,
            highestScore: 92,
            remarks: 'Well written compositions.'
          },
          {
            code: 'HIS-10',
            subject: 'History',
            teacher: 'Mr. R. Karunaratne',
            score: 86,
            grade: 'A',
            classAverage: 65,
            highestScore: 90,
            remarks: 'Detailed historical context.'
          }
        ]
      },
      {
        id: 'rep_sat_2024_t2',
        term: '2nd Term Evaluation 2024',
        shortTermLabel: '2024 Term 2',
        issueDate: 'August 12, 2024',
        academicYear: '2024 / Secondary',
        gradeLevel: 'Grade 10',
        classSection: '10-Science A',
        overallPercentage: 88.4,
        classRank: 4,
        totalStudents: 43,
        conduct: 'Very Good',
        attendancePercentage: 97.0,
        isLatest: false,
        principalRemarks: 'Very balanced academic results across all sciences and languages.',
        subjects: [
          {
            code: 'MTH-10',
            subject: 'Mathematics',
            teacher: 'Mrs. K. Jayasundara',
            score: 90,
            grade: 'A',
            classAverage: 60,
            highestScore: 95,
            remarks: 'Very strong algebra work.'
          },
          {
            code: 'SCI-10',
            subject: 'Science',
            teacher: 'Mr. P. Bandara',
            score: 89,
            grade: 'A',
            classAverage: 62,
            highestScore: 93,
            remarks: 'Detailed practical record.'
          }
        ]
      },
      {
        id: 'rep_sat_2024_t1',
        term: '1st Term Evaluation 2024',
        shortTermLabel: '2024 Term 1',
        issueDate: 'April 05, 2024',
        academicYear: '2024 / Secondary',
        gradeLevel: 'Grade 10',
        classSection: '10-Science A',
        overallPercentage: 87.1,
        classRank: 4,
        totalStudents: 43,
        conduct: 'Diligent',
        attendancePercentage: 97.6,
        isLatest: false,
        principalRemarks: 'Pleased with transition to secondary science syllabus.',
        subjects: [
          {
            code: 'MTH-10',
            subject: 'Mathematics',
            teacher: 'Mrs. K. Jayasundara',
            score: 88,
            grade: 'A',
            classAverage: 59,
            highestScore: 94,
            remarks: 'Solid foundation in coordinates.'
          },
          {
            code: 'SCI-10',
            subject: 'Science',
            teacher: 'Mr. P. Bandara',
            score: 87,
            grade: 'A',
            classAverage: 61,
            highestScore: 91,
            remarks: 'Good chemical equations work.'
          }
        ]
      }
    ]
  },
  {
    id: 'yr_sat_2023_gr9',
    year: '2023',
    gradeLevel: 'Grade 9',
    stage: 'Junior Secondary',
    classSection: '9-A',
    classTeacher: 'Mrs. V. Sivalingam',
    annualAverage: 88.7,
    annualRank: 3,
    totalStudents: 40,
    attendanceRate: 98.0,
    promotionStatus: 'Promoted to Grade 10 (Secondary Division)',
    awardsOrMilestone: 'Junior English Debating Captain; All-Round Academic Medal',
    terms: [
      {
        id: 'rep_sat_2023_t3',
        term: '3rd Term Annual Assessment 2023 (Grade 9)',
        shortTermLabel: '2023 Term 3',
        issueDate: 'December 08, 2023',
        academicYear: '2023 / Junior Secondary',
        gradeLevel: 'Grade 9',
        classSection: '9-A',
        overallPercentage: 89.8,
        classRank: 3,
        totalStudents: 40,
        conduct: 'Excellent',
        attendancePercentage: 98.0,
        isLatest: false,
        principalRemarks: 'Completed Junior Secondary phase with top ranks. Promoted to Grade 10.',
        subjects: [
          {
            code: 'SCI-09',
            subject: 'Science',
            teacher: 'Mr. K. Bandara',
            score: 93,
            grade: 'A*',
            classAverage: 66,
            highestScore: 95,
            remarks: 'Mastery in ecology and energy conservation.'
          },
          {
            code: 'MTH-09',
            subject: 'Mathematics',
            teacher: 'Mrs. M. Senanayake',
            score: 91,
            grade: 'A',
            classAverage: 62,
            highestScore: 96,
            remarks: 'Very neat graph interpretations.'
          },
          {
            code: 'ENG-09',
            subject: 'English Language',
            teacher: 'Mrs. Nilmini Silva',
            score: 90,
            grade: 'A',
            classAverage: 71,
            highestScore: 93,
            remarks: 'Fluent speech delivery.'
          }
        ]
      },
      {
        id: 'rep_sat_2023_t1',
        term: '1st Term Assessment 2023',
        shortTermLabel: '2023 Term 1',
        issueDate: 'April 04, 2023',
        academicYear: '2023 / Junior Secondary',
        gradeLevel: 'Grade 9',
        classSection: '9-A',
        overallPercentage: 87.5,
        classRank: 3,
        totalStudents: 40,
        conduct: 'Very Good',
        attendancePercentage: 98.0,
        isLatest: false,
        principalRemarks: 'Good continuous evaluation record.',
        subjects: [
          {
            code: 'SCI-09',
            subject: 'Science',
            teacher: 'Mr. K. Bandara',
            score: 90,
            grade: 'A',
            classAverage: 64,
            highestScore: 93,
            remarks: 'Thorough plant physiology drawings.'
          },
          {
            code: 'MTH-09',
            subject: 'Mathematics',
            teacher: 'Mrs. M. Senanayake',
            score: 89,
            grade: 'A',
            classAverage: 60,
            highestScore: 94,
            remarks: 'Accurate ratio computations.'
          }
        ]
      }
    ]
  },
  {
    id: 'yr_sat_2022_gr8',
    year: '2022',
    gradeLevel: 'Grade 8',
    stage: 'Junior Secondary',
    classSection: '8-A',
    classTeacher: 'Mr. R. Karunaratne',
    annualAverage: 90.0,
    annualRank: 2,
    totalStudents: 39,
    attendanceRate: 98.5,
    promotionStatus: 'Promoted to Grade 9',
    awardsOrMilestone: 'Junior House Games Athletics Medallist (400m Silver)',
    terms: [
      {
        id: 'rep_sat_2022_t3',
        term: '3rd Term Annual Promotion Assessment 2022 (Grade 8)',
        shortTermLabel: '2022 Term 3',
        issueDate: 'December 09, 2022',
        academicYear: '2022 / Junior Secondary',
        gradeLevel: 'Grade 8',
        classSection: '8-A',
        overallPercentage: 91.0,
        classRank: 2,
        totalStudents: 39,
        conduct: 'Outstanding Character',
        attendancePercentage: 98.5,
        isLatest: false,
        principalRemarks: 'High distinction across all eight subjects. Exemplary disciplinary and sporting record.',
        subjects: [
          {
            code: 'SCI-08',
            subject: 'Science',
            teacher: 'Mr. K. Bandara',
            score: 94,
            grade: 'A*',
            classAverage: 65,
            highestScore: 96,
            remarks: 'Passionate and inquisitive learner.'
          },
          {
            code: 'MTH-08',
            subject: 'Mathematics',
            teacher: 'Mrs. M. Senanayake',
            score: 93,
            grade: 'A*',
            classAverage: 63,
            highestScore: 95,
            remarks: 'Fast mental arithmetic.'
          },
          {
            code: 'ENG-08',
            subject: 'English Language',
            teacher: 'Mrs. Nilmini Silva',
            score: 89,
            grade: 'A',
            classAverage: 70,
            highestScore: 92,
            remarks: 'Strong vocabulary.'
          }
        ]
      },
      {
        id: 'rep_sat_2022_t1',
        term: '1st Term Evaluation 2022',
        shortTermLabel: '2022 Term 1',
        issueDate: 'April 06, 2022',
        academicYear: '2022 / Junior Secondary',
        gradeLevel: 'Grade 8',
        classSection: '8-A',
        overallPercentage: 88.9,
        classRank: 2,
        totalStudents: 39,
        conduct: 'Very Good',
        attendancePercentage: 98.5,
        isLatest: false,
        principalRemarks: 'Pleasing start to Grade 8.',
        subjects: [
          {
            code: 'SCI-08',
            subject: 'Science',
            teacher: 'Mr. K. Bandara',
            score: 91,
            grade: 'A',
            classAverage: 64,
            highestScore: 94,
            remarks: 'Well-prepared tests.'
          },
          {
            code: 'MTH-08',
            subject: 'Mathematics',
            teacher: 'Mrs. M. Senanayake',
            score: 90,
            grade: 'A',
            classAverage: 61,
            highestScore: 94,
            remarks: 'Prompt submission of homework.'
          }
        ]
      }
    ]
  },
  {
    id: 'yr_sat_2021_gr7',
    year: '2021',
    gradeLevel: 'Grade 7',
    stage: 'Junior Secondary',
    classSection: '7-B',
    classTeacher: 'Mrs. M. Senanayake',
    annualAverage: 89.5,
    annualRank: 3,
    totalStudents: 38,
    attendanceRate: 97.8,
    promotionStatus: 'Promoted to Grade 8',
    awardsOrMilestone: 'Subject Prize for General Science & Mathematics',
    terms: [
      {
        id: 'rep_sat_2021_t3',
        term: '3rd Term Annual Assessment 2021 (Grade 7)',
        shortTermLabel: '2021 Term 3',
        issueDate: 'December 03, 2021',
        academicYear: '2021 / Junior Secondary',
        gradeLevel: 'Grade 7',
        classSection: '7-B',
        overallPercentage: 89.5,
        classRank: 3,
        totalStudents: 38,
        conduct: 'Polite & Conscientious',
        attendancePercentage: 97.8,
        isLatest: false,
        principalRemarks: 'Successfully completed Grade 7 syllabus with top academic ranking. Promoted to Grade 8.',
        subjects: [
          {
            code: 'SCI-07',
            subject: 'Science',
            teacher: 'Mr. K. Bandara',
            score: 92,
            grade: 'A',
            classAverage: 65,
            highestScore: 94,
            remarks: 'Good grasp of earth science.'
          },
          {
            code: 'MTH-07',
            subject: 'Mathematics',
            teacher: 'Mrs. M. Senanayake',
            score: 91,
            grade: 'A',
            classAverage: 62,
            highestScore: 95,
            remarks: 'Very good fractions and decimals work.'
          },
          {
            code: 'ENG-07',
            subject: 'English Language',
            teacher: 'Mrs. Nilmini Silva',
            score: 88,
            grade: 'A',
            classAverage: 69,
            highestScore: 92,
            remarks: 'Nice handwriting and spellings.'
          }
        ]
      }
    ]
  },
  {
    id: 'yr_sat_2020_gr6',
    year: '2020',
    gradeLevel: 'Grade 6',
    stage: 'Junior Secondary',
    classSection: '6-B (Secondary Entry)',
    classTeacher: 'Mr. K. Bandara',
    annualAverage: 90.4,
    annualRank: 2,
    totalStudents: 38,
    attendanceRate: 99.1,
    promotionStatus: 'Promoted to Grade 7',
    awardsOrMilestone: 'School Entry via Grade 5 Scholarship Merit Scheme (Merit Score: 184/200)',
    terms: [
      {
        id: 'rep_sat_2020_t3',
        term: '3rd Term Annual Assessment 2020 (Grade 6 Entry Year)',
        shortTermLabel: '2020 Term 3 (Grade 6 Entry)',
        issueDate: 'December 04, 2020',
        academicYear: '2020 / Junior Secondary Entry',
        gradeLevel: 'Grade 6',
        classSection: '6-B (Secondary Entry)',
        overallPercentage: 90.4,
        classRank: 2,
        totalStudents: 38,
        conduct: 'Outstanding Entry Scholar',
        attendancePercentage: 99.1,
        isLatest: false,
        principalRemarks:
          'Welcome to St. Michael High School. Outstanding first year completed with exemplary merit standing.',
        subjects: [
          {
            code: 'SCI-06',
            subject: 'Science',
            teacher: 'Mr. K. Bandara',
            score: 95,
            grade: 'A*',
            classAverage: 66,
            highestScore: 96,
            remarks: 'Brilliant understanding in living world topics.'
          },
          {
            code: 'MTH-06',
            subject: 'Mathematics',
            teacher: 'Mrs. M. Senanayake',
            score: 93,
            grade: 'A*',
            classAverage: 64,
            highestScore: 96,
            remarks: 'Top-tier problem solving speed.'
          },
          {
            code: 'ENG-06',
            subject: 'English Language',
            teacher: 'Mrs. Nilmini Silva',
            score: 89,
            grade: 'A',
            classAverage: 68,
            highestScore: 93,
            remarks: 'Active and enthusiastic in class.'
          }
        ]
      }
    ]
  }
];

export const sathurjanAllTermReports: TermReportCard[] = sathurjanAcademicJourney.flatMap((y) => y.terms);

// ----------------------------------------------------------------------
// ANANYA K. - COMPLETE ACADEMIC JOURNEY (GRADE 6 TO GRADE 8)
// ----------------------------------------------------------------------
export const ananyaAcademicJourney: AcademicYearRecord[] = [
  {
    id: 'yr_ana_2026_gr8',
    year: '2026',
    gradeLevel: 'Grade 8',
    stage: 'Junior Secondary',
    classSection: '8-A (Junior Secondary)',
    classTeacher: 'Mrs. Nilmini Silva',
    annualAverage: 92.6,
    annualRank: 1,
    totalStudents: 38,
    attendanceRate: 98.2,
    promotionStatus: 'Current Ongoing (Junior Secondary)',
    awardsOrMilestone: 'Western Music & Violin Senior Soloist Gold Medal',
    terms: [
      {
        id: 'rep_ana_2026_t2',
        term: '2nd Term Summative Assessment 2026',
        shortTermLabel: '2026 Term 2 (Latest)',
        issueDate: 'September 28, 2026',
        academicYear: '2026 / Junior Secondary',
        gradeLevel: 'Grade 8',
        classSection: '8-A (Junior Secondary)',
        overallPercentage: 93.6,
        classRank: 1,
        totalStudents: 38,
        conduct: 'Outstanding & Respectful',
        attendancePercentage: 98.3,
        isLatest: true,
        principalRemarks:
          'First in class ranking with pristine academic standards and prominent participation in Western Music and Inter-House Debating.',
        subjects: [
          {
            code: 'SCI-08',
            subject: 'Science',
            teacher: 'Mr. K. Bandara',
            score: 96,
            grade: 'A*',
            classAverage: 68,
            highestScore: 96,
            remarks: 'Highest score in class! Demonstrates brilliant scientific curiosity and thorough lab records.'
          },
          {
            code: 'MTH-08',
            subject: 'Mathematics',
            teacher: 'Mrs. M. Senanayake',
            score: 92,
            grade: 'A',
            classAverage: 65,
            highestScore: 95,
            remarks: 'Excellent algebraic proficiency and rapid mental arithmetic.'
          },
          {
            code: 'ENG-08',
            subject: 'English Language & Literature',
            teacher: 'Mrs. Nilmini Silva',
            score: 97,
            grade: 'A*',
            classAverage: 73,
            highestScore: 97,
            remarks: 'Outstanding creative composition and impeccable oratory skills.'
          },
          {
            code: 'HIS-08',
            subject: 'History & Civics',
            teacher: 'Mr. P. Rathnayake',
            score: 90,
            grade: 'A',
            classAverage: 70,
            highestScore: 94,
            remarks: 'Passionate interest in Sri Lankan archaeological heritage and civic structures.'
          },
          {
            code: 'LAN-08',
            subject: 'Second Language',
            teacher: 'Mrs. V. Sivalingam',
            score: 94,
            grade: 'A',
            classAverage: 72,
            highestScore: 96,
            remarks: 'Flawless grammatical clarity and rich vocabulary.'
          },
          {
            code: 'MUS-08',
            subject: 'Western Music & Arts',
            teacher: 'Mr. G. Mendis',
            score: 98,
            grade: 'A*',
            classAverage: 78,
            highestScore: 98,
            remarks: 'Gifted violinist in the school junior ensemble; exceptional ear for harmony.'
          }
        ]
      },
      {
        id: 'rep_ana_2026_t1',
        term: '1st Term Summative Assessment 2026',
        shortTermLabel: '2026 Term 1',
        issueDate: 'April 08, 2026',
        academicYear: '2026 / Junior Secondary',
        gradeLevel: 'Grade 8',
        classSection: '8-A (Junior Secondary)',
        overallPercentage: 91.5,
        classRank: 2,
        totalStudents: 38,
        conduct: 'Pleasant & Highly Diligent',
        attendancePercentage: 98.0,
        isLatest: false,
        principalRemarks:
          'Superb performance in the first term. Ananya shows genuine passion for investigative science and creative literature.',
        subjects: [
          {
            code: 'SCI-08',
            subject: 'Science',
            teacher: 'Mr. K. Bandara',
            score: 93,
            grade: 'A',
            classAverage: 66,
            highestScore: 96,
            remarks: 'Very diligent and neat in experiment records.'
          },
          {
            code: 'MTH-08',
            subject: 'Mathematics',
            teacher: 'Mrs. M. Senanayake',
            score: 90,
            grade: 'A',
            classAverage: 63,
            highestScore: 94,
            remarks: 'Very accurate in geometry.'
          },
          {
            code: 'ENG-08',
            subject: 'English Language',
            teacher: 'Mrs. Nilmini Silva',
            score: 95,
            grade: 'A*',
            classAverage: 71,
            highestScore: 96,
            remarks: 'Captivating short story essay.'
          },
          {
            code: 'MUS-08',
            subject: 'Western Music & Arts',
            teacher: 'Mr. G. Mendis',
            score: 96,
            grade: 'A*',
            classAverage: 76,
            highestScore: 97,
            remarks: 'Grade 3 violin distinction standard.'
          }
        ]
      }
    ]
  },
  {
    id: 'yr_ana_2025_gr7',
    year: '2025',
    gradeLevel: 'Grade 7',
    stage: 'Junior Secondary',
    classSection: '7-A',
    classTeacher: 'Mr. G. Mendis',
    annualAverage: 91.2,
    annualRank: 1,
    totalStudents: 36,
    attendanceRate: 98.8,
    promotionStatus: 'Promoted to Grade 8',
    awardsOrMilestone: '1st in Class Academic General Standing; Inter-House Violin Winner',
    terms: [
      {
        id: 'rep_ana_2025_t3',
        term: '3rd Term Annual Assessment 2025 (Grade 7)',
        shortTermLabel: '2025 Term 3 (Grade 7)',
        issueDate: 'December 12, 2025',
        academicYear: '2025 / Primary-Junior',
        gradeLevel: 'Grade 7',
        classSection: '7-A',
        overallPercentage: 92.4,
        classRank: 1,
        totalStudents: 36,
        conduct: 'Outstanding All-Round Student',
        attendancePercentage: 99.0,
        isLatest: false,
        principalRemarks:
          'Completed Grade 7 ranking first in class. A natural leader in school co-curricular music and inter-house athletics.',
        subjects: [
          {
            code: 'SCI-07',
            subject: 'Science',
            teacher: 'Mr. K. Bandara',
            score: 94,
            grade: 'A*',
            classAverage: 67,
            highestScore: 95,
            remarks: 'Thorough project record on environmental conservation.'
          },
          {
            code: 'MTH-07',
            subject: 'Mathematics',
            teacher: 'Mrs. M. Senanayake',
            score: 91,
            grade: 'A',
            classAverage: 64,
            highestScore: 95,
            remarks: 'Very quick with mathematical word problems.'
          },
          {
            code: 'ENG-07',
            subject: 'English Language',
            teacher: 'Mrs. Nilmini Silva',
            score: 96,
            grade: 'A*',
            classAverage: 72,
            highestScore: 96,
            remarks: 'Pristine spelling and captivating narrative stories.'
          },
          {
            code: 'HIS-07',
            subject: 'History & Civics',
            teacher: 'Mr. P. Rathnayake',
            score: 89,
            grade: 'A',
            classAverage: 67,
            highestScore: 92,
            remarks: 'Well-researched project on medieval kingdoms.'
          },
          {
            code: 'LAN-07',
            subject: 'Second Language',
            teacher: 'Mrs. V. Sivalingam',
            score: 92,
            grade: 'A',
            classAverage: 69,
            highestScore: 94,
            remarks: 'Very good oral presentation marks.'
          },
          {
            code: 'MUS-07',
            subject: 'Western Music',
            teacher: 'Mr. G. Mendis',
            score: 95,
            grade: 'A*',
            classAverage: 75,
            highestScore: 96,
            remarks: 'Featured junior soloist at College Carol Service.'
          }
        ]
      },
      {
        id: 'rep_ana_2025_t1',
        term: '1st Term Evaluation 2025',
        shortTermLabel: '2025 Term 1',
        issueDate: 'April 09, 2025',
        academicYear: '2025 / Primary-Junior',
        gradeLevel: 'Grade 7',
        classSection: '7-A',
        overallPercentage: 90.2,
        classRank: 2,
        totalStudents: 36,
        conduct: 'Pleasant & Studious',
        attendancePercentage: 98.6,
        isLatest: false,
        principalRemarks: 'Superb start to Grade 7 studies.',
        subjects: [
          {
            code: 'SCI-07',
            subject: 'Science',
            teacher: 'Mr. K. Bandara',
            score: 91,
            grade: 'A',
            classAverage: 65,
            highestScore: 94,
            remarks: 'Very attentive in science lab.'
          },
          {
            code: 'MTH-07',
            subject: 'Mathematics',
            teacher: 'Mrs. M. Senanayake',
            score: 89,
            grade: 'A',
            classAverage: 62,
            highestScore: 93,
            remarks: 'Very good fractions calculation.'
          }
        ]
      }
    ]
  },
  {
    id: 'yr_ana_2024_gr6',
    year: '2024',
    gradeLevel: 'Grade 6',
    stage: 'Junior Secondary',
    classSection: '6-A (Secondary Entry)',
    classTeacher: 'Mrs. M. Senanayake',
    annualAverage: 92.5,
    annualRank: 1,
    totalStudents: 35,
    attendanceRate: 99.0,
    promotionStatus: 'Promoted to Grade 7',
    awardsOrMilestone: 'Admitted to St. Michael High School; Junior Choir Concertmistress',
    terms: [
      {
        id: 'rep_ana_2024_t3',
        term: '3rd Term Annual Assessment 2024 (Grade 6 Entry Year)',
        shortTermLabel: '2024 Term 3 (Grade 6 Entry)',
        issueDate: 'December 06, 2024',
        academicYear: '2024 / Junior Secondary Entry',
        gradeLevel: 'Grade 6',
        classSection: '6-A (Secondary Entry)',
        overallPercentage: 93.1,
        classRank: 1,
        totalStudents: 35,
        conduct: 'Outstanding',
        attendancePercentage: 99.0,
        isLatest: false,
        principalRemarks:
          'First in class ranking across all terminal evaluations. Exceptional first year in secondary school.',
        subjects: [
          {
            code: 'SCI-06',
            subject: 'Science',
            teacher: 'Mr. K. Bandara',
            score: 95,
            grade: 'A*',
            classAverage: 66,
            highestScore: 96,
            remarks: 'Highest marks in science projects.'
          },
          {
            code: 'MTH-06',
            subject: 'Mathematics',
            teacher: 'Mrs. M. Senanayake',
            score: 92,
            grade: 'A',
            classAverage: 63,
            highestScore: 95,
            remarks: 'Flawless arithmetic.'
          },
          {
            code: 'ENG-06',
            subject: 'English Language',
            teacher: 'Mrs. Nilmini Silva',
            score: 96,
            grade: 'A*',
            classAverage: 70,
            highestScore: 96,
            remarks: 'Outstanding reading and creative writing.'
          }
        ]
      }
    ]
  }
];

export const ananyaAllTermReports: TermReportCard[] = ananyaAcademicJourney.flatMap((y) => y.terms);

export const mockChildrenProfiles: ParentChildProfile[] = [
  {
    id: 'child_01',
    studentId: 'usr_student_01',
    name: 'Sathurjan K.',
    admissionNo: 'STU-1204',
    grade: 'Grade 12',
    classSection: '12-Physical Science (A/L 2026)',
    avatarText: 'SK',
    schoolName: 'St. Michael High School',
    enrolledSinceYear: '2020 (Grade 6 Admission)',
    admissionGrade: 'Grade 6',
    currentStage: 'Collegiate A/L (Grades 12–13)',
    cumulativeCareerAverage: 89.6,
    totalYearsEnrolled: 7,
    classTeacher: 'Mr. Samantha Perera',
    classTeacherEmail: 'samantha.p@school.lk',
    classTeacherPhone: '+94 77 123 4567',
    attendanceRate: 96.5,
    presentDays: 116,
    totalDays: 120,
    overallAverage: 89.4,
    classRank: 3,
    totalStudents: 42,
    upcomingExamsCount: 4,
    hallTicketNo: 'HT-2026-AL-0842',
    nextExamDate: 'Oct 28, 2026',
    nextExamName: 'Physics Advanced Practical Lab Examination',
    termReport: sathurjanAllTermReports[0],
    termReports: sathurjanAllTermReports,
    academicJourney: sathurjanAcademicJourney,
    recentAttendance: [
      { date: '2026-10-09', day: 'Friday', status: 'present', checkInTime: '07:42 AM', note: 'On time' },
      { date: '2026-10-08', day: 'Thursday', status: 'present', checkInTime: '07:38 AM', note: 'On time' },
      { date: '2026-10-07', day: 'Wednesday', status: 'present', checkInTime: '07:45 AM', note: 'On time' },
      { date: '2026-10-06', day: 'Tuesday', status: 'excused', note: 'Medical certificate submitted (Fever recovery)' },
      { date: '2026-10-05', day: 'Monday', status: 'present', checkInTime: '07:40 AM', note: 'On time' },
      { date: '2026-10-02', day: 'Friday', status: 'present', checkInTime: '07:35 AM', note: 'Prefect duty check-in' },
      { date: '2026-10-01', day: 'Thursday', status: 'present', checkInTime: '07:44 AM', note: 'On time' },
      { date: '2026-09-30', day: 'Wednesday', status: 'present', checkInTime: '07:39 AM', note: 'On time' }
    ],
    examSchedules: [
      {
        id: 'ex_01',
        examType: 'Practical / Lab Exam',
        subject: 'Physics',
        paperCode: 'PHY-12-PRAC',
        paperName: 'Physics Laboratory Practical Assessment & Error Analysis',
        date: 'October 28, 2026',
        day: 'Wednesday',
        timeSlot: '01:30 PM - 04:30 PM',
        duration: '3 Hours',
        hallNumber: 'Physics Advanced Research Lab 2',
        seatNumber: 'Bench Station #07',
        syllabusCoverage: 'Spectrometer Refraction, Sonometer Resonant Harmonics, Surface Tension & Viscosity',
        maxMarks: 100,
        status: 'upcoming',
        admissionStatus: 'Hall Ticket Issued'
      },
      {
        id: 'ex_02',
        examType: 'Term 3 Final Exam',
        subject: 'Combined Mathematics',
        paperCode: 'CMTH-12-P1',
        paperName: 'Paper I: Pure Mathematics (Algebra, Calculus, Geometry)',
        date: 'November 16, 2026',
        day: 'Monday',
        timeSlot: '08:00 AM - 11:15 AM',
        duration: '3 Hours 15 Mins',
        hallNumber: 'College Auditorium Main Hall',
        seatNumber: 'Desk #42 (Row D)',
        syllabusCoverage: 'Complex Numbers, Integration by Parts, Matrices, Conic Sections & Differential Equations',
        maxMarks: 100,
        status: 'upcoming',
        admissionStatus: 'Hall Ticket Issued'
      },
      {
        id: 'ex_03',
        examType: 'Term 3 Final Exam',
        subject: 'Physics',
        paperCode: 'PHY-12-P2',
        paperName: 'Paper II: Structured Essay & Theoretical Physics',
        date: 'November 18, 2026',
        day: 'Wednesday',
        timeSlot: '08:00 AM - 11:15 AM',
        duration: '3 Hours 15 Mins',
        hallNumber: 'Science Complex Examination Hall 03',
        seatNumber: 'Desk #18 (Row B)',
        syllabusCoverage: 'Wave Optics, Doppler Effect, Current Electricity, Gravitational & Electric Fields',
        maxMarks: 100,
        status: 'upcoming',
        admissionStatus: 'Hall Ticket Issued'
      },
      {
        id: 'ex_04',
        examType: 'Term 3 Final Exam',
        subject: 'Chemistry',
        paperCode: 'CHM-12-P2',
        paperName: 'Paper II: Physical & Inorganic Chemistry',
        date: 'November 20, 2026',
        day: 'Friday',
        timeSlot: '08:00 AM - 11:15 AM',
        duration: '3 Hours 15 Mins',
        hallNumber: 'Chemistry Lecture Theatre Wing',
        seatNumber: 'Desk #29 (Row C)',
        syllabusCoverage: 'Chemical Kinetics, Dynamic Equilibrium, Phase Equilibria, d-Block Transition Elements',
        maxMarks: 100,
        status: 'upcoming',
        admissionStatus: 'Hall Ticket Issued'
      },
      {
        id: 'ex_05',
        examType: 'Mid-Term Evaluation',
        subject: 'Combined Mathematics',
        paperCode: 'CMTH-12-MID',
        paperName: '2nd Mid-Term Progressive Calculus Assessment',
        date: 'October 02, 2026',
        day: 'Friday',
        timeSlot: '08:30 AM - 10:30 AM',
        duration: '2 Hours',
        hallNumber: 'Hall 12-Physical Science',
        seatNumber: 'Desk #04',
        syllabusCoverage: 'Limits, Continuity & Standard Derivatives',
        maxMarks: 100,
        status: 'completed',
        obtainedScore: 92,
        grade: 'A',
        admissionStatus: 'Completed'
      }
    ],
    pastTermsHistory: [
      {
        termName: '1st Term Evaluation',
        academicYear: '2026',
        aggregateAverage: 86.2,
        classRank: 4,
        totalStudents: 42,
        attendanceRate: 97.0,
        gradeClassification: 'Distinction (Grade A)'
      },
      {
        termName: '2nd Term Evaluation',
        academicYear: '2026',
        aggregateAverage: 89.4,
        classRank: 3,
        totalStudents: 42,
        attendanceRate: 96.5,
        gradeClassification: 'Distinction (Grade A)'
      },
      {
        termName: '3rd Term Evaluation (Target)',
        academicYear: '2026',
        aggregateAverage: 92.0,
        classRank: 2,
        totalStudents: 42,
        attendanceRate: 98.0,
        gradeClassification: 'Target: Island Top Tier'
      }
    ]
  },
  {
    id: 'child_02',
    studentId: 'usr_student_02',
    name: 'Ananya K.',
    admissionNo: 'STU-2415',
    grade: 'Grade 8',
    classSection: '8-A (Junior Secondary)',
    avatarText: 'AK',
    schoolName: 'St. Michael High School',
    enrolledSinceYear: '2024 (Grade 6 Admission)',
    admissionGrade: 'Grade 6',
    currentStage: 'Junior Secondary (Grades 6–9)',
    cumulativeCareerAverage: 92.4,
    totalYearsEnrolled: 3,
    classTeacher: 'Mrs. Nilmini Silva',
    classTeacherEmail: 'nilmini.s@school.lk',
    classTeacherPhone: '+94 71 889 2211',
    attendanceRate: 98.3,
    presentDays: 118,
    totalDays: 120,
    overallAverage: 93.6,
    classRank: 1,
    totalStudents: 38,
    upcomingExamsCount: 4,
    hallTicketNo: 'HT-2026-JS-1420',
    nextExamDate: 'October 29, 2026',
    nextExamName: 'Western Music & Violin Practical Performance',
    termReport: ananyaAllTermReports[0],
    termReports: ananyaAllTermReports,
    academicJourney: ananyaAcademicJourney,
    recentAttendance: [
      { date: '2026-10-09', day: 'Friday', status: 'present', checkInTime: '07:35 AM', note: 'On time' },
      { date: '2026-10-08', day: 'Thursday', status: 'present', checkInTime: '07:32 AM', note: 'On time' },
      { date: '2026-10-07', day: 'Wednesday', status: 'present', checkInTime: '07:40 AM', note: 'On time' },
      { date: '2026-10-06', day: 'Tuesday', status: 'present', checkInTime: '07:36 AM', note: 'On time' },
      { date: '2026-10-05', day: 'Monday', status: 'present', checkInTime: '07:34 AM', note: 'On time' }
    ],
    examSchedules: [
      {
        id: 'ex_06',
        examType: 'Practical / Lab Exam',
        subject: 'Western Music',
        paperCode: 'MUS-08-PRAC',
        paperName: 'Violin Solo Performance & Sight Reading Recital',
        date: 'October 29, 2026',
        day: 'Thursday',
        timeSlot: '10:00 AM - 11:30 AM',
        duration: '1 Hour 30 Mins',
        hallNumber: 'Auditorium Music Conservatory Studio',
        seatNumber: 'Performance Stage #01',
        syllabusCoverage: 'Baroque Concerto in A Minor, Scales & Arpeggios Grade 4 Standard',
        maxMarks: 100,
        status: 'upcoming',
        admissionStatus: 'Hall Ticket Issued'
      },
      {
        id: 'ex_07',
        examType: 'Term 3 Final Exam',
        subject: 'Science',
        paperCode: 'SCI-08-T3',
        paperName: 'Science Theory & Investigative Experiments',
        date: 'November 17, 2026',
        day: 'Tuesday',
        timeSlot: '08:30 AM - 10:30 AM',
        duration: '2 Hours',
        hallNumber: 'Junior Wing Examination Hall B',
        seatNumber: 'Desk #12',
        syllabusCoverage: 'Ecosystems, Chemical Changes, Electrical Current & Reflection of Light',
        maxMarks: 100,
        status: 'upcoming',
        admissionStatus: 'Hall Ticket Issued'
      },
      {
        id: 'ex_08',
        examType: 'Term 3 Final Exam',
        subject: 'Mathematics',
        paperCode: 'MTH-08-T3',
        paperName: 'Mathematics Paper I & II',
        date: 'November 19, 2026',
        day: 'Thursday',
        timeSlot: '08:30 AM - 10:30 AM',
        duration: '2 Hours',
        hallNumber: 'Junior Wing Examination Hall B',
        seatNumber: 'Desk #12',
        syllabusCoverage: 'Algebraic Fractions, Linear Equations, Geometric Theorems & Sets',
        maxMarks: 100,
        status: 'upcoming',
        admissionStatus: 'Hall Ticket Issued'
      },
      {
        id: 'ex_09',
        examType: 'Term 3 Final Exam',
        subject: 'English Language',
        paperCode: 'ENG-08-T3',
        paperName: 'English Language & Literary Appreciation',
        date: 'November 23, 2026',
        day: 'Monday',
        timeSlot: '08:30 AM - 10:30 AM',
        duration: '2 Hours',
        hallNumber: 'Junior Wing Examination Hall B',
        seatNumber: 'Desk #12',
        syllabusCoverage: 'Essay Composition, Comprehension, Poetry Analysis & Grammatical Structures',
        maxMarks: 100,
        status: 'upcoming',
        admissionStatus: 'Hall Ticket Issued'
      }
    ],
    pastTermsHistory: [
      {
        termName: '1st Term Evaluation',
        academicYear: '2026',
        aggregateAverage: 91.5,
        classRank: 2,
        totalStudents: 38,
        attendanceRate: 98.0,
        gradeClassification: 'Distinction (Grade A*)'
      },
      {
        termName: '2nd Term Evaluation',
        academicYear: '2026',
        aggregateAverage: 93.6,
        classRank: 1,
        totalStudents: 38,
        attendanceRate: 98.3,
        gradeClassification: 'First in Class Standing'
      }
    ]
  }
];

export const initialParentLeaveRequests: ParentLeaveRequest[] = [
  {
    id: 'leave_req_01',
    childId: 'child_01',
    childName: 'Sathurjan K.',
    startDate: '2026-10-06',
    endDate: '2026-10-06',
    reason: 'Medical Illness',
    note: 'Viral fever recovery and post-infection clinical blood checkup at Asiri Central Hospital.',
    hasMedicalCertificate: true,
    status: 'approved',
    submittedDate: '2026-10-05',
    reviewedBy: 'Dr. K. Rajasingham (Principal)',
    reviewComment: 'Approved with medical slip. Excused attendance granted.'
  },
  {
    id: 'leave_req_02',
    childId: 'child_01',
    childName: 'Sathurjan K.',
    startDate: '2026-08-14',
    endDate: '2026-08-15',
    reason: 'Official Competition',
    note: 'Representing school at the National Junior Badminton Championship zonal trials.',
    hasMedicalCertificate: false,
    status: 'approved',
    submittedDate: '2026-08-10',
    reviewedBy: 'Mr. Samantha Perera (Class Teacher)',
    reviewComment: 'Sports council confirmation verified. Approved with full attendance honors.'
  }
];

export const initialSchoolCirculars: SchoolCircular[] = [
  {
    id: 'circ_01',
    circularNo: 'CIR/2026/042',
    title: '3rd Term Summative Evaluation Timetable & Guidelines',
    category: 'Academic',
    date: 'October 08, 2026',
    priority: 'high',
    targetAudience: 'Parents of Grades 6 - 13',
    summary: 'Official notification regarding the schedule, paper durations, and study leave intervals for Term 3.',
    content:
      'Dear Parents & Guardians, The 3rd Term final examinations will commence on November 16, 2026. Hall tickets will be issued through the student portal on November 05. Please ensure all project portfolios and practical records are submitted prior to November 02. Morning sessions commence sharply at 08:00 AM.',
    attachmentName: 'Term3_Exam_Schedule_Timetable.pdf',
    attachmentSize: '1.4 MB'
  },
  {
    id: 'circ_02',
    circularNo: 'CIR/2026/039',
    title: 'Annual Parent-Teacher Consultation Day (PTM) Appointment Schedule',
    category: 'Administrative',
    date: 'October 04, 2026',
    priority: 'high',
    targetAudience: 'All Parents',
    summary: 'One-on-one consultation slots with subject educators and class teachers on Saturday, October 24.',
    content:
      'We warmly invite all parents for the Term 2 Academic Review Conference on Saturday, October 24, 2026, from 08:30 AM to 02:00 PM. Parents may discuss term report cards, syllabus pacing, and personal developmental plans directly with subject teachers. Time-slot bookings will open on the Parent Portal this Monday.',
    attachmentName: 'PTM_Hall_Layout_Slots.pdf',
    attachmentSize: '820 KB'
  },
  {
    id: 'circ_03',
    circularNo: 'CIR/2026/035',
    title: 'School Transport & Bus Fleet Monsoon Safety Advisory',
    category: 'Safety',
    date: 'September 29, 2026',
    priority: 'normal',
    targetAudience: 'Parents using School Transport',
    summary: 'Updated departure timings and safety measures during heavy monsoon rain showers.',
    content:
      'In view of the forecasted inter-monsoon rain bands in the Western and Southern provinces, our school transport management committee has issued enhanced precautionary guidelines. Drivers will adhere strictly to 40 km/h limits with GPS tracking monitored real-time in the school operations center.',
    attachmentName: 'Bus_Route_Monsoon_Guidelines.pdf',
    attachmentSize: '450 KB'
  }
];
