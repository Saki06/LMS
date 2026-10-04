"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { PrototypeBar } from "@/components/layout/PrototypeBar";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ToastContainer } from "@/components/ui/toast";
import { LandingView } from "@/components/views/LandingView";
import { StudentDashboard } from "@/components/views/StudentDashboard";
import { CourseViews } from "@/components/views/CourseViews";
import { AssignmentViews } from "@/components/views/AssignmentViews";
import { QuizViews } from "@/components/views/QuizViews";
import { ResultsView } from "@/components/views/ResultsView";
import { TeacherViews } from "@/components/views/TeacherViews";
import { AdminViews } from "@/components/views/AdminViews";
import { AnnouncementsView } from "@/components/views/AnnouncementsView";
import { LibraryViews } from "@/components/views/LibraryViews";
import { ExamViews } from "@/components/views/ExamViews";
import { SportsView } from "@/components/views/SportsView";
import { EventsView } from "@/components/views/EventsView";
import { StudentProgressView } from "@/components/views/StudentProgressView";
import { ConnectView } from "@/components/views/ConnectView";
import { ProfileView } from "@/components/views/ProfileView";
import { SyllabusBuilderView } from "@/components/views/SyllabusBuilderView";

export default function HomePage() {
  const { currentRole, currentView, theme } = useApp();
  const [isLanding, setIsLanding] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // If user requests landing page
  if (isLanding) {
    return (
      <div className={theme === "dark" ? "dark bg-slate-950" : "bg-slate-50"}>
        <PrototypeBar />
        <LandingView onEnterApp={() => setIsLanding(false)} />
        <ToastContainer />
      </div>
    );
  }

  // Render view by role & route
  const renderCurrentView = () => {
    // Shared / Role Specific View Routing
    if (currentRole === "student") {
      switch (currentView) {
        case "dashboard":
          return <StudentDashboard />;
        case "profile":
          return <ProfileView />;
        case "connect":
          return <ConnectView />;
        case "courses":
          return <CourseViews />;
        case "assignments":
          return <AssignmentViews />;
        case "quizzes":
        case "exams":
          return <QuizViews />;
        case "past_papers":
        case "pastPapers":
          return <LibraryViews key="past_papers" initialTab="past_papers" />;
        case "results":
        case "progress":
          return <ExamViews />;
        case "library":
          return <LibraryViews key="library" initialTab="all" />;
        case "sports":
          return <SportsView />;
        case "events":
          return <EventsView />;
        case "announcements":
          return <AnnouncementsView />;
        default:
          return <StudentDashboard />;
      }
    } else if (currentRole === "teacher") {
      switch (currentView) {
        case "dashboard":
          return <TeacherViews initialTab="home" />;
        case "profile":
          return <ProfileView />;
        case "connect":
          return <ConnectView />;
        case "submissions":
          return <TeacherViews initialTab="grading" />;
        case "assignments":
          case "quizzes":
          return <TeacherViews initialTab="assignments" />;
        case "courses":
        case "syllabus":
          return <SyllabusBuilderView />;
        case "past_papers":
        case "pastPapers":
          return <LibraryViews key="past_papers" initialTab="past_papers" />;
        case "library":
          return <LibraryViews key="library_manage" initialTab="manage" />;
        case "sports":
          return <SportsView />;
        case "announcements":
          return <AnnouncementsView />;
        default:
          return <TeacherViews initialTab="grading" />;
      }
    } else {
      // Administrator
      switch (currentView) {
        case "dashboard":
          return <AdminViews initialTab="overview" />;
        case "profile":
          return <ProfileView />;
        case "connect":
          return <ConnectView />;
        case "schools":
          return <AdminViews initialTab="schools" />;
        case "classes":
          return <AdminViews initialTab="classes" />;
        case "subjects":
          return <AdminViews initialTab="subjects" />;
        case "users":
          return <AdminViews initialTab="users" />;
        case "library":
          return <LibraryViews initialTab="manage" />;
        case "settings":
          return <AdminViews initialTab="settings" />;
        case "sports_admin":
          return <SportsView />;
        case "events_admin":
          return <EventsView />;
        case "announcements":
          return <AnnouncementsView />;
        default:
          return <AdminViews initialTab="overview" />;
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[#fbfcfb] text-[#0d2b26]">
      {/* Top Prototype Controls */}
      <PrototypeBar />

      {/* Navbar - Permanently Anchored & Fixed at top */}
      <Navbar onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

      {/* Main Content Layout with Sidebar */}
      <div className="flex-1 flex overflow-hidden bg-[#f4f7f5]">
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 bg-[#f4f7f5]">
          <div className="max-w-7xl mx-auto">{renderCurrentView()}</div>
        </main>
      </div>

      {/* Floating Notifications */}
      <ToastContainer />
    </div>
  );
}
