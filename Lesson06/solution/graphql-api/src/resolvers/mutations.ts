// Resolvers define how to fetch the types defined in your schema.
import { books } from "../data.js";
import { MutationResolvers } from "../generated/graphql.js";

const mutations: MutationResolvers = {
    addBook: (_, { title, author }) => {
        if (!title || !author) {
            return {
                success: false,
                message: "Both title and author are required.",
                book: null,
            };
        }

        const newBook = { title, author };
        books.push(newBook);

        return {
            success: true,
            message: "Book added successfully.",
            book: newBook,
        };
    },
};

export default mutations;
