"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  Trophy,
  Calendar,
  Sparkles,
  TrendingUp,
  FileText,
  Video,
  ExternalLink,
  X,
  Heart,
  MessageSquare,
  Download,
  Share2,
  ClipboardCheck,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function StudentDashboard() {
  const {
    currentUser,
    courses,
    assignments,
    quizzes,
    fixtures,
    events,
    t,
    setCurrentView,
    setSelectedCourseId,
    setSelectedLessonId,
    setSelectedAssignmentId,
    addToast
  } = useApp();

  const [isLiveClassModalOpen, setIsLiveClassModalOpen] = useState(false);

  // Learning Feed State
  const [feedLikes, setFeedLikes] = useState<Record<number, number>>({
    1: 38,
    2: 61,
    3: 203
  });
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [activeFeedFilter, setActiveFeedFilter] = useState<string>("all");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);

  const handleToggleLike = (postId: number, authorName: string) => {
    const isLiked = !!likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));
    setFeedLikes((prev) => ({
      ...prev,
      [postId]: isLiked ? prev[postId] - 1 : prev[postId] + 1
    }));
    addToast({
      type: "info",
      title: isLiked ? "Reaction Removed" : "Post Liked ❤️",
      message: isLiked ? `Removed like from ${authorName}'s post.` : `Liked ${authorName}'s post.`
    });
  };

  const handleDownloadNotes = (filename: string) => {
    addToast({
      type: "success",
      title: "Downloading Material",
      message: `Started downloading ${filename}`
    });
  };

  const handleSharePost = (title: string) => {
    navigator.clipboard?.writeText?.(window.location.href);
    addToast({
      type: "info",
      title: "Link Copied",
      message: `Link for "${title}" copied to clipboard.`
    });
  };

  const handleRegisterExhibition = () => {
    addToast({
      type: "success",
      title: "Registration Confirmed",
      message: "You have registered for the Annual Science Exhibition 2026!"
    });
  };

  const totalLessons = courses.reduce((acc, c) => acc + c.totalLessons, 0);
  const completedLessons = courses.reduce((acc, c) => acc + c.completedLessons, 0);
  const completionPercentage = Math.round((completedLessons / totalLessons) * 100) || 0;


  const handleContinueCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView("courses");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">


      {/* Main Grid: Continue Learning + Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning Course Cards (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          {/* LIVE NOW Class Alert Bar (Indigo & Violet Gradient Theme) */}
          <div className="relative overflow-hidden rounded-2xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50/90 via-purple-50/50 to-white p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-black uppercase tracking-wider">
                    LIVE NOW
                  </span>
                  <span className="text-xs text-indigo-900/60 font-semibold">Started 12 mins ago</span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-black text-indigo-950 tracking-tight">
                    Advanced Mathematics — Calculus
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    <span className="font-bold text-indigo-900">Mr. Krishnaswamy</span> • Grade 12 • 142 watching
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsLiveClassModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-black shadow-md hover:shadow-indigo-500/25 transition-all hover:scale-[1.02] shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <span>Join Class →</span>
              </button>
            </div>
          </div>

          {/* =================================================================== */}
          {/* LEARNING FEED (Clean White & Mint Theme)                           */}
          {/* =================================================================== */}
          <div className="rounded-3xl bg-white border border-[#e2eae5] p-5 sm:p-6 space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.03)] text-[#0d2b26]">
            {/* Header */}
            <div className="flex items-center justify-between relative">
              <h2 className="text-base sm:text-lg font-black text-[#0d2b26] tracking-tight flex items-center gap-2">
                <span>Learning Feed</span>
              </h2>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#f6f9f7] hover:bg-[#edf5f2] border border-[#d6ede6] text-xs font-bold text-[#0d5c4d] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Filter className="h-3 w-3 text-[#0d5c4d]" />
                  <span>Filter</span>
                </button>

                {isFilterDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-[#d6ede6] shadow-xl p-2 z-30 space-y-1 animate-in fade-in zoom-in-95">
                    {["all", "teachers", "students", "announcements"].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => {
                          setActiveFeedFilter(f);
                          setIsFilterDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                          activeFeedFilter === f
                            ? "bg-[#0d5c4d] text-white"
                            : "text-slate-700 hover:bg-[#ecf8f5]"
                        }`}
                      >
                        {f === "all" ? "All Posts" : f}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Post Cards Feed */}
            <div className="space-y-3.5">
              {/* Post 1: Ms. Kavitha Rajan (Teacher) */}
              {(activeFeedFilter === "all" || activeFeedFilter === "teachers") && (
                <div className="rounded-2xl bg-[#fbfdfc] hover:bg-white border border-[#e2eae5] hover:border-[#b2e5d9] p-4 sm:p-5 space-y-3 shadow-2xs hover:shadow-md transition-all">
                  {/* Author Header */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-xs">
                      MK
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-[#0d2b26]">Ms. Kavitha Rajan</h4>
                        <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-black uppercase tracking-wider">
                          TEACHER
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">Mathematics • 2 hrs ago</p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    New notes uploaded:{" "}
                    <strong className="text-[#0d2b26] font-bold">
                      Quadratic Equations — Chapter 5
                    </strong>
                    . 20 practice problems with solutions. PDF available in Notes. Don&apos;t forget tomorrow&apos;s mock exam! 📊
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold">
                      Grade 12
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0] text-[11px] font-bold">
                      Mathematics
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
                      PDF Available
                    </span>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#eef4f0]">
                    <button
                      type="button"
                      onClick={() => handleToggleLike(1, "Ms. Kavitha Rajan")}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer ${
                        likedPosts[1]
                          ? "bg-rose-50 text-rose-600 border-rose-200"
                          : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          likedPosts[1] ? "fill-rose-500 text-rose-500" : "text-rose-500"
                        }`}
                      />
                      <span>{feedLikes[1]}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        addToast({
                          type: "info",
                          title: "Comments",
                          message: "12 student comments in this thread."
                        })
                      }
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                      <span>12</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadNotes("Quadratic_Equations_Ch5_Notes.pdf")}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#ecf8f5] text-slate-700 hover:text-[#0d5c4d] border border-slate-200 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5 text-[#0d5c4d]" />
                      <span>Download</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSharePost("Quadratic Equations — Chapter 5")}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-sky-600 border border-slate-200 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="h-3.5 w-3.5 text-sky-600" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Post 2: Arjun Ramasamy (Student) */}
              {(activeFeedFilter === "all" || activeFeedFilter === "students") && (
                <div className="rounded-2xl bg-[#fbfdfc] hover:bg-white border border-[#e2eae5] hover:border-[#b2e5d9] p-4 sm:p-5 space-y-3 shadow-2xs hover:shadow-md transition-all">
                  {/* Author Header */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#0d5c4d] flex items-center justify-center text-white font-black text-sm shrink-0 shadow-xs">
                      AR
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-[#0d2b26]">Arjun Ramasamy</h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">Grade 11 • 5 hrs ago</p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Just scored 94/100 in Chemistry mock! 🎉 The AI tutor helped me understand electron configuration. Sharing my summary notes below!
                  </p>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#eef4f0]">
                    <button
                      type="button"
                      onClick={() => handleToggleLike(2, "Arjun Ramasamy")}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer ${
                        likedPosts[2]
                          ? "bg-rose-50 text-rose-600 border-rose-200"
                          : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          likedPosts[2] ? "fill-rose-500 text-rose-500" : "text-rose-500"
                        }`}
                      />
                      <span>{feedLikes[2]}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        addToast({
                          type: "info",
                          title: "Comments",
                          message: "24 comments on Arjun's achievement."
                        })
                      }
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                      <span>24</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        addToast({
                          type: "info",
                          title: "Summary Notes",
                          message: "Opening Arjun's Chemistry electron configuration notes..."
                        })
                      }
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#ecf8f5] text-slate-700 hover:text-[#0d5c4d] border border-slate-200 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5 text-[#0d5c4d]" />
                      <span>View Notes</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Post 3: Prof. Subramaniam (Principal) */}
              {(activeFeedFilter === "all" || activeFeedFilter === "announcements") && (
                <div className="rounded-2xl bg-[#fbfdfc] hover:bg-white border border-[#e2eae5] hover:border-[#b2e5d9] p-4 sm:p-5 space-y-3 shadow-2xs hover:shadow-md transition-all">
                  {/* Author Header */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#f3b738] flex items-center justify-center text-slate-950 font-black text-sm shrink-0 shadow-xs">
                      PS
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-[#0d2b26]">Prof. Subramaniam</h4>
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-black uppercase tracking-wider">
                          PRINCIPAL
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">Administration • Yesterday</p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    📣 Annual Science Exhibition — July 15th. Students Grade 9-12 submit proposals by June 30. Prizes worth LKR 500,000! 🏆
                  </p>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#eef4f0]">
                    <button
                      type="button"
                      onClick={() => handleToggleLike(3, "Prof. Subramaniam")}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer ${
                        likedPosts[3]
                          ? "bg-rose-50 text-rose-600 border-rose-200"
                          : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          likedPosts[3] ? "fill-rose-500 text-rose-500" : "text-rose-500"
                        }`}
                      />
                      <span>{feedLikes[3]}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        addToast({
                          type: "info",
                          title: "Comments",
                          message: "56 inquiries on the Science Exhibition."
                        })
                      }
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                      <span>56</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleRegisterExhibition}
                      className="px-3.5 py-1.5 rounded-xl bg-[#0d5c4d] hover:bg-[#0a473b] text-white border border-[#0d5c4d] text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <ClipboardCheck className="h-3.5 w-3.5 text-emerald-200" />
                      <span>Register</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Deadlines, Next Match, School Events */}
        <div className="space-y-4">
          {/* Active Assignments */}
          <Card className="border-[#e6ece8] bg-white">
            <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-extrabold text-[#0d2b26] flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#b47a16]" />
                Pending Assignments
              </CardTitle>
              <Badge variant="warning">{assignments.length}</Badge>
            </CardHeader>
            <CardContent className="p-5 pt-1 space-y-2.5">
              {assignments.map((asg) => (
                <div
                  key={asg.id}
                  onClick={() => {
                    setSelectedAssignmentId(asg.id);
                    setCurrentView("assignments");
                  }}
                  className="p-3.5 rounded-xl bg-[#f8faf9] border border-[#e6ece8] hover:border-[#0d5c4d]/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0d5c4d] group-hover:underline">
                      {asg.subjectName}
                    </span>
                    <span className="text-[10px] text-[#b47a16] font-mono font-bold">
                      Due: {asg.dueDate.split(" ")[0]}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 mt-1 line-clamp-1">{asg.title}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Next Sports Fixture */}
          <Card className="border-[#e6ece8] bg-white">
            <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-extrabold text-[#0d2b26] flex items-center gap-2">
                <Trophy className="h-4 w-4 text-sky-700" />
                Next Sports Fixture
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView("sports")}
                className="text-xs text-[#0d5c4d] font-bold h-6 px-2"
              >
                View Hub
              </Button>
            </CardHeader>
            <CardContent className="p-5 pt-1">
              {fixtures.filter((f) => f.status === "scheduled").slice(0, 1).map((fix) => (
                <div key={fix.id} className="p-3.5 rounded-xl bg-[#f8faf9] border border-[#e6ece8]">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">{fix.sportName}</span>
                    <span className="text-[#0d5c4d] font-bold">{fix.date} • {fix.time}</span>
                  </div>
                  <p className="text-xs font-bold text-[#0d2b26] mt-1.5">{fix.homeTeam}</p>
                  <p className="text-[10px] text-slate-500">vs {fix.awayTeam}</p>
                  <p className="text-[10px] text-[#0d5c4d] font-medium mt-2">📍 {fix.venue}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* School Event Card */}
          <Card className="border-[#e6ece8] bg-white">
            <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-extrabold text-[#0d2b26] flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#f3b738]" />
                Featured School Event
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-1">
              {events.slice(0, 1).map((evt) => (
                <div key={evt.id} className="p-3.5 rounded-xl bg-[#f8faf9] border border-[#e6ece8]">
                  <span className="text-[10px] font-bold text-[#b47a16] uppercase tracking-wider">
                    {evt.date}
                  </span>
                  <p className="text-xs font-bold text-[#0d2b26] mt-1">{evt.title}</p>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{evt.description}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentView("events")}
                    className="w-full mt-3 h-8 text-xs border-[#c4e9e0] text-[#0d5c4d] font-bold hover:bg-[#ecf8f5]"
                  >
                    View & RSVP
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Interactive Live Classroom Modal */}
      {isLiveClassModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-[#0f172a] text-white rounded-3xl max-w-3xl w-full border border-slate-800 shadow-2xl overflow-hidden my-6">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-black uppercase">
                  LIVE BROADCAST
                </span>
                <span className="text-xs font-bold text-slate-300">
                  Advanced Mathematics — Calculus (Mr. Krishnaswamy)
                </span>
              </div>
              <button
                onClick={() => setIsLiveClassModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Simulated Live Stream Viewport */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex flex-col justify-between p-4 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-bold text-slate-200">
                    🔴 Live • 142 Students Connected
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-mono text-emerald-400">
                    HD 1080p • 60 FPS
                  </span>
                </div>

                <div className="text-center space-y-2 py-10">
                  <div className="h-16 w-16 rounded-full bg-indigo-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg ring-4 ring-indigo-500/30">
                    MK
                  </div>
                  <div>
                    <p className="font-extrabold text-base text-white">Mr. Krishnaswamy</p>
                    <p className="text-xs text-indigo-300">Presenting: Integration by Substitution & Definite Integrals</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Audio & Mic: Active</span>
                  <a
                    href="https://meet.google.com/kav-math-live"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open in Google Meet
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
              <span>Interactive Q&A open for Grade 12 Physical Science</span>
              <button
                onClick={() => setIsLiveClassModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
