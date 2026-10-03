"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import {
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  Layers,
  FileText,
  Plus,
  Send,
  MessageSquare,
  Award,
  ClipboardCheck,
  Eye,
  Bell,
  Sparkles,
  Filter,
  Check,
  BarChart3,
  Calendar,
  AlertCircle,
  ExternalLink,
  Search,
  TrendingUp,
  UploadCloud,
  Video,
  Presentation,
  FileUp,
  X,
  Link2,
  Trash2,
  Paperclip,
  Film,
  FileCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

interface TeacherViewsProps {
  initialTab?: "grading" | "assignments" | "analytics";
}

export function TeacherViews({ initialTab = "grading" }: TeacherViewsProps) {
  const {
    courses,
    assignments,
    submissions,
    gradeSubmission,
    createAssignment,
    createLesson,
    createAnnouncement,
    currentView,
    setCurrentView,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState<"grading" | "assignments" | "analytics">(
    currentView === "assignments"
      ? "assignments"
      : initialTab
  );

  // Sync tab if currentView changes externally from sidebar
  useEffect(() => {
    if (currentView === "assignments") {
      setActiveTab("assignments");
    } else if (currentView === "submissions" || currentView === "dashboard") {
      setActiveTab("grading");
    }
  }, [currentView]);

  const [selectedSubId, setSelectedSubId] = useState<string>(submissions[0]?.id || "");
  const [subFilter, setSubFilter] = useState<"all" | "pending" | "marked" | "released">("pending");
  const [assignmentFilter, setAssignmentFilter] = useState<string>("all");
  const [marksInput, setMarksInput] = useState<number>(85);
  const [feedbackInput, setFeedbackInput] = useState<string>("");

  // Modals
  const [isCreateAsgModalOpen, setIsCreateAsgModalOpen] = useState(false);
  const [isCreateLessonModalOpen, setIsCreateLessonModalOpen] = useState(false);
  const [isCreateAnnouncementModalOpen, setIsCreateAnnouncementModalOpen] = useState(false);

  // New assignment form state
  const [newTitle, setNewTitle] = useState("");
  const [newTopic, setNewTopic] = useState("Unit 1: Quadratic Functions");
  const [newDueDate, setNewDueDate] = useState("2026-10-18 23:59");
  const [newMaxMarks, setNewMaxMarks] = useState(100);
  const [newInstructions, setNewInstructions] = useState("");
  const [newCourseId, setNewCourseId] = useState(courses[0]?.id || "");

  // New lesson form state with full multi-format upload support
  const [lessonCourseId, setLessonCourseId] = useState(courses[0]?.id || "crs_math_12");
  const [lessonUnitId, setLessonUnitId] = useState("");
  const [lessonTopicId, setLessonTopicId] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonContentType, setLessonContentType] = useState<"pdf" | "slides" | "video" | "rich_text">("pdf");
  const [lessonBody, setLessonBody] = useState("");
  const [lessonVideoUrl, setLessonVideoUrl] = useState("");
  const [lessonVideoDuration, setLessonVideoDuration] = useState("45 mins");
  const [lessonSlidesCount, setLessonSlidesCount] = useState<number>(10);
  const [uploadedMainFile, setUploadedMainFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [supplementaryFiles, setSupplementaryFiles] = useState<{ name: string; size: string; type: string }[]>([]);

  // Synchronize target units and topics based on selected course
  const currentLessonCourse = courses.find((c) => c.id === lessonCourseId) || courses[0];
  const currentUnits = currentLessonCourse?.units || [];
  const activeSelectedUnit = currentUnits.find((u) => u.id === lessonUnitId) || currentUnits[0];
  const currentTopics = activeSelectedUnit?.topics || [];
  const activeSelectedTopic = currentTopics.find((t) => t.id === lessonTopicId) || currentTopics[0];

  const handleMainFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      const fileExt = file.name.split(".").pop()?.toUpperCase() || "PDF";
      setUploadedMainFile({
        name: file.name,
        size: sizeStr,
        type: fileExt
      });
      if (!lessonTitle) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        setLessonTitle(cleanName);
      }
    }
  };

  const handleSupplementaryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      const fileExt = file.name.split(".").pop()?.toUpperCase() || "PDF";
      setSupplementaryFiles((prev) => [
        ...prev,
        { name: file.name, size: sizeStr, type: fileExt }
      ]);
    }
  };

  const removeSupplementaryFile = (index: number) => {
    setSupplementaryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // New announcement form state
  const [annTitle, setAnnTitle] = useState("");
  const [annMessage, setAnnMessage] = useState("");
  const [annAudience, setAnnAudience] = useState("12-Physical Science Students");
  const [annPriority, setAnnPriority] = useState<"normal" | "high">("normal");

  // Filtered submissions for Grading Desk
  const filteredSubmissions = submissions.filter((s) => {
    if (assignmentFilter !== "all" && s.assignmentId !== assignmentFilter) return false;
    if (subFilter === "pending") return s.status === "submitted";
    if (subFilter === "marked") return s.status === "marked";
    if (subFilter === "released") return s.status === "result_released";
    return true;
  });

  const activeSubmission =
    submissions.find((s) => s.id === selectedSubId) || filteredSubmissions[0] || submissions[0];

  // Update inputs when active submission changes
  useEffect(() => {
    if (activeSubmission) {
      setMarksInput(activeSubmission.marksObtained ?? activeSubmission.maxMarks * 0.85);
      setFeedbackInput(activeSubmission.teacherFeedback || "");
    }
  }, [activeSubmission?.id]);

  const handleSaveGrade = (release: boolean) => {
    if (!activeSubmission) return;
    gradeSubmission(activeSubmission.id, Number(marksInput), feedbackInput, release);
  };

  const handleCreateAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    createAssignment({
      courseId: newCourseId,
      title: newTitle,
      topicName: newTopic,
      dueDate: newDueDate,
      maxMarks: Number(newMaxMarks),
      instructions: newInstructions
    });
    setIsCreateAsgModalOpen(false);
    setNewTitle("");
    setNewInstructions("");
  };

  const handleCreateLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle) return;
    const targetCourse = courses.find((c) => c.id === lessonCourseId) || courses[0];
    const targetUnit = targetCourse.units.find((u) => u.id === lessonUnitId) || targetCourse.units[0];
    const targetTopic = targetUnit?.topics.find((t) => t.id === lessonTopicId) || targetUnit?.topics[0];

    const allAttachments = [...supplementaryFiles];
    if (uploadedMainFile) {
      allAttachments.unshift(uploadedMainFile);
    }

    let generatedBody = lessonBody;
    if (!generatedBody.trim()) {
      if (lessonContentType === "pdf") {
        generatedBody = `Official curriculum PDF study guide: ${uploadedMainFile?.name || "Curriculum_Lecture_Guide.pdf"}\n\nStudents can read and download this comprehensive reference material with worked examples and exercise problems.`;
      } else if (lessonContentType === "slides") {
        generatedBody = `Presentation Slide Deck (${lessonSlidesCount} slides)\nFile: ${uploadedMainFile?.name || "Presentation_Slides.pptx"}\n\nReview each slide deck step-by-step for key diagrams, definitions, and exam techniques.`;
      } else if (lessonContentType === "video") {
        generatedBody = `Classroom Video Recording (${lessonVideoDuration})\nVideo Link: ${lessonVideoUrl || "https://meet.google.com/class-recording"}\nFile: ${uploadedMainFile?.name || "Video Lecture"}\n\nFull HD classroom lecture covering core principles, step-by-step problem solving, and past paper proofs.`;
      } else {
        generatedBody = "Detailed lecture material, definitions, and theory study notes.";
      }
    }

    if (targetUnit && targetTopic) {
      createLesson(targetCourse.id, targetUnit.id, targetTopic.id, {
        title: lessonTitle,
        description: lessonDescription || (lessonContentType === "pdf" ? "Coursework PDF study material" : lessonContentType === "slides" ? "Classroom presentation slides" : lessonContentType === "video" ? "Classroom video recording" : "Interactive theory lecture"),
        contentType: lessonContentType,
        contentBody: generatedBody,
        videoUrl: lessonVideoUrl,
        slidesCount: lessonSlidesCount,
        attachments: allAttachments
      });
    }

    setIsCreateLessonModalOpen(false);
    setLessonTitle("");
    setLessonDescription("");
    setLessonBody("");
    setLessonVideoUrl("");
    setUploadedMainFile(null);
    setSupplementaryFiles([]);
  };

  const handleCreateAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle) return;
    createAnnouncement({
      title: annTitle,
      message: annMessage,
      targetAudience: annAudience,
      priority: annPriority
    });
    setIsCreateAnnouncementModalOpen(false);
    setAnnTitle("");
    setAnnMessage("");
  };

  // Performance analytics calculation
  const gradedSubmissions = submissions.filter((s) => s.marksObtained !== undefined);
  const avgScore = gradedSubmissions.length > 0
    ? (
        gradedSubmissions.reduce(
          (sum, s) => sum + ((s.marksObtained || 0) / s.maxMarks) * 100,
          0
        ) / gradedSubmissions.length
      ).toFixed(1)
    : "84.5";

  // Sri Lanka G.C.E A/L Grade Distribution
  const gradeDistribution = [
    { grade: "A (75-100%)", count: 18, fill: "#0d5c4d" },
    { grade: "B (65-74%)", count: 12, fill: "#158066" },
    { grade: "C (55-64%)", count: 6, fill: "#f3b738" },
    { grade: "S (40-54%)", count: 3, fill: "#e59f20" },
    { grade: "W (<40%)", count: 1, fill: "#e11d48" }
  ];

  const studentRoster = [
    { name: "Sathurjan K.", index: "AL-2026-4401", class: "12-Physical Science", submitted: 2, avg: "94%", status: "Distinction" },
    { name: "Kasun Bandara", index: "AL-2026-4402", class: "12-Physical Science", submitted: 1, avg: "Pending", status: "Review" },
    { name: "Anuki Silva", index: "AL-2026-4403", class: "12-Physical Science", submitted: 2, avg: "88%", status: "Distinction" },
    { name: "Dineth Perera", index: "AL-2026-4404", class: "12-Physical Science", submitted: 2, avg: "76%", status: "Merit" },
    { name: "Tharushi Fernando", index: "AL-2026-4405", class: "12-Physical Science", submitted: 2, avg: "68%", status: "Credit" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Teacher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e6ece8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#0d5c4d]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0d5c4d]">
              Faculty Management System
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#0d2b26] mt-1">Teacher Faculty Portal</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage course syllabi, assign coursework, review student submissions, and release marks.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            onClick={() => setIsCreateAnnouncementModalOpen(true)}
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-2xs"
          >
            <Bell className="h-3.5 w-3.5 mr-1.5" /> Notice
          </Button>

          <Button
            onClick={() => setIsCreateAsgModalOpen(true)}
            className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold gap-1.5 text-xs shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" /> Create Assignment
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-[#e6ece8] bg-white shadow-2xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold">Assigned Classes</p>
              <p className="text-2xl font-black text-[#0d2b26] mt-1">{courses.length} Classes</p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e6ece8] bg-white shadow-2xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold">Pending Review</p>
              <p className="text-2xl font-black text-[#b47a16] mt-1">
                {submissions.filter((s) => s.status === "submitted").length} Submissions
              </p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-[#fef7e6] text-[#b47a16] flex items-center justify-center">
              <ClipboardCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e6ece8] bg-white shadow-2xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold">Graded & Released</p>
              <p className="text-2xl font-black text-[#0d5c4d] mt-1">
                {submissions.filter((s) => s.status === "result_released").length}
              </p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e6ece8] bg-white shadow-2xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold">Class Avg Score</p>
              <p className="text-2xl font-black text-[#0d5c4d] mt-1">{avgScore}%</p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation Pill Bar */}
      <div className="flex items-center gap-2 border-b border-[#e6ece8] pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab("grading")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "grading"
              ? "bg-[#0d5c4d] text-white shadow-xs"
              : "text-slate-600 hover:text-[#0d5c4d] hover:bg-white"
          }`}
        >
          <ClipboardCheck className="h-4 w-4" />
          <span>Submissions & Grading Desk</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            activeTab === "grading" ? "bg-white/20 text-white" : "bg-[#fef7e6] text-[#b47a16]"
          }`}>
            {submissions.filter((s) => s.status === "submitted").length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("assignments")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "assignments"
              ? "bg-[#0d5c4d] text-white shadow-xs"
              : "text-slate-600 hover:text-[#0d5c4d] hover:bg-white"
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Course Assignments ({assignments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "analytics"
              ? "bg-[#0d5c4d] text-white shadow-xs"
              : "text-slate-600 hover:text-[#0d5c4d] hover:bg-white"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Performance Analytics</span>
        </button>
      </div>

      {/* TAB 1: Submissions Review & Grading Desk (Section 6.4) */}
      {activeTab === "grading" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-extrabold text-[#0d2b26] flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-[#0d5c4d]" />
              Submissions Review & Grading Desk (Section 6.4)
            </h2>

            {/* Filter Group */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Assignment Filter */}
              <select
                value={assignmentFilter}
                onChange={(e) => setAssignmentFilter(e.target.value)}
                className="h-8 px-2.5 rounded-xl bg-white border border-[#e6ece8] text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0d5c4d]"
              >
                <option value="all">All Assignments</option>
                {assignments.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.title}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <div className="flex items-center bg-white border border-[#e6ece8] rounded-xl p-0.5 shadow-2xs">
                <button
                  onClick={() => setSubFilter("pending")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    subFilter === "pending"
                      ? "bg-[#f3b738] text-slate-950 shadow-xs"
                      : "text-slate-600 hover:text-[#0d5c4d]"
                  }`}
                >
                  Pending ({submissions.filter((s) => s.status === "submitted").length})
                </button>
                <button
                  onClick={() => setSubFilter("marked")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    subFilter === "marked"
                      ? "bg-slate-800 text-white shadow-xs"
                      : "text-slate-600 hover:text-[#0d5c4d]"
                  }`}
                >
                  Draft ({submissions.filter((s) => s.status === "marked").length})
                </button>
                <button
                  onClick={() => setSubFilter("released")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    subFilter === "released"
                      ? "bg-[#0d5c4d] text-white shadow-xs"
                      : "text-slate-600 hover:text-[#0d5c4d]"
                  }`}
                >
                  Released ({submissions.filter((s) => s.status === "result_released").length})
                </button>
                <button
                  onClick={() => setSubFilter("all")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    subFilter === "all"
                      ? "bg-[#0d5c4d] text-white shadow-xs"
                      : "text-slate-600 hover:text-[#0d5c4d]"
                  }`}
                >
                  All ({submissions.length})
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Submissions Queue (5 cols) */}
            <div className="lg:col-span-5 space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                Select Student Submission ({filteredSubmissions.length})
              </p>

              {filteredSubmissions.length === 0 ? (
                <div className="p-8 text-center bg-white border border-[#e6ece8] rounded-2xl text-xs text-slate-500">
                  No submissions matching this filter.
                </div>
              ) : (
                filteredSubmissions.map((sub) => {
                  const isSelected = activeSubmission?.id === sub.id;

                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubId(sub.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-white border-[#0d5c4d] shadow-md ring-2 ring-[#0d5c4d]/10"
                          : "bg-white border-[#e6ece8] hover:border-[#c4e9e0] shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">{sub.studentName}</span>
                        <Badge
                          variant={
                            sub.status === "result_released"
                              ? "success"
                              : sub.status === "marked"
                              ? "default"
                              : "warning"
                          }
                        >
                          {sub.status === "result_released"
                            ? "Released"
                            : sub.status === "marked"
                            ? "Draft Marked"
                            : "Pending Review"}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#0d5c4d] font-bold mt-1">
                        {sub.assignmentTitle}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                        <span>Submitted: {sub.submittedAt}</span>
                        {sub.marksObtained !== undefined && (
                          <span className="font-bold text-[#0d5c4d]">
                            Score: {sub.marksObtained}/{sub.maxMarks} (
                            {Math.round((sub.marksObtained / sub.maxMarks) * 100)}%)
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Grading Desk & Feedback Composer (7 cols) */}
            <div className="lg:col-span-7">
              {activeSubmission ? (
                <Card className="border-[#e6ece8] bg-white shadow-2xs p-6 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#e6ece8]">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-[#0d2b26]">
                          {activeSubmission.studentName}
                        </h3>
                        <Badge
                          variant={
                            activeSubmission.status === "result_released"
                              ? "success"
                              : activeSubmission.status === "marked"
                              ? "default"
                              : "warning"
                          }
                          className="text-[10px]"
                        >
                          {activeSubmission.status === "result_released"
                            ? "Marks Released"
                            : activeSubmission.status === "marked"
                            ? "Draft Saved"
                            : "Awaiting Evaluation"}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {activeSubmission.assignmentTitle}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs font-mono font-bold bg-[#f8faf9] border-slate-300">
                      Max: {activeSubmission.maxMarks} Marks
                    </Badge>
                  </div>

                  {/* Student's answer text and file */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Student's Submission Work:
                    </p>
                    <div className="p-4 rounded-xl bg-[#f8faf9] border border-[#e6ece8] text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                      {activeSubmission.textContent || "No written response text entered."}
                    </div>
                    {activeSubmission.fileAttachmentName && (
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#ecf8f5] border border-[#c4e9e0] text-xs">
                        <div className="flex items-center gap-2 text-[#0d5c4d] font-bold">
                          <FileText className="h-4 w-4" />
                          <span>{activeSubmission.fileAttachmentName}</span>
                        </div>
                        <Button variant="outline" size="sm" className="h-7 text-xs text-[#0d5c4d] border-[#c4e9e0] hover:bg-[#ecf8f5]">
                          <Eye className="h-3.5 w-3.5 mr-1" /> View PDF
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Teacher Marks Entry & Written Feedback */}
                  <div className="space-y-4 pt-4 border-t border-[#e6ece8]">
                    <div className="flex items-center gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Enter Marks (out of {activeSubmission.maxMarks}):
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={0}
                            max={activeSubmission.maxMarks}
                            value={marksInput}
                            onChange={(e) => setMarksInput(Number(e.target.value))}
                            className="w-28 h-10 px-3 rounded-xl bg-[#f8faf9] border border-slate-300 text-slate-900 font-mono font-bold text-lg focus:outline-none focus:border-[#0d5c4d]"
                          />
                          <span className="text-xs font-bold text-slate-500">
                            / {activeSubmission.maxMarks} (
                            {Math.round((Number(marksInput) / activeSubmission.maxMarks) * 100)}%)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        {t.academic.teacherFeedback}
                      </label>
                      <textarea
                        rows={3}
                        value={feedbackInput}
                        onChange={(e) => setFeedbackInput(e.target.value)}
                        placeholder="Add personalized feedback, areas of improvement, and commendations..."
                        className="w-full p-3 rounded-xl bg-[#f8faf9] border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0d5c4d]"
                      />
                    </div>

                    {/* Actions: Save Draft vs Release Results */}
                    <div className="flex flex-wrap items-center justify-end gap-3 pt-3">
                      <Button
                        variant="outline"
                        onClick={() => handleSaveGrade(false)}
                        className="text-xs font-bold border-slate-300 hover:bg-slate-50"
                      >
                        Save Marks as Draft
                      </Button>
                      <Button
                        onClick={() => handleSaveGrade(true)}
                        className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold gap-2 text-xs shadow-sm"
                      >
                        <Send className="h-4 w-4" />
                        {t.academic.releaseResults}
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="p-12 text-center bg-white border border-[#e6ece8] rounded-2xl text-xs text-slate-500">
                  Select a submission from the list on the left to grade.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Course Assignments Manager (Section 6.3) */}
      {activeTab === "assignments" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-[#0d2b26] flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#0d5c4d]" />
                Course Assignments Manager (Section 6.3)
              </h2>
              <p className="text-xs text-slate-500">
                Track homework tasks, deadline compliance, and launch grading sessions.
              </p>
            </div>

            <Button
              onClick={() => setIsCreateAsgModalOpen(true)}
              className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold gap-1.5 text-xs shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" /> Create Assignment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map((asg) => {
              const submissionCount = submissions.filter((s) => s.assignmentId === asg.id).length;
              const pendingCount = submissions.filter(
                (s) => s.assignmentId === asg.id && s.status === "submitted"
              ).length;

              return (
                <Card key={asg.id} className="border-[#e6ece8] bg-white shadow-2xs hover:shadow-xs transition-shadow">
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px] font-bold text-[#0d5c4d] bg-[#ecf8f5] border-[#c4e9e0]">
                        {asg.topicName}
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono font-bold">
                        {asg.maxMarks} Marks
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-black text-[#0d2b26] mt-2">
                      {asg.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 space-y-4">
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {asg.instructions}
                    </p>

                    <div className="p-3 rounded-xl bg-[#f8faf9] border border-[#e6ece8] space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span>Submissions Progress</span>
                        <span>{submissionCount} / 35 Enrolled (80%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-[#0d5c4d] rounded-full" style={{ width: "80%" }}></div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span className="flex items-center gap-1 text-[#b47a16] font-bold">
                          <Clock className="h-3 w-3" /> Due: {asg.dueDate}
                        </span>
                        {pendingCount > 0 && (
                          <span className="text-[#b47a16] font-bold">
                            {pendingCount} Pending Review
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <Button
                        onClick={() => {
                          setAssignmentFilter(asg.id);
                          setActiveTab("grading");
                        }}
                        className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold text-xs gap-1.5 shadow-2xs"
                      >
                        <ClipboardCheck className="h-3.5 w-3.5" /> Review Submissions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Class Performance Analytics (Section 6.5) */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-base font-extrabold text-[#0d2b26] flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#0d5c4d]" />
              Class Performance Analytics (Section 6.5)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cohorts mark distributions conforming to Sri Lankan G.C.E A/L grading benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart Column (7 cols) */}
            <Card className="lg:col-span-7 border-[#e6ece8] bg-white shadow-2xs">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-sm font-black text-[#0d2b26]">
                  A/L Marks Grade Distribution (Grade 12 Physical Science)
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Breakdown of 40 enrolled candidates across benchmark bands.
                </p>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gradeDistribution}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f4f1" />
                      <XAxis dataKey="grade" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0d2b26",
                          borderColor: "#0d2b26",
                          color: "#fff",
                          borderRadius: "12px",
                          fontSize: "12px"
                        }}
                      />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#0d5c4d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Benchmark Summary (5 cols) */}
            <Card className="lg:col-span-5 border-[#e6ece8] bg-white shadow-2xs">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-sm font-black text-[#0d2b26]">
                  Faculty Benchmark Indicators
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="p-3.5 rounded-xl bg-[#ecf8f5] border border-[#c4e9e0] flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#0d5c4d] font-bold">Class Average</p>
                    <p className="text-xl font-black text-[#0d2b26] mt-0.5">82.4%</p>
                  </div>
                  <Badge variant="success">Above Target</Badge>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f8faf9] border border-[#e6ece8] flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-600 font-bold">On-Time Submission Rate</p>
                    <p className="text-xl font-black text-[#0d2b26] mt-0.5">94.3%</p>
                  </div>
                  <Badge variant="outline">On Track</Badge>
                </div>

                <div className="p-3.5 rounded-xl bg-[#fef7e6] border border-[#fde4af] flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#b47a16] font-bold">Students Needing Support</p>
                    <p className="text-xl font-black text-[#0d2b26] mt-0.5">2 Students</p>
                  </div>
                  <Badge variant="warning">Follow-up</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Roster Table */}
          <Card className="border-[#e6ece8] bg-white shadow-2xs">
            <CardHeader className="p-6 pb-3 border-b border-[#e6ece8]">
              <CardTitle className="text-sm font-black text-[#0d2b26]">
                Student Performance Roster
              </CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#f8faf9] text-slate-500 font-bold uppercase tracking-wider border-b border-[#e6ece8]">
                  <tr>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Index No</th>
                    <th className="py-3 px-4">Class</th>
                    <th className="py-3 px-4">Submitted</th>
                    <th className="py-3 px-4">Average</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6ece8]">
                  {studentRoster.map((st, i) => (
                    <tr key={i} className="hover:bg-[#fbfcfb]">
                      <td className="py-3 px-4 font-bold text-slate-900">{st.name}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{st.index}</td>
                      <td className="py-3 px-4 text-slate-600">{st.class}</td>
                      <td className="py-3 px-4 text-slate-600">{st.submitted} / 2</td>
                      <td className="py-3 px-4 font-mono font-bold text-[#0d5c4d]">{st.avg}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            st.status === "Distinction"
                              ? "success"
                              : st.status === "Merit"
                              ? "default"
                              : "warning"
                          }
                        >
                          {st.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Modal: Create Assignment */}
      <Modal
        isOpen={isCreateAsgModalOpen}
        onClose={() => setIsCreateAsgModalOpen(false)}
        title="Create New Assignment"
        description="Publish problem sets, lab guides, or questions to enrolled students."
      >
        <form onSubmit={handleCreateAssignmentSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Course
            </label>
            <select
              value={newCourseId}
              onChange={(e) => setNewCourseId(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-[#f8faf9] border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.className})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Assignment Title
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Differentiation Proofs Set 02"
              className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Topic Tag
              </label>
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Maximum Marks
              </label>
              <input
                type="number"
                value={newMaxMarks}
                onChange={(e) => setNewMaxMarks(Number(e.target.value))}
                className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Due Date & Time
            </label>
            <input
              type="text"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Instructions & Problem Description
            </label>
            <textarea
              rows={4}
              value={newInstructions}
              onChange={(e) => setNewInstructions(e.target.value)}
              placeholder="Detailed guidelines and formatting requirements..."
              className="w-full p-3 rounded-xl bg-[#f8faf9] border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateAsgModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold">
              Publish Assignment
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Create Lesson (Multi-Format: PDF, Slides, Video, Theory Notes) */}
      <Modal
        isOpen={isCreateLessonModalOpen}
        onClose={() => setIsCreateLessonModalOpen(false)}
        title="Add New Lesson to Syllabus"
        description="Upload coursework PDF documents, classroom presentation slides, or video lectures."
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleCreateLessonSubmit} className="space-y-4">
          {/* Target Course, Unit & Topic Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#f8faf9] p-3.5 rounded-2xl border border-[#e6ece8]">
            {/* Target Course */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0d2b26] mb-1">
                Target Course
              </label>
              <select
                value={lessonCourseId}
                onChange={(e) => {
                  setLessonCourseId(e.target.value);
                  const crs = courses.find((c) => c.id === e.target.value);
                  if (crs && crs.units[0]) {
                    setLessonUnitId(crs.units[0].id);
                    if (crs.units[0].topics[0]) {
                      setLessonTopicId(crs.units[0].topics[0].id);
                    }
                  }
                }}
                className="w-full h-9 px-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#0d5c4d]"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Unit / Module */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0d2b26] mb-1">
                Unit / Module
              </label>
              <select
                value={activeSelectedUnit?.id || ""}
                onChange={(e) => {
                  setLessonUnitId(e.target.value);
                  const u = currentUnits.find((unit) => unit.id === e.target.value);
                  if (u && u.topics[0]) {
                    setLessonTopicId(u.topics[0].id);
                  }
                }}
                className="w-full h-9 px-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#0d5c4d]"
              >
                {currentUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Syllabus Topic */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0d2b26] mb-1">
                Syllabus Topic
              </label>
              <select
                value={activeSelectedTopic?.id || ""}
                onChange={(e) => setLessonTopicId(e.target.value)}
                className="w-full h-9 px-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#0d5c4d]"
              >
                {currentTopics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Lesson Title & Brief Description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0d2b26] mb-1">
                Lesson Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="e.g. Lesson 4: Integration by Substitution"
                className="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d5c4d]/20 focus:border-[#0d5c4d]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0d2b26] mb-1">
                Short Description
              </label>
              <input
                type="text"
                value={lessonDescription}
                onChange={(e) => setLessonDescription(e.target.value)}
                placeholder="e.g. Theory notes, worked proofs, and revision problem sheet"
                className="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d5c4d]/20 focus:border-[#0d5c4d]"
              />
            </div>
          </div>

          {/* Delivery Format Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0d2b26] mb-1.5">
              Select Lesson Delivery Format:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setLessonContentType("pdf")}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  lessonContentType === "pdf"
                    ? "bg-[#ecf8f5] border-[#0d5c4d] shadow-2xs ring-1 ring-[#0d5c4d]"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="h-8 w-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                    <FileText className="h-4 w-4" />
                  </div>
                  {lessonContentType === "pdf" && (
                    <span className="h-2 w-2 rounded-full bg-[#0d5c4d]" />
                  )}
                </div>
                <div>
                  <p className="font-extrabold text-xs text-[#0d2b26]">PDF Document</p>
                  <p className="text-[10px] text-slate-500">Worksheet / Notes</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLessonContentType("slides")}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  lessonContentType === "slides"
                    ? "bg-[#ecf8f5] border-[#0d5c4d] shadow-2xs ring-1 ring-[#0d5c4d]"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Presentation className="h-4 w-4" />
                  </div>
                  {lessonContentType === "slides" && (
                    <span className="h-2 w-2 rounded-full bg-[#0d5c4d]" />
                  )}
                </div>
                <div>
                  <p className="font-extrabold text-xs text-[#0d2b26]">Presentation Slides</p>
                  <p className="text-[10px] text-slate-500">PPTX / Slide Deck</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLessonContentType("video")}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  lessonContentType === "video"
                    ? "bg-[#ecf8f5] border-[#0d5c4d] shadow-2xs ring-1 ring-[#0d5c4d]"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Video className="h-4 w-4" />
                  </div>
                  {lessonContentType === "video" && (
                    <span className="h-2 w-2 rounded-full bg-[#0d5c4d]" />
                  )}
                </div>
                <div>
                  <p className="font-extrabold text-xs text-[#0d2b26]">Video Lecture</p>
                  <p className="text-[10px] text-slate-500">Recording / URL</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLessonContentType("rich_text")}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  lessonContentType === "rich_text"
                    ? "bg-[#ecf8f5] border-[#0d5c4d] shadow-2xs ring-1 ring-[#0d5c4d]"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <Layers className="h-4 w-4" />
                  </div>
                  {lessonContentType === "rich_text" && (
                    <span className="h-2 w-2 rounded-full bg-[#0d5c4d]" />
                  )}
                </div>
                <div>
                  <p className="font-extrabold text-xs text-[#0d2b26]">Theory Notes</p>
                  <p className="text-[10px] text-slate-500">Rich Text &amp; Math</p>
                </div>
              </button>
            </div>
          </div>

          {/* Dynamic Content Panel by Format */}
          {lessonContentType === "pdf" && (
            <div className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e6ece8] space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0d2b26]">
                Upload Coursework PDF File:
              </label>

              {uploadedMainFile ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#0d2b26]">{uploadedMainFile.name}</p>
                      <p className="text-[10px] text-emerald-600 font-semibold">
                        {uploadedMainFile.size} • Ready for classroom distribution
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedMainFile(null)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#c4e9e0] hover:border-[#0d5c4d] bg-white rounded-2xl cursor-pointer transition-colors group">
                  <UploadCloud className="h-8 w-8 text-[#0d5c4d] group-hover:scale-110 transition-transform mb-2" />
                  <p className="text-xs font-bold text-[#0d2b26]">
                    Click to browse or drag &amp; drop PDF document
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Supports .pdf textbooks, worksheets, and lecture summaries (up to 50MB)
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleMainFileUpload}
                    className="hidden"
                  />
                </label>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Optional Document Study Notes &amp; Highlights:
                </label>
                <textarea
                  rows={2}
                  value={lessonBody}
                  onChange={(e) => setLessonBody(e.target.value)}
                  placeholder="Outline key learning outcomes, pages to focus on, or homework exercise numbers..."
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
                />
              </div>
            </div>
          )}

          {lessonContentType === "slides" && (
            <div className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e6ece8] space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0d2b26]">
                  Upload Presentation Slide Deck:
                </label>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
                  <span>Number of Slides:</span>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={lessonSlidesCount}
                    onChange={(e) => setLessonSlidesCount(Number(e.target.value))}
                    className="w-16 h-7 px-2 text-center rounded-lg border border-slate-300 text-xs font-bold focus:border-[#0d5c4d]"
                  />
                </div>
              </div>

              {uploadedMainFile ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                      <Presentation className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#0d2b26]">{uploadedMainFile.name}</p>
                      <p className="text-[10px] text-emerald-600 font-semibold">
                        {uploadedMainFile.size} • {lessonSlidesCount} Interactive Slides Loaded
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedMainFile(null)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#c4e9e0] hover:border-[#0d5c4d] bg-white rounded-2xl cursor-pointer transition-colors group">
                  <Presentation className="h-8 w-8 text-purple-600 group-hover:scale-110 transition-transform mb-2" />
                  <p className="text-xs font-bold text-[#0d2b26]">
                    Click to browse or drag &amp; drop Presentation Slides
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Supports Microsoft PowerPoint (.pptx, .ppt) and PDF slide decks
                  </p>
                  <input
                    type="file"
                    accept=".pptx,.ppt,.pdf"
                    onChange={handleMainFileUpload}
                    className="hidden"
                  />
                </label>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Slide Deck Summary &amp; Speaker Points:
                </label>
                <textarea
                  rows={2}
                  value={lessonBody}
                  onChange={(e) => setLessonBody(e.target.value)}
                  placeholder="Key slide takeaways, diagrams breakdown, and topics covered..."
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
                />
              </div>
            </div>
          )}

          {lessonContentType === "video" && (
            <div className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e6ece8] space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0d2b26]">
                  Video Lecture Source:
                </label>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
                  <span>Class Duration:</span>
                  <input
                    type="text"
                    value={lessonVideoDuration}
                    onChange={(e) => setLessonVideoDuration(e.target.value)}
                    placeholder="e.g. 45 mins"
                    className="w-24 h-7 px-2 text-center rounded-lg border border-slate-300 text-xs font-bold focus:border-[#0d5c4d]"
                  />
                </div>
              </div>

              {/* Video URL Input */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                  <Link2 className="h-3 w-3 text-[#0d5c4d]" />
                  Paste Online Video URL (YouTube, Vimeo, Google Drive, or Google Meet recording):
                </label>
                <input
                  type="url"
                  value={lessonVideoUrl}
                  onChange={(e) => setLessonVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or https://meet.google.com/xyz-record"
                  className="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
                />
              </div>

              <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                — OR UPLOAD LOCAL VIDEO RECORDING —
              </div>

              {uploadedMainFile ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Film className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#0d2b26]">{uploadedMainFile.name}</p>
                      <p className="text-[10px] text-emerald-600 font-semibold">
                        {uploadedMainFile.size} • Video uploaded &amp; ready to stream
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedMainFile(null)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#c4e9e0] hover:border-[#0d5c4d] bg-white rounded-2xl cursor-pointer transition-colors group">
                  <Video className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform mb-1" />
                  <p className="text-xs font-bold text-[#0d2b26]">
                    Click to browse or drop video file (.mp4, .webm, .mov)
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleMainFileUpload}
                    className="hidden"
                  />
                </label>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Video Description &amp; Lecture Chapters:
                </label>
                <textarea
                  rows={2}
                  value={lessonBody}
                  onChange={(e) => setLessonBody(e.target.value)}
                  placeholder="Classroom agenda, timestamp chapters, and key problem proofs covered in the recording..."
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
                />
              </div>
            </div>
          )}

          {lessonContentType === "rich_text" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0d2b26] mb-1">
                Lesson Content Body / Theory Notes
              </label>
              <textarea
                rows={5}
                value={lessonBody}
                onChange={(e) => setLessonBody(e.target.value)}
                placeholder="Enter comprehensive lecture text, key equations, derivations, and worked examples..."
                className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
              />
            </div>
          )}

          {/* Supplementary Attachments Bar */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0d2b26] flex items-center gap-1.5">
                <Paperclip className="h-3.5 w-3.5 text-[#0d5c4d]" />
                <span>Attach Supplementary Materials (Worksheets / Past Papers / PDFs):</span>
              </label>
              <label className="px-3 py-1 rounded-lg bg-[#ecf8f5] hover:bg-[#d6f2ea] text-[#0d5c4d] text-xs font-bold cursor-pointer transition-colors flex items-center gap-1">
                <Plus className="h-3.5 w-3.5" />
                <span>Add File</span>
                <input
                  type="file"
                  onChange={handleSupplementaryFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {supplementaryFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {supplementaryFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f8faf9] border border-slate-200 text-xs"
                  >
                    <FileText className="h-3.5 w-3.5 text-[#0d5c4d]" />
                    <span className="font-semibold text-slate-800">{file.name}</span>
                    <span className="text-[10px] text-slate-400">({file.size})</span>
                    <button
                      type="button"
                      onClick={() => removeSupplementaryFile(idx)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateLessonModalOpen(false)}
              className="rounded-xl border-slate-300 font-bold text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold text-xs rounded-xl shadow-xs gap-1.5"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Add to Syllabus</span>
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Create Announcement (Section 6.6) */}
      <Modal
        isOpen={isCreateAnnouncementModalOpen}
        onClose={() => setIsCreateAnnouncementModalOpen(false)}
        title="Publish Official Announcement"
        description="Broadcast circulars, notices, and examination schedules to students."
      >
        <form onSubmit={handleCreateAnnouncementSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Notice Title
            </label>
            <input
              type="text"
              required
              value={annTitle}
              onChange={(e) => setAnnTitle(e.target.value)}
              placeholder="e.g. Term 2 Practical Examination Guidelines"
              className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Target Audience
              </label>
              <select
                value={annAudience}
                onChange={(e) => setAnnAudience(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#f8faf9] border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
              >
                <option value="12-Physical Science Students">12-Physical Science Students</option>
                <option value="All Grade 12 Students">All Grade 12 Students</option>
                <option value="Cricket Squad Members">Cricket Squad Members</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Priority
              </label>
              <select
                value={annPriority}
                onChange={(e) => setAnnPriority(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl bg-[#f8faf9] border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
              >
                <option value="normal">Standard Notice</option>
                <option value="high">High Priority / Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Message Content
            </label>
            <textarea
              rows={4}
              required
              value={annMessage}
              onChange={(e) => setAnnMessage(e.target.value)}
              placeholder="Enter full announcement details, deadlines, and room allocations..."
              className="w-full p-3 rounded-xl bg-[#f8faf9] border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateAnnouncementModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold">
              Dispatch Announcement
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
