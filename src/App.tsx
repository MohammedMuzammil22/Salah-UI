import { MosquePage } from './pages/MosquePage'

/**
 * App root.
 *
 * Architecture note:
 * When you add routing (react-router-dom), replace <MosquePage /> with
 * a <Router> + <Routes> tree. Each route maps to a page in src/pages/.
 *
 * Example:
 *   <Routes>
 *     <Route path="/" element={<SearchPage />} />
 *     <Route path="/mosque/:id" element={<MosquePage />} />
 *     <Route path="/profile" element={<ProfilePage />} />
 *   </Routes>
 */
export default function App() {
  return <MosquePage />
}
