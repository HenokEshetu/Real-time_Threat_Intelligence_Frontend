import React, { useState } from 'react';
import { useCampaigns } from '../../hooks/useCampaigns';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ShieldMinusIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const glowEffects = [
  {
    shadow: 'shadow-red-300',
    border: 'border-red-500',
    text: 'text-red-600',
  },
  {
    shadow: 'shadow-orange-300',
    border: 'border-orange-500',
    text: 'text-orange-600',
  },
  {
    shadow: 'shadow-yellow-300',
    border: 'border-yellow-500',
    text: 'text-yellow-600',
  },
  {
    shadow: 'shadow-green-300',
    border: 'border-green-500',
    text: 'text-green-600',
  },
  {
    shadow: 'shadow-teal-300',
    border: 'border-teal-500',
    text: 'text-teal-600',
  },
  {
    shadow: 'shadow-blue-300',
    border: 'border-blue-500',
    text: 'text-blue-600',
  },
  {
    shadow: 'shadow-indigo-300',
    border: 'border-indigo-500',
    text: 'text-indigo-600',
  },
  {
    shadow: 'shadow-purple-300',
    border: 'border-purple-500',
    text: 'text-purple-600',
  },
  {
    shadow: 'shadow-pink-300',
    border: 'border-pink-500',
    text: 'text-pink-600',
  },
  {
    shadow: 'shadow-rose-300',
    border: 'border-rose-500',
    text: 'text-rose-600',
  },
  {
    shadow: 'shadow-amber-300',
    border: 'border-amber-500',
    text: 'text-amber-600',
  },
  {
    shadow: 'shadow-lime-300',
    border: 'border-lime-500',
    text: 'text-lime-600',
  },
  {
    shadow: 'shadow-emerald-300',
    border: 'border-emerald-500',
    text: 'text-emerald-600',
  },
  {
    shadow: 'shadow-cyan-300',
    border: 'border-cyan-500',
    text: 'text-cyan-600',
  },
  {
    shadow: 'shadow-sky-300',
    border: 'border-sky-500',
    text: 'text-sky-600',
  },
  {
    shadow: 'shadow-violet-300',
    border: 'border-violet-500',
    text: 'text-violet-600',
  },
  {
    shadow: 'shadow-fuchsia-300',
    border: 'border-fuchsia-500',
    text: 'text-fuchsia-600',
  },
  {
    shadow: 'shadow-neutral-400',
    border: 'border-neutral-500',
    text: 'text-neutral-600',
  },
  {
    shadow: 'shadow-slate-400',
    border: 'border-slate-500',
    text: 'text-slate-600',
  },
  {
    shadow: 'shadow-gray-400',
    border: 'border-gray-500',
    text: 'text-gray-600',
  },
];

export const CampaignsPage: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const { campaigns, total, loading, error } = useCampaigns({
    page: currentPage,
    pageSize,
  });
  const navigate = useNavigate();

  // Function to get random glow effect
  const getRandomGlowEffect = () => {
    return glowEffects[Math.floor(Math.random() * glowEffects.length)];
  };

  // Format date to display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const totalPages = Math.ceil((total || 0) / pageSize);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        Error loading campaigns. Please try again later.
      </div>
    );

  return (
    <div className="w-full relative min-h-[90vh] pb-12">
      <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {campaigns.map((campaign) => {
          const isHovered = hoveredCard === campaign.id;
          const glowEffect = isHovered ? getRandomGlowEffect() : null;

          return (
            <div
              key={campaign.id}
              className="contents"
              onClick={() => navigate(`/campaigns/${campaign.id}`)}
            >
              <Card
                className={`h-80 rounded-xl border shadow-sm overflow-hidden relative transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02]
                ${
                  glowEffect ? `${glowEffect.border} ${glowEffect.shadow}` : ''
                }`}
                onMouseEnter={() => setHoveredCard(campaign.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Shield icon at bottom right */}
                <div
                  className="absolute bottom-2 right-2 z-10"
                  style={{ pointerEvents: 'none' }}
                >
                  <ShieldMinusIcon className="h-10 w-10" />
                </div>

                <CardContent className="p-5 flex flex-col h-full relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle
                      className={`text-base truncate transition-colors duration-300 ${
                        glowEffect ? glowEffect.text : 'text-foreground'
                      }`}
                    >
                      Name: {campaign.name}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="px-4 py-1 text-xs font-semibold uppercase border-2 border-fuchsia-500 bg-fuchsia-100 text-fuchsia-600 tracking-wide shadow-sm"
                    >
                      CAMPAIGN
                    </Badge>
                  </div>

                  <CardDescription className="text-primary mb-3 flex-1 overflow-hidden">
                    <div
                      className="line-clamp-4 overflow-hidden text-ellipsis"
                      style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 4,
                      }}
                    >
                      {campaign.description}
                    </div>
                  </CardDescription>

                  <div className="flex flex-col gap-1 mb-2">
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">first_seen:</span>{' '}
                      {formatDate(campaign.first_seen)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">last_seen:</span>{' '}
                      {formatDate(campaign.last_seen)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
      {/* Pagination bar, similar to malware's */}
      {campaigns.length > 1 && (
        <div className="fixed bottom-0 left-[var(--sidebar-width)] w-[calc(100%-var(--sidebar-width))] bg-background/80 backdrop-blur z-20 border-t">
          <div className="flex items-center justify-between px-4 py-2 mx-auto">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, total || 0)} of {total || 0}{' '}
              campaigns
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1 || loading}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-2 text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages || loading}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;
