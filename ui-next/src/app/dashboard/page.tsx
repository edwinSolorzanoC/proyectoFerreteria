import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(async function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <button><a href="/api/auth/logout">Logout</a></button>
        </div>
    );
});
