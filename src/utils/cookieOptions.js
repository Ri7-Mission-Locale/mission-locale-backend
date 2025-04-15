export const cookieOptions = {
    path: "/",
    domain: process.env.HOST,
    httpOnly: true, // Cant be used by a frontend script.
    secure: process.env.NODE_ENV === 'production', // Secure by https (in prod)
    sameSite: 'strict' // Access by server address only
}