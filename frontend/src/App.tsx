import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { KanbanBoard } from "./pages/KanbanBoard";
import { TeamChat } from "./pages/TeamChat";
import { AIAssistant } from "./pages/AIAssistant";
import { Analytics } from "./pages/Analytics";
import { Team } from "./pages/Team";
import { Settings } from "./pages/Settings";
import { Profile } from "./pages/Profile";
import { RecentActivity } from "./pages/RecentActivity";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";

function App() {
    return (
        <AppProvider>
            <Router>
                <Routes>
                    {/* Auth Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/reset-password" element={<ResetPassword />} />

                    {/* Dashboard Routes */}
                    <Route path="/dashboard" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="board" element={<KanbanBoard />} />
                        <Route path="chat" element={<TeamChat />} />
                        <Route path="ai" element={<AIAssistant />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="team" element={<Team />} />
                    </Route>

                    {/* User-specific Routes */}
                    <Route path="/:username" element={<Layout />}>
                        <Route path="profile" element={<Profile />} />
                        <Route path="activity" element={<RecentActivity />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </Router>
        </AppProvider>
    );
}

export default App;
