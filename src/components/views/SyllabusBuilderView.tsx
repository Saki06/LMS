"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Layers,
  BookOpen,
  Plus,
  FolderPlus,
  FilePlus,
  ChevronDown,
  ChevronRight,
  FileText,
  FileUp,
  Presentation,
  Video,
  Trash2,
  CheckCircle2,
  Calendar,
  Sparkles,
  Search,
  ExternalLink,
  UploadCloud,
  X,
  Link2,
  Paperclip
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Course, SyllabusUnit, Topic, Lesson } from "@/types/lms";

export function SyllabusBuilderView() {
  const {
    courses,
    selectedCourseId,
    setSelectedCourseId,
    createUnit,
    createTopic,
    deleteUnit,
    deleteTopic,
    createLesson,
    currentUser
  } = useApp();

  const [activeCourseId, setActiveCourseId] = useState<string>(
    selectedCourseId || courses[0]?.id || "crs_math_12"
  );

  const activeCourse = courses.find((c) => c.id === activeCourseId) || courses[0];

  // Accordion state for expanded units
  const [expandedUnitIds, setExpandedUnitIds] = useState<Record<string, boolean>>({
    [activeCourse?.units[0]?.id || ""]: true
  });

  const toggleUnit = (unitId: string) => {
    setExpandedUnitIds((prev) => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  // Modals state
  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);
  const [newUnitTitle, setNewUnitTitle] = useState("");

  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  const [targetUnitIdForTopic, setTargetUnitIdForTopic] = useState("");
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicDesc, setNewTopicDesc] = useState("");

  // Add Lesson Modal state
  const [isCreateLessonModalOpen, setIsCreateLessonModalOpen] = useState(false);
  const [lessonTargetUnitId, setLessonTargetUnitId] = useState("");
  const [lessonTargetTopicId, setLessonTargetTopicId] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonContentType, setLessonContentType] = useState<"pdf" | "slides" | "video" | "rich_text">("pdf");
  const [lessonBody, setLessonBody] = useState("");
  const [lessonVideoUrl, setLessonVideoUrl] = useState("");
  const [lessonVideoDuration, setLessonVideoDuration] = useState("45 mins");
  const [lessonSlidesCount, setLessonSlidesCount] = useState<number>(10);
  const [uploadedMainFile, setUploadedMainFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [supplementaryFiles, setSupplementaryFiles] = useState<{ name: string; size: string; type: string }[]>([]);

  // Synchronize target units and topics for Add Lesson modal
  const modalUnits = activeCourse?.units || [];
  const modalActiveUnit = modalUnits.find((u) => u.id === lessonTargetUnitId) || modalUnits[0];
  const modalTopics = modalActiveUnit?.topics || [];
  const modalActiveTopic = modalTopics.find((t) => t.id === lessonTargetTopicId) || modalTopics[0];

  const handleCreateUnitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnitTitle.trim() || !activeCourse) return;
    const createdId = createUnit(activeCourse.id, newUnitTitle.trim());
    setExpandedUnitIds((prev) => ({ ...prev, [createdId]: true }));
    setIsAddUnitModalOpen(false);
    setNewUnitTitle("");
  };

  const handleCreateTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !activeCourse || !targetUnitIdForTopic) return;
    createTopic(activeCourse.id, targetUnitIdForTopic, newTopicTitle.trim(), newTopicDesc.trim());
    setIsAddTopicModalOpen(false);
    setNewTopicTitle("");
    setNewTopicDesc("");
  };

  const handleOpenAddLesson = (unitId?: string, topicId?: string) => {
    if (unitId) setLessonTargetUnitId(unitId);
    else if (modalUnits[0]) setLessonTargetUnitId(modalUnits[0].id);

    if (topicId) setLessonTargetTopicId(topicId);
    else if (modalUnits[0]?.topics[0]) setLessonTargetTopicId(modalUnits[0].topics[0].id);

    setLessonTitle("");
    setLessonDescription("");
    setLessonBody("");
    setUploadedMainFile(null);
    setSupplementaryFiles([]);
    setIsCreateLessonModalOpen(true);
  };

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
    const files = e.target.files;
    if (files && files.length > 0) {
      const newItems: { name: string; size: string; type: string }[] = [];
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        newItems.push({
          name: f.name,
          size: (f.size / (1024 * 1024)).toFixed(1) + " MB",
          type: f.name.split(".").pop()?.toUpperCase() || "FILE"
        });
      }
      setSupplementaryFiles((prev) => [...prev, ...newItems]);
    }
  };

  const handleCreateLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim() || !activeCourse) return;

    const unitId = modalActiveUnit?.id || activeCourse.units[0]?.id;
    const topicId = modalActiveTopic?.id || activeCourse.units[0]?.topics[0]?.id;

    if (!unitId || !topicId) return;

    const allAttachments = [...supplementaryFiles];
    if (uploadedMainFile) {
      allAttachments.unshift(uploadedMainFile);
    }

    let finalContentBody = lessonBody.trim();
    if (!finalContentBody) {
      if (lessonContentType === "pdf") {
        finalContentBody = `Official lecture document and study guide for ${lessonTitle}. Download or view the attached PDF for complete proofs and derivations.`;
      } else if (lessonContentType === "slides") {
        finalContentBody = `Classroom presentation slide deck containing ${lessonSlidesCount} instructional slides and topic summary points.`;
      } else if (lessonContentType === "video") {
        finalContentBody = `Recorded classroom lecture session (${lessonVideoDuration}) covering core theoretical applications and practical questions.`;
      } else {
        finalContentBody = "Lecture notes and worked examples prepared for the G.C.E. Advanced Level examination.";
      }
    }

    createLesson(activeCourse.id, unitId, topicId, {
      title: lessonTitle.trim(),
      description: lessonDescription.trim() || undefined,
      contentType: lessonContentType,
      contentBody: finalContentBody,
      videoUrl: lessonContentType === "video" ? lessonVideoUrl : undefined,
      slidesCount: lessonContentType === "slides" ? lessonSlidesCount : undefined,
      attachments: allAttachments
    });

    setIsCreateLessonModalOpen(false);
  };

  // Calculate metrics
  let totalTopicsCount = 0;
  activeCourse.units.forEach((u) => {
    totalTopicsCount += u.topics.length;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e6ece8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#0d5c4d]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0d5c4d]">
              Curriculum Architecture &bull; Faculty Tool
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#0d2b26] mt-1">Syllabus Builder</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize national curriculum units, define syllabus topics, and manage lesson delivery.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Target Course Switcher Dropdown */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#c4e9e0] shadow-2xs">
            <BookOpen className="h-4 w-4 text-[#0d5c4d]" />
            <select
              value={activeCourseId}
              onChange={(e) => {
                setActiveCourseId(e.target.value);
                setSelectedCourseId(e.target.value);
              }}
              className="bg-transparent text-xs font-bold text-[#0d2b26] focus:outline-none cursor-pointer"
            >
              {courses.map((crs) => (
                <option key={crs.id} value={crs.id}>
                  {crs.title} ({crs.code})
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={() => handleOpenAddLesson()}
            className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold gap-1.5 text-xs shadow-xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Add Lesson to Syllabus
          </Button>
        </div>
      </div>

      {/* Course Overview Banner */}
      <Card className="border-[#c4e9e0] bg-gradient-to-br from-[#f8fbf9] to-[#ecf8f5] shadow-2xs overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#0d5c4d] text-white font-mono font-bold text-xs">
                  {activeCourse.code}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  {activeCourse.gradeName} &bull; {activeCourse.className}
                </span>
              </div>
              <h2 className="text-xl font-black text-[#0d2b26]">
                {activeCourse.title}
              </h2>
              <p className="text-xs text-slate-600">
                Assigned Instructor: <span className="font-bold text-[#0d5c4d]">{activeCourse.teacherName}</span>
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-[#c4e9e0] pt-4 md:pt-0 md:pl-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Units</p>
                <p className="text-2xl font-black text-[#0d2b26] mt-0.5">{activeCourse.units.length}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Topics</p>
                <p className="text-2xl font-black text-[#0d2b26] mt-0.5">{totalTopicsCount}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Lessons</p>
                <p className="text-2xl font-black text-[#0d5c4d] mt-0.5">{activeCourse.totalLessons}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Units & Topics Architecture Tree */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#0d5c4d]" />
              Syllabus Structure &amp; Learning Modules ({activeCourse.units.length} Units)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any unit to expand its topics and uploaded coursework
            </p>
          </div>

          <Button
            onClick={() => setIsAddUnitModalOpen(true)}
            variant="outline"
            className="border-[#c4e9e0] text-[#0d5c4d] hover:bg-[#ecf8f5] font-bold text-xs shadow-2xs cursor-pointer shrink-0"
          >
            <FolderPlus className="h-3.5 w-3.5 mr-1.5" /> Add Unit / Module
          </Button>
        </div>

        {activeCourse.units.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-[#e6ece8] shadow-xs space-y-3">
            <Layers className="h-10 w-10 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-700">No Units in this Course Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Start building this subject syllabus by creating your first Unit / Module.
            </p>
            <Button
              onClick={() => setIsAddUnitModalOpen(true)}
              className="bg-[#0d5c4d] hover:bg-[#083e34] text-white text-xs font-bold"
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" /> Add First Unit
            </Button>
          </div>
        ) : (
          activeCourse.units.map((unit, unitIdx) => {
            const isExpanded = !!expandedUnitIds[unit.id];
            let unitLessonCount = 0;
            unit.topics.forEach((t) => (unitLessonCount += t.lessons.length));

            return (
              <div
                key={unit.id}
                className="rounded-2xl border border-[#e6ece8] bg-white shadow-2xs overflow-hidden transition-all hover:border-[#b2e5d9]"
              >
                {/* Unit Header Bar */}
                <div className="p-5 flex items-center justify-between gap-4 bg-[#fcfdfc] border-b border-[#e6ece8]">
                  <div
                    onClick={() => toggleUnit(unit.id)}
                    className="flex items-center gap-3.5 flex-1 cursor-pointer select-none"
                  >
                    <button className="h-7 w-7 rounded-lg bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center shrink-0">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                          Unit {unitIdx + 1}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {unit.topics.length} {unit.topics.length === 1 ? "Topic" : "Topics"} &bull; {unitLessonCount} Lessons
                        </span>
                      </div>
                      <h4 className="text-base font-black text-[#0d2b26] mt-0.5">
                        {unit.title}
                      </h4>
                    </div>
                  </div>

                  {/* Unit Action Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      onClick={() => {
                        setTargetUnitIdForTopic(unit.id);
                        setIsAddTopicModalOpen(true);
                      }}
                      variant="outline"
                      className="border-[#c4e9e0] text-[#0d5c4d] hover:bg-[#ecf8f5] text-xs font-bold gap-1 shadow-2xs cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Topic</span>
                    </Button>

                    <button
                      onClick={() => {
                        if (confirm(`Remove "${unit.title}" from syllabus?`)) {
                          deleteUnit(activeCourse.id, unit.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Unit"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Topics & Lessons Body */}
                {isExpanded && (
                  <div className="p-5 space-y-4 bg-white">
                    {unit.topics.length === 0 ? (
                      <div className="p-6 text-center rounded-xl bg-[#f8faf9] border border-dashed border-slate-200 text-xs text-slate-500">
                        No topics created in this unit yet.
                        <button
                          onClick={() => {
                            setTargetUnitIdForTopic(unit.id);
                            setIsAddTopicModalOpen(true);
                          }}
                          className="ml-2 font-bold text-[#0d5c4d] hover:underline cursor-pointer"
                        >
                          + Add first topic
                        </button>
                      </div>
                    ) : (
                      unit.topics.map((topic, topicIdx) => (
                        <div
                          key={topic.id}
                          className="rounded-xl border border-[#e6ece8] bg-[#f8faf9] p-4 space-y-3"
                        >
                          {/* Topic Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e6ece8] pb-2.5">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-[#0d5c4d] uppercase font-mono">
                                  Topic {unitIdx + 1}.{topicIdx + 1}
                                </span>
                                <span className="text-[11px] text-slate-400 font-mono">
                                  ({topic.lessons.length} {topic.lessons.length === 1 ? "lesson" : "lessons"})
                                </span>
                              </div>
                              <h5 className="text-sm font-bold text-[#0d2b26] mt-0.5">
                                {topic.title}
                              </h5>
                              {topic.description && (
                                <p className="text-xs text-slate-500 mt-0.5">
                                  {topic.description}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                              <Button
                                size="sm"
                                onClick={() => handleOpenAddLesson(unit.id, topic.id)}
                                className="bg-[#0d5c4d] hover:bg-[#083e34] text-white text-xs font-bold gap-1 shadow-2xs cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                                <span>Add Lesson</span>
                              </Button>

                              <button
                                onClick={() => {
                                  if (confirm(`Remove topic "${topic.title}"?`)) {
                                    deleteTopic(activeCourse.id, unit.id, topic.id);
                                  }
                                }}
                                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                                title="Delete Topic"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Lessons List inside this Topic */}
                          {topic.lessons.length === 0 ? (
                            <p className="text-xs text-slate-400 italic py-1">
                              No lessons uploaded under this topic yet. Click &ldquo;Add Lesson&rdquo; to attach PDF, video, slides, or theory.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                              {topic.lessons.map((lesson) => (
                                <div
                                  key={lesson.id}
                                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e2eae5] text-xs hover:border-[#b2e5d9] transition-all shadow-2xs"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="h-8 w-8 rounded-lg bg-[#ecf8f5] text-[#0d5c4d] flex items-center justify-center shrink-0">
                                      {lesson.contentType === "pdf" && <FileUp className="h-4 w-4 text-rose-500" />}
                                      {lesson.contentType === "slides" && <Presentation className="h-4 w-4 text-purple-600" />}
                                      {lesson.contentType === "video" && <Video className="h-4 w-4 text-blue-500" />}
                                      {(!lesson.contentType || lesson.contentType === "rich_text") && <FileText className="h-4 w-4 text-emerald-700" />}
                                    </div>
                                    <div className="min-w-0">
                                      <p className="font-bold text-slate-900 truncate">
                                        {lesson.title}
                                      </p>
                                      <p className="text-[10px] text-slate-400 capitalize">
                                        {lesson.contentType || "Theory Notes"} &bull; {lesson.attachments?.length || 0} attachments
                                      </p>
                                    </div>
                                  </div>

                                  <Badge
                                    variant="outline"
                                    className="uppercase font-mono font-bold text-[9px] bg-slate-50 text-slate-600 shrink-0 ml-2"
                                  >
                                    {lesson.contentType || "notes"}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal 1: Add Unit / Module */}
      <Modal
        isOpen={isAddUnitModalOpen}
        onClose={() => setIsAddUnitModalOpen(false)}
        title="Add Unit / Module to Syllabus"
        description={`Add a new major curriculum module to ${activeCourse.title}.`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateUnitSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Unit / Module Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newUnitTitle}
              onChange={(e) => setNewUnitTitle(e.target.value)}
              placeholder="e.g. Unit 3: Trigonometric Equations & Identities"
              className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddUnitModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold">
              Add Unit
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: Add Topic to Unit */}
      <Modal
        isOpen={isAddTopicModalOpen}
        onClose={() => setIsAddTopicModalOpen(false)}
        title="Add Syllabus Topic"
        description="Define a specific learning topic under this unit."
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateTopicSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Topic Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
              placeholder="e.g. Topic 3.1: Sine & Cosine Compound Angles"
              className="w-full h-10 px-3.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Topic Description / Focus (Optional)
            </label>
            <textarea
              rows={2}
              value={newTopicDesc}
              onChange={(e) => setNewTopicDesc(e.target.value)}
              placeholder="Key concepts, proofs, and application domains..."
              className="w-full p-2.5 rounded-xl bg-[#f8faf9] border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0d5c4d]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddTopicModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold">
              Create Topic
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal 3: Add Lesson Modal (Multi-Format Support) */}
      <Modal
        isOpen={isCreateLessonModalOpen}
        onClose={() => setIsCreateLessonModalOpen(false)}
        title="Add New Lesson to Syllabus"
        description="Upload coursework PDF documents, classroom presentation slides, or video lectures."
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleCreateLessonSubmit} className="space-y-4">
          {/* Target Unit & Topic Hierarchy Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#f8faf9] p-3.5 rounded-2xl border border-[#e6ece8]">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0d2b26] mb-1">
                Target Unit / Module
              </label>
              <select
                value={modalActiveUnit?.id || ""}
                onChange={(e) => {
                  setLessonTargetUnitId(e.target.value);
                  const u = modalUnits.find((unit) => unit.id === e.target.value);
                  if (u && u.topics[0]) {
                    setLessonTargetTopicId(u.topics[0].id);
                  }
                }}
                className="w-full h-9 px-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#0d5c4d]"
              >
                {modalUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0d2b26] mb-1">
                Syllabus Topic
              </label>
              <select
                value={modalActiveTopic?.id || ""}
                onChange={(e) => setLessonTargetTopicId(e.target.value)}
                className="w-full h-9 px-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#0d5c4d]"
              >
                {modalTopics.map((t) => (
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

          {/* Dynamic Content Upload Section */}
          {lessonContentType === "pdf" && (
            <div className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e6ece8] space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0d2b26]">
                Upload Coursework PDF File:
              </label>

              {uploadedMainFile ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#c4e9e0] text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                      <FileUp className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{uploadedMainFile.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{uploadedMainFile.size}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedMainFile(null)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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
                    max={100}
                    value={lessonSlidesCount}
                    onChange={(e) => setLessonSlidesCount(parseInt(e.target.value) || 1)}
                    className="w-16 h-7 px-2 text-center rounded-lg border border-slate-300 text-xs font-bold focus:border-[#0d5c4d]"
                  />
                </div>
              </div>

              {uploadedMainFile ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#c4e9e0] text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                      <Presentation className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{uploadedMainFile.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{uploadedMainFile.size}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedMainFile(null)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#c4e9e0] hover:border-[#0d5c4d] bg-white rounded-2xl cursor-pointer transition-colors group">
                  <UploadCloud className="h-8 w-8 text-[#0d5c4d] group-hover:scale-110 transition-transform mb-2" />
                  <p className="text-xs font-bold text-[#0d2b26]">
                    Click to browse or drop PowerPoint / PDF slides (.pptx, .ppt, .pdf)
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
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#c4e9e0] text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Video className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{uploadedMainFile.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{uploadedMainFile.size}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedMainFile(null)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#c4e9e0] hover:border-[#0d5c4d] bg-white rounded-2xl cursor-pointer transition-colors group">
                  <Video className="h-8 w-8 text-[#0d5c4d] group-hover:scale-110 transition-transform mb-2" />
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
            </div>
          )}

          {lessonContentType === "rich_text" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0d2b26] mb-1">
                Theory Notes &amp; Derivations:
              </label>
              <textarea
                rows={5}
                required
                value={lessonBody}
                onChange={(e) => setLessonBody(e.target.value)}
                placeholder="Enter comprehensive lecture text, key equations, and worked examples..."
                className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d5c4d]/20 focus:border-[#0d5c4d]"
              />
            </div>
          )}

          {/* Supplementary Attachments Bar */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#0d2b26] flex items-center gap-1">
                <Paperclip className="h-3.5 w-3.5 text-[#0d5c4d]" />
                Attach Supplementary Resource Materials:
              </label>
              <label className="text-[11px] font-bold text-[#0d5c4d] hover:underline cursor-pointer">
                + Add Files
                <input
                  type="file"
                  multiple
                  onChange={handleSupplementaryFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {supplementaryFiles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {supplementaryFiles.map((file, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#ecf8f5] text-[#0d5c4d] border border-[#c4e9e0] text-xs font-semibold"
                  >
                    <FileText className="h-3 w-3" />
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setSupplementaryFiles((prev) => prev.filter((_, i) => i !== idx))
                      }
                      className="text-slate-400 hover:text-rose-600 ml-1 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateLessonModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#0d5c4d] hover:bg-[#083e34] text-white font-bold shadow-xs cursor-pointer"
            >
              Add to Syllabus
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
