"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import {
  ConnectTeacher,
  ConnectStudent,
  ConnectStudyGroup,
  ConnectMessage,
  ConnectPurchase
} from "@/types/lms";
import {
  initialConnectTeachers,
  initialConnectStudents,
  initialConnectStudyGroups,
  initialConnectPurchases,
  initialConnectMessages
} from "@/data/connectMockData";
import {
  Users,
  GraduationCap,
  Users2,
  MessageSquare,
  Receipt,
  Search,
  CheckCircle2,
  Lock,
  Unlock,
  Star,
  Video,
  BookOpen,
  Calendar,
  CreditCard,
  Building,
  UploadCloud,
  FileCheck,
  ChevronRight,
  ExternalLink,
  Send,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Download,
  AlertCircle
} from "lucide-react";
import { TeacherConnectView } from "@/components/views/TeacherConnectView";

type ConnectTab = "teachers" | "students" | "groups" | "messages" | "purchases";

export function ConnectView() {
  const { currentUser, currentRole, setCurrentView } = useApp();

  // If teacher, render Teacher Faculty Connect Studio (Subscribers list, bank slip verifications, live meet)
  if (currentRole === "teacher") {
    return <TeacherConnectView />;
  }

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<ConnectTab>("teachers");

  // State management
  const [teachers, setTeachers] = useState<ConnectTeacher[]>(initialConnectTeachers);
  const [students, setStudents] = useState<ConnectStudent[]>(initialConnectStudents);
  const [studyGroups, setStudyGroups] = useState<ConnectStudyGroup[]>(initialConnectStudyGroups);
  const [purchases, setPurchases] = useState<ConnectPurchase[]>(initialConnectPurchases);
  const [messages, setMessages] = useState<ConnectMessage[]>(initialConnectMessages);

  // Filters for Teachers tab
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals
  const [selectedTeacherForSubscribe, setSelectedTeacherForSubscribe] = useState<ConnectTeacher | null>(null);
  const [selectedTeacherForPreview, setSelectedTeacherForPreview] = useState<ConnectTeacher | null>(null);
  const [paymentSuccessToast, setPaymentSuccessToast] = useState<string | null>(null);

  // Checkout modal form state
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank_slip">("card");
  const [cardNumber, setCardNumber] = useState<string>("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState<string>("08/28");
  const [cardCvc, setCardCvc] = useState<string>("892");
  const [bankRefNo, setBankRefNo] = useState<string>("BOC-TXN-882190");
  const [slipAttached, setSlipAttached] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Chat state
  const [activeChatContact, setActiveChatContact] = useState<{ id: string; name: string; avatar: string }>({
    id: "ct_01",
    name: "Ms. Kavitha Rajan",
    avatar: "MK"
  });
  const [messageInput, setMessageInput] = useState<string>("");

  // Filtered teachers
  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const matchSubject =
        selectedSubject === "all" ||
        t.subject.toLowerCase().includes(selectedSubject.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(selectedSubject.toLowerCase()));
      const matchQuery =
        !searchQuery.trim() ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchSubject && matchQuery;
    });
  }, [teachers, selectedSubject, searchQuery]);

  // Handle Subscribe Completion
  const handleConfirmSubscribe = () => {
    if (!selectedTeacherForSubscribe) return;
    setIsProcessing(true);

    setTimeout(() => {
      const teacher = selectedTeacherForSubscribe;
      // Mark teacher as subscribed
      setTeachers((prev) =>
        prev.map((t) => (t.id === teacher.id ? { ...t, isSubscribed: true, subscribedDate: "2026-10-01" } : t))
      );

      // Add to Purchases list
      const newPurchase: ConnectPurchase = {
        id: `pur_${Date.now()}`,
        teacherId: teacher.id,
        teacherName: teacher.name,
        teacherInitials: teacher.initials,
        teacherColor: teacher.avatarColor,
        subject: teacher.subject,
        amount: teacher.monthlyFee,
        currency: teacher.currency,
        date: "2026-10-01",
        validUntil: "2026-11-01",
        status: "active",
        paymentMethod: paymentMethod === "card" ? "Card (Visa/Mastercard)" : "Bank Deposit (Commercial Bank)",
        receiptNo: `REC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        meetUrl: teacher.meetUrl
      };
      setPurchases((prev) => [newPurchase, ...prev]);

      setIsProcessing(false);
      setSelectedTeacherForSubscribe(null);
      setPaymentSuccessToast(`Successfully subscribed to ${teacher.name}! Live classes & materials unlocked.`);
      setTimeout(() => setPaymentSuccessToast(null), 5000);
    }, 900);
  };

  // Toggle Buddy in Students tab
  const handleToggleBuddy = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, isBuddy: !s.isBuddy } : s))
    );
  };

  // Toggle Study Group
  const handleToggleJoinGroup = (groupId: string) => {
    setStudyGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              isJoined: !g.isJoined,
              membersCount: g.isJoined ? g.membersCount - 1 : g.membersCount + 1
            }
          : g
      )
    );
  };

  // Send Chat Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg: ConnectMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id || "usr_student_01",
      senderName: currentUser.name || "Sathurjan K.",
      senderAvatar: "SK",
      text: messageInput.trim(),
      timestamp: "Just now",
      isMe: true
    };

    setMessages((prev) => [...prev, newMsg]);
    setMessageInput("");

    // Simulated reply after 1.2s
    setTimeout(() => {
      const autoReply: ConnectMessage = {
        id: `reply_${Date.now()}`,
        senderId: activeChatContact.id,
        senderName: activeChatContact.name,
        senderAvatar: activeChatContact.avatar,
        text: `Thank you for reaching out! I will review your inquiry and share the class notes shortly.`,
        timestamp: "Just now",
        isMe: false
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Toast Notification */}
      {paymentSuccessToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-[#0d5c4d] text-white shadow-2xl flex items-center gap-3 border border-[#a5f3df] animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="h-5 w-5 text-[#a5f3df] shrink-0" />
          <div className="text-xs">
            <p className="font-extrabold text-sm">Access Granted!</p>
            <p className="text-slate-200">{paymentSuccessToast}</p>
          </div>
          <button
            onClick={() => setPaymentSuccessToast(null)}
            className="p-1 hover:bg-white/20 rounded-lg text-white/80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Top Header & Sub-tabs (Exact match with user mockup) */}
      <div className="space-y-4">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#c4e9e0] shadow-xs">
          <button
            onClick={() => setActiveTab("teachers")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "teachers"
                ? "bg-[#0d5c4d] text-white shadow-sm ring-1 ring-[#0d5c4d]/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>Teachers</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              activeTab === "teachers" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
            }`}>
              {teachers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("groups")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "groups"
                ? "bg-[#0d5c4d] text-white shadow-sm ring-1 ring-[#0d5c4d]/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Users2 className="h-4 w-4" />
            <span>Study Groups</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              activeTab === "groups" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
            }`}>
              {studyGroups.length}
            </span>
          </button>
        </div>

        {/* Tab 1 Header: Find Teachers & Search Bar */}
        {activeTab === "teachers" && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#0d2b26] tracking-tight">
                  Find Teachers
                </h1>
                <span className="text-xs font-medium text-slate-500">
                  Pay to unlock full access
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Join live Google Meet classes, access premium tutes, and receive personal exam mentoring.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-2.5">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#c4e9e0] bg-white text-xs font-semibold text-slate-700 shadow-2xs focus:ring-2 focus:ring-[#0d5c4d]/20"
              >
                <option value="all">All Subjects</option>
                <option value="Combined Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Information & Communication Technology">ICT</option>
                <option value="Biology">Biology</option>
              </select>

              <div className="relative">
                <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search teachers or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3.5 py-2 rounded-xl border border-[#c4e9e0] bg-white text-xs text-slate-700 placeholder-slate-400 shadow-2xs focus:ring-2 focus:ring-[#0d5c4d]/20 w-44 sm:w-56"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* TAB 1: TEACHERS MARKETPLACE & CONTENT PAYWALL (Mockup Replication)  */}
      {/* =================================================================== */}
      {activeTab === "teachers" && (
        <div className="space-y-5">
          {filteredTeachers.map((teacher) => {
            const isSubscribed = teacher.isSubscribed;

            return (
              <div
                key={teacher.id}
                className="bg-white rounded-3xl border border-[#c4e9e0] shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Teacher Profile Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    {/* Left: Avatar + Details */}
                    <div className="flex items-start gap-4">
                      {/* Initials Avatar */}
                      <div
                        className={`h-14 w-14 rounded-2xl ${teacher.avatarColor} text-white font-black text-xl flex items-center justify-center shrink-0 shadow-sm`}
                      >
                        {teacher.initials}
                      </div>

                      {/* Name & Title */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-black text-[#0d2b26] tracking-tight">
                            {teacher.name}
                          </h3>
                          {teacher.verified && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              VERIFIED
                            </span>
                          )}
                        </div>

                        <p className="text-xs font-semibold text-slate-500">
                          {teacher.title}
                        </p>

                        {/* Metrics Row */}
                        <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap pt-1">
                          <span className="font-bold text-slate-800">
                            {teacher.studentsCount} <span className="font-normal text-slate-500">students</span>
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="font-bold text-slate-800">
                            {teacher.lessonsCount} <span className="font-normal text-slate-500">lessons</span>
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="font-bold text-slate-800">
                            {teacher.liveClassesCount} <span className="font-normal text-slate-500">live classes</span>
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="font-black text-[#0d5c4d] bg-[#ecf8f5] px-2 py-0.5 rounded-md">
                            LKR {teacher.monthlyFee.toLocaleString()}/month
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Rating Pill */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black shrink-0 self-start">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span>{teacher.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Tags and Action Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100 mt-4">
                    {/* Tags */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {teacher.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-2.5">
                      {isSubscribed ? (
                        <div className="flex items-center gap-2">
                          <span className="px-3.5 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 border border-emerald-300">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            Subscribed ✓
                          </span>
                          <a
                            href={teacher.meetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-[#0d5c4d] hover:bg-[#0a473b] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all hover:scale-[1.02]"
                          >
                            <Video className="h-4 w-4" />
                            Join Live Class
                          </a>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedTeacherForSubscribe(teacher)}
                          className="px-4 py-2 rounded-xl bg-[#0d5c4d] hover:bg-[#0a473b] text-white text-xs font-black flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
                        >
                          <CreditCard className="h-3.5 w-3.5 text-amber-300" />
                          <span>Subscribe — LKR {teacher.monthlyFee.toLocaleString()}/mo</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedTeacherForPreview(teacher)}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content Paywall / Unlocked Container (Exact Box from Mockup) */}
                <div className="p-4 sm:p-6 bg-gradient-to-b from-[#f8faf9] to-[#f0f5f3] border-t border-[#c4e9e0]">
                  {isSubscribed ? (
                    // UNLOCKED VIEW
                    <div className="rounded-2xl bg-white border border-[#a5f3df] p-5 shadow-xs space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-[#0d5c4d]">
                          <Unlock className="h-5 w-5 text-emerald-600" />
                          <h4 className="font-extrabold text-sm text-[#0d2b26]">
                            Full Content Unlocked & Ready
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Active Subscription
                          </span>
                        </div>

                        <span className="text-xs text-slate-500 font-semibold">
                          Renews: Nov 01, 2026
                        </span>
                      </div>

                      {/* Unlocked Resources Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <a
                          href={teacher.meetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 flex items-center gap-3 transition-colors group"
                        >
                          <div className="h-9 w-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <Video className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-emerald-950 group-hover:text-emerald-700 flex items-center gap-1">
                              Google Meet Class <ExternalLink className="h-3 w-3" />
                            </p>
                            <p className="text-[10px] text-emerald-700 font-mono truncate max-w-[140px]">
                              {teacher.meetUrl.replace("https://", "")}
                            </p>
                          </div>
                        </a>

                        <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-slate-900">
                              {teacher.lessonsCount} Lesson Archive
                            </p>
                            <p className="text-[10px] text-slate-500">HD Recordings & Slides</p>
                          </div>
                        </div>

                        <a
                          href={`mailto:${teacher.name.toLowerCase().replace(/[^a-z]/g, '')}@nawana.edu?subject=Doubt%20Inquiry%20-%20${encodeURIComponent(teacher.subject)}`}
                          className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 flex items-center gap-3 text-left transition-colors"
                        >
                          <div className="h-9 w-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-slate-900">Email Inquiry</p>
                            <p className="text-[10px] text-slate-500">Ask doubts & homework check</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  ) : (
                    // LOCKED PAYWALL CONTAINER (Exact Layout from Mockup)
                    <div className="rounded-2xl border-2 border-dashed border-[#c4e9e0] bg-white/70 p-6 sm:p-8 text-center space-y-3">
                      <div className="h-11 w-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-2xs">
                        <Lock className="h-5 w-5" />
                      </div>

                      <div className="space-y-1 max-w-md mx-auto">
                        <h4 className="font-black text-sm text-[#0d2b26]">
                          Subscribe to access full content
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          Live classes • Recorded lessons • Course notes • Q&A sessions • Meetings
                        </p>
                      </div>

                      {/* Locked Google Meet Bar snippet */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-400 font-mono mt-2">
                        <Video className="h-3.5 w-3.5" />
                        <span className="blur-xs select-none">meet.google.com/xyz-abcd-efg</span>
                        <Lock className="h-3 w-3 text-amber-500 shrink-0 ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: STUDENTS DIRECTORY (Peer Networking)                         */}
      {/* =================================================================== */}
      {activeTab === "students" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-black text-[#0d2b26]">Batch Students & Study Partners</h2>
              <p className="text-xs text-slate-500">Find classmates and A/L study buddies to revise together.</p>
            </div>
            <span className="text-xs font-bold text-slate-500">
              {students.filter((s) => s.isBuddy).length} Study Buddies Connected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-2xl border border-[#c4e9e0] p-5 shadow-xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`h-12 w-12 rounded-xl ${student.avatarColor} text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-2xs relative`}
                  >
                    {student.initials}
                    <span
                      className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${
                        student.status === "online"
                          ? "bg-emerald-500"
                          : student.status === "in_study"
                          ? "bg-amber-500"
                          : "bg-slate-300"
                      }`}
                    />
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-[#0d2b26]">{student.name}</h4>
                      {student.isBuddy && (
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Buddy ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      {student.grade} • {student.stream} ({student.school})
                    </p>
                    <div className="flex items-center gap-1.5 pt-1">
                      {student.subjects.map((sub) => (
                        <span
                          key={sub}
                          className="px-2 py-0.5 rounded text-[10px] bg-slate-100 font-semibold text-slate-600"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleBuddy(student.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      student.isBuddy
                        ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        : "bg-[#0d5c4d] text-white hover:bg-[#0a473b]"
                    }`}
                  >
                    {student.isBuddy ? "Connected" : "+ Connect"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: STUDY GROUPS (Collaborative Circles)                          */}
      {/* =================================================================== */}
      {activeTab === "groups" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-black text-[#0d2b26]">Collaborative Study Circles</h2>
              <p className="text-xs text-slate-500">Join active weekly groups to solve hard past papers and doubts.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyGroups.map((group) => (
              <div
                key={group.id}
                className={`bg-white rounded-2xl border border-[#c4e9e0] p-6 shadow-xs flex flex-col justify-between space-y-4 relative overflow-hidden`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#ecf8f5] text-[#0d5c4d] text-[11px] font-bold">
                      {group.subject}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {group.membersCount} / {group.maxMembers} Members
                    </span>
                  </div>

                  <h3 className="font-black text-base text-[#0d2b26]">{group.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{group.description}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                  <p className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    <span>Current Topic:</span> {group.activeTopic}
                  </p>
                  <p className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Schedule:</span> {group.schedule}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500 font-medium">Free student group</span>
                  <button
                    onClick={() => handleToggleJoinGroup(group.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      group.isJoined
                        ? "bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 border border-transparent"
                        : "bg-[#0d5c4d] hover:bg-[#0a473b] text-white shadow-xs"
                    }`}
                  >
                    {group.isJoined ? "Joined Circle ✓ (Leave)" : "Join Study Circle"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 4: MESSAGES (Interactive Messenger)                             */}
      {/* =================================================================== */}
      {activeTab === "messages" && (
        <div className="bg-white rounded-3xl border border-[#c4e9e0] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[540px]">
          {/* Contacts Sidebar */}
          <div className="border-r border-slate-100 p-4 space-y-3 bg-[#fbfcfb]">
            <h3 className="font-black text-sm text-[#0d2b26] px-2">Conversations</h3>
            <div className="space-y-1">
              {[
                { id: "ct_01", name: "Ms. Kavitha Rajan", role: "Combined Maths", avatar: "MK", unread: 1 },
                { id: "ct_02", name: "Mr. Thuvaragan S.", role: "Physics", avatar: "TR", unread: 0 },
                { id: "cs_01", name: "Thivya N.", role: "Study Buddy", avatar: "TN", unread: 0 }
              ].map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setActiveChatContact({ id: contact.id, name: contact.name, avatar: contact.avatar })}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition-all ${
                    activeChatContact.id === contact.id
                      ? "bg-[#ecf8f5] border border-[#a5f3df]"
                      : "hover:bg-slate-100/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#0d5c4d] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                      {contact.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#0d2b26]">{contact.name}</p>
                      <p className="text-[10px] text-slate-500">{contact.role}</p>
                    </div>
                  </div>
                  {contact.unread > 0 && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active Chat Thread */}
          <div className="md:col-span-2 flex flex-col justify-between">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-[#0d5c4d] text-white font-bold text-xs flex items-center justify-center">
                  {activeChatContact.avatar}
                </div>
                <div>
                  <h4 className="font-black text-sm text-[#0d2b26]">{activeChatContact.name}</h4>
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Online & Active
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Body */}
            <div className="p-4 space-y-3 overflow-y-auto max-h-[380px] bg-[#fdfefe]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.isMe
                        ? "bg-[#0d5c4d] text-white rounded-br-xs shadow-xs"
                        : "bg-slate-100 text-slate-800 rounded-bl-xs"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
              <input
                type="text"
                placeholder={`Message ${activeChatContact.name}...`}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0d5c4d]/20 focus:border-[#0d5c4d]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-[#0d5c4d] hover:bg-[#0a473b] text-white transition-colors shadow-xs"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 5: MY PURCHASES & INVOICES                                      */}
      {/* =================================================================== */}
      {activeTab === "purchases" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-black text-[#0d2b26]">My Active Subscriptions & Invoices</h2>
              <p className="text-xs text-slate-500">Track paid teachers, monthly renewal dates, and payment receipts.</p>
            </div>
          </div>

          {purchases.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
              <Receipt className="h-8 w-8 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-600">No active subscriptions yet</p>
              <p className="text-xs text-slate-400">Subscribe to any teacher from the Teachers tab to unlock classes.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="bg-white rounded-2xl border border-[#c4e9e0] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-12 w-12 rounded-xl ${purchase.teacherColor} text-white font-extrabold text-base flex items-center justify-center shrink-0`}
                    >
                      {purchase.teacherInitials}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-[#0d2b26]">
                          {purchase.teacherName}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold">
                          ACTIVE PLAN
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{purchase.subject}</p>
                      <p className="text-[11px] text-slate-400">
                        Paid via {purchase.paymentMethod} • Receipt: <span className="font-mono text-slate-600">{purchase.receiptNo}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right sm:border-r border-slate-200 sm:pr-4">
                      <p className="font-black text-sm text-[#0d5c4d]">
                        LKR {purchase.amount.toLocaleString()} / mo
                      </p>
                      <p className="text-[10px] text-slate-400">Next renewal: {purchase.validUntil}</p>
                    </div>

                    <a
                      href={purchase.meetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[#0d5c4d] hover:bg-[#0a473b] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                    >
                      <Video className="h-3.5 w-3.5" />
                      Join Meet
                    </a>

                    <button
                      onClick={() => alert(`Downloading official invoice receipt #${purchase.receiptNo} for LKR ${purchase.amount}`)}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs"
                      title="Download Invoice PDF"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* CHECKOUT / SUBSCRIPTION MODAL                                       */}
      {/* =================================================================== */}
      {selectedTeacherForSubscribe && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden my-6">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#fbfcfb]">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Monthly Class Pass
                </span>
                <h3 className="font-black text-base text-[#0d2b26] mt-1">
                  Subscribe to {selectedTeacherForSubscribe.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedTeacherForSubscribe.subject} • Full curriculum & live access
                </p>
              </div>
              <button
                onClick={() => setSelectedTeacherForSubscribe(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              {/* Plan Summary Card */}
              <div className="p-4 rounded-2xl bg-[#ecf8f5] border border-[#a5f3df] flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-[#0d5c4d] uppercase tracking-wider">
                    Total Due Today
                  </p>
                  <p className="text-2xl font-black text-[#0d2b26]">
                    LKR {selectedTeacherForSubscribe.monthlyFee.toLocaleString()}
                    <span className="text-xs font-normal text-slate-500"> / month</span>
                  </p>
                </div>
                <div className="text-right text-[11px] text-slate-600 font-semibold space-y-0.5">
                  <p>✓ 4 Live Meets / mo</p>
                  <p>✓ Complete Tute Pack</p>
                  <p>✓ 1-on-1 Q&A</p>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="font-extrabold text-slate-700">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-xl border flex flex-col items-start gap-1.5 transition-all text-left ${
                      paymentMethod === "card"
                        ? "bg-white border-[#0d5c4d] shadow-sm ring-2 ring-[#0d5c4d]/20 text-[#0d2b26]"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <CreditCard className="h-4 w-4 text-[#0d5c4d]" />
                      <span>Card / PayHere</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Visa, Mastercard, FriMi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank_slip")}
                    className={`p-3 rounded-xl border flex flex-col items-start gap-1.5 transition-all text-left ${
                      paymentMethod === "bank_slip"
                        ? "bg-white border-[#0d5c4d] shadow-sm ring-2 ring-[#0d5c4d]/20 text-[#0d2b26]"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Building className="h-4 w-4 text-emerald-700" />
                      <span>Bank Slip Upload</span>
                    </div>
                    <span className="text-[10px] text-slate-400">BOC, Commercial Bank</span>
                  </button>
                </div>
              </div>

              {/* Payment Details form depending on method */}
              {paymentMethod === "card" ? (
                <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono text-xs font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">CVC / CVV</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-center"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 p-4 rounded-2xl bg-amber-50/50 border border-amber-200 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-amber-200 space-y-1">
                    <p className="font-extrabold text-[#0d2b26]">Direct Bank Deposit Details</p>
                    <p className="text-slate-600 font-mono text-[11px]">
                      Bank: <span className="font-bold">Commercial Bank of Ceylon</span>
                    </p>
                    <p className="text-slate-600 font-mono text-[11px]">
                      Account: <span className="font-bold">80019284019</span> (Nawana LMS)
                    </p>
                    <p className="text-slate-600 font-mono text-[11px]">
                      Branch: <span className="font-bold">Colombo City Center</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 text-[11px]">Deposit Reference No.</label>
                    <input
                      type="text"
                      value={bankRefNo}
                      onChange={(e) => setBankRefNo(e.target.value)}
                      placeholder="e.g. BOC-TXN-882190"
                      className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white font-mono text-xs"
                    />
                  </div>

                  <div className="border border-dashed border-emerald-400 bg-white rounded-xl p-3 text-center flex items-center justify-center gap-2 text-emerald-800 font-bold">
                    <FileCheck className="h-4 w-4 text-emerald-600" />
                    <span>Deposit Slip Attached (deposit_slip.pdf)</span>
                  </div>
                </div>
              )}

              <p className="text-[11px] text-slate-400 text-center">
                🔒 Secure 256-bit SSL encrypted. Cancel anytime before your next monthly billing cycle.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-[#fbfcfb] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedTeacherForSubscribe(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirmSubscribe}
                className="px-5 py-2.5 rounded-xl bg-[#0d5c4d] hover:bg-[#0a473b] text-white font-black text-xs shadow-md transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                {isProcessing ? (
                  <span>Activating Subscription...</span>
                ) : (
                  <>
                    <span>Confirm & Pay LKR {selectedTeacherForSubscribe.monthlyFee.toLocaleString()}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TEACHER PREVIEW MODAL                                               */}
      {/* =================================================================== */}
      {selectedTeacherForPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden my-6">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#fbfcfb]">
              <div className="flex items-center gap-3">
                <div
                  className={`h-11 w-11 rounded-xl ${selectedTeacherForPreview.avatarColor} text-white font-black text-base flex items-center justify-center`}
                >
                  {selectedTeacherForPreview.initials}
                </div>
                <div>
                  <h3 className="font-black text-base text-[#0d2b26]">
                    {selectedTeacherForPreview.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedTeacherForPreview.title}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTeacherForPreview(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <p className="font-extrabold text-slate-800">Teacher Biography</p>
                <p className="text-slate-600 leading-relaxed">{selectedTeacherForPreview.bio}</p>
              </div>

              <div className="space-y-1">
                <p className="font-extrabold text-slate-800">Qualifications & Honours</p>
                <p className="text-slate-600">{selectedTeacherForPreview.qualifications}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <p className="font-extrabold text-slate-800 flex items-center gap-1.5">
                  <Video className="h-4 w-4 text-[#0d5c4d]" />
                  <span>Free Demo Lesson Preview</span>
                </p>
                <p className="text-slate-600 font-semibold">{selectedTeacherForPreview.sampleVideoTitle}</p>
                <div className="aspect-video rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-slate-700 transition-colors">
                  ▶ Play 5-Min Concept Preview
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-[#fbfcfb] flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  const teacher = selectedTeacherForPreview;
                  setSelectedTeacherForPreview(null);
                  setSelectedTeacherForSubscribe(teacher);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0d5c4d] hover:bg-[#0a473b] text-white text-xs font-black shadow-sm"
              >
                Subscribe — LKR {selectedTeacherForPreview.monthlyFee.toLocaleString()}/mo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
