// created createBook using Factory Function
const createBook = (title, author) => {
    return {
        title,
        author,
        isBorrowed: false,
        borrowedBy: null,
        toString() {
            return `${this.title} by ${this.author}`;
        }
    };
};

// created Library Object here using Object Literals 
const Library = {
    books: [],
    users: [],

    addBook(title, author) {
        const book = createBook(title, author);
        this.books.push(book);
        this.updateDisplays();
        return book;
    },

    getAvailableBooks() {
        return this.books.filter(book => !book.isBorrowed);
    },

    getBorrowedBooks() {
        return this.books.filter(book => book.isBorrowed);
    },

    addUser(user) {
        this.users.push(user);
        this.updateDisplays();
        return user;
    },

    updateDisplays() {
        updateAvailableBooksList();
        updateUsersList();
        updateBorrowerSelect();
        updateReturnerSelect();
        updateAvailableBooksSelect();
        updateBorrowedBooksSelect();
    }
};

// User Constructor Function
function User(name) {
    this.name = name;
    this.borrowedBooks = [];
    this.maxBooks = 2; // here regular users can only borrow 2 books
}

User.prototype.canBorrowMore = function() {
    return this.borrowedBooks.length < this.maxBooks;
};

User.prototype.borrowBook = function(book) {
    if (!book.isBorrowed && this.canBorrowMore()) {
        book.isBorrowed = true;
        book.borrowedBy = this;
        this.borrowedBooks.push(book);
        Library.updateDisplays();
        return true;
    }
    return false;
};

User.prototype.returnBook = function(book) {
    const index = this.borrowedBooks.indexOf(book);
    if (index !== -1) {
        book.isBorrowed = false;
        book.borrowedBy = null;
        this.borrowedBooks.splice(index, 1);
        Library.updateDisplays();
        return true;
    }
    return false;
};

// regular user can only borrow max 2 books and LibraryMember can borrow 5 books

// here LibraryMember Constructor is inhereting User Constructor
function LibraryMember(name) {
    User.call(this, name);
    this.memberId = 'LIB-' + Math.floor(Math.random() * 10000);
    this.membershipDate = new Date().toLocaleDateString();
    this.maxBooks = 5; // here Library members can borrow up to 5 books
}

LibraryMember.prototype = Object.create(User.prototype);

LibraryMember.prototype.getMembershipInfo = function() {
    return {
        name: this.name,
        memberId: this.memberId,
        membershipDate: this.membershipDate
    };
};

// Accessing all the DOM Elements here 
const elements = {
    bookForm: document.getElementById('bookForm'),
    bookTitle: document.getElementById('bookTitle'),
    bookAuthor: document.getElementById('bookAuthor'),
    userForm: document.getElementById('userForm'),
    userName: document.getElementById('userName'),
    userType: document.getElementById('userType'),
    borrowerSelect: document.getElementById('borrowerSelect'),
    returnerSelect: document.getElementById('returnerSelect'),
    availableBooksSelect: document.getElementById('availableBooksSelect'),
    borrowedBooksSelect: document.getElementById('borrowedBooksSelect'),
    borrowBtn: document.getElementById('borrowBtn'),
    returnBtn: document.getElementById('returnBtn'),
    availableBooksList: document.getElementById('availableBooksList'),
    usersList: document.getElementById('usersList')
};

// Display Update Functions
function updateAvailableBooksList() {
    elements.availableBooksList.innerHTML = Library.getAvailableBooks()
        .map(book => `
            <div class="list-item">
                <strong>${book.title}</strong> by ${book.author}
            </div>
        `).join('');
}

function updateUsersList() {
    elements.usersList.innerHTML = Library.users
        .map(user => {
            const isMember = user instanceof LibraryMember;
            const memberInfo = isMember ? 
                `<span class="member-badge">ID: ${user.memberId}</span>` : '';
            
            const borrowedBooksHtml = `
                <div class="borrowed-books">
                    <strong>Borrowed Books: ${user.borrowedBooks.length}/${user.maxBooks}</strong>
                    ${user.borrowedBooks.map(book => 
                        `<div class="borrowed-book">• ${book.title}</div>`
                    ).join('')}
                </div>`;

            return `
                <div class="user-item">
                    <strong>${user.name}</strong>${memberInfo}
                    ${borrowedBooksHtml}
                </div>
            `;
        }).join('');
}

function updateBorrowerSelect() {
    elements.borrowerSelect.innerHTML = '<option value="">Select User</option>' +
        Library.users.map((user, index) => {
            const canBorrow = user.canBorrowMore();
            return `<option value="${index}" ${!canBorrow ? 'disabled' : ''}>
                ${user.name} (${user.borrowedBooks.length}/${user.maxBooks} books)
            </option>`;
        }).join('');
}

function updateReturnerSelect() {
    elements.returnerSelect.innerHTML = '<option value="">Select User</option>' +
        Library.users.map((user, index) => 
            `<option value="${index}">${user.name}</option>`
        ).join('');
}

function updateAvailableBooksSelect() {
    elements.availableBooksSelect.innerHTML = '<option value="">Select Book</option>' +
        Library.getAvailableBooks().map((book, index) => 
            `<option value="${index}">${book.title}</option>`
        ).join('');
}

function updateBorrowedBooksSelect() {
    const selectedUserIndex = elements.returnerSelect.value;
    elements.borrowedBooksSelect.innerHTML = '<option value="">Select Book</option>';
    
    if (selectedUserIndex !== '') {
        const user = Library.users[selectedUserIndex];
        elements.borrowedBooksSelect.innerHTML += user.borrowedBooks
            .map((book, index) => 
                `<option value="${index}">${book.title}</option>`
            ).join('');
    }
}

// all Event Listeners


elements.bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = elements.bookTitle.value.trim();
    const author = elements.bookAuthor.value.trim();
    
    if (title && author) {
        Library.addBook(title, author);
        elements.bookForm.reset();
        alert('Book added successfully!');
    }
});

elements.userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = elements.userName.value.trim();
    const type = elements.userType.value;
    
    if (name) {
        const user = type === 'member' ? 
            new LibraryMember(name) : 
            new User(name);
        Library.addUser(user);
        elements.userForm.reset();
        alert(`${type === 'member' ? 'Library Member' : 'User'} added successfully!`);
    }
});

elements.borrowBtn.addEventListener('click', () => {
    const userIndex = elements.borrowerSelect.value;
    const bookIndex = elements.availableBooksSelect.value;
    
    if (userIndex === '' || bookIndex === '') {
        alert('Please select both user and book');
        return;
    }

    const user = Library.users[userIndex];
    const book = Library.getAvailableBooks()[bookIndex];
    
    if (!user.canBorrowMore()) {
        alert(`${user.name} has reached their borrowing limit of ${user.maxBooks} books`);
        return;
    }

    if (user.borrowBook(book)) {
        alert(`${book.title} has been borrowed by ${user.name}`);
    } else {
        alert('Failed to borrow the book');
    }
});

elements.returnBtn.addEventListener('click', () => {
    const userIndex = elements.returnerSelect.value;
    const bookIndex = elements.borrowedBooksSelect.value;
    
    if (userIndex === '' || bookIndex === '') {
        alert('Please select both user and book');
        return;
    }

    const user = Library.users[userIndex];
    const book = user.borrowedBooks[bookIndex];
    
    if (user.returnBook(book)) {
        alert(`${book.title} has been returned successfully`);
    } else {
        alert('Failed to return the book');
    }
});

elements.returnerSelect.addEventListener('change', () => {
    updateBorrowedBooksSelect();
});

// I am initiliasing the DOM with some pre-loaded data
window.addEventListener('DOMContentLoaded', () => {
    // Added sample books
    Library.addBook('Juliet & Caesaor', 'William Shakespeare');
    Library.addBook('Geetanjali', 'Rabindranth');
    Library.addBook('Rockets', 'Ranbir Kapoor');
    
    // Added sample users
    Library.addUser(new User('Harry Potter'));
    Library.addUser(new LibraryMember('Angry Teacher'));
    
    // Update all displays
    Library.updateDisplays();
});