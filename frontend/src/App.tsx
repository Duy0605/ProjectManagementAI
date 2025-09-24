import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { KanbanBoard } from './pages/KanbanBoard';
import { TeamChat } from './pages/TeamChat';
import { AIAssistant } from './pages/AIAssistant';
import { Analytics } from './pages/Analytics';
import { Team } from './pages/Team';
import { Settings } from './pages/Settings';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="board" element={<KanbanBoard />} />
            <Route path="chat" element={<TeamChat />} />
            <Route path="ai" element={<AIAssistant />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="team" element={<Team />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;