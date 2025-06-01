import React, { useEffect, useState } from "react";
import MainPadding from "@/layouts/MainPadding";
import { Button } from "../ui/button";
import { getSermons } from "@/services/api/apiEndpoints";
import img from "../../assets/ABC-logo.png";
import SermonCard from "./SermonCard";

const AllSermons = () => {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

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

  const displayedSermons = showAll ? sermons : sermons.slice(0, 6);

  if (loading) {
    return (
      <MainPadding className="flex flex-col gap-10 items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {[...Array(6)].map((_, index) => (
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
    <MainPadding className="flex flex-col gap-10 items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
        {displayedSermons.map((sermon, index) => (
          <div key={index} className="h-full">
            <SermonCard sermon={sermon} />
          </div>
        ))}
      </div>

      {sermons.length > 6 && (
        <Button className="px-8" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "See More"}
        </Button>
      )}
    </MainPadding>
  );
};

export default AllSermons;
