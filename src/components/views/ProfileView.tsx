"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import {
  User,
  MapPin,
  BookOpen,
  GraduationCap,
  School,
  Edit3,
  Save,
  Check,
  Users,
  CheckCircle2,
  Camera,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Copy,
  Printer,
  Calendar,
  Clock,
  Download,
  FileCheck,
  UserCheck,
  ShieldCheck,
  Trophy,
  Award,
  Activity,
  Medal,
  Zap,
  Briefcase
} from "lucide-react";
import { initialExams, initialExamTermResult } from "@/data/mockData";

type ProfileTab =
  | "personal"
  | "academic"
  | "timetable"
  | "transcripts"
  | "sports"
  | "teaching"
  | "qualifications"
  | "schedule"
  | "responsibilities";

export function ProfileView() {
  const { currentUser, currentRole, setCurrentView, addToast, courses, setSelectedCourseId } = useApp();

  const [activeTab, setActiveTab] = useState<ProfileTab>("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const handleContinueCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView("courses");
  };

  const handleDownloadHallTicket = () => {
    addToast({
      type: "success",
      title: "Hall Ticket Downloaded",
      message: "Official Examination Admission Card & Timetable (PDF) has been saved."
    });
  };

  const handleDownloadTranscript = () => {
    addToast({
      type: "success",
      title: "Transcript Downloaded",
      message: "Certified Official Academic Transcript with Z-Score downloaded."
    });
  };

  const handleDownloadSportsCertificate = () => {
    addToast({
      type: "success",
      title: "Sports Portfolio Downloaded",
      message: "Official Athletic Achievement Record & College Colors Transcript (PDF) has been saved."
    });
  };

  // Editable Profile State based on role
  const defaultProfile = useMemo(() => {
    if (currentRole === "teacher") {
      return {
        name: currentUser.name || "Mr. Samantha Perera",
        fullName: "Samantha Priyantha Perera",
        preferredName: "Samantha",
        studentId: "TCH-2026-0042",
        indexNumber: "SLTS-REG/2012/4482",
        email: currentUser.email || "samantha.p@school.lk",
        phone: "+94 77 456 7890",
        altPhone: "+94 11 234 5678",
        dob: "1984-06-18",
        gender: "Male",
        bloodGroup: "B+",
        medium: "English, Sinhala & Tamil",
        address: "No. 18, Havelock Road, Havelock Town",
        city: "Colombo 05",
        district: "Colombo",
        province: "Western Province",
        postalCode: "00500",
        bio: "Senior Master & Head of Department for Combined Mathematics (A/L). 14 years of teaching excellence preparing students for G.C.E. Advanced Level with distinction.",
        schoolName: currentUser.schoolName || "St. Michael High School",
        schoolCode: "SMH-042",
        grade: "A/L Faculty (Grade 12 & 13)",
        classRoom: "Advanced Level Mathematics Faculty",
        stream: "Combined Mathematics & Pure Sciences",
        academicYear: "Faculty Member (2012 - Present)",
        house: "Vijaya House Patron",
        classTeacher: "Head of Department (Mathematics)",
        admittedDate: "September 2012",
        attendanceRate: "99.1%",
        gpa: "Faculty Rating 4.9/5.0",
        guardianName: "Mrs. Malini Perera",
        guardianRelationship: "Spouse (Next of Kin)",
        guardianPhone: "+94 77 987 6543",
        guardianEmail: "malini.perera@gmail.com",
        guardianOccupation: "Senior Banking Executive",
        motherName: "M. Perera",
        motherPhone: "+94 11 234 5678",
        emergencyContact: "Staff Council Welfare (+94 11 258 0042)",
        transportMode: "Faculty Parking (Pass #FC-42)",
        healthNotes: "Normal health clearance. First-aid certified.",
        extracurricular: "Master-in-Charge Mathematics Olympiad, Senior Chess Club Patron"
      };
    }

    return {
      name: currentUser.name || "Sathurjan K.",
      fullName: "Sathurjan Kandasamy",
      preferredName: "Sathu",
      studentId: "STU-2026-0842",
      indexNumber: "AL/2026/89421",
      email: currentUser.email || "sathurjan@school.lk",
      phone: "+94 77 123 4567",
      altPhone: "+94 11 234 5678",
      dob: "2008-03-14",
      gender: "Male",
      bloodGroup: "O+",
      medium: "English & Tamil",
      address: "No. 42, Temple Road, Wellawatte",
      city: "Colombo 06",
      district: "Colombo",
      province: "Western Province",
      postalCode: "00600",
      bio: "Passionate Advanced Level Physical Science student with keen interest in Pure Mathematics, Quantum Mechanics, and Software Engineering. Aspiring to enter the Faculty of Engineering.",
      schoolName: currentUser.schoolName || "St. Michael High School",
      schoolCode: "SMH-042",
      grade: currentUser.grade || "Grade 12",
      classRoom: currentUser.class || "12-Physical Science",
      stream: "Physical Science (G.C.E. Advanced Level)",
      academicYear: "2024 - 2026",
      house: "Vijaya House (Yellow)",
      classTeacher: "Mr. Samantha Perera",
      admittedDate: "January 2021",
      attendanceRate: "96.4%",
      gpa: "3.84 / 4.0",
      guardianName: "K. Kandasamy",
      guardianRelationship: "Father",
      guardianPhone: "+94 71 888 4321",
      guardianEmail: "kandasamy.k@gmail.com",
      guardianOccupation: "Chartered Civil Engineer",
      motherName: "S. Kandasamy",
      motherPhone: "+94 77 555 8912",
      emergencyContact: "K. Kandasamy (+94 71 888 4321)",
      transportMode: "School Van (Route 04 - Wellawatte / Bambalapitiya)",
      healthNotes: "No known allergies. Normal health clearance.",
      extracurricular: "Member of ICT Society, Cricket 2nd XI, Science Club"
    };
  }, [currentRole, currentUser]);

  const [profileData, setProfileData] = useState(defaultProfile);

  useEffect(() => {
    setProfileData(defaultProfile);
    if (currentRole === "teacher") {
      if (!["personal", "teaching", "schedule"].includes(activeTab)) {
        setActiveTab("personal");
      }
    } else {
      if (!["personal", "academic", "timetable", "transcripts", "sports"].includes(activeTab)) {
        setActiveTab("personal");
      }
    }
  }, [defaultProfile, currentRole]);

  const [avatarPreset, setAvatarPreset] = useState<string>("default");
  const [selectedScheduleDay, setSelectedScheduleDay] = useState<"Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday">("Monday");

  const handleCopyId = () => {
    navigator.clipboard?.writeText(profileData.studentId);
    setCopiedId(true);
    addToast({
      type: "info",
      title: "ID Copied",
      message: `${currentRole === "teacher" ? "Faculty ID " : ""}${profileData.studentId} copied to clipboard.`
    });
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleDownloadTeacherDossier = () => {
    addToast({
      type: "success",
      title: "Faculty Dossier Downloaded",
      message: "Official Senior Faculty Dossier & SLTS Service Record (PDF) has been saved."
    });
  };

  const handleDownloadTeacherTimetable = () => {
    addToast({
      type: "success",
      title: "Teaching Schedule Downloaded",
      message: "Weekly Academic Lecture & Laboratory Master Schedule (PDF) has been saved."
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    addToast({
      type: "success",
      title: "Profile Saved",
      message: "Your profile information has been successfully updated!"
    });
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <button
              onClick={() => setCurrentView("dashboard")}
              className="hover:text-[#0d5c4d] transition-colors flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-bold text-[#0d5c4d] capitalize">
              {currentRole} Profile
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0d2b26] tracking-tight">
            User Profile &amp; Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your personal identity, academic records, and institutional credentials.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#d6ede6] hover:bg-[#f6fbf9] text-xs font-bold text-slate-700 transition-all flex items-center gap-1.5 shadow-2xs"
            title="Print or Save Profile Record as PDF"
          >
            <Printer className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">Print Record</span>
          </button>

          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-[#0d5c4d] hover:bg-[#0a473b] text-xs font-bold text-white transition-all flex items-center gap-1.5 shadow-sm shadow-[#0d5c4d]/20"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Save Changes</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl bg-[#0d5c4d] hover:bg-[#0a473b] text-xs font-bold text-white transition-all flex items-center gap-1.5 shadow-sm shadow-[#0d5c4d]/20"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Profile Hero Card */}
      <div className="relative rounded-3xl bg-white border border-[#e2eae5] p-5 sm:p-7 shadow-[0_12px_32px_-8px_rgba(13,92,77,0.08)] overflow-hidden">
        {/* Background decorative gradient */}
        <div className="absolute top-0 right-0 w-96 h-36 bg-gradient-to-l from-[#ecf8f5] via-[#f4faf7]/60 to-transparent pointer-events-none rounded-tr-3xl" />
        <div className="absolute top-3 right-4 sm:top-5 sm:right-6 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0] text-xs font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {currentRole === "teacher" ? "Senior Faculty Member · Active Service" : "Active Enrolled · Term 2"}
          </span>
        </div>

        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5 sm:gap-6">
          {/* Avatar with preset selection & edit indicator */}
          <div className="relative group shrink-0">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-3xl bg-gradient-to-br from-[#0d5c4d] to-[#16423b] flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-lg shadow-[#0d5c4d]/25 border-4 border-white ring-2 ring-[#0d5c4d]/10">
              {profileData.name.charAt(0)}
            </div>
            {isEditing && (
              <button
                type="button"
                className="absolute -bottom-1.5 -right-1.5 h-8 w-8 rounded-full bg-[#f3b738] text-slate-900 flex items-center justify-center shadow-md border-2 border-white hover:scale-105 transition-transform"
                title="Change Avatar Photo"
              >
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-black text-[#0d2b26]">
                {profileData.fullName}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#fef7e6] text-[#b47a16] border border-[#fde4af] text-[11px] font-bold capitalize">
                {currentRole === "teacher" ? "Senior Faculty / Educator" : currentRole}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
                {profileData.stream}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              {profileData.bio}
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <School className="h-3.5 w-3.5 text-[#0d5c4d]" />
                <span className="font-semibold text-slate-700">{profileData.schoolName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-[#0d5c4d]" />
                <span>{profileData.classRoom}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#0d5c4d]" />
                <span>{profileData.city}, Sri Lanka</span>
              </div>
              <button
                onClick={handleCopyId}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors font-mono font-bold text-[11px] text-slate-700 cursor-pointer"
                title={currentRole === "teacher" ? "Click to copy Faculty ID" : "Click to copy Student ID"}
              >
                <span>{currentRole === "teacher" ? `Faculty ID: ${profileData.studentId}` : `ID: ${profileData.studentId}`}</span>
                {copiedId ? (
                  <Check className="h-3 w-3 text-emerald-600" />
                ) : (
                  <Copy className="h-3 w-3 text-slate-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Performance Indicators (Student only) */}
        {currentRole !== "teacher" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-100">
            <div className="p-3 rounded-2xl bg-[#f8faf9] border border-[#e2eae5]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Attendance</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg font-black text-[#0d5c4d]">{profileData.attendanceRate}</span>
                <span className="text-[10px] text-slate-500 font-semibold">82 / 85 days</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#f8faf9] border border-[#e2eae5]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Term GPA</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg font-black text-amber-600">3.84</span>
                <span className="text-[10px] text-slate-500 font-semibold">Rank #3 in Stream</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#f8faf9] border border-[#e2eae5]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Subjects</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg font-black text-[#0d2b26]">4 Enrolled</span>
                <span className="text-[10px] text-emerald-600 font-bold">19 Completed</span>
              </div>
            </div>
          </div>
        )}
      </div>


      {/* Profile Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {(currentRole === "teacher"
          ? [
              { id: "personal", label: "Faculty Profile & Info", icon: User },
              { id: "teaching", label: "Assigned Classes & Workload", icon: BookOpen },
              { id: "schedule", label: "Weekly Teaching Timetable", icon: Calendar }
            ]
          : [
              { id: "personal", label: "Personal Details", icon: User },
              { id: "academic", label: "Academic & Subjects", icon: GraduationCap },
              { id: "timetable", label: "Examination Timetable", icon: Calendar },
              { id: "transcripts", label: "Official Term Transcripts", icon: FileCheck },
              { id: "sports", label: "Sports & Achievements", icon: Trophy }
            ]
        ).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ProfileTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#0d5c4d] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-[#0d5c4d] hover:bg-[#ecf8f5] border border-slate-200"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* TAB 1: PERSONAL DETAILS                                            */}
      {/* =================================================================== */}
      {activeTab === "personal" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#e2eae5] p-5 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-[#0d2b26] flex items-center gap-2">
                  <User className="h-4 w-4 text-[#0d5c4d]" />
                  <span>{currentRole === "teacher" ? "Faculty Official Identification" : "General Information"}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentRole === "teacher"
                    ? "Official personal identification and Ministry of Education service registration."
                    : "Official personal identification as registered with the Ministry of Education."}
                </p>
              </div>
              {isEditing && (
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Editing Mode Active
                </span>
              )}
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full Legal Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c4d] focus:ring-2 focus:ring-[#0d5c4d]/10"
                  />
                ) : (
                  <p className="p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-semibold text-slate-900">
                    {profileData.fullName}
                  </p>
                )}
              </div>

              {/* Preferred Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Display / Preferred Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c4d] focus:ring-2 focus:ring-[#0d5c4d]/10"
                  />
                ) : (
                  <p className="p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-semibold text-slate-900">
                    {profileData.name}
                  </p>
                )}
              </div>

              {/* Student ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {currentRole === "teacher" ? "Teacher Service / Faculty ID" : "Student Admission / Reg Number"}
                </label>
                <p className="p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-mono font-bold text-[#0d5c4d]">
                  {profileData.studentId}
                </p>
              </div>

              {/* G.C.E. A/L Index Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {currentRole === "teacher" ? "Sri Lanka Teachers' Service (SLTS) Reg Number" : "Exam Index Number (A/L 2026)"}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.indexNumber}
                    onChange={(e) => setProfileData({ ...profileData, indexNumber: e.target.value })}
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:border-[#0d5c4d] focus:ring-2 focus:ring-[#0d5c4d]/10"
                  />
                ) : (
                  <p className="p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-mono font-semibold text-slate-900">
                    {profileData.indexNumber}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Email Address (Institutional)</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c4d] focus:ring-2 focus:ring-[#0d5c4d]/10"
                  />
                ) : (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-semibold text-slate-900">
                    <span>{profileData.email}</span>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Mobile Phone Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c4d] focus:ring-2 focus:ring-[#0d5c4d]/10"
                  />
                ) : (
                  <p className="p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-semibold text-slate-900">
                    {profileData.phone}
                  </p>
                )}
              </div>

              {/* Date of Birth & Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.dob}
                      onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                      className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c4d]"
                    />
                  ) : (
                    <p className="p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-semibold text-slate-900">
                      {profileData.dob}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Gender</label>
                  {isEditing ? (
                    <select
                      value={profileData.gender}
                      onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c4d]"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-semibold text-slate-900">
                      {profileData.gender}
                    </p>
                  )}
                </div>
              </div>

              {/* Medium & Blood Group */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Medium of Study</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.medium}
                      onChange={(e) => setProfileData({ ...profileData, medium: e.target.value })}
                      className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs"
                    />
                  ) : (
                    <p className="p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-semibold text-slate-900">
                      {profileData.medium}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Blood Group</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.bloodGroup}
                      onChange={(e) => setProfileData({ ...profileData, bloodGroup: e.target.value })}
                      className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs font-bold text-red-600"
                    />
                  ) : (
                    <p className="p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-bold text-red-600">
                      {profileData.bloodGroup}
                    </p>
                  )}
                </div>
              </div>

              {/* Residential Address */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Residential Street Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c4d]"
                  />
                ) : (
                  <p className="p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-semibold text-slate-900">
                    {profileData.address}, {profileData.city}, {profileData.district}, {profileData.province}
                  </p>
                )}
              </div>

              {/* Bio Statement */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Personal Statement / Bio</label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c4d] leading-relaxed"
                  />
                ) : (
                  <p className="p-3 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    {profileData.bio}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* TEACHER QUALIFICATIONS & ACCREDITATIONS (Embedded inside Faculty Profile & Info) */}
          {currentRole === "teacher" && (
            <div className="bg-white rounded-3xl border border-[#e2eae5] p-5 sm:p-7 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-base text-[#0d2b26] flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#0d5c4d]" />
                    <span>Academic Degrees, Professional Accreditations &amp; Licensing</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verified university credentials, post-graduate education diplomas, and Ministry examiner licenses.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadTeacherDossier}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0d5c4d] hover:bg-[#0a473b] text-white font-bold text-xs shadow-md transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Faculty Dossier (PDF)</span>
                </button>
              </div>

              {/* Higher Education Degrees */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#0d2b26] flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-[#0d5c4d]" />
                  <span>University Degrees &amp; Higher Education</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      degree: "Bachelor of Science (B.Sc. Special) in Mathematics",
                      institution: "University of Colombo, Sri Lanka",
                      honors: "First Class Honours (GPA: 3.92 / 4.0)",
                      year: "Class of 2008",
                      details: "Pure Mathematics, Real Analysis, Complex Variables, Abstract Algebra & Numerical Methods."
                    },
                    {
                      degree: "Post Graduate Diploma in Education (PGDE)",
                      institution: "National Institute of Education (NIE), Maharagama",
                      honors: "Passed with Distinction",
                      year: "Class of 2014",
                      details: "Secondary & Collegiate STEM Pedagogy, Educational Psychology, Curriculum Formulation & Evaluation."
                    },
                    {
                      degree: "Master of Science (M.Sc.) in Applied Mathematics",
                      institution: "University of Peradeniya",
                      honors: "Thesis Distinction",
                      year: "Class of 2018",
                      details: "Thesis: Numerical Modeling of Partial Differential Equations & Boundary Value Simulations."
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#f8faf9] border border-[#e2eae5] space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-[#0d5c4d] bg-[#ecf8f5] px-2 py-0.5 rounded-full border border-[#c4e9e0]">
                          {item.year}
                        </span>
                        <h5 className="font-black text-sm text-[#0d2b26] leading-snug">{item.degree}</h5>
                        <p className="text-xs font-semibold text-slate-700">{item.institution}</p>
                        <p className="text-xs text-amber-700 font-bold">{item.honors}</p>
                      </div>
                      <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200/60 leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Government Licensing & Accreditations */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-sm text-[#0d2b26] flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#0d5c4d]" />
                  <span>Professional Licensing &amp; National Accreditations</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Sri Lanka Teachers' Service (SLTS) Class 1 Senior Educator",
                      issuer: "Ministry of Education, Isurupaya, Battaramulla",
                      regNo: "SLTS-REG/2012/4482",
                      status: "Active & Permanent Pensionable Service · 14 Years Seniority",
                      badge: "SLTS Class 1",
                      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200"
                    },
                    {
                      title: "G.C.E. Advanced Level Chief Examiner & Paper Setter Accreditation",
                      issuer: "Department of Examinations, Pelawatte, Battaramulla",
                      regNo: "EXAM-AL/MTH-P03",
                      status: "Supervising Examiner · Combined Mathematics Paper Evaluation Panel 03",
                      badge: "Chief Examiner",
                      badgeColor: "bg-blue-50 text-blue-800 border-blue-200"
                    },
                    {
                      title: "National STEM Pedagogical Master Trainer & Digital Lead",
                      issuer: "UNESCO & National Education Commission (NEC)",
                      regNo: "STEM-LK/2021/88",
                      status: "Accredited Master Facilitator for Advanced Collegiate Mathematics Instruction",
                      badge: "Master Trainer",
                      badgeColor: "bg-purple-50 text-purple-800 border-purple-200"
                    },
                    {
                      title: "Provincial Teaching Excellence & Mentorship Award (2023)",
                      issuer: "Western Provincial Department of Education",
                      regNo: "WP-EDU/AWARD/2023",
                      status: "Awarded for 98% Distinction Rate in A/L Combined Mathematics Examination",
                      badge: "Provincial Award",
                      badgeColor: "bg-amber-50 text-amber-800 border-amber-200"
                    }
                  ].map((lic, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-[#e6ece8] shadow-2xs hover:shadow-xs transition-shadow space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${lic.badgeColor}`}>
                            {lic.badge}
                          </span>
                          <h5 className="font-extrabold text-sm text-[#0d2b26] mt-1.5 leading-snug">{lic.title}</h5>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 shrink-0">
                          {lic.regNo}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 font-medium">{lic.issuer}</p>

                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold pt-2 border-t border-slate-100">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        <span>{lic.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* NEXT OF KIN & EMERGENCY LIAISON CARD (Teacher) / PARENT & GUARDIAN CARD (Student) */}
          <div className="bg-white rounded-3xl border border-[#e2eae5] p-5 sm:p-7 shadow-xs space-y-6">
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-[#0d2b26] flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#0d5c4d]" />
                  <span>
                    {currentRole === "teacher"
                      ? "Next of Kin & Emergency Liaison"
                      : "Parent & Guardian Information"}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentRole === "teacher"
                    ? "Official contact information for institutional welfare, emergency liaison, and faculty benefits."
                    : "Contact information for emergencies, parent-teacher conferences, and academic communications."}
                </p>
              </div>
              {isEditing && (
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Editing Mode Active
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Primary Contact Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {currentRole === "teacher" ? "Next of Kin Full Name" : "Primary Guardian Name"}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.guardianName}
                    onChange={(e) => setProfileData({ ...profileData, guardianName: e.target.value })}
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c4d]"
                  />
                ) : (
                  <p className="p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-semibold text-slate-900">
                    {profileData.guardianName}
                  </p>
                )}
              </div>

              {/* Relationship */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {currentRole === "teacher" ? "Relationship to Faculty Member" : "Relationship to Student"}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.guardianRelationship}
                    onChange={(e) => setProfileData({ ...profileData, guardianRelationship: e.target.value })}
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c4d]"
                  />
                ) : (
                  <p className="p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-semibold text-slate-900">
                    {profileData.guardianRelationship}
                  </p>
                )}
              </div>

              {/* Contact Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {currentRole === "teacher" ? "Primary Contact Phone" : "Primary Contact Phone"}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.guardianPhone}
                    onChange={(e) => setProfileData({ ...profileData, guardianPhone: e.target.value })}
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c4d]"
                  />
                ) : (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-semibold text-slate-900">
                    <span>{profileData.guardianPhone}</span>
                    <a
                      href={`tel:${profileData.guardianPhone}`}
                      className="text-[10px] text-[#0d5c4d] font-bold hover:underline"
                    >
                      {currentRole === "teacher" ? "Call Next of Kin" : "Call Guardian"}
                    </a>
                  </div>
                )}
              </div>

              {/* Contact Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {currentRole === "teacher" ? "Contact Email Address" : "Guardian Email"}
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.guardianEmail}
                    onChange={(e) => setProfileData({ ...profileData, guardianEmail: e.target.value })}
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c4d]"
                  />
                ) : (
                  <p className="p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-semibold text-slate-900">
                    {profileData.guardianEmail}
                  </p>
                )}
              </div>

              {/* Occupation */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {currentRole === "teacher" ? "Occupation / Workplace" : "Guardian Occupation / Workplace"}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.guardianOccupation}
                    onChange={(e) => setProfileData({ ...profileData, guardianOccupation: e.target.value })}
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c4d]"
                  />
                ) : (
                  <p className="p-2.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs font-semibold text-slate-900">
                    {profileData.guardianOccupation}
                  </p>
                )}
              </div>

              {/* Emergency Contact */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {currentRole === "teacher" ? "Faculty Welfare & Emergency Liaison (24/7)" : "Emergency Contact (24/7)"}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.emergencyContact}
                    onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                    className="w-full h-10 px-3.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c4d]"
                  />
                ) : (
                  <p className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-900">
                    {profileData.emergencyContact}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TEACHER TAB 2: ASSIGNED CLASSES & WORKLOAD                          */}
      {/* =================================================================== */}
      {currentRole === "teacher" && activeTab === "teaching" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#e2eae5] p-5 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-[#0d2b26] flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#0d5c4d]" />
                  <span>Teaching Allocation &amp; Academic Workload (2026 Session)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Assigned batches, weekly lecture periods, syllabus completion tracking, and student counts.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCurrentView("teaching")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0d5c4d] hover:bg-[#0a473b] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
              >
                <span>Launch Teaching Studio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Workload Metric KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="bg-[#f8faf9] rounded-2xl p-4 border border-[#e2eae5] shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Weekly Teaching Load</span>
                <p className="text-2xl font-black text-[#0d5c4d] mt-1 font-mono">28 Periods</p>
                <p className="text-[10px] text-emerald-700 font-bold mt-1">Full-Time Collegiate Faculty</p>
              </div>

              <div className="bg-[#f8faf9] rounded-2xl p-4 border border-[#e2eae5] shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Allocated Batches</span>
                <p className="text-2xl font-black text-[#0d2b26] mt-1 font-mono">4 Classes</p>
                <p className="text-[10px] text-slate-500 mt-1">Grade 12 &amp; Grade 13 A/L</p>
              </div>

              <div className="bg-[#f8faf9] rounded-2xl p-4 border border-[#e2eae5] shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Enrolled Students</span>
                <p className="text-2xl font-black text-[#0d2b26] mt-1 font-mono">142 Students</p>
                <p className="text-[10px] text-slate-500 mt-1">Physical Science Stream</p>
              </div>

              <div className="bg-[#f8faf9] rounded-2xl p-4 border border-[#e2eae5] shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Class Mastery</span>
                <p className="text-2xl font-black text-amber-600 mt-1 font-mono">91.4%</p>
                <p className="text-[10px] text-amber-700 font-bold mt-1">Highest in Science Faculty</p>
              </div>
            </div>

            {/* Allocated Courses Cards */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-[#0d2b26]">Official Class Allocations &amp; Delivery Progress</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Combined Mathematics 12 (Pure & Applied)",
                    code: "CMATH-12A",
                    className: "Grade 12-Physical Science A",
                    students: 42,
                    periods: "8 Periods / Week",
                    venue: "Hall 04 · Science Wing",
                    schedule: "Mon (08:00), Wed (08:00), Fri (09:50)",
                    progress: 76,
                    unitsDone: 9,
                    unitsTotal: 12,
                    badgeColor: "border-indigo-200 bg-indigo-50/50 text-indigo-800"
                  },
                  {
                    title: "Pure Mathematics 13 (Advanced Problem Solving)",
                    code: "PMATH-13",
                    className: "Grade 13-Physical Science",
                    students: 38,
                    periods: "8 Periods / Week",
                    venue: "Lecture Hall A · Collegiate Complex",
                    schedule: "Mon (09:50), Tue (09:50), Thu (08:00)",
                    progress: 88,
                    unitsDone: 14,
                    unitsTotal: 16,
                    badgeColor: "border-emerald-200 bg-emerald-50/50 text-emerald-800"
                  },
                  {
                    title: "Applied Mathematics Mechanics & Computing",
                    code: "AMATH-12B",
                    className: "Grade 12-Physical Science B",
                    students: 35,
                    periods: "6 Periods / Week",
                    venue: "Physics & Computing Lab 02",
                    schedule: "Tue (08:00), Wed (09:50)",
                    progress: 70,
                    unitsDone: 7,
                    unitsTotal: 10,
                    badgeColor: "border-blue-200 bg-blue-50/50 text-blue-800"
                  },
                  {
                    title: "G.C.E. A/L Model Paper Discussion & Booster",
                    code: "MC-13",
                    className: "Combined Science Stream",
                    students: 27,
                    periods: "6 Periods / Week",
                    venue: "Collegiate Auditorium",
                    schedule: "Fri (08:00), Sat Morning",
                    progress: 92,
                    unitsDone: 11,
                    unitsTotal: 12,
                    badgeColor: "border-amber-200 bg-amber-50/50 text-amber-800"
                  }
                ].map((course, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-[#e6ece8] bg-[#fcfdfc] hover:border-[#b2e5d9] hover:shadow-xs transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${course.badgeColor}`}>
                            {course.code}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">{course.className}</span>
                        </div>
                        <h4 className="font-extrabold text-sm text-[#0d2b26] mt-1.5">{course.title}</h4>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700">
                        {course.students} Students
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 text-xs bg-white p-3 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Workload</span>
                        <p className="font-semibold text-slate-800">{course.periods}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Assigned Venue</span>
                        <p className="font-semibold text-slate-800 line-clamp-1">{course.venue}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Weekly Time Slot</span>
                        <p className="font-semibold text-[#0d5c4d]">{course.schedule}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Syllabus Completion</span>
                        <span className="font-bold text-[#0d5c4d]">
                          {course.unitsDone} of {course.unitsTotal} Units ({course.progress}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0d5c4d] to-[#147a66] rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <button
                        type="button"
                        onClick={() => setCurrentView("syllabus_builder")}
                        className="text-[11px] font-bold text-[#0d5c4d] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Syllabus Builder</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentView("assignments")}
                        className="text-[11px] font-bold text-slate-600 hover:text-[#0d5c4d] transition-colors cursor-pointer"
                      >
                        View Coursework &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TEACHER TAB 3: WEEKLY TEACHING TIMETABLE                            */}
      {/* =================================================================== */}
      {currentRole === "teacher" && activeTab === "schedule" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#e2eae5] p-5 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-[#0d2b26] flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#0d5c4d]" />
                  <span>Weekly Faculty Teaching Timetable &amp; Consultation Hours</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Daily period allocation, classroom locations, student office hours, and department meetings.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadTeacherTimetable}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#d6dfd9] text-[#0d5c4d] hover:bg-[#ecf8f5] font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print Timetable</span>
                </button>
              </div>
            </div>

            {/* Day Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const).map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedScheduleDay(day)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedScheduleDay === day
                      ? "bg-[#0d5c4d] text-white shadow-xs"
                      : "bg-[#f8faf9] text-slate-600 hover:bg-[#ecf8f5] border border-slate-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Day Schedule Notice Banner */}
            <div className="p-3 rounded-2xl bg-[#f6fbf9] border border-[#c4e9e0] flex items-center justify-between gap-3 text-xs text-[#0d5c4d]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold">Schedule for {selectedScheduleDay} · 2026 Academic Term</span>
              </div>
              <span className="font-mono font-bold text-[11px] bg-white px-2.5 py-0.5 rounded-full border border-[#b2e5d9]">
                Senior Master Schedule
              </span>
            </div>

            {/* Period Cards Grid */}
            <div className="space-y-3">
              {[
                ...(selectedScheduleDay === "Monday"
                  ? [
                      { period: "Period 1", time: "08:00 - 08:45", subject: "Combined Mathematics - Differential Calculus", class: "Grade 12-A", venue: "Hall 04 · Science Wing", type: "Lecture" },
                      { period: "Period 2", time: "08:45 - 09:30", subject: "Combined Mathematics - Calculus Tutorial & Problem Sets", class: "Grade 12-A", venue: "Hall 04 · Science Wing", type: "Tutorial" },
                      { period: "Recess", time: "09:30 - 09:50", subject: "Morning Interval & Faculty Refreshment", class: "Staff Council", venue: "Faculty Lounge", type: "Break" },
                      { period: "Period 3", time: "09:50 - 10:35", subject: "Pure Mathematics - Complex Numbers & De Moivre's Theorem", class: "Grade 13-Science", venue: "Lecture Hall A", type: "Lecture" },
                      { period: "Period 4", time: "10:35 - 11:20", subject: "Pure Mathematics - Advanced Exam Proofs Workshop", class: "Grade 13-Science", venue: "Lecture Hall A", type: "Masterclass" },
                      { period: "Period 5", time: "11:20 - 12:05", subject: "Staff Office Hours & Student Doubt Clearing", class: "All A/L Students", venue: "HOD Office 12", type: "Consultation" },
                      { period: "Lunch", time: "12:05 - 12:45", subject: "Lunch Interval", class: "Staff Dining", venue: "Staff Club", type: "Break" },
                      { period: "Period 6", time: "12:45 - 01:30", subject: "Math Olympiad Elite Coaching Squad", class: "SLMC Selected Team", venue: "Seminar Room 01", type: "Co-Curricular" }
                    ]
                  : selectedScheduleDay === "Tuesday"
                  ? [
                      { period: "Period 1", time: "08:00 - 08:45", subject: "Applied Mathematics - Dynamics & Newton's Laws", class: "Grade 12-B", venue: "Room 12-B", type: "Lecture" },
                      { period: "Period 2", time: "08:45 - 09:30", subject: "Applied Mathematics - Friction & Equilibrium Systems", class: "Grade 12-B", venue: "Room 12-B", type: "Lecture" },
                      { period: "Recess", time: "09:30 - 09:50", subject: "Morning Interval & Faculty Refreshment", class: "Staff Council", venue: "Faculty Lounge", type: "Break" },
                      { period: "Period 3", time: "09:50 - 10:35", subject: "Pure Mathematics - Trigonometric Integrals", class: "Grade 13-Science", venue: "Lecture Hall A", type: "Lecture" },
                      { period: "Period 4", time: "10:35 - 11:20", subject: "Pure Mathematics - Differential Equations & Growth Models", class: "Grade 13-Science", venue: "Lecture Hall A", type: "Lecture" },
                      { period: "Period 5", time: "11:20 - 12:05", subject: "Curriculum Planning & Scheme of Work Review", class: "Mathematics Faculty", venue: "HOD Office 12", type: "Admin" },
                      { period: "Lunch", time: "12:05 - 12:45", subject: "Lunch Interval", class: "Staff Dining", venue: "Staff Club", type: "Break" },
                      { period: "Period 6", time: "12:45 - 02:00", subject: "Department Assessment Moderation", class: "Senior Staff", venue: "Boardroom", type: "Evaluation" }
                    ]
                  : selectedScheduleDay === "Wednesday"
                  ? [
                      { period: "Period 1", time: "08:00 - 08:45", subject: "Combined Mathematics - Polynomials & Roots Theorem", class: "Grade 12-A", venue: "Hall 04 · Science Wing", type: "Lecture" },
                      { period: "Period 2", time: "08:45 - 09:30", subject: "Combined Mathematics - Quadratic Expressions & Inequalities", class: "Grade 12-A", venue: "Hall 04 · Science Wing", type: "Tutorial" },
                      { period: "Recess", time: "09:30 - 09:50", subject: "Morning Interval & Faculty Refreshment", class: "Staff Council", venue: "Faculty Lounge", type: "Break" },
                      { period: "Period 3-4", time: "09:50 - 11:20", subject: "Applied Mathematics Mechanics Practical Lab", class: "Grade 12-B", venue: "Physics & Computing Lab 02", type: "Practical" },
                      { period: "Period 5", time: "11:20 - 12:05", subject: "Remedial Coaching for Borderline Candidates", class: "Grade 12 Stream", venue: "Hall 04", type: "Mentoring" },
                      { period: "Lunch", time: "12:05 - 12:45", subject: "Lunch Interval", class: "Staff Dining", venue: "Staff Club", type: "Break" },
                      { period: "Period 6", time: "12:45 - 02:15", subject: "College Chess Club Practice Session", class: "Inter-School Squad", venue: "College Pavilion", type: "Co-Curricular" }
                    ]
                  : selectedScheduleDay === "Thursday"
                  ? [
                      { period: "Period 1-2", time: "08:00 - 09:30", subject: "Pure Mathematics - Vectors in 3D Space & Dot Products", class: "Grade 13-Science", venue: "Lecture Hall A", type: "Double Lecture" },
                      { period: "Recess", time: "09:30 - 09:50", subject: "Morning Interval & Faculty Refreshment", class: "Staff Council", venue: "Faculty Lounge", type: "Break" },
                      { period: "Period 3", time: "09:50 - 10:35", subject: "Combined Mathematics - Coordinate Geometry & Straight Lines", class: "Grade 12-A", venue: "Hall 04 · Science Wing", type: "Lecture" },
                      { period: "Period 4", time: "10:35 - 11:20", subject: "Combined Mathematics - Circles & Tangents Formulation", class: "Grade 12-A", venue: "Hall 04 · Science Wing", type: "Lecture" },
                      { period: "Period 5", time: "11:20 - 12:05", subject: "Parent Consultations & Student Academic Guidance", class: "By Appointment", venue: "Senior Staff Room", type: "Consultation" },
                      { period: "Lunch", time: "12:05 - 12:45", subject: "Lunch Interval", class: "Staff Dining", venue: "Staff Club", type: "Break" },
                      { period: "Period 6", time: "12:45 - 02:00", subject: "Collegiate Academic Council Meeting", class: "Senior Staff", venue: "Principal's Conference Room", type: "Admin" }
                    ]
                  : [
                      { period: "Period 1-2", time: "08:00 - 09:30", subject: "Grade 13 Exam Booster & Past Paper Workshop", class: "Grade 13-Science", venue: "Lecture Hall A", type: "Workshop" },
                      { period: "Recess", time: "09:30 - 09:50", subject: "Morning Interval & Faculty Refreshment", class: "Staff Council", venue: "Faculty Lounge", type: "Break" },
                      { period: "Period 3", time: "09:50 - 10:35", subject: "Grade 12-B Hydrostatics & Fluid Pressure Theory", class: "Grade 12-B", venue: "Room 12-B", type: "Lecture" },
                      { period: "Period 4", time: "10:35 - 11:20", subject: "Weekly Mathematics Faculty Sync & Briefing", class: "Department Staff", venue: "HOD Office 12", type: "Department Sync" },
                      { period: "Period 5", time: "11:20 - 12:05", subject: "Teacher Reflection & Digital Lesson Upload", class: "LMS Portal", venue: "Staff IT Suite", type: "LMS Portal" },
                      { period: "Lunch", time: "12:05 - 12:45", subject: "Lunch Interval", class: "Staff Dining", venue: "Staff Club", type: "Break" },
                      { period: "Period 6", time: "12:45 - 02:15", subject: "G.C.E. Advanced Level Grading & Feedback Desk", class: "Assignments", venue: "Staff Room", type: "Grading" }
                    ])
              ].map((slot, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    slot.type === "Break"
                      ? "bg-slate-50/60 border-slate-200/60 opacity-80"
                      : "bg-white border-[#e6ece8] hover:border-[#b2e5d9] shadow-2xs"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-24 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex flex-col items-center justify-center font-bold shrink-0">
                      <span className="text-[11px] font-black">{slot.period}</span>
                      <span className="text-[9px] text-slate-500 font-mono">{slot.time}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#0d2b26]">{slot.subject}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {slot.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Target: <span className="font-semibold text-slate-700">{slot.class}</span> · Room:{" "}
                        <span className="font-semibold text-[#0d5c4d]">{slot.venue}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto shrink-0">
                    Scheduled ✓
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* STUDENT TABS (Only for student / parent roles)                      */}
      {/* =================================================================== */}
      {currentRole !== "teacher" && (
        <>
          {/* TAB 2: ACADEMIC & SUBJECTS                                         */}
          {activeTab === "academic" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#e2eae5] p-5 sm:p-7 shadow-xs space-y-6">
            <div>
              <h3 className="font-extrabold text-base text-[#0d2b26] flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[#0d5c4d]" />
                <span>Enrolled Curriculum &amp; Faculty Mentors</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Current term academic load, class assignment, and instructor details.
              </p>
            </div>

            {/* School & Stream Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e2eae5] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Institution</span>
                <p className="font-black text-sm text-[#0d2b26]">{profileData.schoolName}</p>
                <p className="text-[11px] text-slate-500">School Code: {profileData.schoolCode} · Western</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e2eae5] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Class &amp; Stream</span>
                <p className="font-black text-sm text-[#0d2b26]">{profileData.classRoom}</p>
                <p className="text-[11px] text-slate-500">{profileData.stream}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e2eae5] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Class Teacher</span>
                <p className="font-black text-sm text-[#0d2b26]">{profileData.classTeacher}</p>
                <p className="text-[11px] text-slate-500">Senior Faculty · Science Division</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e2eae5] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sports House</span>
                <p className="font-black text-sm text-[#0d2b26]">{profileData.house}</p>
                <p className="text-[11px] text-amber-600 font-semibold">House Captain Nominee</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e2eae5] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Academic Term</span>
                <p className="font-black text-sm text-[#0d2b26]">Term 2 (2026 Session)</p>
                <p className="text-[11px] text-emerald-600 font-semibold">Mid-Term Completed</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e2eae5] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Extracurriculars</span>
                <p className="font-black text-sm text-[#0d2b26]">ICT Society &amp; Cricket</p>
                <p className="text-[11px] text-slate-500">Active member</p>
              </div>
            </div>

            {/* Enrolled Subjects List */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="font-bold text-sm text-[#0d2b26]">Active Subjects for G.C.E. Advanced Level</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    name: "Combined Mathematics",
                    code: "CM-AL-2026",
                    teacher: "Mrs. Kavitha Rajan",
                    progress: "72% Complete",
                    grade: "94% (A+)",
                    color: "border-emerald-200 bg-emerald-50/40"
                  },
                  {
                    name: "Physics (Theory & Practicals)",
                    code: "PHY-AL-2026",
                    teacher: "Mr. Thuvaragan S.",
                    progress: "68% Complete",
                    grade: "88% (A)",
                    color: "border-blue-200 bg-blue-50/40"
                  },
                  {
                    name: "Chemistry",
                    code: "CHEM-AL-2026",
                    teacher: "Dr. Sarath Perera",
                    progress: "65% Complete",
                    grade: "91% (A)",
                    color: "border-purple-200 bg-purple-50/40"
                  },
                  {
                    name: "Information & Communication Technology",
                    code: "ICT-AL-2026",
                    teacher: "Mr. P. Selvakumar",
                    progress: "80% Complete",
                    grade: "96% (A+)",
                    color: "border-amber-200 bg-amber-50/40"
                  }
                ].map((subject, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border ${subject.color} flex items-center justify-between transition-all hover:shadow-xs`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-900">{subject.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{subject.code}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Instructor: {subject.teacher}</p>
                      <p className="text-[10px] text-emerald-700 font-bold">{subject.progress}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-[#0d5c4d] bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-2xs">
                        {subject.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB: EXAMINATION TIMETABLE                                         */}
      {/* =================================================================== */}
      {activeTab === "timetable" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#e2eae5] p-5 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-[#0d2b26] flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#0d5c4d]" />
                  <span>Second Term Final Examination Schedule · Grade 12</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official dates, session timings, assigned examination halls, seat numbers, and invigilator details.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownloadHallTicket}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#d6dfd9] text-[#0d5c4d] hover:bg-[#ecf8f5] font-bold text-xs shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>Print Hall Admission Pass</span>
              </button>
            </div>

            {/* Candidate Notice Banner */}
            <div className="p-3.5 rounded-2xl bg-[#f6fbf9] border border-[#c4e9e0] flex items-center justify-between gap-3 text-xs text-[#0d5c4d]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold">Candidate Index: {profileData.indexNumber}</span>
                <span className="hidden sm:inline text-slate-400">|</span>
                <span className="hidden sm:inline text-slate-600">Report 30 mins prior to commencement</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#b2e5d9] font-extrabold text-[10px] text-[#0d5c4d] shadow-2xs">
                Term 2 Finals
              </span>
            </div>

            {/* Exams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initialExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-[#fcfdfc] rounded-2xl border border-[#e6ece8] p-5 shadow-2xs hover:shadow-md hover:border-[#b2e5d9] transition-all space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#ecf8f5] text-[#0d5c4d] text-[10px] font-bold uppercase tracking-wider">
                        {exam.subject}
                      </span>
                      <h4 className="font-extrabold text-sm text-[#0d2b26] mt-1.5 leading-snug">
                        {exam.title}
                      </h4>
                    </div>

                    <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-extrabold text-[11px] border border-amber-200 shrink-0">
                      {exam.durationMinutes / 60} Hours
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-white p-3 rounded-xl border border-[#eef3f0]">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Calendar className="h-4 w-4 text-[#0d5c4d] shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">Date</p>
                        <p className="font-bold">{exam.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700">
                      <Clock className="h-4 w-4 text-[#0d5c4d] shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">Time</p>
                        <p className="font-bold">{exam.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="h-4 w-4 text-[#0d5c4d] shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">Allocated Venue</p>
                        <p className="font-bold line-clamp-1">{exam.hallName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700">
                      <UserCheck className="h-4 w-4 text-[#0d5c4d] shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">Seat Number</p>
                        <p className="font-bold text-[#0d5c4d]">{exam.seatNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#f0f4f1] text-xs">
                    <span className="text-slate-400 text-[11px]">
                      Invigilator: <span className="text-slate-700 font-semibold">{exam.invigilator}</span>
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Scheduled ✓
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB: OFFICIAL TERM TRANSCRIPTS                                     */}
      {/* =================================================================== */}
      {activeTab === "transcripts" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#e2eae5] p-5 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-[#0d2b26] flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-[#0d5c4d]" />
                  <span>Certified Academic Transcript &amp; G.C.E. Advanced Level Evaluation</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official statement of marks, standardized Z-Scores, district rankings, and examiner remarks.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownloadTranscript}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0d5c4d] hover:bg-[#0a473b] text-white font-bold text-xs shadow-md transition-colors self-start sm:self-auto cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download Official Transcript (PDF)</span>
              </button>
            </div>

            {/* Transcript KPI Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="bg-[#f8faf9] rounded-2xl p-4 border border-[#e2eae5] shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Standardized Z-Score</span>
                <p className="text-2xl font-black text-[#0d5c4d] mt-1 font-mono">
                  {initialExamTermResult.zScore.toFixed(4)}
                </p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">National Benchmark A/L</p>
              </div>

              <div className="bg-[#f8faf9] rounded-2xl p-4 border border-[#e2eae5] shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">District Merit Rank</span>
                <p className="text-2xl font-black text-[#0d2b26] mt-1 font-mono">
                  #{initialExamTermResult.districtRank}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">Colombo Educational District</p>
              </div>

              <div className="bg-[#f8faf9] rounded-2xl p-4 border border-[#e2eae5] shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">All-Island Rank</span>
                <p className="text-2xl font-black text-[#0d2b26] mt-1 font-mono">
                  #{initialExamTermResult.islandRank}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">Physical Science Stream</p>
              </div>

              <div className="bg-[#f8faf9] rounded-2xl p-4 border border-[#e2eae5] shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Term Evaluation GPA</span>
                <p className="text-2xl font-black text-amber-600 mt-1 font-mono">
                  {initialExamTermResult.gpa.toFixed(2)}
                </p>
                <p className="text-[10px] text-amber-700 font-bold mt-1">First Class Standing</p>
              </div>
            </div>

            {/* Official Grade Table */}
            <div className="bg-white rounded-2xl border border-[#e6ece8] shadow-xs overflow-hidden">
              <div className="p-4 bg-[#f8faf9] border-b border-[#e6ece8] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#0d2b26]">
                    {initialExamTermResult.termTitle}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Candidate: <span className="font-bold text-slate-800">{initialExamTermResult.candidateName}</span> (
                    {profileData.indexNumber || initialExamTermResult.indexNumber})
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-xl border border-slate-200">
                  Issued: {initialExamTermResult.issuedDate}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#fcfdfc] border-b border-[#e6ece8] text-slate-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4 text-center">Marks (100)</th>
                      <th className="py-3 px-4 text-center">Grade</th>
                      <th className="py-3 px-4 text-center">Class Rank</th>
                      <th className="py-3 px-4">Teacher Remark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f4f1]">
                    {initialExamTermResult.subjects.map((sub, idx) => (
                      <tr key={idx} className="hover:bg-[#f9fbf9] transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{sub.subjectName}</td>
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-[#0d5c4d]">
                          {sub.marksObtained}%
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {sub.grade}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-slate-600">
                          #{sub.rankInClass}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 italic max-w-xs">{sub.teacherRemark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-[#f8faf9] border-t border-[#e6ece8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <p className="text-slate-600">
                  <span className="font-bold text-slate-800">Principal&apos;s Endorsement:</span>{" "}
                  <span className="italic">{initialExamTermResult.principalRemark}</span>
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0d5c4d] bg-white px-3 py-1 rounded-xl border border-[#c4e9e0] shrink-0">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Ministry Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB: SPORTS & ATHLETIC ACHIEVEMENTS RECORD                         */}
      {/* =================================================================== */}
      {activeTab === "sports" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#e2eae5] p-5 sm:p-7 shadow-xs space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-[#0d2b26] flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-[#0d5c4d]" />
                  <span>Student Athletic Portfolio &amp; Sports Achievement Records</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified institutional sports credentials, tournament records, representative honours, and fitness certifications.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownloadSportsCertificate}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0d5c4d] hover:bg-[#0a473b] text-white font-bold text-xs shadow-md transition-colors self-start sm:self-auto cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download Sports Record (PDF)</span>
              </button>
            </div>

            {/* Top Athletic Metrics / Honours Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="bg-[#f8faf9] rounded-2xl p-4 border border-[#e2eae5] shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Sport</span>
                <p className="text-lg font-black text-[#0d5c4d] mt-1">Cricket (First XI)</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">Vice Captain</span>
                  <span className="text-[10px] text-slate-500 font-semibold">Jersey #07</span>
                </div>
              </div>

              <div className="bg-[#f8faf9] rounded-2xl p-4 border border-[#e2eae5] shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">College Honours</span>
                <p className="text-lg font-black text-[#0d2b26] mt-1">Double Colorsman</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">Cricket &amp; Track Athletics</p>
              </div>

              <div className="bg-[#f8faf9] rounded-2xl p-4 border border-[#e2eae5] shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Career Medals</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-black text-amber-600 font-mono">12</p>
                  <span className="text-[11px] font-bold text-slate-600">Medals Won</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">6 Gold • 4 Silver • 2 Bronze</p>
              </div>

              <div className="bg-[#f8faf9] rounded-2xl p-4 border border-[#e2eae5] shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fitness Level</span>
                <p className="text-lg font-black text-[#0d5c4d] mt-1 font-mono">Grade A+ (Elite)</p>
                <p className="text-[10px] text-emerald-700 font-bold mt-1">Yo-Yo IR1: Level 19.4 • Fit</p>
              </div>
            </div>

            {/* Active Teams & Squad Roster Enrollment */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#0d2b26] flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-[#0d5c4d]" />
                <span>Enrolled Teams &amp; Squad Rosters</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* Team 1: Cricket */}
                <div className="p-4 rounded-2xl bg-[#fcfdfc] border border-[#e2eae5] hover:border-[#b2e5d9] transition-all space-y-3 shadow-2xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-extrabold">
                        Major Sport
                      </span>
                      <h5 className="font-extrabold text-sm text-[#0d2b26] mt-1">Under-17 &amp; First XI Cricket</h5>
                    </div>
                    <span className="text-xl">🏏</span>
                  </div>
                  <div className="text-xs space-y-1 text-slate-600">
                    <p><span className="font-bold text-slate-800">Role:</span> All-Rounder / Vice Captain</p>
                    <p><span className="font-bold text-slate-800">Specialty:</span> Right-Hand Bat, Right-Arm Medium Fast</p>
                    <p><span className="font-bold text-slate-800">Coach:</span> Mr. Samantha Perera</p>
                    <p><span className="font-bold text-slate-800">Schedule:</span> Mon, Wed, Fri (3:30 - 5:30 PM)</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-bold">16 Appearances</span>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-bold">Active Captaincy ✓</span>
                  </div>
                </div>

                {/* Team 2: Athletics */}
                <div className="p-4 rounded-2xl bg-[#fcfdfc] border border-[#e2eae5] hover:border-[#b2e5d9] transition-all space-y-3 shadow-2xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-extrabold">
                        Track &amp; Field
                      </span>
                      <h5 className="font-extrabold text-sm text-[#0d2b26] mt-1">Senior Track &amp; Sprint Squad</h5>
                    </div>
                    <span className="text-xl">🏃</span>
                  </div>
                  <div className="text-xs space-y-1 text-slate-600">
                    <p><span className="font-bold text-slate-800">Events:</span> 100m, 200m &amp; 4x100m Relay Anchor</p>
                    <p><span className="font-bold text-slate-800">Personal Best:</span> 100m: 11.02s | 200m: 22.45s</p>
                    <p><span className="font-bold text-slate-800">Coach:</span> Mr. M. Faizal</p>
                    <p><span className="font-bold text-slate-800">Schedule:</span> Tue, Thu (6:00 - 7:30 AM)</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-bold">National Qualifier</span>
                    <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-bold">School Record Holder</span>
                  </div>
                </div>

                {/* Team 3: Inter-House */}
                <div className="p-4 rounded-2xl bg-[#fcfdfc] border border-[#e2eae5] hover:border-[#b2e5d9] transition-all space-y-3 shadow-2xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[10px] font-extrabold">
                        Inter-House
                      </span>
                      <h5 className="font-extrabold text-sm text-[#0d2b26] mt-1">Vijaya House Athletics</h5>
                    </div>
                    <span className="text-xl">🏆</span>
                  </div>
                  <div className="text-xs space-y-1 text-slate-600">
                    <p><span className="font-bold text-slate-800">Role:</span> Senior Boys House Sports Captain</p>
                    <p><span className="font-bold text-slate-800">Meet Points:</span> 28 Individual Championship Points</p>
                    <p><span className="font-bold text-slate-800">House Master:</span> Mr. K. Sivakumar</p>
                    <p><span className="font-bold text-slate-800">House Rank:</span> 1st Place Overall (2026)</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-purple-700 font-bold">Best Senior Athlete</span>
                    <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md font-bold">House Shield ✓</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Tournament Achievements & Medals Table */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#0d2b26] flex items-center gap-1.5">
                <Medal className="h-3.5 w-3.5 text-amber-500" />
                <span>Official Tournament Achievements &amp; Medal Records</span>
              </h4>

              <div className="bg-white rounded-2xl border border-[#e6ece8] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#fcfdfc] border-b border-[#e6ece8] text-slate-400 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Event / Tournament</th>
                        <th className="py-3 px-4">Sport</th>
                        <th className="py-3 px-4 text-center">Medal / Award</th>
                        <th className="py-3 px-4">Level</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Performance Highlights</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f4f1]">
                      {[
                        {
                          tournament: "All-Island Inter-School Tier 1 Tournament (Finals)",
                          sport: "Cricket",
                          medal: "Gold Medal & Man of the Match",
                          medalType: "gold",
                          level: "National Tier 1",
                          date: "Sept 2026",
                          highlights: "Scored 78* (62 balls) & took 4/28 vs Royal Academy. St. Michael won by 38 runs."
                        },
                        {
                          tournament: "Sri Lanka All-Island Schools Athletics Meet",
                          sport: "Athletics",
                          medal: "Gold Medal (New Record)",
                          medalType: "gold",
                          level: "All-Island National",
                          date: "July 2025",
                          highlights: "4x100m Relay Anchor Leg (School Record: 42.18s)."
                        },
                        {
                          tournament: "Western Provincial Track & Field Championship",
                          sport: "Athletics",
                          medal: "Silver Medal",
                          medalType: "silver",
                          level: "Provincial",
                          date: "Aug 2025",
                          highlights: "200m Sprint Final: 22.45 seconds (PB)."
                        },
                        {
                          tournament: "College Annual Colors Night 2025/2026",
                          sport: "Multi-Sport",
                          medal: "College Double Colors Award",
                          medalType: "colors",
                          level: "Institutional",
                          date: "Feb 2026",
                          highlights: "Honoured with St. Michael Golden Crest for cricket and sprint athletics excellence."
                        },
                        {
                          tournament: "Annual Inter-House Sports Championship",
                          sport: "Athletics",
                          medal: "Senior Champion Trophy",
                          medalType: "trophy",
                          level: "Inter-House",
                          date: "Feb 2026",
                          highlights: "Gold in 100m, Gold in 200m, Gold in 4x100m Relay. Total 28 Points for Vijaya House."
                        },
                        {
                          tournament: "All-Island Junior Badminton Championship",
                          sport: "Badminton",
                          medal: "Bronze Medal",
                          medalType: "bronze",
                          level: "National Junior",
                          date: "Nov 2024",
                          highlights: "Under-16 Boys Doubles Semi-Finalist."
                        }
                      ].map((item, idx) => (
                        <tr key={idx} className="hover:bg-[#f9fbf9] transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900">{item.tournament}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ecf8f5] text-[#0d5c4d]">
                              {item.sport}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                                item.medalType === "gold"
                                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                                  : item.medalType === "silver"
                                  ? "bg-slate-200 text-slate-800 border border-slate-300"
                                  : item.medalType === "colors"
                                  ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                  : item.medalType === "trophy"
                                  ? "bg-purple-100 text-purple-900 border border-purple-300"
                                  : "bg-orange-100 text-orange-900 border border-orange-300"
                              }`}
                            >
                              {item.medal}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 font-semibold">{item.level}</td>
                          <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{item.date}</td>
                          <td className="py-3.5 px-4 text-slate-600 text-[11px] max-w-xs">{item.highlights}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Fitness, Biometrics & Coach Clearance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Biometrics */}
              <div className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e2eae5] space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-extrabold text-xs uppercase tracking-wider text-[#0d2b26] flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-[#0d5c4d]" />
                    <span>Physical Biometrics &amp; Conditioning</span>
                  </h5>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                    Medical Fit ✓
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Height / Weight</p>
                    <p className="font-black text-[#0d2b26] mt-0.5">178 cm / 68 kg</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Yo-Yo Test</p>
                    <p className="font-black text-[#0d5c4d] mt-0.5">Level 19.4</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">VO2 Max</p>
                    <p className="font-black text-amber-600 mt-0.5">58.2 ml/kg</p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 space-y-1 pt-1 border-t border-slate-200/60">
                  <p>• Medical Examiner: <span className="font-bold text-slate-700">Dr. H. Wickremasinghe, MBBS</span> (Sports Medicine Board)</p>
                  <p>• Clearance Validity: <span className="font-bold text-slate-700">Full Academic Year 2026/2027</span></p>
                </div>
              </div>

              {/* Coach Endorsement */}
              <div className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e2eae5] space-y-3 flex flex-col justify-between">
                <div>
                  <h5 className="font-extrabold text-xs uppercase tracking-wider text-[#0d2b26] flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#0d5c4d]" />
                    <span>Prefect of Games &amp; Coach Endorsement</span>
                  </h5>
                  <p className="text-xs text-slate-600 italic mt-2 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                    &ldquo;Sathurjan is an exemplary natural leader on the field. His tactical awareness as Vice Captain in our First XI cricket team and explosive anchor leg in athletics reflect exceptional dedication, balancing top physical fitness with academic brilliance.&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/60">
                  <span className="font-bold text-slate-700">Mr. Samantha Perera (Prefect of Games)</span>
                  <span className="px-2 py-0.5 rounded-full bg-white border border-[#c4e9e0] text-[#0d5c4d] font-bold">
                    Official Stamp Verified ✓
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
}
