import React, { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import AdminPadding from '@/layouts/AdminPadding';
import { Search, BookOpen, Users, Calendar, ArrowRight, RefreshCw, History, Check, X } from 'lucide-react';
import { searchMember, searchBooks, borrowBook, returnBook, borrowHistory } from '@/services/api/apiEndpoints';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
// import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminBorrowBookPage = () => {
    // States
    const [activeTab, setActiveTab] = useState('borrow');
    const [memberQuery, setMemberQuery] = useState('');
    const [bookQuery, setBookQuery] = useState('');
    const [members, setMembers] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [borrowings, setBorrowings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Fetch borrowing history
    const fetchBorrowingHistory = async () => {
        try {
            setLoading(true);
            const response = await borrowHistory();
            setBorrowings(response.data);
            setLoading(false);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to fetch borrowing history' });
            setLoading(false);
        }
    };

    // Search for members
    const handleMemberSearch = async () => {
        if (memberQuery.length < 3) {
            setMessage({ type: 'error', text: 'Please provide at least 3 characters for search' });
            return;
        }

        try {
            setLoading(true);
            const response = await searchMember(`?query=${memberQuery}`);
            setMembers(response.data);
            setLoading(false);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to search members' });
            setLoading(false);
        }
    };

    // Search for books
    const handleBookSearch = async () => {
        if (bookQuery.length < 3) {
            setMessage({ type: 'error', text: 'Please provide at least 3 characters for search' });
            return;
        }

        try {
            setLoading(true);
            const response = await searchBooks(`?query=${bookQuery}`);
            setBooks(response.data);
            setLoading(false);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to search books' });
            setLoading(false);
        }
    };

    // Handle book borrowing
    const handleBorrowBook = async () => {
        if (!selectedMember || !selectedBook) {
            setMessage({ type: 'error', text: 'Please select both a member and a book' });
            return;
        }

        try {
            setLoading(true);
            const response = await borrowBook({
                memberId: selectedMember._id,
                bookId: selectedBook._id
            });

            setMessage({
                type: 'success',
                text: `Book "${selectedBook.title}" borrowed successfully by ${selectedMember.firstname} ${selectedMember.lastname}`
            });

            // Reset selections
            setSelectedMember(null);
            setSelectedBook(null);
            setLoading(false);

            // Refresh borrowing history
            fetchBorrowingHistory();
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to borrow book' });
            setLoading(false);
        }
    };

    // Handle book return
    const handleReturnBook = async (borrowingId) => {
        try {
            setLoading(true);
            const response = await returnBook({ borrowingId });

            setMessage({
                type: 'success',
                text: 'Book returned successfully'
            });

            setLoading(false);

            // Refresh borrowing history
            fetchBorrowingHistory();
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to return book' });
            setLoading(false);
        }
    };

    // Load borrowing history when component mounts or tab changes
    useEffect(() => {
        if (activeTab === 'history') {
            fetchBorrowingHistory();
        }
    }, [activeTab]);

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AdminLayout>
            <AdminPadding>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Book Management</h1>
                    </div>

                    {/* {message.text && (
                        <Alert className={message.type === 'error' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}>
                            <AlertDescription className={message.type === 'error' ? 'text-red-600' : 'text-green-600'}>
                                {message.text}
                            </AlertDescription>
                        </Alert>
                    )} */}

                    <Tabs defaultValue="borrow" value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="borrow" className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4" /> Borrow Book
                            </TabsTrigger>
                            <TabsTrigger value="return" className="flex items-center gap-2">
                                <RefreshCw className="w-4 h-4" /> Return Book
                            </TabsTrigger>
                            <TabsTrigger value="history" className="flex items-center gap-2">
                                <History className="w-4 h-4" /> Borrowing History
                            </TabsTrigger>
                        </TabsList>

                        {/* Borrow Book Tab */}
                        <TabsContent value="borrow" className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Member Search */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Users className="w-5 h-5" /> Search Member
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex gap-2 mb-4">
                                            <Input
                                                placeholder="Search by name (min 3 characters)"
                                                value={memberQuery}
                                                onChange={(e) => setMemberQuery(e.target.value)}
                                            />
                                            <Button onClick={handleMemberSearch} disabled={loading}>
                                                <Search className="w-4 h-4 mr-2" /> Search
                                            </Button>
                                        </div>

                                        {members.length > 0 && (
                                            <div className="border rounded-md max-h-60 overflow-y-auto">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Name</TableHead>
                                                            <TableHead>Email</TableHead>
                                                            <TableHead>Level</TableHead>
                                                            <TableHead></TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {members.map((member) => (
                                                            <TableRow
                                                                key={member._id}
                                                                className={selectedMember?._id === member._id ? 'bg-blue-50' : ''}
                                                            >
                                                                <TableCell>{member.firstname} {member.lastname}</TableCell>
                                                                <TableCell>{member.email}</TableCell>
                                                                <TableCell>{member.level}</TableCell>
                                                                <TableCell>
                                                                    <Button
                                                                        variant={selectedMember?._id === member._id ? "secondary" : "outline"}
                                                                        size="sm"
                                                                        onClick={() => setSelectedMember(member)}
                                                                    >
                                                                        {selectedMember?._id === member._id ? 'Selected' : 'Select'}
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        )}

                                        {selectedMember && (
                                            <div className="mt-4 p-3 border rounded-md bg-blue-50">
                                                <p className="font-medium">Selected Member:</p>
                                                <p>{selectedMember.firstname} {selectedMember.lastname} - {selectedMember.level}</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Book Search */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <BookOpen className="w-5 h-5" /> Search Book
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex gap-2 mb-4">
                                            <Input
                                                placeholder="Search by title or author (min 3 characters)"
                                                value={bookQuery}
                                                onChange={(e) => setBookQuery(e.target.value)}
                                            />
                                            <Button onClick={handleBookSearch} disabled={loading}>
                                                <Search className="w-4 h-4 mr-2" /> Search
                                            </Button>
                                        </div>

                                        {books.length > 0 && (
                                            <div className="border rounded-md max-h-60 overflow-y-auto">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Title</TableHead>
                                                            <TableHead>Author</TableHead>
                                                            <TableHead>Status</TableHead>
                                                            <TableHead></TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {books.map((book) => (
                                                            <TableRow
                                                                key={book._id}
                                                                className={selectedBook?._id === book._id ? 'bg-blue-50' : ''}
                                                            >
                                                                <TableCell>{book.title}</TableCell>
                                                                <TableCell>{book.author}</TableCell>
                                                                <TableCell>
                                                                    <Badge variant={book.availableCopies > 0 ? "success" : "destructive"}>
                                                                        {book.availableCopies > 0 ? `Available (${book.availableCopies})` : 'Not Available'}
                                                                    </Badge>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Button
                                                                        variant={selectedBook?._id === book._id ? "secondary" : "outline"}
                                                                        size="sm"
                                                                        onClick={() => setSelectedBook(book)}
                                                                        disabled={book.availableCopies <= 0}
                                                                    >
                                                                        {selectedBook?._id === book._id ? 'Selected' : 'Select'}
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        )}

                                        {selectedBook && (
                                            <div className="mt-4 p-3 border rounded-md bg-blue-50">
                                                <p className="font-medium">Selected Book:</p>
                                                <p>{selectedBook.title} by {selectedBook.author} ({selectedBook.bookNumber})</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="flex justify-center">
                                <Button
                                    size="lg"
                                    className="w-full md:w-1/3"
                                    disabled={!selectedMember || !selectedBook || loading}
                                    onClick={handleBorrowBook}
                                >
                                    <ArrowRight className="w-4 h-4 mr-2" /> Borrow Book
                                </Button>
                            </div>
                        </TabsContent>

                        {/* Return Book Tab */}
                        <TabsContent value="return" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <RefreshCw className="w-5 h-5" /> Current Borrowings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {loading ? (
                                        <div className="text-center py-4">Loading...</div>
                                    ) : (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Member</TableHead>
                                                    <TableHead>Book</TableHead>
                                                    <TableHead>Borrow Date</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {borrowings.filter(item => item.status === "Borrowed").map((item) => (
                                                    <TableRow key={item._id}>
                                                        <TableCell>
                                                            {item.member.firstname} {item.member.lastname}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.book.title} ({item.book.bookNumber})
                                                        </TableCell>
                                                        <TableCell>{formatDate(item.borrowDate)}</TableCell>
                                                        <TableCell>
                                                            <Badge variant="secondary">{item.status}</Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleReturnBook(item._id)}
                                                                disabled={item.status === "Returned"}
                                                            >
                                                                <RefreshCw className="w-4 h-4 mr-2" /> Return
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                {borrowings.filter(item => item.status === "Borrowed").length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="text-center py-4">
                                                            No active borrowings found
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Borrowing History Tab */}
                        <TabsContent value="history" className="space-y-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <History className="w-5 h-5" /> Borrowing History
                                    </CardTitle>
                                    <Button variant="outline" size="sm" onClick={fetchBorrowingHistory} disabled={loading}>
                                        <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {loading ? (
                                        <div className="text-center py-4">Loading...</div>
                                    ) : (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Member</TableHead>
                                                    <TableHead>Book</TableHead>
                                                    <TableHead>Borrow Date</TableHead>
                                                    <TableHead>Return Date</TableHead>
                                                    <TableHead>Status</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {borrowings.map((item) => (
                                                    <TableRow key={item._id}>
                                                        <TableCell>
                                                            {item.member.firstname} {item.member.lastname}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.book.title} ({item.book.bookNumber})
                                                        </TableCell>
                                                        <TableCell>{formatDate(item.borrowDate)}</TableCell>
                                                        <TableCell>
                                                            {item.returnDate ? formatDate(item.returnDate) : '-'}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant={item.status === "Borrowed" ? "secondary" : "success"}>
                                                                {item.status === "Borrowed" ? (
                                                                    <span className="flex items-center gap-1">
                                                                        <BookOpen className="w-3 h-3" /> {item.status}
                                                                    </span>
                                                                ) : (
                                                                    <span className="flex items-center gap-1">
                                                                        <Check className="w-3 h-3" /> {item.status}
                                                                    </span>
                                                                )}
                                                            </Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                {borrowings.length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="text-center py-4">
                                                            No borrowing history found
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </AdminPadding>
        </AdminLayout>
    );
};

export default AdminBorrowBookPage;