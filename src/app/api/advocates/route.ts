import { NextRequest, NextResponse } from 'next/server';
import { advocateData } from "../../../db/seed/advocates";

async function getAdvocates(req: NextRequest) {
  const searchTerm = req.nextUrl.searchParams.get("searchTerm") || undefined
  let pageNumberParam: string = req.nextUrl.searchParams.get("pg") || "0";
  let pageNumber = parseInt(pageNumberParam);

  const pageSize = 10;

  const data = advocateData;
  let totalAdvocates = data.length;
  let totalPages = Math.ceil(totalAdvocates / pageSize);

  const paginateResults = (pageNumber: number = 1) => {
    const startIndex =  pageNumber === 1 ? 0 : ((pageNumber - 1) * pageSize);
    const endIndex = startIndex + pageSize;
    const pageData = data.slice(startIndex, endIndex);
    return pageData;
  }

  if (!searchTerm) {
    let advocates = paginateResults(pageNumber)
    let results = { advocates: advocates, totalPages: totalPages, pageNumber: pageNumber }

    return NextResponse.json(results, { status: 200 });

  }

  // Filter the data based on the search term
  //This would involve querying the database for the search term
  //For now I am just going to filter the data in memory
  //Using the default data

  const filteredAdvocates = data.filter((advocate) => {
    const regex = new RegExp(searchTerm, 'i');
    return (
      advocate.firstName.includes(searchTerm) ||
      advocate.lastName.includes(searchTerm) ||
      advocate.city.includes(searchTerm) ||
      advocate.degree.includes(searchTerm) ||
      advocate.specialties.some((specialty) => regex.test(specialty)) ||
      advocate.yearsOfExperience == parseInt(searchTerm)
    );
  });

  if(filteredAdvocates.length === 0) {
    return NextResponse.json({ message: "No advocates found" }, { status: 404 });
  }

  let results = { advocates: filteredAdvocates, totalPages: totalPages, pageNumber: pageNumber }

  return NextResponse.json(results, { status: 200 });
}

export async function GET(req: NextRequest) {
  return getAdvocates(req);
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
