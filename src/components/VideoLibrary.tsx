
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface VideoLibraryProps {
  className?: string;
}

interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
}

const VideoLibrary = ({ className }: VideoLibraryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Mock YouTube video data
  const videos: VideoData[] = [
    {
      id: "a7O7pvo6xOk",
      title: "Restaurant Style Paneer Butter Masala",
      thumbnail: "https://img.youtube.com/vi/a7O7pvo6xOk/mqdefault.jpg",
    },
    {
      id: "cMIjzNzh7Rs",
      title: "Perfect Masoor Dal Recipe",
      thumbnail: "https://img.youtube.com/vi/cMIjzNzh7Rs/mqdefault.jpg",
    },
    {
      id: "Pfr8c-VF2_Y",
      title: "Aloo Paratha - Punjabi Style",
      thumbnail: "https://img.youtube.com/vi/Pfr8c-VF2_Y/mqdefault.jpg",
    },
    {
      id: "b5bDtzGqpjQ",
      title: "Restaurant Style Palak Paneer",
      thumbnail: "https://img.youtube.com/vi/b5bDtzGqpjQ/mqdefault.jpg",
    },
  ];

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Youtube className="h-5 w-5 mr-2 text-red-600" />
          Video Library
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>

        {selectedVideo ? (
          <div className="space-y-4">
            <div className="aspect-video rounded-md overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}`}
                title="YouTube video player"
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
            <button
              onClick={() => setSelectedVideo(null)}
              className="text-sm text-blue-600 hover:underline"
            >
              Back to video list
            </button>
          </div>
        ) : (
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                  onClick={() => setSelectedVideo(video.id)}
                >
                  <div className="flex-shrink-0 w-24 h-16 rounded-md overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-2">{video.title}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No videos found matching your search.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoLibrary;
