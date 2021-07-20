//pulled from C:\Users\kern\Desktop\RUT-VIRT-FSF-FT-04-2021-U-LOL\21-MERN\01-Activities\25-Ins_Resolver-Context\server\schemas\resolvers.js.  

const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const { signToken } = require('../utils/auth');//server util/auth

const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            console.log('comes here: ', context.user);
            // If user is authenticated
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate("saveBooks")
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        addUser: async ({ body }, res) => {
            const user = await User.create(body);

            if (!user) {
                return res.status(400).json({ message: 'Something is wrong!' });
            }
            const token = signToken(user);
            return ({ token, user });
        },
        // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
        // {body} is destructured req.body
        loginUser: async ({ email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user-- Authentication Errors');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Authentication Error');
            }
            const token = signToken(user);
            return { token, user };
        },
        // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
        // user comes from `req.user` created in the auth middleware function
        saveBook: async ({ book }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        //Delete Book
        removeBook: async ({ bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
}
module.exports = resolvers;
