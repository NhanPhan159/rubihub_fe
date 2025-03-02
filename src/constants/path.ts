export const Path = {
    Root: "/",
    Public: "/public",
    Login: "/auth/login",
    Register: "/auth/register",
    Admin: {
        index: "/admin",
        children: {
            dashBoard: "/admin/dashboard",
            question: "/admin/questions"
        }
    },
    PageNotFound: "/page-not-found",
    PermissionDenied: "/permission-denied",
    Conversation: "/conversation",
};