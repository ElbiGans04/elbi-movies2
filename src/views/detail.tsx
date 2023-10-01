import { useNavigate, useParams } from "react-router";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import Button from "../components/button";
import Footer from "../components/footer";
import LoadingComponent from "../components/loading";
import ErrorComponent from "../components/error";
import { formatDate, formatMoney } from "../utils";

export default function MovieDetailComponent() {
  // This line of code is using destructuring assignment to extract the 'id' variable
  // from the result of calling the 'useParams()' hook. 'useParams()' is typically used
  // in React Router to access route parameters. In this case, it's extracting the 'id'
  // parameter from the current route's parameters and storing it in the 'id' variable.
  const { id } = useParams();
  // In these lines of code, we are using the 'useSWR' hook to fetch data from remote sources.
  // 'useSWR' is often used for data fetching in React applications, especially with remote APIs.
  // The hook takes two arguments: a URL and a 'fetcher' function, which defines how data is fetched.

  // The first 'useSWR' call fetches data related to a movie with the 'id' parameter from the URL.
  // It stores the data in the 'data' variable, a loading indicator in 'isLoading', and any error
  // that occurs during the fetch in the 'error' variable.
  const { data, isLoading, error } = useSWR(
    `${process.env.REACT_APP_MOVIE_DETAIL}${id}`,
    fetcher
  );
  // The second 'useSWR' call fetches images related to the same movie identified by the 'id'.
  // It stores the data in 'dataImages'. Note that this call uses a different URL for fetching images.
  const { data: dataImages } = useSWR(
    `${process.env.REACT_APP_MOVIE_DETAIL}${id}/images`,
    fetcher
  );

  // This line of code uses the 'useNavigate' hook, which is typically part of a routing library
  // like React Router. 'useNavigate' provides a function that allows you to programmatically
  // navigate to different routes within your application.

  // In this context, 'navigate' is a function that you can call to trigger navigation to a
  // different route. This is useful for controlling the flow of your application and directing
  // users to different views or pages based on certain conditions or user interactions.
  const navigate = useNavigate();

  return (
    <div
      className={`bg-brand-900 min-h-screen pb-[50px] w-full h-full flex flex-col items-center justify-start`}
    >
      <div className="w-full h-[350px] bg-slate-900 shadow-xl hidden lg:block">
        {!error && !isLoading && data && (
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}${data?.backdrop_path}`}
            alt="background"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="xl:max-w-5xl lg:max-w-3xl px-[x50px] w-full h-full lg:-mt-[250px] px-[20px] py-[16px] md:p-[20px] flex flex-col md:flex-row rounded overflow-hidden md:space-x-[16px] bg-brand-800 shadow-xl">
        {/* Indicator Error */}
        {!isLoading && error && <ErrorComponent />}
        {/* Indicator Loading */}
        {isLoading && !error && <LoadingComponent />}
        {/* Actual Content */}
        {!isLoading && !error && (
          <>
            <div className="w-[300px] h-[400px] overflow-hidden shadow-xl shrink-[0]">
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}${data?.poster_path}`}
                alt="background"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full h-full space-y-[30px] lg:px-[16px] mt-[16px] md:mt-[0]">
              <div className="space-y-[10px] text-white h-full">
                <h1 className="xl:text-7xl text-3xl md:text-4xl font-bold">
                  {data?.title}
                </h1>
                <p className="xl:text-2xl md:text-xl text-lg">
                  {data?.genres
                    .map(({ name }: { name: string }) => name)
                    .join(", ")}
                </p>
                <table className="!mt-[20px]">
                  <tbody>
                    <tr>
                      <td>Release Date</td>
                      <td className="pl-5">
                        : {formatDate(data?.release_date)}
                      </td>
                    </tr>
                    <tr>
                      <td>Native Language</td>
                      <td className="pl-5">
                        : {data?.original_language || "-"}
                      </td>
                    </tr>
                    <tr>
                      <td>Duration</td>
                      <td className="pl-5">: {data?.runtime || 0} Minutes</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td className="pl-5">: {data?.status || "-"}</td>
                    </tr>
                    <tr>
                      <td>IMDB ID</td>
                      <td className="pl-5">: {data?.imdb_id || "-"}</td>
                    </tr>
                    <tr>
                      <td>Tag Line</td>
                      <td className="pl-5">: {data?.tagline || "-"}</td>
                    </tr>
                  </tbody>
                </table>

                <p className="!mt-[40px]">{data?.overview || "-"}</p>

                <div className="space-y-[30px] !mt-[50px]">
                  <div className="space-y-[20px]">
                    <h1 className="text-4xl font-bold">
                      Production Information
                    </h1>
                    <div className="h-[1px] w-full bg-[white]" />
                    <table>
                      <tbody className="text-white">
                        <tr>
                          <td>Budget</td>
                          <td className="pl-5">
                            : ${formatMoney(data?.budget || 0)}
                          </td>
                        </tr>
                        <tr>
                          <td>Revenue</td>
                          <td className="pl-5">
                            : ${formatMoney(data?.revenue || 0)}
                          </td>
                        </tr>
                        <tr>
                          <td>Production Company</td>
                          <td className="pl-5">
                            :{" "}
                            {data?.production_companies
                              ?.map(({ name }: { name: string }) => name)
                              .join(", ") || "-"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-[30px] !mt-[50px]">
                  <div className="space-y-[20px]">
                    <h1 className="text-4xl font-bold">
                      Aditional Information
                    </h1>
                    <div className="h-[1px] w-full bg-[white]" />
                    <table>
                      <tbody className="text-white">
                        <tr>
                          <td>Rating</td>
                          <td className="pl-5">
                            : {data?.vote_average || "-"} / 10 from a total of{" "}
                            {data?.vote_count || "-"} assessments
                          </td>
                        </tr>
                        <tr>
                          <td>Website Home Page</td>
                          <td className="pl-5">: {data?.homepage || "-"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-[30px] !mt-[50px]">
                  <div className="space-y-[20px]">
                    <h1 className="text-4xl font-bold">Images</h1>
                    <div className="h-[1px] w-full bg-[white]" />
                    <div className="flex flex-col items-start justify-start">
                      {/* The resulting JSX will render a series of images that are filtered based on the 'iso_639_1' property,
                          ensuring that only certain backdrops are displayed. */}
                      {dataImages?.backdrops
                        ?.filter(
                          ({ iso_639_1 }: { iso_639_1: string }) => !iso_639_1
                        )
                        .map(({ file_path }: { file_path: string }) => (
                          <div>
                            <img
                              src={`${process.env.REACT_APP_IMAGE_URL}${file_path}`}
                              alt="images"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1">
                  <Button
                    onClick={() => {
                      navigate("/");
                    }}
                    disabled={false}
                  >
                    Back To Home Page
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
