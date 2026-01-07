import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Layout from './components/Layout';
import Roadmap from './components/Roadmap';
import Level from './components/Level';
import Lesson from './components/Lesson';
import About from './components/About';
import Support from './components/Support';

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Home / Roadmap */}
        <Route index element={<Roadmap />} />

        {/* Level */}
        <Route path="level/:levelId" element={<Level />} />

        {/* Lesson */}
        <Route
          path="level/:levelId/lesson/:lessonId"
          element={<Lesson />}
        />

        {/* About */}
        <Route
          path="about"
          element={<About onNavigate={(view) => navigate(view === 'roadmap' ? '/' : `/${view}`)} />}
        />

        {/* Support */}
        <Route
          path="support"
          element={<Support onNavigate={(view) => navigate(view === 'roadmap' ? '/' : `/${view}`)} />}
        />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
