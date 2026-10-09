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
type PortalType = "student" | "staff";

export function LandingView({ onEnterApp }: { onEnterApp: () => void }) {
  const { setCurrentRole, addToast, schools, t } = useApp();

  // Portal Landing Mode: "student" for Students & Parents, "staff" for Teachers & Administrators
  const [portalType, setPortalType] = useState<PortalType>("student");

  // Auth Display Mode: "closed", "drawer" (slide in from side), or "fullpage" (dedicated new page)
  const [authMode, setAuthMode] = useState<AuthDisplayMode>("closed");
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [selectedRole, setSelectedRole] = useState<SupportedRole>("student");

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState("sathurjan@school.lk");
  const [loginPassword, setLoginPassword] = useState("••••••••");
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

  const handleRoleSelect = (role: SupportedRole) => {
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

  const openAuth = (tab: "login" | "signup", role: SupportedRole = "student", mode: "drawer" | "fullpage" = "drawer") => {
    setAuthTab(tab);
    handleRoleSelect(role);
    setAuthMode(mode);
  };

  const handlePortalSwitch = (type: PortalType) => {
    setPortalType(type);
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

      {/* Role Selector: Filtered by Portal Type */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block">
            {portalType === "student" ? "Account Role:" : "Select Staff Role:"}
          </label>
          <span className="text-[10px] font-bold text-slate-500">
            {portalType === "student" ? "Student Access" : "Staff Protection Active"}
          </span>
        </div>

        {portalType === "student" ? (
          /* Student Only Portal Button */
          <div className="p-3 rounded-2xl bg-[#ecf8f5] border-2 border-[#0d5c4d] text-[#0d5c4d] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-white text-[#0d5c4d] flex items-center justify-center shadow-xs">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black">Student & Parent Portal</p>
                <p className="text-[10px] text-emerald-800 font-semibold">Enrolled School Pupil</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/60 text-[#0d5c4d]">
              Active Role
            </span>
          </div>
        ) : (
          /* Teacher and Admin Staff Selector */
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
                {authTab === "signup" && <span className="text-[10px]">🔒</span>}
              </div>
              <span className="text-[9.5px] opacity-75">
                {authTab === "signup" ? "Faculty (Passcode)" : "Faculty Desk"}
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
                {authTab === "signup" && <span className="text-[10px]">🛡️</span>}
              </div>
              <span className="text-[9.5px] opacity-75">
                {authTab === "signup" ? "Principal (Master Key)" : "School Leadership"}
              </span>
            </button>
          </div>
        )}

        {/* Security Info Callout in Signup mode */}
        {authTab === "signup" && (
          <div className="pt-1">
            {selectedRole === "student" && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                <span>Open Registration: Any enrolled student can sign up with their class and admission number.</span>
              </div>
            )}
            {selectedRole === "teacher" && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                <span>Staff Protection: Students cannot create teacher accounts. School faculty passcode required.</span>
              </div>
            )}
            {selectedRole === "admin" && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-[11px] text-rose-900 flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                <span>Restricted Access: Administrator & Principal accounts require authorization from school board.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* -------------------- SIGN IN TAB CONTENT -------------------- */}
      {authTab === "login" && (
        <div className="space-y-4 pt-1">
          {/* Quick 1-Click Evaluation Login Bar */}
          <div className="p-3.5 rounded-2xl bg-[#f8faf9] border border-[#e6ece8] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                ⚡ 1-Click Evaluation Login:
              </span>
              <span className="text-[10px] font-bold text-[#0d5c4d]">Instant entry</span>
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
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder={portalType === "student" ? "e.g. sathurjan@school.lk" : "e.g. samantha.p@school.lk"}
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
                      message: "Please contact your school office or use the 1-click evaluation demo login above."
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
              <p className="text-[10px] text-amber-900 leading-snug">
                ⚠️ <strong>Staff Protection:</strong> Students cannot register as teachers. This passcode is issued exclusively to verified school faculty.
              </p>
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
              <p className="text-[10px] text-rose-900 leading-snug">
                🛡️ <strong>Access Restricted:</strong> School Administrator & Principal accounts are managed centrally. Master authorization key is required.
              </p>
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
      {/* LimaT Smart Book Public Navigation Header with Portal Switcher */}
      <nav className="h-20 border-b border-[#e6ece8] bg-white/95 backdrop-blur-md px-4 sm:px-10 flex items-center justify-between sticky top-0 z-40">
        {/* Brand */}
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

        {/* Center Portal Switcher: [Student Portal] vs [Faculty & Admin] */}
        <div className="flex items-center bg-[#f0f4f2] border border-[#d6ede6] p-1 rounded-2xl shadow-2xs">
          <button
            type="button"
            onClick={() => handlePortalSwitch("student")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              portalType === "student"
                ? "bg-[#0d5c4d] text-white shadow-xs font-black"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            <GraduationCap className={`h-4 w-4 ${portalType === "student" ? "text-white" : "text-[#0d5c4d]"}`} />
            <span>For Students</span>
          </button>

          <button
            type="button"
            onClick={() => handlePortalSwitch("staff")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              portalType === "staff"
                ? "bg-slate-900 text-white shadow-xs font-black"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            <School className={`h-4 w-4 ${portalType === "staff" ? "text-[#f3b738]" : "text-slate-600"}`} />
            <span>For Teachers & Admin</span>
          </button>
        </div>

        {/* Auth Navigation Triggers */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => openAuth("login", portalType === "student" ? "student" : "teacher", "drawer")}
            className="text-xs font-bold text-slate-700 hover:text-[#0d5c4d] px-3.5 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogIn className="h-3.5 w-3.5 text-[#0d5c4d]" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => openAuth("signup", portalType === "student" ? "student" : "teacher", "drawer")}
            className="text-xs font-black bg-[#0d5c4d] hover:bg-[#083e34] text-white rounded-xl px-4 sm:px-5 py-2.5 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>{portalType === "student" ? "Join School" : "Register Staff"}</span>
          </button>
        </div>
      </nav>

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

            {/* Right Student Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[#e6ece8] bg-white shadow-xl">
                <div className="bg-gradient-to-br from-[#0d5c4d] to-[#082a24] p-7 text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
                      Grade 12 — Physical Science
                    </span>
                    <span className="text-xs font-mono font-bold text-[#f3b738]">Term 2 Active</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white">Sathurjan K.</h3>
                    <p className="text-xs text-slate-200">St. Michael High School • Index: STU-1204</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-white/10 text-center">
                      <p className="text-base font-black text-white">4</p>
                      <p className="text-[10px] text-slate-300">Enrolled Courses</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/10 text-center">
                      <p className="text-base font-black text-[#f3b738]">92%</p>
                      <p className="text-[10px] text-slate-300">Avg Score</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/10 text-center">
                      <p className="text-base font-black text-emerald-300">Vijaya</p>
                      <p className="text-[10px] text-slate-300">Sports House</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Immediate Actions:</span>
                    <span className="text-[10px] text-slate-400">2 Pending</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f8faf9] border border-[#e6ece8] flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#0d2b26]">Combined Mathematics Assignment</p>
                      <p className="text-[10px] text-slate-500">Problem Set: Quadratic Inequations</p>
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">Due Soon</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handle1ClickDemoLogin("student")}
                    className="w-full bg-[#ecf8f5] hover:bg-[#0d5c4d] text-[#0d5c4d] hover:text-white font-extrabold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>⚡ Try Student Demo: Sathurjan K.</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
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

          {/* Switch Prompt: Go to Staff Portal */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-black">Are you a Teacher, Principal, or School Administrator?</h3>
              <p className="text-xs text-slate-300">
                Switch to the School Faculty & Administration Portal for curriculum planning and governance.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handlePortalSwitch("staff")}
              className="bg-[#f3b738] hover:bg-[#e0a424] text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shrink-0 shadow-md flex items-center gap-1.5"
            >
              <span>Faculty & Admin Portal ➔</span>
            </button>
          </div>
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

            {/* Right Staff Leadership Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[#e6ece8] bg-white shadow-xl">
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-[#082a24] p-7 text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-amber-300">
                      Faculty & Campus HQ
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">Institutional Governance</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white">St. Michael High School</h3>
                    <p className="text-xs text-slate-300">86 Verified Teachers • 1,420 Enrolled Students</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-white/10 text-center">
                      <p className="text-base font-black text-[#f3b738]">86</p>
                      <p className="text-[10px] text-slate-300">Faculty Staff</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/10 text-center">
                      <p className="text-base font-black text-white">42</p>
                      <p className="text-[10px] text-slate-300">Classrooms</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/10 text-center">
                      <p className="text-base font-black text-emerald-300">100%</p>
                      <p className="text-[10px] text-slate-300">Syllabus Sync</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white space-y-3">
                  <p className="text-xs font-bold text-slate-700">Quick Evaluation Staff Portals:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handle1ClickDemoLogin("teacher")}
                      className="p-3 rounded-xl bg-[#fef7e6] hover:bg-[#faebd0] border border-[#fde4af] text-left transition-all cursor-pointer"
                    >
                      <p className="text-xs font-black text-[#b47a16]">👨‍🏫 Mr. S. Perera</p>
                      <p className="text-[10px] text-slate-500">Teacher Science Faculty</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => handle1ClickDemoLogin("admin")}
                      className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-left transition-all cursor-pointer"
                    >
                      <p className="text-xs font-black text-slate-800">🏫 Dr. K. Rajasingham</p>
                      <p className="text-[10px] text-slate-500">Principal Administrator</p>
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

          {/* Switch Prompt: Go to Student Portal */}
          <div className="p-6 rounded-3xl bg-[#ecf8f5] border border-[#c4e9e0] text-[#0d2b26] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-black">Are you a Student or Parent?</h3>
              <p className="text-xs text-slate-600">
                Switch to the Student Learning Portal for course notes, homework submissions, and sports.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handlePortalSwitch("student")}
              className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-black text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shrink-0 shadow-md flex items-center gap-1.5"
            >
              <span>Student Portal ➔</span>
            </button>
          </div>
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
              className={`hover:text-[#0d5c4d] ${portalType === "student" ? "text-[#0d5c4d] font-bold underline" : ""}`}
            >
              Student Portal
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handlePortalSwitch("staff")}
              className={`hover:text-[#0d5c4d] ${portalType === "staff" ? "text-[#0d5c4d] font-bold underline" : ""}`}
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
