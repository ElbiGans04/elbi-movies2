import { useEffect, useMemo, useState } from "react";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import Button from "../components/button";

/**
 * Here we will declare the interface type that we will use to represent
 * the response object received from the fetch library
 */
interface Data {
  results: Array<{
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
  }>;
  total_pages: number;
}

function HomeComponent () {
  /**
   * Here we define the state to create the search feature
   */
  const [search, setSearch] = useState("");
  const [searchKeyUp, setSearchKeyUp] = useState("");
  const [pagination, setPagination] = useState(1);

  /**
   * For the section here, we have a value that will return a url based 
   * on the search value we input. if the value is empty, then we will 
   * retrieve all data about popular films, but if we fill in a value 
   * in the search input then we will retrieve 
   * data based on the input value we entered.
   */
  const url = useMemo(() => {
    const searchParam = new URLSearchParams();
    searchParam.set("page", pagination.toString());
    if (searchKeyUp) {
      searchParam.set("query", searchKeyUp);
    }
    return `${
      searchKeyUp
        ? process.env.REACT_APP_MOVIE_SEARCH
        : process.env.REACT_APP_MOVIE_LIST_ALL
    }${searchParam.toString()}`;
  }, [searchKeyUp, pagination]);

  const { data, isLoading } = useSWR<Data>(url, fetcher);

  /**
   * Here we will do the conditioning, in which we will wait for
   *  one second since the last typing on the keyboard, then retrieve
   *  data from the server. If before one second we type any button again, 
   * it will cancel the previous one second, then wait for 1 second reset (reset).
   *  Why ? because to prevent unnecessary requests and to save resources
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchKeyUp(search);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [search, setSearchKeyUp]);

  return (
    <div
      className={`bg-[#0A2647] min-h-screen w-full w-full flex justify-center py-[50px]`}
    >
      <div className="xl:max-w-5xl lg:max-w-3xl px-[50px] w-full h-full">
        <div className="w-full h-full space-y-[30px]">
          <div className="space-y-[10px]">
            <h1 className="text-white xl:text-7xl text-3xl md:text-4xl font-bold">
              Elbi Movies
            </h1>
            <p className="text-white xl:text-2xl md:text-xl text-lg">
              Search any movie for{" "}
              <span className="font-bold underline">free</span>
            </p>
          </div>

          <div className="bg-[#2C74B3] w-full h-[2px]"></div>

          <div className="space-y-[10px]">
            <input
              id="search"
              type="text"
              className="bg-[#144272] w-full text-white shadow p-[8px] lg:p-[16px] rounded hover:opacity-[0.8] lg:text-md text-sm"
              placeholder="Search Any Movies"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <p className="text-white lg:text-md text-sm">
              Search by titles like:{" "}
              <span className="font-bold">
                Fast And Furious, Dragon Ball, One Piece
              </span>
            </p>
          </div>

          {/* Indicator Loading */}
          {isLoading && (
            <div className="w-full h-full flex justify-center items-center !my-[100px]">
              <svg
                aria-hidden="true"
                className="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          )}

          {/* Content */}
          {/* show data only when not fetching data to server */}
          {!isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 grid-rows-7 gap-[48px] !mt-[50px]">
              {Array.isArray(data?.results) &&
                data?.results.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="group shadow-xl bg-[#144272] rounded overflow-hidden hover:border-[#2C74B3] border-[3px] border-[#0A2647] cursor-pointer"
                  >
                    <div className="w-full h-[500px] bg-[#0A2647] overflow-hidden">
                      <img
                        src={`${process.env.REACT_APP_IMAGE_URL}/${
                          candidate.poster_path
                        }`}
                        alt={candidate.title}
                        className="w-full h-full object-cover transition group-hover:scale-[1.2]"
                      />
                    </div>
                    <div className="p-[16px]">
                      <p className="text-white text-xl xl:text-2xl">
                        {candidate.title}
                      </p>
                      <p className="text-white text-sm xl:text-md">
                        {candidate.release_date}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Pagination */}
          {/* Makes the button disabled, when the pagination value is 1 
          for the previous button, and when the pagination value exceeds 
          the data limit for the next button */}
          <div className="w-full h-full grid grid-cols-2 gap-[20px] justify-end">
            <Button
              disabled={pagination === 1}
              onClick={() => setPagination((state) => state - 1)}
            >
              Previous
            </Button>
            <Button
              disabled={
                data &&
                typeof data === "object" &&
                data !== null &&
                (data?.total_pages > 500 ? 500 : data?.total_pages) ===
                  pagination
              }
              onClick={() => setPagination((state) => state + 1)}
            >
              Next
            </Button>
          </div>

          {/* Footer */}
          <div className="w-full h-full flex justify-center !mt-[50px]">
            <p className="text-white text-xl">
              Made By{" "}
              <a
                className="font-bold underline hover:"
                href="https://www.rhafaelbijaksana.site"
              >
                Elbi
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
