import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import TicTacToe from "./pages/TicTacToe";
// import DigitalClock from "./pages/DigitalClock";
// import TrafficLight from "./pages/TrafficLight";
import NestedCheckbox from "./pages/NestedCheckbox";
// import AnalogClock from "./pages/AnalogClock";
// import BasicTable from "./pages/BasicTable";
// import ProgressBar from "./pages/ProgressBar";
import HolyGrailLayout from "./pages/HolyGrailLayout";
import CreditCardForm from "./pages/CreditCardForm";

export default function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        {/* Navigation */}
        <nav className="p-4 bg-white shadow-md flex justify-center gap-4">
          {/* <Link className="text-lg font-semibold text-blue-600 hover:underline" to="/">TrafficLight</Link>
          <Link className="text-lg font-semibold text-blue-600 hover:underline" to="/tictactoe">TicTacToe</Link>
          <Link className="text-lg font-semibold text-blue-600 hover:underline" to="/digitalclock">DigitalClock</Link>
          <Link className="text-lg font-semibold text-blue-600 hover:underline" to="/analogclock">AnalogClock</Link> */}
          <Link className="text-lg font-semibold text-blue-600 hover:underline" to="/nestedCheckbox">Nested Checkbox</Link>
          {/* <Link className="text-lg font-semibold text-blue-600 hover:underline" to="/basicTable">Basic Table</Link> */}
          {/* <Link className="text-lg font-semibold text-blue-600 hover:underline" to="/progressBarWithInputControl">Progress Bar</Link> */}
          <Link className="text-lg font-semibold text-blue-600 hover:underline" to="/holyGrailLayout">Holy Grail</Link>
          <Link className="text-lg font-semibold text-blue-600 hover:underline" to="/creditCardForm">Credit Card Form</Link>
        </nav>

        {/* Page Content */}
        <Routes>
          {/* <Route path="/" element={<TrafficLight />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/digitalclock" element={<DigitalClock />} />
          <Route path="/analogclock" element={<AnalogClock/>} /> */}
          <Route path="/nestedcheckbox" element={<NestedCheckbox />}/>
          {/* <Route path="/basicTable" element={<BasicTable/>} /> */}
          {/* <Route path="/progressBarWithInputControl" element={<ProgressBar/>}/> */}
          <Route path="holyGrailLayout" element={<HolyGrailLayout/>}/>
          <Route path="creditCardForm" element={<CreditCardForm/>}/>
        </Routes>
      </div>
    </Router>
  );
}
