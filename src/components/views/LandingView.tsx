"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  GraduationCap,
  School,
  Shield,
  BookOpen,
  CheckCircle2,
  FileText,
  ClipboardCheck,
  Award,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Zap,
  Check,
  Lock,
  Mail,
  User as UserIcon,
  Building2,
  Eye,
  EyeOff,
  X,
  Trophy,
  Calendar,
  Globe,
  ChevronRight,
  HelpCircle,
  LogIn,
  UserPlus
} from "lucide-react";

type SupportedRole = "student" | "teacher" | "admin";

export function LandingView({ onEnterApp }: { onEnterApp: () => void }) {
  const { setCurrentRole, addToast, schools, t } = useApp();

  // Auth Modal State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [selectedRole, setSelectedRole] = useState<SupportedRole>("student");

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form State
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupSchool, setSignupSchool] = useState("St. Michael High School");
  const [signupGradeOrDept, setSignupGradeOrDept] = useState("Grade 11-A");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Pre-fill credentials based on role
  const rolePresetCredentials = {
    student: {
      name: "Sathurjan K.",
      email: "sathurjan@school.lk",
      detail: "Grade 12-Physical Science",
      school: "St. Michael High School"
    },
    teacher: {
      name: "Mr. Samantha Perera",
      email: "samantha.p@school.lk",
      detail: "Senior Science Faculty",
      school: "St. Michael High School"
    },
    admin: {
      name: "Dr. K. Rajasingham",
      email: "principal@school.lk",
      detail: "Head Administrator / Principal",
      school: "St. Michael High School"
    }
  };

  const openAuthModal = (tab: "login" | "signup", role: SupportedRole = "student") => {
    setAuthTab(tab);
    setSelectedRole(role);
    setLoginEmail(rolePresetCredentials[role].email);
    setLoginPassword("••••••••");
    setIsAuthOpen(true);
  };

  const handleRoleSelectInModal = (role: SupportedRole) => {
    setSelectedRole(role);
    setLoginEmail(rolePresetCredentials[role].email);
    if (role === "student") {
      setSignupGradeOrDept("Grade 11-A");
    } else if (role === "teacher") {
      setSignupGradeOrDept("Science & Math Faculty");
    } else {
      setSignupGradeOrDept("Campus Administration");
    }
  };

  const handle1ClickDemoLogin = (role: SupportedRole) => {
    setCurrentRole(role);
    setIsAuthOpen(false);
    addToast({
      type: "success",
      title: `Signed in as ${role === "student" ? "Student" : role === "teacher" ? "Teacher" : "Administrator"}`,
      message: `Welcome back, ${rolePresetCredentials[role].name}!`
    });
    onEnterApp();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentRole(selectedRole);
    setIsAuthOpen(false);
    addToast({
      type: "success",
      title: "Login Successful",
      message: `Welcome back to LimaT Smart Book (${selectedRole === "student" ? "Student" : selectedRole === "teacher" ? "Teacher" : "Admin"} Portal)`
    });
    onEnterApp();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword && signupConfirmPassword && signupPassword !== signupConfirmPassword) {
      addToast({
        type: "error",
        title: "Password Mismatch",
        message: "The passwords entered do not match. Please re-enter."
      });
      return;
    }
    setCurrentRole(selectedRole);
    setIsAuthOpen(false);
    addToast({
      type: "success",
      title: "Account Created Successfully!",
      message: `Welcome, ${signupName || rolePresetCredentials[selectedRole].name}! Your ${selectedRole} profile has been initialized.`
    });
    onEnterApp();
  };

  const learningLoop = [
    { title: "Teacher Creates", desc: "Syllabus, units, video lessons & learning media", icon: BookOpen },
    { title: "Student Learns", desc: "Interactive study notes & digital classroom", icon: Sparkles },
    { title: "Student Practices", desc: "Past papers, quizzes & term exercise sets", icon: Zap },
    { title: "Student Submits", desc: "Digital assignments & written answers", icon: FileText },
    { title: "Teacher Marks", desc: "Grading desk with structured rubrics", icon: ClipboardCheck },
    { title: "Feedback Delivered", desc: "Transparent release of scores & notes", icon: Award },
    { title: "Progress Measured", desc: "Visual analytics, reports & mastery", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-[#fbfcfb] text-[#0d2b26] flex flex-col justify-between selection:bg-[#0d5c4d] selection:text-white">
      {/* LimaT Smart Book Public Navigation Header */}
      <nav className="h-20 border-b border-[#e6ece8] bg-white/95 backdrop-blur-md px-4 sm:px-10 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#f3b738] flex items-center justify-center text-slate-950 font-black text-xl shadow-xs font-sans">
            L
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-[#0d2b26]">
                LimaT Smart Book
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0] text-[10px] font-extrabold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0d5c4d]" />
                Sri Lanka Education
              </span>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-[#0d5c4d] font-black">
              LEARN · GROW · LEAD
            </p>
          </div>
        </div>

        {/* Desktop Anchor Links */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-600">
          <a href="#roles" className="hover:text-[#0d5c4d] transition-colors">Portals & Roles</a>
          <a href="#learning-loop" className="hover:text-[#0d5c4d] transition-colors">Learning Loop</a>
          <a href="#curriculum" className="hover:text-[#0d5c4d] transition-colors">Sri Lankan Curriculum</a>
          <a href="#school-life" className="hover:text-[#0d5c4d] transition-colors">School Life</a>
        </div>

        {/* Auth CTA Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => openAuthModal("login", "student")}
            className="text-xs font-bold text-slate-700 hover:text-[#0d5c4d] px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogIn className="h-3.5 w-3.5 text-[#0d5c4d]" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => openAuthModal("signup", "student")}
            className="text-xs font-black bg-[#0d5c4d] hover:bg-[#083e34] text-white rounded-xl px-4 sm:px-5 py-2.5 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Join School</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-8 lg:px-12 py-12 sm:py-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* National Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0] text-xs font-black shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#0d5c4d] animate-pulse" />
              <span>Built for Sri Lankan Schools • English | සිංහල | தமிழ்</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0d2b26] leading-[1.12]">
              Learning and school life, <br />
              <span className="text-[#0d5c4d]">beautifully connected.</span>
            </h1>

            {/* Descriptive Summary */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              LimaT Smart Book brings syllabus units, past papers, timed exams, homework grading, sports tournaments, and official circulars into one calm, trusted platform for your school.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => openAuthModal("signup", "student")}
                className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-black text-sm px-7 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                Join your school <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => openAuthModal("login", "student")}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
              >
                Sign in to your account
              </button>
            </div>

            {/* Tri-lingual & Curriculum Checknotes */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 pt-2">
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#0d5c4d]" />
                <span>Designed for English, සිංහල and தமிழ்</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#0d5c4d]" />
                <span>G.C.E. O/L & A/L Exam Ready</span>
              </div>
            </div>
          </div>

          {/* Right Hero Community Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-[#e6ece8] bg-white shadow-xl">
              {/* Graphic Header with School Info */}
              <div className="h-80 sm:h-96 w-full bg-gradient-to-br from-[#0d5c4d] via-[#10705e] to-[#082a24] p-7 sm:p-8 flex flex-col justify-between text-white relative">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
                    St. Michael High School
                  </span>
                  <div className="h-8 w-8 rounded-full bg-[#f3b738] text-slate-950 font-black flex items-center justify-center text-xs">
                    L
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[11px] font-black text-[#f3b738] uppercase tracking-wider">
                    School Academic Hub
                  </span>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    Academics, Athletics & Community
                  </h3>
                  <p className="text-xs text-slate-200/90 leading-relaxed">
                    Connecting 1,420 students, 86 faculty teachers, and 11 sports teams with real-time updates.
                  </p>

                  {/* Micro Badges */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm text-center">
                      <p className="text-sm font-black text-white">1,420</p>
                      <p className="text-[9px] text-slate-300 font-bold uppercase">Students</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm text-center">
                      <p className="text-sm font-black text-white">86</p>
                      <p className="text-[9px] text-slate-300 font-bold uppercase">Faculty</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm text-center">
                      <p className="text-sm font-black text-white">11</p>
                      <p className="text-[9px] text-slate-300 font-bold uppercase">Houses & Teams</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Footer Card */}
              <div className="p-5 bg-white border-t border-[#e6ece8] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center shrink-0">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#0d2b26]">
                      One Connected School Community
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Learning, progress & campus life in harmony
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openAuthModal("login", "student")}
                  className="px-3 py-1.5 rounded-lg bg-[#ecf8f5] hover:bg-[#0d5c4d] text-[#0d5c4d] hover:text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
                >
                  Explore →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 User Role Pathways Section (ONLY Student, Teacher, Administrator) */}
        <div id="roles" className="mt-20 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0d5c4d] bg-[#ecf8f5] px-3 py-1 rounded-full border border-[#c4e9e0]">
              Dedicated Portals
            </span>
            <h2 className="text-3xl font-black text-[#0d2b26]">
              Choose Your School Pathway
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tailored workspaces engineered specifically for each member of the school ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Student Portal */}
            <div className="p-7 rounded-3xl bg-white border border-[#e6ece8] hover:border-[#0d5c4d] hover:shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="h-14 w-14 rounded-2xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#ecf8f5] text-[#0d5c4d]">
                    Student
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#0d2b26] group-hover:text-[#0d5c4d] transition-colors">
                    Student Portal
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Access syllabus courses, download past papers, submit homework, take timed exams, and track house points.
                  </p>
                </div>

                <ul className="space-y-2 text-xs font-semibold text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0d5c4d]" />
                    <span>Interactive syllabus units & video lessons</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0d5c4d]" />
                    <span>Past papers & marking scheme library</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0d5c4d]" />
                    <span>Homework upload & instant score feedback</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0d5c4d]" />
                    <span>House athletic meets & team fixtures</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 space-y-2">
                <button
                  type="button"
                  onClick={() => openAuthModal("login", "student")}
                  className="w-full bg-[#0d5c4d] hover:bg-[#083e34] text-white font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Sign In as Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => handle1ClickDemoLogin("student")}
                  className="w-full bg-[#ecf8f5] hover:bg-[#d8f2eb] text-[#0d5c4d] font-bold text-[11px] py-2 rounded-xl transition-all cursor-pointer"
                >
                  ⚡ Instant Demo: Sathurjan K. (12-Sci)
                </button>
              </div>
            </div>

            {/* 2. Teacher Faculty */}
            <div className="p-7 rounded-3xl bg-white border border-[#e6ece8] hover:border-[#f3b738] hover:shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="h-14 w-14 rounded-2xl bg-[#fef7e6] text-[#b47a16] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                    <School className="h-7 w-7" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#fef7e6] text-[#b47a16]">
                    Teacher
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#0d2b26] group-hover:text-[#b47a16] transition-colors">
                    Teacher Faculty
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Design curricula, upload learning resources, grade submissions with rubrics, and deliver transparent marks.
                  </p>
                </div>

                <ul className="space-y-2 text-xs font-semibold text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#f3b738]" />
                    <span>Curriculum & syllabus builder desk</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#f3b738]" />
                    <span>PDF homework grading desk with rubrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#f3b738]" />
                    <span>Timed quiz & term exam generator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#f3b738]" />
                    <span>Publish circulars & parent notifications</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 space-y-2">
                <button
                  type="button"
                  onClick={() => openAuthModal("login", "teacher")}
                  className="w-full bg-[#f3b738] hover:bg-[#e0a424] text-slate-950 font-black text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Sign In as Teacher</span>
                </button>
                <button
                  type="button"
                  onClick={() => handle1ClickDemoLogin("teacher")}
                  className="w-full bg-[#fef7e6] hover:bg-[#faebd0] text-[#b47a16] font-bold text-[11px] py-2 rounded-xl transition-all cursor-pointer"
                >
                  ⚡ Instant Demo: Mr. Samantha Perera
                </button>
              </div>
            </div>

            {/* 3. School Administrator */}
            <div className="p-7 rounded-3xl bg-white border border-[#e6ece8] hover:border-slate-500 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="h-14 w-14 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                    <Shield className="h-7 w-7" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">
                    Administrator
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#0d2b26]">
                    School Administrator
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Manage campuses, grades 1-13, classrooms, teacher assignments, master timetable, and institutional circulars.
                  </p>
                </div>

                <ul className="space-y-2 text-xs font-semibold text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-800" />
                    <span>Campus operations & class allocations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-800" />
                    <span>Faculty & sports coach directory</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-800" />
                    <span>Master school timetable management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-800" />
                    <span>Official school circulars & approvals</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 space-y-2">
                <button
                  type="button"
                  onClick={() => openAuthModal("login", "admin")}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Sign In as Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => handle1ClickDemoLogin("admin")}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] py-2 rounded-xl transition-all cursor-pointer"
                >
                  ⚡ Instant Demo: Dr. K. Rajasingham
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Step Academic Learning Loop */}
        <div id="learning-loop" className="mt-20 p-8 sm:p-10 rounded-3xl bg-white border border-[#e6ece8] space-y-8 shadow-xs scroll-mt-24">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0d5c4d] bg-[#ecf8f5] px-3 py-1 rounded-full border border-[#c4e9e0]">
              Pedagogy Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0d2b26] mt-2">
              End-to-End Academic Learning Loop
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Every lesson moves through an integrated cycle from instruction to mastery.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {learningLoop.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e6ece8] hover:border-[#0d5c4d] hover:bg-[#edf5f2] transition-all flex flex-col items-center justify-between group"
                >
                  <div className="h-10 w-10 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] group-hover:bg-[#0d5c4d] group-hover:text-white transition-colors flex items-center justify-center mb-3 shadow-2xs">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">Step 0{idx + 1}</span>
                  <p className="text-xs font-black text-[#0d2b26] mt-1">{step.title}</p>
                  <p className="text-[10px] text-slate-500 mt-1 leading-snug">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sri Lankan Curriculum Highlight Section */}
        <div id="curriculum" className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center scroll-mt-24">
          <div className="space-y-5">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0d5c4d] bg-[#ecf8f5] px-3 py-1 rounded-full border border-[#c4e9e0]">
              National Standards
            </span>
            <h2 className="text-3xl font-black text-[#0d2b26] leading-tight">
              Aligned with Sri Lankan School Education
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              LimaT Smart Book comes pre-configured with syllabus frameworks for both national and international schools across Sri Lanka.
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-[#e6ece8] flex items-start gap-3.5">
                <div className="h-9 w-9 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#0d2b26]">G.C.E. O/L & A/L Preparation</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Structured streams for Physical Science, Biological Science, Commerce, Arts, and Technology.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#e6ece8] flex items-start gap-3.5">
                <div className="h-9 w-9 rounded-xl bg-[#fef7e6] text-[#b47a16] flex items-center justify-center shrink-0">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#0d2b26]">Trilingual Mediums</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Course materials and circulars delivered in English, Sinhala, and Tamil for inclusive learning.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#e6ece8] flex items-start gap-3.5">
                <div className="h-9 w-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#0d2b26]">Inter-House Sports & Campus Life</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Track athletic meets, cricket matches, football fixtures, and house points in real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="school-life" className="p-8 rounded-3xl bg-gradient-to-br from-[#082a24] to-[#0d5c4d] text-white space-y-6 shadow-xl scroll-mt-24">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#f3b738]">
                School Life & Events
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-bold">
                Live Campus Feed
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-black text-white">
                Beyond the Classroom: Sports, Houses & Community
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Foster school pride and teamwork with live athletic standings, house leaderboards, and official circular announcements.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-[#f3b738]" />
                  <div>
                    <p className="text-xs font-black text-white">Annual Inter-House Athletic Meet</p>
                    <p className="text-[10px] text-slate-300">Vijaya • Parakrama • Gemunu • Mahasen</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">Active</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-emerald-300" />
                  <div>
                    <p className="text-xs font-black text-white">Term 2 Examination Desk</p>
                    <p className="text-[10px] text-slate-300">Grades 10 to 13 Timetable Published</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">Upcoming</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openAuthModal("login", "student")}
              className="w-full bg-[#f3b738] hover:bg-[#e0a424] text-slate-950 font-black text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Explore School Hub</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom Call to Action Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-white border border-[#e6ece8] text-center space-y-6 shadow-sm">
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0d2b26]">
              Ready to experience LimaT Smart Book?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Sign in to your school account or try one of our interactive demo profiles in seconds.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openAuthModal("signup", "student")}
              className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-black text-xs px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-2"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Create Free Account</span>
            </button>

            <button
              type="button"
              onClick={() => openAuthModal("login", "student")}
              className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-2xs cursor-pointer flex items-center gap-2"
            >
              <LogIn className="h-3.5 w-3.5 text-[#0d5c4d]" />
              <span>Sign In to Account</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e6ece8] bg-white py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#f3b738] flex items-center justify-center text-slate-950 font-black text-base">
              L
            </div>
            <div className="text-left">
              <p className="font-black text-[#0d2b26]">LimaT Smart Book</p>
              <p className="text-[10px] text-[#0d5c4d] font-bold">LEARN · GROW · LEAD</p>
            </div>
          </div>

          <p className="text-center sm:text-right">
            Digital Learning and School Management Platform • Built for Sri Lankan schools in English, Sinhala, and Tamil.
          </p>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* AUTHENTICATION MODAL (LOGIN & SIGN UP - ONLY Student, Teacher, Admin)    */}
      {/* ========================================================================= */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          {/* Modal Container */}
          <div className="bg-white border border-[#e6ece8] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-[#f3b738] flex items-center justify-center text-slate-950 font-black text-lg">
                  L
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#0d2b26]">LimaT Smart Book</h3>
                  <p className="text-[10px] uppercase font-bold text-[#0d5c4d]">School Authentication</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAuthOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body with Scroll */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Tab Selector: Sign In vs Sign Up */}
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setAuthTab("login")}
                  className={`py-2 rounded-xl transition-all cursor-pointer ${
                    authTab === "login"
                      ? "bg-white text-[#0d2b26] shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Sign In (Login)
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab("signup")}
                  className={`py-2 rounded-xl transition-all cursor-pointer ${
                    authTab === "signup"
                      ? "bg-white text-[#0d2b26] shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Create Account (Sign Up)
                </button>
              </div>

              {/* Role Selector: ONLY 3 ROLES (Student, Teacher, Administrator - NO super_admin) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block">
                  Select Your School Role:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {/* Student */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelectInModal("student")}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      selectedRole === "student"
                        ? "bg-[#ecf8f5] border-[#0d5c4d] text-[#0d5c4d] shadow-xs"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4" />
                      <span className="text-xs font-black">Student</span>
                    </div>
                    <span className="text-[9.5px] opacity-75">Pupil</span>
                  </button>

                  {/* Teacher */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelectInModal("teacher")}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      selectedRole === "teacher"
                        ? "bg-[#fef7e6] border-[#f3b738] text-[#b47a16] shadow-xs"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <School className="h-4 w-4" />
                      <span className="text-xs font-black">Teacher</span>
                    </div>
                    <span className="text-[9.5px] opacity-75">Faculty</span>
                  </button>

                  {/* Admin */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelectInModal("admin")}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      selectedRole === "admin"
                        ? "bg-slate-100 border-slate-800 text-slate-900 shadow-xs"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Shield className="h-4 w-4" />
                      <span className="text-xs font-black">Admin</span>
                    </div>
                    <span className="text-[9.5px] opacity-75">Principal</span>
                  </button>
                </div>
              </div>

              {/* -------------------- SIGN IN TAB CONTENT -------------------- */}
              {authTab === "login" && (
                <div className="space-y-4">
                  {/* Quick 1-Click Demo Login Bar */}
                  <div className="p-3.5 rounded-2xl bg-[#f8faf9] border border-[#e6ece8] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        ⚡ Quick 1-Click Evaluation Login:
                      </span>
                      <span className="text-[10px] font-semibold text-[#0d5c4d]">Instant entry</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handle1ClickDemoLogin(selectedRole)}
                      className="w-full p-2.5 rounded-xl bg-white border border-[#c4e9e0] hover:border-[#0d5c4d] hover:bg-[#ecf8f5] text-left transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center font-bold text-xs">
                          {rolePresetCredentials[selectedRole].name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-black text-[#0d2b26] group-hover:text-[#0d5c4d] transition-colors">
                            {rolePresetCredentials[selectedRole].name}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {rolePresetCredentials[selectedRole].detail} • {rolePresetCredentials[selectedRole].school}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#0d5c4d] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Manual Login Form */}
                  <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        School / Institution
                      </label>
                      <div className="relative">
                        <Building2 className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          defaultValue="St. Michael High School"
                          readOnly
                          className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Email Address or Index No
                      </label>
                      <div className="relative">
                        <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="e.g. sathurjan@school.lk"
                          className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0d5c4d] focus:ring-2 focus:ring-[#0d5c4d]/10 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700">
                          Password
                        </label>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            addToast({
                              type: "info",
                              title: "Password Reset",
                              message: "Please contact your school administrator or use demo 1-click login."
                            });
                          }}
                          className="text-[11px] font-bold text-[#0d5c4d] hover:underline"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <Lock className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Enter password"
                          className="w-full h-10 pl-9 pr-10 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0d5c4d] focus:ring-2 focus:ring-[#0d5c4d]/10 transition-all font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded text-[#0d5c4d] focus:ring-0"
                        />
                        <span>Remember me on this device</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0d5c4d] hover:bg-[#083e34] text-white font-black text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-2"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Sign In to {selectedRole === "student" ? "Student" : selectedRole === "teacher" ? "Teacher" : "Admin"} Portal</span>
                    </button>
                  </form>
                </div>
              )}

              {/* -------------------- SIGN UP TAB CONTENT -------------------- */}
              {authTab === "signup" && (
                <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="e.g. Sathurjan K. / Samantha Perera"
                        className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0d5c4d] focus:ring-2 focus:ring-[#0d5c4d]/10 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="e.g. name@school.lk"
                        className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0d5c4d] focus:ring-2 focus:ring-[#0d5c4d]/10 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        School Name
                      </label>
                      <select
                        value={signupSchool}
                        onChange={(e) => setSignupSchool(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0d5c4d] transition-all font-medium cursor-pointer"
                      >
                        {schools.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                        <option value="Royal Academy Colombo">Royal Academy Colombo</option>
                        <option value="Jaffna Central High">Jaffna Central High</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {selectedRole === "student" ? "Grade & Class" : "Department / Subject"}
                      </label>
                      <input
                        type="text"
                        required
                        value={signupGradeOrDept}
                        onChange={(e) => setSignupGradeOrDept(e.target.value)}
                        placeholder={selectedRole === "student" ? "e.g. Grade 11-A" : "e.g. Science Faculty"}
                        className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0d5c4d] transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Create Password
                      </label>
                      <div className="relative">
                        <Lock className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0d5c4d] transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          placeholder="Repeat password"
                          className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0d5c4d] transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-1 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium select-none">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="rounded text-[#0d5c4d] focus:ring-0"
                      />
                      <span>I agree to the LimaT Smart Book Terms and Privacy Policy</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0d5c4d] hover:bg-[#083e34] text-white font-black text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Create Account & Join as {selectedRole === "student" ? "Student" : selectedRole === "teacher" ? "Teacher" : "Administrator"}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Modal Footer Note */}
            <div className="px-6 py-3 bg-[#f8faf9] border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-[#0d5c4d]" />
                <span>Protected by School Campus Directory</span>
              </span>
              <span className="font-semibold text-slate-600">English • සිංහල • தமிழ்</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
