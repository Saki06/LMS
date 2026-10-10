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
  Settings,
  Award,
  Phone,
  Heart,
  ChevronRight
} from "lucide-react";

type SupportedRole = "student" | "parent" | "teacher" | "admin";
type AuthDisplayMode = "closed" | "drawer" | "fullpage";
export type PortalType = "gateway" | "student" | "parent" | "staff";

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
  const [gatewayTab, setGatewayTab] = useState<"student" | "parent" | "staff">("student");

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

  // Sri Lankan Parent-Specific Sign In & Registration States
  const [parentLoginMethod, setParentLoginMethod] = useState<"password" | "otp">("password");
  const [parentOtpSent, setParentOtpSent] = useState(false);
  const [parentOtpCode, setParentOtpCode] = useState("");

  const [parentTitle, setParentTitle] = useState("Mrs.");
  const [parentRelation, setParentRelation] = useState("Mother");
  const [parentPhone, setParentPhone] = useState("");
  const [parentNic, setParentNic] = useState("");
  const [childName, setChildName] = useState("");
  const [childAdmissionNo, setChildAdmissionNo] = useState("");
  const [childGrade, setChildGrade] = useState("Grade 10-B");
  const [parentConsent, setParentConsent] = useState(true);

  // Pre-fill credentials based on role
  const rolePresetCredentials = {
    student: {
      name: "Student",
      email: "student@school.lk",
      detail: "Student Learning Desk",
      school: "St. Michael High School"
    },
    parent: {
      name: "Mrs. Priyadarshani Kulatunga",
      email: "parent@school.lk",
      detail: "Guardian of Sathurjan K. (Grade 12-A)",
      school: "Trinity College Kandy"
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
    } else if (role === "parent") {
      setSignupGradeOrDept("Parent of Grade 12 & Grade 8");
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
    } else if (type === "parent") {
      handleRoleSelect("parent");
    } else if (type === "staff") {
      handleRoleSelect("teacher");
    }
  };

  const handle1ClickDemoLogin = (role: SupportedRole) => {
    setCurrentRole(role);
    setAuthMode("closed");
    addToast({
      type: "success",
      title: `Signed in as ${role === "student" ? "Student" : role === "parent" ? "Parent" : role === "teacher" ? "Teacher" : "Administrator"}`,
      message: `Welcome back, ${rolePresetCredentials[role].name}!`
    });
    onEnterApp();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRole === "parent" && parentLoginMethod === "otp" && !parentOtpSent) {
      if (!loginEmail.trim()) {
        addToast({
          type: "error",
          title: "Mobile Number Required",
          message: "Please enter your registered mobile number to receive your SMS OTP."
        });
        return;
      }
      setParentOtpSent(true);
      addToast({
        type: "success",
        title: "SMS OTP Dispatched",
        message: `A 6-digit verification code has been sent via SMS to ${loginEmail}.`
      });
      return;
    }

    setCurrentRole(selectedRole);
    setAuthMode("closed");
    addToast({
      type: "success",
      title: "Login Successful",
      message: selectedRole === "parent"
        ? "Welcome to Parent Guardian Desk! Live attendance and report cards loaded."
        : `Welcome back to LimaT Smart Book (${selectedRole === "student" ? "Student" : selectedRole === "teacher" ? "Teacher" : "Admin"} Portal)`
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
    if (selectedRole === "parent") {
      if (!signupName.trim() || !parentPhone.trim() || !childName.trim() || !childAdmissionNo.trim()) {
        addToast({
          type: "error",
          title: "Missing Required Details",
          message: "Please fill in Guardian Name, Mobile Number, Student's Full Name, and Student Admission Number."
        });
        return;
      }
      if (!parentConsent) {
        addToast({
          type: "error",
          title: "Guardian Verification Required",
          message: "Please confirm that you are the legal parent or guardian of this student."
        });
        return;
      }
      setCurrentRole("parent");
      setAuthMode("closed");
      addToast({
        type: "success",
        title: "Guardian Account Registered!",
        message: `Welcome, ${parentTitle} ${signupName}! Account successfully linked with ${childName} (${childGrade}).`
      });
      onEnterApp();
      return;
    }

    if (selectedRole === "teacher") {
      const code = teacherPasscode.trim().toUpperCase();
      if (!code || (code !== "TEACH-2026" && code !== "FACULTY" && code !== "TEACHER")) {
        addToast({
          type: "error",
          title: "Teacher Passcode Required",
          message: "Access Denied: Only verified school faculty can register. Enter your School Teacher Passcode (Key: TEACH-2026)."
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
          message: "Access Denied: School Administrator accounts are restricted. Enter the Master Authorization Key (Key: ADMIN-MASTER)."
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
                  ? "bg-slate-100 border-slate-800 text-slate-900 shadow-xs ring-2 ring-slate-800/20"
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
          {/* Parent Login Method Switcher */}
          {selectedRole === "parent" && (
            <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setParentLoginMethod("password");
                  setParentOtpSent(false);
                }}
                className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                  parentLoginMethod === "password"
                    ? "bg-white text-[#1e3a5f] shadow-2xs font-black"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Password Sign In
              </button>
              <button
                type="button"
                onClick={() => setParentLoginMethod("otp")}
                className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                  parentLoginMethod === "otp"
                    ? "bg-white text-[#1e3a5f] shadow-2xs font-black"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                SMS OTP Login
              </button>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                School / Institution
              </label>
              <div className="relative">
                <Building2 className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={signupSchool}
                  onChange={(e) => setSignupSchool(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#0d5c4d] cursor-pointer"
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
            </div>

            {/* If Parent chose SMS OTP Login */}
            {selectedRole === "parent" && parentLoginMethod === "otp" ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Registered Mobile Number (Sri Lanka) *
                  </label>
                  <div className="relative">
                    <Phone className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. 077 123 4567 or 071 987 6543"
                      className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10 transition-all font-medium"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Enter the mobile phone registered with your child&apos;s school office.
                  </p>
                </div>

                {parentOtpSent ? (
                  <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Enter 6-Digit SMS Verification Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={parentOtpCode}
                      onChange={(e) => setParentOtpCode(e.target.value)}
                      placeholder="e.g. 849201"
                      className="w-full h-11 text-center font-mono text-base tracking-widest font-black rounded-xl bg-white border border-[#cfdeea] text-slate-900 focus:outline-none focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/15"
                    />
                    <div className="flex justify-between items-center text-[11px] pt-1">
                      <span className="text-slate-500">Didn&apos;t receive code?</span>
                      <button
                        type="button"
                        onClick={() => {
                          addToast({
                            type: "info",
                            title: "SMS Re-dispatched",
                            message: `New OTP sent to ${loginEmail}.`
                          });
                        }}
                        className="font-bold text-[#1e3a5f] hover:underline cursor-pointer"
                      >
                        Resend SMS OTP
                      </button>
                    </div>
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="w-full bg-[#1e3a5f] hover:bg-[#152a45] text-white font-black text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>
                    {parentOtpSent ? "Verify Code & Sign In" : "Send SMS Verification OTP"}
                  </span>
                </button>
              </div>
            ) : (
              /* Standard Password Login (for Parent, Student, Staff) */
              <>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {selectedRole === "student"
                      ? "Student Email or Index No"
                      : selectedRole === "parent"
                      ? "Parent Mobile No or Email Address"
                      : "Staff Email or Faculty ID"}
                  </label>
                  <div className="relative">
                    {selectedRole === "parent" ? (
                      <Phone className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    ) : (
                      <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    )}
                    <input
                      type="text"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder={
                        selectedRole === "student"
                          ? "e.g. student@school.lk or Index No"
                          : selectedRole === "parent"
                          ? "e.g. 077 123 4567 or parent@gmail.com"
                          : "e.g. staff@school.lk or Faculty ID"
                      }
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
                          message: selectedRole === "parent"
                            ? "Please contact your school office or use SMS OTP Login to access your portal."
                            : "Please contact your school office or administration to reset your password."
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
                    <span>Remember me on this device</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className={`w-full text-white font-black text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-1 ${
                    selectedRole === "parent"
                      ? "bg-[#1e3a5f] hover:bg-[#152a45]"
                      : "bg-[#0d5c4d] hover:bg-[#083e34]"
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  <span>
                    Sign In to {selectedRole === "student" ? "Student" : selectedRole === "parent" ? "Parent" : selectedRole === "teacher" ? "Teacher" : "Admin"} Portal
                  </span>
                </button>
              </>
            )}
          </form>
        </div>
      )}

      {/* -------------------- SIGN UP TAB CONTENT -------------------- */}
      {authTab === "signup" && (
        <form onSubmit={handleSignupSubmit} className="space-y-4 pt-1">
          {/* SPECIALIZED SRI LANKAN PARENT REGISTRATION FORM */}
          {selectedRole === "parent" ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#f0f5fa] border border-[#cbdfe8] text-xs text-[#1e3a5f] flex items-start gap-2.5">
                <Shield className="h-4 w-4 text-[#1e3a5f] shrink-0 mt-0.5" />
                <div>
                  <p className="font-black">Official Guardian Link • Sri Lanka</p>
                  <p className="text-[11px] text-[#2d4a6f] leading-relaxed mt-0.5">
                    Your parent profile will be linked with your child&apos;s school admission record for live attendance and report cards.
                  </p>
                </div>
              </div>

              {/* SECTION 1: GUARDIAN PERSONAL DETAILS */}
              <div className="space-y-3 pt-1">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-[#1e3a5f]" />
                  <span>1. Guardian Information</span>
                </p>

                {/* Title + Full Name */}
                <div className="flex gap-2">
                  <div className="w-24 shrink-0">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Title
                    </label>
                    <select
                      value={parentTitle}
                      onChange={(e) => setParentTitle(e.target.value)}
                      className="w-full h-10 px-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#1e3a5f] cursor-pointer"
                    >
                      <option value="Mrs.">Mrs.</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Rev.">Rev.</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Guardian Full Name *
                    </label>
                    <div className="relative">
                      <UserIcon className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="e.g. Priyadarshani Kulatunga"
                        className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Relationship & NIC */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Relationship to Student *
                    </label>
                    <select
                      value={parentRelation}
                      onChange={(e) => setParentRelation(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#1e3a5f] cursor-pointer"
                    >
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Legal Guardian">Legal Guardian</option>
                      <option value="Grandparent">Grandparent</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      National ID (NIC) No (Optional)
                    </label>
                    <input
                      type="text"
                      value={parentNic}
                      onChange={(e) => setParentNic(e.target.value)}
                      placeholder="e.g. 198574102934 / 857410293V"
                      className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono placeholder-slate-400 focus:outline-none focus:border-[#1e3a5f] transition-all"
                    />
                  </div>
                </div>

                {/* Mobile Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Mobile Number (For School SMS) *
                    </label>
                    <div className="relative">
                      <Phone className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        placeholder="e.g. 077 123 4567"
                        className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="e.g. parent@gmail.com"
                        className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: STUDENT / CHILD SCHOOL RECORD LINKING */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-[#1e3a5f]" />
                  <span>2. Student Linking & Verification</span>
                </p>

                {/* School Name */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Student&apos;s School *
                  </label>
                  <select
                    value={signupSchool}
                    onChange={(e) => setSignupSchool(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1e3a5f] font-medium cursor-pointer"
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

                {/* Student Full Name & Admission No */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Child&apos;s Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="e.g. Kaveen Kulatunga"
                      className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e3a5f] font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Admission / Index No *
                    </label>
                    <input
                      type="text"
                      required
                      value={childAdmissionNo}
                      onChange={(e) => setChildAdmissionNo(e.target.value)}
                      placeholder="e.g. ADM-2024-1042"
                      className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono placeholder-slate-400 focus:outline-none focus:border-[#1e3a5f] font-medium"
                    />
                  </div>
                </div>

                {/* Student Grade & Class */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Child&apos;s Current Grade & Class *
                  </label>
                  <select
                    value={childGrade}
                    onChange={(e) => setChildGrade(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1e3a5f] font-medium cursor-pointer"
                  >
                    <option value="Grade 1-A">Grade 1-A</option>
                    <option value="Grade 2-A">Grade 2-A</option>
                    <option value="Grade 3-A">Grade 3-A</option>
                    <option value="Grade 4-A">Grade 4-A</option>
                    <option value="Grade 5-A">Grade 5-A (Scholarship)</option>
                    <option value="Grade 6-A">Grade 6-A</option>
                    <option value="Grade 7-A">Grade 7-A</option>
                    <option value="Grade 8-B">Grade 8-B</option>
                    <option value="Grade 9-A">Grade 9-A</option>
                    <option value="Grade 10-B">Grade 10-B (O/L)</option>
                    <option value="Grade 11-A">Grade 11-A (O/L)</option>
                    <option value="Grade 12-A">Grade 12-A (A/L Science)</option>
                    <option value="Grade 13-A">Grade 13-A (A/L Maths)</option>
                  </select>
                </div>
              </div>

              {/* SECTION 3: ACCOUNT SECURITY */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-[#1e3a5f]" />
                  <span>3. Account Security</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Create Password *
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e3a5f] font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Confirm Password *
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e3a5f] font-medium"
                    />
                  </div>
                </div>

                <div className="pt-1 text-xs">
                  <label className="flex items-start gap-2 cursor-pointer text-slate-600 font-medium select-none">
                    <input
                      type="checkbox"
                      checked={parentConsent}
                      onChange={(e) => setParentConsent(e.target.checked)}
                      className="rounded text-[#1e3a5f] focus:ring-0 mt-0.5"
                    />
                    <span className="text-[11px] leading-relaxed">
                      I verify that I am the legal parent or guardian of this student and authorize school record access.
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1e3a5f] hover:bg-[#152a45] text-white font-black text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer mt-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Complete Parent Registration & Link Student</span>
              </button>
            </div>
          ) : (
            /* STANDARD STUDENT & STAFF REGISTRATION FORM */
            <>
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
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-slate-400" />
                      <span>Teacher Verification Passcode *</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">
                      (Passcode: TEACH-2026)
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={teacherPasscode}
                      onChange={(e) => setTeacherPasscode(e.target.value)}
                      placeholder="Enter teacher passcode"
                      className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0d5c4d] focus:ring-2 focus:ring-[#0d5c4d]/10 transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              {selectedRole === "admin" && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-slate-400" />
                      <span>Admin Security Key *</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">
                      (Key: ADMIN-MASTER)
                    </span>
                  </div>
                  <div className="relative">
                    <Shield className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={adminSecurityKey}
                      onChange={(e) => setAdminSecurityKey(e.target.value)}
                      placeholder="Enter admin authorization key"
                      className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0d5c4d] focus:ring-2 focus:ring-[#0d5c4d]/10 transition-all font-medium"
                    />
                  </div>
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
            </>
          )}
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
      {/* ----------------- 0. GATEWAY PORTAL NAVIGATION ----------------- */}
      {portalType === "gateway" && (
        <nav className="h-16 sm:h-20 border-b border-[#e6ece8] bg-white/95 backdrop-blur-md px-3 sm:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-[#f3b738] flex items-center justify-center text-slate-950 font-black text-base sm:text-xl shadow-xs font-sans shrink-0">
              L
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-2xl tracking-tight text-[#0d2b26] truncate">
                  LimaT Smart Book
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0] text-[10px] font-extrabold shrink-0">
                  <Sparkles className="h-3 w-3 text-[#f3b738]" />
                  Portal Selection
                </span>
              </div>
              <p className="text-[9px] uppercase tracking-widest text-[#0d5c4d] font-black hidden sm:block truncate">
                LEARN · GROW · LEAD • SRI LANKA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-bold text-slate-600">
              <Globe className="h-3.5 w-3.5 text-[#0d5c4d]" />
              Trilingual: EN • SI • TA
            </span>

            <button
              type="button"
              onClick={() => handlePortalSwitch("staff")}
              className="text-xs font-bold text-slate-600 hover:text-slate-950 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <School className="h-3.5 w-3.5 text-[#b47a16]" />
              <span>Staff Login</span>
            </button>
          </div>
        </nav>
      )}

      {/* ----------------- 1. STUDENT PORTAL NAVIGATION ----------------- */}
      {portalType === "student" && (
        <nav className="h-16 sm:h-20 border-b border-[#e6ece8] bg-white/95 backdrop-blur-md px-3 sm:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-[#f3b738] flex items-center justify-center text-slate-950 font-black text-base sm:text-xl shadow-xs font-sans shrink-0">
              L
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-2xl tracking-tight text-[#0d2b26] truncate">
                  LimaT Smart Book
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0] text-[10px] font-extrabold shrink-0">
                  <GraduationCap className="h-3 w-3" />
                  Student Portal
                </span>
              </div>
              <p className="text-[9px] uppercase tracking-widest text-[#0d5c4d] font-black hidden sm:block truncate">
                LEARN · GROW · LEAD
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => handlePortalSwitch("gateway")}
              className="text-xs font-bold text-slate-600 hover:text-[#0d5c4d] px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
              title="All Portals"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">All Portals</span>
            </button>

            <button
              type="button"
              onClick={() => openAuth("login", "student", "drawer")}
              className="text-xs font-bold text-slate-700 hover:text-[#0d5c4d] px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LogIn className="h-3.5 w-3.5 text-[#0d5c4d]" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => openAuth("signup", "student", "drawer")}
              className="text-xs font-black bg-[#0d5c4d] hover:bg-[#083e34] text-white rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2.5 transition-all shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span><span className="hidden sm:inline">Join as </span>Student</span>
            </button>
          </div>
        </nav>
      )}

      {/* ----------------- 2. PARENT PORTAL NAVIGATION ----------------- */}
      {portalType === "parent" && (
        <nav className="h-16 sm:h-20 border-b border-[#e6ece8] bg-white/95 backdrop-blur-md px-3 sm:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-[#082a24] flex items-center justify-center text-[#f3b738] font-black text-base sm:text-xl shadow-xs font-sans shrink-0">
              L
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-2xl tracking-tight text-[#0d2b26] truncate">
                  LimaT Smart Book
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f0f5fa] text-[#1e3a5f] border border-[#cbdfe8] text-[10px] font-extrabold shrink-0">
                  <Users className="h-3 w-3 text-[#1e3a5f]" />
                  Parent Portal
                </span>
              </div>
              <p className="text-[9px] uppercase tracking-widest text-[#1e3a5f] font-black hidden sm:block truncate">
                ACADEMIC TRACKING · REPORT CARDS · GUIDANCE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => handlePortalSwitch("gateway")}
              className="text-xs font-bold text-slate-600 hover:text-[#1e3a5f] px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
              title="All Portals"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">All Portals</span>
            </button>

            <button
              type="button"
              onClick={() => openAuth("login", "parent", "drawer")}
              className="text-xs font-bold text-slate-700 hover:text-[#1e3a5f] px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LogIn className="h-3.5 w-3.5 text-[#1e3a5f]" />
              <span><span className="hidden sm:inline">Guardian </span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => openAuth("signup", "parent", "drawer")}
              className="text-xs font-black bg-[#1e3a5f] hover:bg-[#152a45] text-white rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2.5 transition-all shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span><span className="hidden sm:inline">Register </span>Guardian</span>
            </button>
          </div>
        </nav>
      )}

      {/* ----------------- 3. FACULTY & ADMIN PORTAL NAVIGATION ----------------- */}
      {portalType === "staff" && (
        <nav className="h-16 sm:h-20 border-b border-[#e6ece8] bg-white/95 backdrop-blur-md px-3 sm:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-[#f3b738] flex items-center justify-center text-slate-950 font-black text-base sm:text-xl shadow-xs font-sans shrink-0">
              L
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-2xl tracking-tight text-[#0d2b26] truncate">
                  LimaT Smart Book
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 border border-slate-700 text-[10px] font-extrabold shrink-0">
                  <School className="h-3 w-3 text-[#f3b738]" />
                  Faculty & Admin Hub
                </span>
              </div>
              <p className="text-[9px] uppercase tracking-widest text-[#0d5c4d] font-black hidden sm:block truncate">
                LEARN · GROW · LEAD
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => handlePortalSwitch("gateway")}
              className="text-xs font-bold text-slate-600 hover:text-slate-950 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
              title="All Portals"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">All Portals</span>
            </button>

            <button
              type="button"
              onClick={() => openAuth("login", "teacher", "drawer")}
              className="text-xs font-bold text-slate-700 hover:text-slate-950 px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LogIn className="h-3.5 w-3.5 text-[#b47a16]" />
              <span><span className="hidden sm:inline">Staff </span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => openAuth("signup", "teacher", "drawer")}
              className="text-xs font-black bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2.5 transition-all shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <UserPlus className="h-3.5 w-3.5 text-[#f3b738]" />
              <span><span className="hidden sm:inline">Register </span>Staff</span>
            </button>
          </div>
        </nav>
      )}

      {/* ========================================================================= */}
      {/* 0. MINIMALIST FULL-SCREEN GATEWAY (Clean 2 Large Portal Cards, No Clutter) */}
      {/* Active when portalType === "gateway"                                       */}
      {/* ========================================================================= */}
      {portalType === "gateway" && (
        <main className="min-h-[calc(100vh-80px)] flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-6xl mx-auto w-full animate-in fade-in duration-300">
          {/* Header */}
          <div className="text-center space-y-3 pt-2 sm:pt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#0d5c4d] border border-emerald-200/80 text-[11px] font-black shadow-2xs">
              <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
              <span>Sri Lanka&apos;s Unified Digital School Ecosystem • Grades 1–13</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0d2b26]">
              Welcome to LimaT Smart Book
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
              Please choose your learning portal to continue.
            </p>
          </div>

          {/* Exactly 2 Large, Visually Rich Portal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 my-6 sm:my-8 items-stretch">
            {/* CARD 1: STUDENT PORTAL */}
            <div className="group rounded-3xl bg-white border-2 border-emerald-100 hover:border-emerald-600 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
              <div>
                {/* Visual Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-emerald-50">
                  <img
                    src="/images/student_card_hero.jpg"
                    alt="Sri Lankan Students Collaborating in Classroom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/90 text-white backdrop-blur-md text-[11px] font-black uppercase tracking-wider shadow-sm">
                      <GraduationCap className="h-3.5 w-3.5" />
                      For Students • Grades 1–13
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 space-y-2">
                  <h2 className="text-2xl font-black text-[#0d2b26] group-hover:text-emerald-700 transition-colors">
                    Student Portal
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Access G.C.E. O/L & A/L past papers with marking schemes, video lessons, timed online tests, and homework submissions.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-7 pt-0 space-y-3">
                <button
                  type="button"
                  onClick={() => handlePortalSwitch("student")}
                  className="w-full bg-[#0d5c4d] hover:bg-[#083e34] text-white font-black text-sm py-3.5 px-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enter Student Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      handlePortalSwitch("student");
                      openAuth("login", "student", "drawer");
                    }}
                    className="font-bold text-[#0d5c4d] hover:underline cursor-pointer"
                  >
                    Student Sign In →
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handlePortalSwitch("student");
                      openAuth("signup", "student", "drawer");
                    }}
                    className="font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    Register Account
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2: PARENT PORTAL */}
            <div className="group rounded-3xl bg-white border-2 border-slate-200 hover:border-[#1e3a5f] shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
              <div>
                {/* Visual Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f0f5fa]">
                  <img
                    src="/images/parent_card_hero.jpg"
                    alt="Sri Lankan Mother and Son Reviewing School Report"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e3a5f]/95 text-white backdrop-blur-md text-[11px] font-black uppercase tracking-wider shadow-sm">
                      <Users className="h-3.5 w-3.5" />
                      For Parents & Guardians
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 space-y-2">
                  <h2 className="text-2xl font-black text-[#0d2b26] group-hover:text-[#1e3a5f] transition-colors">
                    Parent Portal
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Track daily morning gate attendance alerts, inspect official term report cards, message subject teachers, and manage fee slips.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-7 pt-0 space-y-3">
                <button
                  type="button"
                  onClick={() => handlePortalSwitch("parent")}
                  className="w-full bg-[#1e3a5f] hover:bg-[#152a45] text-white font-black text-sm py-3.5 px-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enter Parent Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      handlePortalSwitch("parent");
                      openAuth("login", "parent", "drawer");
                    }}
                    className="font-bold text-[#1e3a5f] hover:underline cursor-pointer"
                  >
                    Guardian Sign In →
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handlePortalSwitch("parent");
                      openAuth("signup", "parent", "drawer");
                    }}
                    className="font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    Register Account
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Discreet Footer Link for Faculty */}
          <div className="pb-4 pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
            <button
              type="button"
              onClick={() => handlePortalSwitch("staff")}
              className="font-bold text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <School className="h-3.5 w-3.5 text-amber-600" />
              <span>Are you a Teacher or Principal? Faculty & Admin Hub →</span>
            </button>

            <span className="text-[11px] text-slate-400">
              Trilingual Medium: English • සිංහල • தமிழ்
            </span>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 1. STUDENT LANDING PAGE (Active when portalType === "student")           */}
      {/* ========================================================================= */}
      {portalType === "student" && (
        <main className="px-4 sm:px-8 lg:px-12 py-10 sm:py-16 max-w-7xl mx-auto w-full space-y-16">
          {/* Student Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0] text-xs font-black shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-[#0d5c4d] animate-pulse" />
                <span>Student & Parent Portal • Sri Lankan Schools</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0d2b26] leading-[1.15]">
                Learn, practice & excel <br className="hidden sm:inline" />
                <span className="text-[#0d5c4d]">in every term test.</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl leading-relaxed">
                Study curriculum units, download past papers with marking schemes, submit assignments, take timed exams, and track your house sports team.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full">
                <button
                  type="button"
                  onClick={() => openAuth("signup", "student", "drawer")}
                  className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-black text-sm px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <span>Join as Student</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => openAuth("login", "student", "drawer")}
                  className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <span>Sign in to student account</span>
                </button>
              </div>

              {/* Student Features Bar */}
              <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-bold text-slate-600 pt-2">
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#0d5c4d] shrink-0" />
                  <span>G.C.E. O/L & A/L Past Papers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#0d5c4d] shrink-0" />
                  <span>Timed Online Exams</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#0d5c4d] shrink-0" />
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
      )}

      {/* ========================================================================= */}
      {/* 2. PARENT LANDING PAGE (Active when portalType === "parent")              */}
      {/* ========================================================================= */}
      {portalType === "parent" && (
        <main className="px-4 sm:px-8 lg:px-12 py-10 sm:py-16 max-w-7xl mx-auto w-full space-y-16 animate-in fade-in duration-300">
          {/* Parent Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f5fa] text-[#1e3a5f] border border-[#cbdfe8] text-xs font-black shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-[#1e3a5f] animate-pulse" />
                <span>Parent & Guardian Desk • Sri Lankan Schools</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0d2b26] leading-[1.15]">
                Stay connected with your <br className="hidden sm:inline" />
                <span className="text-[#1e3a5f]">child&apos;s daily learning.</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl leading-relaxed">
                Track morning attendance, examine term test rankings, chat with class teachers, review homework completion, and upload official school payment slips.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full">
                <button
                  type="button"
                  onClick={() => openAuth("login", "parent", "drawer")}
                  className="bg-[#1e3a5f] hover:bg-[#152a45] text-white font-black text-sm px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Guardian Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAuth("signup", "parent", "drawer")}
                  className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <UserPlus className="h-4 w-4 text-[#1e3a5f]" />
                  <span>Register Parent Account</span>
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-bold text-slate-600 pt-2">
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#1e3a5f] shrink-0" />
                  <span>Daily SMS Attendance Alerts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#1e3a5f] shrink-0" />
                  <span>Verified Term Report Cards</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#1e3a5f] shrink-0" />
                  <span>Direct Teacher Consultations</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Live Parent Card Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-b from-[#0f243a] via-[#0c1c2e] to-[#071320] p-6 sm:p-7 text-white shadow-2xl border border-[#1e3a5f]/40 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-[#1e3a5f]/40 border border-[#335d8a]/40 text-[#a5c4e4] flex items-center justify-center font-black text-sm">
                      PK
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-white">Mrs. Priyadarshani Kulatunga</h3>
                      <p className="text-[11px] text-[#9bbddf]">Parent of Kaveen • Grade 10-B</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
                    Active Portal
                  </span>
                </div>

                {/* Quick Metric Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Term Attendance</p>
                    <p className="text-xl font-black text-emerald-400">96.4%</p>
                    <p className="text-[10px] text-slate-400">Present today at 7:22 AM</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Term 2 Average</p>
                    <p className="text-xl font-black text-[#7ba9d6]">84.6%</p>
                    <p className="text-[10px] text-slate-400">Rank: 4th in Class (42)</p>
                  </div>
                </div>

                {/* Teacher Remark Snippet */}
                <div className="p-4 rounded-2xl bg-[#0b1c2d]/80 border border-[#244b72]/40 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#9bbddf] flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-[#7ba9d6]" />
                      Teacher Remark • Mathematics
                    </span>
                    <span className="text-[10px] text-slate-400">Today</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed italic">
                    &quot;Kaveen completed his quadratic equation assignment with full marks. Keep encouraging his regular revision.&quot;
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold">— Mr. Bandara (Class Teacher)</p>
                </div>

                <button
                  type="button"
                  onClick={() => openAuth("login", "parent", "drawer")}
                  className="w-full bg-[#1e3a5f] hover:bg-[#284a73] text-white font-black text-xs py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Guardian Sign In</span>
                </button>
              </div>
            </div>
          </section>

          {/* 4 Feature Pillars for Parents */}
          <section className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#1e3a5f] bg-[#f0f5fa] px-3 py-1 rounded-full border border-[#cbdfe8]">
                Guardian Features
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0d2b26] mt-2">
                Designed for Sri Lankan Parents & Guardians
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="p-6 rounded-2xl bg-white border border-[#e6ece8] hover:border-[#1e3a5f] transition-all space-y-3 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-[#f0f5fa] text-[#1e3a5f] flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="font-black text-sm text-[#0d2b26]">Attendance & Leave</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Real-time morning check-in status, official leave request submissions, and term attendance reports.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e6ece8] hover:border-[#1e3a5f] transition-all space-y-3 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-black text-sm text-[#0d2b26]">Term Report Cards</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Download certified term examination report cards with subject rankings, teacher remarks, and grade trends.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e6ece8] hover:border-[#1e3a5f] transition-all space-y-3 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="font-black text-sm text-[#0d2b26]">Teacher Communications</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Secure two-way messaging with subject teachers and schedule parent-teacher conference meetings.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e6ece8] hover:border-[#1e3a5f] transition-all space-y-3 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-black text-sm text-[#0d2b26]">Fee Receipts & Slips</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Upload bank deposit slips or pay school facility fees online with verified digital receipt tracking.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Return to Splitter */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => handlePortalSwitch("gateway")}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to All School Portals</span>
            </button>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 3. FACULTY & ADMIN LANDING PAGE (Active when portalType === "staff")      */}
      {/* ========================================================================= */}
      {portalType === "staff" && (
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

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => handlePortalSwitch("gateway")}
              className={`hover:text-[#0d5c4d] cursor-pointer ${portalType === "gateway" ? "text-[#0d5c4d] font-black underline" : ""}`}
            >
              All Portals
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handlePortalSwitch("student")}
              className={`hover:text-[#0d5c4d] cursor-pointer ${portalType === "student" ? "text-[#0d5c4d] font-black underline" : ""}`}
            >
              Student Portal
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handlePortalSwitch("parent")}
              className={`hover:text-[#0d5c4d] cursor-pointer ${portalType === "parent" ? "text-[#0d5c4d] font-black underline" : ""}`}
            >
              Parent Portal
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handlePortalSwitch("staff")}
              className={`hover:text-[#0d5c4d] cursor-pointer ${portalType === "staff" ? "text-[#0d5c4d] font-black underline" : ""}`}
            >
              Faculty & Admin Hub
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
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-b from-[#f8fbf9] to-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-[#f3b738] flex items-center justify-center text-slate-950 font-black text-lg shadow-2xs font-sans">
                  L
                </div>
                <div>
                  <h3 className="font-black text-base text-[#0d2b26]">LimaT Smart Book</h3>
                  <p className="text-[10px] uppercase font-bold text-[#0d5c4d]">
                    {selectedRole === "parent"
                      ? "Parent & Guardian Desk"
                      : selectedRole === "student"
                      ? "Student Access"
                      : "Staff Governance"}
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
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {renderAuthContent()}
            </div>

            {/* Drawer Footer */}
            <div className="px-4 sm:px-6 py-3 bg-[#f8faf9] border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
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
