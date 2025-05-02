import AdminLayout from '@/layouts/AdminLayout'
import AdminPadding from '@/layouts/AdminPadding'
import React, { useState, useEffect } from 'react'
import { Search, UserCheck, ChevronLeft, ChevronRight, Check, Grid, List, Users } from 'lucide-react'
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

  // Pagination state for members
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit, setLimit] = useState(20)

  // For marking attendance
  const [isMarking, setIsMarking] = useState(false)

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
  }, [eventId])

  // Handle member search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
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
              </div>

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
                        <Check size={18} />
                        <span>Mark Present</span>
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
                        <Check size={16} />
                        <span>Present</span>
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
                      {attendance.map((record) => (
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


// import AdminLayout from '@/layouts/AdminLayout'
// import AdminPadding from '@/layouts/AdminPadding'
// import React, { useState, useEffect } from 'react'
// import { Search, UserCheck, UserX, ChevronLeft, ChevronRight, Check, X } from 'lucide-react'
// // import { useParams, useRouter } from 'next/router' // Assuming you're using Next.js
// import { useNavigate, useParams } from "react-router-dom"

// // Import your API functions
// import { getMembers, markAttendance, getAttendance } from "@/services/api/apiEndpoints"

// const AttendanceMarking = () => {
//   const { eventId } = useParams()
//   console.log('.........................', eventId)
//   const navigate = useNavigate()

//   // State for members and attendance
//   const [members, setMembers] = useState([])
//   const [attendance, setAttendance] = useState([])
//   const [eventDetails, setEventDetails] = useState(null)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [isLoading, setIsLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState('mark') // 'mark' or 'details'

//   // Pagination state for members
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)
//   const [limit, setLimit] = useState(20)

//   // For marking attendance
//   const [isMarking, setIsMarking] = useState(false)

//   // Function to fetch members
//   const fetchMembers = async (page = 1) => {
//     setIsLoading(true)
//     try {
//       const response = await getMembers(page, limit)
//       if (response.success) {
//         setMembers(response.data)
//         setTotalPages(response.pagination.totalPages)
//         setCurrentPage(response.pagination.currentPage)
//       }
//     } catch (error) {
//       console.error('Error fetching members:', error)
//       alert('Failed to fetch members')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Function to fetch attendance for this event
//   const fetchAttendance = async () => {
//     setIsLoading(true)
//     try {
//       const response = await getAttendance(eventId)
//       console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbb', response)
//       if (response.success) {
//         setAttendance(response.data.attendance || [])
//         setEventDetails(response.data.event || null)
//       }
//     } catch (error) {
//       console.error('Error fetching attendance:', error)
//       alert('Failed to fetch attendance details')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Initial data fetching
//   useEffect(() => {
//     if (eventId) {
//       fetchAttendance()
//       fetchMembers()
//     }
//   }, [eventId])

//   // Handle member search
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value)
//   }

//   // Handle marking attendance
//   const handleMarkAttendance = async (memberId, status) => {
//     setIsMarking(true)
//     try {
//       const response = await markAttendance({
//         memberId,
//         status
//       }, eventId)

//       if (response.success) {
//         // Refresh attendance data after marking
//         fetchAttendance()
//         alert(`Member marked as ${status}`)
//       }
//     } catch (error) {
//       console.error('Error marking attendance:', error)
//     } finally {
//       setIsMarking(false)
//     }
//   }

//   // Handle pagination
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage)
//       fetchMembers(newPage)
//     }
//   }

//   // Filter members that are not already marked
//   const getFilteredMembers = () => {
//     // Get IDs of members who already have attendance marked
//     const markedMemberIds = attendance.map(record => record.member._id)

//     // Filter out members who already have attendance marked
//     const availableMembers = members.filter(member =>
//       !markedMemberIds.includes(member._id)
//     )

//     // Apply search filter if search query exists
//     if (searchQuery.trim() === '') {
//       return availableMembers
//     }

//     const lowercaseQuery = searchQuery.toLowerCase()
//     return availableMembers.filter(member =>
//       (member.firstname && member.firstname.toLowerCase().includes(lowercaseQuery)) ||
//       (member.lastname && member.lastname.toLowerCase().includes(lowercaseQuery))
//     )
//   }

//   const filteredMembers = getFilteredMembers()

//   return (
//     <AdminLayout>
//       <AdminPadding>
//         <div className="w-full space-y-6">
//           {/* Header with back button */}
//           <div className="flex items-center gap-4 mb-6">
//             <button
//               onClick={() => navigate(-1)}
//               className="p-2 rounded-full hover:bg-gray-100"
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <div>
//               <h1 className="text-2xl font-bold tracking-tight">
//                 {eventDetails ? eventDetails.name : 'Event Attendance'}
//               </h1>
//               {eventDetails && (
//                 <p className="text-gray-500">
//                   {new Date(eventDetails.date).toLocaleDateString('en-US', {
//                     weekday: 'long',
//                     month: 'long',
//                     day: 'numeric',
//                     year: 'numeric'
//                   })}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="flex border-b mb-6">
//             <button
//               className={`py-2 px-4 font-medium ${activeTab === 'mark'
//                 ? 'text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-500 hover:text-gray-700'}`}
//               onClick={() => setActiveTab('mark')}
//             >
//               Mark Attendance
//             </button>
//             <button
//               className={`py-2 px-4 font-medium ${activeTab === 'details'
//                 ? 'text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-500 hover:text-gray-700'}`}
//               onClick={() => setActiveTab('details')}
//             >
//               Attendance Details
//             </button>
//           </div>

//           {/* Mark Attendance Tab */}
//           {activeTab === 'mark' && (
//             <div>
//               {/* Search box */}
//               <div className="relative w-full mb-6">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <Search size={18} className="text-gray-400" />
//                 </div>
//                 <input
//                   type="search"
//                   className="w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg"
//                   placeholder="Search for members..."
//                   value={searchQuery}
//                   onChange={handleSearch}
//                 />
//               </div>

//               {/* Members list */}
//               <div className="bg-white rounded-lg border divide-y">
//                 {isLoading ? (
//                   <div className="p-4 text-center">Loading members...</div>
//                 ) : filteredMembers.length === 0 ? (
//                   <div className="p-4 text-center">
//                     {searchQuery ? 'No matching members found' : 'All members have been marked'}
//                   </div>
//                 ) : (
//                   filteredMembers.map(member => (
//                     <div key={member._id} className="p-4 flex items-center justify-between">
//                       <div>
//                         <h3 className="font-medium">
//                           {member.firstname} {member.lastname}
//                         </h3>
//                         {member.level && <p className="text-sm text-gray-500">{member.level}</p>}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           className="p-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200 flex items-center gap-1"
//                           onClick={() => handleMarkAttendance(member._id, 'present')}
//                           disabled={isMarking}
//                         >
//                           <Check size={16} />
//                           <span>Present</span>
//                         </button>
//                         <button
//                           className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 flex items-center gap-1"
//                           onClick={() => handleMarkAttendance(member._id, 'absent')}
//                           disabled={isMarking}
//                         >
//                           <X size={16} />
//                           <span>Absent</span>
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>

//               {/* Pagination controls */}
//               {totalPages > 1 && (
//                 <div className="flex items-center justify-center space-x-2 py-4 mt-4">
//                   <button
//                     className="p-1 rounded-md border border-gray-300 disabled:opacity-50"
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                   >
//                     <ChevronLeft size={16} />
//                   </button>
//                   <span className="text-sm">
//                     Page {currentPage} of {totalPages}
//                   </span>
//                   <button
//                     className="p-1 rounded-md border border-gray-300 disabled:opacity-50"
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                   >
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Attendance Details Tab */}
//           {activeTab === 'details' && (
//             <div>
//               <div className="flex justify-between mb-4">
//                 <h3 className="font-medium text-lg">
//                   Attendance Records ({attendance.length})
//                 </h3>
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-1">
//                     <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                     <span className="text-sm">Present</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                     <span className="text-sm">Absent</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Attendance records table */}
//               {isLoading ? (
//                 <div className="text-center p-4">Loading attendance records...</div>
//               ) : attendance.length === 0 ? (
//                 <div className="text-center p-4 border rounded-lg">No attendance records found</div>
//               ) : (
//                 <div className="overflow-x-auto rounded-lg border">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Member
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Status
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Time
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Marked By
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {attendance.map((record) => (
//                         <tr key={record._id}>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div>
//                               <div className="font-medium">
//                                 {record.member.firstname} {record.member.lastname}
//                               </div>
//                               {record.member.level && (
//                                 <div className="text-sm text-gray-500">{record.member.level}</div>
//                               )}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${record.status === 'present'
//                               ? 'bg-green-100 text-green-800'
//                               : 'bg-red-100 text-red-800'
//                               }`}>
//                               {record.status === 'present' ? (
//                                 <>
//                                   <UserCheck size={12} />
//                                   Present
//                                 </>
//                               ) : (
//                                 <>
//                                   <UserX size={12} />
//                                   Absent
//                                 </>
//                               )}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {new Date(record.timestamp).toLocaleTimeString('en-US', {
//                               hour: '2-digit',
//                               minute: '2-digit'
//                             })}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {record.markedBy ? (
//                               <span>
//                                 {record.markedBy.firstname} {record.markedBy.lastname}
//                               </span>
//                             ) : (
//                               <span>-</span>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </AdminPadding>
//     </AdminLayout>
//   )
// }

// export default AttendanceMarking