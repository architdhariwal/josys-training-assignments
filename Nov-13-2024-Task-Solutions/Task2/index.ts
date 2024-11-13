enum BookGenre {
    FICTION = "FICTION",
    NON_FICTION = "NON_FICTION",
    MYSTERY = "MYSTERY",
    SCIENCE_FICTION = "SCIENCE_FICTION",
    BIOGRAPHY = "BIOGRAPHY",
    FANTASY = "FANTASY"
}

enum MemberRole {
    ORGANIZER = "ORGANIZER",
    MODERATOR = "MODERATOR",
    MEMBER = "MEMBER",
    GUEST = "GUEST"
}


type Book = {
    title: string;
    author: string;
    genre: BookGenre;
};


type Member = {
    name: string;
    role: MemberRole;
};


function getBooksByGenre(books: Book[], genre: BookGenre): Book[] {
    if (!books || !Array.isArray(books)) {
        throw new Error('Invalid books array provided');
    }
    return books.filter(book => book.genre === genre);
}


function getMembersByRole(members: Member[], role: MemberRole): Member[] {
    if (!members || !Array.isArray(members)) {
        throw new Error('Invalid members array provided');
    }
    return members.filter(member => member.role === role);
}


function countBooksByGenre(books: Book[]): Record<BookGenre, number> {
    if (!books || !Array.isArray(books)) {
        throw new Error('Invalid books array provided');
    }

    const genreCount: Record<BookGenre, number> = {
        [BookGenre.FICTION]: 0,
        [BookGenre.NON_FICTION]: 0,
        [BookGenre.MYSTERY]: 0,
        [BookGenre.SCIENCE_FICTION]: 0,
        [BookGenre.BIOGRAPHY]: 0,
        [BookGenre.FANTASY]: 0
    };

    books.forEach(book => {
        genreCount[book.genre]++;
    });

    return genreCount;
}

try {
    const books: Book[] = [
        { title: "Ikigai", author: "Uzumaki Naruto", genre: BookGenre.FICTION },
        { title: "Demon Slayer", author: "Uchiha Sasuke", genre: BookGenre.NON_FICTION },
        { title: "Dune", author: "Robert Downey", genre: BookGenre.SCIENCE_FICTION },
        { title: "Harry Potter", author: "J.K. Rowling", genre: BookGenre.FANTASY }
    ];

    const members: Member[] = [
        { name: "Aman", role: MemberRole.ORGANIZER },
        { name: "Suman", role: MemberRole.MEMBER },
        { name: "Raman", role: MemberRole.MODERATOR }
    ];

    
    console.log('Books in Fiction genre:', getBooksByGenre(books, BookGenre.FICTION));
    console.log('Members with role MEMBER:', getMembersByRole(members, MemberRole.MEMBER));
    console.log('Book count by genre:', countBooksByGenre(books));

} catch (error) {
    console.error('An error occurred:', error);
}
