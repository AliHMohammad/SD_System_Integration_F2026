// Resolvers define how to fetch the types defined in your schema.
import { books } from "../data.js";
import { QueryResolvers } from "../generated/graphql.js";

// This resolver retrieves books from the "books" array above.
const queries: QueryResolvers = {
    books: () => books,
    book: (_, { title }) => {
        if (!title) {
            return null;
        }

        return books.find((b) => b.title.toLowerCase() === title.toLowerCase()) ?? null;
    },
};

export default queries;
