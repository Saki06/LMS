"use client";

import React from "react";
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
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingView({ onEnterApp }: { onEnterApp: () => void }) {
  const { setCurrentRole, t } = useApp();

  const handleSelectRoleAndEnter = (role: "student" | "teacher" | "admin") => {
    setCurrentRole(role);
    onEnterApp();
  };

  const learningLoop = [
    { title: "Teacher Creates", desc: "Syllabus, Units, Lessons & Rich Media", icon: BookOpen },
    { title: "Student Learns", desc: "Self-paced study & video classrooms", icon: Sparkles },
    { title: "Student Practices", desc: "Exams, lab guides & problem sets", icon: Zap },
    { title: "Student Submits", desc: "PDF uploads & written solutions", icon: FileText },
    { title: "Teacher Marks", desc: "Grading desk & written feedback", icon: ClipboardCheck },
    { title: "Feedback Delivered", desc: "Transparent release of scores", icon: Award },
    { title: "Progress Measured", desc: "Visual analytics & learning mastery", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-[#fbfcfb] text-[#0d2b26] flex flex-col justify-between">
      {/* Nawana Public Header */}
      <nav className="h-20 border-b border-[#e6ece8] bg-white/90 backdrop-blur-md px-6 sm:px-12 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#f3b738] flex items-center justify-center text-slate-950 font-black text-xl shadow-xs">
            n
          </div>
          <div>
            <span className="font-black text-2xl tracking-tight text-[#0d2b26] lowercase">
              nawana
            </span>
            <p className="text-[9px] uppercase tracking-widest text-[#0d5c4d] font-extrabold">
              LEARN · GROW · LEAD
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-600">
          <a href="#platform" className="hover:text-[#0d5c4d] transition-colors">Platform</a>
          <a href="#schools" className="hover:text-[#0d5c4d] transition-colors">For schools</a>
          <a href="#about" className="hover:text-[#0d5c4d] transition-colors">About us</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSelectRoleAndEnter("student")}
            className="text-xs font-bold text-slate-700 hover:text-[#0d5c4d] px-3 py-2"
          >
            Log in
          </button>
          <button
            onClick={() => handleSelectRoleAndEnter("teacher")}
            className="hidden sm:inline-flex text-xs font-bold text-slate-800 border border-slate-300 rounded-xl px-4 py-2 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Become a Teacher
          </button>
          <button
            onClick={() => handleSelectRoleAndEnter("student")}
            className="text-xs font-bold bg-[#0d5c4d] hover:bg-[#083e34] text-white rounded-xl px-5 py-2.5 transition-all shadow-xs flex items-center gap-1.5"
          >
            Get started <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section Matching the User's Reference Screenshot */}
      <section className="px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Soft Green Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0] text-xs font-extrabold">
              <span className="h-2 w-2 rounded-full bg-[#0d5c4d]" />
              Built for Sri Lankan schools
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0d2b26] leading-[1.12]">
              Learning and school life, <br />
              <span className="text-[#0d5c4d]">beautifully connected.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Nawana brings lessons, assessments, progress, sports, and events together in one calm, trusted platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleSelectRoleAndEnter("student")}
                className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-extrabold text-sm px-7 py-3.5 rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                Join your school <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => handleSelectRoleAndEnter("teacher")}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-2xs transition-all"
              >
                Sign in to your account
              </button>
            </div>

            {/* Tri-lingual Checknote */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 pt-2">
              <Check className="h-4 w-4 text-[#0d5c4d]" />
              <span>Designed for English, සිංහල and தமிழ்</span>
            </div>
          </div>

          {/* Right Hero Community Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-[#e6ece8] bg-white shadow-xl">
              {/* Graphic visual with school community representation */}
              <div className="h-80 sm:h-96 w-full bg-gradient-to-br from-[#0d5c4d] via-[#10705e] to-[#082a24] p-8 flex flex-col justify-between text-white relative">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
                    St. Michael High School
                  </span>
                  <div className="h-8 w-8 rounded-full bg-[#f3b738] text-slate-950 font-black flex items-center justify-center text-xs">
                    n
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#f3b738] uppercase tracking-wider">
                    All-in-one ecosystem
                  </span>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    Academics, Athletics & Community
                  </h3>
                  <p className="text-xs text-slate-200/90 leading-relaxed">
                    Connecting 1,420 students, 86 faculty members, and 11 sports teams in real-time.
                  </p>
                </div>
              </div>

              {/* Floating Footer Card */}
              <div className="p-6 bg-white border-t border-[#e6ece8] flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center shrink-0">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#0d2b26]">
                    One connected school community
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Learning, progress and school life
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 User Role Quick Entrance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          {/* Student */}
          <div
            onClick={() => handleSelectRoleAndEnter("student")}
            className="p-7 rounded-2xl bg-white border border-[#e6ece8] hover:border-[#0d5c4d] hover:shadow-lg cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center group-hover:scale-105 transition-transform">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0d2b26] group-hover:text-[#0d5c4d] transition-colors">
                  Student Portal
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Access courses, study syllabus units, submit homework, take timed exams, and track sports.
                </p>
              </div>
            </div>
            <button className="w-full mt-6 bg-[#ecf8f5] group-hover:bg-[#0d5c4d] text-[#0d5c4d] group-hover:text-white font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5">
              Enter as Student <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Teacher */}
          <div
            onClick={() => handleSelectRoleAndEnter("teacher")}
            className="p-7 rounded-2xl bg-white border border-[#e6ece8] hover:border-[#f3b738] hover:shadow-lg cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-[#fef7e6] text-[#b47a16] flex items-center justify-center group-hover:scale-105 transition-transform">
                <School className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0d2b26] group-hover:text-[#b47a16] transition-colors">
                  Teacher Faculty
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Design syllabi, upload learning resources, grade submissions, compose written feedback, and release marks.
                </p>
              </div>
            </div>
            <button className="w-full mt-6 bg-[#fef7e6] group-hover:bg-[#f3b738] text-[#b47a16] group-hover:text-slate-950 font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5">
              Enter as Teacher <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Admin */}
          <div
            onClick={() => handleSelectRoleAndEnter("admin")}
            className="p-7 rounded-2xl bg-white border border-[#e6ece8] hover:border-slate-400 hover:shadow-lg cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0d2b26]">
                  School Administrator
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Configure school campuses, academic grades, class allocations, subjects, and school event registrations.
                </p>
              </div>
            </div>
            <button className="w-full mt-6 bg-slate-100 group-hover:bg-slate-800 text-slate-800 group-hover:text-white font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5">
              Enter as Admin <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Primary Learning Loop Section */}
        <div className="mt-16 p-8 rounded-3xl bg-white border border-[#e6ece8] space-y-6 shadow-xs">
          <div className="text-center">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0d5c4d]">
              Product Principle (Section 2)
            </span>
            <h2 className="text-2xl font-black text-[#0d2b26] mt-1">
              End-to-End Academic Learning Loop
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {learningLoop.map((step, idx) => {
              const Icon = step.icon;

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#f8faf9] border border-[#e6ece8] flex flex-col items-center justify-between"
                >
                  <div className="h-9 w-9 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center mb-2">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-bold text-[#0d2b26]">{step.title}</p>
                  <p className="text-[10px] text-slate-500 mt-1 leading-snug">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e6ece8] bg-white py-8 px-6 text-center text-xs text-slate-500">
        <p className="font-bold text-[#0d2b26]">
          nawana — LEARN · GROW · LEAD
        </p>
        <p className="mt-1">
          Digital Learning and School Management Platform • Built for Sri Lankan schools in English, Sinhala, and Tamil.
        </p>
      </footer>
    </div>
  );
}
