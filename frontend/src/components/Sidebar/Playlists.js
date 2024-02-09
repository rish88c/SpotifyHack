import React from "react";

function Playlists() {
  return (
    <>
      <nav className="mx-6 mt-2 flex-auto border-t border-white border-opacity-20 overflow-y-auto h-80">
        <ul>
          {new Array(50).fill().map((_, index) => (
            <li key={index}>
              <div className="text-sm text-gray-500 hover:text-white flex h-8 items-center">
                My Playlists
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Playlists;
