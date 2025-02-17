export const Path = {
    Root: "/",
    Public: "/public",
    Login: "/auth/login",
    Register: "/auth/register",
    Admin: {
        index: "/admin",
        children: {
            dashBoard: "/admin/dashboard",
            test: "/admin/tests"
        }
    },
    PageNotFound: "/page-not-found",
    PermissionDenied: "/permission-denied",
    Conversation: "/conversation",
};