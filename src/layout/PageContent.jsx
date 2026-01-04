import React from "react";

export default function PageContent({ children }) {
  return (
    <main className="w-full min-h-screen">
      {children}
    </main>
  );
}
