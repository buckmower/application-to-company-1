"use client";

import React, { useState, useEffect } from 'react';

interface Advocate {
  id: number;
  firstName?: string;
  lastName?: string;
  city?: string;
  degree?: string;
  specialties?: string[];
  yearsOfExperience?: number;
  phoneNumber?: string;
}

const Page = () => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAdvocates = (searchTerm?: string | undefined, pageNumber: number | undefined = 1) => {
    const urlFriendlSearchTerm = !searchTerm ? "" : encodeURI(searchTerm);
    fetch(`/api/advocates?searchTerm=${urlFriendlSearchTerm}&pg=${pageNumber}`).then((response) => {
      response.json().then((jsonResponse) => {
        let advocates = jsonResponse.advocates || [];
        let pageNumber = jsonResponse.pageNumber || 1;
        let totalPages = jsonResponse.totalPages || 1;
        setPageNumber(pageNumber);
        setTotalPages(totalPages);
        setAdvocates(advocates);
      });
    });
  }

  useEffect(() => fetchAdvocates(), [])

  const throttleDebounce = (fn: (...args: any[]) => void, delay: number = 0) => {
    let lastCall = 0;
    let timeout: string | number | NodeJS.Timeout | null | undefined = null;

    return function (...args: any) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        if (timeout !== null) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          lastCall = now;
          fn.apply(null, args);
        }, delay);
      } else {
        lastCall = now;
        fn(...args);
      }
    };
  }

  const searchForAdvocates = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    throttleDebounce(() => fetchAdvocates(searchTerm, 1), 2000)();
  };

  const resetSearch = () => {
    setSearchTerm("");
    fetchAdvocates();
  };

  const handlePageChange = (newPageNumber: number) => {
    fetchAdvocates(searchTerm, newPageNumber);
  };

  return (
    <main className="m-6">
      <h1 className="text-3xl font-bold">Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p className="text-lg font-semibold">Search</p>
        <p className="text-sm">
          Searching for: <span id="search-term" className="font-medium">{searchTerm}</span>
        </p>
        <input className="border border-black p-2 mt-2" onChange={searchForAdvocates} value={searchTerm} />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded" onClick={resetSearch}>Reset Search</button>
      </div>
      <br />
      <br />
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">City</th>
            <th className="py-2 px-4 border-b">Degree</th>
            <th className="py-2 px-4 border-b">Specialties</th>
            <th className="py-2 px-4 border-b">Years of Experience</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => (
            <tr key={advocate.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{advocate.firstName}</td>
              <td className="py-2 px-4 border-b">{advocate.lastName}</td>
              <td className="py-2 px-4 border-b">{advocate.city}</td>
              <td className="py-2 px-4 border-b">{advocate.degree}</td>
              <td className="py-2 px-4 border-b">
                {advocate.specialties?.map((s, index) => (
                  <div key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{s}</div>
                ))}
              </td>
              <td className="py-2 px-4 border-b">{advocate.yearsOfExperience}</td>
              <td className="py-2 px-4 border-b">{advocate.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className={`p-2 mx-1 ${pageNumber === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'} rounded`}
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <span className="p-2 mx-1">{pageNumber} / {totalPages}</span>
        <button
          className={`p-2 mx-1 ${pageNumber === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'} rounded`}
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={pageNumber === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Page;
