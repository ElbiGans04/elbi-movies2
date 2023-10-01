import { useEffect, useMemo, useState } from "react";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import Button from "../components/button";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import ErrorComponent from "../components/error";
import LoadingComponent from "../components/loading";
import { formatDate } from "../utils";
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

function HomeComponent() {
  /**
   * Here we define the state to create the search feature
   */
  const [search, setSearch] = useState(
    () => localStorage.getItem("searchParam") || ""
  );
  const [searchKeyUp, setSearchKeyUp] = useState(
    () => localStorage.getItem("searchParam") || ""
  );
  const [pagination, setPagination] = useState(() =>
    parseInt(localStorage.getItem("paginationIndex") || "1")
  );

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

  const { data, isLoading, error } = useSWR<Data>(url, fetcher);

  // This line of code defines a constant 'haveToDisabled' which is a boolean value.
  // It is set to true if either the 'isLoading' variable is true or if there is an 'error'.
  // This is commonly used to conditionally disable or enable certain functionality or UI elements.
  const haveToDisabled = isLoading || error;

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
      localStorage.setItem("searchParam", search);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search, setSearchKeyUp]);

  // This useEffect hook is used to watch for changes in 'search' and 'searchKeyUp' variables.
  // When either of them changes, it performs the following actions:
  // 1. It sets the 'pagination' state to 1, resetting the pagination to the first page.
  // 2. It stores the value "1" in the browser's localStorage under the key "paginationIndex".
  // This is typically used in scenarios where you want to reset pagination and store a user's
  // pagination preferences when the search criteria changes.
  useEffect(() => {
    if (search !== searchKeyUp) {
      setPagination(1);
      localStorage.setItem("paginationIndex", "1");
    }
  }, [search, searchKeyUp, setPagination]);

  return (
    <div
      className={`bg-brand-900 min-h-screen w-full w-full flex justify-center py-[50px]`}
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

          <div className="bg-brand-600 w-full h-[2px]"></div>

          <div className="space-y-[10px]">
            <input
              id="search"
              type="text"
              className="bg-brand-800 w-full text-white shadow p-[8px] lg:p-[16px] rounded hover:opacity-[0.8] lg:text-md text-sm"
              placeholder="Search Any Movies"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={error}
            />
            <p className="text-white lg:text-md text-sm">
              Search by titles like:{" "}
              <span className="font-bold">
                Fast And Furious, Dragon Ball, One Piece
              </span>
            </p>
          </div>

          {/* Indicator Loading */}
          {isLoading && !error && <LoadingComponent />}

          {/* Content */}
          {/* show data only when not fetching data to server */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 grid-rows-7 gap-[48px] !mt-[50px]">
              {Array.isArray(data?.results) &&
                data?.results.map((candidate) => (
                  <Link to={`/${candidate.id}`} key={candidate.id}>
                    <div
                      key={candidate.id}
                      className="group shadow-xl bg-brand-800 rounded overflow-hidden hover:border-brand-600 border-[3px] border-brand-900 cursor-pointer"
                    >
                      <div className="w-full h-[500px] bg-brand-900 overflow-hidden">
                        <img
                          src={`${process.env.REACT_APP_IMAGE_URL}/${candidate.poster_path}`}
                          alt={candidate.title}
                          className="w-full h-full object-cover transition group-hover:scale-[1.2]"
                        />
                      </div>
                      <div className="p-[16px]">
                        <p className="text-white text-xl xl:text-2xl">
                          {candidate.title}
                        </p>
                        <p className="text-white text-sm xl:text-md">
                          {formatDate(candidate.release_date)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}

          {/* When Error */}
          {!isLoading && error && <ErrorComponent />}

          {/* Pagination */}
          {/* Makes the button disabled, when the pagination value is 1 
          for the previous button, and when the pagination value exceeds 
          the data limit for the next button */}
          <div className="w-full h-full grid grid-cols-2 gap-[20px] justify-end">
            <Button
              disabled={pagination === 1 || haveToDisabled}
              onClick={() =>
                setPagination((state) => {
                  const value = state - 1;
                  localStorage.setItem("paginationIndex", value.toString());
                  return value;
                })
              }
            >
              Previous
            </Button>
            <Button
              disabled={
                (data &&
                  typeof data === "object" &&
                  data !== null &&
                  (data?.total_pages > 500 ? 500 : data?.total_pages) ===
                    pagination) ||
                haveToDisabled
              }
              onClick={() =>
                setPagination((state) => {
                  const value = state + 1;
                  localStorage.setItem("paginationIndex", value.toString());
                  return value;
                })
              }
            >
              Next
            </Button>
          </div>

          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
