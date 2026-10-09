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
  Trophy,
  Calendar,
  Globe,
  LogIn,
  UserPlus,
  X,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Users,
  Layers,
  Settings
} from "lucide-react";

type SupportedRole = "student" | "teacher" | "admin";
type AuthDisplayMode = "closed" | "drawer" | "fullpage";
export type PortalType = "student" | "staff";

const BANNER_SLIDES = [
  {
    image: "/images/school_banner_1.jpg",
    alt: "High School Students in Modern Classroom - Evolve Beyond",
    caption: "Smart High School Classrooms & Dedicated Teachers"
  },
  {
    image: "/images/school_banner_2.jpg",
    alt: "School Students with Science Faculty - Evolve Beyond",
    caption: "Interactive Science Lab Practical & Guided Studies"
  },
  {
    image: "/images/school_banner_3.jpg",
    alt: "School Students Studying in Library - Evolve Beyond",
    caption: "Trilingual Term Revision & Past Exam Library"
  },
  {
    image: "/images/student_banner_evolve.jpg",
    alt: "Sri Lankan Students Campus Learning - Evolve Beyond",
    caption: "Holistic Academics, Sports & Leadership"
  }
];

export function LandingView({
  onEnterApp,
  initialPortal
}: {
  onEnterApp: () => void;
  initialPortal?: PortalType;
}) {
  const { setCurrentRole, addToast, schools, t, landingPortal, setLandingPortal } = useApp();

  // Auto-rotate the student banner image every 3.5 seconds
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Sync initialPortal prop if explicitly passed (e.g. from direct URL routes)
  React.useEffect(() => {
    if (initialPortal) {
      setLandingPortal(initialPortal);
    }
  }, [initialPortal, setLandingPortal]);

  const portalType = landingPortal;

  // Auth Display Mode: "closed", "drawer" (slide in from side), or "fullpage" (dedicated new page)
  const [authMode, setAuthMode] = useState<AuthDisplayMode>("closed");
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [selectedRole, setSelectedRole] = useState<SupportedRole>("student");

  // Sign In Form State (Empty by default for a clean, generic portal)
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

  // Security Access Controls (Prevents unauthorized Teacher & Admin registration)
  const [teacherPasscode, setTeacherPasscode] = useState("");
  const [adminSecurityKey, setAdminSecurityKey] = useState("");
  const [studentIndexNumber, setStudentIndexNumber] = useState("");

  // Pre-fill credentials based on role (STRICTLY 3 ROLES - NO SUPER ADMIN)
  const rolePresetCredentials = {
    student: {
      name: "Student",
      email: "student@school.lk",
      detail: "Student Learning Desk",
      school: "St. Michael High School"
    },
    teacher: {
      name: "Faculty Member",
      email: "teacher@school.lk",
      detail: "Teaching Faculty",
      school: "St. Michael High School"
    },
    admin: {
      name: "Campus Administrator",
      email: "admin@school.lk",
      detail: "Campus Administration",
      school: "St. Michael High School"
    }
  };

  const handleRoleSelect = (role: SupportedRole) => {
    setSelectedRole(role);
    if (role === "student") {
      setSignupGradeOrDept("Grade 11-A");
    } else if (role === "teacher") {
      setSignupGradeOrDept("Science & Math Faculty");
    } else {
      setSignupGradeOrDept("Campus Administration");
    }
  };

  const openAuth = (tab: "login" | "signup", role: SupportedRole = "student", mode: "drawer" | "fullpage" = "drawer") => {
    setAuthTab(tab);
    handleRoleSelect(role);
    setAuthMode(mode);
  };

  const handlePortalSwitch = (type: PortalType) => {
    setLandingPortal(type);
    if (type === "student") {
      handleRoleSelect("student");
    } else {
      handleRoleSelect("teacher");
    }
  };

  const handle1ClickDemoLogin = (role: SupportedRole) => {
    setCurrentRole(role);
    setAuthMode("closed");
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
    setAuthMode("closed");
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

    // Role-based Security Enforcement
    if (selectedRole === "teacher") {
      const code = teacherPasscode.trim().toUpperCase();
      if (!code || (code !== "TEACH-2026" && code !== "FACULTY" && code !== "TEACHER")) {
        addToast({
          type: "error",
          title: "Teacher Passcode Required",
          message: "Access Denied: Only verified school faculty can register. Enter your School Teacher Passcode (Demo Key: TEACH-2026)."
        });
        return;
      }
    }

    if (selectedRole === "admin") {
      const key = adminSecurityKey.trim().toUpperCase();
      if (!key || (key !== "ADMIN-MASTER" && key !== "PRINCIPAL" && key !== "ADMIN")) {
        addToast({
          type: "error",
          title: "Administrator Key Required",
          message: "Access Denied: School Administrator accounts are restricted. Enter the Master Authorization Key (Demo Key: ADMIN-MASTER)."
        });
        return;
      }
    }

    setCurrentRole(selectedRole);
    setAuthMode("closed");
    addToast({
      type: "success",
      title: "Account Created Successfully!",
      message: `Welcome, ${signupName || rolePresetCredentials[selectedRole].name}! Your ${selectedRole} profile has been verified and initialized.`
    });
    onEnterApp();
  };

  // =========================================================================
  // REUSABLE AUTH FORM COMPONENT (Tailored per portal type: student vs staff)
  // =========================================================================
  const renderAuthContent = () => (
    <div className="space-y-4">
      {/* Tab Switcher: Sign In vs Create Account */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 text-xs font-bold">
        <button
          type="button"
          onClick={() => setAuthTab("login")}
          className={`py-2 rounded-xl transition-all cursor-pointer ${
            authTab === "login"
              ? "bg-white text-[#0d2b26] shadow-xs font-black"
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
              ? "bg-white text-[#0d2b26] shadow-xs font-black"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Create Account (Sign Up)
        </button>
      </div>

      {/* Role Selector: Only shown for Staff Portal so staff can select Teacher vs Admin */}
      {portalType === "staff" && (
        <div className="space-y-1.5">
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block">
            Select Staff Role:
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {/* Teacher */}
            <button
              type="button"
              onClick={() => handleRoleSelect("teacher")}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                selectedRole === "teacher"
                  ? "bg-[#fef7e6] border-[#f3b738] text-[#b47a16] shadow-xs ring-2 ring-[#f3b738]/25"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <School className="h-4 w-4" />
                <span className="text-xs font-black">Teacher</span>
              </div>
              <span className="text-[9.5px] opacity-75">
                Faculty Desk
              </span>
            </button>

            {/* Admin */}
            <button
              type="button"
              onClick={() => handleRoleSelect("admin")}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                selectedRole === "admin"
                  ? "bg-slate-100 border-slate-800 text-slate-900 shadow-xs ring-2 ring-slate-800/20"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4" />
                <span className="text-xs font-black">Admin</span>
              </div>
              <span className="text-[9.5px] opacity-75">
                School Leadership
              </span>
            </button>
          </div>
        </div>
      )}

      {/* -------------------- SIGN IN TAB CONTENT -------------------- */}
      {authTab === "login" && (
        <div className="space-y-4 pt-1">
          {/* Manual Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-3">
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
                {portalType === "student" ? "Student Email or Index No" : "Staff Email or Faculty ID"}
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder={portalType === "student" ? "e.g. student@school.lk or Index No" : "e.g. staff@school.lk or Faculty ID"}
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
                      message: "Please contact your school office or administration to reset your password."
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

            <div className="flex items-center justify-between pt-0.5 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#0d5c4d] focus:ring-0"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0d5c4d] hover:bg-[#083e34] text-white font-black text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-1"
            >
              <LogIn className="h-4 w-4" />
              <span>
                Sign In to {selectedRole === "student" ? "Student" : selectedRole === "teacher" ? "Teacher" : "Admin"} Portal
              </span>
            </button>
          </form>
        </div>
      )}

      {/* -------------------- SIGN UP TAB CONTENT -------------------- */}
      {authTab === "signup" && (
        <form onSubmit={handleSignupSubmit} className="space-y-3 pt-1">
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
                placeholder="e.g. Enter your full name"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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

          {/* Role-Specific Security Verification Inputs */}
          {selectedRole === "teacher" && (
            <div className="p-3.5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-amber-600" />
                  <span>Teacher Faculty Verification Passcode *</span>
                </label>
                <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
                  Demo: TEACH-2026
                </span>
              </div>
              <input
                type="text"
                required
                value={teacherPasscode}
                onChange={(e) => setTeacherPasscode(e.target.value)}
                placeholder="Enter faculty passcode (e.g. TEACH-2026)"
                className="w-full h-10 px-3 rounded-xl bg-white border border-amber-300 text-xs text-amber-950 font-mono font-bold placeholder-amber-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>
          )}

          {selectedRole === "admin" && (
            <div className="p-3.5 rounded-2xl bg-rose-50/90 border-2 border-rose-300 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-rose-950 flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-rose-600" />
                  <span>Administrator Master Authorization Key *</span>
                </label>
                <span className="text-[10px] font-mono font-bold text-rose-900 bg-rose-200/80 px-2 py-0.5 rounded-md">
                  Demo: ADMIN-MASTER
                </span>
              </div>
              <input
                type="password"
                required
                value={adminSecurityKey}
                onChange={(e) => setAdminSecurityKey(e.target.value)}
                placeholder="Enter master admin key (e.g. ADMIN-MASTER)"
                className="w-full h-10 px-3 rounded-xl bg-white border border-rose-300 text-xs text-rose-950 font-mono font-bold placeholder-rose-400 focus:outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 transition-all"
              />
            </div>
          )}

          {selectedRole === "student" && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Student Admission / Index Number (Optional)
              </label>
              <input
                type="text"
                value={studentIndexNumber}
                onChange={(e) => setStudentIndexNumber(e.target.value)}
                placeholder="e.g. STU-2026-081"
                className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono font-semibold placeholder-slate-400 focus:outline-none focus:border-[#0d5c4d] transition-all"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                  placeholder="Min 6 chars"
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

          <div className="pt-0.5 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded text-[#0d5c4d] focus:ring-0"
              />
              <span>I agree to the LimaT Terms & Privacy Policy</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0d5c4d] hover:bg-[#083e34] text-white font-black text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-1"
          >
            <UserPlus className="h-4 w-4" />
            <span>Create Account & Join as {selectedRole === "student" ? "Student" : selectedRole === "teacher" ? "Teacher" : "Administrator"}</span>
          </button>
        </form>
      )}
    </div>
  );

  // =========================================================================
  // VIEW MODE: DEDICATED FULL PAGE VIEW ("new page la varanum")
  // =========================================================================
  if (authMode === "fullpage") {
    return (
      <div className="min-h-screen bg-[#fbfcfb] text-[#0d2b26] flex flex-col justify-between selection:bg-[#0d5c4d] selection:text-white">
        {/* Full Page Navigation Header */}
        <header className="h-20 border-b border-[#e6ece8] bg-white px-6 sm:px-12 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#f3b738] flex items-center justify-center text-slate-950 font-black text-xl shadow-xs font-sans">
              L
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight text-[#0d2b26]">
                LimaT Smart Book
              </span>
              <p className="text-[9px] uppercase tracking-widest text-[#0d5c4d] font-black">
                {portalType === "student" ? "STUDENT & PARENT ACCESS" : "FACULTY & CAMPUS GOVERNANCE"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAuthMode("drawer")}
              className="text-xs font-bold text-slate-600 hover:text-[#0d5c4d] px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Switch to Side Drawer mode"
            >
              <Minimize2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Side Drawer Mode</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthMode("closed")}
              className="text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl px-4 py-2 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </button>
          </div>
        </header>

        {/* Full Page Center Container */}
        <main className="flex-1 max-w-5xl mx-auto w-full p-6 sm:p-10 flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-5 hidden lg:block">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0] text-xs font-black">
                <span className="h-2 w-2 rounded-full bg-[#0d5c4d]" />
                <span>{portalType === "student" ? "Student Learning Portal" : "Faculty Leadership Hub"}</span>
              </div>

              <h2 className="text-3xl font-black text-[#0d2b26] leading-tight">
                {portalType === "student"
                  ? "Welcome to your digital learning classroom."
                  : "Empowering Sri Lankan school leadership & educators."}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                {portalType === "student"
                  ? "Study course units, download national past papers, complete timed tests, and celebrate house sports."
                  : "Design syllabi, mark student answers with rubrics, manage class allocations, and publish official school circulars."}
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[#e6ece8] shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#f3b738] text-slate-950 font-black flex items-center justify-center text-sm">
                    L
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#0d2b26]">St. Michael High School</h4>
                    <p className="text-[10px] text-slate-500">1,420 Students • 86 Faculty Teachers</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                  <Check className="h-3.5 w-3.5 text-[#0d5c4d]" />
                  <span>English • සිංහල • தமிழ் Mediums Supported</span>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white border-2 border-[#c4e9e0] rounded-3xl shadow-xl p-6 sm:p-8 space-y-5 max-w-lg mx-auto">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-black text-[#0d2b26]">
                      {authTab === "login" ? "Sign In to LimaT" : "Create Account"}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {portalType === "student" ? "Pupil & Student Portal" : "Faculty & Administrative Access"}
                    </p>
                  </div>

                  <span className="h-9 w-9 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center font-bold">
                    {portalType === "student" ? <GraduationCap className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                  </span>
                </div>

                {renderAuthContent()}

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setAuthMode("closed")}
                    className="text-xs font-bold text-slate-500 hover:text-[#0d5c4d] transition-colors"
                  >
                    ← Cancel and return to overview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#e6ece8] bg-white py-6 px-6 text-center text-xs text-slate-500">
          <p className="font-bold text-[#0d2b26]">LimaT Smart Book — LEARN · GROW · LEAD</p>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // VIEW MODE: STANDARD LANDING PAGE (Student View OR Faculty/Admin View)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#fbfcfb] text-[#0d2b26] flex flex-col justify-between selection:bg-[#0d5c4d] selection:text-white">
      {/* ----------------- 1. STUDENT PORTAL NAVIGATION ----------------- */}
      {portalType === "student" && (
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
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0] text-[10px] font-extrabold">
                  <GraduationCap className="h-3 w-3" />
                  Student Portal
                </span>
              </div>
              <p className="text-[9px] uppercase tracking-widest text-[#0d5c4d] font-black">
                LEARN · GROW · LEAD
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#courses" className="hover:text-[#0d5c4d] transition-colors">Courses & Subjects</a>
            <a href="#past-papers" className="hover:text-[#0d5c4d] transition-colors">Past Papers</a>
            <a href="#online-exams" className="hover:text-[#0d5c4d] transition-colors">Online Exams</a>
            <a href="#house-sports" className="hover:text-[#0d5c4d] transition-colors">House Sports</a>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => openAuth("login", "student", "drawer")}
              className="text-xs font-bold text-slate-700 hover:text-[#0d5c4d] px-3.5 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="h-3.5 w-3.5 text-[#0d5c4d]" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => openAuth("signup", "student", "drawer")}
              className="text-xs font-black bg-[#0d5c4d] hover:bg-[#083e34] text-white rounded-xl px-4 sm:px-5 py-2.5 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Join as Student</span>
            </button>
          </div>
        </nav>
      )}

      {/* ----------------- 2. FACULTY & ADMIN PORTAL NAVIGATION ----------------- */}
      {portalType === "staff" && (
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
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 border border-slate-700 text-[10px] font-extrabold">
                  <School className="h-3 w-3 text-[#f3b738]" />
                  Faculty & Admin Hub
                </span>
              </div>
              <p className="text-[9px] uppercase tracking-widest text-[#0d5c4d] font-black">
                LEARN · GROW · LEAD
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#curriculum" className="hover:text-[#0d5c4d] transition-colors">Curriculum Builder</a>
            <a href="#grading-desk" className="hover:text-[#0d5c4d] transition-colors">Grading Desk</a>
            <a href="#classrooms" className="hover:text-[#0d5c4d] transition-colors">Class Allocations</a>
            <a href="#circulars" className="hover:text-[#0d5c4d] transition-colors">Official Circulars</a>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => openAuth("login", "teacher", "drawer")}
              className="text-xs font-bold text-slate-700 hover:text-slate-950 px-3.5 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="h-3.5 w-3.5 text-[#b47a16]" />
              <span>Staff Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => openAuth("signup", "teacher", "drawer")}
              className="text-xs font-black bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 sm:px-5 py-2.5 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="h-3.5 w-3.5 text-[#f3b738]" />
              <span>Register Staff</span>
            </button>
          </div>
        </nav>
      )}

      {/* ========================================================================= */}
      {/* 1. STUDENT LANDING PAGE (Active when portalType === "student")           */}
      {/* ========================================================================= */}
      {portalType === "student" ? (
        <main className="px-4 sm:px-8 lg:px-12 py-10 sm:py-16 max-w-7xl mx-auto w-full space-y-16">
          {/* Student Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0] text-xs font-black shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-[#0d5c4d] animate-pulse" />
                <span>Student & Parent Portal • Sri Lankan Schools</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0d2b26] leading-[1.12]">
                Learn, practice & excel <br />
                <span className="text-[#0d5c4d]">in every term test.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Study curriculum units, download past papers with marking schemes, submit assignments, take timed exams, and track your house sports team.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => openAuth("signup", "student", "drawer")}
                  className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-black text-sm px-7 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  Join as Student <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => openAuth("login", "student", "drawer")}
                  className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  Sign in to student account
                </button>
              </div>

              {/* Student Features Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 pt-2">
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#0d5c4d]" />
                  <span>G.C.E. O/L & A/L Past Papers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#0d5c4d]" />
                  <span>Timed Online Exams</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#0d5c4d]" />
                  <span>House Athletic Standings</span>
                </div>
              </div>
            </div>

            {/* Right Student Card (Generic Platform Overview) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[#e6ece8] bg-white shadow-xl">
                <div className="bg-gradient-to-br from-[#0d5c4d] to-[#082a24] p-7 text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-[#f3b738]" />
                      <span>Student Academic Hub</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-[#f3b738]">Grades 6 — 13</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white">Interactive Learning Desk</h3>
                    <p className="text-xs text-slate-200">National Curriculum • Term Exams • Digital Classroom</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-white/10 text-center">
                      <p className="text-base font-black text-white">All Streams</p>
                      <p className="text-[10px] text-slate-300">Sci / Art / Com / Tech</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/10 text-center">
                      <p className="text-base font-black text-[#f3b738]">100%</p>
                      <p className="text-[10px] text-slate-300">Syllabus Aligned</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/10 text-center">
                      <p className="text-base font-black text-emerald-300">Trilingual</p>
                      <p className="text-[10px] text-slate-300">Notes & Papers</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white space-y-3.5">
                  <p className="text-xs font-bold text-slate-700">Student Portal Capabilities:</p>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#f8faf9] border border-[#e6ece8] flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center shrink-0">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[#0d2b26]">Lesson Notes & Past Papers</p>
                        <p className="text-[10px] text-slate-500">Downloadable PDFs, videos, and term revision guides</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#f8faf9] border border-[#e6ece8] flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[#0d2b26]">Assignments & Online Quizzes</p>
                        <p className="text-[10px] text-slate-500">Submit homework and receive teacher feedback with marks</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => openAuth("login", "student", "drawer")}
                      className="w-full bg-[#0d5c4d] hover:bg-[#0a483c] text-white font-extrabold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <LogIn className="h-3.5 w-3.5" />
                      <span>Student Sign In</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openAuth("signup", "student", "drawer")}
                      className="w-full bg-[#ecf8f5] hover:bg-[#d8f1ea] text-[#0d5c4d] border border-[#c4e9e0] font-extrabold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      <span>Register Account</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* EVOLVE BEYOND SHOWCASE BANNER & 5 QUICK ACCESS CARDS      */}
          {/* ========================================================= */}
          <section className="space-y-4">
            {/* Visual Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#031d28] via-[#083e47] to-[#0284c7] text-white shadow-2xl border border-cyan-400/20">
              {/* Dynamic Wave Background Accents */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-200 via-transparent to-transparent" />
              <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
              <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 min-h-[260px] sm:min-h-[300px]">
                {/* Left Typography Block */}
                <div className="lg:col-span-5 p-6 sm:p-10 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-black text-cyan-200 tracking-wider uppercase">
                    <Sparkles className="h-3 w-3 text-[#f3b738]" />
                    <span>Collegiate Academic Portal</span>
                  </div>

                  <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none uppercase drop-shadow-md">
                    <span className="block text-sky-200">EVOLVE</span>
                    <span className="block text-white">BEYOND</span>
                  </h2>

                  <p className="text-xs sm:text-sm text-cyan-100/90 font-medium max-w-sm leading-relaxed">
                    Unleash your academic brilliance. Interactive digital coursework, trilingual lessons, and continuous exam preparation designed for Sri Lankan students.
                  </p>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openAuth("login", "student", "drawer")}
                      className="px-5 py-2.5 rounded-xl bg-white text-[#083e47] hover:bg-cyan-50 font-black text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Student Hub</span>
                      <ArrowRight className="h-3.5 w-3.5 text-cyan-600" />
                    </button>
                    <span className="text-[11px] font-semibold text-cyan-200/80">Grades 6 – 13</span>
                  </div>
                </div>

                {/* Right Students Photography (Auto-Rotating School Students Slideshow) */}
                <div className="lg:col-span-7 h-full flex items-end justify-center lg:justify-end relative pr-0 lg:pr-6 overflow-hidden">
                  <div className="relative w-full max-h-[340px] flex items-end justify-center">
                    <div className="relative w-full h-[240px] sm:h-[300px] rounded-2xl lg:rounded-l-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
                      {BANNER_SLIDES.map((slide, idx) => (
                        <img
                          key={idx}
                          src={slide.image}
                          alt={slide.alt}
                          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out ${
                            idx === currentSlideIndex
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-105 pointer-events-none"
                          }`}
                        />
                      ))}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#031d28]/70 via-transparent to-transparent lg:hidden pointer-events-none" />

                      {/* Floating Caption & Dots */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-black/45 backdrop-blur-md text-[11px] text-white border border-white/15 pointer-events-auto">
                        <span className="truncate font-semibold text-cyan-200">
                          {BANNER_SLIDES[currentSlideIndex].caption}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {BANNER_SLIDES.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setCurrentSlideIndex(idx)}
                              aria-label={`Go to slide ${idx + 1}`}
                              className={`h-2 rounded-full transition-all cursor-pointer ${
                                idx === currentSlideIndex
                                  ? "w-5 bg-cyan-400"
                                  : "w-2 bg-white/40 hover:bg-white/70"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5 Quick Access Cards (Direct Visual Links - Verified Local Images) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 pt-1">
              {/* Card 1: Student Help Desk */}
              <div
                onClick={() => {
                  addToast({
                    type: "info",
                    title: "Student Help Desk",
                    message: "Sign in to access academic counseling, query tickets, and teacher mentorship."
                  });
                  openAuth("login", "student", "drawer");
                }}
                className="group bg-white rounded-2xl p-3 border border-[#e6ece8] shadow-sm hover:shadow-xl hover:border-amber-400 -translate-y-0 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center flex flex-col items-center"
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-2.5 relative bg-slate-100">
                  <img
                    src="/images/card_helpdesk.jpg"
                    alt="Student Help Desk"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-xs font-black text-amber-700 group-hover:text-amber-600 transition-colors">
                  Student Help Desk
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Advising & Support</p>
              </div>

              {/* Card 2: Student Service */}
              <div
                onClick={() => {
                  addToast({
                    type: "info",
                    title: "Student Service",
                    message: "Sign in to view student services, sports house points, and campus activities."
                  });
                  openAuth("login", "student", "drawer");
                }}
                className="group bg-white rounded-2xl p-3 border border-[#e6ece8] shadow-sm hover:shadow-xl hover:border-amber-400 -translate-y-0 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center flex flex-col items-center"
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-2.5 relative bg-slate-100">
                  <img
                    src="/images/card_service.jpg"
                    alt="Student Service"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-xs font-black text-amber-700 group-hover:text-amber-600 transition-colors">
                  Student Service
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">House & Campus Desk</p>
              </div>

              {/* Card 3: Online Library */}
              <div
                onClick={() => {
                  addToast({
                    type: "info",
                    title: "Online Library",
                    message: "Access trilingual textbooks, unit notes, and digital study packs."
                  });
                  openAuth("login", "student", "drawer");
                }}
                className="group bg-white rounded-2xl p-3 border border-[#e6ece8] shadow-sm hover:shadow-xl hover:border-amber-400 -translate-y-0 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center flex flex-col items-center"
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-2.5 relative bg-slate-100">
                  <img
                    src="/images/card_library.jpg"
                    alt="Online Library"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-xs font-black text-amber-700 group-hover:text-amber-600 transition-colors">
                  Online Library
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Digital Notes & Books</p>
              </div>

              {/* Card 4: Video Repository */}
              <div
                onClick={() => {
                  addToast({
                    type: "info",
                    title: "Video Repository",
                    message: "Watch recorded classroom video lessons and lab practical explanations."
                  });
                  openAuth("login", "student", "drawer");
                }}
                className="group bg-white rounded-2xl p-3 border border-[#e6ece8] shadow-sm hover:shadow-xl hover:border-amber-400 -translate-y-0 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center flex flex-col items-center"
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-2.5 relative bg-slate-100">
                  <img
                    src="/images/card_video.jpg"
                    alt="Video Repository"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-xs font-black text-amber-700 group-hover:text-amber-600 transition-colors">
                  Video Repository
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Recorded Class Units</p>
              </div>

              {/* Card 5: Research Archive */}
              <div
                onClick={() => {
                  addToast({
                    type: "info",
                    title: "Research Archive",
                    message: "Official G.C.E O/L and A/L Past Examination Papers & Marking Schemes."
                  });
                  openAuth("login", "student", "drawer");
                }}
                className="group bg-white rounded-2xl p-3 border border-[#e6ece8] shadow-sm hover:shadow-xl hover:border-amber-400 -translate-y-0 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center flex flex-col items-center"
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-2.5 relative bg-slate-100">
                  <img
                    src="/images/card_archive.jpg"
                    alt="Research Archive"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-xs font-black text-amber-700 group-hover:text-amber-600 transition-colors">
                  Research Archive
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Past Papers & Marking</p>
              </div>
            </div>
          </section>

          {/* Student Key Learning Highlights */}
          <section className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0d5c4d] bg-[#ecf8f5] px-3 py-1 rounded-full border border-[#c4e9e0]">
                Student Experience
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0d2b26] mt-2">
                Everything for School Success in One Place
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="p-6 rounded-2xl bg-white border border-[#e6ece8] hover:border-[#0d5c4d] transition-all space-y-3 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="font-black text-sm text-[#0d2b26]">Structured Lessons</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Video units, downloadable PDF notes, and chapter summaries aligned with school term syllabus.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e6ece8] hover:border-[#0d5c4d] transition-all space-y-3 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-[#fef7e6] text-[#b47a16] flex items-center justify-center">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-black text-sm text-[#0d2b26]">Past Papers Library</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  National examination past papers and official marking schemes for G.C.E. O/L and A/L.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e6ece8] hover:border-[#0d5c4d] transition-all space-y-3 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-black text-sm text-[#0d2b26]">Homework Submission</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Upload homework files easily and receive clear scores, written teacher feedback, and rubrics.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e6ece8] hover:border-[#0d5c4d] transition-all space-y-3 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Trophy className="h-5 w-5" />
                </div>
                <h3 className="font-black text-sm text-[#0d2b26]">Sports & Houses</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Inter-house athletics standings, football and cricket match fixtures, and house leaderboard.
                </p>
              </div>
            </div>
          </section>

        </main>
      ) : (
        /* ========================================================================= */
        /* 2. FACULTY & ADMIN LANDING PAGE (Active when portalType === "staff")     */
        /* ========================================================================= */
        <main className="px-4 sm:px-8 lg:px-12 py-10 sm:py-16 max-w-7xl mx-auto w-full space-y-16">
          {/* Staff Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-black shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse" />
                <span>School Faculty & Administration Hub • Sri Lanka</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0d2b26] leading-[1.12]">
                Empowering teachers & <br />
                <span className="text-[#0d5c4d]">modern school leadership.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Build digital curricula, mark assignments with rubrics, manage classroom timetables, coordinate faculty staff, and publish official school circulars.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => openAuth("login", "teacher", "drawer")}
                  className="bg-[#f3b738] hover:bg-[#e0a424] text-slate-950 font-black text-sm px-7 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Teacher Login</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAuth("login", "admin", "drawer")}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Shield className="h-4 w-4" />
                  <span>Administrator Access</span>
                </button>
              </div>

              {/* Staff Security Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 pt-2">
                <div className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-amber-600" />
                  <span>Faculty Passcode Protected Registration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-slate-800" />
                  <span>Restricted Admin Master Authorization</span>
                </div>
              </div>
            </div>

            {/* Right Staff Leadership Card (Generic Institutional Overview) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[#e6ece8] bg-white shadow-xl">
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-[#082a24] p-7 text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5" />
                      <span>Faculty & Campus HQ</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">Institutional Governance</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white">Faculty & Admin Operations</h3>
                    <p className="text-xs text-slate-300">Centralized Academic Administration & Teacher Governance</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-white/10 text-center">
                      <p className="text-base font-black text-[#f3b738]">Syllabus</p>
                      <p className="text-[10px] text-slate-300">Term Tracking</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/10 text-center">
                      <p className="text-base font-black text-white">Rubrics</p>
                      <p className="text-[10px] text-slate-300">Grading Suite</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/10 text-center">
                      <p className="text-base font-black text-emerald-300">Registry</p>
                      <p className="text-[10px] text-slate-300">Student Records</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white space-y-3.5">
                  <p className="text-xs font-bold text-slate-700">Staff Access Portals:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => openAuth("login", "teacher", "drawer")}
                      className="p-3 rounded-xl bg-[#fef7e6] hover:bg-[#faebd0] border border-[#fde4af] text-left transition-all cursor-pointer"
                    >
                      <p className="text-xs font-black text-[#b47a16] flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        <span>Teacher Portal</span>
                      </p>
                      <p className="text-[10px] text-slate-500">Lesson Plans & Grading</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => openAuth("login", "admin", "drawer")}
                      className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-left transition-all cursor-pointer"
                    >
                      <p className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                        <School className="h-3.5 w-3.5" />
                        <span>Admin Portal</span>
                      </p>
                      <p className="text-[10px] text-slate-500">Principal & Governance</p>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => openAuth("signup", "teacher", "drawer")}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <UserPlus className="h-3.5 w-3.5 text-[#f3b738]" />
                    <span>Register New Faculty Account (Passcode Required)</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Staff Pillars */}
          <section className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Staff Governance Modules
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0d2b26] mt-2">
                Engineered for Academic Excellence & Administration
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="p-6 rounded-2xl bg-white border border-[#e6ece8] hover:border-amber-400 transition-all space-y-3 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-[#fef7e6] text-[#b47a16] flex items-center justify-center">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="font-black text-sm text-[#0d2b26]">Curriculum Builder</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Design units, organize lessons, upload learning PDFs, and sync with term tests easily.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e6ece8] hover:border-amber-400 transition-all space-y-3 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="font-black text-sm text-[#0d2b26]">Grading Desk</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Review student answers, assign marks with rubric criteria, and release results transparently.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e6ece8] hover:border-amber-400 transition-all space-y-3 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="font-black text-sm text-[#0d2b26]">Classroom Allocations</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Manage grades 1 to 13, sections (A/B/C), teacher subjects, and master timetable coordination.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e6ece8] hover:border-amber-400 transition-all space-y-3 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-black text-sm text-[#0d2b26]">Official Circulars</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Issue verified institutional notices and emergency announcements to parents and students.
                </p>
              </div>
            </div>
          </section>

        </main>
      )}

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

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => handlePortalSwitch("student")}
              className={`hover:text-[#0d5c4d] cursor-pointer ${portalType === "student" ? "text-[#0d5c4d] font-bold underline" : ""}`}
            >
              Student Portal
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handlePortalSwitch("staff")}
              className={`hover:text-[#0d5c4d] cursor-pointer ${portalType === "staff" ? "text-[#0d5c4d] font-bold underline" : ""}`}
            >
              Faculty & Admin Portal
            </button>
          </div>

          <p className="text-center sm:text-right text-[11px] text-slate-400">
            Sri Lanka Digital School Platform • Built for English, Sinhala, and Tamil.
          </p>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* RIGHT-SIDE SLIDE DRAWER ("site ala varanum")                             */}
      {/* ========================================================================= */}
      {authMode === "drawer" && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Subtle Dimmed Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/30 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
            onClick={() => setAuthMode("closed")}
          />

          {/* Right Slide Panel */}
          <div className="relative w-full sm:w-[460px] md:w-[490px] h-full bg-white shadow-2xl z-50 flex flex-col border-l border-[#d6ede6] animate-in slide-in-from-right duration-300 ease-out">
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-b from-[#f8fbf9] to-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-[#f3b738] flex items-center justify-center text-slate-950 font-black text-lg shadow-2xs font-sans">
                  L
                </div>
                <div>
                  <h3 className="font-black text-base text-[#0d2b26]">LimaT Smart Book</h3>
                  <p className="text-[10px] uppercase font-bold text-[#0d5c4d]">
                    {portalType === "student" ? "Student Access" : "Staff Governance"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Switch to Full Page button */}
                <button
                  type="button"
                  onClick={() => setAuthMode("fullpage")}
                  className="p-2 rounded-xl text-slate-500 hover:text-[#0d5c4d] hover:bg-[#ecf8f5] transition-colors cursor-pointer"
                  title="Open as full dedicated page"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                {/* Close Drawer button */}
                <button
                  type="button"
                  onClick={() => setAuthMode("closed")}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Drawer Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {renderAuthContent()}
            </div>

            {/* Drawer Footer */}
            <div className="px-6 py-3 bg-[#f8faf9] border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-[#0d5c4d]" />
                <span>Protected School Directory</span>
              </span>
              <button
                type="button"
                onClick={() => setAuthMode("fullpage")}
                className="text-[11px] font-bold text-[#0d5c4d] hover:underline"
              >
                Expand full page →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
