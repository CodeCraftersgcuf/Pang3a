import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export const GET = async (request) => {
  const cookieStore = cookies(); // Get cookies from the request
  const token = cookieStore.get('token'); // Fetch the 'token' cookie
  console.log('Token:', token?.value); // Check if the token is available
  let items = [];
  let cursor = null;
  console.log('came to get-all-items route');
  // console.log(request);
  try {
    do {
      const response = await axios.get(
        'https://connect.squareup.com/v2/catalog/list',
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_SQUARE_ACCESS_TOKEN_PROD}`,
            'Square-Version': '2023-08-16',
            'Content-Type': 'application/json',
          },
          // params: cursor ? { cursor } : {},
          params: {
            types: 'ITEM', // Fetch only objects of type ITEM
            cursor: cursor ? cursor : undefined, // Use cursor if available
          },
        }
      );

      items = items.concat(response.data.objects);
      cursor = response.data.cursor;
    } while (cursor);
    // console.log(Object.values(items).slice(0, 6));
    return NextResponse.json(items); // Return the items;
  } catch (error) {
    // console.log(error);
    return error.message;
  }
};
