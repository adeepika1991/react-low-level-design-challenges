import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TicTacToe from "./pages/TicTacToe";
import DigitalClock from "./pages/DigitalClock";
import TrafficLight from "./pages/TrafficLight";

export default function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        {/* Navigation */}
        <nav className="p-4 bg-white shadow-md flex justify-center gap-4">
          <Link className="text-lg font-semibold text-blue-600 hover:underline" to="/">TrafficLight</Link>
          <Link className="text-lg font-semibold text-blue-600 hover:underline" to="/tictactoe">TicTacToe</Link>
          <Link className="text-lg font-semibold text-blue-600 hover:underline" to="/digitalclock">DigitalClock</Link>
        </nav>

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<TrafficLight />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/digitalclock" element={<DigitalClock />} />
        </Routes>
      </div>
    </Router>
  );
}
