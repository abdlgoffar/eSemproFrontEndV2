import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";

import StudentProposal from "./pages/StudentProposal";
import StudentUpload from "./pages/StudentUpload";
import StudentInvitation from "./pages/StudentInvitation";
import StudentProposalDetail from "./pages/StudentProposalDetail";

import HeadStudyProgramProposalDetail from "./pages/HeadStudyProgramProposalDetail";
import HeadStudyProgramProposal from "./pages/HeadStudyProgramProposal";

import AcademicAdministrationInvitation from "./pages/AcademicAdministrationInvitation";
import AcademicAdministrationUser from "./pages/AcademicAdministrationUsers";

import ExaminerRevision from "./pages/ExaminerRevision";
import ExaminerInvitation from "./pages/ExaminerInvitation";
import ExaminerProposalDetail from "./pages/ExaminerProposalDetail";
import ExaminerAttendance from "./pages/ExaminerAttendance";


import CoordinatorProposalDetail from "./pages/CoordinatorProposalDetail";
import CoordinatorProposal from "./pages/CoordinatorProposal";
import CoordinatorInvitation from "./pages/CoordinatorInvitation";

import SupervisorProposal from "./pages/SupervisorProposal";
import SupervisorProposalDetail from "./pages/SupervisorProposalDetail";
import StudentAttendance from "./pages/StudentAttendance";
import AcademicAdministrationAttendance from "./pages/AcademicAdministrationAttendance";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import ExaminerProposal from "./pages/ExaminerProposal";
import SupervisorProposalList from "./pages/SupervisorProposalList";
import HeadStudyProgramProposalList from "./pages/HeadStudyProgramProposalList";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
          {/* Student pages */}
          <Route path="/students/proposal" element={<ProtectedRoute><StudentProposal /></ProtectedRoute>} />
          <Route path="/students/upload" element={<ProtectedRoute><StudentUpload /></ProtectedRoute>} />
          <Route path="/students/proposal/detail/:proposalId" element={<ProtectedRoute><StudentProposalDetail /></ProtectedRoute>} />
          <Route path="/students/invitation" element={<ProtectedRoute><StudentInvitation /></ProtectedRoute>} />
          {/* <Route path="/students/attendance" element={<ProtectedRoute><StudentAttendance /></ProtectedRoute>} /> */}

          {/* Head Study Program pages */}
          <Route path="/head-study-programs/proposal" element={<ProtectedRoute><HeadStudyProgramProposal /></ProtectedRoute>} />
          <Route path="/head-study-programs/proposal-mahasiswa" element={<ProtectedRoute><HeadStudyProgramProposalList /></ProtectedRoute>} />
          <Route path="/head-study-programs/proposal/detail/:proposalId" element={<ProtectedRoute><HeadStudyProgramProposalDetail /></ProtectedRoute>} />

          {/* Academic Administration pages */}
          <Route path="/academic-administrations/invitation" element={<ProtectedRoute><AcademicAdministrationInvitation /></ProtectedRoute>} />
          <Route path="/academic-administrations/user" element={<ProtectedRoute><AcademicAdministrationUser /></ProtectedRoute>} />
          {/* <Route path="/academic-administrations/attendance" element={<ProtectedRoute><AcademicAdministrationAttendance /></ProtectedRoute>} /> */}

          {/* Examiner pages */}
          {/* <Route path="/examiners/revision" element={<ProtectedRoute><ExaminerRevision /></ProtectedRoute>} /> */}
          <Route path="/examiners/proposal/detail/:proposalId" element={<ProtectedRoute><ExaminerProposalDetail /></ProtectedRoute>} />
          <Route path="/examiners/proposal" element={<ProtectedRoute><ExaminerProposal /></ProtectedRoute>} />
          <Route path="/examiners/invitation" element={<ProtectedRoute><ExaminerInvitation /></ProtectedRoute>} />
          {/* <Route path="/examiners/attendance" element={<ProtectedRoute><ExaminerAttendance /></ProtectedRoute>} /> */}

          {/* Coordinator pages */}
          <Route path="/coordinators/proposal" element={<ProtectedRoute><CoordinatorProposal /></ProtectedRoute>} />
          <Route path="/coordinators/proposal/detail/:proposalId" element={<ProtectedRoute><CoordinatorProposalDetail /></ProtectedRoute>} />
          <Route path="/coordinators/invitation" element={<ProtectedRoute><CoordinatorInvitation /></ProtectedRoute>} />

          {/* Supervisor pages */}
          <Route path="/supervisors/proposal" element={<ProtectedRoute><SupervisorProposal /></ProtectedRoute>} />
          <Route path="/supervisors/proposal-mahasiswa" element={<ProtectedRoute><SupervisorProposalList /></ProtectedRoute>} />
          <Route path="/supervisors/proposal/detail/:proposalId" element={<ProtectedRoute><SupervisorProposalDetail /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
