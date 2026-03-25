import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateStory from "./components/CreateStory";
import Stories from "./components/Stories";
import StoryDetails from "./components/StoryDetails";
import "./index.css";


function App () {
  const querryClient = new QueryClient();
  //const[theme, setTheme] = useState("light");
   return (
    <QueryClientProvider client={querryClient}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateStory />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<StoryDetails />} />
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
   );
};

export default App;