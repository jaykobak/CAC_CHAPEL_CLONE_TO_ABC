import AdminLayout from '@/layouts/AdminLayout'
import AdminPadding from '@/layouts/AdminPadding'
import React, { useState, useEffect } from 'react'
import {
  Search, UserCheck, ChevronLeft, ChevronRight, Check,
  Grid, List, Users, X, Download, Filter, RefreshCw
} from 'lucide-react'
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from '@/hooks/use-toast'

// Import your API functions
import { getMembers, markAttendance, getAttendance } from "@/services/api/apiEndpoints"

const AttendanceMarking = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  // State for members and attendance
  const [members, setMembers] = useState([])
  const [attendance, setAttendance] = useState([])
  const [eventDetails, setEventDetails] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('mark') // 'mark' or 'details'
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [refreshKey, setRefreshKey] = useState(0) // Used to force re-fetch

  // Pagination state for members
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit, setLimit] = useState(20)

  // For marking attendance
  const [isMarking, setIsMarking] = useState(false)
  const [recentlyMarked, setRecentlyMarked] = useState([]) // Track recently marked members

  // Function to fetch members
  const fetchMembers = async (page = 1) => {
    setIsLoading(true)
    try {
      const response = await getMembers(page, limit)
      if (response.success) {
        setMembers(response.data)
        setTotalPages(response.pagination.totalPages)
        setCurrentPage(response.pagination.currentPage)
      }
    } catch (error) {
      console.error('Error fetching members:', error)
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to fetch members',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Function to fetch attendance for this event
  const fetchAttendance = async () => {
    setIsLoading(true)
    try {
      const response = await getAttendance(eventId)
      if (response.success) {
        setAttendance(response.data.attendance || [])
        setEventDetails(response.data.event || null)
      }
    } catch (error) {
      console.error('Error fetching attendance:', error)
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to fetch attendance details',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Initial data fetching
  useEffect(() => {
    if (eventId) {
      fetchAttendance()
      fetchMembers()
    }
  }, [eventId, refreshKey])

  // Handle member search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery('')
  }

  // Refresh data
  const refreshData = () => {
    setRefreshKey(prev => prev + 1)
  }

  // Handle marking attendance
  const handleMarkAttendance = async (memberId) => {
    setIsMarking(true)
    try {
      const response = await markAttendance({
        memberId,
        status: 'present'
      }, eventId)

      if (response.success) {
        // Add to recently marked list
        const markedMember = members.find(m => m._id === memberId)
        if (markedMember) {
          setRecentlyMarked(prev => [
            { ...markedMember, timestamp: new Date() },
            ...prev.slice(0, 4) // Keep only the 5 most recent
          ])
        }

        // Clear search after successful marking
        setSearchQuery('')

        // Refresh attendance data after marking
        fetchAttendance()

        toast({
          title: 'Success',
          description: 'Member marked as present',
          variant: 'success',
        })
      }
    } catch (error) {
      console.error('Error marking attendance:', error)
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to mark attendance',
        variant: 'destructive',
      })
    } finally {
      setIsMarking(false)
    }
  }

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      fetchMembers(newPage)
    }
  }

  // Filter members that are not already marked
  const getFilteredMembers = () => {
    // Get IDs of members who already have attendance marked
    const markedMemberIds = attendance.map(record => record.member._id)

    // Filter out members who already have attendance marked
    const availableMembers = members.filter(member =>
      !markedMemberIds.includes(member._id)
    )

    // Apply search filter if search query exists
    if (searchQuery.trim() === '') {
      return availableMembers
    }

    const lowercaseQuery = searchQuery.toLowerCase()
    return availableMembers.filter(member =>
      (member.firstname && member.firstname.toLowerCase().includes(lowercaseQuery)) ||
      (member.lastname && member.lastname.toLowerCase().includes(lowercaseQuery))
    )
  }

  const filteredMembers = getFilteredMembers()

  // Function to navigate to member profile
  const navigateToMemberProfile = (memberId) => {
    navigate(`/admin/members/${memberId}`)
  }

  // Function to toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid')
  }

  // Function to export attendance as CSV
  const exportAttendanceCSV = () => {
    if (attendance.length === 0) {
      toast({
        title: 'Export Failed',
        description: 'No attendance records to export',
        variant: 'destructive',
      })
      return
    }

    // Create CSV content
    const headers = ['Member Name', 'Status', 'Time', 'Marked By']
    const rows = attendance.map(record => [
      `${record.member.firstname} ${record.member.lastname}`,
      'Present',
      new Date(record.timestamp).toLocaleString(),
      record.markedBy ? `${record.markedBy.firstname} ${record.markedBy.lastname}` : '-'
    ])

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `${eventDetails ? eventDetails.name : 'Event'}_Attendance_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <AdminLayout>
      <AdminPadding>
        <div className="w-full space-y-6">
          {/* Header with back button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {eventDetails ? eventDetails.name : 'Event Attendance'}
                </h1>
                {eventDetails && (
                  <p className="text-gray-500">
                    {new Date(eventDetails.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={refreshData}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                title="Refresh data"
              >
                <RefreshCw size={18} />
              </button>

              {activeTab === 'details' && (
                <button
                  onClick={exportAttendanceCSV}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  title="Export as CSV"
                >
                  <Download size={18} />
                </button>
              )}

              {activeTab === 'mark' && (
                <div className="flex items-center bg-gray-100 rounded-md p-1">
                  <button
                    className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid view"
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List view"
                  >
                    <List size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              className={`py-2 px-4 font-medium transition-colors ${activeTab === 'mark'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('mark')}
            >
              <div className="flex items-center gap-2">
                <Check size={18} />
                Mark Attendance
              </div>
            </button>
            <button
              className={`py-2 px-4 font-medium transition-colors ${activeTab === 'details'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('details')}
            >
              <div className="flex items-center gap-2">
                <Users size={18} />
                Attendance Details
              </div>
            </button>
          </div>

          {/* Mark Attendance Tab */}
          {activeTab === 'mark' && (
            <div>
              {/* Search box */}
              <div className="relative w-full mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="search"
                  className="w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Search for members..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                {searchQuery && (
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={clearSearch}
                  >
                    <X size={18} className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Recently marked section */}
              {recentlyMarked.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-2">Recently Marked</h3>
                  <div className="flex flex-wrap gap-2">
                    {recentlyMarked.map((member, idx) => (
                      <div
                        key={`${member._id}-${idx}`}
                        className="bg-green-50 text-green-700 text-sm py-1 px-3 rounded-full flex items-center gap-1"
                      >
                        <Check size={14} />
                        <span>{member.firstname} {member.lastname}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Members list/grid */}
              {isLoading ? (
                <div className="p-8 text-center bg-white rounded-lg border">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p>Loading members...</p>
                </div>
              ) : filteredMembers.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-lg border">
                  <Users size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">
                    {searchQuery ? 'No matching members found' : 'All members have been marked'}
                  </p>
                  {searchQuery && (
                    <button
                      className="mt-4 text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={clearSearch}
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : viewMode === 'grid' ? (
                /* Grid view */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMembers.map(member => (
                    <div
                      key={member._id}
                      className="bg-white rounded-lg border hover:shadow-md transition-shadow overflow-hidden"
                    >
                      <div
                        className="p-4 cursor-pointer"
                        onClick={() => navigateToMemberProfile(member._id)}
                      >
                        <div className="flex justify-center mb-3">
                          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-semibold">
                            {member.firstname?.[0]}{member.lastname?.[0]}
                          </div>
                        </div>
                        <h3 className="font-medium text-center mb-1">
                          {member.firstname} {member.lastname}
                        </h3>
                        {member.level && <p className="text-sm text-gray-500 text-center">{member.level}</p>}
                      </div>
                      <button
                        className="w-full p-3 bg-green-500 text-white hover:bg-green-600 flex items-center justify-center gap-2 transition-colors"
                        onClick={() => handleMarkAttendance(member._id)}
                        disabled={isMarking}
                      >
                        {isMarking ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Marking...</span>
                          </div>
                        ) : (
                          <>
                            <Check size={18} />
                            <span>Mark Present</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                /* List view */
                <div className="bg-white rounded-lg border divide-y">
                  {filteredMembers.map(member => (
                    <div key={member._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div
                        className="flex items-center gap-3 cursor-pointer flex-grow"
                        onClick={() => navigateToMemberProfile(member._id)}
                      >
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                          {member.firstname?.[0]}{member.lastname?.[0]}
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {member.firstname} {member.lastname}
                          </h3>
                          {member.level && <p className="text-sm text-gray-500">{member.level}</p>}
                        </div>
                      </div>
                      <button
                        className="p-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200 flex items-center gap-1 transition-colors"
                        onClick={() => handleMarkAttendance(member._id)}
                        disabled={isMarking}
                      >
                        {isMarking ? (
                          <div className="flex items-center gap-1">
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-600"></div>
                            <span>Marking...</span>
                          </div>
                        ) : (
                          <>
                            <Check size={16} />
                            <span>Present</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 py-4 mt-6">
                  <button
                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Attendance Details Tab */}
          {activeTab === 'details' && (
            <div>
              <div className="flex justify-between mb-4">
                <h3 className="font-medium text-lg">
                  Attendance Records ({attendance.length})
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Present</span>
                  </div>
                </div>
              </div>

              {/* Search for details tab */}
              <div className="relative w-full mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="search"
                  className="w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Search in attendance records..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                {searchQuery && (
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={clearSearch}
                  >
                    <X size={18} className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Attendance records table */}
              {isLoading ? (
                <div className="text-center p-8 bg-white rounded-lg border">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p>Loading attendance records...</p>
                </div>
              ) : attendance.length === 0 ? (
                <div className="text-center p-8 bg-white rounded-lg border">
                  <UserCheck size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">No attendance records found</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Member
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Marked By
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {attendance
                        .filter(record => {
                          if (!searchQuery) return true;
                          const query = searchQuery.toLowerCase();
                          return (
                            (record.member.firstname && record.member.firstname.toLowerCase().includes(query)) ||
                            (record.member.lastname && record.member.lastname.toLowerCase().includes(query))
                          );
                        })
                        .map((record) => (
                          <tr key={record._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div
                                className="flex items-center cursor-pointer"
                                onClick={() => navigateToMemberProfile(record.member._id)}
                              >
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-3">
                                  {record.member.firstname?.[0]}{record.member.lastname?.[0]}
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {record.member.firstname} {record.member.lastname}
                                  </div>
                                  {record.member.level && (
                                    <div className="text-sm text-gray-500">{record.member.level}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <UserCheck size={12} />
                                Present
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(record.timestamp).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.markedBy ? (
                                <span>
                                  {record.markedBy.firstname} {record.markedBy.lastname}
                                </span>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </AdminPadding>
    </AdminLayout>
  )
}

export default AttendanceMarking