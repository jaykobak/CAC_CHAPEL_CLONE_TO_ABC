import React, { useEffect, useState } from "react";
import SermonsCarousel from "../Sermons/SermonsCarousel";
import { getSermons } from "@/services/api/apiEndpoints";
import img from "../../assets/ABC-logo.png";
import MainPadding from "@/layouts/MainPadding";
import { Link } from "react-router-dom";

const LatestSermons = () => {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        // const response = await getSermons();
        // Mock data
        const response = {
          data: [
            {
              title: "The Consequences of Sin",
              preacher: "Rev. Dr. Wale Olajire",
              date: "May 28, 2025",
              duration: "42 min",
              bibleReferences: "1 Samuel 15",
              telegramLink: "https://t.me/example1",
              img: img,
            },
          ],
        };

        const formattedSermons = response.data.map((sermon) => ({
          title: sermon.title || "No title",
          category: "Latest",
          preacher: sermon.preacher || sermon.speaker || "Unknown preacher",
          duration: sermon.duration || "Unknown duration",
          date: sermon.date || "Unknown date",
          bibleReferences: sermon.bibleReferences || "unknown bibleReferences",
          link: sermon.telegramLink || "#",
          img: sermon.img || img,
        }));

        setSermons(formattedSermons);
      } catch (err) {
        setError(err.message);
        setSermons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  if (loading) {
    return (
      <MainPadding className="flex flex-col gap-10 items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse h-full">
              <div className="bg-gray-200 h-64 rounded-lg"></div>
              <div className="mt-2 bg-gray-200 h-4 rounded w-3/4"></div>
              <div className="mt-2 bg-gray-200 h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </MainPadding>
    );
  }

  if (error) {
    return (
      <MainPadding className="flex flex-col gap-10 items-center">
        <p className="text-red-500">Error loading sermons: {error}</p>
      </MainPadding>
    );
  }

  return (
    <div>
      <SermonsCarousel
        name={"Latest Sermons"}
        sermons={sermons}
        heading={
          "LATEST SERMONS FROM THE TEEN'S MINISTRY OF ANTIOCH BAPTIST CHURCH"
        }
        button={"/sermons"}
      />
    </div>
  );
};

export default LatestSermons;
