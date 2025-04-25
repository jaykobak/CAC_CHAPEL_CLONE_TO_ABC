import React, { useState, useEffect } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import AdminPadding from '@/layouts/AdminPadding'
import { Button } from '@/components/ui/button'
import { PlusIcon, Pencil, Trash2, BookOpen, Loader2, Search, ArrowUpDown } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { addBook, getBooks, getBook, editBook, deleteBook } from '@/services/api/apiEndpoints'
import { useToast } from '@/hooks/use-toast'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

const statusOptions = ["Available", "Borrowed", "Lost", "Damaged"];

const AdminLibraryPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('title');
    const [sortDirection, setSortDirection] = useState('asc');
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        yearPublished: '',
        totalCopies: 1,
        availableCopies: 1,
        description: '',
        status: 'Available'
    });
    const [currentBook, setCurrentBook] = useState(null);
    const { toast } = useToast();

    // Fetch books on component mount and when dependencies change
    useEffect(() => {
        fetchBooks();
    }, [currentPage, searchQuery, sortField, sortDirection]);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            // In a real implementation, you would include query params for filtering and sorting
            const response = await getBooks();
            setBooks(response.data);
            setTotalPages(response.pagination.totalPages);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch books",
                variant: "destructive",
            });
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNumberInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: parseInt(value) || '' });
    };

    const handleStatusChange = (value) => {
        setFormData({ ...formData, status: value });
    };

    const resetForm = () => {
        setFormData({
            title: '',
            author: '',
            category: '',
            yearPublished: '',
            totalCopies: 1,
            availableCopies: 1,
            description: '',
            status: 'Available'
        });
    };

    const handleAddBook = async () => {
        try {
            setSubmitting(true);
            console.log({ formData })
            await addBook(formData);
            setAddDialogOpen(false);
            resetForm();
            fetchBooks();
            toast({
                title: "Success",
                description: "Book added successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add book",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const openDetailsDialog = async (book) => {
        try {
            setCurrentBook(book);
            // Optionally fetch more details if needed
            const response = await getBook(book._id);
            setCurrentBook(response.data);
            setDetailsDialogOpen(true);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch book details",
                variant: "destructive",
            });
        }
    };

    const openEditDialog = async (book) => {
        try {
            const response = await getBook(book._id);
            const bookData = response.data;
            setCurrentBook(bookData);
            setFormData({
                title: bookData.title,
                author: bookData.author,
                category: bookData.category || '',
                yearPublished: bookData.yearPublished || '',
                totalCopies: bookData.totalCopies,
                availableCopies: bookData.availableCopies,
                description: bookData.description || '',
                status: bookData.status
            });
            setEditDialogOpen(true);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch book details for editing",
                variant: "destructive",
            });
        }
    };

    const handleEditBook = async () => {
        try {
            setSubmitting(true);
            await editBook(currentBook._id, formData);
            setEditDialogOpen(false);
            resetForm();
            fetchBooks();
            toast({
                title: "Success",
                description: "Book updated successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update book",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const openDeleteDialog = (book) => {
        setCurrentBook(book);
        setDeleteDialogOpen(true);
    };

    const handleDeleteBook = async () => {
        try {
            setSubmitting(true);
            await deleteBook(currentBook._id);
            setDeleteDialogOpen(false);
            fetchBooks();
            toast({
                title: "Success",
                description: "Book deleted successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete book",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Available':
                return 'bg-green-100 text-green-800';
            case 'Borrowed':
                return 'bg-blue-100 text-blue-800';
            case 'Lost':
                return 'bg-red-100 text-red-800';
            case 'Damaged':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout>
            <AdminPadding className="bg-neutral-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Library Management</h1>
                    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <PlusIcon className="h-4 w-4" />
                                Add Book
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[550px]">
                            <DialogHeader>
                                <DialogTitle>Add New Book</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Enter book title"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="author">Author</Label>
                                        <Input
                                            id="author"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleInputChange}
                                            placeholder="Enter author's name"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Input
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            placeholder="Enter book category"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="yearPublished">Year Published</Label>
                                        <Input
                                            id="yearPublished"
                                            name="yearPublished"
                                            type="number"
                                            value={formData.yearPublished}
                                            onChange={handleNumberInputChange}
                                            placeholder="Enter year published"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="totalCopies">Total Copies</Label>
                                        <Input
                                            id="totalCopies"
                                            name="totalCopies"
                                            type="number"
                                            value={formData.totalCopies}
                                            onChange={handleNumberInputChange}
                                            placeholder="Enter total copies"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="availableCopies">Available Copies</Label>
                                        <Input
                                            id="availableCopies"
                                            name="availableCopies"
                                            type="number"
                                            value={formData.availableCopies}
                                            onChange={handleNumberInputChange}
                                            placeholder="Enter available copies"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter book description"
                                        rows={3}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={handleStatusChange}
                                    >
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statusOptions.map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button onClick={handleAddBook} disabled={submitting}>
                                    {submitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Book"
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white p-4 rounded-md shadow-sm border mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search books..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>

                {/* Books Table */}
                <div className="bg-white rounded-md shadow-sm border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort('title')}>
                                    <div className="flex items-center">
                                        Title
                                        {sortField === 'title' && (
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        )}
                                    </div>
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort('author')}>
                                    <div className="flex items-center">
                                        Author
                                        {sortField === 'author' && (
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        )}
                                    </div>
                                </TableHead>
                                <TableHead>Book No.</TableHead>
                                <TableHead className="text-center">Copies</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10">
                                        <div className="flex justify-center">
                                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2">Loading books...</p>
                                    </TableCell>
                                </TableRow>
                            ) : books.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10">
                                        <p className="text-muted-foreground">No books found</p>
                                        <Button
                                            variant="link"
                                            onClick={() => setAddDialogOpen(true)}
                                            className="mt-2"
                                        >
                                            Add your first book
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                books.map((book) => (
                                    <TableRow key={book._id} className="cursor-pointer hover:bg-muted/50" onClick={() => openDetailsDialog(book)}>
                                        <TableCell className="font-medium">{book.title}</TableCell>
                                        <TableCell>{book.author}</TableCell>
                                        <TableCell>{book.bookNumber}</TableCell>
                                        <TableCell className="text-center">
                                            {book.availableCopies} / {book.totalCopies}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getStatusBadgeColor(book.status)}>
                                                {book.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openEditDialog(book);
                                                    }}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openDeleteDialog(book);
                                                    }}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="flex justify-center mt-6">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        className="w-10 h-10"
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}

                {/* Book Details Dialog */}
                <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
                    <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                            <DialogTitle>Book Details</DialogTitle>
                        </DialogHeader>
                        {currentBook && (
                            <div className="py-4">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold">{currentBook.title}</h3>
                                        <p className="text-muted-foreground">by {currentBook.author}</p>
                                    </div>
                                    <Badge className={getStatusBadgeColor(currentBook.status)}>
                                        {currentBook.status}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Book Number</p>
                                        <p className="font-medium">{currentBook.bookNumber}</p>
                                    </div>
                                    {currentBook.category && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Category</p>
                                            <p className="font-medium">{currentBook.category}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Year Published</p>
                                        <p className="font-medium">{currentBook.yearPublished || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Copies</p>
                                        <p className="font-medium">{currentBook.availableCopies} available / {currentBook.totalCopies} total</p>
                                    </div>
                                </div>

                                {currentBook.description && (
                                    <div className="mb-4">
                                        <p className="text-sm text-muted-foreground mb-1">Description</p>
                                        <p className="text-sm">{currentBook.description}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mt-6">
                                    <p>Added on {new Date(currentBook.createdAt).toLocaleDateString()}</p>
                                    <p>Last updated {new Date(currentBook.updatedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
                                Close
                            </Button>
                            <Button
                                onClick={() => {
                                    setDetailsDialogOpen(false);
                                    openEditDialog(currentBook);
                                }}
                            >
                                Edit Book
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Dialog */}
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                            <DialogTitle>Edit Book</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="edit-title">Title</Label>
                                    <Input
                                        id="edit-title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter book title"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="edit-author">Author</Label>
                                    <Input
                                        id="edit-author"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleInputChange}
                                        placeholder="Enter author's name"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="edit-category">Category</Label>
                                    <Input
                                        id="edit-category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        placeholder="Enter book category"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="edit-yearPublished">Year Published</Label>
                                    <Input
                                        id="edit-yearPublished"
                                        name="yearPublished"
                                        type="number"
                                        value={formData.yearPublished}
                                        onChange={handleNumberInputChange}
                                        placeholder="Enter year published"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="edit-totalCopies">Total Copies</Label>
                                    <Input
                                        id="edit-totalCopies"
                                        name="totalCopies"
                                        type="number"
                                        value={formData.totalCopies}
                                        onChange={handleNumberInputChange}
                                        placeholder="Enter total copies"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="edit-availableCopies">Available Copies</Label>
                                    <Input
                                        id="edit-availableCopies"
                                        name="availableCopies"
                                        type="number"
                                        value={formData.availableCopies}
                                        onChange={handleNumberInputChange}
                                        placeholder="Enter available copies"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                    id="edit-description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter book description"
                                    rows={3}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="edit-status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={handleStatusChange}
                                >
                                    <SelectTrigger id="edit-status">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map((status) => (
                                            <SelectItem key={`edit-${status}`} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleEditBook} disabled={submitting}>
                                {submitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Book"
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete the book "{currentBook?.title}".
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteBook}
                                className="bg-red-500 hover:bg-red-600 text-white"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete Book"
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </AdminPadding>
        </AdminLayout>
    )
}

export default AdminLibraryPage