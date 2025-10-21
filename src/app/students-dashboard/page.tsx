"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string | null;
  level: string | null;
  track: string;
  institution: string;
  location: string | null;
  resume_url: string | null;
  skills: string | null;
  linkedin: string | null;
}

interface ApiResponse {
  status: number;
  message: string;
  data: {
    data: Student[];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextCursor: string | null;
    previousCursor: string | null;
  };
}

export default function StudentDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTrack, setFilterTrack] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const studentsPerPage = 10;

  const fetchAllStudents = async () => {
    setLoading(true);
    setError("");

    try {
      let allData: Student[] = [];
      let cursor: string | null = null;
      let hasMore = true;

      // Fetch all pages
      while (hasMore) {
        const url = cursor
          ? `https://tech-compass.onrender.com/student?cursor=${cursor}`
          : "https://tech-compass.onrender.com/student?limit=1000";

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch students");

        const data: ApiResponse = await res.json();
        allData = [...allData, ...data.data.data];

        hasMore = data.data.hasNextPage;
        cursor = data.data.nextCursor;
      }

      setAllStudents(allData);
      setStudents(allData);
    } catch (err) {
      setError("Failed to load students. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrack = filterTrack === "all" || student.track === filterTrack;
    return matchesSearch && matchesTrack;
  });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Institution",
      "Course",
      "Level",
      "Track",
      "Skills",
      "LinkedIn",
    ];
    const csvData = filteredStudents.map((s) => [
      s.name,
      s.email,
      s.phone,
      s.institution,
      s.course || "N/A",
      s.level || "N/A",
      s.track,
      s.skills || "",
      s.linkedin || "",
    ]);

    const csv = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `students_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const getTrackColor = (track: string) => {
    const colors: { [key: string]: string } = {
      "Software Engineering": "bg-blue-100 text-blue-800",
      "Cyber Security": "bg-red-100 text-red-800",
      "Machine Learning": "bg-purple-100 text-purple-800",
      "Product Design": "bg-green-100 text-green-800",
    };
    return colors[track] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Student Dashboard
              </h1>
              <p className="text-gray-600">
                Manage and view all registered students
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-blue-600">
                {allStudents.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Registered</div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              "Software Engineering",
              "Cyber Security",
              "Machine Learning",
              "Product Design",
            ].map((track) => {
              const count = allStudents.filter((s) => s.track === track).length;
              const percentage =
                allStudents.length > 0
                  ? ((count / allStudents.length) * 100).toFixed(1)
                  : 0;
              return (
                <div
                  key={track}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
                >
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {count}
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {track}
                  </div>
                  <div className="text-xs text-gray-500">
                    {percentage}% of total
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filters & Search */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="🔍 Search by name, email, or institution..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition"
                />
              </div>
              <select
                value={filterTrack}
                onChange={(e) => {
                  setFilterTrack(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition"
              >
                <option value="all">All Tracks ({allStudents.length})</option>
                <option value="Software Engineering">
                  Software Engineering (
                  {
                    allStudents.filter(
                      (s) => s.track === "Software Engineering"
                    ).length
                  }
                  )
                </option>
                <option value="Cyber Security">
                  Cyber Security (
                  {
                    allStudents.filter((s) => s.track === "Cyber Security")
                      .length
                  }
                  )
                </option>
                <option value="Machine Learning">
                  Machine Learning (
                  {
                    allStudents.filter((s) => s.track === "Machine Learning")
                      .length
                  }
                  )
                </option>
                <option value="Product Design">
                  Product Design (
                  {
                    allStudents.filter((s) => s.track === "Product Design")
                      .length
                  }
                  )
                </option>
              </select>
              <button
                onClick={exportToCSV}
                disabled={filteredStudents.length === 0}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>📥</span>
                Export CSV
              </button>
            </div>
            {filteredStudents.length > 0 && (
              <div className="mt-3 text-sm text-gray-600">
                Showing {filteredStudents.length} student
                {filteredStudents.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        </motion.div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Track
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Institution
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Skills
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      {searchTerm || filterTrack !== "all"
                        ? "No students found matching your filters"
                        : "No students registered yet"}
                    </td>
                  </tr>
                ) : (
                  currentStudents.map((student, index) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${getTrackColor(
                            student.track
                          )}`}
                        >
                          {student.track}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {student.institution}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {student.skills || (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredStudents.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold">{startIndex + 1}</span> to{" "}
                  <span className="font-semibold">
                    {Math.min(endIndex, filteredStudents.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold">
                    {filteredStudents.length}
                  </span>{" "}
                  students
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    ← Previous
                  </button>

                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (page) =>
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                      )
                      .map((page, idx, arr) => (
                        <div key={page} className="flex items-center">
                          {idx > 0 && arr[idx - 1] !== page - 1 && (
                            <span className="px-2 text-gray-400">...</span>
                          )}
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                              page === currentPage
                                ? "bg-blue-600 text-white"
                                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Student Detail Modal */}
        {selectedStudent && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Student Details
                  </h2>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${getTrackColor(
                      selectedStudent.track
                    )}`}
                  >
                    {selectedStudent.track}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-1">
                      Full Name
                    </label>
                    <p className="text-gray-900">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-1">
                      Phone
                    </label>
                    <p className="text-gray-900">{selectedStudent.phone}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">
                    Email
                  </label>
                  <p className="text-gray-900 break-all">
                    {selectedStudent.email}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">
                    Institution
                  </label>
                  <p className="text-gray-900">{selectedStudent.institution}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-1">
                      Course of Study
                    </label>
                    <p className="text-gray-900">
                      {selectedStudent.course || (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-1">
                      Level of Study
                    </label>
                    <p className="text-gray-900">
                      {selectedStudent.level || (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </p>
                  </div>
                </div>

                {selectedStudent.skills && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-1">
                      Skills
                    </label>
                    <p className="text-gray-900">{selectedStudent.skills}</p>
                  </div>
                )}

                {selectedStudent.linkedin && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-1">
                      LinkedIn Profile
                    </label>
                    <a
                      href={selectedStudent.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {selectedStudent.linkedin}
                    </a>
                  </div>
                )}

                {selectedStudent.resume_url && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-1">
                      Resume
                    </label>
                    <a
                      href={selectedStudent.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      📄 Download Resume
                    </a>
                  </div>
                )}

                {selectedStudent.location && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-1">
                      Location
                    </label>
                    <p className="text-gray-900">{selectedStudent.location}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
