import { useParams } from "react-router";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function MovieDetailComponent() {
  const { id } = useParams();
  const { data } = useSWR(
    `${process.env.REACT_APP_MOVIE_DETAIL}${id}`,
    fetcher
  );

  const { data: dataImages } = useSWR(
    `${process.env.REACT_APP_MOVIE_DETAIL}${id}/images`,
    fetcher
  );

  return (
    <div
      className={`bg-[#0A2647] min-h-screen pb-[50px] w-full h-full flex flex-col items-center justify-start`}
    >
      <div className="w-full h-[350px] bg-slate-900 shadow-xl">
        <img
          src={`${process.env.REACT_APP_IMAGE_URL}${data?.backdrop_path}`}
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="xl:max-w-5xl lg:max-w-3xl px-[x50px] w-full h-full -mt-[250px] p-[20px] flex rounded overflow-hidden space-x-[10px] bg-[#144272] shadow-xl">
        <div className="w-[300px] h-[400px] overflow-hidden shadow-xl shrink-[0]">
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}${data?.poster_path}`}
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-full space-y-[30px] px-[16px]">
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
                  <td className="pl-5">: {data?.release_date || "-"}</td>
                </tr>
                <tr>
                  <td>Native Language</td>
                  <td className="pl-5">: {data?.original_language || "-"}</td>
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
                <h1 className="text-4xl font-bold">Production Information</h1>
                <div className="h-[1px] w-full bg-[white]" />
                <table>
                  <tbody className="text-white">
                    <tr>
                      <td>Budget</td>
                      <td className="pl-5">: ${data?.budget || "-"}</td>
                    </tr>
                    <tr>
                      <td>Revenue</td>
                      <td className="pl-5">: ${data?.revenue || "-"}</td>
                    </tr>
                    <tr>
                      <td>Production Company</td>
                      <td className="pl-5">: {data?.production_companies?.map(({name} : {name: string}) => name).join(', ') || "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-[30px] !mt-[50px]">
              <div className="space-y-[20px]">
                <h1 className="text-4xl font-bold">Aditional Information</h1>
                <div className="h-[1px] w-full bg-[white]" />
                <table>
                  <tbody className="text-white">
                    <tr>
                      <td>Rating</td>
                      <td className="pl-5">: {data?.vote_average || "-"} / 10 from a total of {data?.vote_count || '-'} assessments</td>
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
                  {
                    dataImages?.backdrops?.filter(({iso_639_1} : {iso_639_1: string}) => !iso_639_1).map(({file_path} : {file_path: string}) => (
                      <div>
                        <img src={`${process.env.REACT_APP_IMAGE_URL}${file_path}`} alt="images" />
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
